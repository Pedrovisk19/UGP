'use client'

import * as React from 'react'
import { FileText } from 'lucide-react'
import { Card, ProgressHeader } from './shared'
import { OptionButton, FeedbackBox } from './shared'
import type { ScenarioQuestion } from '@/types/ugp.types'

const LETTERS = ['A', 'B', 'C', 'D', 'E']

interface Props {
  q: ScenarioQuestion
  index: number
  total: number
  onAnswer: (correct: boolean) => void
}

export function SCENARIO({ q, index, total, onAnswer }: Props) {
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
        className="rounded-lg p-4 text-[14px] leading-relaxed text-[hsl(var(--foreground))]"
        style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.22)' }}
      >
        <div className="mb-2 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#a5b4fc]">
          <FileText className="h-3.5 w-3.5" /> Cenário da vida real
        </div>
        <p>{q.scenario}</p>
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