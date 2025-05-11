import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { ThemeProvider } from "./components/ui/theme-provider"
import { SmoothScrollProvider } from "./components/ui/smooth-scroll-provider"
import { Navbar } from "./components/ui/navbar"
import { Footer } from "./components/ui/footer"
import { ScrollProgress } from "./components/ui/scroll-progress"
import { PageTransition } from "./components/ui/page-transition"
import { useEffect } from "react"
import { HeroParticles } from "./components/ui/hero-particles"

// Pages
import Home from "./pages/Home"
import Marketplace from "./pages/Marketplace"
import Dashboard from "./pages/Dashboard"
import Rewards from "./pages/Rewards"
import DexIntegration from "./pages/DexIntegration"
import Documentation from "./pages/Documentation"
import Tokenomics from "./pages/Tokenomics"
import Admin from "./pages/Admin"

function App() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Add suppressHydrationWarning to prevent warnings
  useEffect(() => {
    document.documentElement.setAttribute('suppressHydrationWarning', 'true')
  }, [])

  return (
    <ThemeProvider defaultTheme="dark">
      <SmoothScrollProvider>
        <div className="flex min-h-screen flex-col bg-background">
          <HeroParticles opacity={0.12} />
          <Navbar />
          <main className="flex-1">
            <ScrollProgress color="rgba(14, 165, 233, 0.7)" height={3} showPercentage />
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/marketplace" element={<PageTransition><Marketplace /></PageTransition>} />
                <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
                <Route path="/rewards" element={<PageTransition><Rewards /></PageTransition>} />
                <Route path="/dex-integration" element={<PageTransition><DexIntegration /></PageTransition>} />
                <Route path="/documentation" element={<PageTransition><Documentation /></PageTransition>} />
                <Route path="/tokenomics" element={<PageTransition><Tokenomics /></PageTransition>} />
                <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </SmoothScrollProvider>
    </ThemeProvider>
  )
}

export default App
