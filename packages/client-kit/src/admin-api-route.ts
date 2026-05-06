// Admin panel API route — GET/PUT site content from Supabase
// Place this at app/api/admin/content/route.ts in any Next.js app

import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const siteId = searchParams.get("site") || "default"

  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })

  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("site_id", siteId)
    .single()

  if (error && error.code !== "PGRST116") return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data) return NextResponse.json({ content: {}, siteId })

  return NextResponse.json({ content: data.content, siteId })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { siteId, content } = body

  if (!content) return NextResponse.json({ error: "content is required" }, { status: 400 })
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })

  const { error } = await supabase
    .from("site_content")
    .upsert({ site_id: siteId || "default", content }, { onConflict: "site_id" })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
