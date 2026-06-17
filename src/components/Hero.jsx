import { motion } from 'framer-motion'
import { profile } from '../config/profile.js'
import { SparklesText } from './ui/sparkles-text.jsx'

export default function Hero() {
  const { name, role, tagline, availability } = profile.identity
  return (
    <div className="flex h-full flex-col justify-center">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs"
      >
        <span className="h-2 w-2 rounded-full bg-cyan animate-blink" />
        {availability}
      </motion.span>

      <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
        <span className="text-snow">{name.split(' ')[0]}</span>
        <br />
        <SparklesText>
          <span className="text-grad">{name.split(' ').slice(1).join(' ')}.</span>
        </SparklesText>
      </h1>

      <p className="mt-5 text-xl font-semibold text-snow">{role}</p>
      <p className="mt-3 text-haze">{tagline}</p>

      <p className="mt-8 eyebrow text-haze">scroll to fly through · meet Yuki ↘</p>
    </div>
  )
}
