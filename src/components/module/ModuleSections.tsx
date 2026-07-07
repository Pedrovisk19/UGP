'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Link2, Sparkles, Target, CheckCircle2, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { NextStepRef } from '@/types/ugp.types'

function hrefFor(ref: NextStepRef): string {
  return ref.type === 'project' ? `/projects/${ref.ref}` : `/content/${ref.ref}`
}

// ── Missão do módulo ─────────────────────────────────────────
export function ModuleMission({ items }: { items: string[] }) {
  if (!items?.length) return null
  return (
    <section id="missao" className="scroll-mt-24">
      <div
        className="overflow-hidden rounded-xl p-5"
        style={{
          background:
            'radial-gradient(600px 200px at 0% 0%, rgba(139,92,246,0.14), transparent 60%),' +
            'var(--canvas-raised)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--primary))]">
          <Target className="h-3.5 w-3.5" /> Missão deste módulo
        </div>
        <p className="mt-2 text-[13px] text-[hsl(var(--muted-foreground))]">
          Ao terminar esta leitura você será capaz de:
        </p>
        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
          {items.map((it, i) => (
            <li key={i} className="flex items-start gap-2 text-[14px] leading-relaxed">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--accent-green)' }} />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ── Pré-requisitos ───────────────────────────────────────────
export function Prerequisites({ items }: { items: NextStepRef[] }) {
  if (!items?.length) return null
  return (
    <section id="pre-requisitos" className="scroll-mt-24">
      <div
        className="rounded-xl p-4"
        style={{ background: 'var(--canvas-raised)', border: '1px solid var(--border-subtle)' }}
      >
        <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
          <BookOpen className="h-3.5 w-3.5" /> Antes de começar
        </div>
        <p className="mb-3 text-[12px] text-[hsl(var(--muted-foreground))]">
          Recomendamos concluir antes:
        </p>
        <div className="flex flex-wrap gap-2">
          {items.map((p, i) => (
            <Link
              key={i}
              href={hrefFor(p)}
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] transition-colors hover:text-[hsl(var(--primary))]"
              style={{ background: 'var(--canvas-overlay)', border: '1px solid var(--border-subtle)' }}
            >
              <CheckCircle2 className="h-3 w-3" style={{ color: 'var(--accent-green)' }} />
              {p.label}
              <ArrowRight className="h-3 w-3 opacity-40" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Conexões (relacionados) ──────────────────────────────────
export function Connections({ items }: { items: NextStepRef[] }) {
  if (!items?.length) return null
  return (
    <section id="conexoes" className="scroll-mt-24">
      <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
        <Link2 className="h-3.5 w-3.5" /> 🔗 Relacionado
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((c, i) => (
          <Link
            key={i}
            href={hrefFor(c)}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]"
            style={{
              background: 'rgba(139,92,246,0.06)',
              border: '1px solid rgba(139,92,246,0.18)',
            }}
          >
            <Sparkles className="h-3 w-3" style={{ color: 'var(--accent-purple)' }} />
            {c.label}
          </Link>
        ))}
      </div>
    </section>
  )
}

// ── Card de conclusão do módulo ──────────────────────────────
export function ModuleCompletionCard({
  competencies,
  nextStep,
  xp,
}: {
  competencies: string[]
  nextStep?: NextStepRef | null
  xp?: number
}) {
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    const t = setTimeout(() => setShow(true), 60)
    return () => clearTimeout(t)
  }, [])
  if (!show) return null

  const nextHref = nextStep
    ? nextStep.type === 'project'
      ? `/projects/${nextStep.ref}`
      : `/content/${nextStep.ref}`
    : null

  return (
    <section id="modulo-concluido" className="scroll-mt-24">
      <div
        className="relative overflow-hidden rounded-xl p-6 text-center"
        style={{
          background:
            'radial-gradient(700px 260px at 50% -20%, rgba(139,92,246,0.22), transparent 60%),' +
            'radial-gradient(500px 200px at 50% 120%, rgba(99,102,241,0.16), transparent 60%),' +
            'var(--canvas-raised)',
          border: '1px solid var(--border-strong)',
        }}
      >
        <div
          className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: 'rgba(139,92,246,0.18)', border: '1px solid rgba(139,92,246,0.4)' }}
        >
          <Trophy className="h-6 w-6" style={{ color: 'var(--accent-purple)' }} />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--primary))]">
          🎉 Módulo Concluído
        </p>
        <h3 className="mt-1 font-heading text-2xl font-bold tracking-tight">Parabéns!</h3>
        <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-[hsl(var(--muted-foreground))]">
          Você percorreu todas as seções deste módulo. Agora você está preparado para
          avançar para o próximo passo da jornada.
        </p>

        {xp != null && (
          <p
            className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold"
            style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--accent-green)' }}
          >
            <Sparkles className="h-3.5 w-3.5" /> +{xp} XP
          </p>
        )}

        {competencies.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-[11px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Competências adquiridas
            </p>
            <ul className="mx-auto flex max-w-lg flex-wrap justify-center gap-1.5">
              {competencies.map((c, i) => (
                <li
                  key={i}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[12px]"
                  style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}
                >
                  <CheckCircle2 className="h-3 w-3" style={{ color: 'var(--accent-green)' }} /> {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        {nextHref && nextStep && (
          <div className="mt-5 flex justify-center">
            <Link href={nextHref}>
              <Button size="sm">
                Continuar para {nextStep.label} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
