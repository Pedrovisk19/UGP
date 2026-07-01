'use client'

import { OTPInput, OTPInputContext } from 'input-otp'
import { Dot } from 'lucide-react'
import { cn } from '@/lib/utils'

const InputOTP = ({ ...props }: React.ComponentProps<typeof OTPInput>) => (
  <OTPInput
    {...props}
    className={cn('flex items-center gap-2 has-[:disabled]:opacity-50', props.className)}
  />
)

const InputOTPGroup = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center', className)} {...props} />
)

type SlotType = {
  char: string | null
  isActive: boolean
  hasFakeCaret: boolean
  placeholder: string | null
}

const InputOTPSlot = ({
  index,
  className,
}: {
  index: number
  className?: string
}) => (
  <OTPInputContext.Consumer>
    {(context) => {
      const slots = (context as unknown as { slots: SlotType[] }).slots
      const slot = slots?.[index]
      return (
        <div
          className={cn(
            'relative flex h-12 w-12 items-center justify-center border-y border-r border-white/10 text-base font-mono transition-all first:rounded-l-md first:border-l last:rounded-r-md',
            slot?.isActive &&
              'z-10 ring-2 ring-[hsl(var(--ring))] border-[hsl(var(--ring))]',
            slot?.char && 'border-[hsl(var(--primary))]',
            className
          )}
        >
          {slot?.char ? (
            <span>{slot.char}</span>
          ) : (
            <Dot className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          )}
          {slot?.hasFakeCaret && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center animate-pulse">
              <div className="h-4 w-px bg-white" />
            </div>
          )}
        </div>
      )
    }}
  </OTPInputContext.Consumer>
)

const InputOTPSeparator = () => (
  <div className="flex h-12 w-2 items-center justify-center text-[hsl(var(--muted-foreground))]">
    -
  </div>
)

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }