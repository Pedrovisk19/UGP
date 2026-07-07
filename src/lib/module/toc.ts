export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export interface TocItem {
  level: number
  text: string
  id: string
}

/** Extrai TOC do markdown: H2 e H3 viram itens do índice. */
export function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split('\n')
  const items: TocItem[] = []
  let inFence = false
  let fenceMarker = ''
  for (const raw of lines) {
    const line = raw.trimEnd()
    const fenceMatch = line.match(/^(`{3,}|~{3,})/)
    if (fenceMatch) {
      const marker = fenceMatch[1][0]
      if (!inFence) { inFence = true; fenceMarker = marker }
      else if (marker === fenceMarker) { inFence = false; fenceMarker = '' }
      continue
    }
    if (inFence) continue
    const m = line.match(/^(#{2,3})\s+(.+?)\s*#*$/)
    if (!m) continue
    const level = m[1].length
    const text = m[2].replace(/[*_`~]/g, '').trim()
    if (!text) continue
    items.push({ level, text, id: slugify(text) })
  }
  return items
}

/** Tempo médio de leitura em minutos (200 wpm) — fallback quando meta não tem readingTime. */
export function estimateReadingTime(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')   // remove code blocks
    .replace(/`[^`]*`/g, ' ')          // inline code
    .replace(/[#>*_~\-]/g, ' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}