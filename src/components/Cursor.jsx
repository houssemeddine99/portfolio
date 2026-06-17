import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Editorial cursor: a small ink disc that grows into a flame ring with a label
// ("ASK", "OPEN", "VIEW") over interactive elements via data-cursor.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')
  const [active, setActive] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target.closest('a, button, input, textarea, [data-cursor]')
      setActive(Boolean(el))
      setLabel(el?.getAttribute?.('data-cursor') && el.getAttribute('data-cursor') !== 'true' ? el.getAttribute('data-cursor') : '')
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] grid place-items-center rounded-full pointer-events-none"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: active ? (label ? 64 : 40) : 12,
        height: active ? (label ? 64 : 40) : 12,
        backgroundColor: active ? '#ff3d8b' : '#f6f5ff',
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
    >
      {label && (
        <span className="eyebrow text-[9px] text-paper" style={{ letterSpacing: '0.1em' }}>
          {label}
        </span>
      )}
    </motion.div>
  )
}
