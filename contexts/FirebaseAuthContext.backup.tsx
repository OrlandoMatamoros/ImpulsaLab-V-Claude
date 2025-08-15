'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

type UserRole = 'public' | 'consultant'

interface UserData {
  email: string
  name: string
  phone: string
  role: UserRole
  createdAt: any
  updatedAt: any
}

interface AuthContextType {
  user: User | null
  userData: UserData | null
  loading: boolean
  signUp: (email: string, password: string, consultantCode?: string, additionalData?: { name: string; phone: string }) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  refreshUserData: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      if (user) {
        await fetchUserData(user.uid)
      } else {
        setUserData(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const fetchUserData = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId))
      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const signUp = async (email: string, password: string, consultantCode?: string, additionalData?: { name: string; phone: string }) => {
    setLoading(true)
    
    try {
      // Verificar código de consultor si se proporciona
      let isConsultant = false
      if (consultantCode) {
        const codesRef = collection(db, 'consultantCodes')
        const q = query(
          codesRef, 
          where('code', '==', consultantCode),
          where('isActive', '==', true),
          where('usedBy', '==', null)
        )
        const snapshot = await getDocs(q)
        
        if (snapshot.empty) {
          throw new Error('Código de consultor inválido o ya utilizado')
        }
        isConsultant = true
      }

      // Crear cuenta
      const { user } = await createUserWithEmailAndPassword(auth, email, password)

      // Crear documento de usuario
      const userData: UserData = {
        email,
        name: additionalData?.name || '',
        phone: additionalData?.phone || '',
        role: isConsultant ? 'consultant' : 'public',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }

      console.log('Creando usuario con datos:', userData) // Debug

      await setDoc(doc(db, 'users', user.uid), userData)

      // Marcar código como usado si es consultor
      if (isConsultant && consultantCode) {
        const codesRef = collection(db, 'consultantCodes')
        const q = query(codesRef, where('code', '==', consultantCode))
        const snapshot = await getDocs(q)
        
        if (!snapshot.empty) {
          const codeDoc = snapshot.docs[0]
          await updateDoc(doc(db, 'consultantCodes', codeDoc.id), {
            usedBy: user.uid,
            usedAt: serverTimestamp()
          })
        }
      }

      setUserData(userData)
    } catch (error: any) {
      console.error('Error en registro:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      await fetchUserData(user.uid)
    } catch (error: any) {
      console.error('Error en login:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    setLoading(true)
    
    try {
      await signOut(auth)
      setUser(null)
      setUserData(null)
    } catch (error) {
      console.error('Error en logout:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const refreshUserData = async () => {
    if (user) {
      await fetchUserData(user.uid)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      userData,
      loading,
      signUp,
      signIn,
      signOut: handleSignOut,
      refreshUserData
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un FirebaseAuthProvider')
  }
  return context
}