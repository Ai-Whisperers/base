// next.config for Next.js 15+ client sites — security headers + standalone output
// Copy this to your project root and customize

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  // ─── Image Optimization ─────────────────────────────────────────────────
  images: {
    remotePatterns: [
      // Add your image domains:
      // { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // ─── Immutable caching for content images ─────────────────────────────
    deviceSizes: [640, 768, 1024, 1280, 1536],
    formats: ["image/webp"],
    minimumCacheTTL: 31536000,
  },
  // ─── Security Headers ──────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      // ─── Static assets: immutable cache ─────────────────────────────────
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ]
  },
  // ─── Experimental: CSS optimization with Lightning CSS ──────────────────
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@ai-whisperers/ui",
      "@ai-whisperers/sections",
    ],
  },
}

module.exports = nextConfig
