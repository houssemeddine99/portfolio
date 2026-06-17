import { motion } from 'framer-motion'

// Cute little sparkles / stars / hearts that drift and twinkle across the bg.
const FLOATERS = [
  { c: '✨', l: '6%', t: '18%', s: 26, d: 6 },
  { c: '⭐', l: '14%', t: '70%', s: 20, d: 7 },
  { c: '💫', l: '24%', t: '34%', s: 24, d: 5.5 },
  { c: '🫧', l: '33%', t: '78%', s: 28, d: 8 },
  { c: '✨', l: '42%', t: '12%', s: 18, d: 6.5 },
  { c: '🌟', l: '52%', t: '60%', s: 22, d: 7.5 },
  { c: '💖', l: '60%', t: '24%', s: 20, d: 6 },
  { c: '✨', l: '68%', t: '74%', s: 24, d: 8.5 },
  { c: '⭐', l: '76%', t: '40%', s: 18, d: 6 },
  { c: '💫', l: '84%', t: '16%', s: 26, d: 7 },
  { c: '🫧', l: '90%', t: '64%', s: 22, d: 8 },
  { c: '🌟', l: '18%', t: '50%', s: 16, d: 5 },
  { c: '💖', l: '46%', t: '84%', s: 18, d: 7 },
  { c: '✨', l: '72%', t: '8%', s: 20, d: 6.5 },
  { c: '⭐', l: '38%', t: '54%', s: 14, d: 5.5 },
  { c: '🧸', l: '88%', t: '88%', s: 30, d: 9 },
]

export default function CuteFloaters() {
  return (
    <div className="absolute inset-0">
      {FLOATERS.map((f, i) => (
        <motion.span
          key={i}
          className="absolute select-none"
          style={{ left: f.l, top: f.t, fontSize: f.s }}
          animate={{ y: [0, -22, 0], opacity: [0.2, 0.85, 0.2], rotate: [0, 10, -6, 0] }}
          transition={{ duration: f.d, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }}
        >
          {f.c}
        </motion.span>
      ))}
    </div>
  )
}
