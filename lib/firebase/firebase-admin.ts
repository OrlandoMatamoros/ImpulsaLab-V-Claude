// lib/firebase-admin.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Verificar que las variables de entorno existen
if (!process.env.FIREBASE_ADMIN_PROJECT_ID || 
    !process.env.FIREBASE_ADMIN_CLIENT_EMAIL || 
    !process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
  throw new Error('Firebase Admin environment variables are missing');
}

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    // IMPORTANTE: Reemplazar \\n con saltos de línea reales
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
};

// Inicializar solo una vez
const app = getApps().length === 0 
  ? initializeApp(firebaseAdminConfig) 
  : getApps()[0];

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);