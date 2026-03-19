import React, { useRef, useEffect, useState } from 'react'
import LetterCell from './LetterCell'
import { useTheme } from '../contexts/ThemeContext'

const CELL_W   = 24  // px — letter tile width (fixed)
const CELL_GAP = 3   // px — gap between letters within a word
const WORD_GAP = 28  // px — gap between words on the same line

// Split cipher string into array of word arrays, each item is { char, pos }
function parseWords(cipher) {
  const words = []
  let current = []
  let pos = 0
  for (const ch of cipher.toLowerCase()) {
    if (ch === ' ') {
      if (current.length) { words.push(current); current = [] }
    } else {
      current.push({ char: ch, pos })
    }
    pos++
  }
  if (current.length) words.push(current)
  return words
}

// Group words into lines that fit within containerWidth
function breakIntoLines(words, containerWidth) {
  const lines  = []
  let line     = []
  let lineW    = 0

  for (const word of words) {
    const wordW  = word.length * (CELL_W + CELL_GAP)
    const needed = line.length ? WORD_GAP + wordW : wordW

    if (line.length && lineW + needed > containerWidth) {
      lines.push(line)
      line  = [word]
      lineW = wordW
    } else {
      line.push(word)
      lineW += needed
    }
  }
  if (line.length) lines.push(line)
  return lines
}

export default function PuzzleGrid({ cipher, guesses, hints, selectedCipherChar, conflictPlains, onSelectChar }) {
  const { colors } = useTheme()
  const containerRef   = useRef(null)
  const [lineWidth, setLineWidth] = useState(300)

  // Measure container so line-breaking is responsive
  useEffect(() => {
    if (!containerRef.current) return
    const ro = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width
      setLineWidth(Math.max(200, w - 28)) // subtract horizontal padding
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  const words = parseWords(cipher)
  const lines = breakIntoLines(words, lineWidth)

  return (
    // Outer scroll container — never clips content above
    // Inner wrapper with margin:auto achieves vertical centering for short content
    <div
      ref={containerRef}
      style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '24px 20px',
        gap: 40,
        width: '100%',
      }}>
      {lines.map((line, li) => (
        <div
          key={li}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            gap: WORD_GAP,
          }}
        >
          {line.map((word, wi) => (
            <div
              key={wi}
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: CELL_GAP,
              }}
            >
              {word.map(({ char, pos }) => {
                const isLetter = /[a-z]/.test(char)

                if (!isLetter) {
                  return (
                    <div
                      key={pos}
                      style={{
                        fontSize: 18,
                        fontFamily: "'Schoolbell', cursive",
                        color: colors.punctuation,
                        paddingBottom: 16,
                        lineHeight: 1,
                      }}
                    >
                      {char}
                    </div>
                  )
                }

                const isHint     = char in hints
                const isSelected = char === selectedCipherChar
                const isConflict = !isHint && !!guesses[char] && conflictPlains.has(guesses[char])

                return (
                  <LetterCell
                    key={pos}
                    cipherChar={char}
                    guessedChar={guesses[char] || ''}
                    isHint={isHint}
                    isSelected={isSelected}
                    isConflict={isConflict}
                    onClick={() => !isHint && onSelectChar(pos)}
                  />
                )
              })}
            </div>
          ))}
        </div>
      ))}
      </div>
    </div>
  )
}
