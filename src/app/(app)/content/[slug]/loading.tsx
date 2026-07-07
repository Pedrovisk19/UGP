import { Loader2 } from 'lucide-react'

export default function ModuleLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 pb-20">
      <div className="relative">
        <div
          className="h-12 w-12 rounded-full border-2 border-white/10 border-t-purple-500 animate-spin"
        />
        <Loader2 className="absolute inset-0 m-auto h-5 w-5 text-[hsl(var(--primary))] animate-pulse" />
      </div>
      <p className="text-[13px] text-[hsl(var(--muted-foreground))]">
        Carregando módulo…
      </p>

      <div className="mt-8 w-full max-w-3xl space-y-3" aria-hidden>
        <div className="h-8 w-2/3 rounded-md bg-white/5" />
        <div className="h-4 w-1/2 rounded-md bg-white/5" />
        <div className="mt-8 space-y-2.5">
          <div className="h-3 w-full rounded bg-white/5" />
          <div className="h-3 w-full rounded bg-white/5" />
          <div className="h-3 w-5/6 rounded bg-white/5" />
          <div className="h-3 w-full rounded bg-white/5" />
          <div className="h-3 w-4/6 rounded bg-white/5" />
        </div>
        <div className="mt-8 space-y-2.5">
          <div className="h-3 w-full rounded bg-white/5" />
          <div className="h-3 w-5/6 rounded bg-white/5" />
          <div className="h-3 w-full rounded bg-white/5" />
        </div>
      </div>
    </div>
  )
}