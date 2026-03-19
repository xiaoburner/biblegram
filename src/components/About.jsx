import React, { useEffect, useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

export default function About({ open, onClose }) {
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
        }} />

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px 12px',
          borderBottom: `1px solid ${colors.border}`,
        }}>
          <div style={{
            fontFamily: "'Schoolbell', cursive",
            fontSize: 22,
            fontWeight: 700,
            color: colors.textPrimary,
          }}>
            About Biblegram
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

        {/* Content */}
        <div style={{ padding: '24px 24px 40px' }}>
          <p style={{
            fontFamily: "'Schoolbell', cursive",
            fontSize: 16,
            color: colors.textSecondary,
            lineHeight: 1.7,
            margin: '0 0 16px',
          }}>
            Biblegram is a daily Bible verse puzzle for curious minds of all ages. Each day a new verse is hidden using a secret code — crack it to reveal the Word.
          </p>
          <p style={{
            fontFamily: "'Schoolbell', cursive",
            fontSize: 16,
            color: colors.textSecondary,
            lineHeight: 1.7,
            margin: '0 0 24px',
          }}>
            Built with love as a tool to help people engage with Scripture in a fun and accessible way.
          </p>
          <div style={{
            background: colors.winCardBg,
            borderRadius: 14,
            padding: '16px 20px',
            borderLeft: `4px solid ${colors.accent}`,
          }}>
            <div style={{
              fontFamily: "'Schoolbell', cursive",
              fontSize: 15,
              fontStyle: 'italic',
              color: colors.textPrimary,
              lineHeight: 1.6,
              marginBottom: 8,
            }}>
              "Your word is a lamp to my feet and a light to my path."
            </div>
            <div style={{
              fontFamily: "'Schoolbell', cursive",
              fontSize: 13,
              fontWeight: 700,
              color: colors.textSecondary,
            }}>
              — Psalm 119:105
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
