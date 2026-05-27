"use client"

export type AdminRole = "superadmin" | "admin" | "editor" | "support" | "viewer"

export interface AdminUser {
  id: string
  userId: string
  name: string
  email: string
  role: AdminRole
  permissions?: string[]
}

export interface AdminPageProps {
  user: AdminUser | null
}

export interface NavItem {
  label: string
  href: string
  icon: string
  roles?: AdminRole[]
  badge?: string | number
}

export interface NavSection {
  title: string
  items: NavItem[]
}
