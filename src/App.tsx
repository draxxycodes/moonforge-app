import { Routes, Route, useLocation } from "react-router-dom"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Footer } from "./components/ui/footer"
import { ScrollProgress } from "./components/ui/scroll-progress"
import { useEffect } from "react"
import AnimatedDock from "./components/ui/animated-dock"

// Pages
import Home from "./pages/Home"
import Marketplace from "./pages/Marketplace"
import Dashboard from "./pages/Dashboard"
import Rewards from "./pages/Rewards"
import DexIntegration from "./pages/DexIntegration"
import Admin from "./pages/Admin"
import Documentation from "./pages/Documentation"
import Tokenomics from "./pages/Tokenomics"

function App() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-background">
          <AnimatedDock />
          <main className="flex-1 pt-0">
          <ScrollProgress color="rgba(20, 184, 166, 0.7)" height={3} showPercentage={false} />
              <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/dex-integration" element={<DexIntegration />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/tokenomics" element={<Tokenomics />} />
              </Routes>
          </main>
          <Footer />
        </div>
    </ThemeProvider>
  )
}

export default App
