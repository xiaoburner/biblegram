import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

// No correctness feedback during gameplay.
// States: empty | selected | hint | filled (neutral)
// Chalkboard style: letter above an underline, no box

export default function LetterCell({ cipherChar, guessedChar, isHint, isSelected, isConflict, onClick }) {
  const { colors } = useTheme()

  let lineColor = colors.cellEmpty
  let bg        = 'transparent'
  let textColor = colors.cellText

  if (isConflict) {
    lineColor = '#EF4444'
    bg        = 'rgba(239,68,68,0.12)'
    textColor = '#EF4444'
  } else if (isSelected) {
    lineColor = colors.accent
    bg        = colors.accentBg
    textColor = colors.accentSoft
  } else if (isHint) {
    lineColor = 'transparent'
    textColor = colors.cellHintText
  } else if (guessedChar) {
    lineColor = colors.cellFilled
    textColor = colors.cellText
  }

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        cursor: isHint ? 'default' : 'pointer',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* Letter area — sits above the underline */}
      <div style={{
        width: 24,
        height: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: bg,
        borderRadius: 4,
        borderBottom: `2px solid ${lineColor}`,
        fontFamily: "'Schoolbell', cursive",
        fontSize: 18,
        color: textColor,
        textTransform: 'uppercase',
        transition: 'border-color 0.12s ease, background 0.12s ease, color 0.12s ease',
      }}>
        {guessedChar || ''}
      </div>

      {/* Cipher letter — hidden for hints; spacer keeps row alignment */}
      <div style={{ height: 12, display: 'flex', alignItems: 'center' }}>
        {!isHint && (
          <span style={{
            fontSize: 12,
            fontWeight: 700,
            color: colors.cipherLabel,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            lineHeight: 1,
          }}>
            {cipherChar}
          </span>
        )}
      </div>
    </div>
  )
}
