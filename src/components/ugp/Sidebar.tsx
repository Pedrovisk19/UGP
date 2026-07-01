'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { CheckCircle2, Circle, FolderGit2, ChevronDown } from 'lucide-react'
import { NAV_TREE, PROJECTS } from '@/lib/ugpContent'
import { cn } from '@/lib/utils'

export function Sidebar({ completedModules }: { completedModules: Set<string> }) {
  const pathname = usePathname()
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(NAV_TREE.map((g, i) => [g.label, i === 0]))
  )

  function toggle(label: string) {
    setOpen((o) => ({ ...o, [label]: !o[label] }))
  }

  return (
    <aside
      className="w-64 shrink-0 hidden lg:flex flex-col h-screen sticky top-0"
      style={{
        background: 'var(--canvas-subtle)',
        borderRight: '1px solid var(--border-subtle)',
      }}
    >
      <Link
        href="/app"
        className="px-5 h-[57px] flex items-center gap-2 border-b"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div
          className="h-7 w-7 rounded-md flex items-center justify-center text-white text-sm font-bold"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          U
        </div>
        <span className="font-heading font-semibold text-[15px]">UGP</span>
      </Link>

      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {NAV_TREE.map((group) => (
          <div key={group.label} className="mb-3">
            <button
              onClick={() => toggle(group.label)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            >
              {group.label}
              <ChevronDown
                className={cn('h-3 w-3 transition-transform', open[group.label] && 'rotate-180')}
              />
            </button>
            {open[group.label] && (
              <ul className="mt-1 space-y-0.5">
                {group.items.map((item) => {
                  const href = item.isSpecial
                    ? `/content/${item.slug}`
                    : `/content/${item.slug}`
                  const isActive = pathname === href
                  const isDone = completedModules.has(item.slug)
                  return (
                    <li key={item.slug}>
                      <Link
                        href={href}
                        className={cn(
                          'flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] transition-colors',
                          isActive
                            ? 'ugp-nav-active'
                            : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-white/5'
                        )}
                      >
                        {isDone ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          <Circle className="h-3.5 w-3.5 opacity-50" />
                        )}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        ))}

        {/* Projetos */}
        <div className="mb-3">
          <button
            onClick={() => toggle('__projects__')}
            className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
          >
            Projetos
            <ChevronDown
              className={cn('h-3 w-3 transition-transform', open['__projects__'] && 'rotate-180')}
            />
          </button>
          {open['__projects__'] && (
            <ul className="mt-1 space-y-0.5">
              {PROJECTS.map((p) => {
                const href = `/projects/${p.id}`
                const isActive = pathname === href
                return (
                  <li key={p.id}>
                    <Link
                      href={href}
                      className={cn(
                        'flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] transition-colors',
                        isActive
                          ? 'ugp-nav-active'
                          : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-white/5'
                      )}
                    >
                      <FolderGit2 className="h-3.5 w-3.5 opacity-70" />
                      <span className="tabular-nums">#{String(p.id).padStart(2, '0')}</span>
                      <span className="truncate">{p.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </nav>

      <div
        className="px-4 py-3 text-[11px] text-[hsl(var(--muted-foreground))]"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        Universidade Gratuita do Programador
      </div>
    </aside>
  )
}