// lib/firebase.ts - Configuración robusta para todos los entornos
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
const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
const missingFields = requiredFields.filter(field => !firebaseConfig[field as keyof typeof firebaseConfig]);

if (missingFields.length > 0) {
  console.error('⚠️ Firebase configuration is incomplete. Missing fields:', missingFields);
  console.error('Check your .env.local file');
}

// Initialize Firebase (singleton pattern)
let app;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  throw error;
}

// Initialize Auth with proper settings
export const auth = getAuth(app);

// Configure Auth for development environments
if (typeof window !== 'undefined') {
  // Detectar si estamos en Codespaces
  const isCodespaces = window.location.hostname.includes('github.dev');
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isCodespaces || isLocalhost) {
    console.log('🔧 Configuring Firebase Auth for development environment');
    
    // Para desarrollo, usar el authDomain en lugar del dominio actual
    auth.settings.appVerificationDisabledForTesting = true;
  }
  
  // Log environment info
  console.log('📍 Environment Info:', {
    hostname: window.location.hostname,
    origin: window.location.origin,
    isCodespaces,
    isLocalhost,
    projectId: firebaseConfig.projectId
  });
}

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (only in browser and production)
let analytics = null;
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  isSupported().then(yes => {
    if (yes) {
      import('firebase/analytics').then(({ getAnalytics }) => {
        analytics = getAnalytics(app);
        console.log('📊 Analytics initialized');
      });
    }
  });
}

export { analytics };

// Helper function to check Firebase connection
export const checkFirebaseConnection = async () => {
  try {
    // Test Firestore connection
    const { doc, getDoc } = await import('firebase/firestore');
    const testDoc = await getDoc(doc(db, '_health_check_', 'test'));
    console.log('✅ Firestore connection successful');
    
    // Test Auth
    console.log('✅ Auth configured:', auth.name);
    
    return true;
  } catch (error) {
    console.error('❌ Firebase connection check failed:', error);
    return false;
  }
};

// Export Firebase app instance for debugging
export { app };
