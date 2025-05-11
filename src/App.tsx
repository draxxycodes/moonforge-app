import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ThemeProvider } from "./components/ui/theme-provider"
import { SmoothScrollProvider } from "./components/ui/smooth-scroll-provider"
import { Footer } from "./components/ui/footer"
import { ScrollProgress } from "./components/ui/scroll-progress"
import { PageTransition } from "./components/ui/page-transition"
import { useEffect } from "react"
import { HeroParticles } from "./components/ui/hero-particles"
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

  // Add suppressHydrationWarning to prevent warnings
  useEffect(() => {
    document.documentElement.setAttribute('suppressHydrationWarning', 'true')
  }, [])

  return (
    <ThemeProvider defaultTheme="dark">
      <SmoothScrollProvider>
        <div className="flex min-h-screen flex-col bg-background overflow-hidden">
          <HeroParticles opacity={0.18} />
          <AnimatedDock />
          <main className="flex-1 pt-0">
            <ScrollProgress color="rgba(20, 184, 166, 0.7)" height={3} showPercentage />
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                  <PageTransition>
                    <div className="pt-0">
                      <Home />
                    </div>
                  </PageTransition>
                } />
                <Route path="/marketplace" element={
                  <PageTransition>
                    <div className="pt-0">
                      <Marketplace />
                    </div>
                  </PageTransition>
                } />
                <Route path="/dashboard" element={
                  <PageTransition>
                    <div className="pt-0">
                      <Dashboard />
                    </div>
                  </PageTransition>
                } />
                <Route path="/rewards" element={
                  <PageTransition>
                    <div className="pt-0">
                      <Rewards />
                    </div>
                  </PageTransition>
                } />
                <Route path="/dex-integration" element={
                  <PageTransition>
                    <div className="pt-0">
                      <DexIntegration />
                    </div>
                  </PageTransition>
                } />
                <Route path="/admin" element={
                  <PageTransition>
                    <div className="pt-0">
                      <Admin />
                    </div>
                  </PageTransition>
                } />
                <Route path="/documentation" element={
                  <PageTransition>
                    <div className="pt-0">
                      <Documentation />
                    </div>
                  </PageTransition>
                } />
                <Route path="/tokenomics" element={
                  <PageTransition>
                    <div className="pt-0">
                      <Tokenomics />
                    </div>
                  </PageTransition>
                } />
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
