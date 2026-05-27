'use client'

import { useState, useEffect, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T, ttlMs?: number) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (!item) return initialValue
      const parsed = JSON.parse(item)
      if (ttlMs && parsed._expiry && Date.now() > parsed._expiry) {
        window.localStorage.removeItem(key)
        return initialValue
      }
      return parsed._value !== undefined ? parsed._value : parsed
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue(prev => {
      const next = value instanceof Function ? value(prev) : value
      try {
        if (ttlMs) {
          window.localStorage.setItem(key, JSON.stringify({ _value: next, _expiry: Date.now() + ttlMs }))
        } else {
          window.localStorage.setItem(key, JSON.stringify(next))
        }
      } catch { /* quota exceeded */ }
      return next
    })
  }, [key, ttlMs])

  return [storedValue, setValue] as const
}

export interface ProductLike {
  id: string
  name: string
  slug?: string
  price?: number
  image?: string
  category?: string
}

export function useWishlist<T extends ProductLike = ProductLike>(key = 'aiw_wishlist') {
  const [items, setItems] = useLocalStorage<T[]>(key, [])

  const isInWishlist = useCallback((id: string) => items.some(i => i.id === id), [items])
  const toggle = useCallback((item: T) => {
    setItems(prev => prev.some(i => i.id === item.id) ? prev.filter(i => i.id !== item.id) : [...prev, item])
  }, [setItems])
  const remove = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [setItems])
  const clear = useCallback(() => setItems([]), [setItems])

  return { items, count: items.length, isInWishlist, toggle, remove, clear }
}

export function useRecentlyViewed<T extends ProductLike = ProductLike>(maxItems = 12, key = 'aiw_recently_viewed') {
  const [items, setItems] = useLocalStorage<T[]>(key, [])

  const add = useCallback((item: T) => {
    setItems(prev => {
      const filtered = prev.filter(i => i.id !== item.id)
      return [item, ...filtered].slice(0, maxItems)
    })
  }, [maxItems, setItems])

  return { items, add }
}
