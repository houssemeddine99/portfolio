import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis = null
const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Smooth scroll (Lenis) driven by GSAP's ticker, with ScrollTrigger kept in sync.
// This is what makes every scroll-linked animation feel fluid and "physical".
export function initScroll() {
  if (lenis || reduced()) return lenis
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1.05 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function scrollTo(target) {
  if (lenis) {
    lenis.scrollTo(target, { offset: 0, duration: 1.2 })
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  }
}

export { gsap, ScrollTrigger }
