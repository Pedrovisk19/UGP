'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function signInWithEmail(email: string, password: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }
  revalidatePath('/', 'layout')
  redirect('/gate')
}

export async function signUpWithEmail(email: string, password: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` },
  })
  if (error) return { error: error.message }

  if (data.session) {
    revalidatePath('/', 'layout')
    redirect('/gate')
  }

  // Caso 2: usuário já existe e está confirmado -> Supabase retorna user mas sem session
  // e identidades vazias, sem enviar novo email. Sinalizamos para o frontend.
  if (data.user && (data.user.identities?.length ?? 0) === 0) {
    return {
      error:
        'Este email já está cadastrado. Faça login ou use "Esqueci a senha" se não lembra.',
    }
  }

  return { ok: true }
}

export async function verifyOtp(email: string, token: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'signup' })
  if (error) return { error: error.message }
  if (data.session) {
    revalidatePath('/', 'layout')
    redirect('/gate')
  }
  return { error: 'OTP não gerou sessão. Tente novamente.' }
}

export async function resendOtp(email: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.resend({ email, type: 'signup' })
  if (error) return { error: error.message }
  return { ok: true }
}

export async function resetPasswordRequest(email: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  })
  if (error) return { error: error.message }
  return { ok: true }
}

export async function resetPassword(newPassword: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) return { error: error.message }
  redirect('/login')
}

export async function signInWithGoogle() {
  const supabase = await createClient()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${siteUrl}/auth/callback?next=/gate` },
  })
  if (error) return { error: error.message }
  return { url: data?.url }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function updateProfile(
  data: Partial<{ selected_trail: string; current_level: string; xp_points: number }>
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Não autenticado')

  // Upsert: se a row não existe (trigger falhou/migration veio depois),
  // cria com defaults do auth.users; se existe, atualiza só os campos passados.
  const { error } = await supabase
    .from('profiles')
    .upsert(
      {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name ?? null,
        role: 'user',
        ...data,
      },
      { onConflict: 'id', ignoreDuplicates: false }
    )

  if (error) return { error: error.message }
  revalidatePath('/', 'layout')
  return { ok: true }
}

export async function selectTrail(trailId: string) {
  const valid = ['junior', 'pleno', 'senior', 'Dev Iniciante']
  const normalized = String(trailId ?? '').trim()
  if (!valid.includes(normalized)) {
    return { error: `Trilha inválida: ${JSON.stringify(trailId)}` }
  }
  const res = await updateProfile({ selected_trail: normalized })
  if (res && 'error' in res) return res
  redirect('/app')
}