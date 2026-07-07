'use client'

import * as React from 'react'
import { Check, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TocItem } from '@/lib/module/toc'
import {
  getSectionProgress,
  upsertSectionProgress,
  type SectionStatus,
} from '@/actions/reading-progress.actions'

interface LearningNavigatorProps {
  moduleId: string
  items: TocItem[]
  /** tempo total de leitura em minutos (meta.readingTime) */
  readingTime: number
  /** disparado quando todas as seções foram lidas */
  onAllRead?: () => void
}

type VisState = 'unread' | 'visited' | 'read' | 'completed'

const RANK: Record<SectionStatus, number> = { visited: 1, read: 2, completed: 3 }

function toVis(s: SectionStatus | undefined): VisState {
  if (!s) return 'unread'
  if (s === 'visited') return 'visited'
  return s === 'completed' ? 'completed' : 'read'
}

/**
 * Learning Navigator — índice lateral premium com scroll-spy, progresso
 * persistido por seção, tempo restante aproximado e checkpoint visual.
 * Substitui o antigo TableOfContents.
 */
export function LearningNavigator({
  moduleId,
  items,
  readingTime,
  onAllRead,
}: LearningNavigatorProps) {
  const [active, setActive] = React.useState<string | null>(null)
  const [statusMap, setStatusMap] = React.useState<Record<string, SectionStatus>>({})
  const [hydrated, setHydrated] = React.useState(false)
  const [toast, setToast] = React.useState<string | null>(null)

  const activeRef = React.useRef<string | null>(null)
  const dwellTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const toastTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const allReadFired = React.useRef(false)
  // Espelho mutável do statusMap — lê/grava sem acionar render nem efeitos colaterais
  // dentro do updater do setState (que causaria "setState during render" via server action).
  const statusMapRef = React.useRef<Record<string, SectionStatus>>({})

  // Hidrata progresso persistido
  React.useEffect(() => {
    if (!items.length) return
    let alive = true
    getSectionProgress(moduleId).then((rows) => {
      if (!alive) return
      const map: Record<string, SectionStatus> = {}
      for (const r of rows) map[r.section_id] = r.status
      statusMapRef.current = map
      setStatusMap(map)
      setHydrated(true)
      // se já está tudo lido na carga, dispara onAllRead
      if (items.every((it) => RANK[map[it.id] ?? ('visited' as SectionStatus)] >= RANK.read) && !allReadFired.current) {
        allReadFired.current = true
        onAllRead?.()
      }
    })
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId, items.length])

  const persist = React.useCallback(
    (sectionId: string, status: SectionStatus) => {
      upsertSectionProgress(moduleId, sectionId, status).catch(() => {})
    },
    [moduleId]
  )

  const showToast = React.useCallback((sectionId: string) => {
    setToast(sectionId)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2400)
  }, [])

  const checkAllRead = React.useCallback(
    (map: Record<string, SectionStatus>) => {
      const allRead = items.every(
        (it) => RANK[map[it.id] ?? ('visited' as SectionStatus)] >= RANK.read
      )
      if (allRead && !allReadFired.current) {
        allReadFired.current = true
        onAllRead?.()
      }
    },
    [items, onAllRead]
  )

  // Marca/atualiza o status de uma seção. Lê do ref, muta o ref e dispara
  // o setState com um valor novo (NUNCA com updater com efeitos colaterais —
  // server actions chamam router.refresh() e quebram render concorrente).
  const markStatus = React.useCallback(
    (sectionId: string, status: SectionStatus, silent = false) => {
      const prev = statusMapRef.current
      const cur = prev[sectionId]
      if (cur && RANK[status] <= RANK[cur]) return

      const next = { ...prev, [sectionId]: status }
      statusMapRef.current = next
      setStatusMap(next)

      // efeitos colaterais FORA do updater — seguros em event/async
      persist(sectionId, status)
      if (status === 'read' && !silent) showToast(sectionId)
      checkAllRead(next)
    },
    [persist, showToast, checkAllRead]
  )

  // Scroll spy
  React.useEffect(() => {
    if (!items.length || !hydrated) return
    const headingEls = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[]
    if (!headingEls.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (!visible[0]) return
        const newActive = visible[0].target.id

        // anterior vira "lida" ao trocar de seção
        const prev = activeRef.current
        if (prev && prev !== newActive) {
          markStatus(prev, 'read')
        }

        // nova seção ativa -> visited se ainda não foi
        markStatus(newActive, 'visited', true)
        activeRef.current = newActive
        setActive(newActive)

        // dwell timer -> upgrade para 'completed'
        if (dwellTimer.current) clearTimeout(dwellTimer.current)
        dwellTimer.current = setTimeout(() => {
          markStatus(newActive, 'completed', true)
        }, 18000)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 1] }
    )

    headingEls.forEach((el) => observer.observe(el))
    return () => {
      observer.disconnect()
      if (dwellTimer.current) clearTimeout(dwellTimer.current)
    }
  }, [items, hydrated, markStatus])

  // Detecção de fundo: marca últimas seções como lidas
  React.useEffect(() => {
    if (!items.length || !hydrated) return
    function onScroll() {
      const article = document.getElementById('module-article')
      if (!article) return
      const remaining = article.getBoundingClientRect().bottom - window.innerHeight
      if (remaining >= 240) return

      const prev = statusMapRef.current
      let changed = false
      const next = { ...prev }
      for (const it of items) {
        const cur = next[it.id]
        if (!cur || RANK[cur] < RANK.read) {
          next[it.id] = 'read'
          persist(it.id, 'read')
          changed = true
        }
      }
      if (!changed) return
      statusMapRef.current = next
      setStatusMap(next)
      checkAllRead(next)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [items, hydrated, persist, checkAllRead])

  function handleClick(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 92
    window.scrollTo({ top, behavior: 'smooth' })
  }

  if (items.length === 0) return null

  const readCount = items.filter(
    (it) => RANK[statusMap[it.id] ?? ('visited' as SectionStatus)] >= RANK.read
  ).length
  const total = items.length
  const pct = total > 0 ? Math.round((readCount / total) * 100) : 0
  const remainingMins = Math.max(0, Math.round(((total - readCount) / total) * readingTime))

  return (
    <nav aria-label="Sumário" className="space-y-4 text-[13px]">
      {/* Header + progresso */}
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
          📖 Neste módulo
        </p>
        <div className="mb-1.5 flex items-baseline justify-between">
          <span className="font-mono text-[15px] font-semibold text-[hsl(var(--foreground))]">{pct}%</span>
          <span className="text-[11px] text-[hsl(var(--muted-foreground))]">
            {readCount} de {total} tópicos
          </span>
        </div>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full"
          style={{ background: 'var(--canvas-overlay)', border: '1px solid var(--border-subtle)' }}
        >
          <div
            className="h-full rounded-full transition-[width] duration-500 ease-out"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, var(--accent-indigo), var(--accent-purple))',
              boxShadow: pct > 0 ? '0 0 12px rgba(139,92,246,0.5)' : 'none',
            }}
          />
        </div>
        {remainingMins > 0 && pct < 100 ? (
          <p className="mt-2 flex items-center gap-1 text-[11px] text-[hsl(var(--muted-foreground))]">
            <Clock className="h-3 w-3" /> ~{remainingMins} min restantes
          </p>
        ) : pct >= 100 ? (
          <p className="mt-2 flex items-center gap-1 text-[11px] font-medium" style={{ color: 'var(--accent-green)' }}>
            <Check className="h-3 w-3" /> Leitura concluída
          </p>
        ) : null}
      </div>

      {/* Lista de seções */}
      <ul
        className="space-y-0.5 border-l pl-3"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        {items.map((it, idx) => {
          const vis = toVis(statusMap[it.id])
          const isActive = active === it.id
          return (
            <li
              key={it.id}
              className="list-none"
              style={{ marginLeft: it.level === 3 ? 10 : 0 }}
            >
              <button
                onClick={() => handleClick(it.id)}
                className={cn(
                  'group flex w-full items-start gap-2 py-1 text-left transition-colors',
                  isActive
                    ? 'font-medium text-[hsl(var(--primary))]'
                    : vis === 'unread'
                      ? 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                      : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                )}
                style={isActive ? { boxShadow: 'inset 2px 0 0 0 var(--primary)' } : undefined}
              >
                <StateDot vis={vis} active={isActive} />
                <span className="flex-1 leading-snug">
                  <span className="mr-1.5 tabular-nums text-[10px] opacity-40">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {it.text}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {/* Checkpoint toast */}
      <div
        aria-live="polite"
        className={cn(
          'pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300',
          toast ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        )}
      >
        {toast && (
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-medium shadow-lg"
            style={{
              background: 'var(--canvas-raised)',
              border: '1px solid var(--border-strong)',
              color: 'var(--text-primary)',
            }}
          >
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full"
              style={{ background: 'rgba(16,185,129,0.15)', color: 'var(--accent-green)' }}
            >
              <Check className="h-3 w-3" />
            </span>
            Você concluiu este tópico
          </div>
        )}
      </div>
    </nav>
  )
}

function StateDot({ vis, active }: { vis: VisState; active: boolean }) {
  if (active && vis === 'unread') {
    return (
      <span
        className="mt-[3px] h-2 w-2 shrink-0 rounded-full"
        style={{ background: 'var(--accent-purple)', boxShadow: '0 0 6px rgba(139,92,246,0.7)' }}
        aria-label="Seção atual"
      />
    )
  }
  if (vis === 'read' || vis === 'completed') {
    return (
      <span
        className="mt-[2px] flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full"
        style={{
          background: vis === 'completed' ? 'rgba(16,185,129,0.18)' : 'rgba(16,185,129,0.12)',
          border: '1px solid rgba(16,185,129,0.4)',
          color: 'var(--accent-green)',
        }}
        aria-label={vis === 'completed' ? 'Seção concluída' : 'Seção lida'}
      >
        <Check className="h-2.5 w-2.5" />
      </span>
    )
  }
  if (vis === 'visited') {
    return (
      <span
        className="mt-[3px] h-2 w-2 shrink-0 rounded-full"
        style={{ background: 'var(--accent-purple)', opacity: 0.5 }}
        aria-label="Visitado"
      />
    )
  }
  return (
    <span
      className="mt-[3px] h-2 w-2 shrink-0 rounded-full"
      style={{ border: '1px solid var(--border-strong)' }}
      aria-label="Não visitado"
    />
  )
}
