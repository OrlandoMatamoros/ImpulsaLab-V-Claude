import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Log para debugging
console.log('Initializing Firebase Admin...');
console.log('Project ID:', process.env.FIREBASE_ADMIN_PROJECT_ID ? 'Set' : 'Missing');
console.log('Client Email:', process.env.FIREBASE_ADMIN_CLIENT_EMAIL ? 'Set' : 'Missing');
console.log('Private Key:', process.env.FIREBASE_ADMIN_PRIVATE_KEY ? 'Set (length: ' + process.env.FIREBASE_ADMIN_PRIVATE_KEY.length + ')' : 'Missing');

if (!process.env.FIREBASE_ADMIN_PROJECT_ID || 
    !process.env.FIREBASE_ADMIN_CLIENT_EMAIL || 
    !process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
  throw new Error('Firebase Admin environment variables are missing');
}

let adminAuth: any;
let adminDb: any;

try {
  const firebaseAdminConfig = {
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  };

  const app = getApps().length === 0 
    ? initializeApp(firebaseAdminConfig) 
    : getApps()[0];

  adminAuth = getAuth(app);
  adminDb = getFirestore(app);
  
  console.log('✅ Firebase Admin initialized successfully');
} catch (error) {
  console.error('❌ Error initializing Firebase Admin:', error);
  throw error;
}

export { adminAuth, adminDb };
