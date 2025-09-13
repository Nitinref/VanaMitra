import { DashboardHeader } from "@/components/dashboard-header"
import { MobileResponsiveLayout } from "@/components/mobile-responsive-layout"
import { ClaimsTracker } from "@/components/claims-tracker"
import { InteractiveMap } from "@/components/interactive-map"
import { AIInsights } from "@/components/ai-insights"
import { BeneficiaryAnalytics } from "@/components/beneficiary-analytics"
import { SchemeHeatmap } from "@/components/scheme-heatmap"
import { DashboardFooter } from "@/components/dashboard-footer"
import { UserLandTracker } from "@/components/user-land-tracker"

export default function AranyaAtlasDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <DashboardHeader />
      </div>

      <MobileResponsiveLayout>
        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
            {/* Claims Processing Tracker */}
            <div className="xl:col-span-1">
              <ClaimsTracker />
            </div>

            {/* Interactive Map */}
            <div className="xl:col-span-2">
              <InteractiveMap />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* AI Insights */}
            <AIInsights />

            {/* Beneficiary Analytics */}
            <BeneficiaryAnalytics />
          </div>

          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <UserLandTracker />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
            {/* Scheme Allocation Heatmap */}
            <div className="xl:col-span-2">
              <SchemeHeatmap />
            </div>
          </div>
        </div>
      </MobileResponsiveLayout>

      <div className="no-print">
        <DashboardFooter />
      </div>
    </div>
  )
}
