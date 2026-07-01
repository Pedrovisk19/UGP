'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { NAV_TREE } from '@/lib/ugpContent'
import { useAuth } from './AuthProvider'
import type { Profile } from '@/types/ugp.types'

interface UGPContextType {
  user: Profile | null
  refreshUser: () => Promise<Profile | null>
  completedModules: Set<string>
  refreshModules: () => Promise<void>
}

export const UGPContext = createContext<UGPContextType | null>(null)

export function UGPProvider({ children }: { children: React.ReactNode }) {
  const { profile, loading: authLoading, refreshProfile } = useAuth()
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set())
  const router = useRouter()
  const supabase = createClient()

  const refreshUser = refreshProfile

  const refreshModules = useCallback(async () => {
    const { data } = await supabase
      .from('module_progress')
      .select('module_id')
      .eq('completed', true)
    if (data) setCompletedModules(new Set(data.map((r: { module_id: string }) => r.module_id)))
  }, [supabase])

  useEffect(() => {
    // Se ainda estamos carregando a sessão, espere.
    if (authLoading) return

    // Sessão carregada mas profile é null → linha em `profiles` não existe
    // (trigger handle_new_user provavelmente não produziu row).
    // Redireciona para /gate, que vai fazer upsert e criar o profile.
    if (!profile) {
      router.push('/gate')
      return
    }

    if (!profile.selected_trail) {
      router.push('/gate')
      return
    }

    refreshModules()
  }, [profile, authLoading, router, refreshModules])

  return (
    <UGPContext.Provider value={{ user: profile, refreshUser, completedModules, refreshModules }}>
      {children}
    </UGPContext.Provider>
  )
}

export function useUGP() {
  const ctx = useContext(UGPContext)
  if (!ctx) throw new Error('useUGP must be used within UGPProvider')
  return ctx
}

export function useTotalModules() {
  return NAV_TREE.reduce((acc, g) => acc + g.items.length, 0)
}