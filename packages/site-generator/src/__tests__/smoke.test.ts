import { describe, it, expect } from "vitest"
import { generateSiteStructure, generateSectionContent } from "../index"

describe("site-generator", () => {
  it("generates site structure with correct files", () => {
    const files = generateSiteStructure({
      businessType: "restaurant",
      vertical: "food-beverage",
      name: "Test Restaurant",
      domain: "test.com",
    })
    expect(files.length).toBeGreaterThan(0)
    expect(files.every(f => typeof f.path === "string" && typeof f.content === "string")).toBe(true)
    const pkg = files.find(f => f.path === "package.json")
    expect(pkg).toBeDefined()
    expect(pkg!.content).toContain("@ai-whisperers")
  })

  it("generates section content for known types", () => {
    expect(generateSectionContent("hero", { headline: "Test" })).toContain("Test")
    expect(generateSectionContent("services", { services: [{ name: "S1", description: "D1" }] })).toContain("S1")
    expect(generateSectionContent("contact", { whatsapp: "595991" })).toContain("595991")
  })

  it("returns empty for unknown section type", () => {
    expect(generateSectionContent("unknown", {})).toBe("")
  })
})
