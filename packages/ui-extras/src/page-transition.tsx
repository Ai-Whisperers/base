"use client"
// framer-motion not available; using CSS animations
const motion = { div: (p: any) => <div {...p} /> }
const AnimatePresence = ({children}: any) => <>{children}</>
import { usePathname } from "next/navigation"
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
