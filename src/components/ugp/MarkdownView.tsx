'use client'

import { useState, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Check, Copy, Terminal } from 'lucide-react'
import { cn } from '@/lib/utils'

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }
  return (
    <div className="ugp-codeblock my-4">
      <div className="ugp-codeblock-header">
        <span className="inline-flex items-center gap-1.5">
          <Terminal className="h-3 w-3" /> código
        </span>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1 text-[11px] hover:text-[hsl(var(--foreground))]"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre className="px-4 py-3 overflow-x-auto text-[13px] font-mono text-[hsl(var(--foreground))]">
        <code>{children}</code>
      </pre>
    </div>
  )
}

export function MarkdownView({ children }: { children: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-h1:text-3xl prose-h1:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-p:leading-relaxed prose-p:text-[hsl(var(--foreground))] prose-a:text-[hsl(var(--primary))] prose-strong:text-white prose-code:before:content-[''] prose-code:after:content-['']">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, children, ...props }: any) {
            const text = String(children ?? '')
            if (inline) {
              return (
                <code
                  className="px-1 py-0.5 rounded text-[13px] font-mono"
                  style={{
                    background: 'rgba(139,92,246,0.1)',
                    border: '1px solid rgba(139,92,246,0.2)',
                    color: '#c4b5fd',
                  }}
                  {...props}
                >
                  {children}
                </code>
              )
            }
            return <CodeBlock>{text}</CodeBlock>
          },
          table({ children }: { children?: ReactNode }) {
            return (
              <div className="overflow-x-auto my-4">
                <table className="w-full border-collapse text-[13px]">{children}</table>
              </div>
            )
          },
          thead({ children }: { children?: ReactNode }) {
            return (
              <thead style={{ background: 'var(--canvas-overlay)' }}>{children}</thead>
            )
          },
          th({ children }: { children?: ReactNode }) {
            return (
              <th className="px-3 py-2 text-left uppercase tracking-widest text-[10px] font-semibold text-[hsl(var(--muted-foreground))]">
                {children}
              </th>
            )
          },
          td({ children }: { children?: ReactNode }) {
            return (
              <td
                className="px-3 py-2 text-[hsl(var(--muted-foreground))] border-t"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                {children}
              </td>
            )
          },
          blockquote({ children }: { children?: ReactNode }) {
            return (
              <blockquote
                className="my-4 pl-4 italic text-[hsl(var(--muted-foreground))]"
                style={{ borderLeft: '2px solid var(--accent-purple)' }}
              >
                {children}
              </blockquote>
            )
          },
          hr() {
            return (
              <hr
                className="my-6 border-0"
                style={{ borderTop: '1px solid var(--border-subtle)' }}
              />
            )
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}

export { cn }