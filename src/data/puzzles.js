/**
 * Puzzle data for Biblegram 2026.
 *
 * Each puzzle:
 *   ciphersequence  — 26-char string; ciphersequence[i] is the cipher char for plain alphabet[i]
 *   cipher          — the encoded Bible verse
 *   phrase          — the plaintext answer (all lowercase)
 *   topic           — theme shown to player
 *   book/chapter/verse — Bible reference
 *   hints           — pre-revealed mappings: { cipherChar: plainChar }
 *   next            — ID of next puzzle (loops after last)
 *
 * Bugs fixed vs original bundle:
 *   - Puzzle 3: book corrected from "Philippians 2" → "Philippians"
 *   - Puzzle 4: ciphersequence stray quotes removed
 *   - Puzzle 5: next changed from 1 → 6 so puzzle 6 is reachable
 */

export const puzzles = {
  1: {
    id: 1,
    ciphersequence: 'hqjuibmswaynpreovtfdczxlgk',
    cipher: 'bet meu fe neziu dsi xetnu.',
    phrase: 'for god so loved the world.',
    topic: 'Love',
    book: 'John',
    chapter: '3',
    verse: '16',
    hints: { e: 'o', u: 'd' },
    next: 2,
  },
  2: {
    id: 2,
    ciphersequence: 'hqjuibmswaynpreovtfdczxlgk',
    cipher: 'nid hnn dshd gec ue qi ueri wr nezi.',
    phrase: 'let all that you do be done in love.',
    topic: 'Love',
    book: '1 Corinthians',
    chapter: '16',
    verse: '14',
    hints: { n: 'l', r: 'n' },
    next: 3,
  },
  3: {
    id: 3,
    ciphersequence: 'hqjuibmswaynpreovtfdczxlgk',
    cipher: 'ue redswrm btep finbwfs hpqwdwer et jerjiwd, qcd wr scpwnwdg jecrd edsitf peti fwmrwbwjhrd dshr gectfinzif.',
    phrase: 'do nothing from selfish ambition or conceit, but in humility count others more significant than yourselves.',
    topic: 'Humility',
    book: 'Philippians',
    chapter: '2',
    verse: '3',
    hints: { r: 'n', m: 'g', f: 's', w: 'i' },
    next: 4,
  },
  4: {
    id: 4,
    ciphersequence: 'mwtohslqrcyinkdjfpuvagebxz',
    cipher: 'wh yrko mko tdnjmuurdkmvh vd dkh mkdvqhp, sdplrgrkl hmtq dvqhp, cauv mu rk tqpruv ldo sdplmgh xda.',
    phrase: 'be kind and compassionate to one another, forgiving each other, just as in christ god forgave you.',
    topic: 'Kindness',
    book: 'Ephesians',
    chapter: '4',
    verse: '32',
    hints: { o: 'd', y: 'k', r: 'i', u: 's', t: 'c', g: 'v', d: 'o' },
    next: 5,
  },
  5: {
    id: 5,
    ciphersequence: 'knrwyshjaecbpqmiutoxfzldvg',
    cipher: 'om ljyxjyt vmf ykx mt wtaqc mt ljkxyzyt vmf wm, wm ax kbb smt xjy hbmtv ms hmw.',
    phrase: 'so whether you eat or drink or whatever you do, do it all for the glory of god.',
    topic: 'Glorifying God',
    book: '1 Corinthians',
    chapter: '10',
    verse: '31',
    hints: { o: 's', y: 'e', c: 'k' },
    next: 6,
  },
  6: {
    id: 6,
    ciphersequence: 'hqmeraygjiudskntpoxcfwlvbz',
    cipher: 'cofxc jk cgr dnoe ljcg hdd bnfo grhoc hke drhk knc nk bnfo nlk fkeroxchkejky.',
    phrase: 'trust in the lord with all your heart and lean not on your own understanding.',
    topic: 'Trust',
    book: 'Proverbs',
    chapter: '3',
    verse: '5',
    hints: { f: 'u', n: 'o', h: 'a', c: 't', e: 'd' },
    next: 1,
  },
}

export const PUZZLE_COUNT = Object.keys(puzzles).length
