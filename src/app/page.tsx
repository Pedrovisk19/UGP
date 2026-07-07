'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Terminal, Sparkles } from 'lucide-react'
import { LANDING_OPTIONS } from '@/lib/ugpContent'

const STATS = [
  { value: '10', label: 'projetos corporativos' },
  { value: '8', label: 'níveis de evolução' },
  { value: '14', label: 'módulos de conteúdo' },
  { value: 'R$0', label: 'custo total' },
]

export default function LandingPage() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 2000)
    return () => clearInterval(i)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: '#000', color: 'var(--text-primary)' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 sm:px-10 py-5">
        <div className="flex items-center gap-2">
          <div
            className="h-8 w-8 rounded-md flex items-center justify-center text-white font-bold"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            U
          </div>
          <span className="font-heading font-semibold">UGP</span>
        </div>
        <Link
          href="/login"
          className="inline-flex items-center gap-1 text-[13px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
        >
          Entrar <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-6 sm:px-10 pt-10 pb-16 max-w-6xl mx-auto text-center relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(14,165,233,0.15), transparent 50%)',
          }}
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-[11px] text-[hsl(var(--muted-foreground))] mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-400" />
            </span>
            Universidade 100% gratuita — {tick % 2 === 0 ? 'open source' : 'sem pegadinhas'}
          </div>

          <h1
            className="font-heading text-4xl sm:text-5xl font-bold leading-tight mb-4"
            style={{
              backgroundImage: 'linear-gradient(180deg, #fff, rgba(255,255,255,0.8))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Do curioso ao engenheiro de elite.
          </h1>
          <p className="max-w-2xl mx-auto text-[15px] text-[hsl(var(--muted-foreground))] mb-8">
            Aprenda engenharia de software construindo 10 projetos corporativos reais, progredindo por 8 níveis
            e dominando fundamentos que o mercado exige.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 h-11 rounded-md font-medium text-white"
              style={{ background: 'linear-gradient(135deg, #0ea5e9, #6366f1)' }}
            >
              Acessar a Universidade <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`https://wa.me/${
                process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5531999810260'
              }?text=Quero%20falar%20com%20o%20criador%20da%20UGP`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 h-11 rounded-md font-medium border border-white/10 text-[hsl(var(--foreground))] hover:bg-white/5"
            >
              Falar com o criador
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {STATS.map((s) => (
              <div key={s.label} className="ugp-surface p-4 text-left">
                <div className="font-heading text-2xl font-bold">{s.value}</div>
                <div className="text-[12px] text-[hsl(var(--muted-foreground))]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IDE Preview */}
      <section className="px-6 sm:px-10 pb-16 max-w-4xl mx-auto">
        <div className="ugp-codeblock">
          <div className="ugp-codeblock-header">
            <span className="inline-flex items-center gap-1.5">
              <Terminal className="h-3 w-3" /> ugp.terminal
            </span>
            <span className="text-[10px] text-emerald-400">● pronto</span>
          </div>
          <pre className="px-4 py-4 text-[13px] font-mono leading-relaxed overflow-x-auto">
            <code>
          {`$ ugp start --trail junior
          > Bem-vindo à UGP. Seu nível: Extremo Iniciante.
          > Carregando 10 projetos corporativos...
          > Carregando 8 níveis de progressão...
          > Conteúdo: manifesto, arquitetura, tdd, github...

          [1/10] Todo List Corporativo ............ concluido
          [2/10] Carrinho de Compras .............. em andamento
          [3/10] Dashboard de Vendas ............... pendente

          > XP: 400 / 7500  —  Próximo nível: Júnior 1 ✓
          > Continue em: /app`}
            </code>
          </pre>
        </div>
      </section>

      {/* Options */}
      <section className="px-6 sm:px-10 pb-16 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="h-4 w-4 text-[hsl(var(--primary))]" />
          <h2 className="font-heading text-lg font-semibold">Como posso te ajudar?</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {LANDING_OPTIONS.map((opt) => {
            const inner = (
              <div
                className="ugp-surface p-5 h-full transition-all hover:-translate-y-0.5"
                style={{ borderTop: `2px solid ${opt.accent}` }}
              >
                <div
                  className="h-9 w-9 rounded-lg flex items-center justify-center mb-3 font-bold text-white"
                  style={{ background: opt.accent }}
                >
                  {opt.label.charAt(0)}
                </div>
                <h3 className="font-heading font-semibold mb-2">{opt.label}</h3>
                <ul className="space-y-1 text-[12px] text-[hsl(var(--muted-foreground))]">
                  {opt.highlights.map((h) => (
                    <li key={h}>· {h}</li>
                  ))}
                </ul>
              </div>
            )
            return opt.isInternal ? (
              <Link key={opt.id} href={opt.href} className="block">
                {inner}
              </Link>
            ) : (
              <a
                key={opt.id}
                href={opt.href}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                {inner}
              </a>
            )
          })}
        </div>
      </section>

      {/* About */}
      <section className="px-6 sm:px-10 pb-16 max-w-3xl mx-auto">
        <h2 className="font-heading text-lg font-semibold mb-3">Sobre a UGP</h2>
        <p className="text-[14px] text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">
          A Universidade Gratuita do Programador existe para resolver um problema real: muita gente
          aprende sintaxe, mas poucos aprendem engenharia. Aqui você constrói projetos de empresas reais,
          avança por níveis e documenta uma trajetória defensável.
        </p>
        <div className="ugp-codeblock">
          <div className="ugp-codeblock-header">
            <span className="inline-flex items-center gap-1.5">
              <Terminal className="h-3 w-3" /> Manifesto
            </span>
          </div>
          <pre className="px-4 py-4 text-[13px] font-mono leading-relaxed overflow-x-auto">
{`# Courses teach syntax. Projects teach engineering.
# Learn one level at a time. Build. Break. Repeat.
# Documentation is part of the product.`}
          </pre>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 sm:px-10 py-8 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[hsl(var(--muted-foreground))]">
          <div className="flex items-center gap-2">
            <div
              className="h-6 w-6 rounded-md flex items-center justify-center text-white text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              U
            </div>
            <span>UGP — Universidade Gratuita do Programador</span>
          </div>
          <span>@pedrogoncalvesht</span>
        </div>
      </footer>
    </div>
  )
}