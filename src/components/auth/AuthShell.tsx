'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'

export function AuthShell({
  title,
  subtitle,
  children,
  backHref = '/',
}: {
  title: string
  subtitle?: string
  children: ReactNode
  backHref?: string
}) {
  return (
    <div
      className="min-h-screen relative flex items-center justify-center px-4"
      style={{ background: '#000', color: 'var(--text-primary)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(99,102,241,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(139,92,246,0.12), transparent 40%)',
        }}
      />
      <div className="relative z-10 w-full max-w-sm">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-[13px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] mb-6 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar
        </Link>
        <div className="ugp-surface p-6">
          <div className="mb-6">
            <h1 className="font-heading text-xl font-semibold">{title}</h1>
            {subtitle && (
              <p className="text-[13px] text-[hsl(var(--muted-foreground))] mt-1">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}