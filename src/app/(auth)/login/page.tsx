'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2, GraduationCap } from 'lucide-react'
import { AuthShell } from '@/components/auth/AuthShell'
import { GoogleIcon } from '@/components/auth/GoogleIcon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { signInWithGoogle } from '@/actions/auth.actions'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    router.push('/app')
    router.refresh()
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
    if (res?.url) {
      window.location.href = res.url
    }
  }

  return (
    <AuthShell title="Entrar na UGP" subtitle="Acesse sua conta para continuar">
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

        <form onSubmit={handleSubmit} className="space-y-3">
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
            autoComplete="current-password"
          />
          <Button type="submit" className="w-full" disabled={loading || googleLoading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <GraduationCap className="h-4 w-4" />}
            Entrar com email
          </Button>
        </form>

        <div className="flex items-center justify-between text-[12px] text-[hsl(var(--muted-foreground))]">
          <Link href="/forgot-password" className="hover:text-[hsl(var(--foreground))]">
            Esqueci a senha
          </Link>
          <Link href="/register" className="hover:text-[hsl(var(--foreground))]">
            Criar conta
          </Link>
        </div>
      </div>
    </AuthShell>
  )
}