'use client'

import { useUGP } from '@/providers/UGPProvider'
import { LEVELS } from '@/lib/ugpContent'
import { levelForXp } from '@/lib/utils'

export function useUGPLevel() {
  const { user } = useUGP()
  const xp = user?.xp_points ?? 0
  // Se o usuário já tem current_level definido, usamos ele; caso contrário derivamos do XP.
  if (user?.current_level) return user.current_level
  return levelForXp(xp, LEVELS).name
}

export { levelForXp }