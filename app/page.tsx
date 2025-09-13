import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Shield,
  Users,
  MapPin,
  BarChart3,
  Leaf,
  Globe,
  Mail,
  Phone,
  MapIcon,
  Twitter,
  Linkedin,
  Github,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Subtle animated green gradient overlay */}
      <div className="fixed inset-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-transparent to-green-100 animate-pulse"></div>
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-60 animate-bounce"
          style={{ animationDuration: "6s" }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-80 h-80 bg-green-300 rounded-full blur-3xl opacity-55 animate-bounce"
          style={{ animationDuration: "8s", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-50 animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Vana<span className="text-green-600">मित्र</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-green-600 transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-green-600 transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-green-600 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-gray-600 hover:text-green-600">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="py-20 px-4 relative bg-gradient-to-br from-green-100 via-white to-green-200">
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <Badge className="mb-4 bg-green-50 text-green-700 border-green-200" variant="secondary">
            Forest Friend • वनमित्र
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 text-gray-900">
            Empowering{" "}
            <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
              Forest Rights
            </span>{" "}
            Through Data-Driven Governance
          </h1>
          <p className="text-xl text-gray-600 text-pretty mb-8 max-w-2xl mx-auto">
            Vanamitra is a comprehensive analytics platform for tribal welfare, forest rights management, and
            transparent governance. Built for professionals, policymakers, and communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white">
                Access Dashboard
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
              >
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Comprehensive Forest Rights Management
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced analytics and real-time insights for effective tribal welfare and forest conservation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">Claims Processing</CardTitle>
                <CardDescription className="text-gray-600">
                  Streamlined FRA claims tracking with real-time status updates and automated workflows
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">Interactive Mapping</CardTitle>
                <CardDescription className="text-gray-600">
                  WebGIS integration for forest area visualization, land use analysis, and spatial planning
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">Analytics Dashboard</CardTitle>
                <CardDescription className="text-gray-600">
                  Comprehensive data visualization with beneficiary analytics and scheme performance metrics
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">Beneficiary Management</CardTitle>
                <CardDescription className="text-gray-600">
                  Complete beneficiary lifecycle management with demographic analysis and welfare tracking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">AI Insights</CardTitle>
                <CardDescription className="text-gray-600">
                  Machine learning powered insights for policy recommendations and trend analysis
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-gray-900">Real-time Monitoring</CardTitle>
                <CardDescription className="text-gray-600">
                  Live status feeds and notifications for immediate response to critical updates
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">2.5M+</div>
              <div className="text-gray-600">Claims Processed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">850K</div>
              <div className="text-gray-600">Beneficiaries</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">15</div>
              <div className="text-gray-600">States Covered</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-green-50 to-green-100 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Ready to Transform Forest Governance?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of officials, NGOs, and communities using Vanamitra for transparent, data-driven forest
            rights management.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              Start Your Journey
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="py-16 px-4 border-t bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">
                  Vana<span className="text-green-600">मित्र</span>
                </span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Empowering forest rights through data-driven governance and transparent analytics. Building bridges
                between technology and tribal welfare.
              </p>

              {/* Newsletter Signup */}
              <div className="space-y-3">
                <h4 className="font-semibold">Stay Updated</h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-sm text-white placeholder-gray-400"
                  />
                  <Button size="sm" className="bg-green-600 border-0">
                    Subscribe
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3">Follow Us</h4>
                <div className="flex space-x-3">
                  <Link
                    href="#"
                    className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </Link>
                  <Link
                    href="#"
                    className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </Link>
                  <Link
                    href="#"
                    className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </Link>
                  <Link
                    href="#"
                    className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </Link>
                  <Link
                    href="#"
                    className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                  >
                    <Youtube className="w-4 h-4" />
                  </Link>
                  <Link
                    href="#"
                    className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/map" className="hover:text-white transition-colors">
                    Interactive Map
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/claims" className="hover:text-white transition-colors">
                    Claims Management
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/beneficiaries" className="hover:text-white transition-colors">
                    Beneficiaries
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/reports" className="hover:text-white transition-colors">
                    Analytics & Reports
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Community Forum
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Training Materials
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Government</h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Ministry Portal
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FRA Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    State Policies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Tribal Affairs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Forest Department
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Legal */}
            <div>
              <h3 className="font-semibold mb-4">Contact & Legal</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">support@vanamitra.gov.in</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+91-11-2345-6789</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapIcon className="w-4 h-4" />
                  <span className="text-sm">New Delhi, India</span>
                </li>
                <li className="pt-2">
                  <Link href="#" className="hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors text-sm">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-12 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <p className="text-gray-300 text-sm">
                  &copy; 2024 Vanaमित्र. Built for transparent forest governance and tribal welfare.
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="bg-slate-700 px-2 py-1 rounded">ISO 27001 Certified</span>
                  <span className="bg-slate-700 px-2 py-1 rounded">GDPR Compliant</span>
                  <span className="bg-slate-700 px-2 py-1 rounded">Government Approved</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span>Made with 💚 for Forest Communities</span>
                <span>•</span>
                <span>Version 2.1.0</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
