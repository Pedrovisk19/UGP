import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--canvas)' }}
    >
      <div className="text-center">
        <h1 className="font-heading text-6xl font-bold mb-2">404</h1>
        <p className="text-[14px] text-[hsl(var(--muted-foreground))] mb-6">
          Página não encontrada.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 h-10 rounded-md text-white text-sm"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}