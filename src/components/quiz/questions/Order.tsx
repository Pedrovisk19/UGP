'use client'

import * as React from 'react'
import { ArrowDown, ArrowUp, Check, GripVertical } from 'lucide-react'
import { Card, ProgressHeader } from './shared'
import { FeedbackBox } from './shared'
import type { OrderQuestion } from '@/types/ugp.types'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface Props {
  q: OrderQuestion
  index: number
  total: number
  onAnswer: (correct: boolean) => void
}

export function ORDER({ q, index, total, onAnswer }: Props) {
  const [items, setItems] = React.useState(() => shuffle(q.steps))
  const [answered, setAnswered] = React.useState(false)

  React.useEffect(() => { setItems(shuffle(q.steps)) }, [q])

  function move(i: number, dir: -1 | 1) {
    if (answered) return
    setItems((arr) => {
      const j = i + dir
      if (j < 0 || j >= arr.length) return arr
      const copy = [...arr]
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
      return copy
    })
  }

  function check() {
    const correct = items.every((it, i) => it === q.steps[i])
    setAnswered(true)
    onAnswer(correct)
  }

  function next() {
    setAnswered(false)
    setItems(shuffle(q.steps))
  }

  return (
    <Card className="p-5 md:p-6">
      <ProgressHeader index={index} total={total} difficulty={q.difficulty} category={q.category} />
      <p className="text-[15px] leading-relaxed text-[hsl(var(--foreground))]">{q.question}</p>

      <ul className="mt-4 space-y-2">
        {items.map((it, i) => {
          const expected = it === q.steps[i]
          return (
            <li
              key={it}
              className="flex items-center gap-3 rounded-lg border p-3 text-[14px]"
              style={{
                borderColor: answered ? (expected ? 'rgba(16,185,129,0.45)' : 'rgba(239,68,68,0.45)') : 'var(--border-subtle)',
                background: answered ? (expected ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)') : 'rgba(255,255,255,0.02)',
              }}
            >
              <span className="font-mono text-[12px] text-[hsl(var(--muted-foreground))]">{String(i + 1).padStart(2, '0')}</span>
              <GripVertical className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              <span className="flex-1">{it}</span>
              <div className="flex gap-1">
                <button onClick={() => move(i, -1)} disabled={answered || i === 0} className="rounded p-1 disabled:opacity-30 hover:bg-[rgba(255,255,255,0.06)]">
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button onClick={() => move(i, 1)} disabled={answered || i === items.length - 1} className="rounded p-1 disabled:opacity-30 hover:bg-[rgba(255,255,255,0.06)]">
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>
              {answered && (expected ? <Check className="h-4 w-4 text-emerald-400" strokeWidth={3} /> : null)}
            </li>
          )
        })}
      </ul>

      <div className="mt-4 flex justify-end">
        <button
          onClick={check}
          disabled={answered}
          className="rounded-md bg-[var(--accent-purple)] px-4 py-2 text-[13px] font-medium text-white transition-opacity disabled:opacity-40"
        >
          {index + 1 >= total ? 'Verificar e ver resultado' : 'Verificar'}
        </button>
      </div>

      {answered && (
        <FeedbackBox
          correct={items.every((it, i) => it === q.steps[i])}
          explanation={'Ordem correta: ' + q.steps.map((s, i) => `${i + 1}. ${s}`).join(' › ')}
          reviewAnchor={q.reviewAnchor}
          onContinue={next}
          continueLabel={index + 1 >= total ? 'Ver resultado' : 'Próxima questão'}
        />
      )}
    </Card>
  )
}