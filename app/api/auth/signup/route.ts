// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Inicializar Firebase Admin (server-side)
let adminApp: App;

if (getApps().length === 0) {
  // Para desarrollo local/Codespaces, usar configuración sin Service Account
  try {
    adminApp = initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    console.log('Firebase Admin initialized for development');
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
  }
} else {
  adminApp = getApps()[0];
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, phone, consultantCode } = await request.json();
    
    console.log('Server-side signup request for:', email);
    
    // Para desarrollo, usar Firebase Client SDK directamente
    // En producción, esto usaría Firebase Admin SDK con Service Account
    
    // Por ahora, retornar una respuesta que indique usar el cliente
    return NextResponse.json({
      success: false,
      useClientAuth: true,
      message: 'Use client-side authentication for development'
    });
    
  } catch (error: any) {
    console.error('Signup API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error in signup API',
        code: error.code,
      },
      { status: 400 }
    );
  }
}
