import { NextResponse } from 'next/server'
import { adminAuth, adminDb } from '@/lib/firebase-admin'

export async function POST(request: Request) {
  try {
    const { 
      email, 
      password, 
      name, 
      phone, 
      whatsappCode,
      consultantCode 
    } = await request.json()

    // Verificar código WhatsApp (simulado por ahora)
    if (whatsappCode !== '123456' && whatsappCode.length !== 6) {
      return NextResponse.json(
        { error: 'Código de WhatsApp inválido' },
        { status: 400 }
      )
    }

    // Determinar rol
    let role = 'free'
    if (consultantCode) {
      // Verificar si el código es válido
      const validCodes = [
                          'ALEX2025',
                          'CONS-2024-001',
                          'DIEGO2025',
                          'IMP-STAFF-001',
                          'KATTY2025'
                          ]
      if (validCodes.includes(consultantCode)) {
        role = 'consultant'
      } else {
        return NextResponse.json(
          { error: 'Código de consultor inválido' },
          { status: 400 }
        )
      }
    }

    // Crear usuario en Firebase Auth
    const userRecord = await adminAuth.createUser({
      email,
      password,
      emailVerified: true,
      phoneNumber: phone.startsWith('+') ? phone : `+${phone}`,
      displayName: name
    })

    // Guardar en Firestore
    await adminDb.collection('users').doc(userRecord.uid).set({
      email,
      name,
      phone,
      role,
      consultantCode: consultantCode || null,
      emailVerified: true,
      phoneVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    // Crear custom token para auto-login
    const customToken = await adminAuth.createCustomToken(userRecord.uid)

    console.log(`✅ Usuario creado exitosamente: ${email} con rol: ${role}`)

    return NextResponse.json({
      success: true,
      uid: userRecord.uid,
      email,
      role,
      customToken
    })

  } catch (error: any) {
    console.error('Error creando usuario:', error)
    
    if (error.code === 'auth/email-already-exists') {
      return NextResponse.json(
        { error: 'Este email ya está registrado' },
        { status: 400 }
      )
    }
    
    if (error.code === 'auth/invalid-phone-number') {
      return NextResponse.json(
        { error: 'Número de teléfono inválido. Incluye código de país (+52, +1, etc)' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error al crear usuario' },
      { status: 500 }
    )
  }
}