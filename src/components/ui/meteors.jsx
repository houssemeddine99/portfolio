import { cn } from '../../lib/cn.js'

// Aceternity Meteors — little shooting stars streaking across the background.
export function Meteors({ number = 20, className }) {
  const meteors = new Array(number).fill(true)
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {meteors.map((_, i) => (
        <span
          key={i}
          className={cn(
            "animate-meteor absolute h-0.5 w-0.5 rotate-[215deg] rounded-full bg-white shadow-[0_0_0_1px_#ffffff10]",
            "before:absolute before:top-1/2 before:h-px before:w-[60px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-white before:to-transparent before:content-['']",
            className,
          )}
          style={{
            top: `${Math.floor(Math.random() * 40)}%`,
            left: `${Math.floor(Math.random() * 100)}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
          }}
        />
      ))}
    </div>
  )
}

export default Meteors
