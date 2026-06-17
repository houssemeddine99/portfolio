import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../lib/scroll.js'

// Top gradient bar showing how far through the horizontal journey you are.
export default function ScrollProgress() {
  const bar = useRef(null)
  useGSAP(() => {
    gsap.set(bar.current, { scaleX: 0, transformOrigin: 'left center' })
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => gsap.to(bar.current, { scaleX: self.progress, duration: 0.2, overwrite: true }),
    })
  }, [])

  return (
    <div className="fixed inset-x-0 top-0 z-[130] h-1">
      <div ref={bar} className="h-full w-full bg-grad" />
    </div>
  )
}
