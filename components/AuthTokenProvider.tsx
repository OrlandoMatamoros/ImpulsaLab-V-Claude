'use client'

import { useAuthToken } from '@/hooks/useAuthToken'

export function AuthTokenProvider({ children }: { children: React.ReactNode }) {
  useAuthToken()
  return <>{children}</>
}