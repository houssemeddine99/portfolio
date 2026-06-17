import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

// Full-screen horizontal slide.
export function Panel({ id, children, className = '' }) {
  return (
    <section
      id={id}
      className={`relative flex h-screen w-screen shrink-0 flex-col justify-center px-6 py-20 sm:px-16 ${className}`}
    >
      {children}
    </section>
  )
}

// Fade + rise into view (fires as a panel slides in horizontally too).
export function Reveal({ children, delay = 0, y = 26, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function MaskLine({ children, delay = 0, className = '' }) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function Magnetic({ children, strength = 0.4, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18 })
  const sy = useSpring(y, { stiffness: 250, damping: 18 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x: sx, y: sy }} className={className}>
      {children}
    </motion.div>
  )
}

export function Counter({ value, suffix = '', duration = 1500 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView || typeof value !== 'number') return
    let raf, start
    const step = (t) => {
      if (start === undefined) start = t
      const p = Math.min((t - start) / duration, 1)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * value))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])
  return (
    <span ref={ref}>
      {typeof value === 'number' ? n : value}
      {suffix}
    </span>
  )
}
