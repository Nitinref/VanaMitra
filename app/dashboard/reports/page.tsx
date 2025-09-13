"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Download, Calendar, FileText, TrendingUp, Users, Map } from "lucide-react"
import { MobileResponsiveLayout } from "@/components/mobile-responsive-layout"

export default function ReportsPage() {
  const reports = [
    {
      id: "RPT001",
      title: "Monthly Claims Summary",
      description: "Comprehensive analysis of FRA claims processed in the current month",
      type: "summary",
      generated: "2024-03-15",
      size: "2.4 MB",
      format: "PDF",
    },
    {
      id: "RPT002",
      title: "Beneficiary Analytics Report",
      description: "Detailed breakdown of beneficiaries by category, village, and scheme participation",
      type: "analytics",
      generated: "2024-03-10",
      size: "1.8 MB",
      format: "Excel",
    },
    {
      id: "RPT003",
      title: "Geographic Distribution Analysis",
      description: "Spatial analysis of forest rights distribution across different regions",
      type: "geographic",
      generated: "2024-03-08",
      size: "5.2 MB",
      format: "PDF",
    },
    {
      id: "RPT004",
      title: "Scheme Performance Dashboard",
      description: "Performance metrics and KPIs for various forest rights schemes",
      type: "performance",
      generated: "2024-03-05",
      size: "3.1 MB",
      format: "PDF",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "summary":
        return <FileText className="w-5 h-5 text-blue-500" />
      case "analytics":
        return <BarChart3 className="w-5 h-5 text-green-500" />
      case "geographic":
        return <Map className="w-5 h-5 text-purple-500" />
      case "performance":
        return <TrendingUp className="w-5 h-5 text-orange-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const getTypeBadge = (type: string) => {
    const variants = {
      summary: "bg-blue-100 text-blue-800",
      analytics: "bg-green-100 text-green-800",
      geographic: "bg-purple-100 text-purple-800",
      performance: "bg-orange-100 text-orange-800",
    }
    return variants[type as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  return (
    <MobileResponsiveLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate and access comprehensive reports</p>
          </div>
          <Button>
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Download className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">Downloads</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getTypeIcon(report.type)}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <Badge className={getTypeBadge(report.type)}>{report.type.toUpperCase()}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">{report.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Generated: {report.generated}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Size: {report.size}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Format: {report.format}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MobileResponsiveLayout>
  )
}
