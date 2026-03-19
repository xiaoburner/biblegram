import React, { useEffect, useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

const MAIN_ITEMS = [
  { label: 'Past Puzzles' },
  { label: 'How to Play'  },
]

export default function Menu({ open, onClose, themeName, onToggleTheme, onResetPuzzle, onSelect }) {
  const { colors } = useTheme()
  const [view, setView] = useState('main') // 'main' | 'settings'
  const [confirmReset, setConfirmReset] = useState(false)

  // Reset to main view when menu closes
  useEffect(() => {
    if (!open) { setView('main'); setConfirmReset(false) }
  }, [open])

  // Lock body scroll while open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.25s ease',
          zIndex: 200,
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
        }}
      />

      {/* Panel — slides in from the right */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: 280,
        background: colors.menuBg,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.28s cubic-bezier(0.32, 0.72, 0, 1)',
        zIndex: 201,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-8px 0 32px rgba(0,0,0,0.2)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 20px 14px',
          borderBottom: `1px solid ${colors.menuBorder}`,
        }}>
          {view === 'settings' ? (
            <button
              onClick={() => setView('main')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'Schoolbell', cursive",
                fontSize: 18,
                fontWeight: 700,
                color: colors.textPrimary,
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              &larr; Settings
            </button>
          ) : (
            <span style={{
              fontFamily: "'Schoolbell', cursive",
              fontSize: 18,
              fontWeight: 700,
              color: colors.textPrimary,
              letterSpacing: 0.5,
            }}>
              Biblegram
            </span>
          )}
          <button
            onClick={onClose}
            style={{
              background: colors.menuClose,
              border: 'none',
              borderRadius: 8,
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              cursor: 'pointer',
              color: colors.menuCloseText,
            }}
          >
            &#x2715;
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
          {view === 'main' ? (
            <>
              {MAIN_ITEMS.map(({ label }) => (
                <button
                  key={label}
                  onClick={() => { onSelect(label); onClose() }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '15px 22px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: "'Schoolbell', cursive",
                    color: colors.menuText,
                    transition: 'background 0.1s',
                  }}
                  onPointerEnter={e => e.currentTarget.style.background = colors.menuHover}
                  onPointerLeave={e => e.currentTarget.style.background = 'none'}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => setView('settings')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px 22px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "'Schoolbell', cursive",
                  color: colors.menuText,
                  transition: 'background 0.1s',
                }}
                onPointerEnter={e => e.currentTarget.style.background = colors.menuHover}
                onPointerLeave={e => e.currentTarget.style.background = 'none'}
              >
                Settings
              </button>
              <button
                onClick={() => { onSelect('About Biblegram'); onClose() }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px 22px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "'Schoolbell', cursive",
                  color: colors.menuText,
                  transition: 'background 0.1s',
                }}
                onPointerEnter={e => e.currentTarget.style.background = colors.menuHover}
                onPointerLeave={e => e.currentTarget.style.background = 'none'}
              >
                About Biblegram
              </button>
              <button
                onClick={() => { onSelect('Visit Us'); onClose() }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px 22px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "'Schoolbell', cursive",
                  color: colors.menuText,
                  transition: 'background 0.1s',
                }}
                onPointerEnter={e => e.currentTarget.style.background = colors.menuHover}
                onPointerLeave={e => e.currentTarget.style.background = 'none'}
              >
                Visit Us
              </button>
            </>
          ) : (
            /* Settings view */
            <div style={{ padding: '8px 0' }}>
              {/* Theme toggle row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '15px 22px',
              }}>
                <span style={{
                  fontFamily: "'Schoolbell', cursive",
                  fontSize: 16,
                  fontWeight: 700,
                  color: colors.menuText,
                }}>
                  Dark mode
                </span>
                {/* Toggle pill */}
                <div
                  onClick={onToggleTheme}
                  style={{
                    width: 48,
                    height: 28,
                    borderRadius: 99,
                    background: themeName === 'dark' ? colors.accent : colors.border,
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 3,
                    left: themeName === 'dark' ? 23 : 3,
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: '#ffffff',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
                  }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reset Puzzle — tap once to arm, tap again to confirm */}
        {view === 'main' && (
          <button
            onClick={() => {
              if (confirmReset) {
                onResetPuzzle()
                onClose()
              } else {
                setConfirmReset(true)
              }
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              padding: '14px 22px',
              background: confirmReset ? 'rgba(239,68,68,0.12)' : 'none',
              border: 'none',
              borderTop: `1px solid ${colors.menuBorder}`,
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "'Schoolbell', cursive",
              color: confirmReset ? '#EF4444' : colors.textMuted,
              transition: 'background 0.1s, color 0.1s',
              flexShrink: 0,
            }}
          >
            {confirmReset ? 'Tap again to confirm reset' : 'Reset Puzzle'}
          </button>
        )}

        {/* Footer */}
        <div style={{
          padding: '14px 22px',
          borderTop: `1px solid ${colors.menuBorder}`,
          fontSize: 12,
          color: colors.menuFooter,
          fontWeight: 600,
        }}>
          Built for curious minds
        </div>
      </div>
    </>
  )
}
