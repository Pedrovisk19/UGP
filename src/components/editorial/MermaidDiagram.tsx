'use client'

import * as React from 'react'

let mermaidPromise: Promise<typeof import('mermaid')['default']> | null = null

async function getMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = (async () => {
      const mod = await import('mermaid')
      const mermaid = mod.default
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          background: 'transparent',
          primaryColor: 'rgba(139,92,246,0.18)',
          primaryTextColor: '#f4f4f5',
          primaryBorderColor: 'rgba(139,92,246,0.45)',
          lineColor: '#a1a1aa',
          secondaryColor: 'rgba(99,102,241,0.15)',
          tertiaryColor: 'rgba(255,255,255,0.04)',
          nodeBorder: '#8b5cf6',
          mainBkg: 'rgba(139,92,246,0.12)',
          clusterBkg: 'rgba(255,255,255,0.02)',
          clusterBorder: 'rgba(255,255,255,0.12)',
          fontFamily: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif',
        },
        flowchart: { curve: 'basis', htmlLabels: true },
        securityLevel: 'loose',
      })
      return mermaid
    })()
  }
  return mermaidPromise
}

interface MermaidDiagramProps {
  chart: string
  title?: string
}

export function MermaidDiagram({ chart, title }: MermaidDiagramProps) {
  const id = React.useId().replace(/[:]/g, '_')
  const [svg, setSvg] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false
    getMermaid()
      .then(async (m) => {
        try {
          const { svg } = await m.render(`mmd-${id}`, chart)
          if (!cancelled) {
            setSvg(svg)
            setError(null)
          }
        } catch (e: any) {
          if (!cancelled) {
            setError(e?.message ?? 'diagrama inválido')
            setSvg(null)
          }
        }
      })
      .catch((e) => !cancelled && setError(String(e)))
    return () => { cancelled = true }
  }, [chart, id])

  return (
    <figure className="my-6 overflow-hidden rounded-lg ugp-surface">
      {title && (
        <figcaption className="border-b px-4 py-2 text-[12px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]"
          style={{ borderColor: 'var(--border-subtle)' }}>
          {title}
        </figcaption>
      )}
      <div className="overflow-x-auto p-4 [&_svg]:max-w-full [&_svg]:mx-auto mermaid-host">
        {error ? (
          <pre className="overflow-x-auto rounded bg-[rgba(239,68,68,0.08)] p-3 text-[12px] text-rose-300">{error}\n\n{chart}</pre>
        ) : svg ? (
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          <div className="animate-pulse text-[12px] text-[hsl(var(--muted-foreground))]">Renderizando diagrama…</div>
        )}
      </div>
    </figure>
  )
}