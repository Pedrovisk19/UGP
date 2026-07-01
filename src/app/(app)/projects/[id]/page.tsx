'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { ArrowLeft, CheckCircle2, GitBranch, ExternalLink, Share2, Loader2, Rocket } from 'lucide-react'
import { getProject, getProjectTotalItems, tagClass } from '@/lib/ugpContent'
import { LEVELS } from '@/lib/ugpContent'
import { nextLevel } from '@/lib/utils'
import { useUGP } from '@/providers/UGPProvider'
import { ProjectChecklist } from '@/components/ugp/ProjectChecklist'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  submitProject,
  getProjectSubmission,
  advanceProjectLevel,
} from '@/actions/project-submission.actions'
import { useToast } from '@/components/ui/use-toast'
import type { ProjectSubmission } from '@/types/ugp.types'

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>()
  const id = Number(params.id)
  const project = getProject(id)
  const { user, refreshUser } = useUGP()
  const { toast } = useToast()

  const [progress, setProgress] = useState({ checked: 0, total: 0 })
  const [submission, setSubmission] = useState<ProjectSubmission | null>(null)
  const [advanced, setAdvanced] = useState(false)
  const [advancing, setAdvancing] = useState(false)
  const [submitOpen, setSubmitOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [githubUrl, setGithubUrl] = useState('')
  const [productionUrl, setProductionUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!project) return
    getProjectSubmission(project.id).then((s) => setSubmission(s))
  }, [project?.id])

  if (!project || !user) {
    return (
      <div className="space-y-4">
        <Link href="/app" className="text-[13px] text-[hsl(var(--primary))] hover:underline">
          ← Voltar
        </Link>
        <p className="text-[14px] text-[hsl(var(--muted-foreground))]">Projeto não encontrado.</p>
      </div>
    )
  }

  const total = getProjectTotalItems(project)
  const complete = total > 0 && progress.checked === progress.total && progress.total > 0
  const progressPct = progress.total > 0 ? (progress.checked / progress.total) * 100 : 0
  const next = nextLevel(user.current_level ?? '', LEVELS)
  const newLevelName = next ? next.name : user.current_level ?? LEVELS[0].name

  async function handleAdvance() {
    if (!project || !complete) return
    setAdvancing(true)
    const res = await advanceProjectLevel({
      projectId: project.id,
      xpGain: project.xp,
      newLevel: newLevelName,
    })
    setAdvancing(false)
    if (res?.error) {
      toast({ title: 'Erro', description: res.error, variant: 'destructive' })
      return
    }
    setAdvanced(true)
    await refreshUser()
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#6366f1', '#8b5cf6', '#f59e0b'],
    })
    setTimeout(() => setShareOpen(true), 1000)
  }

  async function handleSubmit() {
    if (!project) return
    if (!githubUrl.trim()) {
      toast({ title: 'Erro', description: 'GitHub URL é obrigatória', variant: 'destructive' })
      return
    }
    setSubmitting(true)
    const res = await submitProject({
      projectId: project.id,
      githubUrl: githubUrl.trim(),
      productionUrl: productionUrl.trim() || undefined,
    })
    setSubmitting(false)
    if (res?.error) {
      toast({ title: 'Erro', description: res.error, variant: 'destructive' })
      return
    }
    setSubmission(
      (prev) =>
        ({
          ...(prev ?? ({} as ProjectSubmission)),
          project_id: project.id,
          github_url: githubUrl.trim(),
          production_url: productionUrl.trim() || null,
          status: 'pending',
          submitted_at: new Date().toISOString(),
        } as ProjectSubmission)
    )
    setSubmitOpen(false)
    toast({ title: 'Entrega enviada!', description: 'Sua submissão está em revisão.' })
  }

  const allItems = [
    ...project.functional,
    ...project.nonFunctional,
    ...project.acceptance,
  ]

  return (
    <div className="space-y-8">
      <Link href="/app" className="inline-flex items-center gap-1.5 text-[13px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]">
        <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao dashboard
      </Link>

      {/* Header */}
      <section className="ugp-surface p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="ugp-tag ugp-badge-neutral tabular-nums">
            #{String(project.id).padStart(2, '0')}
          </span>
          <span className="ugp-tag ugp-badge-purple">{project.level}</span>
          <span className="ugp-tag ugp-badge-amber">{project.xp} XP</span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-2">{project.name}</h1>
        <p className="text-[14px] text-[hsl(var(--muted-foreground))] mb-4">{project.problem}</p>
        <p className="text-[13px] text-[hsl(var(--muted-foreground))] mb-4">{project.context}</p>

        <div className="mb-4">
          <div className="flex items-center justify-between text-[12px] mb-1.5">
            <span className="text-[hsl(var(--muted-foreground))]">
              Progresso: {progress.checked}/{progress.total || allItems.length}
            </span>
            <span className="text-[hsl(var(--muted-foreground))]">{Math.round(progressPct)}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-500"
              style={{
                width: `${progressPct}%`,
                background: complete
                  ? 'linear-gradient(90deg, #10b981, #34d399)'
                  : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {project.tags.map((t) => (
            <span key={t} className={tagClass(t)}>
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Requisitos */}
      <section className="grid sm:grid-cols-3 gap-4">
        <RequirementColumn title="Requisitos Funcionais" items={project.functional} />
        <RequirementColumn title="Requisitos Não-Funcionais" items={project.nonFunctional} />
        <RequirementColumn title="Critérios de Aceitação" items={project.acceptance} />
      </section>

      {/* Arquitetura sugerida */}
      <section className="ugp-surface p-5">
        <h2 className="font-heading font-semibold mb-3 text-[14px]">Arquitetura sugerida</h2>
        <pre className="text-[12px] font-mono whitespace-pre-wrap text-[hsl(var(--muted-foreground))]">
          {project.architecture}
        </pre>
      </section>

      {/* Checklist persistido */}
      <section>
        <h2 className="font-heading font-semibold mb-3 text-[14px]">Checklist do projeto</h2>
        <ProjectChecklist
          projectId={project.id}
          items={allItems}
          userId={user.id}
          onProgressChange={(checked, total) => setProgress({ checked, total })}
        />
      </section>

      {/* Banner de sucesso */}
      {advanced && (
        <div
          className="p-4 rounded-md text-center"
          style={{
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.3)',
          }}
        >
          <p className="text-[14px] text-emerald-300 font-semibold">
            🎉 Projeto concluído! Você está agora em {newLevelName}.
          </p>
        </div>
      )}

      {/* Status de submissão */}
      {submission && (
        <div className="ugp-surface p-4 flex items-center gap-3 flex-wrap">
          <span
            className={`ugp-tag ${
              submission.status === 'approved'
                ? 'ugp-badge-green'
                : submission.status === 'rejected'
                  ? 'ugp-badge-amber'
                  : 'ugp-badge-neutral'
            }`}
          >
            {submission.status === 'approved'
              ? 'Aprovada'
              : submission.status === 'rejected'
                ? 'Rejeitada'
                : 'Em revisão'}
          </span>
          <a
            href={submission.github_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[12px] text-[hsl(var(--primary))] hover:underline"
          >
            <GitBranch className="h-3 w-3" /> GitHub
          </a>
          {submission.production_url && (
            <a
              href={submission.production_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[12px] text-[hsl(var(--primary))] hover:underline"
            >
              <ExternalLink className="h-3 w-3" /> Produção
            </a>
          )}
        </div>
      )}

      {/* Ações */}
      <div className="flex items-center gap-3 flex-wrap">
        <Button variant="outline" onClick={() => setSubmitOpen(true)}>
          <GitBranch className="h-4 w-4" /> Entregar Projeto
        </Button>
        <Button
          onClick={handleAdvance}
          disabled={!complete || advancing || advanced}
          style={
            complete && !advanced
              ? { background: 'linear-gradient(135deg, #10b981, #059669)' }
              : undefined
          }
        >
          {advancing ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
          Concluir e Avançar Nível
        </Button>
        {advanced && (
          <Button variant="outline" onClick={() => setShareOpen(true)}>
            <Share2 className="h-4 w-4" /> Compartilhar
          </Button>
        )}
      </div>

      {/* Dialog de Entrega */}
      <Dialog open={submitOpen} onOpenChange={setSubmitOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Entregar Projeto #{String(project.id).padStart(2, '0')}</DialogTitle>
            <DialogDescription>
              Informe as URLs do seu projeto. A revisão ocorre em até 7 dias.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div>
              <label className="text-[12px] text-[hsl(var(--muted-foreground))] mb-1 block">
                GitHub URL *
              </label>
              <Input
                placeholder="https://github.com/usuario/projeto"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[12px] text-[hsl(var(--muted-foreground))] mb-1 block">
                URL de produção (opcional)
              </label>
              <Input
                placeholder="https://projeto.vercel.app"
                value={productionUrl}
                onChange={(e) => setProductionUrl(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setSubmitOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />}
              Enviar Entrega
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de compartilhamento */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Compartilhar conquista 🎉</DialogTitle>
            <DialogDescription>
              Conte ao mundo que você concluiu mais um projeto da UGP.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-[13px] text-[hsl(var(--foreground))]">{project.shareMessage}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <ShareButton
                label="LinkedIn"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  (process.env.NEXT_PUBLIC_SITE_URL ?? '') + `/projects/${project.id}`
                )}`}
              />
              <ShareButton
                label="Twitter"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(project.shareMessage)}`}
              />
              <ShareButton
                label="WhatsApp"
                href={`https://wa.me/?text=${encodeURIComponent(project.shareMessage)}`}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function RequirementColumn({
  title,
  items,
}: {
  title: string
  items: { key: string; text: string }[]
}) {
  return (
    <div className="ugp-surface p-4">
      <h3 className="text-[10px] uppercase tracking-widest text-[hsl(var(--muted-foreground))] mb-3">
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.key} className="text-[13px]">
            <span className="font-mono text-purple-400 mr-2">{item.key}</span>
            <span className="text-[hsl(var(--muted-foreground))]">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ShareButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 px-3 h-9 rounded-md border border-white/10 text-[13px] hover:bg-white/5"
    >
      <Share2 className="h-3.5 w-3.5" /> {label}
    </a>
  )
}