import React, { useEffect, useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { chapters as CHAPTER_DATA } from '../data/chapters'

export default function BibleChapter({ open, onClose, book, chapter }) {
  const { colors } = useTheme()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setVisible(true), 30)
      return () => clearTimeout(t)
    } else {
      setVisible(false)
    }
  }, [open])

  if (!open && !visible) return null

  const key = `${book}-${chapter}`
  const verses = CHAPTER_DATA[key] || []

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 300,
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: colors.winBg,
          borderRadius: '24px 24px 0 0',
          width: '100%',
          maxWidth: 560,
          maxHeight: '88dvh',
          display: 'flex',
          flexDirection: 'column',
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.3)',
        }}
      >
        {/* Handle */}
        <div style={{
          width: 36, height: 4,
          background: colors.winHandle,
          borderRadius: 99,
          margin: '20px auto 0',
          flexShrink: 0,
        }} />

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px 12px',
          borderBottom: `1px solid ${colors.border}`,
          flexShrink: 0,
        }}>
          <div>
            <div style={{
              fontFamily: "'Schoolbell', cursive",
              fontSize: 22,
              fontWeight: 700,
              color: colors.textPrimary,
            }}>
              {book} {chapter}
            </div>
            <div style={{
              fontFamily: "'Schoolbell', cursive",
              fontSize: 12,
              color: colors.textSecondary,
              marginTop: 2,
            }}>
              New International Version
            </div>
          </div>
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
            }}
          >
            &#x2715;
          </button>
        </div>

        {/* Verses */}
        <div style={{ overflowY: 'auto', padding: '16px 24px 40px' }}>
          {verses.length === 0 ? (
            <div style={{
              fontFamily: "'Schoolbell', cursive",
              fontSize: 15,
              color: colors.textSecondary,
              textAlign: 'center',
              padding: '40px 0',
            }}>
              Chapter not available.
            </div>
          ) : verses.map(v => (
            <div
              key={v.verse}
              style={{
                display: 'flex',
                gap: 10,
                marginBottom: 12,
                alignItems: 'flex-start',
              }}
            >
              <span style={{
                fontFamily: "'Schoolbell', cursive",
                fontSize: 11,
                fontWeight: 700,
                color: colors.accent,
                minWidth: 20,
                paddingTop: 3,
                textAlign: 'right',
                flexShrink: 0,
              }}>
                {v.verse}
              </span>
              <span style={{
                fontFamily: "'Schoolbell', cursive",
                fontSize: 15,
                color: colors.textPrimary,
                lineHeight: 1.7,
              }}>
                {v.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
