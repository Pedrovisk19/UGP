'use client'

import * as React from 'react'
import { Card, ProgressHeader } from './shared'
import { OptionButton, FeedbackBox } from './shared'
import type { TrueFalseQuestion } from '@/types/ugp.types'

interface Props {
  q: TrueFalseQuestion
  index: number
  total: number
  onAnswer: (correct: boolean) => void
}

export function TRUE_FALSE({ q, index, total, onAnswer }: Props) {
  const [picked, setPicked] = React.useState<boolean | null>(null)
  const answered = picked !== null

  function next() {
    onAnswer(picked === q.correct)
    setPicked(null)
  }

  const options: { label: string; value: boolean }[] = [
    { label: 'Verdadeiro', value: true },
    { label: 'Falso', value: false },
  ]

  return (
    <Card className="p-5 md:p-6">
      <ProgressHeader index={index} total={total} difficulty={q.difficulty} category={q.category} />
      <p className="text-[15px] leading-relaxed text-[hsl(var(--foreground))]">{q.question}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {options.map((opt) => {
          const state =
            !answered
              ? undefined
              : opt.value === q.correct
              ? 'correct'
              : opt.value === picked
              ? 'incorrect'
              : 'unselected-correct'
          return (
            <OptionButton
              key={String(opt.value)}
              selected={picked === opt.value}
              disabled={answered}
              onClick={() => !answered && setPicked(opt.value)}
              state={state as any}
            >
              <span className="font-heading text-[15px] font-semibold">{opt.label}</span>
            </OptionButton>
          )
        })}
      </div>

      {answered && (
        <FeedbackBox
          correct={picked === q.correct}
          explanation={q.explanation}
          reviewAnchor={q.reviewAnchor}
          onContinue={next}
          continueLabel={index + 1 >= total ? 'Ver resultado' : 'Próxima questão'}
        />
      )}
    </Card>
  )
}