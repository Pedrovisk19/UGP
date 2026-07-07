'use client'

import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { CodeBlock } from './CodeBlock'
import { MermaidDiagram } from './MermaidDiagram'
import { Callout, type CalloutKind } from './Callout'
import { slugify } from '@/lib/module/toc'

const CALLOUT_KEYWORDS: { kind: CalloutKind; re: RegExp }[] = [
  { kind: 'note',        re: /^\[!note\]/i },
  { kind: 'info',        re: /^\[!info\]/i },
  { kind: 'success',     re: /^\[!(tip|success)\]/i },
  { kind: 'warning',     re: /^\[!(warning|caution|attention)\]/i },
  { kind: 'security',    re: /^\[!security\]/i },
  { kind: 'performance', re: /^\[!performance\]/i },
  { kind: 'reference',   re: /^\[!reference\]/i },
  { kind: 'curiosity',   re: /^\[!curiosity\]/i },
  { kind: 'error',       re: /^\[!error\]/i },
  { kind: 'quote',       re: /^\[!quote\]/i },
]

/** Heurística para detectar callouts em blockquotes (sintaxe GitHub [!NOTE] + DTAP básica em PT). */
function detectCallout(children: React.ReactNode): { kind: CalloutKind; title?: string; content: React.ReactNode } | null {
  const flat = React.Children.toArray(children)
  if (flat.length === 0) return null
  const first = flat[0]
  if (typeof first !== 'object' || first === null || !('props' in first)) return null
  const firstChildren = (first as any).props?.children as any
  let text = ''
  if (typeof firstChildren === 'string') text = firstChildren
  else if (Array.isArray(firstChildren)) text = firstChildren.map((c) => (typeof c === 'string' ? c : '')).join('')
  if (!text) return null

  for (const { kind, re } of CALLOUT_KEYWORDS) {
    const m = text.match(re)
    if (m) {
      const remaining = text.replace(re, '').replace(/^[\s:—–-]+/, '')
      const rest = flat.slice(1)
      const body = (
        <div>
          {remaining && <p>{remaining}</p>}
          {rest}
        </div>
      )
      return { kind, content: body }
    }
  }
  return null
}

function HeadingWithAnchor({ level, children }: { level: number; children?: React.ReactNode }) {
  const Tag = (`h${level}` as 'h2' | 'h3' | 'h4')
  const text = extractText(children)
  const id = slugify(text)
  return (
    <Tag id={id} className="scroll-mt-24 group relative font-heading" data-anchor={id}>
      {children}
      <a
        href={`#${id}`}
        aria-label={`Link para ${text}`}
        className="absolute -ml-6 inline-flex items-center opacity-0 transition-opacity group-hover:opacity-100"
      >
        <LinkIcon className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]" />
      </a>
    </Tag>
  )
}

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return extractText((node as any).props?.children)
  }
  return ''
}

export function MarkdownEditorial({ source }: { source: string }) {
  return (
    <div className="prose-editor">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }: any) {
            const text = String(children ?? '')
            const match = /language-(\w+)/.exec(className || '')
            const lang = match?.[1]
            const isFenced = !inline && !!lang
            if (isFenced) {
              if (lang === 'mermaid') {
                return <MermaidDiagram chart={text} />
              }
              return <CodeBlock language={lang}>{text}</CodeBlock>
            }
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
            return <CodeBlock language="text">{text}</CodeBlock>
          },
          pre({ children }: { children?: React.ReactNode }) {
            return <>{children}</>
          },
          h2: (props: any) => <HeadingWithAnchor level={2} {...props} />,
          h3: (props: any) => <HeadingWithAnchor level={3} {...props} />,
          h4: (props: any) => <HeadingWithAnchor level={4} {...props} />,
          table({ children }: { children?: React.ReactNode }) {
            return (
              <div className="comparison-table my-5 overflow-x-auto rounded-lg ugp-surface">
                <table className="w-full border-collapse text-[13px]">{children}</table>
              </div>
            )
          },
          thead({ children }: { children?: React.ReactNode }) {
            return <thead style={{ background: 'var(--canvas-overlay)' }}>{children}</thead>
          },
          th({ children }: { children?: React.ReactNode }) {
            return (
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]" style={{ borderBottom: '1px solid var(--border-default)' }}>
                {children}
              </th>
            )
          },
          td({ children }: { children?: React.ReactNode }) {
            return (
              <td className="px-4 py-3 text-[hsl(var(--foreground))] align-top" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                {children}
              </td>
            )
          },
          blockquote({ children }: { children?: React.ReactNode }) {
            const callout = detectCallout(children)
            if (callout) {
              return <Callout kind={callout.kind} title={callout.title}>{callout.content}</Callout>
            }
            return (
              <blockquote
                className="my-5 rounded-r-md border-l-2 py-2 pl-4 italic text-[hsl(var(--muted-foreground))] "
                style={{ borderColor: 'var(--accent-purple)', background: 'rgba(139,92,246,0.05)' }}
              >
                {children}
              </blockquote>
            )
          },
          hr() {
            return <hr className="my-7 border-0" style={{ borderTop: '1px solid var(--border-subtle)' }} />
          },
          a({ href, children }: any) {
            const isInternal = href?.startsWith('/') || href?.startsWith('#')
            if (isInternal) {
              return <Link href={href} className="text-[hsl(var(--primary))] hover:underline">{children}</Link>
            }
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--primary))] hover:underline">
                {children}
              </a>
            )
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  )
}