import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';

if (!getApps().length) {
  try {
    let privateKey: string;
    
    // Intentar con base64 primero
    if (process.env.FIREBASE_ADMIN_PRIVATE_KEY_BASE64) {
      privateKey = Buffer.from(
        process.env.FIREBASE_ADMIN_PRIVATE_KEY_BASE64, 
        'base64'
      ).toString('utf-8');
      console.log('Using base64 encoded private key');
    } else if (process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
      // Si no hay base64, usar el key directo
      privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n');
      console.log('Using direct private key');
    } else {
      throw new Error('No Firebase private key found');
    }

    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
        privateKey: privateKey
      })
    });
    
    console.log('✅ Firebase Admin initialized');
  } catch (error) {
    console.error('❌ Firebase Admin error:', error);
  }
}

export const adminAuth = getAuth();
export const adminDb = getFirestore();
export { admin };
