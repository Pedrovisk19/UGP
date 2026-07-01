'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { LEVELS } from '@/lib/ugpContent'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import type { Level } from '@/types/ugp.types'
import { cn } from '@/lib/utils'

export function MatrixVisual({ currentLevel }: { currentLevel: string }) {
  const [selected, setSelected] = useState<Level | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {LEVELS.map((lvl) => {
          const isCurrent = lvl.name === currentLevel
          return (
            <button
              key={lvl.key}
              onClick={() => setSelected(lvl)}
              className={cn(
                'ugp-surface p-3 text-left transition-all hover:border-[hsl(var(--primary))]',
                isCurrent && 'border-amber-500/60'
              )}
              style={
                isCurrent
                  ? { boxShadow: '0 0 0 1px rgba(245,158,11,0.4), 0 0 30px -10px rgba(245,158,11,0.5)' }
                  : undefined
              }
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={cn(
                    'ugp-tag ugp-badge-neutral',
                    isCurrent && 'ugp-badge-amber'
                  )}
                >
                  {lvl.xp} XP
                </span>
                {isCurrent && (
                  <span className="text-[10px] uppercase tracking-wide text-amber-400">
                    você
                  </span>
                )}
              </div>
              <div
                className={cn(
                  'font-heading font-semibold text-[14px]',
                  isCurrent ? 'text-amber-400' : 'text-[hsl(var(--foreground))]'
                )}
              >
                {lvl.name}
              </div>
            </button>
          )
        })}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.name}</DialogTitle>
            <DialogDescription>
              Mínimo: {selected?.xp} XP
            </DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-1">
                  Conhecimentos
                </h4>
                <p className="text-[hsl(var(--foreground))]">{selected.knowledge}</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-1">
                  Limitações comuns
                </h4>
                <p className="text-[hsl(var(--muted-foreground))]">{selected.limitation}</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-1">
                  Métrica de saída
                </h4>
                <p className="text-[hsl(var(--foreground))]">{selected.metric}</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-2">
                  Checklist de avanço
                </h4>
                <ul className="space-y-1.5">
                  {selected.checklist.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-[hsl(var(--muted-foreground))]">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}