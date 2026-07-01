'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ExternalLink } from 'lucide-react'
import { COURSE_CATEGORIES, STUDY_PLAN_WEEKS } from '@/lib/coursesContent'
import { cn } from '@/lib/utils'

export default function CursosGratuitosPage() {
  const [open, setOpen] = useState<Record<string, boolean>>({
    [COURSE_CATEGORIES[0].id]: true,
  })

  return (
    <div className="space-y-6 max-w-3xl">
      <nav className="flex items-center gap-2 text-[12px] text-[hsl(var(--muted-foreground))]">
        <Link href="/app" className="hover:text-[hsl(var(--foreground))]">Início</Link>
        <span>/</span>
        <span className="text-[hsl(var(--foreground))]">Cursos Gratuitos</span>
      </nav>

      <header>
        <h1 className="font-heading text-3xl font-bold mb-2">Cursos Gratuitos Curados</h1>
        <p className="text-[14px] text-[hsl(var(--muted-foreground))]">
          11 categorias com cursos selecionados a dedo, ligados diretamente aos projetos da UGP.
        </p>
      </header>

      <div className="space-y-3">
        {COURSE_CATEGORIES.map((cat) => {
          const isOpen = open[cat.id]
          return (
            <div key={cat.id} className="ugp-surface">
              <button
                onClick={() => setOpen((o) => ({ ...o, [cat.id]: !o[cat.id] }))}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="font-heading font-semibold text-[14px]">{cat.name}</span>
                <span className="text-[11px] text-[hsl(var(--muted-foreground))]">
                  {cat.courses.length} curso(s)
                  <ChevronDown className={cn('h-4 w-4 inline ml-2 transition-transform', isOpen && 'rotate-180')} />
                </span>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-3">
                  {cat.courses.map((c) => (
                    <div key={c.name} className="p-3 rounded-md border border-white/10">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-heading font-semibold text-[14px]">{c.name}</h3>
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[12px] text-[hsl(var(--primary))] hover:underline"
                        >
                          Acessar <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="ugp-tag ugp-badge-blue">{c.duration}</span>
                        <span className="ugp-tag ugp-badge-purple">{c.level}</span>
                        <span className="ugp-tag ugp-badge-neutral">{c.channel}</span>
                      </div>
                      <p className="text-[12px] text-[hsl(var(--muted-foreground))] mb-1">
                        <strong className="text-[hsl(var(--foreground))]">O que aprende:</strong> {c.learn}
                      </p>
                      <p className="text-[12px] text-[hsl(var(--muted-foreground))] mb-1">
                        <strong className="text-[hsl(var(--foreground))]">Por que:</strong> {c.why}
                      </p>
                      <p className="text-[12px] text-[hsl(var(--muted-foreground))] mb-1">
                        <strong className="text-[hsl(var(--foreground))]">Projetos UGP:</strong>{' '}
                        {c.ugProjects.map((p) => `#${String(p).padStart(2, '0')}`).join(' · ')}
                      </p>
                      <p className="text-[12px] text-[hsl(var(--muted-foreground))]">
                        <strong className="text-[hsl(var(--foreground))]">Depois estudar:</strong> {c.next}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <section className="ugp-surface p-5">
        <h2 className="font-heading font-semibold mb-3 text-[14px]">Plano de estudos (28 semanas)</h2>
        <div className="space-y-2">
          {STUDY_PLAN_WEEKS.map((w) => (
            <div
              key={w.week}
              className="flex items-center justify-between gap-3 p-3 rounded-md border border-white/10"
            >
              <div className="flex items-center gap-3">
                <span className="ugp-tag ugp-badge-amber tabular-nums">{w.week}</span>
                <span className="text-[13px] text-[hsl(var(--foreground))]">{w.focus}</span>
              </div>
              <span className="text-[12px] text-[hsl(var(--muted-foreground))]">{w.milestone}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}