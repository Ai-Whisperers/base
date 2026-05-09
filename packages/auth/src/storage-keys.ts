export function createStorageKeys(prefix: string) {
  return {
    USER: `${prefix}_user`,
    CART: `${prefix}-cart`,
    CART_SAVED: `${prefix}_saved`,
    FAVORITES: `${prefix}_favorites`,
    LANG: `${prefix}_lang`,
    CURRENCY: `${prefix}_currency`,
    DARK_MODE: `${prefix}-dark-mode`,
    ADDRESSES: `${prefix}_addresses`,
    ORDERS: `${prefix}_orders`,
    ADMIN_SESSION: `${prefix}_admin_session`,
    ADMIN_TOKEN: `${prefix}_admin_token`,
    RECENTLY_VIEWED: `${prefix}_recently_viewed`,
    PROMOS: `${prefix}_promos`,
  } as const
}
