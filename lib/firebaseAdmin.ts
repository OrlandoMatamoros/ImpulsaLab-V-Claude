// lib/firebaseAdmin.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';

if (!getApps().length) {
  try {
    // Usar Base64 para el private key
    const privateKeyBase64 = process.env.FIREBASE_ADMIN_PRIVATE_KEY_BASE64;
    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;

    if (!privateKeyBase64 || !projectId || !clientEmail) {
      throw new Error('Missing Firebase Admin credentials');
    }

    // Decodificar el private key de base64
    const privateKey = Buffer.from(privateKeyBase64, 'base64').toString('utf-8');

    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey
      })
    });
    
    console.log('✅ Firebase Admin initialized with Base64 key');
  } catch (error) {
    console.error('❌ Firebase Admin initialization failed:', error);
    // No lanzar error para que el build continúe
  }
}

export const adminAuth = getAuth();
export const adminDb = getFirestore();
export { admin };
