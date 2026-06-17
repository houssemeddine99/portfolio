import { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, Check, Star } from 'lucide-react'

const ACCENTS = ['from-pink to-violet', 'from-violet to-blue', 'from-blue to-cyan', 'from-cyan to-amber', 'from-amber to-pink']

// One project (from your real GitHub) as a fly-through card, with a Share action.
export function ProjectCard({ p, i }) {
  const [copied, setCopied] = useState(false)
  const Tag = p.url ? motion.a : motion.div

  const share = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const data = { title: p.name, text: `Check out ${p.name} — a project by Houssem`, url: p.url }
    try {
      if (navigator.share) {
        await navigator.share(data)
      } else if (navigator.clipboard && p.url) {
        await navigator.clipboard.writeText(p.url)
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
      }
    } catch {
      /* user cancelled share — ignore */
    }
  }

  return (
    <Tag
      {...(p.url ? { href: p.url, target: '_blank', rel: 'noreferrer' } : {})}
      data-cursor={p.url ? 'VIEW' : 'true'}
      className="group flex h-full flex-col"
    >
      <div className={`-mx-8 -mt-8 mb-5 flex h-40 items-end justify-between bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]} p-6`}>
        <span className="text-7xl font-black text-white/30">{String(i + 1).padStart(2, '0')}</span>
        {p.stars > 0 && (
          <span className="mb-1 flex items-center gap-1 rounded-full bg-black/25 px-2.5 py-1 text-xs font-semibold text-white">
            <Star className="h-3.5 w-3.5 fill-current" /> {p.stars}
          </span>
        )}
      </div>

      <span className="eyebrow text-pink">{p.owner ? 'collaboration' : 'project'}</span>
      <div className="mt-2 flex items-center justify-between gap-3">
        <h3 className="text-3xl font-bold text-snow">{p.name}</h3>
        {p.url && <span className="shrink-0 text-2xl text-pink transition group-hover:translate-x-1">↗</span>}
      </div>
      {p.owner && (
        <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-snow/80">
          👥 team · @{p.owner}
        </span>
      )}
      <p className="mt-3 flex-1 text-haze">{p.blurb}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {p.tags.map((t) => (
          <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs text-snow/80">
            {t}
          </span>
        ))}

        {/* Share */}
        <button
          onClick={share}
          data-cursor="true"
          aria-label={`Share ${p.name}`}
          className="ml-auto flex items-center gap-1.5 rounded-full bg-grad px-3.5 py-1.5 text-xs font-semibold text-white transition active:scale-95"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
          {copied ? 'Copied!' : 'Share'}
        </button>
      </div>
    </Tag>
  )
}

// Intro card that opens the "work" part of the journey.
export default function WorkIntro() {
  return (
    <div className="flex h-full flex-col justify-center">
      <span className="eyebrow text-pink">work</span>
      <h2 className="mt-3 text-4xl font-extrabold leading-[0.95] sm:text-5xl">
        Selected <span className="text-grad">projects</span>
      </h2>
      <p className="mt-4 text-haze">Straight from my GitHub. Keep flying to see them →</p>
    </div>
  )
}
