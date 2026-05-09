// ─── Auth Context & Types ───────────────────────────────────────────────────
export { createAuthContext } from "./auth-context"
export type { AuthContextType, UserProfile, Address } from "./auth-context"

// ─── Auth Config Type ──────────────────────────────────────────────────────
export interface AuthConfig {
  supabaseUrl: string
  supabaseAnonKey: string
  storagePrefix: string
}

// ─── Storage Keys ───────────────────────────────────────────────────────────
export { createStorageKeys } from "./storage-keys"
