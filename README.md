# @ai-whisperers/base

Monorepo de Ai-Whisperers con packages npm compartidos. Clientes lo instalan como dependencia privada.

## Packages

| Package | Description |
|---------|-------------|
| `@ai-whisperers/ui` | shadcn/ui components (Button, Card, Dialog, DataTable, Badge, ChartCard, Toast) |
| `@ai-whisperers/theme` | Tailwind CSS preset, CSS variables, fonts |
| `@ai-whisperers/auth` | Supabase SSR auth (AuthProvider, middleware, admin guards) |
| `@ai-whisperers/commerce` | Cart, checkout, payment gateways (Bancard, Pagopar, PayPal, Stripe) |
| `@ai-whisperers/admin` | Admin layout, sidebar, image upload, data tables |
| `@ai-whisperers/whatsapp` | Evolution API client, WhatsApp float button |
| `@ai-whisperers/seo` | GA4 AnalyticsProvider, CookieConsent, tracking |
| `@ai-whisperers/i18n` | Language switcher, translator (ES/EN/GN) |

## How to install in a client project

### Option A: npm (requires GitHub Packages access)
```bash
# Setup .npmrc:
echo "@ai-whisperers:registry=https://npm.pkg.github.com/" >> .npmrc
# Login:
npm login --registry=https://npm.pkg.github.com/
# Install:
npm install @ai-whisperers/ui
```

### Option B: Direct GitHub dependency (recommended)
```bash
npm install github:Ai-Whisperers/base#v0.1.0
```

### Option C: Local file link (development)
```bash
npm install ../ai-whisperers-base/packages/ui
```

## Development

```bash
git clone https://github.com/Ai-Whisperers/base.git
cd base
npm install
npm run build
```

## Release workflow

Pushes to `main` auto-build and create GitHub releases with tags.
