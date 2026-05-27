"use client"
import { useState } from "react"
import { Tags, Plus, X, ChevronRight } from "lucide-react"
import { EmptyState } from "../ui"

function slugify(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")
}

interface Category {
  id: string
  name: string
  slug?: string
  order_index?: number
  active?: boolean
  description?: string
  parent_id?: string | null
  children?: Category[]
}

export function AdminCategories({
  categories,
  onAdd,
  onUpdate,
  onDelete,
}: {
  categories?: Category[]
  onAdd?: (cat: { name: string; slug: string; order_index: number }) => Promise<void>
  onUpdate?: (cat: Category) => Promise<void>
  onDelete?: (id: string) => Promise<void>
}) {
  const [cats] = useState<Category[]>(categories || [])
  const [newName, setNewName] = useState("")
  const [newSlug, setNewSlug] = useState("")
  const [newOrder, setNewOrder] = useState(99)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState("")
  const [showSubcats, setShowSubcats] = useState<string | null>(null)

  const rootCats = cats.filter(c => !c.parent_id)
  const getChildren = (parentId: string) => cats.filter(c => c.parent_id === parentId)

  const handleAdd = async () => {
    if (!newName.trim()) return
    if (onAdd) {
      await onAdd({ name: newName.trim(), slug: newSlug || slugify(newName.trim()), order_index: newOrder })
    }
    setNewName("")
    setNewSlug("")
    setNewOrder(99)
  }

  const handleSaveEdit = async (cat: Category) => {
    if (onUpdate && editingId === cat.id) {
      await onUpdate({ ...cat, name: editName || cat.name })
    }
    setEditingId(null)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Categorías ({cats.length})</h1>
      <p className="text-sm text-zinc-500 mb-6">Administrá las categorías de productos</p>

      <div className="mb-6 rounded-xl border border-zinc-700/60 bg-zinc-800/40 p-4">
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Agregar categoría</h3>
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="mb-1 block text-xs text-zinc-500">Nombre</label>
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Nombre de categoría"
              className="rounded-lg border border-zinc-700/60 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500/50"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-500">Slug (opcional)</label>
            <input
              value={newSlug}
              onChange={e => setNewSlug(e.target.value)}
              placeholder="auto-generado"
              className="rounded-lg border border-zinc-700/60 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500/50"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-500">Orden</label>
            <input
              type="number"
              value={newOrder}
              onChange={e => setNewOrder(Number(e.target.value))}
              className="w-20 rounded-lg border border-zinc-700/60 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500/50"
            />
          </div>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
          >
            <Plus className="w-3.5 h-3.5" /> Agregar
          </button>
        </div>
      </div>

      {cats.length === 0 ? (
        <EmptyState
          icon={<Tags className="w-8 h-8" />}
          title="Sin categorías todavía"
          description="Agregá tu primera categoría para organizar los productos"
        />
      ) : (
        <div className="rounded-xl border border-zinc-700/60 bg-zinc-900/30 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-700/50 bg-zinc-800/60">
                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-400">Nombre</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-400">Slug</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-400">Orden</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-400">Estado</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-400">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40">
              {rootCats.sort((a, b) => (a.order_index ?? 99) - (b.order_index ?? 99)).map(cat => (
                <CategoryRow
                  key={cat.id}
                  cat={cat}
                  editingId={editingId}
                  editName={editName}
                  onStartEdit={(id, name) => { setEditingId(id); setEditName(name) }}
                  onEditNameChange={setEditName}
                  onSaveEdit={() => handleSaveEdit(cat)}
                  onCancelEdit={() => setEditingId(null)}
                  onDelete={() => onDelete?.(cat.id)}
                  onToggleSubcats={() => setShowSubcats(showSubcats === cat.id ? null : cat.id)}
                  showSubcats={showSubcats === cat.id}
                  subcats={getChildren(cat.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showSubcats && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-700/60 bg-zinc-900 p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Subcategorías: {cats.find(c => c.id === showSubcats)?.name}
              </h3>
              <button onClick={() => setShowSubcats(null)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mb-4 flex gap-2">
              <input
                placeholder="Nueva subcategoría"
                className="flex-1 rounded-lg border border-zinc-700/60 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500/50"
              />
              <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500">Agregar</button>
            </div>
            {getChildren(showSubcats).length === 0 ? (
              <p className="text-sm text-zinc-500">Sin subcategorías todavía.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {getChildren(showSubcats).map(sub => (
                  <div key={sub.id} className="flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-800 px-4 py-2 text-sm text-zinc-300">
                    <span>{sub.name}</span>
                    <button onClick={() => onDelete?.(sub.id)} className="text-zinc-500 hover:text-red-400 text-xs">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function CategoryRow({
  cat, editingId, editName, onStartEdit, onEditNameChange, onSaveEdit, onCancelEdit, onDelete, onToggleSubcats, showSubcats, subcats,
}: {
  cat: Category
  editingId: string | null
  editName: string
  onStartEdit: (id: string, name: string) => void
  onEditNameChange: (name: string) => void
  onSaveEdit: () => void
  onCancelEdit: () => void
  onDelete: () => void
  onToggleSubcats: () => void
  showSubcats: boolean
  subcats: Category[]
}) {
  if (editingId === cat.id) {
    return (
      <tr className="bg-zinc-800/80">
        <td className="px-4 py-2">
          <input
            value={editName}
            onChange={e => onEditNameChange(e.target.value)}
            className="w-full rounded border border-zinc-600 bg-zinc-900 px-2 py-1 text-sm text-white"
          />
        </td>
        <td className="px-4 py-2"><span className="text-xs font-mono text-zinc-400">{cat.slug || slugify(cat.name)}</span></td>
        <td className="px-4 py-2"><span className="text-sm text-zinc-400">{cat.order_index ?? 99}</span></td>
        <td className="px-4 py-2">
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cat.active !== false ? "bg-emerald-900/50 text-emerald-400" : "bg-zinc-700/50 text-zinc-500"}`}>
            {cat.active !== false ? "Activo" : "Inactivo"}
          </span>
        </td>
        <td className="px-4 py-2 text-right">
          <button onClick={onSaveEdit} className="mr-2 rounded bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-500">Guardar</button>
          <button onClick={onCancelEdit} className="rounded bg-zinc-600 px-3 py-1 text-xs text-zinc-300 hover:bg-zinc-500">Cancelar</button>
        </td>
      </tr>
    )
  }

  return (
    <>
      <tr className="hover:bg-zinc-800/40 transition-colors">
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            {subcats.length > 0 && (
              <button onClick={onToggleSubcats} className="text-zinc-500 hover:text-zinc-300">
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showSubcats ? "rotate-90" : ""}`} />
              </button>
            )}
            <span className="font-medium text-white">{cat.name}</span>
            {cat.description && <p className="text-xs text-zinc-500 truncate max-w-[200px]">{cat.description}</p>}
          </div>
        </td>
        <td className="px-4 py-3"><span className="text-xs font-mono text-zinc-400">{cat.slug || slugify(cat.name)}</span></td>
        <td className="px-4 py-3"><span className="text-sm text-zinc-400">{cat.order_index ?? 99}</span></td>
        <td className="px-4 py-3">
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cat.active !== false ? "bg-emerald-900/50 text-emerald-400" : "bg-zinc-700/50 text-zinc-500"}`}>
            {cat.active !== false ? "Activo" : "Inactivo"}
          </span>
        </td>
        <td className="px-4 py-3 text-right">
          <div className="inline-flex items-center gap-1">
            <button
              onClick={() => onStartEdit(cat.id, cat.name)}
              className="rounded px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-700 hover:text-white"
            >
              Editar
            </button>
            <button
              onClick={() => onToggleSubcats()}
              className="rounded px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-700 hover:text-white"
            >
              Sub ({subcats.length})
            </button>
            <button
              onClick={onDelete}
              className="rounded px-2 py-1 text-xs text-zinc-500 hover:bg-red-900/40 hover:text-red-400"
            >
              Eliminar
            </button>
          </div>
        </td>
      </tr>
      {showSubcats && subcats.length > 0 && (
        <tr className="bg-zinc-800/20">
          <td colSpan={5} className="px-8 py-2">
            <div className="flex flex-wrap gap-2">
              {subcats.map(sub => (
                <span key={sub.id} className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700/40 bg-zinc-800/60 px-3 py-1 text-xs text-zinc-400">
                  {sub.name}
                </span>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
