import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDWf2DD7DkgH7P8vsRiAA11mIBbqvlkPYo",
  authDomain: "impulsa-lab.firebaseapp.com",
  databaseURL: "https://impulsa-lab-default-rtdb.firebaseio.com",
  projectId: "impulsa-lab",
  storageBucket: "impulsa-lab.firebasestorage.app",
  messagingSenderId: "778240447733",
  appId: "1:778240447733:web:d245261ca01b1bec3ba1bc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;