'use client'

import * as React from 'react'
import Link from 'next/link'
import { Check, X, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export interface FeedbackState {
  answered: boolean
  correct: boolean
}

export function OptionButton({
  children,
  selected,
  state,
  onClick,
  disabled,
}: {
  children: React.ReactNode
  selected: boolean
  state?: 'correct' | 'incorrect' | 'unselected-correct'
  onClick?: () => void
  disabled?: boolean
}) {
  const styles =
    state === 'correct'
      ? { background: 'rgba(16,185,129,0.14)', borderColor: 'rgba(16,185,129,0.5)' }
      : state === 'incorrect'
      ? { background: 'rgba(239,68,68,0.12)', borderColor: 'rgba(239,68,68,0.45)' }
      : state === 'unselected-correct'
      ? { background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.3)' }
      : selected
      ? { background: 'rgba(139,92,246,0.14)', borderColor: 'rgba(139,92,246,0.55)' }
      : { background: 'rgba(255,255,255,0.02)', borderColor: 'var(--border-subtle)' }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'w-full rounded-lg border px-4 py-3 text-left text-[14px] transition-all duration-150',
        'hover:border-[var(--border-strong)] disabled:cursor-default'
      )}
      style={styles}
    >
      <div className="flex items-start gap-3">
        <span>{children}</span>
        {state === 'correct' && <Check className="ml-auto h-4 w-4 text-emerald-400" strokeWidth={3} />}
        {state === 'incorrect' && <X className="ml-auto h-4 w-4 text-rose-400" strokeWidth={3} />}
        {state === 'unselected-correct' && <Check className="ml-auto h-4 w-4 text-emerald-400/60" strokeWidth={3} />}
      </div>
    </button>
  )
}

export function FeedbackBox({
  correct,
  explanation,
  why,
  reviewAnchor,
  onContinue,
  continueLabel = 'Próxima questão',
}: {
  correct: boolean
  explanation: string
  why?: string[]
  reviewAnchor: string
  onContinue: () => void
  continueLabel?: string
}) {
  return (
    <div
      className="mt-5 rounded-lg border p-4"
      style={{
        borderColor: correct ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)',
        background: correct ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
      }}
    >
      <div className="flex items-center gap-2 text-[14px] font-semibold" style={{ color: correct ? '#6ee7b7' : '#fca5a5' }}>
        {correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
        {correct ? 'Correta' : 'Incorreta'}
      </div>

      {explanation && (
        <p className="mt-2 text-[14px] leading-relaxed text-[hsl(var(--foreground))]">
          <span className="font-semibold text-[hsl(var(--foreground))]">Por que essa resposta está certa: </span>
          {explanation}
        </p>
      )}

      {why && why.length > 0 && (
        <div className="mt-3">
          <p className="text-[12px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Por que as outras estão erradas</p>
          <ul className="mt-2 space-y-1.5">
            {why.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-[hsl(var(--muted-foreground))]">
                <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-rose-400/70" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <Link
          href={`#${reviewAnchor}`}
          className="inline-flex items-center gap-1.5 text-[12px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Revisar conteúdo
        </Link>
        <Button size="sm" onClick={onContinue}>
          {continueLabel}
        </Button>
      </div>
    </div>
  )
}

export { Card }
export { ProgressHeader } from '../QuestionCard'