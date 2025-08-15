import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, updateDoc, doc, setDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { app } from '@/lib/firebase'

const auth = getAuth(app)

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

    // Obtener datos del signup desde sessionStorage (se pasan desde el frontend)
    let signupData = null
    try {
      // Los datos vienen del frontend
      const signupDataStr = request.headers.get('x-signup-data')
      if (signupDataStr) {
        signupData = JSON.parse(signupDataStr)
      }
    } catch (e) {
      console.log('No signup data found')
    }

    // Crear usuario en Firebase Auth
    if (signupData && signupData.password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          email, 
          signupData.password
        )
        
        // Guardar datos adicionales en Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email,
          name: signupData.name || '',
          phone: signupData.phone || '',
          emailVerified: true,
          role: signupData.isConsultant ? 'consultant' : 'registered',
          consultantCode: signupData.consultantCode || null,
          createdAt: new Date(),
          uid: userCredential.user.uid
        })
        
        return NextResponse.json({
          success: true,
          message: 'Usuario creado y verificado exitosamente',
          uid: userCredential.user.uid
        })
        
      } catch (authError: any) {
        if (authError.code === 'auth/email-already-in-use') {
          return NextResponse.json({
            success: true,
            message: 'Email ya registrado, verificación completada',
            existing: true
          })
        }
        throw authError
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Verificación exitosa'
    })

  } catch (error) {
    console.error('Error en verify-codes:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
