'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/types/ugp.types'

interface AuthContextValue {
  session: Session | null
  user: User | null
  profile: Profile | null
  loading: boolean
  profileLoading: boolean
  authError: string | null
  refreshProfile: () => Promise<Profile | null>
  signOutAndRedirect: (reason?: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const refreshProfile = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setProfile(null)
      return null
    }
    // Garante que session está setada mesmo se onAuthStateChange disparou
    // antes com INITIAL_SESSION=null (race comum no @supabase/ssr).
    setSession((prev) => prev ?? null)
    // Pega a sessão explicitamente para sincronizar o estado local.
    const { data: sessionData } = await supabase.auth.getSession()
    setSession(sessionData.session)
    setProfileLoading(true)
    // maybeSingle() evita erro PGRST116 quando a row ainda não existe
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle()
    setProfileLoading(false)
    if (error) {
      console.warn('refreshProfile: erro ao ler profile', error.message)
      setProfile(null)
      return null
    }
    setProfile(data as Profile | null)
    return data as Profile | null
  }, [supabase])

  useEffect(() => {
    let mounted = true

    // Safety timeout: se getSession não resolver em 8s, saímos do loading para
    // evitar spinner infinito. UGPProvider cuida do redirect para /login com erro.
    const safety = setTimeout(() => {
      if (!mounted) return
      if (loading) {
        console.warn('AuthProvider: getSession demorou demais — forçando loading=false')
        setAuthError('session_timeout')
        setLoading(false)
      }
    }, 8000)

    supabase.auth
      .getSession()
      .then(async ({ data }) => {
        if (!mounted) return
        clearTimeout(safety)
        setSession(data.session)
        if (data.session?.user) {
          await refreshProfile()
        }
        setLoading(false)
      })
      .catch((err) => {
        if (!mounted) return
        clearTimeout(safety)
        console.warn('AuthProvider: erro em getSession', err)
        setAuthError('session_error')
        setSession(null)
        setProfile(null)
        setLoading(false)
      })

    const { data: sub } = supabase.auth.onAuthStateChange(async (_e, newSession) => {
      setSession(newSession)
      if (newSession?.user) {
        await refreshProfile()
      } else {
        setProfile(null)
      }
    })

    return () => {
      mounted = false
      clearTimeout(safety)
      sub.subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase])

  const signOutAndRedirect = useCallback(async (reason?: string) => {
    try {
      await supabase.auth.signOut()
    } catch {
      // ignore
    }
    setSession(null)
    setProfile(null)
    const url = new URL('/login', window.location.origin)
    if (reason) url.searchParams.set('error', reason)
    if (window.location.pathname !== '/login') {
      url.searchParams.set('redirect', window.location.pathname)
      window.location.replace(url.toString())
    }
  }, [supabase])

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        profile,
        loading,
        profileLoading,
        authError,
        refreshProfile,
        signOutAndRedirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}