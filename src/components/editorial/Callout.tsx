'use client'

import * as React from 'react'
import { Lightbulb, AlertTriangle, Rocket, XCircle, Brain, BookOpen, Lock, Zap, Quote, Info, CheckCircle2, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export type CalloutKind =
  | 'note'      // 💡 Dica
  | 'warning'   // ⚠ Atenção
  | 'success'   // 🚀 Boa prática
  | 'error'      // ❌ Erro comum
  | 'info'      // ℹ️ Nota
  | 'important' // 🔍 Importante
  | 'curiosity' // 🧠 Curiosidade
  | 'reference' // 📚 Referência
  | 'security'  // 🔒 Segurança
  | 'performance' // ⚡ Performance
  | 'quote'

const CALLOUT_STYLE: Record<CalloutKind, { icon: React.ElementType; label: string; fg: string; bg: string; border: string }> = {
  note:       { icon: Lightbulb,       label: 'Dica',           fg: '#fcd34d', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.28)' },
  warning:    { icon: AlertTriangle,   label: 'Atenção',       fg: '#fca5a5', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.28)' },
  success:    { icon: Rocket,          label: 'Boa prática',   fg: '#6ee7b7', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.28)' },
  error:      { icon: XCircle,          label: 'Erro comum',    fg: '#fca5a5', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.28)' },
  info:       { icon: Info,            label: 'Nota',          fg: '#a5b4fc', bg: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.28)' },
  important:  { icon: Search,          label: 'Importante',    fg: '#93c5fd', bg: 'rgba(59,130,246,0.10)',  border: 'rgba(59,130,246,0.32)' },
  curiosity:  { icon: Brain,           label: 'Curiosidade',    fg: '#c4b5fd', bg: 'rgba(139,92,246,0.08)',  border: 'rgba(139,92,246,0.28)' },
  reference:  { icon: BookOpen,        label: 'Referência',     fg: '#93c5fd', bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.28)' },
  security:   { icon: Lock,            label: 'Segurança',      fg: '#fda4af', bg: 'rgba(244,114,182,0.08)', border: 'rgba(244,114,182,0.28)' },
  performance:{ icon: Zap,             label: 'Performance',    fg: '#fde68a', bg: 'rgba(234,179,8,0.08)',   border: 'rgba(234,179,8,0.3)' },
  quote:      { icon: Quote,           label: 'Citação',        fg: '#a1a1aa', bg: 'rgba(255,255,255,0.03)',  border: 'rgba(255,255,255,0.12)' },
}

export interface CalloutProps {
  kind?: CalloutKind
  title?: string
  className?: string
  children: React.ReactNode
}

export function Callout({ kind = 'info', title, className, children }: CalloutProps) {
  const s = CALLOUT_STYLE[kind]
  const Icon = s.icon
  const label = title ?? s.label
  return (
    <div
      className={cn('callout my-5 rounded-lg overflow-hidden', className)}
      style={{ background: s.bg, border: `1px solid ${s.border}` }}
      data-callout={kind}
    >
      <div className="flex items-start gap-3 p-4">
        <div
          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
          style={{ background: s.bg, border: `1px solid ${s.border}` }}
        >
          <Icon className="h-4 w-4" style={{ color: s.fg }} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 text-[12px] font-semibold uppercase tracking-wider" style={{ color: s.fg }}>
            {label}
          </div>
          <div className="text-[14px] leading-relaxed text-[hsl(var(--foreground))] [&>p]:my-0 [&>p+p]:mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export { CheckCircle2 }