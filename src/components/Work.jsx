import { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, Check, Star } from 'lucide-react'
import { getFeaturedProjects, getSharedProjects, LANG_COLORS } from '../lib/github.js'
import { ActiveContext } from '../lib/tunnelContext.js'

// Empty first (delayChildren), then each card springs in one-by-one (staggerChildren).
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
}
const item = {
  hidden: { opacity: 0, scale: 0.4, y: 26 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 480, damping: 17 } },
}

function Tile({ p, i }) {
  const [copied, setCopied] = useState(false)
  const color = LANG_COLORS[p.tags?.[0]] || '#a3a0bf'

  const share = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const data = { title: p.name, text: `Check out ${p.name}`, url: p.url }
    try {
      if (navigator.share) await navigator.share(data)
      else if (navigator.clipboard && p.url) {
        await navigator.clipboard.writeText(p.url)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }
    } catch {
      /* cancelled */
    }
  }

  const Tag = p.url ? 'a' : 'div'
  return (
    <Tag
      {...(p.url ? { href: p.url, target: '_blank', rel: 'noreferrer' } : {})}
      data-cursor={p.url ? 'VIEW' : 'true'}
      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-pink/50 hover:bg-white/[0.08]"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-haze">{String(i + 1).padStart(2, '0')}</span>
        <span className="flex items-center gap-2 text-[11px] text-haze">
          {p.tags?.[0] && <span className="h-2 w-2 rounded-full" style={{ background: color }} />}
          {p.stars > 0 && (
            <span className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-current" />
              {p.stars}
            </span>
          )}
        </span>
      </div>

      <h3 className="mt-1.5 text-base font-bold leading-tight text-snow">{p.name}</h3>
      {p.owner && <span className="mt-1 text-[10px] text-pink">👥 @{p.owner}</span>}
      <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-haze">{p.blurb}</p>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="truncate font-mono text-[10px] uppercase tracking-wider text-haze">
          {(p.tags || []).slice(0, 2).join(' · ')}
        </span>
        <button
          onClick={share}
          data-cursor="true"
          aria-label={`Share ${p.name}`}
          className="flex shrink-0 items-center gap-1 rounded-full bg-grad px-2.5 py-1 text-[10px] font-semibold text-white active:scale-95"
        >
          {copied ? <Check className="h-3 w-3" /> : <Share2 className="h-3 w-3" />}
          {copied ? 'Copied' : 'Share'}
        </button>
      </div>
    </Tag>
  )
}

// Free in the open space — no box. A wide spread of cards across the screen
// that pop in one-by-one. Cards alternate a vertical offset so it feels loose.
function Grid({ items, eyebrow, title, accent, sub, cols }) {
  const active = useContext(ActiveContext)
  return (
    <div className="w-full px-6 sm:px-12">
      <div className="mx-auto max-w-6xl">
        <span className="eyebrow text-pink">{eyebrow}</span>
        <h2 className="mt-2 text-4xl font-extrabold sm:text-5xl">
          {title} <span className="text-grad">{accent}</span>
        </h2>
        {sub && <p className="mt-2 text-haze">{sub}</p>}

        <motion.div
          className={`mt-8 grid gap-4 sm:gap-5 ${cols}`}
          variants={container}
          initial="hidden"
          animate={active ? 'show' : 'hidden'}
        >
          {items.map((p, i) => (
            <motion.div
              key={p.full_name || p.name}
              variants={item}
              className={i % 2 === 1 ? 'sm:mt-8' : ''}
            >
              <Tile p={p} i={i} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default function ProjectsGrid() {
  return (
    <Grid
      items={getFeaturedProjects()}
      eyebrow="02 — work"
      title="Selected"
      accent="projects"
      sub="Straight from my GitHub."
      cols="grid-cols-2 sm:grid-cols-3"
    />
  )
}
ProjectsGrid.fullBleed = true

export function SharedGrid() {
  const shared = getSharedProjects()
  if (!shared.length) return null
  return (
    <Grid
      items={shared}
      eyebrow="collaborations"
      title="Built"
      accent="with teams"
      sub={`${shared.length} projects I've contributed to with teammates.`}
      cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
    />
  )
}
SharedGrid.fullBleed = true
