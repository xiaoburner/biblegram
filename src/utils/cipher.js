const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

/**
 * Build a map of cipherChar -> plainChar for a given ciphersequence.
 * ciphersequence[i] is the cipher char for plain char at alphabet position i.
 * So: plain[i] -> cipher[i], and cipher[i] -> plain[i] (reverse lookup).
 */
export function buildCorrectMapping(ciphersequence) {
  const mapping = {}
  for (let i = 0; i < 26; i++) {
    const cipherChar = ciphersequence[i]
    const plainChar = ALPHABET[i]
    mapping[cipherChar] = plainChar
  }
  return mapping
}

/**
 * Get all unique cipher letters (a-z only) present in the cipher text.
 */
export function getUniqueCipherLetters(cipher) {
  return [...new Set(cipher.toLowerCase().split('').filter(c => /[a-z]/.test(c)))]
}

/**
 * Check if all cipher letters in the puzzle are correctly guessed.
 */
export function checkWin(cipher, guesses, correctMapping) {
  const cipherLetters = getUniqueCipherLetters(cipher)
  return cipherLetters.every(c => guesses[c] && guesses[c] === correctMapping[c])
}

/**
 * Build initial guesses from the puzzle's hints object.
 * Hints format: { cipherChar: plainChar, ... } (excludes spaces/punctuation)
 */
export function buildInitialGuesses(hints) {
  const guesses = {}
  for (const [cipherChar, plainChar] of Object.entries(hints)) {
    if (/[a-z]/.test(cipherChar)) {
      guesses[cipherChar] = plainChar
    }
  }
  return guesses
}

/**
 * Find the index of the next unfilled cipher letter after startPos.
 * Wraps around. Returns null if all are filled.
 * startPos = -1 starts from the beginning.
 */
export function findNextUnfilledPos(cipher, guesses, startPos = -1) {
  const chars = cipher.toLowerCase().split('')
  const len = chars.length
  const base = startPos < 0 ? -1 : startPos
  for (let offset = 1; offset <= len; offset++) {
    const i = (base + offset + len) % len
    const c = chars[i]
    if (/[a-z]/.test(c) && !guesses[c]) return i
  }
  return null
}

/**
 * Find the index of the previous non-hint letter before startPos.
 * Does not wrap. Returns null if at the beginning.
 */
export function findPrevNonHintPos(cipher, hints, startPos) {
  const chars = cipher.toLowerCase().split('')
  for (let i = startPos - 1; i >= 0; i--) {
    const c = chars[i]
    if (/[a-z]/.test(c) && !(c in hints)) return i
  }
  return null
}
