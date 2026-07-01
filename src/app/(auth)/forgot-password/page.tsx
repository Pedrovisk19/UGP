'use client'

import { useState } from 'react'
import { Loader2, MailCheck } from 'lucide-react'
import { AuthShell } from '@/components/auth/AuthShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { resetPasswordRequest } from '@/actions/auth.actions'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await resetPasswordRequest(email)
    setLoading(false)
    setSent(true)
  }

  return (
    <AuthShell title="Esqueci a senha" subtitle="Enviaremos um link de redefinição por email">
      {sent ? (
        <div className="space-y-3 text-center">
          <MailCheck className="h-10 w-10 mx-auto text-emerald-400" />
          <p className="text-[13px] text-[hsl(var(--foreground))]">
            Se uma conta existir com <strong>{email}</strong>, você receberá um email com instruções.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Enviar link de redefinição
          </Button>
        </form>
      )}
    </AuthShell>
  )
}