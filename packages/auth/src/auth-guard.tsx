"use client"
import React, { useEffect, JSX } from "react"
import { useRouter } from "next/navigation"
import { AuthContextType } from "./auth-context"

interface AuthGuardProps {
  children: React.ReactNode
  useAuth: () => AuthContextType
}

export function createAuthGuard(useAuth: () => AuthContextType) {
  return function AuthGuard({ children }: { children: React.ReactNode }): JSX.Element {
    const { user, loading } = useAuth()
    const router = useRouter()
    useEffect(() => { if (!loading && !user) router.push("/login") }, [user, loading, router])
    if (loading) return <div className="flex items-center justify-center min-h-screen"><p className="text-muted-foreground">Cargando...</p></div>
    if (!user) return <></>
    return <>{children}</>
  }
}
