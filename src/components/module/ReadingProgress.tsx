'use client'

import * as React from 'react'

/** Barra de progresso de leitura fixa no topo da viewport. */
export function ReadingProgress() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    let ticking = false
    function update() {
      const el = document.getElementById('module-article')
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.scrollHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const pct = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0
      setProgress(pct)
      ticking = false
    }
    function onScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-50 h-[3px] pointer-events-none"
      style={{ background: 'transparent' }}
    >
      <div
        className="h-full origin-left transition-transform duration-150"
        style={{
          transform: `scaleX(${progress})`,
          background:
            'linear-gradient(90deg, var(--accent-indigo), var(--accent-purple))',
          boxShadow: '0 0 12px rgba(139,92,246,0.6)',
        }}
      />
    </div>
  )
}