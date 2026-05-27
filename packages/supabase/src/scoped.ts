import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "./types"

export function pickOne<T extends Record<string, any>>(q: { data: T[] | null; error: any }): T | null {
  if (q.error) throw q.error
  return q.data?.[0] ?? null
}

export async function getProfileByEmail(client: SupabaseClient<Database>, email: string) {
  const { data, error } = await client
    .from("profiles")
    .select("*")
    .eq("email", email.toLowerCase().trim())
    .maybeSingle()
  if (error) throw error
  return data
}

export async function getSiteSettings(client: SupabaseClient<Database>, siteId: string) {
  const { data, error } = await client
    .from("site_settings")
    .select("*")
    .eq("id", siteId)
    .single()
  if (error) throw error
  return data
}
