'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import type { SummaryCard } from '@/types/ugp.types'

export function SummaryCards({ cards }: { cards: SummaryCard[] }) {
  if (!cards?.length) return null
  return (
    <section id="resumo" className="scroll-mt-24">
      <header className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Conclusão</p>
        <h2 className="font-heading text-2xl font-bold tracking-tight">O que você aprendeu</h2>
      </header>
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((c, i) => (
          <Card key={i} className="p-4 transition-colors hover:border-[var(--border-strong)]">
            <div className="flex items-start gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-lg"
                style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)' }}
              >
                <span aria-hidden>{c.icon}</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-heading text-[15px] font-semibold leading-tight">{c.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[hsl(var(--muted-foreground))]">{c.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}