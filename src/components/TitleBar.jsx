import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

export default function TitleBar({ dayNumber, topic, book, chapter, verse, hints, onMenuOpen, onHintClick }) {
  const { colors } = useTheme()
  const shortBook = book.split(' ').pop()

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      padding: '0 14px',
      height: 72,
      background: colors.titleBg,
      borderBottom: colors.titleBorder,
      flexShrink: 0,
    }}>

      {/* Left — scripture reference (tappable) */}
      <button
        onClick={onHintClick}
        style={{
          flex: 1,
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 1,
        }}
      >
        <span style={{
          fontFamily: "'Schoolbell', cursive",
          fontSize: 13,
          color: colors.refColor,
          lineHeight: 1.3,
        }}>
          hint: {shortBook} {chapter}
        </span>
        <span style={{ fontSize: 14, lineHeight: 1 }}>{'👀'}</span>
      </button>

      {/* Center — absolutely positioned, always truly centered */}
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        <div style={{
          fontFamily: "'Schoolbell', cursive",
          fontSize: 24,
          color: colors.textPrimary,
          letterSpacing: 1,
          lineHeight: 1.1,
          marginBottom: 4,
        }}>
          Biblegram
        </div>
        <div style={{
          fontFamily: "'Schoolbell', cursive",
          fontSize: 13,
          color: colors.textSecondary,
          lineHeight: 1.2,
        }}>
          Day {dayNumber} &middot; {topic}
        </div>
      </div>

      {/* Right — hamburger */}
      <button
        onClick={onMenuOpen}
        style={{
          background: colors.hamburgerBg,
          border: 'none',
          borderRadius: 10,
          width: 40,
          height: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
          cursor: 'pointer',
          touchAction: 'manipulation',
          flexShrink: 0,
        }}
      >
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: 18, height: 2, borderRadius: 2, background: colors.hamburgerBars }} />
        ))}
      </button>

    </div>
  )
}
