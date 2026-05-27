export function requireEnv(key: string): string {
  const val = process.env[key]
  if (!val) throw new Error(`Missing required env var: ${key}`)
  return val
}

export function optionalEnv(key: string, fallback: string): string {
  return process.env[key] || fallback
}

export function boolEnv(key: string): boolean {
  return process.env[key] === 'true' || process.env[key] === '1'
}

export function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || `http://localhost:${process.env.PORT || '3000'}`
}

export const env = {
  supabaseUrl: () => requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: () => requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  supabaseServiceRole: () => optionalEnv('SUPABASE_SERVICE_ROLE_KEY', ''),
  siteUrl: () => getAppUrl(),
  nodeEnv: () => process.env.NODE_ENV || 'development',
  isDev: () => process.env.NODE_ENV === 'development',
  isProd: () => process.env.NODE_ENV === 'production',
  whatsappPhone: () => optionalEnv('NEXT_PUBLIC_WHATSAPP', ''),
  bancardPublicKey: () => optionalEnv('BANCARD_PUBLIC_KEY', ''),
  bancardPrivateKey: () => optionalEnv('BANCARD_PRIVATE_KEY', ''),
  pagoparPublicKey: () => optionalEnv('PAGOPAR_PUBLIC_KEY', ''),
  pagoparPrivateKey: () => optionalEnv('PAGOPAR_PRIVATE_KEY', ''),
  evolutionApiUrl: () => optionalEnv('EVOLUTION_API_URL', 'https://evolution.sunstein.cloud'),
  evolutionApiKey: () => optionalEnv('EVOLUTION_API_KEY', ''),
  evolutionInstance: () => optionalEnv('EVOLUTION_INSTANCE', 'hermes-whatsapp'),
}
