"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, AlertCircle, CheckCircle, RefreshCw, Sparkles } from "lucide-react"

export function AIInsights() {
  const [insights, setInsights] = useState([
    {
      id: 1,
      type: "recommendation",
      icon: TrendingUp,
      title: "Scheme Optimization",
      description: "Consider increasing MGNREGA allocation in Koraput district by 15% based on demand patterns.",
      priority: "high",
      action: "Review Allocation",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      confidence: 92,
    },
    {
      id: 2,
      type: "alert",
      icon: AlertCircle,
      title: "Processing Delay",
      description: "Claims in Rayagada district showing 25% longer processing time than average.",
      priority: "medium",
      action: "Investigate",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      confidence: 87,
    },
    {
      id: 3,
      type: "success",
      icon: CheckCircle,
      title: "Efficiency Gain",
      description: "Digital verification reduced claim processing time by 40% this quarter.",
      priority: "low",
      action: "View Report",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      confidence: 95,
    },
  ])

  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const newInsights = [
        {
          type: "recommendation",
          icon: TrendingUp,
          title: "Resource Allocation",
          description: "AI suggests reallocating 12% of pending claims to faster processing centers.",
          priority: "medium",
          confidence: 89,
        },
        {
          type: "alert",
          icon: AlertCircle,
          title: "Anomaly Detected",
          description: "Unusual spike in claim rejections detected in Kalahandi district.",
          priority: "high",
          confidence: 94,
        },
        {
          type: "success",
          icon: CheckCircle,
          title: "Target Achievement",
          description: "Monthly processing target exceeded by 18% with improved accuracy.",
          priority: "low",
          confidence: 97,
        },
      ]

      const randomInsight = newInsights[Math.floor(Math.random() * newInsights.length)]
      const newId = Date.now()

      setInsights((prev) => [
        {
          ...randomInsight,
          id: newId,
          timestamp: new Date(),
          action:
            randomInsight.type === "recommendation"
              ? "Apply Suggestion"
              : randomInsight.type === "alert"
                ? "Investigate"
                : "View Details",
        },
        ...prev.slice(0, 2), // Keep only 3 insights
      ])
    }, 45000) // Generate new insight every 45 seconds

    return () => clearInterval(interval)
  }, [])

  const handleGenerateInsight = async () => {
    setIsGenerating(true)

    // Simulate AI processing
    setTimeout(() => {
      const newInsight = {
        id: Date.now(),
        type: "recommendation",
        icon: Sparkles,
        title: "AI Generated Insight",
        description:
          "Based on recent data patterns, implementing automated pre-screening could reduce processing time by 30%.",
        priority: "high",
        action: "Implement",
        timestamp: new Date(),
        confidence: 91,
      }

      setInsights((prev) => [newInsight, ...prev.slice(0, 2)])
      setIsGenerating(false)
    }, 2000)
  }

  const handleInsightAction = (insightId: number, action: string) => {
    // Simulate action execution
    setInsights((prev) =>
      prev.map((insight) =>
        insight.id === insightId ? { ...insight, action: "Completed", priority: "low" as const } : insight,
      ),
    )
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-primary" />
            <span>AI Insights & Recommendations</span>
          </CardTitle>
          <Button variant="outline" size="sm" onClick={handleGenerateInsight} disabled={isGenerating}>
            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
            <div className="flex items-start space-x-3">
              <div
                className={`p-2 rounded-lg ${
                  insight.type === "recommendation"
                    ? "bg-primary/10 text-primary"
                    : insight.type === "alert"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-secondary/10 text-secondary"
                }`}
              >
                <insight.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{insight.title}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {insight.confidence}% confidence
                    </Badge>
                    <Badge
                      variant={
                        insight.priority === "high"
                          ? "destructive"
                          : insight.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {insight.priority}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleInsightAction(insight.id, insight.action)}
                    disabled={insight.action === "Completed"}
                  >
                    {insight.action}
                  </Button>
                  <span className="text-xs text-muted-foreground">{formatTimeAgo(insight.timestamp)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-border">
          <Button className="w-full bg-transparent" variant="outline">
            View All AI Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
