-- ============================================================
-- UGP — Supabase SQL Migration
-- Arquivo: supabase/migrations/001_initial.sql
-- Idempotente: pode ser executado múltiplas vezes sem erro.
-- ============================================================

-- ── 0. Extensions ──────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── 1. Helper: updated_at trigger ──────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── 2. Profiles (extensão do auth.users) ───────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id              UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name       TEXT,
  email           TEXT,
  role            TEXT NOT NULL DEFAULT 'user',
  selected_trail  TEXT,
  current_level   TEXT DEFAULT 'Extremo Iniciante',
  xp_points       INTEGER NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_trail ON public.profiles(selected_trail);

-- Remove CHECK constraints legacy (tabela já pode existir de runs anteriores)
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_selected_trail_check;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_xp_points_check;

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger: cria profile automaticamente ao registrar
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    'user'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Função helper para checar admin SEM consultar profiles (evita recursão).
-- Lê direto de auth.users.raw_app_meta_data, que não tem RLS customizada.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = auth
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
      AND COALESCE(
        raw_app_meta_data->>'role',
        raw_user_meta_data->>'role'
      ) = 'admin'
  );
$$;

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Limpa TODAS as policies antigas (incluindo recursivas) antes de recriar
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_admins_select_all" ON public.profiles;
DROP POLICY IF EXISTS "profiles_admins_insert_all" ON public.profiles;
DROP POLICY IF EXISTS "profiles_admins_update_all" ON public.profiles;

CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ── 3. Module Progress ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.module_progress (
  id              UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  module_id       TEXT NOT NULL,
  completed       BOOLEAN NOT NULL DEFAULT false,
  completed_at    TIMESTAMPTZ,
  CONSTRAINT unique_user_module UNIQUE (created_by_id, module_id)
);

CREATE INDEX IF NOT EXISTS idx_module_progress_user ON public.module_progress(created_by_id);
CREATE INDEX IF NOT EXISTS idx_module_progress_module ON public.module_progress(module_id);
CREATE INDEX IF NOT EXISTS idx_module_progress_completed ON public.module_progress(completed) WHERE completed = true;

DROP TRIGGER IF EXISTS module_progress_updated_at ON public.module_progress;
CREATE TRIGGER module_progress_updated_at
  BEFORE UPDATE ON public.module_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE public.module_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "module_progress_all_own" ON public.module_progress;
CREATE POLICY "module_progress_all_own" ON public.module_progress
  FOR ALL USING (auth.uid() = created_by_id)
  WITH CHECK (auth.uid() = created_by_id);

-- ── 4. Project Checklist Progress ──────────────────────────
CREATE TABLE IF NOT EXISTS public.project_checklist_progress (
  id              UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id      SMALLINT NOT NULL CHECK (project_id >= 1 AND project_id <= 10),
  item_key        TEXT NOT NULL,
  is_checked      BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT unique_user_project_item UNIQUE (created_by_id, project_id, item_key)
);

CREATE INDEX IF NOT EXISTS idx_checklist_user ON public.project_checklist_progress(created_by_id);
CREATE INDEX IF NOT EXISTS idx_checklist_project ON public.project_checklist_progress(project_id);
CREATE INDEX IF NOT EXISTS idx_checklist_user_project ON public.project_checklist_progress(created_by_id, project_id);

DROP TRIGGER IF EXISTS checklist_progress_updated_at ON public.project_checklist_progress;
CREATE TRIGGER checklist_progress_updated_at
  BEFORE UPDATE ON public.project_checklist_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE public.project_checklist_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "checklist_all_own" ON public.project_checklist_progress;
CREATE POLICY "checklist_all_own" ON public.project_checklist_progress
  FOR ALL USING (auth.uid() = created_by_id)
  WITH CHECK (auth.uid() = created_by_id);

-- ── 5. Project Submissions ──────────────────────────────────
DO $$ BEGIN
  CREATE TYPE public.submission_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.project_submissions (
  id              UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id      SMALLINT NOT NULL CHECK (project_id >= 1 AND project_id <= 10),
  github_url      TEXT NOT NULL,
  production_url  TEXT,
  status          public.submission_status NOT NULL DEFAULT 'pending',
  submitted_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_submissions_user ON public.project_submissions(created_by_id);
CREATE INDEX IF NOT EXISTS idx_submissions_project ON public.project_submissions(project_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.project_submissions(status);

DROP TRIGGER IF EXISTS submissions_updated_at ON public.project_submissions;
CREATE TRIGGER submissions_updated_at
  BEFORE UPDATE ON public.project_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE public.project_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "submissions_select_own" ON public.project_submissions;
DROP POLICY IF EXISTS "submissions_insert_own" ON public.project_submissions;
DROP POLICY IF EXISTS "submissions_update_own" ON public.project_submissions;
DROP POLICY IF EXISTS "submissions_admins_select_all" ON public.project_submissions;
DROP POLICY IF EXISTS "submissions_admins_update_all" ON public.project_submissions;

CREATE POLICY "submissions_select_own" ON public.project_submissions
  FOR SELECT USING (auth.uid() = created_by_id);

CREATE POLICY "submissions_insert_own" ON public.project_submissions
  FOR INSERT WITH CHECK (auth.uid() = created_by_id);

CREATE POLICY "submissions_update_own" ON public.project_submissions
  FOR UPDATE USING (auth.uid() = created_by_id);

CREATE POLICY "submissions_admins_select_all" ON public.project_submissions
  FOR SELECT USING (public.is_admin());

CREATE POLICY "submissions_admins_update_all" ON public.project_submissions
  FOR UPDATE USING (public.is_admin());

-- ── 6. Views ───────────────────────────────────────────────
CREATE OR REPLACE VIEW public.user_progress_summary AS
SELECT
  p.id,
  p.full_name,
  p.email,
  p.selected_trail,
  p.current_level,
  p.xp_points,
  COUNT(DISTINCT mp.module_id) FILTER (WHERE mp.completed = true) AS modules_completed,
  COUNT(DISTINCT pcp.project_id) FILTER (WHERE pcp.is_checked = true) AS projects_with_progress,
  COUNT(DISTINCT ps.id) FILTER (WHERE ps.status = 'approved') AS projects_approved
FROM public.profiles p
LEFT JOIN public.module_progress mp ON mp.created_by_id = p.id
LEFT JOIN public.project_checklist_progress pcp ON pcp.created_by_id = p.id
LEFT JOIN public.project_submissions ps ON ps.created_by_id = p.id
GROUP BY p.id, p.full_name, p.email, p.selected_trail, p.current_level, p.xp_points;

-- ── 7. Functions (RPCs) ────────────────────────────────────
CREATE OR REPLACE FUNCTION public.advance_project(
  p_project_id SMALLINT,
  p_xp_gain INTEGER,
  p_new_level TEXT
)
RETURNS public.profiles
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user public.profiles;
BEGIN
  UPDATE public.profiles
  SET
    xp_points = xp_points + p_xp_gain,
    current_level = p_new_level,
    updated_at = now()
  WHERE id = auth.uid()
  RETURNING * INTO v_user;

  RETURN v_user;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_project_checklist_progress(p_project_id SMALLINT)
RETURNS TABLE(item_key TEXT, is_checked BOOLEAN, record_id UUID)
LANGUAGE sql SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT item_key, is_checked, id as record_id
  FROM public.project_checklist_progress
  WHERE created_by_id = auth.uid()
    AND project_id = p_project_id;
$$;