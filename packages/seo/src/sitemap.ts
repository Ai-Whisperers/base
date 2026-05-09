/**
 * Sitemap generator helper for Next.js App Router
 * Usage: import { generateSitemap } from "@ai-whisperers/seo"
 */

export interface SitemapEntry {
  url: string
  lastModified?: Date | string
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: number
}

export interface SitemapOptions {
  baseUrl: string
  pages: (string | SitemapEntry)[]
  locales?: string[]
  defaultLocale?: string
  /**
   * For multi-locale sites, generate an alternates object for hreflang.
   */
  generateAlternates?: boolean
}

/**
 * Generate a sitemap array for Next.js MetadataRoute.Sitemap
 * Supports single-locale and multi-locale sites.
 */
export function generateSitemap(options: SitemapOptions): SitemapEntry[] {
  const { baseUrl, pages, locales, defaultLocale, generateAlternates = false } = options

  const entries: SitemapEntry[] = []

  for (const page of pages) {
    const entry: SitemapEntry = typeof page === "string" ? { url: page } : page

    if (locales && locales.length > 0 && generateAlternates) {
      // For multi-locale sites, generate one entry per locale
      for (const locale of locales) {
        const localePath = locale === defaultLocale ? entry.url : `/${locale}${entry.url}`
        entries.push({
          url: `${baseUrl}${localePath}`,
          lastModified: entry.lastModified,
          changeFrequency: entry.changeFrequency,
          priority: entry.priority,
        })
      }
    } else {
      entries.push({
        url: `${baseUrl}${entry.url.startsWith("/") ? "" : "/"}${entry.url}`,
        lastModified: entry.lastModified,
        changeFrequency: entry.changeFrequency,
        priority: entry.priority,
      })
    }
  }

  return entries
}

/**
 * Slugify a string for URL-safe paths
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
