import { useEffect } from 'react'
import { onIdTokenChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import Cookies from 'js-cookie'

export function useAuthToken() {
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken()
        Cookies.set('firebase-auth-token', token, { expires: 7 })
      } else {
        Cookies.remove('firebase-auth-token')
      }
    })

    return () => unsubscribe()
  }, [])
}