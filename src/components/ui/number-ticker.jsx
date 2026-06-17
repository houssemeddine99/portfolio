import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

// Magic UI Number Ticker — springs a number up to its value when in view.
export function NumberTicker({ value, suffix = '', className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 60, stiffness: 100 })

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, value, motionValue])

  useEffect(() => {
    const unsub = spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US').format(Math.round(latest)) + suffix
      }
    })
    return unsub
  }, [spring, suffix])

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  )
}

export default NumberTicker
