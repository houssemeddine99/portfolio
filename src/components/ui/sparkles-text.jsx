import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/cn.js'

// Magic UI Sparkles Text — twinkling stars dance around the text.
export function SparklesText({ children, className, count = 10, colors = ['#ff3d8b', '#9b5cff', '#25e6d6', '#ffc24b'] }) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        color: colors[i % colors.length],
        size: 8 + Math.random() * 12,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 2.5,
        dur: 1.3 + Math.random() * 1.6,
      })),
    [count], // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <span className={cn('relative inline-block', className)}>
      {sparkles.map((s) => (
        <motion.svg
          key={s.id}
          className="pointer-events-none absolute z-20"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
          viewBox="0 0 20 20"
          fill={s.color}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 120, 180] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        >
          <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" />
        </motion.svg>
      ))}
      <strong className="relative z-10 font-[inherit]">{children}</strong>
    </span>
  )
}

export default SparklesText
