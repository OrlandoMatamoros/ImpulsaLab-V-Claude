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
import { UserRole } from '@/types/user'

interface UserData {
  uid: string
  email: string
  name?: string
  phone?: string
  role: UserRole
  consultantCode?: string
  subscriptionStatus?: 'active' | 'inactive' | 'trial'
  createdAt: Date
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
  updateUserData: (data: Partial<UserData>) => Promise<void>
  checkUserRole: (requiredRole: UserRole) => boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateUserData: async () => {},
  checkUserRole: () => false
})

export const useAuth = () => useContext(AuthContext)

export function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      
      if (firebaseUser) {
        // Obtener datos adicionales del usuario desde Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (userDoc.exists()) {
            const data = userDoc.data()
            setUserData({
              uid: firebaseUser.uid,
              email: firebaseUser.email!,
              ...data,
              createdAt: data.createdAt?.toDate() || new Date()
            } as UserData)
            
            // Guardar token en cookie para el middleware
            const token = await firebaseUser.getIdToken()
            document.cookie = `auth-token=${encodeURIComponent(
              btoa(JSON.stringify({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                role: data.role || UserRole.REGISTERED
              }))
            )}.${token.substring(0, 20)}; path=/; max-age=3600; SameSite=Strict`
          } else {
            // Si no existe el documento, crear uno básico
            const newUserData: UserData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email!,
              role: UserRole.REGISTERED,
              createdAt: new Date(),
              emailVerified: firebaseUser.emailVerified
            }
            await setDoc(doc(db, 'users', firebaseUser.uid), newUserData)
            setUserData(newUserData)
          }
        } catch (error) {
          console.error('Error obteniendo datos del usuario:', error)
        }
      } else {
        setUserData(null)
        // Limpiar cookie
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      
      // Obtener datos del usuario
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
      if (userDoc.exists()) {
        const data = userDoc.data()
        
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
      }
    } catch (error: any) {
      console.error('Error en login:', error)
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Determinar el rol basado en el código de consultor
      let userRole = UserRole.REGISTERED
      
      if (consultantCode) {
        // Verificar si el código es válido en Firestore
        const codeDoc = await getDoc(doc(db, 'consultantCodes', consultantCode))
        if (codeDoc.exists() && codeDoc.data().isActive) {
          userRole = UserRole.CONSULTANT
          
          // Marcar el código como usado
          await updateDoc(doc(db, 'consultantCodes', consultantCode), {
            isActive: false,
            usedBy: userCredential.user.uid,
            usedAt: new Date()
          })
        }
      }
      
      // Crear documento del usuario en Firestore
      const newUserData: UserData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email!,
        name: additionalData?.name,
        phone: additionalData?.phone,
        role: userRole,
        consultantCode: consultantCode,
        createdAt: new Date(),
        emailVerified: false,
        phoneVerified: false,
        subscriptionStatus: 'inactive'
      }
      
      await setDoc(doc(db, 'users', userCredential.user.uid), newUserData)
      
      // Redirigir según el rol
      if (userRole === UserRole.CONSULTANT) {
        router.push('/consultant')
      } else {
        router.push('/diagnostico')
      }
    } catch (error: any) {
      console.error('Error en registro:', error)
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
      // Limpiar cookie
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      router.push('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      throw error
    }
  }

  const updateUserData = async (data: Partial<UserData>) => {
    if (!user) throw new Error('No hay usuario autenticado')
    
    try {
      await updateDoc(doc(db, 'users', user.uid), data)
      setUserData(prev => prev ? { ...prev, ...data } : null)
    } catch (error) {
      console.error('Error actualizando datos del usuario:', error)
      throw error
    }
  }

  const checkUserRole = (requiredRole: UserRole): boolean => {
    if (!userData) return false
    
    // Admin tiene acceso a todo
    if (userData.role === UserRole.ADMIN) return true
    
    // Verificar jerarquía de roles
    const roleHierarchy = {
      [UserRole.VISITOR]: 0,
      [UserRole.REGISTERED]: 1,
      [UserRole.CLIENT]: 2,
      [UserRole.CONSULTANT]: 2, // Mismo nivel que CLIENT pero rutas diferentes
      [UserRole.ADMIN]: 3
    }
    
    return roleHierarchy[userData.role] >= roleHierarchy[requiredRole]
  }

  const value = {
    user,
    userData,
    loading,
    signIn,
    signUp,
    signOut,
    updateUserData,
    checkUserRole
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}