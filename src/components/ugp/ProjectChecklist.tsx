'use client'

import { useEffect, useState } from 'react'
import { Loader2, Check } from 'lucide-react'
import { getChecklistProgress, toggleChecklistItem, type ChecklistState } from '@/actions/checklist.actions'
import { cn } from '@/lib/utils'
import type { ProjectRequirement } from '@/types/ugp.types'

interface ProjectChecklistProps {
  projectId: number
  items: ProjectRequirement[]
  userId: string
  onProgressChange: (checked: number, total: number) => void
}

export function ProjectChecklist({ projectId, items, userId, onProgressChange }: ProjectChecklistProps) {
  const [state, setState] = useState<ChecklistState>({})
  const [saving, setSaving] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)

  function reportProgress(map: ChecklistState) {
    const checked = items.filter((it) => map[it.key]?.is_checked).length
    onProgressChange(checked, items.length)
  }

  useEffect(() => {
    let active = true
    setLoading(true)
    getChecklistProgress(projectId).then((data) => {
      if (!active) return
      setState(data)
      reportProgress(data)
      setLoading(false)
    })
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, userId])

  async function toggle(key: string) {
    const prev = state[key] ?? { is_checked: false }
    const newVal = !prev.is_checked
    const optimistic: ChecklistState = {
      ...state,
      [key]: { id: prev.id, is_checked: newVal },
    }
    setState(optimistic)
    reportProgress(optimistic)
    setSaving((s) => ({ ...s, [key]: true }))

    const result = await toggleChecklistItem(projectId, key, prev.id ?? null, newVal)
    if ('error' in result && result.error) {
      setState((s) => ({ ...s, [key]: prev }))
      reportProgress({ ...state, [key]: prev })
    } else if (result.id) {
      setState((s) => ({ ...s, [key]: { id: result.id!, is_checked: newVal } }))
    }
    setTimeout(() => {
      setSaving((s) => ({ ...s, [key]: false }))
    }, 300)
  }

  if (loading) {
    return (
      <div className="space-y-2">
        {items.map((it) => (
          <div
            key={it.key}
            className="h-10 rounded-md animate-pulse"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          />
        ))}
      </div>
    )
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => {
        const checked = state[item.key]?.is_checked
        return (
          <li key={item.key}>
            <button
              onClick={() => toggle(item.key)}
              className={cn(
                'w-full flex items-start gap-3 p-3 rounded-md text-left transition-colors border',
                checked
                  ? 'border-emerald-500/40 bg-emerald-500/5'
                  : 'border-white/10 hover:border-white/20 hover:bg-white/5'
              )}
            >
              <span
                className={cn(
                  'mt-0.5 h-4 w-4 shrink-0 rounded border flex items-center justify-center',
                  checked ? 'bg-emerald-500 border-emerald-500' : 'border-white/30'
                )}
              >
                {checked && <Check className="h-3 w-3 text-white" />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[11px] font-mono font-semibold text-purple-400">
                    {item.key}
                  </span>
                  {saving[item.key] && (
                    <Loader2 className="h-3 w-3 animate-spin text-[hsl(var(--muted-foreground))]" />
                  )}
                </div>
                <p className="text-[13px] text-[hsl(var(--foreground))]">{item.text}</p>
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}