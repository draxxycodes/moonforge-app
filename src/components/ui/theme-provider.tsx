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

  // Set dark theme on document element
  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light')
    root.classList.add('dark')
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
