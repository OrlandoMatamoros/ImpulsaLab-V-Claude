import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Verificar variables
if (!process.env.FIREBASE_ADMIN_PROJECT_ID || 
    !process.env.FIREBASE_ADMIN_CLIENT_EMAIL || 
    !process.env.FIREBASE_ADMIN_PRIVATE_KEY_BASE64) {
  throw new Error('Firebase Admin environment variables are missing');
}

// Decodificar BASE64
const privateKey = Buffer.from(
  process.env.FIREBASE_ADMIN_PRIVATE_KEY_BASE64, 
  'base64'
).toString('utf-8');

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: privateKey,
  }),
};

const app = getApps().length === 0 
  ? initializeApp(firebaseAdminConfig) 
  : getApps()[0];

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);