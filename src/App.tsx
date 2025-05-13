import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Footer } from "./components/ui/footer"
import { ScrollProgress } from "./components/ui/scroll-progress"
import { useEffect, useLayoutEffect, useRef } from "react"
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

// Absolute nuclear solution to force scroll position reset
function NuclearScrollToTop() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const initialized = useRef(false);
  const lastPathname = useRef(pathname);

  // Nuclear option: When route changes, reload the page
  useEffect(() => {
    if (initialized.current && lastPathname.current !== pathname) {
      // Block scroll restoration
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      // Store the current pathname
      lastPathname.current = pathname;
      
      // Force the scroll immediately
      window.scrollTo(0, 0);
      
      // Ultra aggressive approach for severe cases:
      // Reload the page whenever path changes
      // This is extreme but guarantees a reset
      if (pathname === '/dex-integration' || pathname === '/') {
        const currentPath = pathname;
        
        // Add a tiny hash to trigger navigation without actual reload
        navigate(`${currentPath}#reset`, { replace: true });
        
        // Then immediately remove the hash
        setTimeout(() => {
          navigate(currentPath, { replace: true });
          
          // Triple make sure we're at the top
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }, 0);
      }
    }
    
    // Mark as initialized after first run
    initialized.current = true;
    
    // Nuclear force scroll approach with multiple attempts
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // More nuclear approaches
    const scrollInterval = setInterval(() => {
      window.scrollTo(0, 0);
    }, 10);
    
    // Clear interval after 100ms
    setTimeout(() => clearInterval(scrollInterval), 100);
  }, [pathname, navigate]);

  return null;
}

// Create a ScrollToTop component to ensure scrolling works properly
function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathRef = useRef("");

  // Using both useLayoutEffect and useEffect for maximum coverage
  // useLayoutEffect runs synchronously before browser paint
  useLayoutEffect(() => {
    if (prevPathRef.current !== pathname) {
      // High-priority immediate scroll reset
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Store current path
      prevPathRef.current = pathname;
    }
  }, [pathname]);
  
  // useEffect as a backup, runs asynchronously after render
  useEffect(() => {
    // Run immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Run after first paint
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
    
    // Run with a small delay to catch any edge cases
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
    }, 50);
    
    // Run with special consideration for the DEX page
    if (pathname === "/dex-integration") {
      // Extra measures for the DEX page
      setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 100);
    }
  }, [pathname]);
  
  return null;
}

function App() {
  const location = useLocation();

  // Use both approaches for maximum compatibility
  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    window.scrollTo(0, 0);
    
    // Add class to ensure body is visible
    document.body.classList.add('visible');
    document.body.style.backgroundColor = '#030711'; // Explicit dark background color
    
    // Special handling for DEX page
    if (location.pathname === "/dex-integration") {
      // Force multiple scroll resets for the DEX page
      setTimeout(() => window.scrollTo(0, 0), 0);
      setTimeout(() => window.scrollTo(0, 0), 50);
      setTimeout(() => window.scrollTo(0, 0), 150);
    }
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#030711] text-white">
        <ScrollToTop />
        <NuclearScrollToTop />
        <AnimatedDock />
        <ScrollProgress color="rgba(20, 184, 166, 0.7)" height={3} showPercentage={false} />
        <main className="pt-0"> {/* Removed padding top */}
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
  );
}

export default App;
