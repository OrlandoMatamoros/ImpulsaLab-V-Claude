'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { 
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

// Definir roles directamente aquí si no existe el archivo types/user.ts
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
  role: UserRole
  consultantCode?: string
  subscriptionStatus?: 'active' | 'inactive' | 'trial'
  createdAt: any // Firestore Timestamp
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
            console.log('No user document found, creating basic one')
            // Crear documento básico si no existe
            const newUserData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email!,
              role: UserRole.REGISTERED,
              createdAt: new Date(),
              emailVerified: firebaseUser.emailVerified,
              subscriptionStatus: 'inactive'
            }
            await setDoc(doc(db, 'users', firebaseUser.uid), newUserData)
            setUserData(newUserData as UserData)
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      
      // Esperar a que se carguen los datos del usuario
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
      if (userDoc.exists()) {
        const data = userDoc.data()
        console.log('Login successful, role:', data.role)
        
        // Redirigir según el rol
        switch(data.role) {
          case UserRole.ADMIN:
            router.push('/admin')
            break
          case UserRole.CONSULTANT:
            router.push('/consultant')
            break
          case UserRole.CLIENT:
            router.push('/dashboard')
            break
          default:
            router.push('/diagnostico')
        }
      } else {
        console.log('No user data found after login')
        router.push('/diagnostico')
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
      console.log('Starting signup for:', email, 'with consultant code:', consultantCode)
      
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log('Firebase Auth user created:', userCredential.user.uid)
      
      // Determinar el rol
      let userRole = UserRole.REGISTERED
      
      if (consultantCode) {
        console.log('Checking consultant code:', consultantCode)
        try {
          const codeDoc = await getDoc(doc(db, 'consultantCodes', consultantCode))
          console.log('Code document exists:', codeDoc.exists())
          console.log('Code data:', codeDoc.data())
          
          if (codeDoc.exists() && codeDoc.data().isActive) {
            userRole = UserRole.CONSULTANT
            console.log('Valid consultant code, setting role to CONSULTANT')
            
            // Marcar código como usado
            await updateDoc(doc(db, 'consultantCodes', consultantCode), {
              isActive: false,
              usedBy: userCredential.user.uid,
              usedAt: new Date()
            })
            console.log('Consultant code marked as used')
          } else {
            console.log('Invalid or inactive consultant code')
          }
        } catch (codeError) {
          console.error('Error checking consultant code:', codeError)
        }
      }
      
      // IMPORTANTE: Crear documento del usuario en Firestore
      const newUserData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email!,
        name: additionalData?.name || '',
        phone: additionalData?.phone || '',
        role: userRole,
        consultantCode: consultantCode || null,
        createdAt: new Date(),
        emailVerified: false,
        phoneVerified: false,
        subscriptionStatus: 'inactive'
      }
      
      console.log('Creating user document with data:', newUserData)
      
      // Crear el documento en Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), newUserData)
      console.log('User document created successfully')
      
      // Establecer userData localmente
      setUserData(newUserData as UserData)
      
      // Redirigir según el rol
      if (userRole === UserRole.CONSULTANT) {
        console.log('Redirecting to /consultant')
        router.push('/consultant')
      } else {
        console.log('Redirecting to /diagnostico')
        router.push('/diagnostico')
      }
    } catch (error: any) {
      console.error('Signup error:', error)
      throw new Error(
        error.code === 'auth/email-already-in-use' ? 'Este email ya está registrado' :
        error.code === 'auth/weak-password' ? 'La contraseña debe tener al menos 6 caracteres' :
        error.code === 'auth/invalid-email' ? 'Email inválido' :
        'Error al crear la cuenta'
      )
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
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