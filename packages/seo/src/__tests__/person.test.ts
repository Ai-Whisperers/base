import { describe, it, expect } from "vitest"
import { personSchema } from "../schemas"

describe("personSchema", () => {
  it("generates Person JSON-LD", () => {
    const schema = personSchema({ name: "Test Person" })
    expect(schema["@context"]).toBe("https://schema.org")
    expect(schema["@type"]).toBe("Person")
    expect(schema.name).toBe("Test Person")
  })

  it("preserves optional fields", () => {
    const schema = personSchema({
      name: "Test",
      jobTitle: "Dev",
      email: "test@test.com",
      sameAs: ["https://twitter.com/test"],
    })
    expect(schema.jobTitle).toBe("Dev")
    expect(schema.sameAs).toContain("https://twitter.com/test")
  })
})
