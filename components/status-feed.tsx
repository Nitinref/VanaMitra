"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, CheckCircle, AlertTriangle, Clock, RefreshCw, FileCheck, Users } from "lucide-react"

export function StatusFeed() {
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: "approval",
      icon: CheckCircle,
      title: "Claim Approved",
      description: "FRA claim #FR-2024-1245 approved for Koraput village",
      time: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      status: "success",
    },
    {
      id: 2,
      type: "verification",
      icon: Clock,
      title: "Verification Pending",
      description: "Document verification required for claim #FR-2024-1246",
      time: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      status: "pending",
    },
    {
      id: 3,
      type: "anomaly",
      icon: AlertTriangle,
      title: "Anomaly Detected",
      description: "Duplicate beneficiary entry flagged in Rayagada district",
      time: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      status: "warning",
    },
    {
      id: 4,
      type: "approval",
      icon: FileCheck,
      title: "Batch Processing Complete",
      description: "125 claims processed successfully in Kalahandi",
      time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: "success",
    },
    {
      id: 5,
      type: "verification",
      icon: Users,
      title: "Survey Scheduled",
      description: "Field survey scheduled for 15 villages in Nabarangpur",
      time: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      status: "pending",
    },
  ])

  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivities = [
        {
          type: "approval",
          icon: CheckCircle,
          title: "New Claim Approved",
          description: `FRA claim #FR-2024-${Math.floor(Math.random() * 9999)} approved for village`,
          status: "success",
        },
        {
          type: "verification",
          icon: Clock,
          title: "Document Uploaded",
          description: "New supporting documents uploaded for pending claim",
          status: "pending",
        },
        {
          type: "anomaly",
          icon: AlertTriangle,
          title: "System Alert",
          description: "Unusual activity pattern detected in claim processing",
          status: "warning",
        },
      ]

      const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)]
      const newId = Date.now()

      setActivities((prev) => [
        {
          ...randomActivity,
          id: newId,
          time: new Date(),
        },
        ...prev.slice(0, 4), // Keep only 5 activities
      ])
    }, 60000) // Add new activity every minute

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)

    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary" />
            <span>Real-Time Status Feed</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div
                className={`p-1.5 rounded-full ${
                  activity.status === "success"
                    ? "bg-secondary/20 text-secondary"
                    : activity.status === "warning"
                      ? "bg-destructive/20 text-destructive"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                <activity.icon className="w-3 h-3" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium truncate">{activity.title}</h4>
                  <Badge
                    variant={
                      activity.status === "success"
                        ? "default"
                        : activity.status === "warning"
                          ? "destructive"
                          : "secondary"
                    }
                    className="ml-2 text-xs"
                  >
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{activity.description}</p>
                <span className="text-xs text-muted-foreground">{formatTimeAgo(activity.time)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border mt-4">
          <Button variant="outline" className="w-full bg-transparent" size="sm">
            View All Activities
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
