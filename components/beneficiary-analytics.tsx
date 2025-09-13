"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, TrendingUp, Target, Download } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from "recharts"

export function BeneficiaryAnalytics() {
  const [viewType, setViewType] = useState("coverage")
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [data, setData] = useState({
    totalEligible: 42400,
    receivingBenefits: 32660,
    coverageRate: 77,
  })

  const [beneficiaryData, setBeneficiaryData] = useState([
    { district: "Koraput", eligible: 12500, receiving: 8750, percentage: 70, growth: 5.2 },
    { district: "Rayagada", eligible: 9800, receiving: 7840, percentage: 80, growth: 3.8 },
    { district: "Kalahandi", eligible: 11200, receiving: 7840, percentage: 70, growth: 4.1 },
    { district: "Nabarangpur", eligible: 8900, receiving: 6230, percentage: 70, growth: 6.3 },
  ])

  const [trendData, setTrendData] = useState([
    { month: "Jan", beneficiaries: 28500, newRegistrations: 1200, dropouts: 300 },
    { month: "Feb", beneficiaries: 29200, newRegistrations: 1100, dropouts: 400 },
    { month: "Mar", beneficiaries: 30100, newRegistrations: 1300, dropouts: 200 },
    { month: "Apr", beneficiaries: 30800, newRegistrations: 1000, dropouts: 300 },
    { month: "May", beneficiaries: 31500, newRegistrations: 1200, dropouts: 500 },
    { month: "Jun", beneficiaries: 32660, newRegistrations: 1400, dropouts: 240 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        totalEligible: prev.totalEligible + Math.floor(Math.random() * 10),
        receivingBenefits: prev.receivingBenefits + Math.floor(Math.random() * 8),
        coverageRate: Math.round(
          ((prev.receivingBenefits + Math.floor(Math.random() * 8)) /
            (prev.totalEligible + Math.floor(Math.random() * 10))) *
            100,
        ),
      }))

      setBeneficiaryData((prev) =>
        prev.map((district) => ({
          ...district,
          receiving: district.receiving + Math.floor(Math.random() * 5),
          percentage: Math.min(100, district.percentage + Math.random() * 2 - 1),
        })),
      )
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleExportData = () => {
    const exportData = {
      summary: data,
      districts: beneficiaryData,
      trends: trendData,
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `beneficiary-analytics-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleFilterChange = (period: string) => {
    setSelectedPeriod(period)
    // Simulate data filtering based on period
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <span>Beneficiary Analytics</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Select value={viewType} onValueChange={setViewType}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coverage">Coverage</SelectItem>
                <SelectItem value="growth">Growth</SelectItem>
                <SelectItem value="demographics">Demographics</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPeriod} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleExportData}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
            <Target className="w-4 h-4 mx-auto mb-1 text-primary" />
            <div className="text-lg font-semibold">{data.totalEligible.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Eligible</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
            <Users className="w-4 h-4 mx-auto mb-1 text-secondary" />
            <div className="text-lg font-semibold">{data.receivingBenefits.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Receiving Benefits</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
            <TrendingUp className="w-4 h-4 mx-auto mb-1 text-accent" />
            <div className="text-lg font-semibold">{data.coverageRate}%</div>
            <div className="text-xs text-muted-foreground">Coverage Rate</div>
          </div>
        </div>

        {viewType === "coverage" && (
          <div>
            <h4 className="text-sm font-medium mb-3">District-wise Coverage</h4>
            <div className="space-y-3">
              {beneficiaryData.map((district) => (
                <div key={district.district} className="hover:bg-muted/30 p-2 rounded transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{district.district}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {district.receiving.toLocaleString()} / {district.eligible.toLocaleString()}
                      </span>
                      <span className="text-xs text-green-600">+{district.growth}%</span>
                    </div>
                  </div>
                  <Progress value={district.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        )}

        {viewType === "growth" && (
          <div>
            <h4 className="text-sm font-medium mb-3">Registration vs Dropout Trends</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="newRegistrations" fill="hsl(var(--primary))" name="New Registrations" />
                  <Bar dataKey="dropouts" fill="hsl(var(--destructive))" name="Dropouts" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {viewType === "demographics" && (
          <div>
            <h4 className="text-sm font-medium mb-3">Beneficiary Growth Trend</h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [value.toLocaleString(), name]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="beneficiaries"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
