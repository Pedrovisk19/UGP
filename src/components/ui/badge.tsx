import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Badge — pílula discreta para níveis/categorias/tech stack.
 */
const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium transition-colors',
  {
    variants: {
      variant: {
        purple: 'ugp-badge-purple',
        indigo: 'ugp-badge-indigo',
        green: 'ugp-badge-green',
        amber: 'ugp-badge-amber',
        blue: 'ugp-badge-blue',
        red: 'bg-[rgba(239,68,68,0.12)] text-rose-300 border-[rgba(239,68,68,0.22)]',
        neutral: 'ugp-badge-neutral',
        outline: 'bg-transparent border-[var(--border-strong)] text-[var(--text-secondary)]',
      },
    },
    defaultVariants: { variant: 'neutral' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }