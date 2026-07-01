'use client'

import { UGPProvider } from '@/providers/UGPProvider'
import { AppContent } from './AppContent'

export function UGPLayout({ children }: { children: React.ReactNode }) {
  return (
    <UGPProvider>
      <AppContent>{children}</AppContent>
    </UGPProvider>
  )
}