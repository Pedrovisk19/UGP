'use client'

import * as React from 'react'
import Link from 'next/link'
import { Trophy, Medal, Award, BookOpen, Clock, Target, RotateCcw } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProgressHeader, type QuizResult } from './QuestionCard'
import type { ModuleMeta } from '@/types/ugp.types'

function classification(pct: number): { icon: React.ElementType; tone: string; title: string; subtitle: string; color: string } {
  if (pct === 100) return { icon: Trophy, tone: 'gold', title: 'Excelente', subtitle: 'Você dominou este módulo.', color: '#fcd34d' }
  if (pct >= 80)  return { icon: Medal,  tone: 'silver', title: 'Muito bom', subtitle: 'Você compreendeu praticamente todo o conteúdo.', color: '#a5b4fc' }
  if (pct >= 60)  return { icon: Award,  tone: 'bronze', title: 'Bom', subtitle: 'Você pode avançar, mas recomendamos revisar alguns tópicos.', color: '#6ee7b7' }
  return            { icon: BookOpen, tone: 'review', title: 'Vamos revisar', subtitle: 'Recomendamos revisar este módulo antes de continuar.', color: '#fca5a5' }
}

interface Props {
  result: QuizResult
  meta: ModuleMeta
  bestPercentage?: number | null
  attempts: number
  onRetry: () => void
}

export function QuizResultView({ result, meta, bestPercentage, attempts, onRetry }: Props) {
  const pct = result.percentages
  const cls = classification(pct)
  const Icon = cls.icon
  const seconds = Math.max(1, Math.round(result.durationMs / 1000))
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  const isPB = bestPercentage == null || pct > bestPercentage

  return (
    <Card className="overflow-hidden">
      <div
        className="relative px-6 py-10 text-center"
        style={{
          background: `radial-gradient(700px 240px at 50% -10%, ${cls.color}22, transparent 60%), var(--canvas-raised)`,
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: `${cls.color}22`, border: `2px solid ${cls.color}` }}
        >
          <Icon className="h-8 w-8" style={{ color: cls.color }} />
        </div>
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider" style={{ color: cls.color }}>{cls.title}</p>
        <p className="mt-1 font-heading text-3xl font-bold leading-none">{pct}%</p>
        <p className="mt-2 text-[14px] text-[hsl(var(--muted-foreground))]">{cls.subtitle}</p>
        {isPB && attempts > 0 && (
          <span className="mt-3 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px]" style={{ borderColor: `${cls.color}55`, color: cls.color, background: `${cls.color}11` }}>
            ⭐ Novo recorde pessoal
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 p-5 md:grid-cols-4">
        {[
          { label: 'Acertos', value: `${result.score}/${result.total}`, icon: Target, color: '#6ee7b7' },
          { label: 'Erros', value: `${result.total - result.score}`, icon: BookOpen, color: '#fca5a5' },
          { label: 'Tempo', value: `${minutes}m ${secs}s`, icon: Clock, color: '#a5b4fc' },
          { label: 'Tentativas', value: `${attempts + 1}`, icon: Trophy, color: '#fcd34d' },
        ].map((s, i) => {
          const I = s.icon
          return (
            <div key={i} className="rounded-lg border p-3" style={{ borderColor: 'var(--border-subtle)', background: 'var(--canvas-subtle)' }}>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]"><I className="h-3 w-3" style={{ color: s.color }} />{s.label}</div>
              <p className="mt-1 font-heading text-xl font-bold">{s.value}</p>
            </div>
          )
        })}
      </div>

      <div className="flex flex-col items-center justify-between gap-3 border-t p-5 sm:flex-row" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="text-[13px] text-[hsl(var(--muted-foreground))]">
          {pct < 60
            ? 'Revise o módulo e tente novamente — cada tentativa consolida mais conhecimento.'
            : 'Excelente investida! Continue para o próximo módulo recomendado.'}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RotateCcw className="h-4 w-4" /> Refazer
          </Button>
          <Link href={`/content/${meta.nextSteps[0]?.ref ?? ''}`} className="inline-flex">
            <Button size="sm">Próximo módulo</Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

export { ProgressHeader }