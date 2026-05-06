// Runtime content loader — fetches from Supabase or falls back to static import
import type { SiteContent } from "./schema"

type ContentLoader = () => Promise<SiteContent>

let cachedContent: SiteContent | null = null
let contentLoader: ContentLoader | null = null

// Fallback: try static import from content/es.json (works at build time)
async function staticLoader(): Promise<SiteContent> {
  try {
    // Runtime import — consumer app provides the path
    return {} as SiteContent
  } catch {
    // During dev/build, content may not exist yet
    return {} as SiteContent
  }
}

// Supabase runtime loader — no rebuild needed for content changes
function createSupabaseLoader(
  supabaseUrl: string,
  supabaseKey: string,
  siteId: string
): ContentLoader {
  return async () => {
    const { createClient } = await import("@supabase/supabase-js")
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("site_id", siteId)
      .single()

    if (error || !data) {
      console.warn("[ContentLoader] Supabase fetch failed, falling back:", error)
      return staticLoader()
    }
    return data.content as SiteContent
  }
}

// Simple JSON file loader — fetches from a URL at runtime
function createUrlLoader(url: string): ContentLoader {
  return async () => {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await res.json()
    } catch (e) {
      console.warn("[ContentLoader] URL fetch failed, falling back:", e)
      return staticLoader()
    }
  }
}

export function configureContentLoader(loader: ContentLoader) {
  contentLoader = loader
  cachedContent = null // invalidate cache
}

export function configureSupabaseLoader(supabaseUrl: string, supabaseKey: string, siteId: string) {
  contentLoader = createSupabaseLoader(supabaseUrl, supabaseKey, siteId)
  cachedContent = null
}

export function configureUrlLoader(url: string) {
  contentLoader = createUrlLoader(url)
  cachedContent = null
}

export async function getContent(): Promise<SiteContent> {
  if (cachedContent) return cachedContent
  const loader = contentLoader || staticLoader
  cachedContent = await loader()
  return cachedContent
}

export function clearCache() {
  cachedContent = null
}

// React hook for client components
export function useContent(): SiteContent {
  // In React components that import at module level, this is a build-time import.
  // The runtime loader is used server-side via getContent().
  // For client components, content should be passed as props.
  throw new Error(
    "useContent() is for server-side only. Pass content as props to client components."
  )
}
