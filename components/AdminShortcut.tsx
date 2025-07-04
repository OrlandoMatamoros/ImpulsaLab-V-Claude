'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminShortcut() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl + Shift + A
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        router.push('/admin')
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [router])

  return null // No renderiza nada
}