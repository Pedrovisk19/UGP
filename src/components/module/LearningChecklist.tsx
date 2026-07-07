'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

/** Checklist de auto-avaliação (sem persistência — puramente visual/local). */
export function LearningChecklist({ items }: { items: string[] }) {
  const [state, setState] = React.useState<boolean[]>(() => items.map(() => false))

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('ugp-checklist-cache')
      if (saved) {
        const obj = JSON.parse(saved)
        if (Array.isArray(obj) && obj.length === items.length) setState(obj)
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    try { localStorage.setItem('ugp-checklist-cache', JSON.stringify(state)) } catch {}
  }, [state])

  const done = state.filter(Boolean).length

  return (
    <section id="checklist" className="scroll-mt-24">
      <header className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Auto-avaliação</p>
        <h2 className="font-heading text-2xl font-bold tracking-tight">Checklist de aprendizado</h2>
        <p className="mt-1 text-[13px] text-[hsl(var(--muted-foreground))]">
          Marque o que você realmente consegue fazer sem consultar.
        </p>
      </header>

      <div
        className="rounded-lg p-4 ugp-surface"
        role="group"
        aria-label="Checklist de aprendizado"
      >
        <div className="mb-3 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${(done / items.length) * 100}%`,
                background: 'linear-gradient(90deg, var(--accent-indigo), var(--accent-purple))',
              }}
            />
          </div>
          <span className="text-[12px] tabular-nums text-[hsl(var(--muted-foreground))]">
            {done}/{items.length}
          </span>
        </div>

        <ul className="space-y-1">
          {items.map((it, idx) => (
            <li key={idx}>
              <button
                onClick={() => setState((s) => s.map((v, i) => (i === idx ? !v : v)))}
                className={cn(
                  'flex w-full items-start gap-3 rounded-md px-2 py-2 text-left text-[14px] transition-colors hover:bg-[rgba(255,255,255,0.03)]'
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all',
                    state[idx]
                      ? 'border-transparent text-[#0d0d12]'
                      : 'border-[var(--border-strong)] text-transparent'
                  )}
                  style={state[idx] ? { background: 'var(--accent-green)' } : undefined}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className={cn('leading-relaxed', state[idx] ? 'text-[hsl(var(--muted-foreground))] line-through' : 'text-[hsl(var(--foreground))]')}>
                  {it}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}