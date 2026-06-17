import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../config/profile.js'

// Cinematic intro: a count to 100 while the name sits behind a rising curtain.
export default function Loader({ onDone }) {
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOpen(false)
      onDone?.()
      return
    }
    let raf
    let start
    const dur = 1500
    const step = (t) => {
      if (start === undefined) start = t
      const p = Math.min((t - start) / dur, 1)
      setCount(Math.round((1 - Math.pow(1 - p, 2)) * 100))
      if (p < 1) raf = requestAnimationFrame(step)
      else setTimeout(() => setOpen(false), 350)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <AnimatePresence onExitComplete={() => onDone?.()}>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-paper p-6 text-ink sm:p-10"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="eyebrow text-cream/60">Houssem Eddine — portfolio</div>

          <div className="flex items-end justify-between">
            <motion.h1
              className="display text-[18vw] leading-none sm:text-[12vw]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {profile.identity.name.split(' ')[0]}
              <span className="text-flame">.</span>
            </motion.h1>
            <span className="font-mono text-2xl tabular-nums text-cream/70 sm:text-4xl">
              {String(count).padStart(3, '0')}
            </span>
          </div>

          <div className="h-px w-full bg-cream/20">
            <motion.div
              className="h-full bg-flame"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
