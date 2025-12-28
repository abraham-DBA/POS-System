'use client'

import React, { createContext, useContext, useLayoutEffect, useState } from 'react'

const ThemeContext = createContext()

function getInitialTheme() {
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem('theme') || 'dark'
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getInitialTheme)
    const mounted = true

    function applyTheme(newTheme) {
        if (newTheme === 'light') {
            document.documentElement.classList.remove('dark')
        } else {
            document.documentElement.classList.add('dark')
        }
    }

    useLayoutEffect(() => {
        applyTheme(theme)
    }, [theme])

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return context
}
