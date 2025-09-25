'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme') as Theme | null
      if (saved === 'dark' || saved === 'light') {
        setTheme(saved)
      } else {
        const prefersDark =
          typeof window !== 'undefined' &&
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        setTheme(prefersDark ? 'dark' : 'light')
      }
    } catch {
      const prefersDark =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    } finally {
      setMounted(true)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* ignore write errors */
    }
    if (theme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [theme, mounted])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
