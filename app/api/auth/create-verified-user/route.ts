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

    console.log('📝 Intentando crear usuario:', { email, name, phone })

    // Verificar código WhatsApp (por ahora aceptar cualquier código de 6 dígitos)
    if (!whatsappCode || whatsappCode.length !== 6) {
      return NextResponse.json(
        { error: 'Código de WhatsApp inválido' },
        { status: 400 }
      )
    }

    // Determinar rol
    let role = 'free'
    if (consultantCode) {
      const validCodes = [
        'ALEX2025',
        'CONS-2024-001', 
        'DIEGO2025',
        'IMP-STAFF-001',
        'KATTY2025'
      ]
      if (validCodes.includes(consultantCode)) {
        role = 'consultant'
      }
    }

    try {
      // Formatear teléfono correctamente
      let formattedPhone = phone
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = '+' + formattedPhone
      }
      
      console.log('📱 Teléfono formateado:', formattedPhone)

      // Crear usuario en Firebase Auth
      const userRecord = await adminAuth.createUser({
        email,
        password,
        emailVerified: true,
        phoneNumber: formattedPhone,
        displayName: name || email.split('@')[0]
      })

      console.log('✅ Usuario creado en Auth:', userRecord.uid)

      // Guardar en Firestore
      await adminDb.collection('users').doc(userRecord.uid).set({
        email,
        name: name || '',
        phone: formattedPhone,
        role,
        consultantCode: consultantCode || null,
        emailVerified: true,
        phoneVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })

      console.log('✅ Usuario guardado en Firestore')

      // Crear custom token para auto-login
      const customToken = await adminAuth.createCustomToken(userRecord.uid)

      return NextResponse.json({
        success: true,
        uid: userRecord.uid,
        email,
        role,
        customToken
      })

    } catch (authError: any) {
      console.error('❌ Error en Firebase Auth:', authError)
      
      if (authError.code === 'auth/email-already-exists') {
        return NextResponse.json(
          { error: 'Este email ya está registrado' },
          { status: 400 }
        )
      }
      
      if (authError.code === 'auth/invalid-phone-number') {
        return NextResponse.json(
          { error: `Número inválido: ${phone}. Usa formato: +19293686749` },
          { status: 400 }
        )
      }

      throw authError
    }

  } catch (error: any) {
    console.error('❌ Error general:', error)
    return NextResponse.json(
      { error: error.message || 'Error al crear usuario' },
      { status: 500 }
    )
  }
}