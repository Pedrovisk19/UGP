'use client'

import * as React from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, CheckCircle2, Home, Loader2, ListOrdered } from 'lucide-react'

import { useUGP } from '@/providers/UGPProvider'
import { useUGPLevel } from '@/hooks/use-ugp-level'
import { CONTENT, SEQUENCABLE_MODULES, NAV_TREE } from '@/lib/ugpContent'
import { MODULE_META } from '@/content/module-meta'
import { getQuiz } from '@/content/quizzes'
import type { ModuleMeta } from '@/types/ugp.types'
import { toggleModuleProgress } from '@/actions/module-progress.actions'
import { getQuizStats, saveQuizAttempt } from '@/actions/quiz.actions'

import { ReadingProgress } from '@/components/module/ReadingProgress'
import { ModuleHero } from '@/components/module/ModuleHero'
import { LearningNavigator } from '@/components/module/LearningNavigator'
import { ModuleMission, Prerequisites, Connections, ModuleCompletionCard } from '@/components/module/ModuleSections'
import { SummaryCards } from '@/components/module/SummaryCards'
import { LearningChecklist } from '@/components/module/LearningChecklist'
import { NextModule } from '@/components/module/NextModule'
import { MarkdownEditorial } from '@/components/editorial/MarkdownEditorial'
import { QuizEngine } from '@/components/quiz/QuizEngine'
import { Button } from '@/components/ui/button'
import { MatrixVisual } from '@/components/ugp/MatrixVisual'

import { extractToc, estimateReadingTime } from '@/lib/module/toc'

type Phase = 'content' | 'quiz'

export default function ContentPage() {
  const params = useParams<{ slug: string }>()
  const slug = params.slug
  const { completedModules, refreshModules } = useUGP()
  const currentLevel = useUGPLevel()
  const router = useRouter()
  const [toggling, setToggling] = React.useState(false)

  // Slugs especiais (`roadmap`, `cursos-gratuitos`) têm rotas próprias.
  if (slug === 'roadmap' || slug === 'cursos-gratuitos') {
    return (
      <div className="text-[14px] text-[hsl(var(--muted-foreground))]">Conteúdo não encontrado.</div>
    )
  }

  if (slug === 'matriz') {
    return <MatrizLegacy currentLevel={currentLevel} />
  }

  const content = CONTENT[slug]
  if (!content) {
    return (
      <div className="space-y-4 py-10">
        <nav className="flex items-center gap-2 text-[12px] text-[hsl(var(--muted-foreground))]">
          <Link href="/app" className="inline-flex items-center gap-1 hover:text-[hsl(var(--foreground))]">
            <Home className="h-3 w-3" /> Início
          </Link>
        </nav>
        <p className="text-[14px] text-[hsl(var(--muted-foreground))]">Conteúdo não encontrado.</p>
        <Link href="/app" className="text-[13px] text-[hsl(var(--primary))] hover:underline">← Voltar ao dashboard</Link>
      </div>
    )
  }

  return (
    <ModuleView
      key={slug}
      slug={slug}
      content={content}
      completed={completedModules.has(slug)}
      onToggleProgress={async () => {
        setToggling(true)
        await toggleModuleProgress(slug, completedModules.has(slug))
        await refreshModules()
        setToggling(false)
        router.refresh()
      }}
      toggling={toggling}
    />
  )
}

// ──────────────────────────────────────────────────────────
interface ModuleViewProps {
  slug: string
  content: { title: string; body: string }
  completed: boolean
  onToggleProgress: () => void
  toggling: boolean
}

function ModuleView({ slug, content, completed, onToggleProgress, toggling }: ModuleViewProps) {
  const meta = MODULE_META[slug]
  const ugp = useUGP()
  const toc = React.useMemo(() => extractToc(content.body), [content.body])
  const groupLabel = React.useMemo(() => {
    const g = NAV_TREE.find((grp) => grp.items.some((i) => i.slug === slug))
    return g?.label ?? 'Módulo'
  }, [slug])

  const quiz = React.useMemo(() => getQuiz(slug), [slug])

  const [phase, setPhase] = React.useState<Phase>('content')
  const [bestPercentage, setBestPercentage] = React.useState<number | null>(null)
  const [attempts, setAttempts] = React.useState(0)
  const [saving, setSaving] = React.useState(false)
  const [allRead, setAllRead] = React.useState(false)

  React.useEffect(() => {
    setAllRead(false)
  }, [slug])

  React.useEffect(() => {
    let active = true
    getQuizStats(slug).then((s) => {
      if (!active) return
      setBestPercentage(s.bestPercentage)
      setAttempts(s.attempts)
    })
    return () => { active = false }
  }, [slug, attempts])

  const currentIndex = SEQUENCABLE_MODULES.findIndex((m) => m.slug === slug)
  const prev = currentIndex > 0 ? SEQUENCABLE_MODULES[currentIndex - 1] : null
  const next =
    currentIndex >= 0 && currentIndex < SEQUENCABLE_MODULES.length - 1
      ? SEQUENCABLE_MODULES[currentIndex + 1]
      : null

  async function handleSave(result: {
    score: number
    total: number
    percentage: number
    correctIds: string[]
    incorrectIds: string[]
    durationMs: number
  }) {
    setSaving(true)
    try {
      await saveQuizAttempt({ moduleId: slug, ...result })
      const s = await getQuizStats(slug)
      setBestPercentage(s.bestPercentage)
      setAttempts(s.attempts)
      await ugp.refreshModules()
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <ReadingProgress />
      <div className="space-y-8 pb-20">
        {meta ? (
          <ModuleHero meta={meta} groupLabel={groupLabel} />
        ) : (
          <header className="border-b pb-4" style={{ borderColor: 'var(--border-subtle)' }}>
            <h1 className="font-heading text-3xl font-bold tracking-tight">{content.title}</h1>
          </header>
        )}

        {meta?.mission && meta.mission.length > 0 && (
          <ModuleMission items={meta.mission} />
        )}

        {meta?.prerequisites && meta.prerequisites.length > 0 && (
          <Prerequisites items={meta.prerequisites} />
        )}

        {phase === 'content' ? (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px]">
            {/* Conteúdo principal */}
            <article id="module-article" className="min-w-0 max-w-3xl">
              <MarkdownEditorial source={content.body} />

              {/* Exercises */}
              {meta && meta.exercises.length > 0 && <ExercisesBlock items={meta.exercises} />}

              {/* Summary cards */}
              {meta && meta.summary.length > 0 && (
                <div className="mt-12">
                  <SummaryCards cards={meta.summary} />
                </div>
              )}

              {/* Connections */}
              {meta?.connections && meta.connections.length > 0 && (
                <div className="mt-10">
                  <Connections items={meta.connections} />
                </div>
              )}

              {/* Checklist */}
              {meta && meta.checklist.length > 0 && (
                <div className="mt-12">
                  <LearningChecklist items={meta.checklist} />
                </div>
              )}

              {/* Quiz start card */}
              {quiz.length > 0 && (
                <div className="mt-12">
                  <QuizPreview onStart={() => setPhase('quiz')} questionCount={quiz.length} bestPercentage={bestPercentage} attempts={attempts} saving={saving} />
                </div>
              )}

              {/* Completion card — celebrado quando todas as seções foram lidas */}
              {meta && (allRead || completed) && (
                <div className="mt-12">
                  <ModuleCompletionCard
                    competencies={meta.competencies ?? []}
                    nextStep={meta.nextSteps[0] ?? null}
                  />
                </div>
              )}

              {/* Next steps */}
              {meta && meta.nextSteps.length > 0 && (
                <div className="mt-12">
                  <NextModule steps={meta.nextSteps} />
                </div>
              )}

              {/* Footer nav */}
              <footer className="mt-12 flex flex-wrap items-center justify-between gap-3">
                {prev ? (
                  <Link
                    href={`/content/${prev.slug}`}
                    className="inline-flex items-center gap-1 text-[12px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                  >
                    <ArrowLeft className="h-3 w-3" /> {prev.label}
                  </Link>
                ) : <span />}
                <Button
                  variant={completed ? 'secondary' : 'default'}
                  size="sm"
                  onClick={onToggleProgress}
                  disabled={toggling}
                >
                  {toggling ? <Loader2 className="h-4 w-4 animate-spin" /> : completed ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : null}
                  {completed ? 'Concluído ✓' : 'Marcar como concluído'}
                </Button>
                {next ? (
                  <Link
                    href={`/content/${next.slug}`}
                    className="inline-flex items-center gap-1 text-[12px] text-[hsl(var(--primary))] hover:underline"
                  >
                    {next.label} <ArrowRight className="h-3 w-3" />
                  </Link>
                ) : <span />}
              </footer>
            </article>

            {/* Sticky Learning Navigator (desktop) */}
            <aside className="hidden lg:block">
              <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
                <LearningNavigator
                  moduleId={slug}
                  items={toc}
                  readingTime={meta?.readingTime ?? estimateReadingTime(content.body)}
                  onAllRead={() => setAllRead(true)}
                />
              </div>
            </aside>
          </div>
        ) : (
          <div className="max-w-2xl">
            <QuizEngine
              meta={MODULE_META[slug] ?? fallbackMeta(slug, content.title)}
              questions={quiz}
              bestPercentage={bestPercentage}
              attempts={attempts}
              onSaveAttempt={handleSave}
            />
            <div className="mt-6 flex justify-center">
              <Button variant="outline" size="sm" onClick={() => setPhase('content')}>
                <ArrowLeft className="h-4 w-4" /> Voltar ao conteúdo
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function QuizPreview({
  onStart,
  questionCount,
  bestPercentage,
  attempts,
  saving,
}: {
  onStart: () => void
  questionCount: number
  bestPercentage: number | null
  attempts: number
  saving: boolean
}) {
  return (
    <section id="quiz-preview" className="scroll-mt-24">
      <div
        className="overflow-hidden rounded-xl p-6"
        style={{
          background:
            'radial-gradient(700px 220px at 100% -10%, rgba(139,92,246,0.18), transparent 60%),' +
            'radial-gradient(500px 180px at 0% 110%, rgba(99,102,241,0.14), transparent 60%),' +
            'var(--canvas-raised)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--primary))]">
              <ListOrdered className="h-3.5 w-3.5" /> Sistema de Fixação
            </div>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight">Teste seus conhecimentos</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[hsl(var(--muted-foreground))]">
              {questionCount} perguntas que fazem pensar — não decorar. Após concluir, sua nota é salva, XP é concedido e o módulo pode ser marcado concluído automaticamente (≥80%).
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-[hsl(var(--muted-foreground))]">
              {bestPercentage != null && (
                <span className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1" style={{ borderColor: 'var(--border-subtle)' }}>
                  🏆 Melhor: <span className="font-mono text-[hsl(var(--foreground))]">{bestPercentage}%</span>
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1" style={{ borderColor: 'var(--border-subtle)' }}>
                🔁 Tentativas: <span className="font-mono text-[hsl(var(--foreground))]">{attempts}</span>
              </span>
            </div>
          </div>
          <Button size="lg" onClick={onStart} disabled={saving} className="shrink-0">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Iniciar desafio
          </Button>
        </div>
      </div>
    </section>
  )
}

function ExercisesBlock({ items }: { items: { scenario: string; prompt: string; hint?: string }[] }) {
  return (
    <section id="exercicios" className="mt-12 scroll-mt-24">
      <header className="mb-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">Prática</p>
        <h2 className="font-heading text-2xl font-bold tracking-tight">Exercícios</h2>
        <p className="mt-1 text-[13px] text-[hsl(var(--muted-foreground))]">Aplique o que você acabou de ler. Escreva a resposta em seus próprios termos — não copie do módulo.</p>
      </header>
      <ol className="space-y-3">
        {items.map((it, i) => (
          <li
            key={i}
            className="rounded-lg p-4 ugp-surface"
          >
            <div className="flex items-start gap-3">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-[12px]"
                style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', color: '#c4b5fd' }}
              >
                {i + 1}
              </div>
              <div className="min-w-0">
                <p className="text-[14px] leading-relaxed">
                  <span className="text-[hsl(var(--muted-foreground))]">Cenário. </span>
                  {it.scenario}
                </p>
                <p className="mt-2 text-[14px] font-medium leading-relaxed text-[hsl(var(--foreground))]">{it.prompt}</p>
                {it.hint && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-[12px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]">Ver dica</summary>
                    <p className="mt-1 text-[13px] text-[hsl(var(--muted-foreground))]">{it.hint}</p>
                  </details>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

// Matrix é visual.
function MatrizLegacy({ currentLevel }: { currentLevel: string | null }) {
  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-2 text-[12px] text-[hsl(var(--muted-foreground))]">
        <Link href="/app" className="inline-flex items-center gap-1 hover:text-[hsl(var(--foreground))]">
          <Home className="h-3 w-3" /> Início
        </Link>
        <span>/</span>
        <span className="text-[hsl(var(--foreground))]">Matriz de Progressão</span>
      </nav>
      <h1 className="font-heading text-2xl font-bold">Matriz de Progressão</h1>
      <p className="text-[14px] text-[hsl(var(--muted-foreground))]">Os 8 níveis da jornada UGP. Clique em cada nível para ver detalhes.</p>
      <MatrixVisual currentLevel={currentLevel ?? ''} />
    </div>
  )
}

// Helper para módulos sem meta — cria um meta mínimo só p/ continuar rodando.
function fallbackMeta(slug: string, title: string): ModuleMeta {
  return {
    slug,
    title,
    subtitle: '',
    description: '',
    level: 'Intermediário',
    readingTime: estimateReadingTime(CONTENT[slug]?.body ?? ''),
    technologies: [],
    tags: [],
    summary: [],
    checklist: [],
    exercises: [],
    nextSteps: [],
  }
}