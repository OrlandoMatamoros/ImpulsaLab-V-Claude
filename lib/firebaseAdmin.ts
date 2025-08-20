import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

if (!process.env.FIREBASE_ADMIN_PROJECT_ID || 
    !process.env.FIREBASE_ADMIN_CLIENT_EMAIL || 
    !process.env.FIREBASE_ADMIN_PRIVATE_KEY_BASE64) {  // CAMBIO AQUÍ
  throw new Error('Firebase Admin environment variables are missing');
}

// DECODIFICAR BASE64
const privateKey = Buffer.from(
  process.env.FIREBASE_ADMIN_PRIVATE_KEY_BASE64, 
  'base64'
).toString('utf-8');

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: privateKey, // YA DECODIFICADA
  }),
};

const app = getApps().length === 0 
  ? initializeApp(firebaseAdminConfig) 
  : getApps()[0];

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);

console.log('✅ Firebase Admin inicializado con BASE64');