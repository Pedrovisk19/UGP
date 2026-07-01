'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getModuleProgress() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('module_progress')
    .select('id, module_id, completed')
    .eq('created_by_id', await currentUserId(supabase))
  return data ?? []
}

export async function toggleModuleProgress(
  moduleId: string,
  currentlyCompleted: boolean,
  recordId?: string | null
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autenticado')

  if (recordId) {
    await supabase
      .from('module_progress')
      .update({
        completed: !currentlyCompleted,
        completed_at: !currentlyCompleted ? new Date().toISOString() : null,
      })
      .eq('id', recordId)
  } else {
    await supabase
      .from('module_progress')
      .insert({
        module_id: moduleId,
        completed: true,
        completed_at: new Date().toISOString(),
        created_by_id: user.id,
      })
  }

  revalidatePath('/content', 'layout')
  revalidatePath('/app', 'page')
}

async function currentUserId(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser()
  return user?.id ?? ''
}