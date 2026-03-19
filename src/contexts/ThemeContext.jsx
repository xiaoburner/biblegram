import React, { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'biblegram2026_theme'

export const themes = {
  dark: {
    appBg:            '#111827',
    surface:          '#1F2937',
    border:           '#374151',
    textPrimary:      '#F9FAFB',
    textSecondary:    '#9CA3AF',
    textMuted:        '#4B5563',
    accent:           '#6366F1',
    accentSoft:       '#818CF8',
    accentBg:         'rgba(99,102,241,0.15)',
    accentPill:       'rgba(99,102,241,0.2)',
    titleBg:          '#111827',
    titleBorder:      'none',
    hamburgerBg:      '#374151',
    hamburgerBars:    '#ffffff',
    refColor:         '#A5B4FC',
    cellEmpty:        '#374151',
    cellFilled:       '#4B5563',
    cellText:         '#F9FAFB',
    cellHintText:     '#D1D5DB',
    cipherLabel:      '#6366F1',
    punctuation:      '#4B5563',
    keyBg:            '#374151',
    keyText:          '#F9FAFB',
    keyDisabledBg:    '#1F2937',
    keyDisabledText:  '#4B5563',
    keyboardBg:       '#1F2937',
    keyboardBorder:   '#374151',
    winBg:            '#1F2937',
    winCardBg:        '#111827',
    winHandle:        '#374151',
    menuBg:           '#1F2937',
    menuBorder:       '#374151',
    menuHover:        '#374151',
    menuText:         '#F9FAFB',
    menuClose:        '#374151',
    menuCloseText:    '#9CA3AF',
    menuFooter:       '#9CA3AF',
  },
  light: {
    appBg:            '#ffffff',
    surface:          '#ffffff',
    border:           '#F1F1F1',
    textPrimary:      '#111827',
    textSecondary:    '#6B7280',
    textMuted:        '#9CA3AF',
    accent:           '#4F46E5',
    accentSoft:       '#4F46E5',
    accentBg:         'rgba(79,70,229,0.08)',
    accentPill:       '#EEF2FF',
    titleBg:          '#ffffff',
    titleBorder:      '1px solid #F1F1F1',
    hamburgerBg:      '#F3F4F6',
    hamburgerBars:    '#374151',
    refColor:         '#4F46E5',
    cellEmpty:        '#D1D5DB',
    cellFilled:       '#9CA3AF',
    cellText:         '#111827',
    cellHintText:     '#1F2937',
    cipherLabel:      '#6366F1',
    punctuation:      '#9CA3AF',
    keyBg:            '#E5E7EB',
    keyText:          '#111827',
    keyDisabledBg:    '#F3F4F6',
    keyDisabledText:  '#9CA3AF',
    keyboardBg:       '#F9FAFB',
    keyboardBorder:   '#F1F1F1',
    winBg:            '#ffffff',
    winCardBg:        '#F9FAFB',
    winHandle:        '#E5E7EB',
    menuBg:           '#ffffff',
    menuBorder:       '#F3F4F6',
    menuHover:        '#F9FAFB',
    menuText:         '#111827',
    menuClose:        '#F3F4F6',
    menuCloseText:    '#6B7280',
    menuFooter:       '#9CA3AF',
  },
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || 'dark' } catch { return 'dark' }
  })

  const toggleTheme = () => {
    setThemeName(t => {
      const next = t === 'dark' ? 'light' : 'dark'
      try { localStorage.setItem(STORAGE_KEY, next) } catch {}
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ themeName, colors: themes[themeName], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
