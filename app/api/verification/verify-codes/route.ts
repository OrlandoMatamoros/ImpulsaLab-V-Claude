import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, updateDoc, doc, setDoc } from 'firebase/firestore'

export async function POST(request: NextRequest) {
  try {
    const { email, phoneNumber, code, password, name } = await request.json()

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

    // Crear/actualizar usuario en Firestore (sin Firebase Auth por ahora)
    const userId = email.replace(/[^a-zA-Z0-9]/g, '_')
    await setDoc(doc(db, 'users', userId), {
      email,
      name: name || '',
      emailVerified: true,
      role: 'registered',
      createdAt: new Date(),
      uid: userId
    }, { merge: true })

    return NextResponse.json({
      success: true,
      message: 'Verificación exitosa',
      uid: userId
    })

  } catch (error) {
    console.error('Error en verify-codes:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
