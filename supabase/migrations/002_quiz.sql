-- 002_quiz.sql — Persistência do Sistema de Fixação de Conhecimento (Quiz UGP)
-- Idempotente. Rode no SQL Editor do Supabase.

-- ── Tabela de tentativas de quiz por módulo ──────────────────
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id              UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  module_id       TEXT NOT NULL,
  score           SMALLINT NOT NULL DEFAULT 0,        -- total de acertos
  total           SMALLINT NOT NULL DEFAULT 0,        -- total de questões
  percentage      SMALLINT NOT NULL DEFAULT 0,        -- 0..100
  correct_ids     JSONB NOT NULL DEFAULT '[]'::jsonb, -- ids das questões acertadas
  incorrect_ids   JSONB NOT NULL DEFAULT '[]'::jsonb,
  duration_ms     INTEGER NOT NULL DEFAULT 0,
  xp_gain         INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT quiz_attempts_pct CHECK (percentage >= 0 AND percentage <= 100)
);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user        ON public.quiz_attempts(created_by_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_module     ON public.quiz_attempts(module_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_module ON public.quiz_attempts(created_by_id, module_id);

DROP TRIGGER IF EXISTS quiz_attempts_updated_at ON public.quiz_attempts;
CREATE TRIGGER quiz_attempts_updated_at
  BEFORE UPDATE ON public.quiz_attempts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "quiz_attempts_all_own" ON public.quiz_attempts;
CREATE POLICY "quiz_attempts_all_own" ON public.quiz_attempts
  FOR ALL USING (auth.uid() = created_by_id)
  WITH CHECK (auth.uid() = created_by_id);

-- ── View: melhor nota por módulo por usuário ─────────────────
CREATE OR REPLACE VIEW public.quiz_best_per_module AS
SELECT
  created_by_id,
  module_id,
  MAX(percentage)    AS best_percentage,
  MAX(score)         AS best_score,
  COUNT(*)           AS attempts,
  MAX(score) FILTER (WHERE percentage >= 80) AS comfortable_score
FROM public.quiz_attempts
GROUP BY created_by_id, module_id;