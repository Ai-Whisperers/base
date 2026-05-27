const store = new Map<string, { count: number; resetAt: number }>()

export interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

export function rateLimit(key: string, config: RateLimitConfig = { maxRequests: 10, windowMs: 60000 }) {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + config.windowMs })
    return { allowed: true, remaining: config.maxRequests - 1, resetAt: now + config.windowMs }
  }

  if (entry.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { allowed: true, remaining: config.maxRequests - entry.count, resetAt: entry.resetAt }
}

export function rateLimitMiddleware(config?: RateLimitConfig) {
  return async (request: Request, next: () => Promise<Response>): Promise<Response> => {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const result = rateLimit(ip, config)
    if (!result.allowed) {
      return new Response(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', 'Retry-After': String(Math.ceil((result.resetAt - Date.now()) / 1000)) },
      })
    }
    return next()
  }
}
