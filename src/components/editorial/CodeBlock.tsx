'use client'

import * as React from 'react'
import { Check, Copy, Terminal } from 'lucide-react'

let highlighterPromise: Promise<import('shiki').Highlighter> | null = null

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const shiki = await import('shiki')
      const highlighter = await shiki.createHighlighter({
        themes: ['github-dark-dimmed'],
        langs: [
          'typescript','tsx','javascript','jsx','bash','json','sql','python','text','markdown','yaml','html','css','diff','go','rust',
        ],
      })
      return highlighter
    })()
  }
  return highlighterPromise
}

interface CodeBlockProps {
  children: string
  language?: string
  title?: string
  filename?: string
}

export function CodeBlock({ children, language, title, filename }: CodeBlockProps) {
  const [html, setHtml] = React.useState<string | null>(null)
  const [copied, setCopied] = React.useState(false)
  const code = children.replace(/\n$/, '')
  const lang = (language || 'text').toLowerCase()
  const isMermaid = lang === 'mermaid'

  React.useEffect(() => {
    let cancelled = false
    if (isMermaid) return
    getHighlighter()
      .then((h) => {
        try {
          const out = h.codeToHtml(code, { lang, theme: 'github-dark-dimmed' })
          if (!cancelled) setHtml(out)
        } catch {
          if (!cancelled) setHtml(null)
        }
      })
      .catch(() => !cancelled && setHtml(null))
    return () => { cancelled = true }
  }, [code, lang, isMermaid])

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  if (isMermaid) return null

  const headerLabel = filename || title || lang

  return (
    <figure className="ugp-codeblock my-5 overflow-hidden" data-lang={lang}>
      <figcaption className="ugp-codeblock-header">
        <span className="inline-flex items-center gap-1.5 text-[12px]">
          <Terminal className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
          <span className="font-mono">{headerLabel}</span>
        </span>
        <button
          onClick={copy}
          aria-label="Copiar código"
          className="inline-flex items-center gap-1 text-[11px] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </figcaption>
      <div
        className="shiki-host text-[13px] [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:px-4 [&_pre]:py-3 [&_pre]:overflow-x-auto [&_pre]:font-mono"
        dangerouslySetInnerHTML={
          html
            ? { __html: html }
            : { __html: `<pre class="px-4 py-3 overflow-x-auto font-mono text-[13px]"><code>${escapeHtml(code)}</code></pre>` }
        }
      />
    </figure>
  )
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c] as string))
}