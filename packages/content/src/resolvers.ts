// ── Generic Content Resolvers ──
// Helpers for resolving content paths, image references, and config values.
// Designed to work with any JSON-driven content structure.

/**
 * Resolve a content path from a content object.
 * Supports dot-notation keys: "hero.headline" → content.hero.headline
 * Falls back to direct key access, then null.
 */
export function resolveContent(
  content: Record<string, any> | null | undefined,
  key: string
): any {
  if (!content || !key) return null
  let sc = content[key]
  if (!sc && key.includes("."))
    sc = key.split(".").reduce((o: any, k: string) => o?.[k], content)
  return sc
}

/**
 * Resolve an image URL from an image manifest and a reference string.
 *
 * - "@img:category.name" → image manifest path lookup
 * - "@src:category.name" → same format, different prefix
 * - plain URL string → returned as-is
 */
export function resolveImage(
  images: Record<string, any> | null | undefined,
  ref: string
): string {
  if (!ref || !images) return ""
  if (ref.startsWith("@img:") || ref.startsWith("@src:")) {
    const key = ref.startsWith("@img:") ? ref.replace("@img:", "") : ref.replace("@src:", "")
    const parts = key.split(".")
    let obj: any = images
    for (const p of parts) {
      if (obj?.[p]) obj = obj[p]
      else return ""
    }
    return obj?.src || obj?.fallbackSrc || ""
  }
  return ref
}

/**
 * Resolve a config value with fallbacks and locale-awareness.
 * Tries: key → key_{locale} → defaultValue
 */
export function resolveConfig(
  obj: Record<string, any> | null | undefined,
  key: string,
  locale?: string,
  defaultValue?: string
): string {
  if (!obj) return defaultValue || ""
  return obj[`${key}_${locale}`] || obj[key] || defaultValue || ""
}

/**
 * Resolve a localized text field from a content block.
 * Tries: field_{locale} → field → ""
 */
export function localizedField(
  obj: Record<string, any> | null | undefined,
  field: string,
  locale?: string
): string {
  if (!obj) return ""
  return obj[`${field}_${locale}`] || obj[field] || ""
}
