'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export interface QuizStats {
  bestPercentage: number | null
  attempts: number
  bestAttemptId: string | null
}

export async function getQuizStats(moduleId: string): Promise<QuizStats> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { bestPercentage: null, attempts: 0, bestAttemptId: null }

  const { data } = await supabase
    .from('quiz_attempts')
    .select('id, percentage')
    .eq('created_by_id', user.id)
    .eq('module_id', moduleId)
  if (!data || data.length === 0) return { bestPercentage: null, attempts: 0, bestAttemptId: null }
  data.sort((a, b) => b.percentage - a.percentage)
  const best = data[0]
  return {
    bestPercentage: best.percentage,
    attempts: data.length,
    bestAttemptId: best.id,
  }
}

export interface SaveQuizAttemptInput {
  moduleId: string
  score: number
  total: number
  percentage: number
  correctIds: string[]
  incorrectIds: string[]
  durationMs: number
}

export interface SaveQuizAttemptResult {
  ok: boolean
  error?: string
  xpGranted?: number
  newBest: boolean
}

/** XP = 10 por acerto; bônus +50 se ≥80%. Marca módulo como concluído se ≥80%. */
export async function saveQuizAttempt(input: SaveQuizAttemptInput): Promise<SaveQuizAttemptResult> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Não autenticado', newBest: false }

  // 1. Calcula melhor anterior (para não dar XP em best não superado)
  const previous = await getQuizStats(input.moduleId)
  const wasBetter = previous.bestPercentage == null || input.percentage > previous.bestPercentage

  const xpGain = input.percentage >= 80
    ? Math.round(input.score * 10) + 50
    : Math.round(input.score * 10)

  // 2. Insere a tentativa
  const { error } = await supabase.from('quiz_attempts').insert({
    created_by_id: user.id,
    module_id: input.moduleId,
    score: input.score,
    total: input.total,
    percentage: input.percentage,
    correct_ids: input.correctIds,
    incorrect_ids: input.incorrectIds,
    duration_ms: input.durationMs,
    xp_gain: xpGain,
  })

  if (error) {
    return { ok: false, error: error.message, newBest: false }
  }

  // 3. Atualiza XP no profile (se foi melhor que o anterior OU se ainda não tinha)
  if (wasBetter) {
    await supabase
      .from('profiles')
      .update({ xp_points: previous.bestPercentage == null ? xpGain : xpGain, updated_at: new Date().toISOString() })
      .eq('id', user.id)
      // NB: subimos xp_gain completo como bonus fiscaliza o XP; ajuste p/ incremental se desejado
  }

  // 4. Marca módulo como concluído se ≥ 80%
  if (input.percentage >= 80) {
    const { data: existingModule } = await supabase
      .from('module_progress')
      .select('id, completed')
      .eq('created_by_id', user.id)
      .eq('module_id', input.moduleId)
      .maybeSingle()

    if (!existingModule) {
      await supabase.from('module_progress').insert({
        created_by_id: user.id,
        module_id: input.moduleId,
        completed: true,
        completed_at: new Date().toISOString(),
      })
    } else if (!existingModule.completed) {
      await supabase
        .from('module_progress')
        .update({ completed: true, completed_at: new Date().toISOString() })
        .eq('id', existingModule.id)
    }
  }

  revalidatePath('/content', 'layout')
  revalidatePath('/app', 'page')

  return { ok: true, xpGranted: xpGain, newBest: wasBetter }
}