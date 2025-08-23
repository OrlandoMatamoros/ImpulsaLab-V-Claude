const admin = require('firebase-admin');

// Inicializar con tu service account
if (!admin.apps.length) {
  const serviceAccount = require('./firebase-admin-key.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

async function createDemoUser() {
  try {
    // Crear usuario en Auth
    const userRecord = await admin.auth().createUser({
      email: 'demo@tuimpulsalab.com',
      password: 'DemoImpulsa2025!',
      displayName: 'Usuario Demo',
      emailVerified: true
    });
    
    console.log('✅ Usuario creado:', userRecord.uid);
    
    // Agregar datos adicionales en Firestore
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email: 'demo@tuimpulsalab.com',
      displayName: 'Usuario Demo',
      role: 'client', // o 'premium' si quieres mostrar más features
      createdAt: new Date(),
      phoneVerified: true,
      emailVerified: true,
      isDemo: true,
      company: 'Empresa Demo',
      phone: '+1 555 0100'
    });
    
    console.log('✅ Datos agregados en Firestore');
    
    // Opcional: Establecer custom claims
    await admin.auth().setCustomUserClaims(userRecord.uid, {
      role: 'client',
      isDemo: true
    });
    
    console.log('✅ Usuario demo creado completamente');
    console.log('');
    console.log('CREDENCIALES:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email: demo@tuimpulsalab.com');
    console.log('Password: DemoImpulsa2025!');
    console.log('UID:', userRecord.uid);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

createDemoUser().then(() => process.exit(0));
