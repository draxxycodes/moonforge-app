"use client";

import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { 
  Home, 
  BarChart3, 
  ShoppingBag, 
  Trophy, 
  User, 
  Repeat, 
  Shield,
  Menu,
  Wallet
} from "lucide-react";
import { Button } from "./button";
import { WalletConnectModal } from "./wallet-connect-modal";

export default function AnimatedDock() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  // Handle scroll event - simplified
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Wallet connection handlers
  const handleConnectWallet = () => {
    setIsWalletModalOpen(true);
  };

  const handleWalletConnected = () => {
    setIsConnected(true);
    setIsWalletModalOpen(false);
  };

  // Simplified navigation items
  const navigationItems = [
    {
      icon: Home,
      label: "Home",
      path: "/",
      onClick: () => navigate("/"),
    },
    {
      icon: User,
      label: "Dashboard",
      path: "/dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      icon: ShoppingBag,
      label: "Marketplace",
      path: "/marketplace",
      onClick: () => navigate("/marketplace"),
    },
    {
      icon: Repeat,
      label: "DEX",
      path: "/dex-integration",
      onClick: () => navigate("/dex-integration"),
    },
    {
      icon: Trophy,
      label: "Rewards",
      path: "/rewards",
      onClick: () => navigate("/rewards"),
    },
    {
      icon: Shield,
      label: "Admin",
      path: "/admin",
      onClick: () => navigate("/admin"),
    },
  ];

  return (
    <>
      <div className={`fixed left-0 right-0 top-0 z-50 flex justify-center transition-colors ${
        isScrolled ? "bg-black/50 backdrop-blur-sm" : "bg-transparent"
      }`}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo with MoonForge branding */}
          <Link 
            to="/"
            className="flex items-center gap-3 group"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <div 
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/20 to-purple-500/20 border border-teal-500/30 shadow-md transition-all duration-300 overflow-hidden ${
                isLogoHovered ? "scale-110 border-teal-400/50 shadow-[0_0_15px_rgba(20,184,166,0.5)]" : ""
              }`}
            >
              <img 
                src="/logo.png" 
                alt="MoonForge Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            
            <div className="flex flex-col">
              <span className={`text-xl mokoto-font bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent transition-all duration-300 ${
                isLogoHovered ? "translate-x-1" : ""
              }`}>
              MoonForge
              </span>
              <span className="text-xs text-gray-400 tracking-wide">
                Engage.Earn.Grow
              </span>
            </div>
          </Link>

          {/* Navigation Dock - Hidden on mobile */}
          <div className="hidden md:flex items-center">
            <div className="dock-panel flex flex-row items-center relative static border-0 bg-black/40 backdrop-blur-md px-3 py-2 rounded-full gap-2 shadow-lg border border-white/5">
              {navigationItems.map((item, index) => (
                <div
                  key={index}
                  className={`dock-item group relative cursor-pointer ${
                    hoveredItem === index ? "scale-110" : "scale-100"
                  } ${location.pathname === item.path ? "border-teal-500/40" : "border-transparent"} transition-all duration-300`}
                  style={{
                    width: hoveredItem === index ? "48px" : "40px",
                    height: hoveredItem === index ? "48px" : "40px",
                  }}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => navigate(item.path)}
                >
                  <div className="dock-icon absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center justify-center">
                      <item.icon 
                        className={`${
                          location.pathname === item.path ? "text-teal-400" : "text-gray-400"
                        } group-hover:text-white transition-colors`}
                        size={hoveredItem === index ? 22 : 20}
                      />
                    </div>
                  </div>
                  
                  {/* Tooltip Label */}
                  <div
                    className={`dock-label opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-20`}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Connect Wallet Button - simplified */}
            <div className="hidden md:block">
              {isConnected ? (
                  <Button
                    variant="outline"
                    size="sm"
                  className="border-teal-500/20 bg-teal-500/5 text-white hover:bg-teal-500/10 transition-colors"
                  >
                    <span className="mr-2 h-2 w-2 rounded-full bg-teal-500" />
                    0x71C7...976F
                  </Button>
              ) : (
                  <Button
                    variant="outline"
                    size="sm"
                  className="gap-2 border-teal-500/20 bg-teal-500/5 text-white hover:bg-teal-500/10 transition-colors"
                    onClick={handleConnectWallet}
                  >
                    <Wallet className="h-4 w-4" />
                    Connect Wallet
                  </Button>
              )}
            </div>
            
            {/* Mobile menu trigger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - simplified */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-[80vw] max-w-[350px] bg-black/90 border-l border-teal-500/20 p-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div 
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/20 to-purple-500/20 border border-teal-500/30 shadow-md"
                >
                  <img 
                    src="/logo.png" 
                    alt="MoonForge Logo" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl mokoto-font bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                    MoonForge
                  </span>
                  <span className="text-xs text-gray-400">
                    SocialFi Platform
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                &times;
              </Button>
            </div>
            <nav className="flex flex-col gap-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path || '#'}
                    onClick={() => {
                      item.onClick?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                      isActive
                        ? "bg-teal-500/10 text-white"
                        : "text-gray-300 hover:text-white hover:bg-teal-500/5 hover:scale-[1.03]"
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <item.icon 
                        className={`${
                          isActive ? "text-teal-400" : "text-gray-400"
                        } h-6 w-6`}
                      />
                    </div>
                    <div>{item.label}</div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnected}
      />
    </>
  );
} 