"use client"
import { useState } from "react"
import { ShoppingBag, Filter, Eye, XCircle } from "lucide-react"
import { DataTable, type Column } from "../data-table"
import { Badge, FilterBar, SearchInput, SummaryBar } from "../ui"
import Link from "next/link"

const STATUS_OPTIONS = [
  { key: "todos", label: "Todos", icon: "📋" },
  { key: "pendiente", label: "Pendiente", icon: "🕐" },
  { key: "confirmado", label: "Confirmado", icon: "✅" },
  { key: "preparando", label: "Preparando", icon: "👨‍🍳" },
  { key: "enviado", label: "Enviado", icon: "🚚" },
  { key: "entregado", label: "Entregado", icon: "📦" },
  { key: "cancelado", label: "Cancelado", icon: "❌" },
]

interface Order {
  id: string
  created_at: string
  customer_name: string
  customer_phone?: string
  total: string
  status: string
  items?: any[]
  payment_method?: string
  note?: string
}

export function AdminOrders({
  orders: initialOrders,
  onStatusChange,
  onNoteSave,
}: {
  orders?: Order[]
  onStatusChange?: (id: string, status: string) => void
  onNoteSave?: (id: string, note: string) => void
}) {
  const [orders] = useState<Order[]>(initialOrders || [])
  const [filter, setFilter] = useState("todos")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const PER_PAGE = 20

  const filtered = orders.filter(o => {
    if (filter !== "todos" && o.status !== filter) return false
    if (search) {
      const q = search.toLowerCase()
      const items = o.items || []
      return o.id?.toLowerCase().includes(q)
        || items.some((i: any) => (i.name || "").toLowerCase().includes(q))
        || (o.customer_name || "").toLowerCase().includes(q)
    }
    return true
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const counts: Record<string, number> = {}
  STATUS_OPTIONS.slice(1).forEach(s => { counts[s.key] = orders.filter(o => o.status === s.key).length })

  const totalRevenue = orders.reduce((s, o) => {
    const n = parseInt((o.total || "0").replace(/[^0-9]/g, ""), 10) || 0
    return s + n
  }, 0)

  const columns: Column<Order>[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      render: (o) => (
        <Link href={"/admin/pedidos/detalle?id=" + o.id} className="font-mono text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
          #{o.id?.slice(0, 8)}
        </Link>
      ),
    },
    {
      key: "created_at",
      label: "Fecha",
      sortable: true,
      render: (o) => (
        <span className="text-zinc-400 text-xs">
          {o.created_at ? new Date(o.created_at).toLocaleDateString("es", { day: "numeric", month: "short" }) : ""}
        </span>
      ),
    },
    {
      key: "customer_name",
      label: "Cliente",
      sortable: true,
      render: (o) => (
        <div>
          <span className="text-zinc-300">{o.customer_name || "Invitado"}</span>
          {o.customer_phone && <span className="block text-[10px] text-zinc-500">{o.customer_phone}</span>}
        </div>
      ),
    },
    {
      key: "total",
      label: "Total",
      sortable: true,
      render: (o) => <span className="font-semibold text-white">{o.total}</span>,
    },
    {
      key: "status",
      label: "Estado",
      sortable: true,
      render: (o) => (
        onStatusChange ? (
          <select
            value={o.status}
            onChange={(e) => onStatusChange(o.id, e.target.value)}
            className="rounded-lg border px-2.5 py-1 text-xs font-medium outline-none cursor-pointer bg-zinc-800 text-zinc-300 border-zinc-700/60 hover:brightness-110"
          >
            {STATUS_OPTIONS.slice(1).map(s => (
              <option key={s.key} value={s.key}>{s.icon} {s.label}</option>
            ))}
          </select>
        ) : (
          <Badge status={o.status}>{o.status}</Badge>
        )
      ),
    },
    {
      key: "items",
      label: "Artículos",
      render: (o) => <span className="text-zinc-500 text-xs">{(o.items?.length || 0)}</span>,
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Pedidos</h1>
      <p className="text-sm text-zinc-500 mb-6">{orders.length} pedidos totales</p>

      <SummaryBar
        items={[
          { label: "Total pedidos", value: String(orders.length) },
          { label: "Pendientes", value: String(counts.pendiente || 0), color: "text-yellow-400" },
          { label: "Confirmados", value: String(counts.confirmado || 0), color: "text-blue-400" },
          { label: "Enviados", value: String(counts.enviado || 0), color: "text-purple-400" },
          { label: "Ingresos", value: "Gs. " + (totalRevenue > 0 ? totalRevenue.toLocaleString("es-PY") : "0"), color: "text-emerald-400" },
        ]}
      />

      <div className="mb-6">
        <FilterBar options={STATUS_OPTIONS} active={filter} onChange={(k) => { setFilter(k); setPage(1) }} counts={{ ...counts, todos: orders.length }} />
      </div>

      <DataTable
        columns={columns}
        data={paged}
        page={page}
        totalPages={totalPages}
        total={filtered.length}
        onPageChange={setPage}
        search={search}
        onSearchChange={(v) => { setSearch(v); setPage(1) }}
        searchPlaceholder="Buscar por ID, producto, cliente..."
        rowActions={(o) => (
          <div className="inline-flex items-center gap-1">
            <Link
              href={"/admin/pedidos/detalle?id=" + o.id}
              className="rounded-lg p-1.5 text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
              title="Ver detalle"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        )}
      />
    </div>
  )
}
