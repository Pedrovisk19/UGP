import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { LEVELS } from '@/lib/ugpContent'
import type { Level } from '@/types/ugp.types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function levelForXp(xp: number, levels: Level[] = LEVELS): Level {
  let current = levels[0]
  for (const lvl of levels) {
    if (xp >= lvl.xp) current = lvl
  }
  return current
}

export function nextLevel(currentLevelName: string, levels: Level[] = LEVELS): Level | null {
  const idx = levels.findIndex((l) => l.name === currentLevelName)
  if (idx === -1 || idx === levels.length - 1) return null
  return levels[idx + 1]
}