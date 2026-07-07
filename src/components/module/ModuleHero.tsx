'use client'

import * as React from 'react'
import { Clock, BarChart3, FileCode2 } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import type { ModuleMeta } from '@/types/ugp.types'

interface ModuleHeroProps {
  meta: ModuleMeta
  groupLabel: string
}

const LEVEL_VARIANT: Record<string, 'green' | 'amber' | 'red'> = {
  'Iniciante': 'green',
  'Intermediário': 'amber',
  'Avançado': 'red',
}

export function ModuleHero({ meta, groupLabel }: ModuleHeroProps) {
  return (
    <header
      className="relative overflow-hidden rounded-xl ugp-surface px-6 py-7 md:px-10 md:py-12"
      style={{
        background:
          'radial-gradient(900px 280px at 8% -8%, rgba(139,92,246,0.18), transparent 60%),' +
          'radial-gradient(700px 240px at 100% 110%, rgba(99,102,241,0.16), transparent 60%),' +
          'var(--canvas-raised)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <nav className="flex flex-wrap items-center gap-2 text-[12px] text-[hsl(var(--muted-foreground))]">
        <Link href="/app" className="hover:text-[hsl(var(--foreground))]">Início</Link>
        <span className="opacity-50">/</span>
        <span>{groupLabel}</span>
        <span className="opacity-50">/</span>
        <span className="text-[hsl(var(--foreground))]">{meta.title}</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge variant={LEVEL_VARIANT[meta.level] ?? 'amber'}>{meta.level}</Badge>
        <Badge variant="outline" className="gap-1">
          <Clock className="h-3 w-3" /> {meta.readingTime} min de leitura
        </Badge>
        {meta.tags?.map((t) => (
          <Badge key={t} variant="purple">{t}</Badge>
        ))}
      </div>

      <h1 className="mt-4 font-heading text-3xl md:text-[40px] font-bold leading-[1.1] tracking-tight">
        {meta.title}
      </h1>
      <p className="mt-2 text-[15px] md:text-[17px] text-[var(--text-secondary)]">
        {meta.subtitle}
      </p>
      <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-[hsl(var(--muted-foreground))]">
        {meta.description}
      </p>

      {meta.technologies.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t pt-4" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2 text-[12px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
            <FileCode2 className="h-3.5 w-3.5" /> Stack
          </div>
          {meta.technologies.map((tech) => (
            <Badge key={tech} variant="blue" className="font-mono">{tech}</Badge>
          ))}
        </div>
      )}
    </header>
  )
}

export { BarChart3 }