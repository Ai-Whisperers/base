import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

export function createVitestConfig(options?: { extraSetup?: string }) {
  return defineConfig({
    plugins: [react()],
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: options?.extraSetup ? [options.extraSetup] : [],
      css: true,
    },
  })
}
