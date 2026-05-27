"use client"
import Link from "next/link"
import type { ReactNode } from "react"

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  icon?: ReactNode
  trend?: "up" | "down" | "neutral"
  href?: string
  color?: "emerald" | "blue" | "amber" | "purple" | "red"
}

const colorMap: Record<string, string> = {
  emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
  blue: "from-blue-500/20 to-blue-500/5 border-blue-500/20",
  amber: "from-amber-500/20 to-amber-500/5 border-amber-500/20",
  purple: "from-purple-500/20 to-purple-500/5 border-purple-500/20",
  red: "from-red-500/20 to-red-500/5 border-red-500/20",
}

const iconColorMap: Record<string, string> = {
  emerald: "text-emerald-400",
  blue: "text-blue-400",
  amber: "text-amber-400",
  purple: "text-purple-400",
  red: "text-red-400",
}

function CardContent({ title, value, change, icon, trend, color = "emerald" }: StatCardProps) {
  return (
    <div className={`rounded-xl border bg-gradient-to-br ${colorMap[color]} p-5 hover:brightness-110 transition-all`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{title}</p>
        {icon && <div className={iconColorMap[color]}>{icon}</div>}
      </div>
      <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
      {(change || trend) && (
        <div className="flex items-center gap-1.5 mt-2">
          {trend === "up" && <span className="text-emerald-400 text-xs">↑</span>}
          {trend === "down" && <span className="text-red-400 text-xs">↓</span>}
          {change && <span className="text-xs text-zinc-500">{change}</span>}
        </div>
      )}
    </div>
  )
}

export function StatCard(props: StatCardProps) {
  if (props.href) {
    return (
      <Link href={props.href} className="block">
        <CardContent {...props} />
      </Link>
    )
  }
  return <CardContent {...props} />
}

export function StatCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-zinc-800/60 bg-zinc-900/50 p-5">
      <div className="h-3 w-20 rounded-md bg-zinc-800 mb-3" />
      <div className="h-7 w-32 rounded-md bg-zinc-800 mb-2" />
      <div className="h-3 w-24 rounded-md bg-zinc-800" />
    </div>
  )
}
