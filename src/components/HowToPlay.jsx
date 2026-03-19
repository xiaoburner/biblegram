import React, { useEffect, useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

// Mini demo cell — mimics LetterCell visuals without the full component
function DemoCell({ top, bottom, state = 'empty' }) {
  const { colors } = useTheme()

  const styles = {
    empty:    { line: colors.cellEmpty,  bg: 'transparent',            text: colors.cellText,    labelColor: colors.cipherLabel },
    filled:   { line: colors.cellFilled, bg: 'transparent',            text: colors.cellText,    labelColor: colors.cipherLabel },
    selected: { line: colors.accent,     bg: colors.accentBg,          text: colors.accentSoft,  labelColor: colors.cipherLabel },
    hint:     { line: 'transparent',     bg: 'transparent',            text: colors.cellHintText,labelColor: 'transparent'       },
    conflict: { line: '#EF4444',         bg: 'rgba(239,68,68,0.12)',   text: '#EF4444',          labelColor: colors.cipherLabel },
  }
  const s = styles[state] || styles.empty

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <div style={{
        width: 26,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: s.bg,
        borderRadius: 4,
        borderBottom: `2px solid ${s.line}`,
        fontFamily: "'Schoolbell', cursive",
        fontSize: 18,
        color: s.text,
        textTransform: 'uppercase',
      }}>
        {top || ''}
      </div>
      <div style={{ height: 14, display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: s.labelColor, textTransform: 'uppercase' }}>
          {bottom || ''}
        </span>
      </div>
    </div>
  )
}

function DemoWord({ cells }) {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
      {cells.map((c, i) => <DemoCell key={i} {...c} />)}
    </div>
  )
}

function Section({ title, children, colors }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        fontFamily: "'Schoolbell', cursive",
        fontSize: 17,
        fontWeight: 700,
        color: colors.accent,
        marginBottom: 10,
        letterSpacing: 0.5,
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function Body({ children, colors }) {
  return (
    <p style={{
      fontFamily: "'Schoolbell', cursive",
      fontSize: 15,
      color: colors.textSecondary,
      lineHeight: 1.6,
      margin: '0 0 10px',
    }}>
      {children}
    </p>
  )
}

export default function HowToPlay({ open, onClose }) {
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
    <div style={{
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
          flexShrink: 0,
        }}>
          <div style={{
            fontFamily: "'Schoolbell', cursive",
            fontSize: 22,
            fontWeight: 700,
            color: colors.textPrimary,
          }}>
            How to Play
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
        <div style={{ overflowY: 'auto', padding: '4px 24px 40px' }}>

          <Section title="What is Biblegram?" colors={colors}>
            <Body colors={colors}>
              A new Bible verse is hidden every day using a secret code — every letter has been swapped with a different one. Your job is to crack the code and reveal the verse!
            </Body>
          </Section>

          <Section title="You win when..." colors={colors}>
            <Body colors={colors}>
              Every blank is correctly filled in — no conflicts, no empty spaces. A new puzzle drops every day!
            </Body>
          </Section>

          <Section title="The Puzzle Grid" colors={colors}>
            <Body colors={colors}>
              Each blank has a small coloured letter below it. That's the coded letter. The blank above is where you write your guess for what it really is.
            </Body>
            <div style={{
              background: colors.winCardBg,
              borderRadius: 14,
              padding: '16px 20px',
              marginBottom: 10,
            }}>
              <div style={{ marginBottom: 12 }}>
                <DemoWord cells={[
                  { top: '',  bottom: 'x', state: 'empty'    },
                  { top: 'o', bottom: 'q', state: 'filled'   },
                  { top: '',  bottom: 'k', state: 'selected' },
                  { top: '',  bottom: 'e', state: 'empty'    },
                  { top: '',  bottom: 't', state: 'empty'    },
                ]} />
              </div>
              <Body colors={colors}>
                Tap any blank to select it (blue glow), then tap a letter on the keyboard.
              </Body>
            </div>
          </Section>

          <Section title="Conflicts (Red)" colors={colors}>
            <Body colors={colors}>
              In a substitution cipher, each coded letter must map to exactly one real letter. If you accidentally assign the same letter to two different blanks, both turn red. Fix it by picking a different letter for one of them.
            </Body>
            <div style={{
              background: colors.winCardBg,
              borderRadius: 14,
              padding: '16px 20px',
              display: 'flex',
              gap: 28,
              alignItems: 'flex-end',
            }}>
              <DemoWord cells={[
                { top: 'A', bottom: 'x', state: 'conflict' },
                { top: 'A', bottom: 'q', state: 'conflict' },
              ]} />
              <Body colors={colors}>Both 'x' and 'q' can't both be 'A'!</Body>
            </div>
          </Section>

          <Section title="Free Hints" colors={colors}>
            <Body colors={colors}>
              Some letters are already filled in for you at the start — they have no code letter below them. Use them as your starting clues!
            </Body>
            <div style={{
              background: colors.winCardBg,
              borderRadius: 14,
              padding: '16px 20px',
              marginBottom: 10,
              display: 'flex',
              gap: 20,
              alignItems: 'flex-end',
            }}>
              <DemoWord cells={[
                { top: 'T', bottom: '',  state: 'hint'   },
                { top: 'H', bottom: '',  state: 'hint'   },
                { top: 'E', bottom: '',  state: 'hint'   },
              ]} />
              <Body colors={colors}>Free letters — no guessing needed!</Body>
            </div>
          </Section>

          <Section title="Stuck? Reset!" colors={colors}>
            <Body colors={colors}>
              Open the menu (top right) and tap Reset Puzzle to start the puzzle fresh. You'll need to tap twice to confirm.
            </Body>
          </Section>

        </div>
      </div>
    </div>
  )
}
