// ============================================================================
//  Refreshes src/data/github.json from the live GitHub API.
//  Run with:  npm run github
//
//  • Reads GITHUB_USERNAME and (optional) GITHUB_TOKEN from .env.
//  • The token is used ONLY here, locally, to raise the rate limit / read
//    private repos. It is never written into the JSON or bundled into the site.
//  • Your hand-written `descriptions` and `featured` lists in github.json are
//    preserved across refreshes.
// ============================================================================

import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const jsonPath = resolve(root, 'src/data/github.json')

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

// Pull the first real sentence out of a README to use as a blurb.
function extractBlurb(md) {
  for (const raw of md.split('\n')) {
    const l = raw.trim()
    if (!l) continue
    // skip headings, images, html, badges, tables, rules, code/command/list lines
    if (/^(#|!\[|<|\[!|---|\||={3,}|-{3,}|```|[-*+]\s|\d+\.\s|\$|\.\/|>|cd\s|npm\s|git\s|php\s|java\s|\.?\/?gradlew)/i.test(l)) continue
    const clean = l
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[#*_`>~]/g, '')
      .trim()
    // must read like a sentence: has a space and some letters, not a path/command
    if (clean.length > 25 && /\s/.test(clean) && /[a-zA-Z]{4,}/.test(clean) && !/[/\\]{2,}|::|=>/.test(clean)) {
      return clean.length > 160 ? clean.slice(0, 157) + '…' : clean
    }
  }
  return ''
}

async function main() {
  const env = loadEnv()
  const username = env.GITHUB_USERNAME || 'houssemeddine99'
  const token = env.GITHUB_TOKEN || ''

  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-fetch' }
  if (token) headers.Authorization = `Bearer ${token}`
  console.log(`Fetching GitHub data for "${username}"${token ? ' (authenticated)' : ' (public)'}…`)

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { headers }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, { headers }),
  ])

  if (!userRes.ok) throw new Error(`User fetch failed: ${userRes.status} ${userRes.statusText}`)
  if (!reposRes.ok) throw new Error(`Repos fetch failed: ${reposRes.status} ${reposRes.statusText}`)

  const u = await userRes.json()
  const repos = await reposRes.json()

  // Preserve existing curation (descriptions / featured / sharedDescriptions).
  let prev = {}
  try {
    prev = JSON.parse(readFileSync(jsonPath, 'utf8'))
  } catch {
    prev = {}
  }
  const curatedShared = prev.sharedDescriptions || {}

  // Repos SHARED WITH the user (collaborator / org member, not owned by them).
  // Requires the token. Public ones only, to avoid leaking private repo names.
  let shared = []
  let privateSharedCount = 0
  if (token) {
    const sharedRes = await fetch(
      'https://api.github.com/user/repos?affiliation=collaborator,organization_member&per_page=100&sort=pushed',
      { headers },
    )
    if (sharedRes.ok) {
      const all = await sharedRes.json()
      const notMine = all.filter((r) => r.owner?.login?.toLowerCase() !== username.toLowerCase())
      privateSharedCount = notMine.filter((r) => r.private).length
      const pub = notMine.filter((r) => !r.private)
      console.log(`  Enriching ${pub.length} shared repos (languages + README)…`)
      for (const r of pub) {
        // tags from the repo's actual language breakdown
        let tags = [r.language].filter(Boolean)
        try {
          const lr = await fetch(`https://api.github.com/repos/${r.full_name}/languages`, { headers })
          if (lr.ok) {
            const langs = await lr.json()
            const top = Object.keys(langs).sort((a, b) => langs[b] - langs[a]).slice(0, 3)
            if (top.length) tags = top
          }
        } catch {
          /* ignore */
        }
        // blurb: curated override → repo description → README first sentence
        let blurb = curatedShared[r.full_name] || r.description || ''
        if (!blurb) {
          try {
            const rr = await fetch(`https://api.github.com/repos/${r.full_name}/readme`, {
              headers: { ...headers, Accept: 'application/vnd.github.raw' },
            })
            if (rr.ok) blurb = extractBlurb(await rr.text())
          } catch {
            /* ignore */
          }
        }
        if (!blurb) blurb = `A team project I collaborated on with ${r.owner.login}.`
        shared.push({
          name: r.name,
          full_name: r.full_name,
          owner: r.owner.login,
          blurb,
          tags,
          language: r.language || '',
          stars: r.stargazers_count,
          url: r.html_url,
          fork: r.fork,
          pushed_at: r.pushed_at,
        })
      }
    } else {
      console.warn(`  (shared-repos fetch returned ${sharedRes.status} — skipping; token may lack repo scope)`)
    }
  } else {
    console.warn('  (no token — skipping shared-with-me repos)')
  }

  const out = {
    _note: 'Auto-generated by `npm run github`. Edit `descriptions` / `featured` / `sharedDescriptions` freely — they are preserved on refresh.',
    user: {
      login: u.login,
      name: prev.user?.name || u.name || u.login,
      bio: u.bio || prev.user?.bio || '',
      html_url: u.html_url,
      public_repos: u.public_repos,
      followers: u.followers,
      following: u.following,
    },
    descriptions: prev.descriptions || {},
    featured: prev.featured || [],
    sharedDescriptions: curatedShared,
    repos: repos
      .filter((r) => r.name.toLowerCase() !== username.toLowerCase())
      .map((r) => ({
        name: r.name,
        description: r.description || '',
        language: r.language || '',
        stars: r.stargazers_count,
        forks: r.forks_count,
        url: r.html_url,
        fork: r.fork,
        pushed_at: r.pushed_at,
      })),
    shared,
  }

  writeFileSync(jsonPath, JSON.stringify(out, null, 2) + '\n')
  console.log(`✓ Wrote ${out.repos.length} own repos + ${shared.length} shared (public) repos to src/data/github.json`)
  if (privateSharedCount) console.log(`  (${privateSharedCount} private shared repos were hidden)`)
}

main().catch((err) => {
  console.error('✗ GitHub fetch failed:', err.message)
  console.error('  (The site still works — it falls back to the existing snapshot.)')
  process.exit(1)
})
