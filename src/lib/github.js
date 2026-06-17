import snapshot from '../data/github.json'

// Returns { user, repos } — tries the live public API first, falls back to the
// bundled snapshot (so the section always renders, even offline / rate-limited).
// `descriptions` and `featured` curation always come from the snapshot.
export async function getGithub() {
  const username = snapshot.user.login
  try {
    const headers = { Accept: 'application/vnd.github+json' }
    const [uRes, rRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, { headers }),
    ])
    if (!uRes.ok || !rRes.ok) throw new Error('rate-limited')
    const u = await uRes.json()
    const repos = (await rRes.json())
      .filter((r) => r.name.toLowerCase() !== username.toLowerCase())
      .map((r) => ({
        name: r.name,
        description: r.description || '',
        language: r.language || '',
        stars: r.stargazers_count,
        forks: r.forks_count,
        url: r.html_url,
        fork: r.fork,
      }))
    return {
      user: { ...snapshot.user, ...u, name: snapshot.user.name || u.name },
      repos: repos.length ? repos : snapshot.repos,
    }
  } catch {
    return { user: snapshot.user, repos: snapshot.repos }
  }
}

// Curated descriptions + featured order from the snapshot.
export const descriptions = snapshot.descriptions || {}
export const featured = snapshot.featured || []

// Pick the best N repos: featured first (in order), then by stars, then the rest.
export function pickTopRepos(repos, n = 6) {
  const byName = Object.fromEntries(repos.map((r) => [r.name, r]))
  const out = []
  const seen = new Set()
  for (const name of featured) {
    if (byName[name]) {
      out.push(byName[name])
      seen.add(name)
    }
  }
  const rest = repos
    .filter((r) => !seen.has(r.name))
    .sort((a, b) => b.stars - a.stars)
  return [...out, ...rest].slice(0, n)
}

// Build project cards straight from your real GitHub repos (the curated
// `featured` list, with nice descriptions). Falls back to top repos.
export function getFeaturedProjects() {
  const byName = Object.fromEntries(snapshot.repos.map((r) => [r.name, r]))
  const chosen = featured.map((name) => byName[name]).filter(Boolean)
  const repos = chosen.length ? chosen : pickTopRepos(snapshot.repos, 6)
  return repos.map((r) => ({
    name: r.name,
    blurb: descriptions[r.name] || r.description || 'A project from my GitHub.',
    tags: [r.language].filter(Boolean),
    url: r.url,
    stars: r.stars || 0,
  }))
}

// Repos shared WITH you (collaborator / org member), from the snapshot.
export function getSharedProjects() {
  return snapshot.shared || []
}

// Real numbers computed from your GitHub data for the stats card.
export function getStats() {
  const own = snapshot.repos || []
  const shared = snapshot.shared || []
  const stars = own.reduce((s, r) => s + (r.stars || 0), 0)

  const tally = {}
  own.forEach((r) => {
    if (r.language) tally[r.language] = (tally[r.language] || 0) + 1
  })
  shared.forEach((r) => {
    const langs = r.tags && r.tags.length ? r.tags : [r.language]
    langs.forEach((l) => {
      if (l) tally[l] = (tally[l] || 0) + 1
    })
  })
  const languages = Object.entries(tally)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }))

  return {
    repos: snapshot.user.public_repos || own.length,
    stars,
    followers: snapshot.user.followers || 0,
    collaborations: shared.length,
    languages,
    languageCount: languages.length,
  }
}

// Language → brand color for the language dot.
export const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  PHP: '#4F5D95',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  Vue: '#41b883',
  C: '#555555',
  'C#': '#178600',
}
