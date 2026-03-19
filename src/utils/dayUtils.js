import { PUZZLE_COUNT } from '../data/puzzles'

// Day 1 was March 14 2026 — adjust this when the real launch date is set
const LAUNCH_DATE = new Date('2026-03-14T00:00:00')

/**
 * Returns how many days have elapsed since launch (1-indexed).
 * Day 1 = launch day, Day 2 = next day, etc.
 */
export function getTodaysDayNumber() {
  const now = new Date()
  const msPerDay = 24 * 60 * 60 * 1000
  const elapsed = Math.floor((now - LAUNCH_DATE) / msPerDay)
  return Math.max(1, elapsed + 1)
}

/**
 * The latest playable day — capped at puzzle count until more puzzles are added.
 */
export function getLatestDay() {
  return Math.min(getTodaysDayNumber(), PUZZLE_COUNT)
}

/**
 * Maps a day number to a puzzle id (cycles when day > PUZZLE_COUNT).
 */
export function puzzleIdForDay(day) {
  return ((day - 1) % PUZZLE_COUNT) + 1
}
