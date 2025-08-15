import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, updateDoc, doc, setDoc } from 'firebase/firestore'
import { auth } from '@/lib/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, phoneNumber, code } = await request.json()

    if (!code || (!email && !phoneNumber)) {
      return NextResponse.json(
        { success: false, error: 'Datos incompletos' },
        { status: 400 }
      )
    }

    const identifier = email || phoneNumber

    // Buscar código en Firestore
    const codesQuery = query(
      collection(db, 'verification_codes'),
      where('identifier', '==', identifier),
      where('code', '==', code),
      where('used', '==', false)
    )

    const snapshot = await getDocs(codesQuery)

    if (snapshot.empty) {
      return NextResponse.json(
        { success: false, error: 'Código inválido o expirado' },
        { status: 400 }
      )
    }

    // Marcar código como usado
    const codeDoc = snapshot.docs[0]
    await updateDoc(doc(db, 'verification_codes', codeDoc.id), {
      used: true,
      usedAt: new Date()
    })

    // Crear usuario en Firebase Auth con contraseña temporal
    try {
      const tempPassword = Math.random().toString(36).slice(-8) + 'A1!'
      const userCredential = await createUserWithEmailAndPassword(auth, email, tempPassword)
      
      // Guardar datos del usuario en Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        emailVerified: true,
        role: 'registered',
        createdAt: new Date(),
        uid: userCredential.user.uid
      })
      
      return NextResponse.json({
        success: true,
        message: 'Verificación exitosa',
        uid: userCredential.user.uid,
        tempPassword // Enviar para que el usuario la cambie
      })
      
    } catch (authError: any) {
      // Si el usuario ya existe, solo actualizar verificación
      if (authError.code === 'auth/email-already-in-use') {
        return NextResponse.json({
          success: true,
          message: 'Email verificado exitosamente',
          existing: true
        })
      }
      throw authError
    }

  } catch (error) {
    console.error('Error en verify-codes:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
