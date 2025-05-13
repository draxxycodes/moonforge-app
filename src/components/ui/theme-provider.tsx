import React, { createContext, useContext } from 'react'

type Theme = 'dark'

interface ThemeProviderProps {
  children: React.ReactNode
}

interface ThemeProviderState {
  theme: Theme
}

const initialState: ThemeProviderState = {
  theme: 'dark',
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  // Always use dark theme
  const theme: Theme = 'dark'

  // Set dark theme on document element - improved implementation
  React.useEffect(() => {
    const root = window.document.documentElement
    
    // Remove all possible theme classes first
    root.classList.remove('light', 'dark')
    
    // Add dark theme
    root.classList.add('dark')
    
    // Set a data attribute for CSS targeting
    root.setAttribute('data-theme', 'dark')
    
    // Force a repaint to avoid any flash of unstyled content
    window.requestAnimationFrame(() => {
      document.body.style.transition = 'background-color 0.3s ease'
    })
  }, [])

  const value = {
    theme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
