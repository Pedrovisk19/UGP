'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { TocItem } from '@/lib/module/toc'

interface TableOfContentsProps {
  items: TocItem[]
}

/** Índice lateral com scroll-spy. No mobile some do sticky e vira um accordion controlado pelo parent. */
export function TableOfContents({ items }: TableOfContentsProps) {
  const [active, setActive] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (items.length === 0) return
    const headingEls = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[]

    if (headingEls.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0, 1] }
    )

    headingEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  function handleClick(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 92
    window.scrollTo({ top, behavior: 'smooth' })
  }

  if (items.length === 0) return null

  return (
    <nav aria-label="Sumário" className="space-y-1 text-[13px]">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
        Neste módulo
      </p>
      <ul className="space-y-1 border-l pl-3" style={{ borderColor: 'var(--border-subtle)' }}>
        {items.map((i, idx) => {
          const isActive = active === i.id
          return (
            <li key={i.id} className={cn('list-none')} style={{ marginLeft: i.level === 3 ? 8 : 0 }}>
              <button
                onClick={() => handleClick(i.id)}
                className={cn(
                  'block w-full text-left py-1 transition-colors',
                  isActive
                    ? 'text-[hsl(var(--primary))] font-medium'
                    : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                )}
                style={isActive ? { boxShadow: 'inset 2px 0 0 0 var(--primary)' } : undefined}
              >
                <span className="mr-1.5 tabular-nums text-[11px] opacity-50">{String(idx + 1).padStart(2, '0')}</span>
                {i.text}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}