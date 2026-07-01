'use client'

import { LogOut, Zap, Shield } from 'lucide-react'
import { signOut } from '@/actions/auth.actions'
import { useRouter } from 'next/navigation'
import type { Profile } from '@/types/ugp.types'
import { MobileNav } from './MobileNav'

interface HeaderProps {
  user: Profile
  progressPct: number
  completedModules: Set<string>
}

export function Header({ user, progressPct, completedModules }: HeaderProps) {
  const router = useRouter()
  const level = user.current_level || 'Extremo Iniciante'
  const xp = user.xp_points || 0

  async function handleLogout() {
    await signOut()
    router.push('/login')
  }

  return (
    <header
      className="sticky top-0 z-20 h-[57px] flex items-center justify-between px-5 sm:px-8"
      style={{
        background: 'rgba(13,13,18,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="lg:hidden">
          <MobileNav completedModules={completedModules} user={user} />
        </div>
        <div className="lg:hidden h-7 w-7 rounded-md flex items-center justify-center text-white text-sm font-bold"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
          U
        </div>
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <span className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
            Progresso
          </span>
          <div className="h-2 w-32 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-700"
              style={{
                width: `${Math.min(100, progressPct)}%`,
                background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              }}
            />
          </div>
          <span className="text-[11px] tabular-nums text-[hsl(var(--muted-foreground))]">
            {Math.round(progressPct)}%
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="ugp-tag ugp-badge-amber">
          <Zap className="h-3 w-3 mr-1" />
          {xp} XP
        </div>
        <div className="ugp-tag ugp-badge-purple">
          <Shield className="h-3 w-3 mr-1" />
          {level}
        </div>
        <button
          onClick={handleLogout}
          className="h-8 w-8 inline-flex items-center justify-center rounded-md text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-white/5"
          aria-label="Sair"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}