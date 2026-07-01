'use server'

import { createClient } from '@/lib/supabase/server'

export type ChecklistState = Record<string, { id?: string; is_checked: boolean }>

export async function getChecklistProgress(projectId: number): Promise<ChecklistState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return {}
  const { data } = await supabase
    .from('project_checklist_progress')
    .select('id, item_key, is_checked')
    .eq('project_id', projectId)
    .eq('created_by_id', user.id)
  const map: ChecklistState = {}
  for (const row of data ?? []) {
    map[row.item_key] = { id: row.id, is_checked: row.is_checked }
  }
  return map
}

export async function toggleChecklistItem(
  projectId: number,
  itemKey: string,
  recordId: string | null,
  newValue: boolean
): Promise<{ id?: string; error?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Não autenticado' }

  if (recordId) {
    const { error } = await supabase
      .from('project_checklist_progress')
      .update({ is_checked: newValue })
      .eq('id', recordId)
    if (error) return { error: error.message }
    return { id: recordId }
  } else {
    const { data, error } = await supabase
      .from('project_checklist_progress')
      .insert({
        project_id: projectId,
        item_key: itemKey,
        is_checked: newValue,
        created_by_id: user.id,
      })
      .select('id')
      .single()
    if (error) return { error: error.message }
    return { id: data.id }
  }
}