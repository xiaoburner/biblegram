import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useTheme } from './contexts/ThemeContext'
import TitleBar from './components/TitleBar'
import PuzzleGrid from './components/PuzzleGrid'
import Keyboard from './components/Keyboard'
import WinScreen from './components/WinScreen'
import Menu from './components/Menu'
import HowToPlay from './components/HowToPlay'
import PastPuzzles from './components/PastPuzzles'
import About from './components/About'
import VisitUs from './components/VisitUs'
import BibleChapter from './components/BibleChapter'
import { puzzles } from './data/puzzles'
import { getLatestDay, puzzleIdForDay } from './utils/dayUtils'
import {
  buildCorrectMapping,
  buildInitialGuesses,
  checkWin,
  getUniqueCipherLetters,
  findNextUnfilledPos,
  findPrevNonHintPos,
} from './utils/cipher'

const STORAGE_KEY = 'biblegram2026_state'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function saveState(dayNumber, guesses) {
  try {
    const existing = loadState() || {}
    existing[dayNumber] = guesses
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
  } catch {}
}

export default function App() {
  const { colors, themeName, toggleTheme } = useTheme()
  const latestDay = getLatestDay()

  const [dayNumber, setDayNumber] = useState(latestDay)
  const [guesses, setGuesses]     = useState({})
  const [selectedPos, setSelectedPos] = useState(null)  // index into cipher string
  const [isSolved, setIsSolved]   = useState(false)
  const [winOpen, setWinOpen]     = useState(false)
  const [menuOpen, setMenuOpen]           = useState(false)
  const [howToPlayOpen, setHowToPlayOpen]     = useState(false)
  const [pastPuzzlesOpen, setPastPuzzlesOpen] = useState(false)
  const [aboutOpen, setAboutOpen]             = useState(false)
  const [visitUsOpen, setVisitUsOpen]         = useState(false)
  const [chapterOpen, setChapterOpen]         = useState(false)

  const puzzleId = puzzleIdForDay(dayNumber)
  const puzzle   = puzzles[puzzleId]
  const correctMapping = buildCorrectMapping(puzzle.ciphersequence)
  const cipherLower = puzzle.cipher.toLowerCase()

  // Derive selected char from position — all downstream components work with chars
  const selectedCipherChar = selectedPos != null ? cipherLower[selectedPos] : null

  // Plain letters assigned to 2+ non-hint cipher chars → conflict
  const conflictPlains = useMemo(() => {
    const counts = {}
    for (const [cc, pl] of Object.entries(guesses)) {
      if (cc in puzzle.hints) continue
      counts[pl] = (counts[pl] || 0) + 1
    }
    return new Set(Object.keys(counts).filter(pl => counts[pl] > 1))
  }, [guesses, puzzle.hints])

  // Load puzzle state whenever the day changes
  useEffect(() => {
    const saved = loadState()
    const base  = buildInitialGuesses(puzzle.hints)
    const merged = { ...base, ...(saved?.[dayNumber] || {}) }
    setGuesses(merged)
    setIsSolved(false)
    setWinOpen(false)
    setSelectedPos(null)

    if (checkWin(puzzle.cipher, merged, correctMapping)) {
      setIsSolved(true)
      // Already solved the latest puzzle — skip win screen, go straight to past puzzles
      if (dayNumber >= latestDay) {
        setPastPuzzlesOpen(true)
      } else {
        setWinOpen(true)
      }
    } else {
      setSelectedPos(findNextUnfilledPos(puzzle.cipher, merged))
    }
  }, [dayNumber])

  useEffect(() => {
    if (Object.keys(guesses).length > 0) saveState(dayNumber, guesses)
  }, [guesses, dayNumber])

  const handleReset = useCallback(() => {
    const base = buildInitialGuesses(puzzle.hints)
    setGuesses(base)
    setIsSolved(false)
    setWinOpen(false)
    setSelectedPos(findNextUnfilledPos(puzzle.cipher, base))
  }, [puzzle])

  const handleSelectChar = useCallback((pos) => {
    setSelectedPos(pos)
  }, [])

  const handleKeyPress = useCallback((key) => {
    if (isSolved) return

    if (key === 'DEL') {
      if (selectedPos == null) return

      // Clear current cell if it has a player guess (not a hint)
      if (selectedCipherChar && guesses[selectedCipherChar] && !(selectedCipherChar in puzzle.hints)) {
        setGuesses(prev => {
          const next = { ...prev }
          delete next[selectedCipherChar]
          return next
        })
      }

      // Navigate left, skipping hint chars
      const prevPos = findPrevNonHintPos(puzzle.cipher, puzzle.hints, selectedPos)
      if (prevPos != null) setSelectedPos(prevPos)

      return
    }

    if (key === '->') {
      if (selectedPos == null) return
      const next = findNextUnfilledPos(puzzle.cipher, guesses, selectedPos)
      if (next != null) setSelectedPos(next)
      return
    }

    if (selectedPos == null) return
    const plain = key.toLowerCase()
    if (Object.values(puzzle.hints).includes(plain)) return

    setGuesses(prev => {
      const next = { ...prev, [selectedCipherChar]: plain }
      if (checkWin(puzzle.cipher, next, correctMapping)) { setIsSolved(true); setWinOpen(true) }
      return next
    })

    const nextPos = findNextUnfilledPos(puzzle.cipher, { ...guesses, [selectedCipherChar]: plain }, selectedPos)
    if (nextPos != null) setSelectedPos(nextPos)
  }, [selectedPos, selectedCipherChar, guesses, puzzle, correctMapping, isSolved])

  // Physical keyboard
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Backspace') {
        e.preventDefault()
        handleKeyPress('DEL')
      } else if (e.key === 'Tab' || e.key === 'ArrowRight') {
        e.preventDefault()
        handleKeyPress('->')
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleKeyPress])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100dvh',
      maxWidth: 560,
      margin: '0 auto',
      background: colors.appBg,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <TitleBar
        dayNumber={dayNumber}
        topic={puzzle.topic}
        book={puzzle.book}
        chapter={puzzle.chapter}
        verse={puzzle.verse}
        hints={puzzle.hints}
        onMenuOpen={() => setMenuOpen(true)}
        onHintClick={() => setChapterOpen(true)}
      />

      <PuzzleGrid
        cipher={puzzle.cipher}
        guesses={guesses}
        hints={puzzle.hints}
        selectedCipherChar={selectedCipherChar}
        conflictPlains={conflictPlains}
        onSelectChar={handleSelectChar}
      />

      <Keyboard
        guesses={guesses}
        hints={puzzle.hints}
        selectedCipherChar={selectedCipherChar}
        conflictPlains={conflictPlains}
        onKeyPress={handleKeyPress}
      />

      {isSolved && winOpen && (
        <WinScreen
          puzzle={puzzle}
          dayNumber={dayNumber}
          isLatest={dayNumber >= latestDay}
          onClose={() => setWinOpen(false)}
          onNext={() => {
            if (dayNumber < latestDay) setDayNumber(d => d + 1)
          }}
        />
      )}

      <HowToPlay open={howToPlayOpen} onClose={() => setHowToPlayOpen(false)} />
      <About open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <VisitUs open={visitUsOpen} onClose={() => setVisitUsOpen(false)} />
      <BibleChapter
        open={chapterOpen}
        onClose={() => setChapterOpen(false)}
        book={puzzle.book}
        chapter={puzzle.chapter}
      />

      <PastPuzzles
        open={pastPuzzlesOpen}
        onClose={() => setPastPuzzlesOpen(false)}
        currentDay={dayNumber}
        latestDay={latestDay}
        onSelectDay={(day) => { setDayNumber(day); setPastPuzzlesOpen(false) }}
      />

      <Menu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        themeName={themeName}
        onToggleTheme={toggleTheme}
        onResetPuzzle={handleReset}
        onSelect={(item) => {
          if (item === 'How to Play')     setHowToPlayOpen(true)
          if (item === 'Past Puzzles')    setPastPuzzlesOpen(true)
          if (item === 'About Biblegram') setAboutOpen(true)
          if (item === 'Visit Us')        setVisitUsOpen(true)
        }}
      />
    </div>
  )
}
