import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

const ROWS = [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['DEL','z','x','c','v','b','n','m','→'],
]

// No correctness colors — we only show:
//   available       — free to assign
//   current-guess   — what the selected cipher char is mapped to
//   other-guess     — taken by a different cipher char (disabled)
//   hint-locked     — used as a hint (disabled)

export default function Keyboard({ guesses, hints, selectedCipherChar, conflictPlains, onKeyPress }) {
  const { colors } = useTheme()
  const hintPlainLetters = new Set(Object.values(hints))

  const currentGuessedPlain = selectedCipherChar ? guesses[selectedCipherChar] : null

  // All plain letters in use by any non-hint cipher char
  const usedPlains = new Set(
    Object.entries(guesses)
      .filter(([cc]) => !(cc in hints))
      .map(([, pl]) => pl)
  )

  function getState(key) {
    if (key === 'DEL' || key === '→') return 'action'
    if (hintPlainLetters.has(key)) return 'hint-locked'
    if (conflictPlains.has(key)) return 'conflict'
    if (key === currentGuessedPlain) return 'current-guess'
    if (usedPlains.has(key)) return 'in-use'
    return 'available'
  }

  const stateStyles = {
    action:          { bg: colors.keyBg,         text: colors.textSecondary,   disabled: false },
    available:       { bg: colors.keyBg,         text: colors.keyText,         disabled: false },
    'current-guess': { bg: colors.accent,        text: '#ffffff',              disabled: false },
    'in-use':        { bg: colors.keyBg,          text: colors.textSecondary,   disabled: false },
    conflict:        { bg: '#EF4444',            text: '#ffffff',              disabled: false },
    'hint-locked':   { bg: colors.keyDisabledBg, text: colors.keyDisabledText, disabled: true  },
  }

  return (
    <div style={{
      flexShrink: 0,
      background: colors.keyboardBg,
      borderTop: `1px solid ${colors.keyboardBorder}`,
      padding: '10px 8px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
    }}>
      {ROWS.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
          {row.map((key) => {
            const state = getState(key)
            const { bg, text, disabled } = stateStyles[state]
            const isWide = key === 'DEL' || key === '→'
            const isSingleChar = key.length === 1

            return (
              <button
                key={key}
                onPointerDown={(e) => {
                  e.preventDefault()
                  if (!disabled) onKeyPress(key)
                }}
                style={{
                  flex: isWide ? 1.5 : 1,
                  maxWidth: isWide ? 58 : 40,
                  minWidth: isWide ? 44 : 28,
                  height: 52,
                  borderRadius: 9,
                  background: bg,
                  color: text,
                  fontSize: isSingleChar ? 17 : 12,
                  fontWeight: 800,
                  border: 'none',
                  cursor: disabled ? 'default' : 'pointer',
                  opacity: disabled ? 0.6 : 1,
                  touchAction: 'manipulation',
                  transition: 'background 0.12s ease, opacity 0.12s ease',
                  textTransform: isSingleChar ? 'uppercase' : 'none',
                  fontFamily: "'Schoolbell', cursive",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  WebkitTapHighlightColor: 'transparent',
                  boxShadow: state === 'current-guess'
                    ? `0 2px 8px ${colors.accent}66`
                    : 'none',
                }}
              >
                {key}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
