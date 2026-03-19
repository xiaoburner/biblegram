import React, { useEffect, useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

const SERVICES = [
  { day: 'Saturday', time: '4:30 pm – 6:15 pm' },
  { day: 'Sunday',   time: '10:00 am – 11:45 am' },
]

export default function VisitUs({ open, onClose }) {
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
        cursor: 'pointer',
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
          maxHeight: '92dvh',
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
          <div style={{
            fontFamily: "'Schoolbell', cursive",
            fontSize: 22,
            fontWeight: 700,
            color: colors.textPrimary,
          }}>
            Visit Us
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

        {/* Scrollable content */}
        <div style={{ overflowY: 'auto', padding: '20px 24px 40px' }}>

          {/* Church intro */}
          <div style={{
            fontFamily: "'Schoolbell', cursive",
            fontSize: 19,
            fontWeight: 700,
            color: colors.textPrimary,
            marginBottom: 4,
          }}>
            Chapel of the Resurrection
          </div>
          <div style={{
            fontFamily: "'Schoolbell', cursive",
            fontSize: 14,
            color: colors.textSecondary,
            marginBottom: 16,
          }}>
            Anglican Church &middot; Singapore
          </div>

          <p style={{
            fontFamily: "'Schoolbell', cursive",
            fontSize: 15,
            color: colors.textSecondary,
            lineHeight: 1.65,
            margin: '0 0 20px',
          }}>
            Biblegram is made with love by the community at Chapel of the Resurrection.
            We are an Anglican congregation in Singapore passionate about Scripture, worship, and welcoming all who seek.
            Come as you are — you belong here.
          </p>

          {/* Service times */}
          <div style={{
            background: colors.winCardBg,
            borderRadius: 14,
            padding: '16px 20px',
            borderLeft: `4px solid ${colors.accent}`,
            marginBottom: 20,
          }}>
            <div style={{
              fontFamily: "'Schoolbell', cursive",
              fontSize: 15,
              fontWeight: 700,
              color: colors.accent,
              marginBottom: 12,
              letterSpacing: 0.4,
            }}>
              Service Times
            </div>
            {SERVICES.map(({ day, time }) => (
              <div
                key={day}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: 10,
                  marginBottom: 10,
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                <div style={{
                  fontFamily: "'Schoolbell', cursive",
                  fontSize: 15,
                  fontWeight: 700,
                  color: colors.textPrimary,
                }}>
                  {day}
                </div>
                <div style={{
                  fontFamily: "'Schoolbell', cursive",
                  fontSize: 15,
                  color: colors.textSecondary,
                }}>
                  {time}
                </div>
              </div>
            ))}
            <p style={{
              fontFamily: "'Schoolbell', cursive",
              fontSize: 13,
              color: colors.textSecondary,
              margin: 0,
              lineHeight: 1.5,
            }}>
              First time? Just show up — our team will be glad to welcome you.
            </p>
          </div>

          {/* Map */}
          <div style={{
            borderRadius: 14,
            overflow: 'hidden',
            marginBottom: 16,
            border: `1px solid ${colors.border}`,
          }}>
            <iframe
              title="Chapel of the Resurrection"
              src="https://maps.google.com/maps?q=Chapel+of+the+Resurrection+Singapore&output=embed"
              width="100%"
              height="220"
              style={{ border: 'none', display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Directions button */}
          <a
            href="https://maps.google.com/?q=Chapel+of+the+Resurrection+Singapore"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '13px 20px',
              borderRadius: 12,
              background: colors.accent,
              color: '#ffffff',
              fontFamily: "'Schoolbell', cursive",
              fontSize: 16,
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: 0.3,
            }}
          >
            Get Directions
          </a>

        </div>
      </div>
    </div>
  )
}
