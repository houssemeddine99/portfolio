import { Children, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '../lib/scroll.js'
import { BorderBeam } from './ui/border-beam.jsx'

// Fly THROUGH a 3D world: the camera moves forward along Z as you scroll, so
// each section rushes toward you from the depth, grows to full size as you
// reach it, then fades as you pass. Pure CSS 3D + GSAP (no WebGL).
const GAP = 1500 // distance between sections in 3D space
const FADE = 1200 // how close a section must be to be visible

export default function Tunnel({ children }) {
  const wrap = useRef(null)
  const world = useRef(null)
  const items = Children.toArray(children)
  const N = Math.max(items.length, 1)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const sections = gsap.utils.toArray('.fly-section', world.current)

      const apply = (z) => {
        world.current.style.transform = `translateZ(${z}px)`
        sections.forEach((el, i) => {
          const dist = Math.abs(z - i * GAP)
          const op = Math.max(0, 1 - dist / FADE)
          el.style.opacity = op
          el.style.visibility = op < 0.01 ? 'hidden' : 'visible'
          el.style.pointerEvents = dist < GAP * 0.45 ? 'auto' : 'none'
          // mark the section you've arrived at → triggers staggered pop-ins
          el.classList.toggle('fly-active', dist < GAP * 0.35)
        })
      }
      apply(0)

      const st = ScrollTrigger.create({
        trigger: wrap.current,
        start: 'top top',
        end: () => '+=' + window.innerHeight * N,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => apply(self.progress * (N - 1) * GAP),
      })

      const refresh = () => ScrollTrigger.refresh()
      window.addEventListener('load', refresh)
      const t = setTimeout(refresh, 600)
      return () => {
        st.kill()
        window.removeEventListener('load', refresh)
        clearTimeout(t)
      }
    },
    { scope: wrap, dependencies: [N] },
  )

  if (reduced) {
    return (
      <div className="flex flex-col items-center gap-10 px-5 py-28">
        {items.map((c, i) => (
          <div key={i} className="fly-active">
            <Frame child={c} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={wrap} className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0" style={{ perspective: '1000px' }}>
        <div ref={world} className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {items.map((child, i) => (
            <div
              key={i}
              className="fly-section absolute inset-0 grid place-items-center"
              style={{ transform: `translateZ(${-i * GAP}px)` }}
            >
              <Frame child={child} />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 eyebrow text-haze">
        scroll to fly
        <span className="animate-bounce text-grad">↑</span>
      </div>
    </div>
  )
}

// A premium card: glass + traveling BorderBeam + a glow that follows the cursor.
function Frame({ child }) {
  const [pos, setPos] = useState({ x: -400, y: -400 })
  const [on, setOn] = useState(false)
  return (
    <div className="w-[90vw] max-w-[620px]">
      <div
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
        }}
        onMouseEnter={() => setOn(true)}
        onMouseLeave={() => setOn(false)}
        className="relative max-h-[80vh] overflow-hidden rounded-3xl glass shadow-2xl"
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: on ? 1 : 0,
            background: `radial-gradient(340px circle at ${pos.x}px ${pos.y}px, rgba(255,61,139,0.18), transparent 65%)`,
          }}
        />
        <div className="relative z-10 max-h-[80vh] overflow-y-auto p-8">{child}</div>
        <BorderBeam duration={10} />
      </div>
    </div>
  )
}
