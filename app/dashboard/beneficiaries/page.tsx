"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Search, Download, Eye, Edit, UserPlus } from "lucide-react"
import { MobileResponsiveLayout } from "@/components/mobile-responsive-layout"

export default function BeneficiariesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const beneficiariesData = [
    {
      id: "BEN001",
      name: "Ravi Kumar",
      village: "Koraput Village",
      category: "OTFD",
      schemes: 3,
      amount: 45000,
      status: "active",
    },
    {
      id: "BEN002",
      name: "Sunita Devi",
      village: "Rayagada Village",
      category: "CFR",
      schemes: 2,
      amount: 32000,
      status: "active",
    },
    {
      id: "BEN003",
      name: "Mohan Singh",
      village: "Kalahandi Village",
      category: "IFR",
      schemes: 4,
      amount: 67000,
      status: "inactive",
    },
    {
      id: "BEN004",
      name: "Priya Sharma",
      village: "Malkangiri Village",
      category: "OTFD",
      schemes: 1,
      amount: 18000,
      status: "active",
    },
    {
      id: "BEN005",
      name: "Amit Patel",
      village: "Ganjam Village",
      category: "CFR",
      schemes: 3,
      amount: 54000,
      status: "pending",
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      inactive: "bg-red-100 text-red-800",
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getCategoryBadge = (category: string) => {
    const variants = {
      IFR: "bg-blue-100 text-blue-800",
      CFR: "bg-purple-100 text-purple-800",
      OTFD: "bg-orange-100 text-orange-800",
    }
    return variants[category as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const filteredBeneficiaries = beneficiariesData.filter((beneficiary) => {
    const matchesSearch =
      beneficiary.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beneficiary.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beneficiary.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || beneficiary.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <MobileResponsiveLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Beneficiary Management</h1>
            <p className="text-muted-foreground">Track and manage scheme beneficiaries</p>
          </div>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Beneficiary
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">8,947</p>
                  <p className="text-sm text-muted-foreground">Total Beneficiaries</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-2xl font-bold">7,234</p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="text-2xl font-bold">1,456</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-2xl font-bold">₹2.4Cr</p>
                  <p className="text-sm text-muted-foreground">Total Disbursed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Beneficiaries Database</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search beneficiaries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="IFR">IFR</SelectItem>
                    <SelectItem value="CFR">CFR</SelectItem>
                    <SelectItem value="OTFD">OTFD</SelectItem>
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
                  <TableHead>Beneficiary ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Village</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Schemes</TableHead>
                  <TableHead>Amount (₹)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBeneficiaries.map((beneficiary) => (
                  <TableRow key={beneficiary.id}>
                    <TableCell className="font-medium">{beneficiary.id}</TableCell>
                    <TableCell>{beneficiary.name}</TableCell>
                    <TableCell>{beneficiary.village}</TableCell>
                    <TableCell>
                      <Badge className={getCategoryBadge(beneficiary.category)}>{beneficiary.category}</Badge>
                    </TableCell>
                    <TableCell>{beneficiary.schemes}</TableCell>
                    <TableCell>₹{beneficiary.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(beneficiary.status)}>{beneficiary.status.toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
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
