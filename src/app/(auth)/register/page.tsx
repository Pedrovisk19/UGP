'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Loader2, GraduationCap, MailCheck } from 'lucide-react'
import { AuthShell } from '@/components/auth/AuthShell'
import { GoogleIcon } from '@/components/auth/GoogleIcon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signUpWithEmail, signInWithGoogle } from '@/actions/auth.actions'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (password !== confirm) {
      setError('As senhas não coincidem')
      return
    }
    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres')
      return
    }
    setLoading(true)
    const res = await signUpWithEmail(email, password)
    setLoading(false)
    if ('error' in res && res.error) {
      setError(res.error)
      return
    }
    setSent(true)
  }

  async function handleGoogle() {
    setGoogleLoading(true)
    setError(null)
    const res = await signInWithGoogle()
    if ('error' in res && res.error) {
      setError(res.error)
      setGoogleLoading(false)
      return
    }
    if (res?.url) window.location.href = res.url
  }

  if (sent) {
    return (
      <AuthShell title="Verifique seu email" subtitle="Quase lá! Só falta confirmar sua conta.">
        <div className="space-y-4 text-center">
          <MailCheck className="h-12 w-12 mx-auto text-emerald-400" />
          <p className="text-[14px] text-[hsl(var(--foreground))]">
            Enviamos um link de confirmação para
          </p>
          <p className="text-[14px] font-semibold text-[hsl(var(--primary))] break-all">{email}</p>
          <p className="text-[13px] text-[hsl(var(--muted-foreground))]">
            Clique no link dentro do email para ativar sua conta e acessar a UGP.
            O link expira em 1 hora.
          </p>
          <div className="pt-2">
            <Link
              href="/login"
              className="text-[13px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            >
              Já confirmou? Fazer login →
            </Link>
          </div>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell title="Criar conta na UGP" subtitle="Comece sua jornada gratuitamente">
      <div className="space-y-4">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogle}
          disabled={googleLoading || loading}
        >
          {googleLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
          Continuar com Google
        </Button>

        {error && (
          <div className="text-[12px] text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-3">
          <Input
            type="email"
            placeholder="email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <Input
            type="password"
            placeholder="Confirmar senha"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            autoComplete="new-password"
          />
          <Button type="submit" className="w-full" disabled={loading || googleLoading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <GraduationCap className="h-4 w-4" />}
            Criar conta
          </Button>
        </form>

        <div className="flex items-center justify-between text-[12px] text-[hsl(var(--muted-foreground))]">
          <Link href="/login" className="hover:text-[hsl(var(--foreground))]">
            Já tenho conta
          </Link>
        </div>
      </div>
    </AuthShell>
  )
}