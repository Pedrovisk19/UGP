'use client'

import * as React from 'react'
import { Card, ProgressHeader } from './shared'
import { OptionButton, FeedbackBox } from './shared'
import type { MultipleChoiceQuestion } from '@/types/ugp.types'

interface Props {
  q: MultipleChoiceQuestion
  index: number
  total: number
  onAnswer: (correct: boolean) => void
}

const LETTERS = ['A', 'B', 'C', 'D', 'E']

export function MULTIPLE_CHOICE({ q, index, total, onAnswer }: Props) {
  const [picked, setPicked] = React.useState<number | null>(null)
  const answered = picked !== null

  function pick(i: number) {
    if (answered) return
    setPicked(i)
  }

  function next() {
    onAnswer(picked === q.correct)
    setPicked(null)
  }

  return (
    <Card className="p-5 md:p-6">
      <ProgressHeader index={index} total={total} difficulty={q.difficulty} category={q.category} />
      <p className="text-[15px] leading-relaxed text-[hsl(var(--foreground))]">{q.question}</p>

      <div className="mt-4 space-y-2">
        {q.options.map((opt, i) => (
          <OptionButton
            key={i}
            selected={picked === i}
            disabled={answered}
            onClick={() => pick(i)}
            state={
              !answered
                ? undefined
                : i === q.correct
                ? 'correct'
                : i === picked
                ? 'incorrect'
                : 'unselected-correct'
            }
          >
            <span className="mr-2 font-mono text-[12px] text-[hsl(var(--muted-foreground))]">{LETTERS[i]}.</span>
            <span>{opt}</span>
          </OptionButton>
        ))}
      </div>

      {answered && (
        <FeedbackBox
          correct={picked === q.correct}
          explanation={q.explanation}
          why={q.why}
          reviewAnchor={q.reviewAnchor}
          onContinue={next}
          continueLabel={index + 1 >= total ? 'Ver resultado' : 'Próxima questão'}
        />
      )}
    </Card>
  )
}