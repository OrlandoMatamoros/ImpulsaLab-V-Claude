// lib/auth-helper.ts
import { auth, db } from './firebase';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export interface SignUpData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  consultantCode?: string;
}

export const signUpUser = async (data: SignUpData) => {
  try {
    console.log('Starting client-side signup for:', data.email);
    
    // Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    
    console.log('User created with UID:', userCredential.user.uid);
    
    // Actualizar displayName si se proporcionó
    if (data.name) {
      await updateProfile(userCredential.user, {
        displayName: data.name
      });
    }
    
    // Determinar el rol
    let userRole = 'registered';
    
    if (data.consultantCode) {
      console.log('Checking consultant code:', data.consultantCode);
      
      try {
        const codeDoc = await getDoc(doc(db, 'consultantCodes', data.consultantCode));
        
        if (codeDoc.exists() && codeDoc.data()?.isActive) {
          userRole = 'consultant';
          console.log('Valid consultant code, setting role to consultant');
          
          // Marcar código como usado
          await updateDoc(doc(db, 'consultantCodes', data.consultantCode), {
            isActive: false,
            usedBy: userCredential.user.uid,
            usedAt: new Date()
          });
        } else {
          console.log('Invalid or inactive consultant code');
        }
      } catch (codeError) {
        console.error('Error checking consultant code:', codeError);
      }
    }
    
    // Crear documento del usuario en Firestore
    const userData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      name: data.name || '',
      phone: data.phone || '',
      role: userRole,
      consultantCode: data.consultantCode || null,
      createdAt: new Date(),
      emailVerified: false,
      phoneVerified: false,
      subscriptionStatus: 'inactive'
    };
    
    console.log('Creating user document with data:', userData);
    
    await setDoc(doc(db, 'users', userCredential.user.uid), userData);
    console.log('User document created successfully');
    
    return {
      success: true,
      user: userCredential.user,
      role: userRole
    };
    
  } catch (error: any) {
    console.error('SignUp error:', error);
    throw error;
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Obtener datos adicionales del usuario
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    
    if (userDoc.exists()) {
      return {
        success: true,
        user: userCredential.user,
        userData: userDoc.data()
      };
    }
    
    return {
      success: true,
      user: userCredential.user,
      userData: null
    };
    
  } catch (error: any) {
    console.error('SignIn error:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error('SignOut error:', error);
    throw error;
  }
};
