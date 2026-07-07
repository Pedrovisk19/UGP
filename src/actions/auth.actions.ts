'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function signInWithEmail(email: string, password: string) {
  const normalizedEmail = String(email ?? '').trim().toLowerCase()
  const normalizedPassword = String(password ?? '')

  // 1. Validação de campos obrigatórios
  if (!normalizedEmail) return { error: 'Informe seu email.' }
  if (!normalizedPassword) return { error: 'Informe sua senha.' }
  if (normalizedEmail.length > 320) return { error: 'Email muito longo.' }
  if (normalizedPassword.length > 256) return { error: 'Senha muito longa.' }

  // 2. Validação de formato de email
  if (!EMAIL_RE.test(normalizedEmail)) {
    return { error: 'Email inválido. Verifique o formato (ex: voce@email.com).' }
  }

  const supabase = await createClient()
  const response = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password: normalizedPassword,
  })

  if (response.error) {
    return { error: translateAuthError(response.error) }
  }

  revalidatePath('/', 'layout')
  redirect('/gate')
}

function translateAuthError(error: {
  message: string
  status?: number
  code?: string | number
}): string {
  const msg = error.message?.toLowerCase() ?? ''
  const code = String(error.code ?? error.status ?? '')

  // Credenciais inválidas (mais comum)
  if (msg.includes('invalid login credentials') || code === 'invalid_credentials') {
    return 'Email ou senha incorretos. Verifique e tente novamente.'
  }
  // Email não confirmado
  if (msg.includes('email not confirmed') || msg.includes('email_not_confirmed')) {
    return 'Você precisa confirmar seu email antes de entrar. Verifique sua caixa de entrada (e o spam).'
  }
  // Muitas tentativas (rate limit)
  if (msg.includes('rate limit') || code === '429' || code === 'over_request_rate_limit') {
    return 'Muitas tentativas seguidas. Aguarde alguns minutos e tente novamente.'
  }
  // Conta banida / desativada
  if (msg.includes('user banned') || msg.includes('banned')) {
    return 'Esta conta foi desativada. Entre em contato com o suporte.'
  }
  // Provider desabilitado
  if (msg.includes('provider is not enabled') || msg.includes('provider_disabled')) {
    return 'Este método de login não está disponível no momento.'
  }
  // Campos faltando (defensivo — já validamos acima)
  if (msg.includes('missing') && msg.includes('email')) {
    return 'Informe seu email.'
  }
  if (msg.includes('missing') && msg.includes('password')) {
    return 'Informe sua senha.'
  }
  // Rede/servidor
  if (msg.includes('network') || msg.includes('fetch') || code === '504' || code === '503') {
    return 'Falha de conexão com o servidor. Verifique sua internet e tente novamente.'
  }
  // Caso genérico cuja mensagem original já está em PT (raro) — mantém, senão traduz fallback
  return 'Não foi possível entrar. Tente novamente em instantes.'
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
    revalidatePath('/', 'page')
    redirect('/gate')
  }

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