'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { 
  User as FirebaseUser,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { signUpUser, signInUser, signOutUser } from '@/lib/auth-helper'
import { useRouter } from 'next/navigation'

// Definir roles
export enum UserRole {
  VISITOR = 'visitor',
  REGISTERED = 'registered',
  CLIENT = 'client',
  CONSULTANT = 'consultant',
  ADMIN = 'admin'
}

interface UserData {
  uid: string
  email: string
  name?: string
  phone?: string
  role: UserRole | string
  consultantCode?: string
  subscriptionStatus?: 'active' | 'inactive' | 'trial'
  createdAt: any
  emailVerified?: boolean
  phoneVerified?: boolean
}

interface AuthContextType {
  user: FirebaseUser | null
  userData: UserData | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, consultantCode?: string, additionalData?: any) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {}
})

export const useAuth = () => useContext(AuthContext)

export function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser?.email)
      setUser(firebaseUser)
      
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (userDoc.exists()) {
            const data = userDoc.data()
            console.log('User data found:', data)
            setUserData({
              uid: firebaseUser.uid,
              email: firebaseUser.email!,
              ...data
            } as UserData)
            
            // Guardar token en cookie
            const token = await firebaseUser.getIdToken()
            document.cookie = `auth-token=${encodeURIComponent(
              btoa(JSON.stringify({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                role: data.role || UserRole.REGISTERED
              }))
            )}.${token.substring(0, 20)}; path=/; max-age=3600; SameSite=Strict`
          } else {
            console.log('No user document found')
          }
        } catch (error) {
          console.error('Error getting user data:', error)
        }
      } else {
        setUserData(null)
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting login for:', email)
      const result = await signInUser(email, password)
      
      if (result.success && result.userData) {
        console.log('Login successful, role:', result.userData.role)
        
        // Redirigir según el rol
        switch(result.userData.role) {
          case 'admin':
            router.push('/admin')
            break
          case 'consultant':
            router.push('/consultant')
            break
          case 'client':
            router.push('/dashboard')
            break
          default:
            router.push('/diagnostico')
        }
      }
    } catch (error: any) {
      console.error('Login error:', error)
      throw new Error(
        error.code === 'auth/user-not-found' ? 'Usuario no encontrado' :
        error.code === 'auth/wrong-password' ? 'Contraseña incorrecta' :
        error.code === 'auth/invalid-email' ? 'Email inválido' :
        'Error al iniciar sesión'
      )
    }
  }

  const signUp = async (
    email: string, 
    password: string, 
    consultantCode?: string,
    additionalData?: { name?: string; phone?: string }
  ) => {
    try {
      console.log('Starting signup process for:', email)
      
      const result = await signUpUser({
        email,
        password,
        name: additionalData?.name,
        phone: additionalData?.phone,
        consultantCode
      })
      
      if (result.success) {
        console.log('Signup successful, role:', result.role)
        
        // Redirigir según el rol
        if (result.role === 'consultant') {
          router.push('/consultant')
        } else {
          router.push('/diagnostico')
        }
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      throw new Error(
        error.code === 'auth/email-already-in-use' ? 'Este email ya está registrado' :
        error.code === 'auth/weak-password' ? 'La contraseña debe tener al menos 6 caracteres' :
        error.code === 'auth/invalid-email' ? 'Email inválido' :
        error.message || 'Error al crear la cuenta'
      )
    }
  }

  const signOut = async () => {
    try {
      await signOutUser()
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      userData,
      loading,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}
