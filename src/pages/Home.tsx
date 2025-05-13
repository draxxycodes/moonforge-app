import LandingPage from "../components/ui/landing-page"
import { useEffect, useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"

export default function Home() {
  const location = useLocation();

  // Force scroll to top BEFORE the component renders
  useLayoutEffect(() => {
    // First method: immediate scroll before paint
    window.scrollTo(0, 0);
    
    // Second method: handle Safari and mobile browsers
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto' // Use 'auto' for immediate scrolling without animation
      });
    });
    
    // Third method: direct DOM manipulation
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname]);
  
  // Ensure content is visible when this component mounts
  useEffect(() => {
    // First attempt: immediate
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.body.style.backgroundColor = "#030711";
    document.body.classList.add('home-page');
    
    // Second attempt: after a tiny delay
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
    
    // Third attempt: after paint with force reflow
    requestAnimationFrame(() => {
      document.body.style.display = 'none';
      document.body.offsetHeight; // Trigger reflow
      document.body.style.display = '';
      window.scrollTo(0, 0);
    });
    
    // Fourth attempt: after a longer delay
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 100);
    
    // Additional attempts with different delays
    setTimeout(() => window.scrollTo(0, 0), 50);
    setTimeout(() => window.scrollTo(0, 0), 150);
    setTimeout(() => window.scrollTo(0, 0), 300);
    
    return () => {
      document.body.classList.remove('home-page');
    };
  }, []);

  return (
    <div className="bg-[#030711] text-white">
      <LandingPage />
    </div>
  );
} 