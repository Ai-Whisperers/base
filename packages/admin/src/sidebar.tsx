"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, ShoppingBag, Users, Package, Tags,
  BarChart3, Star, Percent, Briefcase, ShoppingCart,
  RotateCcw, Gift, UserCheck, FileText, Image,
  Newspaper, MessageSquare, Settings, MapPin,
  Shield, CreditCard, MessageCircle, Mail,
  Activity, Bell, AlertTriangle, Layers,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard, ShoppingBag, Users, Package, Tags,
  BarChart3, Star, Percent, Briefcase, ShoppingCart,
  RotateCcw, Gift, UserCheck, FileText, Image,
  Newspaper, MessageSquare, Settings, MapPin,
  Shield, CreditCard, MessageCircle, Mail,
  Activity, Bell, AlertTriangle, Layers,
}

interface SidebarItem { label: string; href: string; icon: string; roles: string[]; badge?: string | number }

export const NAV_SECTIONS: { title: string; items: SidebarItem[] }[] = [
  {
    title: "Gestión",
    items: [
      { label: "Dashboard", href: "/admin", icon: "LayoutDashboard", roles: ["viewer", "support", "editor", "admin", "superadmin"] },
      { label: "Pedidos", href: "/admin/pedidos", icon: "ShoppingBag", roles: ["support", "editor", "admin", "superadmin"] },
      { label: "Productos", href: "/admin/productos", icon: "Package", roles: ["editor", "admin", "superadmin"] },
      { label: "Categorías", href: "/admin/categorias", icon: "Tags", roles: ["editor", "admin", "superadmin"] },
      { label: "Clientes", href: "/admin/clientes", icon: "Users", roles: ["support", "admin", "superadmin"] },
      { label: "Stock", href: "/admin/stock", icon: "Layers", roles: ["editor", "admin", "superadmin"] },
      { label: "Alertas de Stock", href: "/admin/stock/alertas", icon: "AlertTriangle", roles: ["editor", "admin", "superadmin"] },
    ],
  },
  {
    title: "Ventas",
    items: [
      { label: "B2B", href: "/admin/b2b", icon: "Briefcase", roles: ["admin", "superadmin"] },
      { label: "Promos", href: "/admin/promos", icon: "Percent", roles: ["admin", "superadmin"] },
      { label: "Cupones", href: "/admin/cupones", icon: "Gift", roles: ["admin", "superadmin"] },
      { label: "Fidelidad", href: "/admin/fidelidad", icon: "Star", roles: ["admin", "superadmin"] },
      { label: "Carritos Abandonados", href: "/admin/carritos", icon: "ShoppingCart", roles: ["editor", "admin", "superadmin"] },
      { label: "Devoluciones", href: "/admin/devoluciones", icon: "RotateCcw", roles: ["support", "admin", "superadmin"] },
    ],
  },
  {
    title: "Contenido",
    items: [
      { label: "Páginas", href: "/admin/paginas", icon: "FileText", roles: ["editor", "admin", "superadmin"] },
      { label: "Blog", href: "/admin/blog", icon: "Newspaper", roles: ["editor", "admin", "superadmin"] },
      { label: "Publicaciones", href: "/admin/publicaciones", icon: "MessageSquare", roles: ["editor", "admin", "superadmin"] },
      { label: "Fotos", href: "/admin/fotos", icon: "Image", roles: ["editor", "admin", "superadmin"] },
      { label: "Reseñas", href: "/admin/resenas", icon: "Star", roles: ["editor", "admin", "superadmin"] },
    ],
  },
  {
    title: "Configuración",
    items: [
      { label: "Tema", href: "/admin/tema", icon: "Palette", roles: ["admin", "superadmin"] },
      { label: "Zonas de Delivery", href: "/admin/delivery", icon: "MapPin", roles: ["admin", "superadmin"] },
      { label: "Staff", href: "/admin/staff", icon: "Shield", roles: ["superadmin"] },
      { label: "Facturación", href: "/admin/facturacion", icon: "CreditCard", roles: ["admin", "superadmin"] },
      { label: "WhatsApp", href: "/admin/whatsapp", icon: "MessageCircle", roles: ["admin", "superadmin"] },
      { label: "Suscriptores", href: "/admin/suscriptores", icon: "Mail", roles: ["viewer", "support", "editor", "admin", "superadmin"] },
      { label: "Actividad", href: "/admin/actividad", icon: "Activity", roles: ["admin", "superadmin"] },
    ],
  },
]

// Re-export Palette since lucide-react has it
const Palette = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
)

export function AdminSidebar({ onNavigate, role }: { onNavigate?: () => void; role?: string }) {
  const pathname = usePathname()

  const sections = NAV_SECTIONS.map(section => ({
    ...section,
    items: section.items.filter(item => !item.roles || !role || item.roles.includes(role as any)),
  })).filter(s => s.items.length > 0)

  return (
    <aside className="w-64 bg-[#0f0f10] border-r border-zinc-800/60 min-h-screen flex flex-col">
      <div className="p-5 border-b border-zinc-800/60">
        <Link href="/admin" onClick={onNavigate} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">Ai-Whisperers</p>
            <p className="text-[10px] text-zinc-500 font-medium">Administración</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-6">
        {sections.map(section => (
          <div key={section.title}>
            <p className="px-3 mb-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.12em]">{section.title}</p>
            <div className="space-y-0.5">
              {section.items.map(item => {
                const Icon = iconMap[item.icon]
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400 shadow-sm shadow-emerald-500/5"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
                    }`}
                  >
                    {Icon && <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-emerald-400" : ""}`} />}
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                        {item.badge}
                      </span>
                    )}
                    {isActive && <div className="w-1 h-4 rounded-full bg-emerald-400" />}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-zinc-800/60">
        <Link href="/" onClick={onNavigate}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40 transition-all">
          <LayoutDashboard className="w-3.5 h-3.5" />
          Volver al sitio
        </Link>
      </div>
    </aside>
  )
}
