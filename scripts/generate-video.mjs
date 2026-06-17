// ============================================================================
//  Generates a cinematic hero background video with the Higgsfield Cloud API
//  and saves it to public/hero.mp4.
//
//  Run with:  npm run video
//
//  Pipeline:  text -> image (Soul)  ->  image -> video (Kling)  ->  download
//  Credentials come from .env (HIGGSFIELD_API_KEY + HIGGSFIELD_SECRET) and are
//  sent as:   Authorization: Key {key}:{secret}
//
//  Notes:
//   • This spends Higgsfield credits.
//   • Set HERO_IMAGE_URL in .env to skip image generation and animate that image.
//   • Override the look with HERO_VIDEO_PROMPT in .env.
// ============================================================================

import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const BASE = 'https://platform.higgsfield.ai'

function loadEnv() {
  const env = {}
  const p = resolve(root, '.env')
  if (existsSync(p)) {
    for (const line of readFileSync(p, 'utf8').split('\n')) {
      if (line.trim().startsWith('#')) continue
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m) env[m[1]] = m[2].trim()
    }
  }
  return { ...env, ...process.env }
}

const env = loadEnv()
const KEY = env.HIGGSFIELD_API_KEY
const SECRET = env.HIGGSFIELD_SECRET
const PROMPT =
  env.HERO_VIDEO_PROMPT ||
  'Cinematic abstract background, flowing neon cyan and purple particles and light trails on a dark navy backdrop, slow elegant motion, futuristic technology aesthetic, seamless loop'

if (!KEY || !SECRET) {
  console.error('✗ Missing HIGGSFIELD_API_KEY / HIGGSFIELD_SECRET in .env')
  process.exit(1)
}

const authHeaders = {
  Authorization: `Key ${KEY}:${SECRET}`,
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Recursively search an object for the first string URL matching a pattern.
function deepFindUrl(obj, re, seen = new Set()) {
  if (!obj || typeof obj !== 'object' || seen.has(obj)) return null
  seen.add(obj)
  for (const v of Object.values(obj)) {
    if (typeof v === 'string' && re.test(v)) return v
    if (typeof v === 'object') {
      const found = deepFindUrl(v, re, seen)
      if (found) return found
    }
  }
  return null
}

const findImageUrl = (o) =>
  o?.images?.[0]?.url || o?.result?.images?.[0]?.url || deepFindUrl(o, /\.(png|jpe?g|webp)(\?|$)/i)
const findVideoUrl = (o) =>
  o?.video?.url || o?.result?.video?.url || deepFindUrl(o, /\.mp4(\?|$)/i)

function getStatus(o) {
  return (o?.status || o?.request?.status || o?.state || '').toString().toLowerCase()
}

async function createJob(path, body) {
  console.log(`→ POST ${path}`)
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify(body),
  })
  const text = await res.text()
  let json
  try {
    json = JSON.parse(text)
  } catch {
    json = { raw: text }
  }
  if (!res.ok) {
    throw new Error(`Create failed (${res.status}): ${text.slice(0, 400)}`)
  }
  const job = json.data || json
  const id = job.id || job.request_id || json.id || json.request_id
  const statusUrl = job.status_url || json.status_url || (id ? `${BASE}/requests/${id}/status` : null)
  if (!statusUrl) throw new Error(`No status_url/id in response: ${text.slice(0, 400)}`)
  return { statusUrl, json }
}

async function pollJob(statusUrl, label) {
  const maxTries = 150 // ~12.5 min at 5s
  for (let i = 0; i < maxTries; i++) {
    const res = await fetch(statusUrl, { headers: authHeaders })
    const text = await res.text()
    let json
    try {
      json = JSON.parse(text)
    } catch {
      json = { raw: text }
    }
    const status = getStatus(json)
    process.stdout.write(`\r  ${label}: ${status || 'pending'} (${i * 5}s)        `)
    if (status === 'completed' || status === 'succeeded' || status === 'success') {
      console.log('')
      return json
    }
    if (status === 'failed' || status === 'nsfw' || status === 'cancelled') {
      console.log('')
      throw new Error(`${label} ${status}: ${text.slice(0, 400)}`)
    }
    await sleep(5000)
  }
  throw new Error(`${label} timed out`)
}

async function download(url, outPath) {
  console.log(`↓ Downloading ${url.slice(0, 80)}…`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed: ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  writeFileSync(outPath, buf)
  console.log(`✓ Saved ${outPath} (${(buf.length / 1e6).toFixed(1)} MB)`)
}

async function main() {
  console.log('Higgsfield hero-video generator')
  console.log(`Auth: Key ${KEY.slice(0, 8)}…:${SECRET.slice(0, 6)}…`)
  console.log(`Prompt: ${PROMPT}\n`)

  // 1) Get a source image (generate one, or use HERO_IMAGE_URL).
  let imageUrl = env.HERO_IMAGE_URL
  if (!imageUrl) {
    const { statusUrl } = await createJob('/higgsfield-ai/soul/standard', {
      prompt: PROMPT,
      aspect_ratio: '16:9',
      resolution: '1080p',
    })
    const done = await pollJob(statusUrl, 'image')
    imageUrl = findImageUrl(done)
    if (!imageUrl) throw new Error(`No image URL in result: ${JSON.stringify(done).slice(0, 400)}`)
    console.log(`✓ Image ready: ${imageUrl.slice(0, 80)}…\n`)
  } else {
    console.log(`Using HERO_IMAGE_URL: ${imageUrl}\n`)
  }

  // 2) Animate the image into a video.
  const { statusUrl } = await createJob('/kling-video/v2.1/pro/image-to-video', {
    image_url: imageUrl,
    prompt: 'slow cinematic drift, gentle parallax, looping ambient motion',
    duration: 5,
  })
  const done = await pollJob(statusUrl, 'video')
  const videoUrl = findVideoUrl(done)
  if (!videoUrl) throw new Error(`No video URL in result: ${JSON.stringify(done).slice(0, 400)}`)

  // 3) Save to public/hero.mp4
  await download(videoUrl, resolve(root, 'public/hero.mp4'))
  console.log('\nDone! Now set  media.heroVideo: "/hero.mp4"  in src/config/profile.js')
}

main().catch((err) => {
  console.error('\n✗', err.message)
  if (/not_enough_credits/.test(err.message)) {
    console.error('  → Your Higgsfield account is out of credits.')
    console.error('  → Top up at https://cloud.higgsfield.ai, then run `npm run video` again.')
  }
  // Set exit code instead of process.exit() so pending fetch handles close cleanly.
  process.exitCode = 1
})
