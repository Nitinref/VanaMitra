"use client"

import { useState } from "react"
import { LayoutDashboard, FileText, Map, Users, Shield, BarChart3, Settings, TreePine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: FileText, label: "Claims", href: "/dashboard/claims", active: false },
  { icon: Map, label: "Assets Map", href: "/dashboard/map", active: false },
  { icon: Users, label: "Beneficiaries", href: "/dashboard/beneficiaries", active: false },
  { icon: Shield, label: "Policies", href: "/dashboard/policies", active: false },
  { icon: BarChart3, label: "Reports", href: "/dashboard/reports", active: false },
  { icon: Settings, label: "Settings", href: "/dashboard/settings", active: false },
]

export function DashboardSidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard")

  const handleItemClick = (label: string) => {
    setActiveItem(label)
  }

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2 mb-8">
          <TreePine className="w-6 h-6 text-primary" />
          <span className="font-semibold text-sidebar-foreground">Vanamitra</span>
        </Link>

        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant={activeItem === item.label ? "default" : "ghost"}
              className={cn(
                "w-full justify-start transition-colors",
                activeItem === item.label
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
              onClick={() => handleItemClick(item.label)}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>

        <div className="mt-8 p-4 bg-sidebar-accent/10 rounded-lg">
          <h4 className="text-sm font-medium text-sidebar-foreground mb-2">Quick Stats</h4>
          <div className="space-y-2 text-xs text-sidebar-foreground/70">
            <div className="flex justify-between">
              <span>Active Claims</span>
              <span className="font-medium">1,245</span>
            </div>
            <div className="flex justify-between">
              <span>Processed Today</span>
              <span className="font-medium">89</span>
            </div>
            <div className="flex justify-between">
              <span>Success Rate</span>
              <span className="font-medium text-green-600">94%</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
