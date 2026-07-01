'use client'

import { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { AuthShell } from '@/components/auth/AuthShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { resetPassword } from '@/actions/auth.actions'

function ResetForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Supabase passa o código via hash (;type=recovery) — o middleware já autentica.
  // Aqui usamos updateUser direto pois o usuário já tem sessão via hash.

  async function handleSubmit(e: React.FormEvent) {
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
    const res = await resetPassword(password)
    setLoading(false)
    if (res && 'error' in res && res.error) {
      setError(res.error)
      return
    }
    router.push('/login')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <div className="text-[12px] text-red-400 bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2">
          {error}
        </div>
      )}
      <Input
        type="password"
        placeholder="Nova senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="new-password"
      />
      <Input
        type="password"
        placeholder="Confirmar nova senha"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
        autoComplete="new-password"
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Redefinir senha
      </Button>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <AuthShell title="Redefinir senha" subtitle="Defina sua nova senha de acesso">
      <Suspense fallback={<div className="text-[12px] text-[hsl(var(--muted-foreground))]">Carregando…</div>}>
        <ResetForm />
      </Suspense>
    </AuthShell>
  )
}