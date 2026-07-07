-- 003_reading_progress.sql — Progresso de leitura por seção (Learning Navigator UGP)
-- Idempotente. Rode no SQL Editor do Supabase.
--
-- Persiste quais seções (H2/H3) do módulo o usuário já visitou/leu,
-- permitindo ao Learning Navigator calcular % de avanço, tempo restante
-- e destacar seções concluídas. Complementar a module_progress (que é
-- só um booleano de módulo concluído).

-- ── Tabela: uma linha por (usuário, módulo, seção) ──────────────
CREATE TABLE IF NOT EXISTS public.module_section_progress (
  id              UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  module_id       TEXT NOT NULL,
  section_id      TEXT NOT NULL,                      -- slug da âncora (h2/h3)
  status          TEXT NOT NULL DEFAULT 'visited',   -- 'visited' | 'read' | 'completed'
  read_at         TIMESTAMPTZ,
  CONSTRAINT module_section_progress_status CHECK (status IN ('visited','read','completed')),
  CONSTRAINT module_section_progress_unique UNIQUE (created_by_id, module_id, section_id)
);

CREATE INDEX IF NOT EXISTS idx_msp_user         ON public.module_section_progress(created_by_id);
CREATE INDEX IF NOT EXISTS idx_msp_user_module  ON public.module_section_progress(created_by_id, module_id);

DROP TRIGGER IF EXISTS module_section_progress_updated_at ON public.module_section_progress;
CREATE TRIGGER module_section_progress_updated_at
  BEFORE UPDATE ON public.module_section_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.module_section_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "module_section_progress_all_own" ON public.module_section_progress;
CREATE POLICY "module_section_progress_all_own" ON public.module_section_progress
  FOR ALL USING (auth.uid() = created_by_id)
  WITH CHECK (auth.uid() = created_by_id);

-- ── View: resumo de progresso por módulo por usuário ───────────
-- Retorna quantas seções foram lidas/completas por módulo.
CREATE OR REPLACE VIEW public.module_section_summary AS
SELECT
  created_by_id,
  module_id,
  COUNT(*) FILTER (WHERE status IN ('read','completed')) AS sections_read,
  COUNT(*)                                                 AS sections_visited,
  COUNT(DISTINCT section_id)                               AS distinct_sections
FROM public.module_section_progress
GROUP BY created_by_id, module_id;
