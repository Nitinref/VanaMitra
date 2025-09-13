export function DashboardFooter() {
  return (
    <footer className="bg-card border-t border-border px-6 py-4 mt-8">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>© 2024 Vanamitra</span>
          <span>•</span>
          <span>Ministry of Tribal Affairs, Government of India</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Version 3.0.0</span>
          <span>•</span>
          <a href="#" className="hover:text-foreground transition-colors">
            Help & Support
          </a>
          <span>•</span>
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  )
}
