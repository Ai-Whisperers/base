#!/bin/bash
# Ai-Whisperers: `new-client` — Scaffold a new client site repo
# Usage: new-client <client-name> [--ecommerce]
# Example: new-client nexa-paraguay

set -euo pipefail

CLIENT_NAME="${1:-}"
TYPE="${2:-professional}"

if [[ -z "$CLIENT_NAME" ]]; then
  echo "❌ Usage: new-client <client-name> [--ecommerce]"
  echo "   Example: new-client nexa-paraguay"
  exit 1
fi

if [[ "$2" == "--ecommerce" ]]; then
  TYPE="ecommerce"
fi

BASE_DIR="/root/ai-whisperers-base"
TARGET="/root/$CLIENT_NAME"

if [[ -d "$TARGET" ]]; then
  echo "❌ Directory $TARGET already exists"
  exit 1
fi

echo "🚀 Creating client: $CLIENT_NAME ($TYPE)"

mkdir -p "$TARGET"
cd "$TARGET"

# ─── package.json ──────────────────────────────────────────────────────────
if [[ "$TYPE" == "ecommerce" ]]; then
  cat > package.json <<EOF
{
  "name": "$CLIENT_NAME",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@ai-whisperers/ui": "^0.4.1",
    "@ai-whisperers/ui-extras": "^0.3.0",
    "@ai-whisperers/theme": "^0.3.0",
    "@ai-whisperers/auth": "^0.2.1",
    "@ai-whisperers/seo": "^0.2.1",
    "@ai-whisperers/i18n": "^0.2.1",
    "@ai-whisperers/whatsapp": "^0.3.0",
    "@ai-whisperers/whatsapp-ai": "^0.2.0",
    "@ai-whisperers/sections": "^0.2.0",
    "@ai-whisperers/content": "^0.3.0",
    "@ai-whisperers/commerce": "^0.2.1",
    "@ai-whisperers/product": "^0.2.0",
    "@ai-whisperers/checkout": "^0.2.0",
    "@ai-whisperers/catalog": "^2.0.0",
    "@ai-whisperers/payments": "^0.2.0",
    "@ai-whisperers/commerce-b2b": "^0.2.0",
    "@ai-whisperers/loyalty": "^0.2.0",
    "@ai-whisperers/abandoned-cart": "^0.2.0",
    "@ai-whisperers/admin": "^0.3.1",
    "@ai-whisperers/supabase": "^0.2.0",
    "@ai-whisperers/currency": "^0.2.0",
    "@ai-whisperers/hooks": "^0.2.0",
    "@ai-whisperers/analytics": "^0.2.0",
    "@ai-whisperers/env": "^0.2.0",
    "@ai-whisperers/logger": "^0.2.0",
    "@ai-whisperers/middleware": "^0.2.0",
    "@ai-whisperers/rate-limit": "^0.2.0",
    "@ai-whisperers/compliance": "^0.2.0",
    "@ai-whisperers/business-registry": "^0.2.0",
    "@ai-whisperers/api-helpers": "^0.2.0",
    "@ai-whisperers/client-kit": "^0.2.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0"
  },
  "devDependencies": {
    "typescript": "^5.8.0"
  }
}
EOF
else
  cat > package.json <<EOF
{
  "name": "$CLIENT_NAME",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@ai-whisperers/ui": "^0.4.1",
    "@ai-whisperers/sections": "^0.2.0",
    "@ai-whisperers/content": "^0.3.0",
    "@ai-whisperers/seo": "^0.2.1",
    "@ai-whisperers/theme": "^0.3.0",
    "@ai-whisperers/whatsapp": "^0.3.0",
    "@ai-whisperers/i18n": "^0.2.1",
    "@ai-whisperers/currency": "^0.2.0",
    "@ai-whisperers/hooks": "^0.2.0",
    "@ai-whisperers/analytics": "^0.2.0",
    "@ai-whisperers/env": "^0.2.0",
    "@ai-whisperers/logger": "^0.2.0",
    "@ai-whisperers/compliance": "^0.2.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0"
  },
  "devDependencies": {
    "typescript": "^5.8.0"
  }
}
EOF
fi

# ─── Core Directories ──────────────────────────────────────────────────────
if [[ "$TYPE" == "ecommerce" ]]; then
  mkdir -p app content components lib public/images .github/workflows
else
  mkdir -p app content components lib public/images
fi

# ─── App Layout ────────────────────────────────────────────────────────────
if [[ "$TYPE" == "ecommerce" ]]; then
  cat > app/layout.tsx <<'LAYOUT'
import type { Metadata } from "next"
import { Header } from "@ai-whisperers/ui-extras/header"
import { Footer } from "@ai-whisperers/ui-extras/footer"
import { WhatsAppFloat } from "@ai-whisperers/whatsapp/whatsapp-float"
import { CookieConsent } from "@ai-whisperers/seo/cookie-consent"
import { LoadingBar } from "@ai-whisperers/ui-extras/loading-bar"
import { AnalyticsProvider } from "@ai-whisperers/analytics"
import content from "@/content/es.json"
import "./globals.css"

export const metadata: Metadata = {
  title: { template: `%s | ${content.site.name}`, default: content.site.name },
  description: content.site.description,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AnalyticsProvider />
        <LoadingBar />
        <Header logo={content.site.name} navigation={content.navigation?.links || []} />
        <main>{children}</main>
        <Footer data={content.footer} />
        <WhatsAppFloat phone={content.site.whatsapp} />
        <CookieConsent />
      </body>
    </html>
  )
}
LAYOUT
else
  cat > app/layout.tsx <<'LAYOUT'
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: { template: "%s | My Client", default: "My Client" },
  description: "Description",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
LAYOUT
fi

# ─── globals.css ───────────────────────────────────────────────────────────
cat > app/globals.css <<'CSS'
@import "tailwindcss";

@theme {
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  --color-accent: #f59e0b;
  --color-bg: #ffffff;
  --color-bg-alt: #f9fafb;
  --color-text: #111827;
  --color-text-muted: #6b7280;
  --color-success: #16a34a;
  --color-warning: #d97706;
  --color-error: #dc2626;
}

body {
  font-family: "Inter", system-ui, sans-serif;
}
CSS

# ─── Homepage ──────────────────────────────────────────────────────────────
if [[ "$TYPE" == "ecommerce" ]]; then
  cat > app/page.tsx <<'PAGE'
import { HeroSection } from "@ai-whisperers/sections"
import content from "@/content/es.json"

export default function Home() {
  return (
    <HeroSection
      data={{
        headline: content.home.hero.headline,
        subheadline: content.home.hero.subheadline,
        primaryCta: content.home.hero.cta,
      }}
    />
  )
}
PAGE
else
  cat > app/page.tsx <<'PAGE'
import { HeroSection, StatsSection, ServicesSection, CtaBanner } from "@ai-whisperers/sections"

export default function Home() {
  return (
    <>
      <HeroSection data={{ headline: "Welcome", subheadline: "Your site is ready.", primaryCta: { text: "Get Started", href: "#" } }} />
      <StatsSection data={[{ value: "100+", label: "Clients" }]} />
      <CtaBanner data={{ headline: "Ready?", cta: { text: "Contact Us", href: "#" } }} />
    </>
  )
}
PAGE
fi

# ─── Content ───────────────────────────────────────────────────────────────
if [[ "$TYPE" == "ecommerce" ]]; then
  cat > content/es.json <<'EOF'
{
  "site": {
    "name": "CLIENT_NAME",
    "tagline": "Tagline",
    "description": "Description",
    "whatsapp": "+595 XXX XXX XXX",
    "email": "info@CLIENT.paragu-ai.com",
    "domain": "CLIENT.paragu-ai.com"
  },
  "navigation": {
    "links": [
      { "label": "Inicio", "href": "/" },
      { "label": "Nosotros", "href": "/nosotros" },
      { "label": "Servicios", "href": "/servicios" },
      { "label": "Contacto", "href": "/contacto" }
    ]
  },
  "footer": {
    "copyright": "© 2026 CLIENT_NAME. Todos los derechos reservados.",
    "links": [
      { "label": "Privacidad", "href": "/privacidad" },
      { "label": "Términos", "href": "/terminos" }
    ]
  },
  "home": {
    "hero": {
      "headline": "Bienvenido a CLIENT_NAME",
      "subheadline": "Tu mejor opción en Paraguay",
      "cta": { "text": "Conócenos", "href": "/nosotros" }
    }
  }
}
EOF

  cat > content/site.json <<'EOF'
{
  "domain": "CLIENT.paragu-ai.com",
  "name": "CLIENT_NAME",
  "locales": ["es"],
  "currency": "PYG",
  "locale": "es-PY",
  "timezone": "America/Asuncion",
  "delivery": {
    "enabled": false,
    "freeThresholdGs": 300000
  }
}
EOF
else
  cat > content/es.json <<'EOF'
{
  "site": { "name": "My Client", "tagline": "Your partner" },
  "navigation": { "links": [{ "label": "Inicio", "href": "/" }] },
  "footer": {}
}
EOF

  cat > content/site.json <<'EOF'
{ "domain": "client.paragu-ai.com", "name": "My Client", "locales": ["es"] }
EOF
fi

cat > content/tokens.json <<'EOF'
{ "colors": { "primary": "#2563eb", "accent": "#f59e0b" } }
EOF

# ─── Docker ────────────────────────────────────────────────────────────────
cp "$BASE_DIR/packages/deploy/templates/Dockerfile" "$TARGET/Dockerfile"
cp "$BASE_DIR/packages/deploy/templates/docker-compose.yml" "$TARGET/docker-compose.yml"
cp "$BASE_DIR/packages/deploy/templates/dockerignore" "$TARGET/.dockerignore"

# ─── Next.js Config ────────────────────────────────────────────────────────
cp "$BASE_DIR/packages/deploy/templates/next.config.js" "$TARGET/next.config.js"
cp "$BASE_DIR/packages/deploy/templates/env.example" "$TARGET/.env.example"

# ─── SEO files ─────────────────────────────────────────────────────────────
cat > app/robots.ts <<'ROBOTS'
import type { MetadataRoute } from "next"
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://client.paragu-ai.com/sitemap.xml" }
}
ROBOTS

cat > app/sitemap.ts <<'SITEMAP'
import type { MetadataRoute } from "next"
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://client.paragu-ai.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 }]
}
SITEMAP

# ─── Error pages ───────────────────────────────────────────────────────────
cat > app/not-found.tsx <<'NF'
import Link from "next/link"
export default function NotFound() {
  return <div className="flex flex-col items-center justify-center min-h-screen gap-4"><h1 className="text-4xl font-bold">404</h1><p>Page not found</p><Link href="/" className="text-blue-600 hover:underline">Go home</Link></div>
}
NF

cat > app/error.tsx <<'ERR'
"use client"
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return <div className="flex flex-col items-center justify-center min-h-screen gap-4"><h1 className="text-2xl font-bold">Something went wrong</h1><button onClick={reset} className="text-blue-600 hover:underline">Try again</button></div>
}
ERR

# ─── Git ───────────────────────────────────────────────────────────────────
cat > .gitignore <<'GI'
node_modules/
.next/
dist/
.env*
!.env.example
*.log
GI

# ─── Deploy script ─────────────────────────────────────────────────────────
cp "$BASE_DIR/packages/deploy/scripts/deploy.sh" "$TARGET/deploy.sh"
chmod +x "$TARGET/deploy.sh"

# ─── CI/CD ─────────────────────────────────────────────────────────────────
if [[ "$TYPE" == "ecommerce" ]]; then
  cat > .github/workflows/ci.yml <<'CI'
name: CI
on: [push]
jobs:
  ci:
    uses: Ai-Whisperers/ci-cd/.github/workflows/ci-nextjs.yml@main
    with:
      node-version: "20"
CI

  cat > .github/workflows/deploy.yml <<'DEPLOY'
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    uses: Ai-Whisperers/ci-cd/.github/workflows/deploy-vps.yml@main
    with:
      site-name: "CLIENT_NAME"
    secrets: inherit
DEPLOY
fi

# ─── Summary ───────────────────────────────────────────────────────────────
echo ""
echo "✅ Client '$CLIENT_NAME' created at: $TARGET"
echo ""
echo "   Next steps:"
echo "   1. cd $CLIENT_NAME && npm install"
echo "   2. Edit content/site.json with client info"
echo "   3. Edit content/es.json with content"
echo "   4. Update app/sitemap.ts with client domain"
echo "   5. Update docker-compose.yml labels with client domain"
echo "   6. npm run dev"
echo ""
