"use client"
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react"
import type { CartItem } from "../types"

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (name: string) => void
  updateQuantity: (name: string, qty: number) => void
  clearCart: () => void
  total: number
  itemCount: number
  savedItems: CartItem[]
  saveItem: (name: string) => void
  restoreItem: (name: string) => void
  shareCart: () => string
}

export interface CartConfig {
  storagePrefix: string
  storeName: string          // e.g., "El Viajero"
  currency: string           // "PYG" or "USD"
  currencySymbol: string     // "Gs." or "$"
  usdRate?: number           // PYG to USD rate for analytics
  gtagEnabled?: boolean
  waPhone?: string           // WhatsApp number for cart sharing
  onAddToCart?: (item: { name: string; price: number; quantity: number }) => void
}

export function createCart(config: CartConfig) {
  const {
    storagePrefix,
    storeName,
    currency,
    currencySymbol,
    usdRate = 7400,
    gtagEnabled = false,
    waPhone = "",
    onAddToCart,
  } = config

  const CART_KEY = `${storagePrefix}-cart`
  const SAVED_KEY = `${storagePrefix}_saved`
  const CART_TOAST = `${storagePrefix}-cart-toast`

  const CartContext = createContext<CartContextType>({} as CartContextType)

  function CartProvider({ children }: { children: ReactNode }): React.ReactElement {
    const [items, setItems] = useState<CartItem[]>([])
    const [savedItems, setSavedItems] = useState<CartItem[]>([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
      try {
        const saved = localStorage.getItem(CART_KEY)
        if (saved) setItems(JSON.parse(saved))
        const svd = localStorage.getItem(SAVED_KEY)
        if (svd) setSavedItems(JSON.parse(svd))
      } catch {}
      setLoaded(true)
    }, [])

    useEffect(() => {
      if (loaded) localStorage.setItem(CART_KEY, JSON.stringify(items))
    }, [items, loaded])

    useEffect(() => {
      if (loaded) localStorage.setItem(SAVED_KEY, JSON.stringify(savedItems))
    }, [savedItems, loaded])

    const fireToast = useCallback((message: string, type: "success" | "info" | "error" | "warning") => {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(CART_TOAST, { detail: { message, type } }))
      }
    }, [])

    const fireAnalytics = useCallback((item: { name: string; priceGs?: number | string; quantity: number }) => {
      if (!gtagEnabled || typeof window === "undefined") return
      try {
        const gtag = (window as any).gtag
        if (!gtag) return
        const priceInUsd = parseInt(String(item.priceGs || "0"), 10) / usdRate
        gtag("event", "add_to_cart", {
          currency,
          value: priceInUsd,
          items: [{ item_id: item.name, item_name: item.name, price: priceInUsd, quantity: item.quantity }],
        })
      } catch {}
    }, [])

    const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
      setItems((prev) => {
        const exist = prev.find((i) => i.name === item.name)
        if (exist) {
          fireToast(`${item.name} (+1) en el carrito`, "success")
          fireAnalytics({ name: item.name, priceGs: item.priceGs, quantity: 1 })
          if (onAddToCart) onAddToCart({ name: item.name, price: item.price, quantity: exist.quantity + 1 })
          return prev.map((i) => (i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i))
        }
        fireToast(`${item.name} agregado al carrito`, "success")
        fireAnalytics({ name: item.name, priceGs: item.priceGs, quantity: 1 })
        if (onAddToCart) onAddToCart({ name: item.name, price: item.price, quantity: 1 })
        return [...prev, { ...item, quantity: 1 }]
      })
    }, [fireToast, fireAnalytics])

    const removeItem = useCallback((name: string) => {
      setItems((prev) => {
        const item = prev.find((i) => i.name === name)
        const filtered = prev.filter((i) => i.name !== name)
        if (item) fireToast(`${item.name} eliminado del carrito`, "info")
        return filtered
      })
    }, [fireToast])

    const saveItem = useCallback((name: string) => {
      const item = items.find(i => i.name === name)
      if (!item) return
      setItems(prev => prev.filter(i => i.name !== name))
      setSavedItems(prev => [...prev, item])
    }, [items])

    const restoreItem = useCallback((name: string) => {
      const item = savedItems.find(i => i.name === name)
      if (!item) return
      setSavedItems(prev => prev.filter(i => i.name !== name))
      const { quantity: _, ...rest } = item
      addItem(rest)
    }, [savedItems, addItem])

    const total = items.reduce((sum, i) => {
      const price = i.priceGs ? Number(i.priceGs) : i.price
      return sum + price * i.quantity
    }, 0)
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

    const shareCart = useCallback(() => {
      const msg = items.map(i => `• ${i.name} x${i.quantity}: ${currencySymbol}${i.price?.toLocaleString?.("es-PY") || i.price}`).join("\n")
      const url = `https://wa.me/${waPhone ? waPhone : ""}?text=${encodeURIComponent(`Mirá mi carrito de ${storeName}:\n\n${msg}\n\nTotal: ${currencySymbol} ${total.toLocaleString("es-PY")}`)}`
      window.open(url, "_blank")
      return url
    }, [items, total, waPhone, storeName, currencySymbol])

    const updateQuantity = useCallback(
      (name: string, qty: number) =>
        setItems((prev) => prev.map((i) => (i.name === name ? { ...i, quantity: Math.max(1, qty) } : i))),
      []
    )
    const clearCart = useCallback(() => setItems([]), [])

    return (
      <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount, savedItems, saveItem, restoreItem, shareCart }}>
        {children}
      </CartContext.Provider>
    )
  }

  function useCart(): CartContextType {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error(`useCart(${storagePrefix}) must be used within CartProvider`)
    return ctx
  }

  return { CartProvider, useCart, CART_TOAST }
}
