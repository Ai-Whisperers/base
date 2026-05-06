import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSupabaseClient } from "./supabase-client"

export interface AuthUser {
  id: string
  email?: string
  role: string
}

export async function getUserFromSession(request: NextRequest): Promise<AuthUser | null> {
  const supabase = getSupabaseClient()
  const authHeader = request.headers.get("Authorization")?.replace("Bearer ", "")
  if (!authHeader) return null

  const { data: { user }, error } = await supabase.auth.getUser(authHeader)
  if (error || !user) return null

  return {
    id: user.id,
    email: user.email,
    role: (user as any).role || "user",
  }
}

export function withAuth(
  handler: (req: NextRequest, user: AuthUser) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    const user = await getUserFromSession(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return handler(request, user)
  }
}

export function withAdmin(
  handler: (req: NextRequest, user: AuthUser) => Promise<NextResponse>
) {
  return withAuth(async (request, user) => {
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }
    return handler(request, user)
  })
}
