'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const ToastProvider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }
>(({ ...props }, ref) => <div ref={ref} {...props} />)
ToastProvider.displayName = 'ToastProvider'

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default: 'border-white/10 bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]',
        destructive: 'border-red-500/30 bg-red-950 text-red-100',
        success: 'border-emerald-500/30 bg-emerald-950 text-emerald-100',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

const Toast = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
))
Toast.displayName = 'Toast'

const ToastClose = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'absolute right-2 top-2 rounded-md p-1 text-[hsl(var(--muted-foreground))] opacity-70 transition-opacity hover:opacity-100',
        className
      )}
      {...props}
    >
      <X className="h-4 w-4" />
    </button>
  )
)
ToastClose.displayName = 'ToastClose'

const ToastTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm font-semibold', className)} {...props} />
  )
)
ToastTitle.displayName = 'ToastTitle'

const ToastDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-xs text-[hsl(var(--muted-foreground))]', className)} {...props} />
))
ToastDescription.displayName = 'ToastDescription'

const ToastViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-sm',
        className
      )}
      {...props}
    />
  )
)
ToastViewport.displayName = 'ToastViewport'

export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

export {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
}