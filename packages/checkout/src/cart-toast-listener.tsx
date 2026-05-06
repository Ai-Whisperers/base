"use client"
import { useEffect } from "react"
// useToast provided by consumer
const useToast = () => ({ toast: (p: any) => console.log("toast:", p) })

export function CartToastListener() {
  const { toast } = useToast()
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      toast({ message: detail.message, type: detail.type })
    }
    window.addEventListener("cart-toast", handler)
    return () => window.removeEventListener("cart-toast", handler)
  }, [toast])
  return null
}
