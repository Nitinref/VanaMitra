"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Search, Download, Eye, Edit, Trash2 } from "lucide-react"
import { MobileResponsiveLayout } from "@/components/mobile-responsive-layout"

export default function ClaimsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const claimsData = [
    {
      id: "FRA001",
      claimant: "Ravi Kumar",
      village: "Koraput Village",
      area: 12.5,
      status: "approved",
      date: "2024-01-15",
      officer: "Dr. Sharma",
    },
    {
      id: "FRA002",
      claimant: "Sunita Devi",
      village: "Rayagada Village",
      area: 8.3,
      status: "pending",
      date: "2024-02-20",
      officer: "Mr. Patel",
    },
    {
      id: "FRA003",
      claimant: "Mohan Singh",
      village: "Kalahandi Village",
      area: 15.2,
      status: "rejected",
      date: "2024-01-08",
      officer: "Ms. Nayak",
    },
    {
      id: "FRA004",
      claimant: "Priya Sharma",
      village: "Malkangiri Village",
      area: 22.1,
      status: "approved",
      date: "2024-03-05",
      officer: "Dr. Sharma",
    },
    {
      id: "FRA005",
      claimant: "Amit Patel",
      village: "Ganjam Village",
      area: 18.7,
      status: "pending",
      date: "2024-02-28",
      officer: "Mr. Singh",
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const filteredClaims = claimsData.filter((claim) => {
    const matchesSearch =
      claim.claimant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <MobileResponsiveLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Claims Management</h1>
            <p className="text-muted-foreground">Manage and track Forest Rights Act claims</p>
          </div>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            New Claim
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-2xl font-bold">8,745</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="text-2xl font-bold">2,456</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div>
                  <p className="text-2xl font-bold">892</p>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-2xl font-bold">12,093</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Claims Database</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search claims..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Claimant</TableHead>
                  <TableHead>Village</TableHead>
                  <TableHead>Area (ha)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Officer</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell className="font-medium">{claim.id}</TableCell>
                    <TableCell>{claim.claimant}</TableCell>
                    <TableCell>{claim.village}</TableCell>
                    <TableCell>{claim.area}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(claim.status)}>{claim.status.toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell>{claim.date}</TableCell>
                    <TableCell>{claim.officer}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MobileResponsiveLayout>
  )
}
