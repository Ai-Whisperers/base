// ─── Types ──────────────────────────────────────────────────────────────────
export type { SectionComponentProps, SectionMap } from "./types"

// ─── Section Components ─────────────────────────────────────────────────────
export { HeroSection, PageHeroSection } from "./heroes"
export {
  TrustSection, ProgramsSection, ServicesSection,
  ProcessSection, ServiceDetailSection, PillarsSection,
  WhyCountrySection, FeaturesSection, RequirementsSection,
} from "./content-blocks"
export { FaqSection, FaqSearchSection, PrivacyAccordion } from "./accordions"
export {
  TeamSection, GlossarySection, ComparisonSection,
  GuidesSection, PressReleasesListSection, BlogSection,
} from "./lists-and-grids"
export { CtaBanner, BookingEmbedSection, ContactDetailsSection, NewsletterSection, WhatsappFloatSection } from "./cta-and-contact"
export { StorySection, GallerySection, TestimonialsSection } from "./story-and-media"
export { CaseStudySection } from "./case-studies"
export { IntakeWizardSection } from "./specialists"
export { StatsSection, HighlightSection, default as GenericSection } from "./common"
export { FeedbackSection } from "./feedback"
export { BookingFormSection } from "./booking-form"

// ─── Renderer ───────────────────────────────────────────────────────────────
export { createSectionsRenderer } from "./renderer"
export { DEFAULT_SECTIONS } from "./registry"
export type { SectionsRendererProps } from "./renderer"

// ─── Utilities ──────────────────────────────────────────────────────────────
export { resolveContent, resolveImage, resolveConfig, localizedField } from "./resolve-content"
