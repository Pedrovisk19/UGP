'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { CheckCircle2, Loader2, ArrowLeft, ArrowRight, Home } from 'lucide-react'
import { useUGP } from '@/providers/UGPProvider'
import { CONTENT, SEQUENCABLE_MODULES } from '@/lib/ugpContent'
import { toggleModuleProgress } from '@/actions/module-progress.actions'
import { MarkdownView } from '@/components/ugp/MarkdownView'
import { MatrixVisual } from '@/components/ugp/MatrixVisual'
import { Button } from '@/components/ui/button'
import { useUGPLevel } from '@/hooks/use-ugp-level'

export default function ContentPage() {
  const params = useParams<{ slug: string }>()
  const slug = params.slug
  const { completedModules, refreshModules } = useUGP()
  const currentLevel = useUGPLevel()
  const router = useRouter()
  const [toggling, setToggling] = useState(false)

  // Slugs especiais têm rotas próprias (roadmap, cursos-gratuitos). Aqui não devem chegar.
  if (slug === 'roadmap' || slug === 'cursos-gratuitos') {
    return (
      <div className="text-[14px] text-[hsl(var(--muted-foreground))]">
        Conteúdo não encontrado.
      </div>
    )
  }

  if (slug === 'matriz') {
    return (
      <div className="space-y-6">
        <Breadcrumb title="Matriz de Progressão" />
        <h1 className="font-heading text-2xl font-bold">Matriz de Progressão</h1>
        <p className="text-[14px] text-[hsl(var(--muted-foreground))]">
          Os 8 níveis da jornada UGP. Clique em cada nível para ver detalhes.
        </p>
        <MatrixVisual currentLevel={currentLevel} />
      </div>
    )
  }

  const content = CONTENT[slug]

  if (!content) {
    return (
      <div className="space-y-4">
        <Breadcrumb title="Não encontrado" />
        <p className="text-[14px] text-[hsl(var(--muted-foreground))]">
          Conteúdo não encontrado.
        </p>
        <Link href="/app" className="text-[hsl(var(--primary))] hover:underline text-[13px]">
          ← Voltar ao dashboard
        </Link>
      </div>
    )
  }

  const isCompleted = completedModules.has(slug)
  const currentIndex = SEQUENCABLE_MODULES.findIndex((m) => m.slug === slug)
  const prev = currentIndex > 0 ? SEQUENCABLE_MODULES[currentIndex - 1] : null
  const next =
    currentIndex >= 0 && currentIndex < SEQUENCABLE_MODULES.length - 1
      ? SEQUENCABLE_MODULES[currentIndex + 1]
      : null

  async function handleToggle() {
    setToggling(true)
    await toggleModuleProgress(slug, isCompleted)
    await refreshModules()
    setToggling(false)
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <Breadcrumb title={content.title} />

      <article className="max-w-3xl">
        <h1 className="font-heading text-3xl font-bold mb-6">{content.title}</h1>
        <MarkdownView>{content.body}</MarkdownView>
      </article>

      <div
        className="sticky bottom-4 mt-8 flex items-center justify-between gap-3 p-3 rounded-md"
        style={{
          background: 'var(--canvas-overlay)',
          border: '1px solid var(--border-default)',
        }}
      >
        <Button
          onClick={handleToggle}
          disabled={toggling}
          variant={isCompleted ? 'secondary' : 'default'}
          size="sm"
        >
          {toggling ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isCompleted ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          ) : null}
          {isCompleted ? 'Concluído ✓' : 'Marcar como concluído'}
        </Button>

        <div className="flex items-center gap-2">
          {prev && (
            <Link
              href={`/content/${prev.slug}`}
              className="inline-flex items-center gap-1 text-[12px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            >
              <ArrowLeft className="h-3 w-3" /> {prev.label}
            </Link>
          )}
          {next && (
            <Link
              href={`/content/${next.slug}`}
              className="inline-flex items-center gap-1 text-[12px] text-[hsl(var(--primary))] hover:underline"
            >
              {next.label} <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

function Breadcrumb({ title }: { title: string }) {
  return (
    <nav className="flex items-center gap-2 text-[12px] text-[hsl(var(--muted-foreground))]">
      <Link href="/app" className="inline-flex items-center gap-1 hover:text-[hsl(var(--foreground))]">
        <Home className="h-3 w-3" /> Início
      </Link>
      <span>/</span>
      <span className="text-[hsl(var(--foreground))]">{title}</span>
    </nav>
  )
}