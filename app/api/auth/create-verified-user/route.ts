import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, company, phone, phoneVerified, emailVerified } = body;

    // Crear usuario en Firebase Auth
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
      emailVerified: emailVerified || false
    });

    // Rol por defecto: 'registered' (no 'free')
    const role = 'registered';
    
    // Establecer custom claims
    await adminAuth.setCustomUserClaims(userRecord.uid, { role });

    // Guardar en Firestore
    await adminDb.collection('users').doc(userRecord.uid).set({
      email,
      firstName,
      lastName,
      company,
      phone,
      role: 'registered', // CAMBIADO DE 'free' A 'registered'
      phoneVerified: phoneVerified || false,
      emailVerified: emailVerified || false,
      createdAt: new Date(),
      lastLogin: new Date(),
      diagnosticsCompleted: 0,
      diagnosticsLimit: 3, // Límite para usuarios registered
      features: {
        diagnostics3D: true,
        basicReports: true,
        emailSupport: true
      }
    });

    // Crear custom token
    const customToken = await adminAuth.createCustomToken(userRecord.uid, { role });

    return NextResponse.json({
      success: true,
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        role: 'registered' // Confirmamos el rol
      },
      customToken,
      redirectTo: '/' // REDIRIGIR A HOME, NO A DASHBOARD
    });

  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: error.message || 'Error creating user' },
      { status: 500 }
    );
  }
}
