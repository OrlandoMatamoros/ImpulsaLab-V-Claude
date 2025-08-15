// lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Configuración segura con variables de entorno
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Validación de configuración
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('⚠️ Firebase configuration is incomplete. Check your .env.local file');
}

// Initialize Firebase (singleton pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Analytics (only in browser)
// Analytics - desactivado en desarrollo
export const analytics = null;

// Para activar en producción, descomentar:
// export const analytics = typeof window !== 'undefined' && process.env.NODE_ENV === 'production'
//   ? isSupported().then(yes => yes ? getAnalytics(app) : null)
//   : null;