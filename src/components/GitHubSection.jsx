import { useEffect, useState } from 'react'
import gh from '../data/github.json'
import { getGithub, pickTopRepos, descriptions, LANG_COLORS } from '../lib/github.js'

export default function GitHubSection() {
  const [data, setData] = useState({ user: gh.user, repos: gh.repos })
  useEffect(() => {
    let alive = true
    getGithub().then((d) => alive && setData(d))
    return () => {
      alive = false
    }
  }, [])

  const { user, repos } = data
  const top = pickTopRepos(repos, 3)
  const totalStars = repos.reduce((s, r) => s + r.stars, 0)

  return (
    <div className="flex h-full flex-col">
      <span className="eyebrow text-pink">open source</span>
      <div className="mt-3 flex items-center gap-3">
        <img
          src={`https://github.com/${user.login}.png`}
          alt={user.login}
          loading="lazy"
          className="h-12 w-12 rounded-xl"
          onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
        />
        <div>
          <h2 className="text-xl font-bold text-snow">{user.name || user.login}</h2>
          <p className="text-xs text-pink">@{user.login}</p>
        </div>
      </div>

      <div className="mt-4 flex gap-5">
        {[
          { v: user.public_repos, l: 'repos' },
          { v: user.followers, l: 'followers' },
          { v: totalStars, l: 'stars' },
        ].map((s) => (
          <div key={s.l}>
            <div className="text-2xl font-extrabold text-grad">{s.v}</div>
            <div className="text-[11px] text-haze">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex-1 space-y-2">
        {top.map((repo) => {
          const desc = repo.description || descriptions[repo.name] || 'A project from my GitHub.'
          const color = LANG_COLORS[repo.language] || '#a3a0bf'
          return (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="VIEW"
              className="block rounded-xl border border-white/10 p-3 transition hover:border-pink/50"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold text-snow">{repo.name}</span>
                <span className="flex items-center gap-2 text-[11px] text-haze">
                  <span className="h-2 w-2 rounded-full" style={{ background: color }} /> ★ {repo.stars}
                </span>
              </div>
              <p className="mt-1 text-xs text-haze line-clamp-1">{desc}</p>
            </a>
          )
        })}
      </div>

      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        data-cursor="true"
        className="mt-4 inline-block w-fit rounded-full bg-grad px-5 py-2 text-sm font-semibold text-white"
      >
        View GitHub ↗
      </a>
    </div>
  )
}
