"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Map, Search, Download, Eye, Edit, MapPin, Home, TreePine } from "lucide-react"

export function UserLandTracker() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const userLandData = [
    {
      id: "UL001",
      owner: "Rajesh Kumar",
      surveyNumber: "123/A",
      village: "Koraput Village",
      area: 2.5,
      type: "agricultural",
      status: "titled",
      coordinates: { lat: 20.28, lng: 85.82 },
      documents: 3,
      lastUpdated: "2024-01-15",
    },
    {
      id: "UL002",
      owner: "Meera Devi",
      surveyNumber: "456/B",
      village: "Rayagada Village",
      area: 1.8,
      type: "residential",
      status: "pending",
      coordinates: { lat: 19.87, lng: 85.05 },
      documents: 2,
      lastUpdated: "2024-02-20",
    },
    {
      id: "UL003",
      owner: "Suresh Patel",
      surveyNumber: "789/C",
      village: "Kalahandi Village",
      area: 3.2,
      type: "agricultural",
      status: "titled",
      coordinates: { lat: 20.46, lng: 85.88 },
      documents: 4,
      lastUpdated: "2024-01-08",
    },
    {
      id: "UL004",
      owner: "Anita Singh",
      surveyNumber: "012/D",
      village: "Malkangiri Village",
      area: 0.9,
      type: "residential",
      status: "disputed",
      coordinates: { lat: 19.32, lng: 84.79 },
      documents: 1,
      lastUpdated: "2024-03-05",
    },
    {
      id: "UL005",
      owner: "Prakash Nayak",
      surveyNumber: "345/E",
      village: "Ganjam Village",
      area: 4.1,
      type: "mixed",
      status: "titled",
      coordinates: { lat: 20.12, lng: 85.67 },
      documents: 5,
      lastUpdated: "2024-02-28",
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      titled: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      disputed: "bg-red-100 text-red-800",
      verified: "bg-blue-100 text-blue-800",
    }
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getTypeBadge = (type: string) => {
    const variants = {
      agricultural: "bg-green-100 text-green-800",
      residential: "bg-blue-100 text-blue-800",
      commercial: "bg-purple-100 text-purple-800",
      mixed: "bg-orange-100 text-orange-800",
    }
    return variants[type as keyof typeof variants] || "bg-gray-100 text-gray-800"
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "agricultural":
        return <TreePine className="w-4 h-4 text-green-600" />
      case "residential":
        return <Home className="w-4 h-4 text-blue-600" />
      case "commercial":
        return <Map className="w-4 h-4 text-purple-600" />
      case "mixed":
        return <MapPin className="w-4 h-4 text-orange-600" />
      default:
        return <Map className="w-4 h-4 text-gray-600" />
    }
  }

  const filteredLandData = userLandData.filter((land) => {
    const matchesSearch =
      land.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      land.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      land.surveyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      land.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || land.status === statusFilter
    const matchesType = typeFilter === "all" || land.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const totalArea = userLandData.reduce((sum, land) => sum + land.area, 0)
  const titledCount = userLandData.filter((land) => land.status === "titled").length
  const pendingCount = userLandData.filter((land) => land.status === "pending").length
  const disputedCount = userLandData.filter((land) => land.status === "disputed").length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Map className="w-5 h-5 text-primary" />
            <span>User Land Holdings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">{userLandData.length}</p>
              <p className="text-sm text-muted-foreground">Total Parcels</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{totalArea.toFixed(1)} ha</p>
              <p className="text-sm text-muted-foreground">Total Area</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{titledCount}</p>
              <p className="text-sm text-muted-foreground">Titled</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{pendingCount + disputedCount}</p>
              <p className="text-sm text-muted-foreground">Pending/Disputed</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search land records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="titled">Titled</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="disputed">Disputed</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="agricultural">Agricultural</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Land ID</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Survey No.</TableHead>
                <TableHead>Village</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Area (ha)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLandData.map((land) => (
                <TableRow key={land.id}>
                  <TableCell className="font-medium">{land.id}</TableCell>
                  <TableCell>{land.owner}</TableCell>
                  <TableCell>{land.surveyNumber}</TableCell>
                  <TableCell>{land.village}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(land.type)}
                      <Badge className={getTypeBadge(land.type)}>{land.type.toUpperCase()}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>{land.area}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(land.status)}>{land.status.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{land.documents} docs</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" title="View on Map">
                        <MapPin className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="View Details">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Edit">
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
  )
}
