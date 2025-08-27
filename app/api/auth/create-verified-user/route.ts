import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, company, phone, phoneVerified, emailVerified } = body;

    // Validar datos requeridos
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Usar valores por defecto si faltan datos
    const userData = {
      email,
      firstName: firstName || email.split('@')[0], // Usar parte del email si no hay nombre
      lastName: lastName || '',
      company: company || '',
      phone: phone || '',
      role: 'registered',
      phoneVerified: phoneVerified || false,
      emailVerified: emailVerified || false,
      createdAt: new Date(),
      lastLogin: new Date(),
      diagnosticsCompleted: 0,
      diagnosticsLimit: 3,
      features: {
        diagnostics3D: true,
        basicReports: true,
        emailSupport: true
      }
    };

    let userRecord;
    
    try {
      userRecord = await adminAuth.getUserByEmail(email);
      console.log('User exists, updating:', userRecord.uid);
      
      await adminAuth.updateUser(userRecord.uid, {
        password,
        displayName: `${userData.firstName} ${userData.lastName}`.trim() || email,
        emailVerified: true
      });
      
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        userRecord = await adminAuth.createUser({
          email,
          password,
          displayName: `${userData.firstName} ${userData.lastName}`.trim() || email,
          emailVerified: true
        });
        console.log('New user created:', userRecord.uid);
      } else {
        throw error;
      }
    }

    await adminAuth.setCustomUserClaims(userRecord.uid, { role: userData.role });

    const userDoc = await adminDb.collection('users').doc(userRecord.uid).get();
    
    if (!userDoc.exists) {
      await adminDb.collection('users').doc(userRecord.uid).set(userData);
    } else {
      await adminDb.collection('users').doc(userRecord.uid).update({
        ...userData,
        lastLogin: new Date()
      });
    }

    const customToken = await adminAuth.createCustomToken(userRecord.uid, { role: userData.role });

    return NextResponse.json({
      success: true,
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        role: userData.role
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
