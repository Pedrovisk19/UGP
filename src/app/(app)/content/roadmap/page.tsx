'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { ROADMAP_STEPS, TECH_PROJECT_MAP } from '@/lib/roadmapContent'
import { cn } from '@/lib/utils'

export default function RoadmapPage() {
  const [open, setOpen] = useState<number | null>(1)

  return (
    <div className="space-y-6 max-w-3xl">
      <nav className="flex items-center gap-2 text-[12px] text-[hsl(var(--muted-foreground))]">
        <Link href="/app" className="hover:text-[hsl(var(--foreground))]">Início</Link>
        <span>/</span>
        <span className="text-[hsl(var(--foreground))]">Roadmap de Estudos</span>
      </nav>

      <header>
        <h1 className="font-heading text-3xl font-bold mb-2">Roadmap de Estudos</h1>
        <p className="text-[14px] text-[hsl(var(--muted-foreground))]">
          10 etapas para ir do zero ao engenheiro de elite, com estimativas realistas e ligação direta
          aos projetos da UGP.
        </p>
      </header>

      <div className="space-y-3">
        {ROADMAP_STEPS.map((step) => {
          const isOpen = open === step.num
          return (
            <div key={step.num} className="ugp-surface">
              <button
                onClick={() => setOpen(isOpen ? null : step.num)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="h-7 w-7 rounded-md flex items-center justify-center text-[12px] font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                    {step.num}
                  </span>
                  <span className="font-heading font-semibold text-[14px]">{step.title}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[hsl(var(--muted-foreground))]">
                  <span className="ugp-tag ugp-badge-neutral">{step.difficulty}</span>
                  <span className="ugp-tag ugp-badge-blue">{step.duration}</span>
                  <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
                </div>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 space-y-4 text-[13px]">
                  <Detail label="Pré-requisitos" value={step.prerequisites.join(', ')} />
                  <Detail label="Por que aprender" value={step.why} />
                  <Detail label="Tópicos" value={step.topics.join(' · ')} />
                  <Detail label="O que construir" value={step.build} />
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-1.5">
                      Projetos UGP relacionados
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {step.ugProjects.map((pid) => (
                        <Link
                          key={pid}
                          href={`/projects/${pid}`}
                          className="ugp-tag ugp-badge-purple hover:opacity-80"
                        >
                          #{String(pid).padStart(2, '0')}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Detail label="Erros comuns" value={step.commonMistakes.join(' · ')} />
                  <Detail label="Dicas práticas" value={step.tips.join(' · ')} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <section className="ugp-surface p-5">
        <h2 className="font-heading font-semibold mb-3 text-[14px]">
          Tecnologias ↔ Projetos UGP
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead style={{ background: 'var(--canvas-overlay)' }}>
              <tr>
                <th className="px-3 py-2 text-left uppercase tracking-widest text-[10px] text-[hsl(var(--muted-foreground))]">Tecnologia</th>
                <th className="px-3 py-2 text-left uppercase tracking-widest text-[10px] text-[hsl(var(--muted-foreground))]">Projetos</th>
              </tr>
            </thead>
            <tbody>
              {TECH_PROJECT_MAP.map((row) => (
                <tr key={row.tech} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <td className="px-3 py-2 text-[hsl(var(--foreground))]">{row.tech}</td>
                  <td className="px-3 py-2 text-[hsl(var(--muted-foreground))]">
                    {row.projects.map((p) => `#${String(p).padStart(2, '0')}`).join(' · ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h4 className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-1">
        {label}
      </h4>
      <p className="text-[hsl(var(--muted-foreground))]">{value}</p>
    </div>
  )
}