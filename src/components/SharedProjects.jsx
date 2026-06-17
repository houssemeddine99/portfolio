import { getSharedProjects } from '../lib/github.js'

// Intro card that opens the "collaborations" part of the fly-through.
export default function CollabIntro() {
  const count = getSharedProjects().length
  return (
    <div className="flex h-full flex-col justify-center">
      <span className="eyebrow text-pink">collaborations</span>
      <h2 className="mt-3 text-4xl font-extrabold leading-[0.95] sm:text-5xl">
        Built <span className="text-grad">with teams</span>
      </h2>
      <p className="mt-4 max-w-sm text-haze">
        {count} projects I've collaborated on with classmates &amp; teammates — keep flying to see them →
      </p>
    </div>
  )
}
