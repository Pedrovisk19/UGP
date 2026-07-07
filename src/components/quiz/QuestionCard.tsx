'use client'

import * as React from 'react'
import Link from 'next/link'
import { Trophy, Flame, Loader2, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Question } from '@/types/ugp.types'
import { MULTIPLE_CHOICE } from './questions/MultipleChoice'
import { TRUE_FALSE } from './questions/TrueFalse'
import { ASSOC } from './questions/Assoc'
import { ORDER } from './questions/Order'
import { SCENARIO } from './questions/Scenario'
import { ENGINEERING } from './questions/Engineering'

export interface QuizResult {
  score: number
  total: number
  percentages: number
  correctIds: string[]
  incorrectIds: string[]
  durationMs: number
}

interface QuestionCardProps {
  question: Question
  index: number
  total: number
  onAnswer: (correct: boolean) => void
}

export function QuestionCard({ question, index, total, onAnswer }: QuestionCardProps) {
  switch (question.type) {
    case 'multiple-choice': return <MULTIPLE_CHOICE key={question.id} q={question} index={index} total={total} onAnswer={onAnswer} />
    case 'true-false':     return <TRUE_FALSE     key={question.id} q={question} index={index} total={total} onAnswer={onAnswer} />
    case 'assoc':          return <ASSOC          key={question.id} q={question} index={index} total={total} onAnswer={onAnswer} />
    case 'order':          return <ORDER          key={question.id} q={question} index={index} total={total} onAnswer={onAnswer} />
    case 'scenario':       return <SCENARIO       key={question.id} q={question} index={index} total={total} onAnswer={onAnswer} />
    case 'engineering':    return <ENGINEERING    key={question.id} q={question} index={index} total={total} onAnswer={onAnswer} />
  }
}

export default QuestionCard

export const DIFFICULTY_LABEL: Record<Question['difficulty'], string> = {
  basic: 'Básica',
  intermediate: 'Intermediária',
  advanced: 'Avançada',
}

export const CATEGORY_LABEL: Record<Question['category'], string> = {
  conceito: 'Conceito',
  interpretacao: 'Interpretação',
  decisao: 'Decisão técnica',
  raciocinio: 'Raciocínio lógico',
  aplicacao: 'Aplicação prática',
  contexto: 'Contexto histórico',
  seguranca: 'Segurança',
}

export function ProgressHeader({ index, total, difficulty, category }: { index: number; total: number; difficulty: Question['difficulty']; category: Question['category'] }) {
  const pct = Math.round(((index) / total) * 100)
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 items-center gap-1 rounded-md px-2 text-[11px] font-mono font-medium ugp-badge-indigo">
            <Sparkles className="h-3 w-3" /> Questão {index + 1} <span className="opacity-50">/ {total}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[hsl(var(--muted-foreground))]">
          <span className="ugp-tag ugp-badge-neutral">{DIFFICULTY_LABEL[difficulty]}</span>
          <span className="ugp-tag ugp-badge-purple">{CATEGORY_LABEL[category]}</span>
        </div>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: 'linear-gradient(90deg,var(--accent-indigo),var(--accent-purple))' }} />
      </div>
    </div>
  )
}

export function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.round((value / Math.max(1, max)) * 100)
  return (
    <div className="flex items-center gap-2 text-[12px] text-[hsl(var(--muted-foreground))]">
      <div className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: 'linear-gradient(90deg,var(--accent-indigo),var(--accent-purple))' }} />
      </div>
      <span className="tabular-nums">{pct}%</span>
    </div>
  )
}

export { Trophy, Flame, Loader2, Card, Button, Link }