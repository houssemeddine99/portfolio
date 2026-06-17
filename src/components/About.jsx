import { profile } from '../config/profile.js'
import { Counter } from './ui.jsx'

export default function About() {
  const { paragraphs, stats } = profile.about
  return (
    <div className="flex h-full flex-col justify-center">
      <span className="eyebrow text-pink">about</span>
      <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
        I build complete web products — with <span className="text-grad">an AI you can interview</span>.
      </h2>

      <div className="mt-5 space-y-3 text-sm leading-relaxed text-haze">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 p-4">
            <div className="text-3xl font-extrabold text-grad">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-0.5 text-xs text-haze">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
