import type { ImageManifest, SiteConfig, PageConfig, LoadedContent } from "./types"

/**
 * Synchronous JSON loader with optional TTL cache.
 * Reads from the filesystem using Node.js require or fs.
 */
export function loadJSON<T = any>(filePath: string, cache?: { data: T; timestamp: number; ttlMs: number }): {
  data: T
  cache: typeof cache
} {
  const now = Date.now()
  if (cache && now - cache.timestamp < cache.ttlMs) {
    return { data: cache.data, cache }
  }

  const fs = require("fs")
  const path = require("path")

  const locations = [
    filePath,
    path.join(process.cwd(), filePath),
    path.join(process.cwd(), "..", filePath),
    path.join(process.cwd(), "..", "..", filePath),
  ]

  let raw: string | null = null
  let resolvedPath: string | null = null

  for (const loc of locations) {
    try {
      raw = fs.readFileSync(loc, "utf-8")
      resolvedPath = loc
      break
    } catch {}
  }

  if (!raw) {
    throw new Error(`[@ai-whisperers/content] Cannot find file: ${filePath}. Tried: ${locations.join(", ")}`)
  }

  const data = JSON.parse(raw) as T
  return { data, cache: { data, timestamp: now, ttlMs: cache?.ttlMs || 60000 } }
}

/**
 * Load JSON at build time (SSG/SSR).
 */
export function loadContent<T = any>(filePath: string): T {
  return loadJSON<T>(filePath).data
}
