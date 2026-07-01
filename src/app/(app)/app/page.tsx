'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useUGP } from '@/providers/UGPProvider'
import { TRAILS, LEVELS, PROJECTS, tagClass } from '@/lib/ugpContent'
import { levelForXp, nextLevel } from '@/lib/utils'
import { MatrixVisual } from '@/components/ugp/MatrixVisual'

export default function HomePage() {
  const { user } = useUGP()
  if (!user) return null

  const trail = TRAILS.find((t) => t.id === user.selected_trail)
  const xp = user.xp_points || 0
  const currentLevel = levelForXp(xp, LEVELS)
  const next = nextLevel(currentLevel.name, LEVELS)
  const prevLevelXp = currentLevel.xp
  const nextLevelXp = next?.xp ?? prevLevelXp
  const xpProgress =
    nextLevelXp > prevLevelXp
      ? ((xp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100
      : 100
  const xpToNext = Math.max(0, nextLevelXp - xp)

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="ugp-surface p-6 sm:p-8">
        <div className="flex items-center gap-2 text-[11px] text-[hsl(var(--muted-foreground))] uppercase tracking-widest mb-3">
          <span>Trilha ativa</span>
          <span className="text-[hsl(var(--primary))]">{trail?.name ?? '—'}</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-1">
          Olá, {(user.full_name ?? user.email ?? 'dev').split(' ')[0].split('@')[0]} 👋
        </h1>
        <p className="text-[14px] text-[hsl(var(--muted-foreground))] mb-6">
          Você está em <strong className="text-[hsl(var(--foreground))]">{currentLevel.name}</strong> com{' '}
          <strong className="text-amber-400">{xp} XP</strong>.
        </p>

        <div className="mb-2 flex items-center justify-between text-[12px]">
          <span className="text-[hsl(var(--muted-foreground))]">
            {currentLevel.xp} XP
          </span>
          {next && (
            <span className="text-[hsl(var(--muted-foreground))]">
              Faltam <strong className="text-amber-400">{xpToNext} XP</strong> para{' '}
              <strong className="text-[hsl(var(--foreground))]">{next.name}</strong>
            </span>
          )}
          <span className="text-[hsl(var(--muted-foreground))]">{next?.xp ?? 'MAX'} XP</span>
        </div>
        <div className="h-3 rounded-full bg-white/10 overflow-hidden mb-6">
          <div
            className="h-full rounded-full transition-[width] duration-700"
            style={{
              width: `${Math.min(100, xpProgress)}%`,
              background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
            }}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/content/manifesto"
            className="inline-flex items-center gap-2 px-4 h-10 rounded-md text-white text-sm font-medium"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            Ler o Manifesto <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/projects/1"
            className="inline-flex items-center gap-2 px-4 h-10 rounded-md border border-white/10 text-sm font-medium hover:bg-white/5"
          >
            Ver Projetos
          </Link>
        </div>
      </section>

      {/* Matriz */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg font-semibold">Matriz de Progressão</h2>
          <Link href="/content/matriz" className="text-[12px] text-[hsl(var(--primary))] hover:underline">
            Ver tudo
          </Link>
        </div>
        <MatrixVisual currentLevel={currentLevel.name} />
      </section>

      {/* Projetos */}
      <section>
        <h2 className="font-heading text-lg font-semibold mb-4">Projetos Corporativos</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {PROJECTS.map((p) => (
            <Link
              key={p.id}
              href={`/projects/${p.id}`}
              className="ugp-surface p-5 transition-all hover:border-white/20 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="ugp-tag ugp-badge-neutral tabular-nums">
                  #{String(p.id).padStart(2, '0')}
                </span>
                <span className="ugp-tag ugp-badge-purple">{p.level}</span>
                <span className="ugp-tag ugp-badge-amber">{p.xp} XP</span>
              </div>
              <h3 className="font-heading font-semibold mb-1">{p.name}</h3>
              <p className="text-[12px] text-[hsl(var(--muted-foreground))] mb-3 line-clamp-2">
                {p.problem}
              </p>
              <div className="flex items-center gap-1.5 flex-wrap mb-3">
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t} className={tagClass(t)}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-[12px] text-[hsl(var(--muted-foreground))]">
                <span>
                  {p.functional.length + p.nonFunctional.length + p.acceptance.length} itens
                </span>
                <span className="text-[hsl(var(--primary))]">Abrir →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}