"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode, JSX } from "react"
import { createClient } from "@supabase/supabase-js"

// ─── Types ──────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string
  email: string
  name?: string
  role?: string
  avatar_url?: string
  phone?: string
  [key: string]: any
}

export interface Address {
  id: string
  label: string
  street: string
  city: string
  state?: string
  zip?: string
  country?: string
  isDefault?: boolean
}

export interface AuthContextType {
  user: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, name?: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error?: string }>
  updateProfile: (data: Partial<UserProfile>) => Promise<{ error?: string }>
  addresses: Address[]
  addAddress: (address: Omit<Address, "id">) => Promise<void>
}

// ─── Auth Context Factory ───────────────────────────────────────────────────

interface AuthConfig {
  supabaseUrl: string
  supabaseAnonKey: string
  storagePrefix: string // e.g., "viajero", "nexa", "3md"
}

export function createAuthContext(config: AuthConfig) {
  const { supabaseUrl, supabaseAnonKey, storagePrefix } = config
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const STORAGE_KEY_USER = `${storagePrefix}_user`
  const STORAGE_KEY_ADDRESSES = `${storagePrefix}_addresses`

  const AuthContext = createContext<AuthContextType>({} as AuthContextType)

  function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
    const [user, setUser] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)
    const [addresses, setAddresses] = useState<Address[]>([])

    // Restore from localStorage on mount
    useEffect(() => {
      try {
        const cached = localStorage.getItem(STORAGE_KEY_USER)
        if (cached) setUser(JSON.parse(cached))
        const addr = localStorage.getItem(STORAGE_KEY_ADDRESSES)
        if (addr) setAddresses(JSON.parse(addr))
      } catch {}
      setLoading(false)
    }, [])

    // Listen for auth state changes
    useEffect(() => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          const profile: UserProfile = {
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata?.name,
            role: session.user.user_metadata?.role,
            avatar_url: session.user.user_metadata?.avatar_url,
          }
          setUser(profile)
          localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(profile))
        } else {
          setUser(null)
          localStorage.removeItem(STORAGE_KEY_USER)
        }
      })
      return () => subscription.unsubscribe()
    }, [])

    const signIn = useCallback(async (email: string, password: string) => {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      return { error: error?.message }
    }, [])

    const signUp = useCallback(async (email: string, password: string, name?: string) => {
      const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { data: { name } }
      })
      if (data.user) {
        // Create profile record
        await supabase.from("profiles").upsert({
          id: data.user.id,
          email,
          name,
          created_at: new Date().toISOString(),
        })
      }
      return { error: error?.message }
    }, [])

    const signOut = useCallback(async () => {
      await supabase.auth.signOut()
      setUser(null)
      localStorage.removeItem(STORAGE_KEY_USER)
      localStorage.removeItem(STORAGE_KEY_ADDRESSES)
    }, [])

    const resetPassword = useCallback(async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      })
      return { error: error?.message }
    }, [])

    const updateProfile = useCallback(async (data: Partial<UserProfile>) => {
      const { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        ...data,
        updated_at: new Date().toISOString(),
      })
      if (!error && user) {
        const updated = { ...user, ...data }
        setUser(updated)
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated))
      }
      return { error: error?.message }
    }, [user])

    const addAddress = useCallback(async (address: Omit<Address, "id">) => {
      const newAddr: Address = { ...address, id: crypto.randomUUID?.() || `${Date.now()}` }
      const updated = [...addresses, newAddr]
      setAddresses(updated)
      localStorage.setItem(STORAGE_KEY_ADDRESSES, JSON.stringify(updated))
    }, [addresses])

    return (
      <AuthContext.Provider value={{
        user, loading,
        signIn, signUp, signOut, resetPassword, updateProfile,
        addresses, addAddress,
      }}>
        {children}
      </AuthContext.Provider>
    )
  }

  function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error(`useAuth(${storagePrefix}) must be used within AuthProvider`)
    return ctx
  }

  return { AuthProvider, useAuth, supabase }
}
