"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, Download, DollarSign, TrendingUp } from "lucide-react"

export function SchemeHeatmap() {
  const [selectedScheme, setSelectedScheme] = useState("all")
  const [viewMode, setViewMode] = useState("allocation")

  const schemes = [
    { name: "MGNREGA", allocation: 45.2, utilization: 78, color: "bg-chart-1", trend: "+5.2%" },
    { name: "PMAY-G", allocation: 32.8, utilization: 65, color: "bg-chart-2", trend: "+2.1%" },
    { name: "PM-KISAN", allocation: 28.5, utilization: 92, color: "bg-chart-3", trend: "+8.7%" },
    { name: "NSAP", allocation: 18.7, utilization: 85, color: "bg-chart-4", trend: "+3.4%" },
    { name: "PDS", allocation: 52.3, utilization: 88, color: "bg-chart-5", trend: "+1.9%" },
  ]

  const districts = [
    { name: "Koraput", funding: 125.5, schemes: 12, efficiency: "high", growth: "+12.3%" },
    { name: "Rayagada", funding: 98.2, schemes: 10, efficiency: "medium", growth: "+8.1%" },
    { name: "Kalahandi", funding: 142.8, schemes: 14, efficiency: "high", growth: "+15.7%" },
    { name: "Nabarangpur", funding: 87.3, schemes: 9, efficiency: "low", growth: "+4.2%" },
  ]

  const handleExport = () => {
    const exportData = {
      schemes: schemes,
      districts: districts,
      filters: { scheme: selectedScheme, view: viewMode },
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `scheme-heatmap-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const totalAllocation = schemes.reduce((sum, scheme) => sum + scheme.allocation, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="w-5 h-5 text-primary" />
            <span>Scheme Allocation Heatmap</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Select value={selectedScheme} onValueChange={setSelectedScheme}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Schemes</SelectItem>
                <SelectItem value="mgnrega">MGNREGA</SelectItem>
                <SelectItem value="pmay">PMAY-G</SelectItem>
                <SelectItem value="pmkisan">PM-KISAN</SelectItem>
              </SelectContent>
            </Select>
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="allocation">Allocation</SelectItem>
                <SelectItem value="utilization">Utilization</SelectItem>
                <SelectItem value="efficiency">Efficiency</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium mb-3">Scheme Performance</h4>
            <div className="space-y-3">
              {schemes.map((scheme) => (
                <div
                  key={scheme.name}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded ${scheme.color}`}></div>
                    <div>
                      <div className="font-medium">{scheme.name}</div>
                      <div className="text-sm text-muted-foreground">₹{scheme.allocation}Cr allocated</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={scheme.utilization > 80 ? "default" : "secondary"}>{scheme.utilization}%</Badge>
                    <div className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {scheme.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">District Funding Distribution</h4>
            <div className="space-y-3">
              {districts.map((district) => (
                <div
                  key={district.name}
                  className="p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{district.name}</span>
                    <Badge
                      variant={
                        district.efficiency === "high"
                          ? "default"
                          : district.efficiency === "medium"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {district.efficiency}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>₹{district.funding}Cr total</span>
                    <span>{district.schemes} schemes</span>
                  </div>
                  <div className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {district.growth} growth
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="font-medium">Total Budget Allocation</span>
              </div>
              <div className="text-2xl font-bold text-primary">₹{totalAllocation.toFixed(1)} Crores</div>
              <div className="text-sm text-muted-foreground">Across all schemes and districts</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Average Utilization</div>
              <div className="text-xl font-bold text-secondary">
                {Math.round(schemes.reduce((sum, s) => sum + s.utilization, 0) / schemes.length)}%
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
