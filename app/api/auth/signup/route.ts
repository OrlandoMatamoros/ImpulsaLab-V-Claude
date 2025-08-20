// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, phone, consultantCode } = await request.json();
    
    console.log('Server-side signup request for:', email);
    
    // Validar datos requeridos
    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email y contraseña son requeridos' 
        },
        { status: 400 }
      );
    }

    // Determinar rol basado en código de consultor
    let role = 'free';
    if (consultantCode) {
      const validCodes = [
        'ALEX2025',
        'CONS-2024-001', 
        'DIEGO2025',
        'IMP-STAFF-001',
        'KATTY2025'
      ];
      
      if (validCodes.includes(consultantCode)) {
        role = 'consultant';
      } else {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Código de consultor inválido' 
          },
          { status: 400 }
        );
      }
    }

    try {
      // Crear usuario en Firebase Auth
      const userRecord = await adminAuth.createUser({
        email,
        password,
        displayName: name || email.split('@')[0],
        phoneNumber: phone?.startsWith('+') ? phone : phone ? `+${phone}` : undefined
      });

      console.log('✅ Usuario creado en Auth:', userRecord.uid);

      // Guardar datos adicionales en Firestore
      await adminDb.collection('users').doc(userRecord.uid).set({
        email,
        name: name || '',
        phone: phone || '',
        role,
        consultantCode: consultantCode || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        emailVerified: false,
        phoneVerified: false
      });

      console.log('✅ Usuario guardado en Firestore con rol:', role);

      // Crear custom token para auto-login
      const customToken = await adminAuth.createCustomToken(userRecord.uid);

      return NextResponse.json({
        success: true,
        uid: userRecord.uid,
        email,
        role,
        customToken,
        message: 'Usuario creado exitosamente'
      });

    } catch (authError: any) {
      console.error('Error en Firebase Auth:', authError);
      
      // Manejar errores específicos de Firebase
      if (authError.code === 'auth/email-already-exists') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Este email ya está registrado' 
          },
          { status: 400 }
        );
      }
      
      if (authError.code === 'auth/invalid-phone-number') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Número de teléfono inválido. Incluye código de país (+52, +1, etc)' 
          },
          { status: 400 }
        );
      }

      if (authError.code === 'auth/weak-password') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'La contraseña debe tener al menos 6 caracteres' 
          },
          { status: 400 }
        );
      }

      throw authError;
    }
    
  } catch (error: any) {
    console.error('Signup API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al crear cuenta',
        code: error.code,
      },
      { status: 500 }
    );
  }
}