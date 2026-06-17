import { cn } from '../../lib/cn.js'

// Magic UI Border Beam — a glowing dot that travels around a card's border.
export function BorderBeam({
  className,
  size = 200,
  duration = 9,
  delay = 0,
  colorFrom = '#ff3d8b',
  colorTo = '#25e6d6',
}) {
  return (
    <div
      style={{
        '--size': size,
        '--duration': duration,
        '--delay': `-${delay}s`,
        '--color-from': colorFrom,
        '--color-to': colorTo,
      }}
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] [border:1px_solid_transparent]',
        '![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]',
        'after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:90%_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]',
        className,
      )}
    />
  )
}

export default BorderBeam
