"use client"
import { useState, useEffect } from "react"
import { ShoppingBag, Package, Users, DollarSign, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"
import { StatCard, StatCardSkeleton } from "../stats-card"
import { Badge } from "../ui"
import Link from "next/link"

interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalCustomers: number
  monthOrders: number
  monthRevenue: number
  ordersChange: number
  revenueChange: number
  recentOrders: any[]
  lowStock: any[]
}

function formatCurrency(n: number) {
  return "Gs. " + n.toLocaleString("es-PY")
}

export function AdminDashboard({ fetchStats }: { fetchStats?: () => Promise<DashboardStats> }) {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (fetchStats) {
        try {
          const data = await fetchStats()
          setStats(data)
        } catch {}
      }
      setLoading(false)
    }
    load()
  }, [fetchStats])

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-sm text-zinc-500 mb-8">Vista general de tu tienda</p>
        <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
      <p className="text-sm text-zinc-500 mb-8">Vista general de tu tienda</p>

      <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
        <StatCard
          title="Pedidos totales"
          value={stats?.totalOrders ?? 0}
          change={stats?.ordersChange ? `${stats.ordersChange > 0 ? "+" : ""}${stats.ordersChange}%` : undefined}
          trend={stats?.ordersChange && stats.ordersChange >= 0 ? "up" : "down"}
          icon={<ShoppingBag className="w-4 h-4" />}
          color="emerald"
          href="/admin/pedidos"
        />
        <StatCard
          title="Ingresos"
          value={formatCurrency(stats?.totalRevenue ?? 0)}
          change={stats?.revenueChange ? `${stats.revenueChange > 0 ? "+" : ""}${stats.revenueChange}%` : undefined}
          trend={stats?.revenueChange && stats.revenueChange >= 0 ? "up" : "down"}
          icon={<DollarSign className="w-4 h-4" />}
          color="blue"
        />
        <StatCard
          title="Productos"
          value={stats?.totalProducts ?? 0}
          icon={<Package className="w-4 h-4" />}
          color="purple"
          href="/admin/productos"
        />
        <StatCard
          title="Clientes"
          value={stats?.totalCustomers ?? 0}
          icon={<Users className="w-4 h-4" />}
          color="amber"
          href="/admin/clientes"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-2">
        <StatCard
          title="Pedidos del mes"
          value={stats?.monthOrders ?? 0}
          icon={<ShoppingBag className="w-4 h-4" />}
          color="emerald"
        />
        <StatCard
          title="Ingresos del mes"
          value={formatCurrency(stats?.monthRevenue ?? 0)}
          icon={<TrendingUp className="w-4 h-4" />}
          color="blue"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {stats?.recentOrders && stats.recentOrders.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-white mb-3">Pedidos recientes</h2>
            <div className="space-y-2">
              {stats.recentOrders.slice(0, 5).map((o: any) => (
                <Link
                  key={o.id}
                  href={"/admin/pedidos/detalle?id=" + o.id}
                  className="flex items-center justify-between rounded-xl border border-zinc-800/60 bg-zinc-900/50 p-3 hover:border-zinc-700/60 transition-all"
                >
                  <div>
                    <p className="text-sm font-medium text-white">#{o.id?.slice(0, 8)}</p>
                    <p className="text-xs text-zinc-500">
                      {o.created_at ? new Date(o.created_at).toLocaleDateString("es") : ""}
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <p className="text-sm font-bold text-white">{o.total}</p>
                    <Badge status={o.status}>{o.status}</Badge>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {stats?.lowStock && stats.lowStock.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Alertas de stock bajo
            </h2>
            <div className="space-y-2">
              {stats.lowStock.slice(0, 5).map((p: any) => (
                <Link
                  key={p.id}
                  href="/admin/productos"
                  className="flex items-center justify-between rounded-xl border border-zinc-800/60 bg-zinc-900/50 p-3 hover:border-zinc-700/60 transition-all"
                >
                  <div className="flex items-center gap-3">
                    {p.image_url ? (
                      <img src={p.image_url} alt="" className="w-8 h-8 rounded-lg border border-zinc-700/40 object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                        <Package className="w-4 h-4 text-zinc-600" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-white">{p.name}</p>
                      <p className="text-xs text-zinc-500">{p.category}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-red-400">{p.stock} uds.</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
