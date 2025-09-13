"use client"

import { useState } from "react"
import { Bell, Settings, User, ChevronDown, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function DashboardHeader() {
  const [selectedState, setSelectedState] = useState("Odisha")
  const [notifications] = useState(3)

  const handleStateChange = (state: string) => {
    setSelectedState(state)
  }

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Vanamitra</h1>
              <p className="text-sm text-muted-foreground">Forest Rights & Tribal Welfare Dashboard</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* State Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <span>{selectedState}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleStateChange("Odisha")}>Odisha</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStateChange("Jharkhand")}>Jharkhand</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStateChange("Chhattisgarh")}>Chhattisgarh</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStateChange("Madhya Pradesh")}>Madhya Pradesh</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStateChange("Maharashtra")}>Maharashtra</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs animate-pulse">
                {notifications}
              </Badge>
            )}
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Forest Officer</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Dashboard Preferences</DropdownMenuItem>
              <DropdownMenuItem>Export Data</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Link href="/auth/signin">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
