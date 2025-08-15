// lib/auth-helper.ts - Versión mejorada con verificación de email
import { auth, db } from './firebase';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export interface SignUpData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  consultantCode?: string;
}

// Configuración de verificación de email
const actionCodeSettings = {
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://tuimpulsalab.com',
  handleCodeInApp: true,
};

export const signUpUser = async (data: SignUpData) => {
  try {
    console.log('🚀 Starting signup process for:', data.email);
    
    // 1. Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    
    console.log('✅ User created in Auth with UID:', userCredential.user.uid);
    
    // 2. Actualizar displayName si se proporcionó
    if (data.name) {
      await updateProfile(userCredential.user, {
        displayName: data.name
      });
      console.log('✅ Display name updated');
    }
    
    // 3. Enviar email de verificación
    try {
      await sendEmailVerification(userCredential.user);
      console.log('📧 Verification email sent to:', data.email);
    } catch (emailError) {
      console.error('⚠️ Error sending verification email:', emailError);
    }
    
    // 4. Determinar el rol basado en el código de consultor
    let userRole = 'registered';
    let codeUsed = false;
    
    if (data.consultantCode) {
      console.log('🔍 Checking consultant code:', data.consultantCode);
      
      try {
        const codeDoc = await getDoc(doc(db, 'consultantCodes', data.consultantCode));
        console.log('📄 Code document exists:', codeDoc.exists());
        
        if (codeDoc.exists()) {
          const codeData = codeDoc.data();
          console.log('📊 Code data:', codeData);
          
          if (codeData.isActive === true) {
            userRole = 'consultant';
            codeUsed = true;
            console.log('✅ Valid consultant code, setting role to consultant');
            
            // Marcar código como usado
            try {
              await updateDoc(doc(db, 'consultantCodes', data.consultantCode), {
                isActive: false,
                usedBy: userCredential.user.uid,
                usedAt: new Date()
              });
              console.log('✅ Consultant code marked as used');
            } catch (updateError) {
              console.error('❌ Error updating consultant code:', updateError);
            }
          } else {
            console.log('⚠️ Consultant code is not active');
          }
        } else {
          console.log('⚠️ Consultant code does not exist');
        }
      } catch (codeError) {
        console.error('❌ Error checking consultant code:', codeError);
      }
    }
    
    // 5. Crear documento del usuario en Firestore
    const userData = {
      uid: userCredential.user.uid,
      email: data.email,
      name: data.name || '',
      phone: data.phone || '',
      role: userRole,
      consultantCode: codeUsed ? data.consultantCode : null,
      createdAt: new Date(),
      emailVerified: false,
      phoneVerified: false,
      subscriptionStatus: 'inactive',
      requiresEmailVerification: true
    };
    
    console.log('📝 Creating user document with data:', userData);
    
    try {
      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      console.log('✅ User document created successfully in Firestore');
    } catch (firestoreError) {
      console.error('❌ Error creating user document in Firestore:', firestoreError);
      
      // Si falla, intentar con datos mínimos
      try {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: data.email,
          role: userRole,
          createdAt: new Date()
        });
        console.log('✅ Minimal user document created');
      } catch (minimalError) {
        console.error('❌ Even minimal document creation failed:', minimalError);
        throw minimalError;
      }
    }
    
    return {
      success: true,
      user: userCredential.user,
      role: userRole,
      emailSent: true,
      message: 'Usuario creado exitosamente. Por favor verifica tu email.'
    };
    
  } catch (error: any) {
    console.error('❌ SignUp error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    // Mensajes de error más específicos
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Este email ya está registrado. Por favor inicia sesión.');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('La contraseña debe tener al menos 6 caracteres.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('El email no es válido.');
    } else if (error.code === 'permission-denied') {
      throw new Error('Error de permisos en la base de datos. Contacta al administrador.');
    }
    
    throw error;
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    console.log('🔐 Attempting login for:', email);
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Verificar si el email está verificado
    if (!userCredential.user.emailVerified) {
      console.log('⚠️ Email not verified for user:', email);
      
      // Opcional: Enviar nuevo email de verificación
      try {
        await sendEmailVerification(userCredential.user);
        console.log('📧 New verification email sent');
      } catch (e) {
        console.log('Could not send verification email');
      }
    }
    
    // Obtener datos adicionales del usuario
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      
      // Actualizar estado de verificación de email
      if (userCredential.user.emailVerified && !userData.emailVerified) {
        await updateDoc(doc(db, 'users', userCredential.user.uid), {
          emailVerified: true
        });
      }
      
      return {
        success: true,
        user: userCredential.user,
        userData: userData,
        emailVerified: userCredential.user.emailVerified
      };
    }
    
    return {
      success: true,
      user: userCredential.user,
      userData: null,
      emailVerified: userCredential.user.emailVerified
    };
    
  } catch (error: any) {
    console.error('❌ SignIn error:', error);
    
    if (error.code === 'auth/user-not-found') {
      throw new Error('No existe una cuenta con este email.');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Contraseña incorrecta.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Email inválido.');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Demasiados intentos. Por favor intenta más tarde.');
    }
    
    throw error;
  }
};

export const resendVerificationEmail = async (user: User) => {
  try {
    await sendEmailVerification(user);
    return { success: true, message: 'Email de verificación enviado' };
  } catch (error) {
    console.error('Error sending verification email:', error);
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