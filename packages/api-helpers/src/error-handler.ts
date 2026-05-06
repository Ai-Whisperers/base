import { NextResponse } from "next/server"

export function errorResponse(message: string, status: number = 400, details?: unknown) {
  return NextResponse.json(
    { error: message, ...(details ? { details } : {}) },
    { status }
  )
}

export function apiErrorHandler(err: unknown) {
  console.error("[API Error]", err)
  const message = err instanceof Error ? err.message : "Internal server error"
  return NextResponse.json({ error: message }, { status: 500 })
}
