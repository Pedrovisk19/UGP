'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Check } from 'lucide-react'
import { TRAILS } from '@/lib/ugpContent'
import { selectTrail } from '@/actions/auth.actions'
import { useAuth } from '@/providers/AuthProvider'

export default function GatePage() {
  const router = useRouter()
  const { refreshProfile } = useAuth()
  const [selecting, setSelecting] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    refreshProfile().then((p) => {
      if (p?.selected_trail) {
        router.push('/app')
        return
      }
      setLoading(false)
    })
  }, [router, refreshProfile])

  async function handleSelect(trailId: string) {
    setSelecting(trailId)
    await selectTrail(trailId)
    router.push('/app')
    router.refresh()
  }

  if (loading) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ background: 'var(--canvas)' }}
      >
        <div className="h-8 w-8 border-2 border-white/10 border-t-purple-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div
      className="min-h-screen relative flex items-center justify-center px-4 py-10"
      style={{ background: 'var(--canvas)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgba(99,102,241,0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(139,92,246,0.12), transparent 40%)',
        }}
      />
      <div className="relative z-10 w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl font-bold mb-2">Escolha sua trilha</h1>
          <p className="text-[13px] text-[hsl(var(--muted-foreground))]">
            Esta escolha define seu ponto de partida na UGP. Você pode mudar depois.
          </p>
        </div>

        <div className="grid gap-3">
          {TRAILS.map((trail) => (
            <button
              key={trail.id}
              onMouseEnter={() => setHovered(trail.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleSelect(trail.id)}
              disabled={!!selecting}
              className="ugp-surface p-5 text-left transition-all hover:-translate-y-0.5 disabled:opacity-70"
              style={{
                borderColor:
                  hovered === trail.id || selecting === trail.id
                    ? trail.border
                    : 'var(--border-subtle)',
                boxShadow:
                  hovered === trail.id || selecting === trail.id
                    ? trail.glow
                    : undefined,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-[12px] font-semibold text-white mb-2"
                    style={{ background: trail.gradient }}
                  >
                    {trail.name}
                  </div>
                  <p className="text-[13px] text-[hsl(var(--muted-foreground))]">
                    {trail.tagline}
                  </p>
                </div>
                {selecting === trail.id ? (
                  <Loader2 className="h-5 w-5 animate-spin text-[hsl(var(--primary))]" />
                ) : (
                  <Check className="h-5 w-5 text-[hsl(var(--muted-foreground))] opacity-0" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}