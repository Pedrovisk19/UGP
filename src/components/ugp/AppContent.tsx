'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useUGP, useTotalModules } from '@/providers/UGPProvider'
import { useAuth } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'

export function AppContent({ children }: { children: React.ReactNode }) {
  const { user, completedModules } = useUGP()
  const { loading: authLoading, authError } = useAuth()
  const totalModules = useTotalModules()
  const progressPct = totalModules ? (completedModules.size / totalModules) * 100 : 0
  const router = useRouter();
  const [showSlow, setShowSlow] = useState(false)
  useEffect(() => {
    if (!authLoading && !authError) return
    const t = setTimeout(() => setShowSlow(true), 4000)
    router.push('/login')
    return () => clearTimeout(t)
  }, [authLoading, authError,router])

  if (!user) {
    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center gap-3"
        style={{ background: 'var(--canvas)' }}
      >
        <div className="h-8 w-8 border-2 border-white/10 border-t-purple-500 rounded-full animate-spin" />
        {showSlow && (
          <p className="text-[13px] text-[hsl(var(--muted-foreground))]">
            {authError === 'session_timeout' || authError === 'session_error'
              ? 'Sua sessão não pôde ser validada. Redirecionando para o login…'
              : 'Carregando… se demorar, você será redirecionado para o login.'}
          </p>
        )}
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ background: 'var(--canvas)', color: 'var(--text-primary)' }}
    >
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)', filter: 'blur(80px)' }}
        />
      </div>

      <Sidebar completedModules={completedModules} />

      <div className="flex-1 min-w-0 flex flex-col">
        <Header user={user} progressPct={progressPct} completedModules={completedModules} />
        <main className="flex-1 w-full max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
          {children}
        </main>
      </div>
    </div>
  )
}