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
  const {
    profile,
    session,
    user,
    loading: authLoading,
    profileLoading,
    authError,
    signOutAndRedirect,
    refreshProfile,
  } = useAuth()
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set())
  const router = useRouter()
  const supabase = createClient()

  const refreshModules = useCallback(async () => {
    const { data } = await supabase
      .from('module_progress')
      .select('module_id')
      .eq('completed', true)
    if (data) setCompletedModules(new Set(data.map((r: { module_id: string }) => r.module_id)))
  }, [supabase])

  useEffect(() => {
    // 1. Qualquer erro explícito de sessão → volta para login com mensagem.
    if (authError === 'session_timeout' || authError === 'session_error') {
      signOutAndRedirect(authError)
      return
    }

    // 2. Enquanto auth está carregando, não decide ainda — mas se passar de
    //    um tempo razoável sem resolução, força o redirect para login.
    if (authLoading) return

    // 3. authLoading=false e sem sessão/usuário → não há autenticação válida.
    if (!session || !user) {
      signOutAndRedirect('no_session')
      return
    }

    // 4. Sessão existe mas profile não carregou (em andamento). Dá um tempo
    //    limitado para profile carregar; se passar, assume perfil corrompido
    //    e manda para login (não para /gate) com erro específico.
    if (!profile) {
      if (!profileLoading) {
        // abortado/inexistente — volta para login
        signOutAndRedirect('profile_missing')
      }
      return
    }

    // 5. Profile carregado mas sem trilha selecionada → /gate escolhe a trilha.
    if (!profile.selected_trail) {
      router.replace('/gate')
      return
    }

    refreshModules()
  }, [
    profile,
    session,
    user,
    authLoading,
    profileLoading,
    authError,
    router,
    refreshModules,
    signOutAndRedirect,
  ])

  // Expor refreshUser que chama refreshProfile do AuthProvider.
  return (
    <UGPContext.Provider value={{ user: profile, refreshUser: refreshProfile, completedModules, refreshModules }}>
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