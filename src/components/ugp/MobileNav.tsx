'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X, CheckCircle2, Circle, FolderGit2, ChevronDown, LogOut } from 'lucide-react'
import { NAV_TREE, PROJECTS } from '@/lib/ugpContent'
import { signOut } from '@/actions/auth.actions'
import { cn } from '@/lib/utils'
import type { Profile } from '@/types/ugp.types'

export function MobileNav({
  completedModules,
  user,
}: {
  completedModules: Set<string>
  user: Profile
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [groups, setGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(NAV_TREE.map((g, i) => [g.label, i === 0]))
  )

  useEffect(() => setMounted(true), [])

  function toggle(key: string) {
    setGroups((g) => ({ ...g, [key]: !g[key] }))
  }

  async function handleLogout() {
    await signOut()
  }

  return (
    <>
      <button
        className="lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-white/5"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && mounted && createPortal(
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside
            className="absolute left-0 top-0 h-full w-64 flex flex-col"
            style={{
              background: 'var(--canvas-subtle)',
              borderRight: '1px solid var(--border-subtle)',
            }}
          >
            <div
              className="h-[57px] flex items-center justify-between px-4"
              style={{ borderBottom: '1px solid var(--border-subtle)' }}
            >
              <Link href="/app" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <div
                  className="h-7 w-7 rounded-md flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                >
                  U
                </div>
                <span className="font-heading font-semibold">UGP</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="h-8 w-8 inline-flex items-center justify-center rounded-md hover:bg-white/5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-3 px-2">
              {NAV_TREE.map((group) => (
                <div key={group.label} className="mb-3">
                  <button
                    onClick={() => toggle(group.label)}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]"
                  >
                    {group.label}
                    <ChevronDown
                      className={cn('h-3 w-3 transition-transform', groups[group.label] && 'rotate-180')}
                    />
                  </button>
                  {groups[group.label] && (
                    <ul className="mt-1 space-y-0.5">
                      {group.items.map((item) => {
                        const href = `/content/${item.slug}`
                        const isActive = pathname === href
                        const isDone = completedModules.has(item.slug)
                        return (
                          <li key={item.slug}>
                            <Link
                              href={href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                'flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px]',
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

              <div className="mb-3">
                <button
                  onClick={() => toggle('__projects__')}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]"
                >
                  Projetos
                  <ChevronDown
                    className={cn('h-3 w-3 transition-transform', groups['__projects__'] && 'rotate-180')}
                  />
                </button>
                {groups['__projects__'] && (
                  <ul className="mt-1 space-y-0.5">
                    {PROJECTS.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/projects/${p.id}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-white/5"
                        >
                          <FolderGit2 className="h-3.5 w-3.5 opacity-70" />
                          <span className="tabular-nums">#{String(p.id).padStart(2, '0')}</span>
                          <span className="truncate">{p.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </nav>

            <div
              className="p-3 space-y-2"
              style={{ borderTop: '1px solid var(--border-subtle)' }}
            >
              <div className="text-[12px] text-[hsl(var(--muted-foreground))] truncate">
                {user.email}
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-[13px] text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" /> Sair da conta
              </button>
            </div>
          </aside>
        </div>,
        document.body
      )}
    </>
  )
}