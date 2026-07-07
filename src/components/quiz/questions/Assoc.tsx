'use client'

import * as React from 'react'
import { ArrowRight, Check, X } from 'lucide-react'
import { Card, ProgressHeader } from './shared'
import { FeedbackBox } from './shared'
import type { AssocQuestion } from '@/types/ugp.types'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface Props {
  q: AssocQuestion
  index: number
  total: number
  onAnswer: (correct: boolean) => void
}

export function ASSOC({ q, index, total, onAnswer }: Props) {
  // Garante que cada "right" só apareça uma vez.
  const rights = React.useMemo(() => {
    const seen = new Set<string>()
    return q.pairs.map((p) => p.right).filter((r) => (seen.has(r) ? false : seen.add(r) && true))
  }, [q.pairs])
  const shuffledRights = React.useMemo(() => shuffle(rights), [rights])

  const [answer, setAnswer] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(q.pairs.map((p) => [p.left, '']))
  )
  const [answered, setAnswered] = React.useState(false)

  function pick(left: string, right: string) {
    if (answered) return
    setAnswer((s) => {
      const next: Record<string, string> = {}
      for (const k of Object.keys(s)) {
        // libera qualquer outra coluna que estivesse apontando para este right
        next[k] = s[k] === right ? '' : s[k]
      }
      next[left] = right
      return next
    })
  }

  function finish() {
    const correct = q.pairs.every((p) => answer[p.left] === p.right)
    setAnswered(true)
    onAnswer(correct)
  }

  function next() {
    setAnswered(false)
    setAnswer(Object.fromEntries(q.pairs.map((p) => [p.left, ''])))
  }

  return (
    <Card className="p-5 md:p-6">
      <ProgressHeader index={index} total={total} difficulty={q.difficulty} category={q.category} />
      <p className="text-[15px] leading-relaxed text-[hsl(var(--foreground))]">{q.question}</p>

      <div className="mt-4 space-y-2">
        {q.pairs.map((p) => {
          const isRight = answer[p.left] === p.right
          return (
            <div key={p.left} className="flex flex-wrap items-center gap-3 rounded-lg border p-3" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex-1 text-[14px] font-medium">{p.left}</div>
              <ArrowRight className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              <div className="flex flex-wrap gap-1.5">
                {shuffledRights.map((right) => {
                  const active = answer[p.left] === right
                  const showState = answered && active
                  const expectedState = answered && p.right === right
                  return (
                    <button
                      key={right}
                      type="button"
                      disabled={answered}
                      onClick={() => pick(p.left, right)}
                      className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[12px] transition-colors"
                      style={{
                        borderColor: showState ? (isRight ? 'rgba(16,185,129,0.5)' : 'rgba(239,68,68,0.5)') : expectedState ? 'rgba(16,185,129,0.4)' : active ? 'rgba(139,92,246,0.55)' : 'var(--border-subtle)',
                        background: showState ? (isRight ? 'rgba(16,185,129,0.14)' : 'rgba(239,68,68,0.12)') : expectedState ? 'rgba(16,185,129,0.06)' : active ? 'rgba(139,92,246,0.14)' : 'rgba(255,255,255,0.02)',
                      }}
                    >
                      {right}
                      {showState && isRight && <Check className="h-3 w-3 text-emerald-400" strokeWidth={3} />}
                      {showState && !isRight && <X className="h-3 w-3 text-rose-400" strokeWidth={3} />}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={finish}
          disabled={answered || Object.values(answer).some((v) => !v)}
          className="rounded-md bg-[var(--accent-purple)] px-4 py-2 text-[13px] font-medium text-white transition-opacity disabled:opacity-40"
        >
          {index + 1 >= total ? 'Verificar e ver resultado' : 'Verificar'}
        </button>
      </div>

      {answered && (
        <FeedbackBox
          correct={q.pairs.every((p) => answer[p.left] === p.right)}
          explanation={'Associação correta: ' + q.pairs.map((p) => `${p.left} → ${p.right}`).join(' · ')}
          reviewAnchor={q.reviewAnchor}
          onContinue={next}
          continueLabel={index + 1 >= total ? 'Ver resultado' : 'Próxima questão'}
        />
      )}
    </Card>
  )
}