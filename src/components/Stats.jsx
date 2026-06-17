import { motion } from 'framer-motion'
import { getStats, LANG_COLORS } from '../lib/github.js'
import { NumberTicker } from './ui/number-ticker.jsx'

export default function Stats() {
  const s = getStats()
  const cells = [
    { v: s.repos, l: 'Public repos' },
    { v: s.stars, l: 'GitHub stars' },
    { v: s.collaborations, l: 'Team projects' },
    { v: s.languageCount, l: 'Languages' },
    { v: s.followers, l: 'Followers' },
    { v: 4, suffix: '+', l: 'Years coding' },
  ]
  const top = s.languages.slice(0, 5)
  const max = top[0]?.count || 1

  return (
    <div className="flex h-full flex-col justify-center">
      <span className="eyebrow text-pink">statistics</span>
      <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
        By the <span className="text-grad">numbers</span>
      </h2>

      <div className="mt-5 grid grid-cols-3 gap-2.5">
        {cells.map((c) => (
          <div key={c.l} className="rounded-2xl border border-white/10 p-3 text-center">
            <div className="text-2xl font-extrabold text-grad sm:text-3xl">
              <NumberTicker value={c.v} suffix={c.suffix || ''} />
            </div>
            <div className="mt-0.5 text-[11px] leading-tight text-haze">{c.l}</div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <p className="eyebrow mb-2 text-haze">top languages</p>
        <div className="space-y-2">
          {top.map((l, i) => (
            <div key={l.name}>
              <div className="flex justify-between text-xs">
                <span className="text-snow">{l.name}</span>
                <span className="text-haze">{l.count}</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: LANG_COLORS[l.name] || 'linear-gradient(90deg,#ff3d8b,#9b5cff)' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(l.count / max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.08, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
