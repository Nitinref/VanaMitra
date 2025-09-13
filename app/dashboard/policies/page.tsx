"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, FileText, Users, Calendar, Download, ExternalLink } from "lucide-react"
import { MobileResponsiveLayout } from "@/components/mobile-responsive-layout"

export default function PoliciesPage() {
  const policies = [
    {
      id: "POL001",
      title: "Forest Rights Act, 2006",
      description:
        "Recognition of forest rights and occupation in forest land by forest dwelling Scheduled Tribes and other traditional forest dwellers",
      status: "active",
      lastUpdated: "2024-01-15",
      beneficiaries: 8947,
      documents: 12,
    },
    {
      id: "POL002",
      title: "Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Rules, 2008",
      description: "Rules for implementation of the Forest Rights Act",
      status: "active",
      lastUpdated: "2024-02-20",
      beneficiaries: 6234,
      documents: 8,
    },
    {
      id: "POL003",
      title: "Community Forest Resource Rights Guidelines",
      description: "Guidelines for recognition and vesting of community forest resource rights",
      status: "draft",
      lastUpdated: "2024-03-05",
      beneficiaries: 0,
      documents: 5,
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      archived: "bg-gray-100 text-gray-800",
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  return (
    <MobileResponsiveLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Policy Management</h1>
            <p className="text-muted-foreground">Forest rights policies and implementation guidelines</p>
          </div>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            New Policy
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Active Policies</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">15,181</p>
                  <p className="text-sm text-muted-foreground">Total Beneficiaries</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">25</p>
                  <p className="text-sm text-muted-foreground">Policy Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {policies.map((policy) => (
            <Card key={policy.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{policy.title}</CardTitle>
                      <Badge className={getStatusBadge(policy.status)}>{policy.status.toUpperCase()}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">{policy.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Last Updated: {policy.lastUpdated}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>Beneficiaries: {policy.beneficiaries.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span>Documents: {policy.documents}</span>
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
