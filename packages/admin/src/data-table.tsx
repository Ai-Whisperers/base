"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Search, X } from "lucide-react"

export interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  className?: string
  render?: (item: T, index: number) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  emptyMessage?: string
  emptyDescription?: string
  emptyIcon?: React.ReactNode
  page?: number
  totalPages?: number
  total?: number
  onPageChange?: (page: number) => void
  search?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  sortKey?: string
  sortDir?: "asc" | "desc"
  onSort?: (key: string) => void
  rowActions?: (item: T, index: number) => React.ReactNode
  perPage?: number
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  emptyMessage = "No hay datos",
  emptyDescription,
  emptyIcon,
  page = 1,
  totalPages = 1,
  total = 0,
  onPageChange,
  search,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  sortKey,
  sortDir,
  onSort,
  rowActions,
  perPage = 20,
}: DataTableProps<T>) {
  const [localPage, setLocalPage] = useState(page)

  const currentPage = onPageChange ? page : localPage
  const goToPage = onPageChange || setLocalPage

  return (
    <div className="space-y-4">
      {onSearchChange && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            value={search || ""}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 pl-9 pr-9 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
          />
          {search && (
            <button onClick={() => onSearchChange("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-900/30">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800/60 bg-zinc-900/80">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 py-3 text-left text-[10px] font-semibold text-zinc-500 uppercase tracking-wider ${col.className || ""} ${col.sortable ? "cursor-pointer select-none hover:text-zinc-300" : ""}`}
                    onClick={() => col.sortable && onSort?.(col.key)}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {col.sortable && sortKey === col.key && (
                        sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                ))}
                {rowActions && <th className="px-4 py-3 text-right text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Acciones</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3">
                        <div className="h-4 w-full max-w-[120px] rounded bg-zinc-800" />
                      </td>
                    ))}
                    {rowActions && (
                      <td className="px-4 py-3"><div className="h-4 w-20 rounded bg-zinc-800 ml-auto" /></td>
                    )}
                  </tr>
                ))
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (rowActions ? 1 : 0)} className="px-6 py-16 text-center">
                    {emptyIcon || (
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center">
                        <Search className="w-5 h-5 text-zinc-600" />
                      </div>
                    )}
                    <p className="text-sm font-medium text-zinc-400">{emptyMessage}</p>
                    {emptyDescription && <p className="text-xs text-zinc-500 mt-1">{emptyDescription}</p>}
                  </td>
                </tr>
              ) : (
                data.map((item, i) => (
                  <tr key={item.id || i} className="group hover:bg-zinc-800/30 transition-colors">
                    {columns.map((col) => (
                      <td key={col.key} className={`px-4 py-3 ${col.className || ""}`}>
                        {col.render ? col.render(item, i) : <span className="text-zinc-300">{item[col.key]}</span>}
                      </td>
                    ))}
                    {rowActions && (
                      <td className="px-4 py-3 text-right">{rowActions(item, i)}</td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-500 text-xs">
            {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, total)} de {total}
          </span>
          <div className="inline-flex items-center gap-1.5">
            <button
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-700/60 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white hover:border-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Anterior
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                .map((p, idx, arr) => (
                  <span key={p} className="inline-flex items-center">
                    {idx > 0 && arr[idx - 1] !== p - 1 && <span className="px-1 text-zinc-600 text-xs">…</span>}
                    <button
                      onClick={() => goToPage(p)}
                      className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${
                        p === currentPage
                          ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30"
                          : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                      }`}
                    >
                      {p}
                    </button>
                  </span>
                ))}
            </div>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-700/60 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white hover:border-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Siguiente <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
