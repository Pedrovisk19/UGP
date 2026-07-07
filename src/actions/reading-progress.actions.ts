'use server'

import { createClient } from '@/lib/supabase/server'

export type SectionStatus = 'visited' | 'read' | 'completed'

export interface SectionProgressRow {
  id: string
  section_id: string
  status: SectionStatus
}

/**
 * Retorna o progresso de leitura de todas as seções de um módulo
 * para o usuário autenticado. Vazio se não autenticado ou sem dados.
 */
export async function getSectionProgress(moduleId: string): Promise<SectionProgressRow[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('module_section_progress')
    .select('id, section_id, status')
    .eq('created_by_id', user.id)
    .eq('module_id', moduleId)

  return (data ?? []) as SectionProgressRow[]
}

/**
 * Marca/upserts uma seção como lida. Status apenas avança (visited -> read -> completed),
 * nunca regride — o caller decide o status desejado e respeitando a hierarquia.
 */
export async function upsertSectionProgress(
  moduleId: string,
  sectionId: string,
  status: SectionStatus
): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // upsert mantendo o status mais avançado (hierarquia visited < read < completed)
  const rank: Record<SectionStatus, number> = { visited: 1, read: 2, completed: 3 }

  const { data: existing } = await supabase
    .from('module_section_progress')
    .select('id, status')
    .eq('created_by_id', user.id)
    .eq('module_id', moduleId)
    .eq('section_id', sectionId)
    .maybeSingle()

  if (existing) {
    const currentStatus = existing.status as SectionStatus
    if (rank[status] <= rank[currentStatus]) return // não regride
    await supabase
      .from('module_section_progress')
      .update({ status, read_at: new Date().toISOString() })
      .eq('id', existing.id)
  } else {
    await supabase
      .from('module_section_progress')
      .insert({
        module_id: moduleId,
        section_id: sectionId,
        status,
        read_at: status === 'visited' ? null : new Date().toISOString(),
        created_by_id: user.id,
      })
  }
}

/**
 * Marca TODAS as seções de um módulo como completas (usado quando o módulo
 * é marcado como concluído ou quando o quiz atinge >=80%).
 */
export async function completeAllSections(moduleId: string, sectionIds: string[]): Promise<void> {
  if (sectionIds.length === 0) return
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const rows = sectionIds.map((section_id) => ({
    module_id: moduleId,
    section_id,
    status: 'completed' as SectionStatus,
    read_at: new Date().toISOString(),
    created_by_id: user.id,
  }))

  // upsert via onConflict mantendo completed como terminal
  await supabase
    .from('module_section_progress')
    .upsert(rows, { onConflict: 'created_by_id,module_id,section_id', ignoreDuplicates: false })
}
