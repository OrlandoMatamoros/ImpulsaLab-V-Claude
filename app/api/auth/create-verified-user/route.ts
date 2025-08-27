import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, company, phone, phoneVerified, emailVerified } = body;

    let userRecord;
    let isExistingUser = false;

    // Verificar si el usuario ya existe
    try {
      userRecord = await adminAuth.getUserByEmail(email);
      console.log('User already exists in Auth:', userRecord.uid);
      isExistingUser = true;
      
      // Actualizar password si es necesario
      await adminAuth.updateUser(userRecord.uid, {
        password,
        displayName: `${firstName} ${lastName}`,
        emailVerified: true
      });
      
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        // Crear nuevo usuario
        userRecord = await adminAuth.createUser({
          email,
          password,
          displayName: `${firstName} ${lastName}`,
          emailVerified: true
        });
        console.log('New user created:', userRecord.uid);
      } else {
        throw error;
      }
    }

    // SIEMPRE rol 'registered' para usuarios nuevos
    const role = 'registered';
    
    // Establecer claims
    await adminAuth.setCustomUserClaims(userRecord.uid, { role });

    // Verificar si existe en Firestore
    const userDoc = await adminDb.collection('users').doc(userRecord.uid).get();
    
    if (!userDoc.exists) {
      // Crear documento en Firestore
      await adminDb.collection('users').doc(userRecord.uid).set({
        email,
        firstName,
        lastName,
        company,
        phone,
        role: 'registered', // SIEMPRE registered
        phoneVerified: true,
        emailVerified: true,
        createdAt: new Date(),
        lastLogin: new Date(),
        diagnosticsCompleted: 0,
        diagnosticsLimit: 3,
        features: {
          diagnostics3D: true,
          basicReports: true,
          emailSupport: true
        }
      });
    } else {
      // Actualizar documento existente
      await adminDb.collection('users').doc(userRecord.uid).update({
        firstName,
        lastName,
        company,
        phone,
        role: 'registered', // Asegurar rol correcto
        phoneVerified: true,
        emailVerified: true,
        lastLogin: new Date()
      });
    }

    // Crear token
    const customToken = await adminAuth.createCustomToken(userRecord.uid, { role });

    return NextResponse.json({
      success: true,
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        role: 'registered',
        isExisting: isExistingUser
      },
      customToken,
      redirectTo: '/'
    });

  } catch (error: any) {
    console.error('Error creating/updating user:', error);
    return NextResponse.json(
      { error: error.message || 'Error processing user' },
      { status: 500 }
    );
  }
}
