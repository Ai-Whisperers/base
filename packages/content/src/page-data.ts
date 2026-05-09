import type { SiteConfig, PageConfig, ImageManifest, LoadedContent } from "./types"
import { loadJSON } from "./loader"

export interface PageDataOptions {
  contentPath?: string
  pagesDir?: string
  imagesPath?: string
  siteConfigPath?: string
  extraData?: Record<string, any>
}

export interface PageDataResult {
  content: Record<string, any>
  pageConfig: PageConfig
  images: ImageManifest
  siteConfig: SiteConfig
  extras: Record<string, any>
}

/**
 * Load all page data: content JSON + page config + images.json + site.json
 * This is the main orchestration function for any page.
 */
export function loadPageData(
  locale: string,
  slug: string,
  options: PageDataOptions = {}
): PageDataResult {
  const {
    contentPath = `content/${locale}.json`,
    pagesDir = `nexa-pages`,
    imagesPath = `images.json`,
    siteConfigPath = `site.json`,
    extraData = {},
  } = options

  // Load content JSON
  const { data: content } = loadJSON<Record<string, any>>(contentPath)

  // Load image manifest
  let images: ImageManifest = {}
  try {
    const result = loadJSON<ImageManifest>(imagesPath)
    images = result.data
  } catch {}

  // Load site config
  let siteConfig: SiteConfig = {} as SiteConfig
  try {
    const result = loadJSON<SiteConfig>(siteConfigPath)
    siteConfig = result.data
  } catch {}

  // Load page config
  let pageConfig: PageConfig = { slug }
  try {
    const result = loadJSON<PageConfig>(`${pagesDir}/${slug}.json`)
    pageConfig = result.data
  } catch {}

  return {
    content,
    pageConfig,
    images,
    siteConfig,
    extras: extraData,
  }
}
