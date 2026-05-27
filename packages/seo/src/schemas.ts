/**
 * Schema.org JSON-LD helpers for Next.js
 * All functions return plain objects to be rendered via <script type="application/ld+json">
 *
 * Usage:
 *   import { productSchema, breadcrumbSchema, organizationSchema } from "@ai-whisperers/seo"
 */

export interface SchemaOrgBase {
  "@context": "https://schema.org"
  "@type": string
}

// ─── Organization ──────────────────────────────────────────────────────────

export interface OrganizationSchemaInput {
  name: string
  url: string
  logo?: string
  description?: string
  address?: {
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
  contactPoint?: {
    telephone?: string
    email?: string
    contactType?: string
  }
  sameAs?: string[]
}

export function organizationSchema(data: OrganizationSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    url: data.url,
    ...(data.logo && { logo: data.logo }),
    ...(data.description && { description: data.description }),
    ...(data.address && { address: { "@type": "PostalAddress", ...data.address } }),
    ...(data.contactPoint && {
      contactPoint: [{ "@type": "ContactPoint", ...data.contactPoint }],
    }),
    ...(data.sameAs && data.sameAs.length && { sameAs: data.sameAs }),
  }
}

// ─── Professional Service ──────────────────────────────────────────────────

export function professionalServiceSchema(data: {
  name: string
  description: string
  url: string
  serviceType?: string
  providerName: string
  providerUrl: string
  areaServed?: string
  image?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: data.name,
    description: data.description,
    url: data.url,
    provider: {
      "@type": "Organization",
      name: data.providerName,
      url: data.providerUrl,
    },
    ...(data.serviceType && { serviceType: data.serviceType }),
    ...(data.areaServed && { areaServed: data.areaServed }),
    ...(data.image && { image: data.image }),
  }
}

// ─── Product ───────────────────────────────────────────────────────────────

export interface ProductSchemaInput {
  name: string
  description: string
  image: string | string[]
  sku?: string
  brand: string
  price: number
  currency: string
  availability?: "InStock" | "OutOfStock" | "PreOrder"
  url?: string
  category?: string
  review?: {
    ratingValue: number
    reviewCount: number
    bestRating?: number
  }
}

export function productSchema(data: ProductSchemaInput) {
  const images = Array.isArray(data.image) ? data.image : [data.image]
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.name,
    description: data.description,
    image: images,
    ...(data.sku && { sku: data.sku }),
    brand: { "@type": "Brand", name: data.brand },
    offers: {
      "@type": "Offer",
      price: data.price,
      priceCurrency: data.currency,
      ...(data.availability && { availability: `https://schema.org/${data.availability}` }),
      ...(data.url && { url: data.url }),
    },
    ...(data.category && { category: data.category }),
    ...(data.review && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: data.review.ratingValue,
        reviewCount: data.review.reviewCount,
        bestRating: data.review.bestRating || 5,
      },
    }),
  }
}

// ─── BreadcrumbList ────────────────────────────────────────────────────────

export function breadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.item,
    })),
  }
}

// ─── FAQPage ───────────────────────────────────────────────────────────────

export function faqSchema(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  }
}

// ─── Article ───────────────────────────────────────────────────────────────

export interface ArticleSchemaInput {
  headline: string
  description: string
  author: string
  datePublished: string
  dateModified?: string
  image?: string
  publisherName: string
  publisherLogo?: string
}

export function articleSchema(data: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    description: data.description,
    author: { "@type": "Person", name: data.author },
    datePublished: data.datePublished,
    ...(data.dateModified && { dateModified: data.dateModified }),
    ...(data.image && { image: data.image }),
    publisher: {
      "@type": "Organization",
      name: data.publisherName,
      ...(data.publisherLogo && { logo: { "@type": "ImageObject", url: data.publisherLogo } }),
    },
  }
}

// ─── LocalBusiness ─────────────────────────────────────────────────────────

export function localBusinessSchema(data: {
  name: string
  description: string
  url: string
  telephone: string
  address: { streetAddress: string; addressLocality: string; addressRegion: string; postalCode: string; addressCountry: string }
  openingHours?: { day: string; hours: string }[]
  image?: string
  priceRange?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: data.name,
    description: data.description,
    url: data.url,
    telephone: data.telephone,
    address: { "@type": "PostalAddress", ...data.address },
    ...(data.image && { image: data.image }),
    ...(data.priceRange && { priceRange: data.priceRange }),
    ...(data.openingHours && {
      openingHoursSpecification: data.openingHours.map((oh) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: oh.day,
        opens: oh.hours.split("-")[0]?.trim(),
        closes: oh.hours.split("-")[1]?.trim(),
      })),
    }),
  }
}

// ─── WebSite (for site-wide search) ────────────────────────────────────────

export function websiteSchema(data: { name: string; url: string; description?: string; searchUrl?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: data.name,
    url: data.url,
    ...(data.description && { description: data.description }),
    ...(data.searchUrl && {
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: data.searchUrl,
        },
        "query-input": "required name=search_term_string",
      },
    }),
  }
}

// ─── Person ─────────────────────────────────────────────────────────────────

export function personSchema(person: {
  name: string
  givenName?: string
  familyName?: string
  jobTitle?: string
  description?: string
  image?: string
  url?: string
  sameAs?: string[]
  email?: string
  telephone?: string
  worksFor?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    ...person,
  }
}

/**
 * Render JSON-LD as a React-compatible script tag HTML string
 */
export function renderJsonLd(data: Record<string, any>): string {
  return JSON.stringify(data, null, process.env.NODE_ENV === "development" ? 2 : undefined)
}
