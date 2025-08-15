import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'

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

    return NextResponse.json({
      success: true,
      message: 'Verificación exitosa',
      identifier
    })

  } catch (error) {
    console.error('Error en verify-codes:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
