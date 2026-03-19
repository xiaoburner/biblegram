import React, { useEffect, useState, useMemo } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { puzzles } from '../data/puzzles'
import { puzzleIdForDay } from '../utils/dayUtils'
import { buildCorrectMapping, buildInitialGuesses, checkWin } from '../utils/cipher'

const STORAGE_KEY = 'biblegram2026_state'

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

function getDayStatus(dayNumber) {
  const saved = loadSavedState()
  const puzzleId = puzzleIdForDay(dayNumber)
  const puzzle = puzzles[puzzleId]
  if (!puzzle) return 'untouched'

  const correctMapping = buildCorrectMapping(puzzle.ciphersequence)
  const base    = buildInitialGuesses(puzzle.hints)
  const merged  = { ...base, ...(saved[dayNumber] || {}) }

  if (checkWin(puzzle.cipher, merged, correctMapping)) return 'solved'
  if (Object.keys(saved[dayNumber] || {}).length > 0) return 'started'
  return 'untouched'
}

export default function PastPuzzles({ open, onClose, currentDay, latestDay, onSelectDay }) {
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

  // Build status for every available day
  const days = useMemo(() => {
    if (!open) return []
    return Array.from({ length: latestDay }, (_, i) => {
      const day = i + 1
      const puzzleId = puzzleIdForDay(day)
      const puzzle = puzzles[puzzleId]
      return {
        day,
        topic: puzzle?.topic || '',
        ref: puzzle ? `${puzzle.book.split(' ').pop()} ${puzzle.chapter}:${puzzle.verse}` : '',
        status: getDayStatus(day),
        isCurrent: day === currentDay,
      }
    }).reverse() // most recent first
  }, [open, latestDay, currentDay])

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
          borderBottom: `1px solid ${colors.border}`,
        }}>
          <div style={{
            fontFamily: "'Schoolbell', cursive",
            fontSize: 22,
            fontWeight: 700,
            color: colors.textPrimary,
          }}>
            Past Puzzles
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

        {/* Legend */}
        <div style={{
          display: 'flex',
          gap: 16,
          padding: '10px 24px',
          flexShrink: 0,
          borderBottom: `1px solid ${colors.border}`,
        }}>
          {[
            { color: colors.accent, label: 'Solved' },
            { color: colors.border, label: 'Started', outline: true },
            { color: colors.border, label: 'Not started' },
          ].map(({ color, label, outline }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 14, height: 14, borderRadius: '50%',
                background: outline ? 'transparent' : color,
                border: `2px solid ${color}`,
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "'Schoolbell', cursive",
                fontSize: 12,
                color: colors.textSecondary,
              }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div style={{ overflowY: 'auto', padding: '16px 20px 40px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
            gap: 10,
          }}>
            {days.map(({ day, topic, ref, status, isCurrent }) => {
              const isSolved  = status === 'solved'
              const isStarted = status === 'started'

              const bg = isSolved
                ? colors.accent
                : isCurrent
                  ? colors.accentBg
                  : colors.surface

              const borderColor = isSolved
                ? colors.accent
                : isCurrent || isStarted
                  ? colors.accent
                  : colors.border

              const textColor = isSolved
                ? '#ffffff'
                : isCurrent
                  ? colors.accentSoft
                  : colors.textPrimary

              const subColor = isSolved
                ? 'rgba(255,255,255,0.7)'
                : colors.textSecondary

              return (
                <button
                  key={day}
                  onClick={() => { onSelectDay(day); onClose() }}
                  style={{
                    background: bg,
                    border: `2px solid ${borderColor}`,
                    borderRadius: 14,
                    padding: '12px 10px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                    transition: 'opacity 0.1s',
                  }}
                >
                  <div style={{
                    fontFamily: "'Schoolbell', cursive",
                    fontSize: 18,
                    fontWeight: 700,
                    color: textColor,
                    lineHeight: 1,
                    marginBottom: 4,
                  }}>
                    Day {day}
                  </div>
                  <div style={{
                    fontFamily: "'Schoolbell', cursive",
                    fontSize: 11,
                    color: subColor,
                    lineHeight: 1.3,
                  }}>
                    {topic}
                  </div>
                  <div style={{
                    fontFamily: "'Schoolbell', cursive",
                    fontSize: 10,
                    color: subColor,
                    lineHeight: 1.3,
                    marginTop: 2,
                    opacity: 0.8,
                  }}>
                    {ref}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
