import { NextRequest, NextResponse } from 'next/server';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export async function POST(request: NextRequest) {
  try {
    const { 
      email, 
      password, 
      name, 
      phone, 
      consultantCode,
      emailVerified,
      phoneVerified 
    } = await request.json();
    
    console.log('Creating verified user:', email);
    
    // Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Actualizar displayName
    if (name) {
      await updateProfile(userCredential.user, {
        displayName: name
      });
    }
    
    // Determinar rol
    let userRole = 'registered';
    
    if (consultantCode) {
      const codeDoc = await getDoc(doc(db, 'consultantCodes', consultantCode));
      if (codeDoc.exists() && codeDoc.data().isActive) {
        userRole = 'consultant';
        
        // Marcar código como usado
        await updateDoc(doc(db, 'consultantCodes', consultantCode), {
          isActive: false,
          usedBy: userCredential.user.uid,
          usedAt: new Date()
        });
      }
    }
    
    // Crear documento del usuario con verificación confirmada
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      uid: userCredential.user.uid,
      email,
      name: name || '',
      phone: phone || '',
      role: userRole,
      consultantCode: userRole === 'consultant' ? consultantCode : null,
      createdAt: new Date(),
      emailVerified: true,  // Ya verificado
      phoneVerified: true,  // Ya verificado
      subscriptionStatus: 'inactive'
    });
    
    return NextResponse.json({
      success: true,
      uid: userCredential.user.uid,
      role: userRole
    });
    
  } catch (error: any) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
