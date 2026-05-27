const isDev = typeof process !== 'undefined' && process.env?.NODE_ENV === 'development'

const levels = ['debug', 'info', 'warn', 'error'] as const
type Level = typeof levels[number]

function log(level: Level, message: string, meta?: Record<string, unknown>) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  }
  if (isDev) {
    const fn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log
    fn(`[${level.toUpperCase()}] ${message}`, meta ? meta : '')
  } else {
    const fn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log
    fn(JSON.stringify(entry))
  }
}

export const logger = {
  debug: (msg: string, meta?: Record<string, unknown>) => log('debug', msg, meta),
  info: (msg: string, meta?: Record<string, unknown>) => log('info', msg, meta),
  warn: (msg: string, meta?: Record<string, unknown>) => log('warn', msg, meta),
  error: (msg: string, meta?: Record<string, unknown>) => log('error', msg, meta),
}
