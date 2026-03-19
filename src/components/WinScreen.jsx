import React, { useEffect, useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

const WIN_ICON = '\u{1F64C}'

export default function WinScreen({ puzzle, dayNumber, isLatest, onClose, onNext }) {
  const { colors } = useTheme()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  const phrase = puzzle.phrase.charAt(0).toUpperCase() + puzzle.phrase.slice(1)

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 100,
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: colors.winBg,
          borderRadius: '24px 24px 0 0',
          width: '100%',
          maxWidth: 560,
          padding: '20px 28px 48px',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.3)',
        }}
      >
        {/* Handle + close row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ width: 34 }} />
          <div style={{
            width: 36, height: 4,
            background: colors.winHandle,
            borderRadius: 99,
          }} />
          <button
            onClick={onClose}
            style={{
              background: colors.menuClose,
              border: 'none',
              borderRadius: 8,
              width: 34, height: 34,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
              cursor: 'pointer',
              color: colors.menuCloseText,
              touchAction: 'manipulation',
              flexShrink: 0,
            }}
          >
            &#x2715;
          </button>
        </div>

        {/* Celebration icon */}
        <div style={{
          fontSize: 56,
          textAlign: 'center',
          marginBottom: 12,
          lineHeight: 1,
        }}>
          {WIN_ICON}
        </div>

        {/* Heading */}
        <div style={{
          textAlign: 'center',
          fontFamily: "'Schoolbell', cursive",
          fontSize: 22,
          fontWeight: 700,
          color: colors.textPrimary,
          marginBottom: 4,
        }}>
          You cracked it!
        </div>

        {/* Topic pill */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{
            background: colors.accentPill,
            color: colors.accentSoft,
            borderRadius: 99,
            padding: '4px 14px',
            fontSize: 12,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}>
            {puzzle.topic}
          </span>
        </div>

        {/* Verse card */}
        <div style={{
          background: colors.winCardBg,
          borderRadius: 16,
          padding: '20px 20px',
          marginBottom: 24,
          borderLeft: `4px solid ${colors.accent}`,
        }}>
          <div style={{
            fontFamily: "'Schoolbell', cursive",
            fontSize: 17,
            fontWeight: 700,
            color: colors.textPrimary,
            lineHeight: 1.6,
            marginBottom: 10,
            fontStyle: 'italic',
          }}>
            "{phrase}"
          </div>
          <div style={{
            fontFamily: "'Schoolbell', cursive",
            fontSize: 13,
            fontWeight: 700,
            color: colors.textSecondary,
          }}>
            — {puzzle.book} {puzzle.chapter}:{puzzle.verse}
          </div>
        </div>

        {/* Next / caught-up */}
        {isLatest ? (
          <div style={{
            textAlign: 'center',
            fontFamily: "'Schoolbell', cursive",
            fontSize: 17,
            color: colors.textMuted,
            padding: '12px 0',
          }}>
            Come back tomorrow for the next puzzle!
          </div>
        ) : (
          <button
            onPointerDown={e => { e.preventDefault(); onNext() }}
            style={{
              width: '100%',
              height: 54,
              background: colors.accent,
              color: '#ffffff',
              fontFamily: "'Schoolbell', cursive",
              fontWeight: 400,
              fontSize: 19,
              borderRadius: 14,
              border: 'none',
              cursor: 'pointer',
              touchAction: 'manipulation',
              boxShadow: `0 4px 16px ${colors.accent}66`,
            }}
          >
            Next Day -&gt;
          </button>
        )}
      </div>
    </div>
  )
}
