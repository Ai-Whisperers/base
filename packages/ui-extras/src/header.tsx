"use client"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"

export interface NavItem {
  href: string
  label: string
}

export function Header({
  navigation = [],
  logo,
}: {
  navigation?: NavItem[]
  logo?: string | null
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const navItems = navigation.length > 0 ? navigation : [
    { href: "/", label: "Inicio" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/servicios", label: "Servicios" },
    { href: "/contacto", label: "Contacto" },
  ]

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 text-gray-600" aria-label="Abrir menú">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            {logo || "Logo"}
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === item.href
                    ? "text-[var(--color-primary,#1B5E20)] bg-[var(--color-primary,#1B5E20)]/10"
                    : "text-gray-600 hover:text-[var(--color-primary,#1B5E20)] hover:bg-gray-50"
                }`}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="lg:hidden" />
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 left-0 bottom-0 w-72 bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 h-16 border-b">
              <span className="font-bold">{logo || "Menu"}</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 text-gray-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    pathname === item.href ? "text-[var(--color-primary,#1B5E20)] bg-gray-100" : "text-gray-600 hover:bg-gray-50"
                  }`}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
