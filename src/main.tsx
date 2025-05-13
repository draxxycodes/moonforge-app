import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"

// Disable browser's automatic scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Create a utility to force scroll to top on route changes
const triggerScrollToTop = () => {
  const performScroll = () => {
    // Multiple approaches for maximum browser compatibility
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Handle Safari and other problematic browsers
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    // Repeated scrolls for really problematic cases
    const repeatedScrolls = setInterval(() => {
      window.scrollTo(0, 0);
    }, 10);
    
    // Stop the repeated scrolls after a short time
    setTimeout(() => {
      clearInterval(repeatedScrolls);
    }, 100);
  };

  // Run immediately
  performScroll();

  // Override history methods
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function(...args: Parameters<typeof originalPushState>) {
    originalPushState.apply(this, args);
    performScroll();
  };

  history.replaceState = function(...args: Parameters<typeof originalReplaceState>) {
    originalReplaceState.apply(this, args);
    performScroll();
  };

  // Handle back/forward navigation
  window.addEventListener('popstate', performScroll);
  
  // Handle all possible scroll events
  window.addEventListener('scroll', () => {
    // Only reset if we're close to the bottom of a page
    if (window.scrollY > document.body.scrollHeight - window.innerHeight - 100) {
      // Store the current URL to detect navigation
      const currentUrl = window.location.href;
      
      // Set a listener for URL changes
      const checkUrlChange = setInterval(() => {
        if (window.location.href !== currentUrl) {
          performScroll();
          clearInterval(checkUrlChange);
        }
      }, 50);
      
      // Clear the interval after a reasonable time
      setTimeout(() => clearInterval(checkUrlChange), 2000);
    }
  });
};

// Create a MutationObserver to watch for navigation changes
const setupNavigationObserver = () => {
  // Create a MutationObserver to detect DOM changes that might indicate navigation
  const observer = new MutationObserver((mutations) => {
    // Force scroll to top whenever there are significant DOM changes
    window.scrollTo(0, 0);
  });
  
  // Start observing once the DOM is loaded
  window.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { 
      childList: true,
      subtree: true
    });
  });
};

// Trigger the scroll reset handlers
triggerScrollToTop();
setupNavigationObserver();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
