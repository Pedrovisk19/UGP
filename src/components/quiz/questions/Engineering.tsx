'use client'

import * as React from 'react'
import { Brain } from 'lucide-react'
import { Card, ProgressHeader } from './shared'
import { OptionButton, FeedbackBox } from './shared'
import type { EngineeringQuestion } from '@/types/ugp.types'

const LETTERS = ['A', 'B', 'C', 'D', 'E']

interface Props {
  q: EngineeringQuestion
  index: number
  total: number
  onAnswer: (correct: boolean) => void
}

export function ENGINEERING({ q, index, total, onAnswer }: Props) {
  const [picked, setPicked] = React.useState<number | null>(null)
  const answered = picked !== null

  function next() {
    onAnswer(picked === q.correct)
    setPicked(null)
  }

  return (
    <Card className="p-5 md:p-6">
      <ProgressHeader index={index} total={total} difficulty={q.difficulty} category={q.category} />
      <div
        className="rounded-lg p-3 text-[12px] uppercase tracking-wider text-[#c4b5fd] flex items-center gap-1.5"
        style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.22)' }}
      >
        <Brain className="h-3.5 w-3.5" /> Pergunta de engenharia — pense antes de responder
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-[hsl(var(--foreground))]">{q.question}</p>

      <div className="mt-4 space-y-2">
        {q.options.map((opt, i) => (
          <OptionButton
            key={i}
            selected={picked === i}
            disabled={answered}
            onClick={() => !answered && setPicked(i)}
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