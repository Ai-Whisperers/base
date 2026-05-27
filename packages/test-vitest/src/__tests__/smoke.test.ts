import { describe, it, expect } from "vitest"
import { createVitestConfig } from "../config"

describe("test-vitest", () => {
  it("exports createVitestConfig function", () => {
    expect(typeof createVitestConfig).toBe("function")
  })

  it("returns config with test and plugins", () => {
    const config = createVitestConfig()
    expect(config).toHaveProperty("test")
    expect(config).toHaveProperty("plugins")
  })
})
