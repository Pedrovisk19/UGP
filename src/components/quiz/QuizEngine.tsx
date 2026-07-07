'use client'

import * as React from 'react'
import { QuestionCard } from './QuestionCard'
import { QuizResultView } from './QuizResult'
import { QuizStartCard } from './QuizStartCard'
import type { ModuleMeta, Question } from '@/types/ugp.types'

type Phase = 'idle' | 'running' | 'finished'

interface QuizEngineProps {
  meta: ModuleMeta
  questions: Question[]
  bestPercentage: number | null
  attempts: number
  onSaveAttempt: (result: {
    score: number
    total: number
    percentage: number
    correctIds: string[]
    incorrectIds: string[]
    durationMs: number
  }) => Promise<void>
}

export function QuizEngine({ meta, questions, bestPercentage, attempts, onSaveAttempt }: QuizEngineProps) {
  const [phase, setPhase] = React.useState<Phase>('idle')
  const [idx, setIdx] = React.useState(0)
  const [correctIds, setCorrectIds] = React.useState<string[]>([])
  const [incorrectIds, setIncorrectIds] = React.useState<string[]>([])
  const [startedAt, setStartedAt] = React.useState<number>(0)
  const [durationMs, setDurationMs] = React.useState<number>(0)
  const [saving, setSaving] = React.useState(false)

  function start() {
    setPhase('running')
    setIdx(0)
    setCorrectIds([])
    setIncorrectIds([])
    setStartedAt(Date.now())
  }

  const isLast = questions.length > 0 && idx === questions.length - 1

  function handleAnswerWrapped(correct: boolean) {
    const q = questions[idx]
    const correctList = correct ? [...correctIds, q.id] : correctIds
    const incorrectList = !correct ? [...incorrectIds, q.id] : incorrectIds

    if (isLast) {
      // Fim — finaliza agora com os dados acumulados (incluindo essa resposta).
      const score = correctList.length
      const total = questions.length
      const percentage = total > 0 ? Math.round((score / total) * 100) : 0
      const dur = Date.now() - startedAt
      setCorrectIds(correctList)
      setIncorrectIds(incorrectList)
      setDurationMs(dur)
      setPhase('finished')
      setSaving(true)
      onSaveAttempt({ score, total, percentage, correctIds: correctList, incorrectIds: incorrectList, durationMs: dur })
        .finally(() => setSaving(false))
    } else {
      // Avança normalmente.
      if (correct) setCorrectIds((arr) => (arr.includes(q.id) ? arr : [...arr, q.id]))
      else setIncorrectIds((arr) => (arr.includes(q.id) ? arr : [...arr, q.id]))
      setIdx((i) => i + 1)
    }
  }

  if (phase === 'idle') {
    return <QuizStartCard meta={meta} bestPercentage={bestPercentage} attempts={attempts} onStart={start} />
  }

  if (phase === 'finished') {
    return (
      <QuizResultView
        result={{
          score: correctIds.length,
          total: questions.length,
          percentages: questions.length > 0 ? Math.round((correctIds.length / questions.length) * 100) : 0,
          correctIds,
          incorrectIds,
          durationMs,
        }}
        meta={meta}
        bestPercentage={bestPercentage}
        attempts={attempts}
        onRetry={start}
      />
    )
  }

  const q = questions[idx]
  if (!q) return null

  return (
    <div className="space-y-3">
      <QuestionCard question={q} index={idx} total={questions.length} onAnswer={handleAnswerWrapped} />
      {saving && <p className="text-[12px] text-[hsl(var(--muted-foreground))]">Salvando sua tentativa…</p>}
    </div>
  )
}