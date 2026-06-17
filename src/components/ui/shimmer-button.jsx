import { cn } from '../../lib/cn.js'

// Magic UI–style Shimmer Button: gradient fill with a gloss that sweeps across.
export function ShimmerButton({ children, className, as: Tag = 'button', ...props }) {
  return (
    <Tag
      {...props}
      className={cn(
        'group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-grad px-6 py-3 font-semibold text-white shadow-[0_8px_30px_rgba(255,61,139,0.35)] transition-transform active:scale-95',
        className,
      )}
    >
      <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shimmer-slide bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </Tag>
  )
}

export default ShimmerButton
