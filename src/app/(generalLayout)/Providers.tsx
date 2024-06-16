"use client"

import { ShopProvider } from "@/contexts/ShopContext"

const Providers = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <ShopProvider>
      {children}
    </ShopProvider>
  )
}

export default Providers
