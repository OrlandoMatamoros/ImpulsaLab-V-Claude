import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

if (!process.env.FIREBASE_ADMIN_PROJECT_ID || 
    !process.env.FIREBASE_ADMIN_CLIENT_EMAIL || 
    !process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
  console.error('⚠️ Firebase Admin environment variables are missing');
  throw new Error('Firebase Admin configuration is incomplete');
}

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
};

const app = getApps().length === 0 
  ? initializeApp(firebaseAdminConfig) 
  : getApps()[0];

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);

console.log('✅ Firebase Admin initialized successfully');
