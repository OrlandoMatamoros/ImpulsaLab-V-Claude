import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const { email, emailCode, smsCode } = await request.json();
    
    console.log('🔍 Verifying codes for:', email);
    
    // Obtener datos de verificación
    const docId = email.replace(/[^a-zA-Z0-9]/g, '_');
    const verificationDoc = await getDoc(doc(db, 'verifications', docId));
    
    if (!verificationDoc.exists()) {
      return NextResponse.json(
        { success: false, error: 'Códigos expirados o inválidos' },
        { status: 400 }
      );
    }
    
    const data = verificationDoc.data();
    
    // Verificar expiración
    if (new Date() > data.expiresAt.toDate()) {
      await deleteDoc(doc(db, 'verifications', docId));
      return NextResponse.json(
        { success: false, error: 'Los códigos han expirado' },
        { status: 400 }
      );
    }
    
    // Verificar intentos
    if (data.attempts >= 5) {
      await deleteDoc(doc(db, 'verifications', docId));
      return NextResponse.json(
        { success: false, error: 'Demasiados intentos fallidos' },
        { status: 400 }
      );
    }
    
    // Verificar códigos
    const emailValid = emailCode === data.emailCode;
    const smsValid = smsCode === data.smsCode;
    
    if (!emailValid || !smsValid) {
      // Incrementar intentos
      await updateDoc(doc(db, 'verifications', docId), {
        attempts: data.attempts + 1
      });
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Códigos incorrectos',
          emailValid,
          smsValid
        },
        { status: 400 }
      );
    }
    
    // Códigos correctos - Marcar como verificados
    await updateDoc(doc(db, 'verifications', docId), {
      emailVerified: true,
      phoneVerified: true,
      verifiedAt: new Date()
    });
    
    // Devolver los datos para crear el usuario
    return NextResponse.json({
      success: true,
      verified: true,
      userData: {
        email: data.email,
        name: data.name,
        phone: data.phone
      }
    });
    
  } catch (error: any) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}