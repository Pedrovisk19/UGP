'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RotateCcw } from 'lucide-react'

/**
 * error.tsx — boundary do grupo (app).
 * Captura erros de runtime dentro das rotas autenticadas mantendo o layout
 * (Header/Sidebar) intacto. global-error.tsx cobre erros antes do root layout.
 */
export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('AppError:', error)
  }, [error])

  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center"
      style={{ background: 'var(--canvas)' }}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}
      >
        <RotateCcw className="h-6 w-6" style={{ color: '#fca5a5' }} />
      </div>

      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">Não foi possível carregar esta página</h1>
        <p className="mt-2 max-w-md text-[14px] leading-relaxed text-[hsl(var(--muted-foreground))]">
          Ocorreu um erro inesperado. Tente novamente; se persistir, volte ao dashboard e entre de novo na página.
        </p>
      </div>

      {error?.digest && (
        <p className="font-mono text-[11px] text-[var(--text-muted)]">{error.digest}</p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-[13px] font-medium text-white"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          <RotateCcw className="h-3.5 w-3.5" /> Tentar novamente
        </button>
        <Link
          href="/app"
          className="inline-flex items-center rounded-md border px-4 py-2 text-[13px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
          style={{ borderColor: 'var(--border-strong)' }}
        >
          Voltar ao dashboard
        </Link>
      </div>

      {process.env.NODE_ENV === 'development' && error?.message && (
        <pre
          className="mt-4 max-w-xl overflow-x-auto rounded-lg p-4 text-left text-[12px]"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#fca5a5',
            fontFamily: 'ui-monospace, monospace',
          }}
        >
          {error.message}
        </pre>
      )}
    </div>
  )
}