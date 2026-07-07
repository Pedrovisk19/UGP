'use client'

import * as React from 'react'
import { Brain, Loader2, Play, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { ModuleMeta } from '@/types/ugp.types'

interface QuizStartCardProps {
  meta: ModuleMeta
  bestPercentage: number | null
  attempts: number
  onStart: () => void
  saving?: boolean
}

export function QuizStartCard({ meta, bestPercentage, attempts, onStart, saving }: QuizStartCardProps) {
  const questionCount = meta.summary ? 0 : 0 // só decorativo; ligado depois no engine
  return (
    <section id="quiz" className="scroll-mt-24">
      <Card
        className="relative overflow-hidden p-6"
        style={{
          background:
            'radial-gradient(700px 220px at 100% -10%, rgba(139,92,246,0.18), transparent 60%),' +
            'radial-gradient(500px 180px at 0% 110%, rgba(99,102,241,0.14), transparent 60%),' +
            'var(--canvas-raised)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--primary))]">
              <Sparkles className="h-3.5 w-3.5" /> Sistema de Fixação
            </div>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight flex items-center gap-2">
              <Brain className="h-5 w-5 text-[hsl(var(--primary))]" />
              Teste seus conhecimentos
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[hsl(var(--muted-foreground))]">
              Valide o que você acabou de aprender. Perguntas que fazem pensar — não decorar. Após concluir, sua nota é salva automaticamente.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-[hsl(var(--muted-foreground))]">
              {bestPercentage != null && (
                <span className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1" style={{ borderColor: 'var(--border-subtle)' }}>
                  🏆 Melhor nota: <span className="font-mono text-[hsl(var(--foreground))]">{bestPercentage}%</span>
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1" style={{ borderColor: 'var(--border-subtle)' }}>
                🔁 Tentativas: <span className="font-mono text-[hsl(var(--foreground))]">{attempts}</span>
              </span>
            </div>
          </div>

          <Button size="lg" onClick={onStart} disabled={saving} className="shrink-0">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            Iniciar desafio
          </Button>
        </div>
      </Card>
      {questionCount > 0 && null}
    </section>
  )
}