"use client"
import Link from "next/link"

interface FooterColumn {
  title: string
  links: { href: string; label: string }[]
}

interface SocialLink {
  name: string
  url: string
  icon: string
}

const socialPaths: Record<string, string> = {
  instagram: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 5A3.6 3.6 0 0 0 4 10.6v2.8A3.6 3.6 0 0 0 7.6 17h2.8A3.6 3.6 0 0 0 14 13.4v-2.8A3.6 3.6 0 0 0 10.4 7H7.6Zm-.6 2a1.6 1.6 0 0 1 1.6-1.6h2.8A1.6 1.6 0 0 1 13 9v2.8a1.6 1.6 0 0 1-1.6 1.6H8.6A1.6 1.6 0 0 1 7 11.8V9Zm7.5 6.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
  facebook: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2Z",
  tiktok: "M9 12a4 4 0 1 0 4 4V2h3.5A6.5 6.5 0 0 0 10 8.5V16a4 4 0 0 1-1-4Z",
  youtube: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58Z M9.75 15.02V8.98l5.56 3.02-5.56 3.02Z",
  whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z",
}

export function Footer({
  data,
}: {
  data?: {
    columns?: FooterColumn[]
    social?: SocialLink[]
    copyright?: string
    businessName?: string
  }
}) {
  if (!data) return null
  const { columns = [], social = [], copyright, businessName } = data

  return (
    <footer className="bg-gray-900 py-12 text-gray-300">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {columns.map((col, i) => (
            <div key={i}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">{col.title}</h4>
              <div className="flex flex-col gap-2 text-sm">
                {(col.links || []).map((lnk, j) => (
                  <Link key={j} href={lnk.href} className="text-gray-400 hover:text-white transition-colors">{lnk.label}</Link>
                ))}
              </div>
            </div>
          ))}
          {social.length > 0 && (
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Seguinos</h4>
              <div className="flex gap-3">
                {social.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all hover:bg-gray-700 hover:text-white"
                    aria-label={s.name}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d={socialPaths[s.icon] || ""} /></svg>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
          {copyright || `© ${new Date().getFullYear()} ${businessName || ''}. Todos los derechos reservados.`}
        </div>
      </div>
    </footer>
  )
}
