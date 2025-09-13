"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EnhancedSidebar } from "./enhanced-sidebar"
import { cn } from "@/lib/utils"

interface MobileResponsiveLayoutProps {
  children: React.ReactNode
}

export function MobileResponsiveLayout({ children }: MobileResponsiveLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="flex min-h-screen bg-background">
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div
        className={cn(
          "transition-transform duration-300 ease-in-out z-50",
          isMobile
            ? sidebarOpen
              ? "fixed left-0 top-0 h-full translate-x-0"
              : "fixed left-0 top-0 h-full -translate-x-full"
            : "relative",
        )}
      >
        <EnhancedSidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header with menu button */}
        {isMobile && (
          <div className="flex items-center justify-between p-4 border-b bg-card md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="no-print">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <h1 className="font-semibold text-lg">Vanamitra</h1>
            <div className="w-9" /> {/* Spacer for centering */}
          </div>
        )}

        <main className="flex-1 p-4 md:p-6 mobile-scroll">{children}</main>
      </div>
    </div>
  )
}
