"use client"
import { useState } from "react"
import { Package, Pencil, Copy, Trash2, Plus, Download, FileSpreadsheet, Layers } from "lucide-react"
import { DataTable, type Column } from "../data-table"
import { Badge } from "../ui"
import { ImageUpload } from "../image-upload"

interface Product {
  id: string
  name: string
  price: string
  cost_price?: string
  b2b_price?: string
  stock: number
  stock_alert_threshold?: number
  category?: string
  subcategory?: string
  image_url?: string
  brand?: string
  status?: string
  variants?: string
}

function formatPrice(s: string) {
  const n = parseInt(s.replace(/[^0-9]/g, ""), 10)
  if (!n) return s
  return "Gs. " + n.toLocaleString("es-PY")
}

function calcMargin(price: string, cost: string) {
  const p = parseInt((price || "0").replace(/[^0-9]/g, ""), 10) || 0
  const c = parseInt((cost || "0").replace(/[^0-9]/g, ""), 10) || 0
  if (!p || !c) return null
  return Math.round(((p - c) / p) * 100)
}

export function AdminProducts({
  products,
  onSave,
  onDelete,
  onDuplicate,
}: {
  products?: Product[]
  onSave?: (product: Product) => Promise<void>
  onDelete?: (id: string) => Promise<void>
  onDuplicate?: (product: Product) => Promise<void>
}) {
  const [items] = useState<Product[]>(products || [])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [previewImg, setPreviewImg] = useState<string | null>(null)
  const PER_PAGE = 20

  const filtered = search
    ? items.filter(p =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.toLowerCase().includes(search.toLowerCase()) ||
        p.brand?.toLowerCase().includes(search.toLowerCase())
      )
    : items

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const columns: Column<Product>[] = [
    {
      key: "image",
      label: "Img",
      render: (p) => (
        p.image_url && !p.image_url.includes(".svg") ? (
          <img
            src={p.image_url}
            alt=""
            className="h-9 w-9 rounded-lg border border-zinc-700/40 object-cover cursor-pointer ring-1 ring-black/20 hover:ring-2 hover:ring-emerald-500/40 transition-all"
            onClick={() => setPreviewImg(p.image_url!)}
          />
        ) : (
          <div className="h-9 w-9 rounded-lg border border-zinc-700/40 bg-zinc-800/50 flex items-center justify-center">
            <Package className="w-4 h-4 text-zinc-600" />
          </div>
        )
      ),
    },
    {
      key: "name",
      label: "Nombre",
      sortable: true,
      render: (p) => (
        <div>
          <div className="font-medium text-white text-sm">{p.name || <span className="text-zinc-600 italic">Sin nombre</span>}</div>
          {p.brand && <div className="text-[11px] text-zinc-500 mt-0.5">{p.brand}</div>}
          {p.variants && (
            <div className="mt-1">
              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Layers className="w-3 h-3" />
                {Array.isArray(JSON.parse(p.variants)) ? JSON.parse(p.variants).length : "?"} vars.
              </span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "price",
      label: "Precio",
      sortable: true,
      render: (p) => (
        <div>
          <span className="font-semibold text-white text-sm">{p.price || <span className="text-zinc-600">—</span>}</span>
          {p.cost_price && (
            <span className="block text-[10px] text-zinc-500">
              Costo: {p.cost_price}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "stock",
      label: "Stock",
      sortable: true,
      render: (p) => (
        <span className={`inline-flex items-center gap-1 text-xs font-medium ${
          (p.stock || 0) > 10 ? "text-emerald-400" :
          (p.stock || 0) > 0 ? "text-amber-400" : "text-red-400"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${
            (p.stock || 0) > 10 ? "bg-emerald-400" :
            (p.stock || 0) > 0 ? "bg-amber-400" : "bg-red-400"
          }`} />
          {p.stock ?? 0}
        </span>
      ),
    },
    {
      key: "category",
      label: "Categoría",
      render: (p) => (
        <div className="flex flex-col gap-0.5">
          <span className="inline-block rounded-md bg-zinc-800/60 px-2 py-0.5 text-[11px] font-medium text-zinc-400">
            {p.category || <span className="text-zinc-600">—</span>}
          </span>
          {p.subcategory && (
            <span className="inline-block rounded-md bg-zinc-800/30 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
              {p.subcategory}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "margin",
      label: "Margen",
      render: (p) => {
        const m = calcMargin(p.price, p.cost_price || "")
        return m !== null ? (
          <span className={`text-xs font-medium ${m >= 30 ? "text-emerald-400" : m >= 10 ? "text-amber-400" : "text-red-400"}`}>
            {m}%
          </span>
        ) : <span className="text-zinc-600 text-xs">—</span>
      },
    },
    {
      key: "status",
      label: "Estado",
      sortable: true,
      render: (p) => <Badge status={p.status || "active"}>{p.status === "draft" ? "Borrador" : p.status === "archived" ? "Archivado" : "Activo"}</Badge>,
    },
  ]

  return (
    <div>
      {previewImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setPreviewImg(null)}>
          <img src={previewImg} alt="" className="max-h-[80vh] max-w-[80vw] rounded-2xl border border-zinc-700/60 shadow-2xl" />
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Productos</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{items.length} productos en total</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/60 px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-white hover:border-zinc-600 transition-all">
            <Download className="w-3.5 h-3.5" /> Exportar
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/60 px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-white hover:border-zinc-600 transition-all">
            <FileSpreadsheet className="w-3.5 h-3.5" /> Importar
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-all shadow-sm shadow-emerald-600/20">
            <Plus className="w-3.5 h-3.5" /> Nuevo producto
          </button>
        </div>
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
        searchPlaceholder="Buscar por nombre, categoría, marca..."
        rowActions={(p) => (
          <div className="inline-flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
            <button
              className="rounded-lg p-1.5 text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
              title="Editar"
            >
              <Pencil className="w-4 h-4" />
            </button>
            {onDuplicate && (
              <button
                onClick={() => onDuplicate(p)}
                className="rounded-lg p-1.5 text-zinc-500 hover:text-amber-400 hover:bg-amber-500/10 transition-all"
                title="Duplicar"
              >
                <Copy className="w-4 h-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(p.id)}
                className="rounded-lg p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      />
    </div>
  )
}
