/** @jsxImportSource react */
"use client"

import React, { JSX } from "react"
import {
  resolveContent, isSectionEnabled,
} from "./resolve-content"
import {
  SectionComponentProps, PageConfig,
} from "./types"
import { DEFAULT_SECTIONS } from "./registry"

export interface SectionsRendererProps {
  pageConfig?: PageConfig
  content?: Record<string, any>
  images?: Record<string, any>
  locale?: string
  sectionOverrides?: Record<string, React.ComponentType<SectionComponentProps>>
}

/**
 * Creates a SectionsRenderer component with header/footer injected as props.
 * Usage: Pass `header` and `footer` React components at render time.
 */
export function createSectionsRenderer(
  HeaderComponent?: React.ComponentType<{ navigation?: any; locale?: string }>,
  FooterComponent?: React.ComponentType<{ footer?: any }>
) {
  return function SectionsRenderer({
    pageConfig, content, images, locale,
    sectionOverrides,
  }: SectionsRendererProps) {
    const sections = pageConfig?.sections || []
    const mergedMap = sectionOverrides
      ? { ...DEFAULT_SECTIONS, ...sectionOverrides }
      : DEFAULT_SECTIONS

    return (
      <div className="font-inter text-text-primary">
        {content?.navigation && HeaderComponent && (
          <HeaderComponent navigation={content.navigation} locale={locale} />
        )}
        <main>
          {sections.map((section: any, idx: number) => {
            if (section.enabledWhen && !isSectionEnabled(section.enabledWhen, content)) return null
            const Comp = mergedMap[section.id]
            if (Comp) {
              const sectionData = resolveContent(content, section.content || section.id)
              return (
                <Comp
                  key={section.id || idx}
                  pageContent={sectionData || content}
                  data={sectionData}
                  images={images}
                  locale={locale}
                />
              )
            }
            return null
          })}
        </main>
        {content?.footer && FooterComponent && <FooterComponent footer={content.footer} />}
      </div>
    )
  }
}

export { resolveContent, isSectionEnabled }
