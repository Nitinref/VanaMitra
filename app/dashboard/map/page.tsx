"use client"

import { InteractiveMap } from "@/components/interactive-map"
import { MobileResponsiveLayout } from "@/components/mobile-responsive-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Layers, Navigation, TreePine, Maximize2, Minimize2 } from "lucide-react"
import { useState } from "react"

export default function MapPage() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur-sm">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Vanamitra - Full Screen</h1>
              <p className="text-sm text-muted-foreground">Interactive tribal land mapping system</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(false)}
              className="flex items-center gap-2"
            >
              <Minimize2 className="w-4 h-4" />
              Exit Fullscreen
            </Button>
          </div>
          <div className="flex-1">
            <InteractiveMap isFullscreen={true} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <MobileResponsiveLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Geographic Information System</h1>
            <p className="text-muted-foreground">Interactive mapping and spatial analysis for forest rights</p>
          </div>
          <Button variant="outline" onClick={() => setIsFullscreen(true)} className="flex items-center gap-2">
            <Maximize2 className="w-4 h-4" />
            Fullscreen
          </Button>
        </div>

        <div className="w-full">
          <InteractiveMap isFullscreen={false} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layers className="w-5 h-5" />
                <span>Map Statistics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Area Mapped</span>
                <Badge variant="secondary">45,230 ha</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Layers</span>
                <Badge variant="secondary">8</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tribal Villages</span>
                <Badge variant="secondary">156</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Updated</span>
                <Badge variant="outline">2 hours ago</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Navigation className="w-5 h-5" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <button className="w-full text-left p-2 rounded hover:bg-muted transition-colors">
                <div className="font-medium">Measure Distance</div>
                <div className="text-sm text-muted-foreground">Calculate distances on map</div>
              </button>
              <button className="w-full text-left p-2 rounded hover:bg-muted transition-colors">
                <div className="font-medium">Area Calculator</div>
                <div className="text-sm text-muted-foreground">Measure polygon areas</div>
              </button>
              <button className="w-full text-left p-2 rounded hover:bg-muted transition-colors">
                <div className="font-medium">Export Data</div>
                <div className="text-sm text-muted-foreground">Download map layers</div>
              </button>
              <button className="w-full text-left p-2 rounded hover:bg-muted transition-colors">
                <div className="font-medium">Print Map</div>
                <div className="text-sm text-muted-foreground">Generate printable maps</div>
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TreePine className="w-5 h-5" />
                <span>Layer Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <div className="font-medium">Tribal Lands</div>
                <div className="text-muted-foreground">Community & individual forest rights</div>
              </div>
              <div>
                <div className="font-medium">Water Bodies</div>
                <div className="text-muted-foreground">Rivers, ponds, and irrigation tanks</div>
              </div>
              <div>
                <div className="font-medium">Forest Coverage</div>
                <div className="text-muted-foreground">Reserved, protected & community forests</div>
              </div>
              <div>
                <div className="font-medium">Claims Data</div>
                <div className="text-muted-foreground">FRA claims with status and boundaries</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MobileResponsiveLayout>
  )
}
