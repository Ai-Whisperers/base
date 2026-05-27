import type { AdminRole } from "./types"

export const ROLE_HIERARCHY: Record<AdminRole, number> = {
  viewer: 0,
  support: 1,
  editor: 2,
  admin: 3,
  superadmin: 4,
}

export function can(userRole: AdminRole | string, requiredRole: AdminRole): boolean {
  const userLevel = ROLE_HIERARCHY[userRole as AdminRole] ?? -1
  const requiredLevel = ROLE_HIERARCHY[requiredRole]
  return userLevel >= requiredLevel
}

export function canEditContent(role: AdminRole | string): boolean {
  return can(role, "editor")
}

export function canManageOrders(role: AdminRole | string): boolean {
  return can(role, "support")
}

export function canManageUsers(role: AdminRole | string): boolean {
  return can(role, "admin")
}

export function canManageSettings(role: AdminRole | string): boolean {
  return can(role, "admin")
}

export function isSuperAdmin(role: AdminRole | string): boolean {
  return role === "superadmin"
}
