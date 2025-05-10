"use client"

import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { CursorProvider } from "./components/providers/cursor-provider"
import { Navbar } from "./components/layout/navbar"
import { Footer } from "./components/layout/footer"
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

  return (
    <CursorProvider>
      <HeroParticles opacity={0.99} />
      <ScrollProgress color="rgba(14, 165, 233, 0.7)" height={3} showPercentage />
      <Navbar />
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/marketplace"
              element={
                <PageTransition>
                  <Marketplace />
                </PageTransition>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PageTransition>
                  <Dashboard />
                </PageTransition>
              }
            />
            <Route
              path="/rewards"
              element={
                <PageTransition>
                  <Rewards />
                </PageTransition>
              }
            />
            <Route
              path="/dex-integration"
              element={
                <PageTransition>
                  <DexIntegration />
                </PageTransition>
              }
            />
            <Route
              path="/documentation"
              element={
                <PageTransition>
                  <Documentation />
                </PageTransition>
              }
            />
            <Route
              path="/tokenomics"
              element={
                <PageTransition>
                  <Tokenomics />
                </PageTransition>
              }
            />
            <Route
              path="/admin"
              element={
                <PageTransition>
                  <Admin />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </CursorProvider>
  )
}

export default App
