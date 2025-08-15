import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(request: NextRequest) {
  try {
    const { email, code, password, userData } = await request.json();
    
    console.log('Verifying code for:', email);
    
    // 1. Buscar el código en Firestore
    const codesSnapshot = await adminDb
      .collection('verification_codes')
      .where('email', '==', email)
      .where('code', '==', code)
      .where('used', '==', false)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();
    
    if (codesSnapshot.empty) {
      return NextResponse.json(
        { error: 'Código inválido o expirado' },
        { status: 400 }
      );
    }
    
    const codeDoc = codesSnapshot.docs[0];
    const codeData = codeDoc.data();
    
    // 2. Verificar expiración
    if (new Date() > codeData.expiresAt.toDate()) {
      return NextResponse.json(
        { error: 'El código ha expirado' },
        { status: 400 }
      );
    }
    
    // 3. Marcar código como usado
    await adminDb.collection('verification_codes').doc(codeDoc.id).update({
      used: true,
      usedAt: new Date()
    });
    
    // 4. Crear usuario en Firebase Auth
    const userRecord = await adminAuth.createUser({
      email,
      password,
      emailVerified: true
    });
    
    console.log('User created in Auth:', userRecord.uid);
    
    // 5. Hash de la contraseña para Firestore
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 6. Determinar el rol
    let role = 'registered';
    if (codeData.isConsultant && userData?.consultantCode) {
      // Verificar código de consultor
      const consultantCodeSnapshot = await adminDb
        .collection('consultantCodes')
        .where('code', '==', userData.consultantCode)
        .where('used', '==', false)
        .limit(1)
        .get();
      
      if (!consultantCodeSnapshot.empty) {
        role = 'consultant';
        // Marcar código de consultor como usado
        await adminDb.collection('consultantCodes')
          .doc(consultantCodeSnapshot.docs[0].id)
          .update({ used: true, usedBy: email, usedAt: new Date() });
      }
    }
    
    // 7. Guardar datos en Firestore
    await adminDb.collection('users').doc(userRecord.uid).set({
      email,
      password: hashedPassword,
      role,
      name: userData?.name || '',
      company: userData?.company || '',
      phone: userData?.phone || '',
      createdAt: new Date(),
      lastLogin: new Date(),
      isActive: true,
      emailVerified: true
    });
    
    console.log('User data saved to Firestore');
    
    // 8. Crear custom token para login automático
    const customToken = await adminAuth.createCustomToken(userRecord.uid, {
      role,
      email
    });
    
    // 9. Crear JWT para cookie de sesión
    const jwt = await new SignJWT({ 
      uid: userRecord.uid, 
      email, 
      role 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(JWT_SECRET);
    
    // 10. Respuesta con tokens
    const response = NextResponse.json({
      success: true,
      customToken,
      user: {
        uid: userRecord.uid,
        email,
        role
      }
    });
    
    // 11. Setear cookie httpOnly
    response.cookies.set('auth-token', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 días
    });
    
    return response;
    
  } catch (error) {
    console.error('❌ Error in verify-codes:', error);
    
    return NextResponse.json(
      { 
        error: 'Error al verificar el código',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
