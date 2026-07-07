'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowRight, FolderGit2, BookOpen, Layers } from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { NextStepRef } from '@/types/ugp.types'

export function NextModule({ steps }: { steps: NextStepRef[] }) {
  if (!steps?.length) return null
  return (
    <section id="proximos-passos" className="scroll-mt-24">
      <header className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Continuar a jornada</p>
        <h2 className="font-heading text-2xl font-bold tracking-tight">Onde utilizar este conhecimento</h2>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        {steps.map((step, i) => {
          const href =
            step.type === 'module'
              ? `/content/${step.ref}`
              : step.type === 'project'
              ? `/projects/${step.ref}`
              : `/content/${step.ref}`
          const Icon = step.type === 'project' ? FolderGit2 : step.type === 'module' ? BookOpen : Layers
          return (
            <Link key={i} href={href} className="block">
              <Card className="group h-full p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--accent-purple)]">
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
                    style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)' }}
                  >
                    <Icon className="h-4 w-4 text-[var(--accent-purple)]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                      {step.type === 'module' ? 'Próximo módulo' : step.type === 'project' ? 'Projeto da UGP' : 'Tecnologia'}
                    </p>
                    <p className="mt-0.5 font-heading text-[14px] font-semibold leading-tight group-hover:text-[hsl(var(--primary))]">{step.label}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] transition-transform group-hover:translate-x-0.5" />
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}