// ============================================================================
//  The "AI brain" — a small, self-contained matching engine.
//  No API key, no network: it scores the visitor's question against the
//  knowledge base in profile.js and returns the best-fitting answer, with a
//  graceful fallback when nothing matches well.
// ============================================================================

import { profile } from '../config/profile.js'

const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'am', 'do', 'does', 'did', 'you', 'your', 'yours',
  'i', 'me', 'my', 'we', 'us', 'to', 'of', 'in', 'on', 'for', 'and', 'or', 'so',
  'tell', 'about', 'what', 'whats', 'who', 'how', 'why', 'when', 'where', 'can',
  'could', 'would', 'should', 'please', 'give', 'me', 'some', 'any', 'be', 'been',
  'this', 'that', 'it', 'with', 'have', 'has', 'had', 'much', 'many',
])

// Fill {name} {email} {role} {location} placeholders with real values.
export function fillTemplate(text = '') {
  const map = {
    name: profile.identity.name,
    role: profile.identity.role,
    location: profile.identity.location,
    email: profile.contact.email,
  }
  return text.replace(/\{(\w+)\}/g, (_, key) => map[key] ?? `{${key}}`)
}

function normalize(text = '') {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenize(text) {
  return normalize(text)
    .split(' ')
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
}

// Score how well a question matches a single knowledge entry.
function scoreEntry(question, entry) {
  const qNorm = normalize(question)
  const qTokens = new Set(tokenize(question))
  let score = 0

  // 1) Tag matches — multi-word tags that appear as a phrase score highest.
  for (const tag of entry.tags || []) {
    const tagNorm = normalize(tag)
    if (!tagNorm) continue
    if (tagNorm.includes(' ')) {
      // multi-word tag: reward exact phrase containment strongly
      if (qNorm.includes(tagNorm)) score += 5
    } else if (qTokens.has(tagNorm)) {
      score += 3
    } else {
      // partial stem match (e.g. "projects" vs "project")
      for (const t of qTokens) {
        if (t.length > 3 && (t.startsWith(tagNorm) || tagNorm.startsWith(t))) {
          score += 1.5
          break
        }
      }
    }
  }

  // 2) Example-pattern overlap (Jaccard on tokens) + exact-phrase bonus.
  for (const pattern of entry.patterns || []) {
    const pTokens = new Set(tokenize(pattern))
    if (pTokens.size === 0) continue
    let shared = 0
    for (const t of pTokens) if (qTokens.has(t)) shared += 1
    const union = new Set([...pTokens, ...qTokens]).size || 1
    score += (shared / union) * 4
    if (qNorm.includes(normalize(pattern))) score += 4
  }

  return score
}

// Public: given a question, return { answer, matched }.
export function answerQuestion(question) {
  const trimmed = (question || '').trim()
  if (!trimmed) {
    return { answer: fillTemplate(profile.ai.fallbacks[0]), matched: false }
  }

  let best = null
  let bestScore = 0
  for (const entry of profile.ai.knowledge) {
    const s = scoreEntry(trimmed, entry)
    if (s > bestScore) {
      bestScore = s
      best = entry
    }
  }

  // Threshold: below this, we'd rather admit we don't know than bluff.
  if (best && bestScore >= 2.5) {
    return { answer: fillTemplate(best.answer), matched: true, score: bestScore }
  }

  // Rotating fallback so repeated misses don't feel robotic.
  const fb = profile.ai.fallbacks
  const idx = trimmed.length % fb.length
  return { answer: fillTemplate(fb[idx]), matched: false, score: bestScore }
}

export function getGreeting() {
  return fillTemplate(profile.ai.greeting)
}

export function getSuggestions() {
  return profile.ai.suggestions || []
}
