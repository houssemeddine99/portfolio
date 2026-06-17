import confetti from 'canvas-confetti'

const COLORS = ['#ff3d8b', '#9b5cff', '#25e6d6', '#ffc24b', '#4d7cff']

// A small themed confetti burst — fired from a screen position (0–1 coords).
export function celebrate(x = 0.9, y = 0.85) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  confetti({
    particleCount: 55,
    spread: 75,
    startVelocity: 32,
    origin: { x, y },
    colors: COLORS,
    scalar: 0.9,
    ticks: 120,
    disableForReducedMotion: true,
  })
}
