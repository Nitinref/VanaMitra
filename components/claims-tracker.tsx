"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileCheck, Clock, AlertTriangle, RefreshCw, TrendingUp } from "lucide-react"

export function ClaimsTracker() {
  const [data, setData] = useState({
    totalClaims: 18540,
    completed: 70,
    inReview: 20,
    pending: 10,
    inProcess: 3708,
    flagged: 1854,
    newClaims: 245,
    verified: 12978,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        totalClaims: prev.totalClaims + Math.floor(Math.random() * 5),
        newClaims: prev.newClaims + Math.floor(Math.random() * 3),
        inProcess: prev.inProcess + Math.floor(Math.random() * 10) - 5,
        flagged: Math.max(0, prev.flagged + Math.floor(Math.random() * 6) - 3),
      }))
      setLastUpdated(new Date())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setData((prev) => ({
        ...prev,
        totalClaims: prev.totalClaims + Math.floor(Math.random() * 20),
        completed: Math.min(100, prev.completed + Math.random() * 2),
        inReview: Math.max(0, prev.inReview + Math.random() * 4 - 2),
        pending: Math.max(0, prev.pending + Math.random() * 3 - 1.5),
      }))
      setLastUpdated(new Date())
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <FileCheck className="w-5 h-5 text-primary" />
            <span>Claims Processing Tracker</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
            {data.totalClaims.toLocaleString()}
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm text-muted-foreground">Total Claims Digitized</p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Completed</span>
              <span className="text-sm text-muted-foreground">{data.completed.toFixed(1)}%</span>
            </div>
            <Progress value={data.completed} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">In Review</span>
              <span className="text-sm text-muted-foreground">{data.inReview.toFixed(1)}%</span>
            </div>
            <Progress value={data.inReview} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Pending</span>
              <span className="text-sm text-muted-foreground">{data.pending.toFixed(1)}%</span>
            </div>
            <Progress value={data.pending} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
            <Clock className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
            <div className="text-lg font-semibold">{data.inProcess.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">In Process</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
            <AlertTriangle className="w-4 h-4 mx-auto mb-1 text-destructive" />
            <div className="text-lg font-semibold">{data.flagged.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Flagged</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="animate-pulse">
            New: {data.newClaims}
          </Badge>
          <Badge variant="outline">Verified: {data.verified.toLocaleString()}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
