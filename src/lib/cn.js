import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// The standard 21st.dev / shadcn class-merging helper.
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
