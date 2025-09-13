"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Map,
  Users,
  Shield,
  BarChart3,
  Settings,
  TreePine,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import Link from "next/link"

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Claims", href: "/dashboard/claims", count: 1245 },
  { icon: Map, label: "Assets Map", href: "/dashboard/map" },
  { icon: Users, label: "Beneficiaries", href: "/dashboard/beneficiaries", count: 8947 },
  { icon: Shield, label: "Policies", href: "/dashboard/policies" },
  { icon: BarChart3, label: "Reports", href: "/dashboard/reports" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function EnhancedSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: "bot", message: "Hello! I'm your Vanamitra assistant. How can I help you today?" },
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleItemClick = (href: string, label: string) => {
    router.push(href)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "b" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setIsCollapsed(!isCollapsed)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isCollapsed])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = { id: Date.now(), type: "user", message: newMessage }
    setChatMessages((prev) => [...prev, userMessage])

    setTimeout(() => {
      let botResponse = "I understand you're asking about "
      if (newMessage.toLowerCase().includes("claim")) {
        botResponse =
          "I can help you with claims processing. Currently, there are 1,245 active claims. Would you like to see the status breakdown?"
      } else if (newMessage.toLowerCase().includes("map")) {
        botResponse =
          "The interactive map shows forest rights data across tribal areas. You can toggle different layers to view claims, forest boundaries, and village locations."
      } else if (newMessage.toLowerCase().includes("report")) {
        botResponse =
          "I can generate various reports for you. What type of report would you like - claims summary, beneficiary analytics, or scheme performance?"
      } else {
        botResponse =
          "I can help you navigate the Vanamitra dashboard, explain data visualizations, or assist with claims processing. What would you like to know?"
      }

      const aiMessage = { id: Date.now() + 1, type: "bot", message: botResponse }
      setChatMessages((prev) => [...prev, aiMessage])
    }, 1000)

    setNewMessage("")
  }

  return (
    <>
      <aside
        className={cn(
          "bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out relative",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-2 mb-8">
            <TreePine className="w-6 h-6 text-primary flex-shrink-0" />
            {!isCollapsed && <span className="font-semibold text-sidebar-foreground">Vanamitra</span>}
          </Link>

          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))

              return (
                <Button
                  key={item.label}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                    isCollapsed ? "justify-center px-2" : "justify-start",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  )}
                  onClick={() => handleItemClick(item.href, item.label)}
                  title={isCollapsed ? item.label : undefined}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="ml-3 flex-1 text-left">{item.label}</span>
                      {item.count && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.count}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              )
            })}
          </nav>

          {!isCollapsed && (
            <div className="mt-8 p-4 bg-sidebar-accent/10 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Quick Stats</h4>
              <div className="space-y-2 text-xs">
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
                  <span className="font-medium text-green-800">94%</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4">
            <Button
              variant="outline"
              className={cn(
                "w-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                isCollapsed ? "justify-center px-2" : "justify-start",
              )}
              onClick={() => setShowChat(true)}
              title={isCollapsed ? "AI Assistant" : undefined}
            >
              <MessageCircle className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && <span className="ml-3">AI Assistant</span>}
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="absolute -right-3 top-20 bg-sidebar border border-sidebar-border rounded-full p-1 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={`${isCollapsed ? "Expand" : "Collapse"} sidebar (Ctrl/Cmd + B)`}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </aside>

      {showChat && (
        <div
          className="fixed bottom-4 right-4 z-[99999] w-80 h-96 animate-in slide-in-from-bottom-4 duration-300"
          style={{ zIndex: 2147483647 }}
        >
          <div
            className="bg-card rounded-lg shadow-2xl h-full flex flex-col border border-border relative"
            style={{ zIndex: 2147483647 }}
          >
            <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">AI Assistant</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChat(false)}
                className="hover:-translate-y-0.5 transition-transform duration-200"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4 min-h-0">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={cn("flex", msg.type === "user" ? "justify-end" : "justify-start")}>
                      <div
                        className={cn(
                          "max-w-[80%] p-3 rounded-lg text-sm transition-all duration-200 hover:shadow-md break-words",
                          msg.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                        )}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="p-4 border-t flex-shrink-0">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about claims, maps, or reports..."
                  className="flex-1 px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
