// scripts/setup-roles.js
const admin = require('firebase-admin');

// Inicializar Firebase Admin
if (!admin.apps.length) {
  try {
    const serviceAccount = require('../firebase-admin-key.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    console.error('❌ No se encontró firebase-admin-key.json');
    console.log('\n📥 Descárgalo de:');
    console.log('1. Firebase Console → Project Settings');
    console.log('2. Service Accounts → Generate new private key');
    console.log('3. Guarda el archivo como: firebase-admin-key.json\n');
    process.exit(1);
  }
}

async function assignRoles() {
  console.log('🚀 Configurando roles de usuarios...\n');
  
  const users = [
    {
      email: 'orlando@tuimpulsalab.com',
      role: 'admin',
      name: 'Orlando Matamoros',
      permissions: ['all']
    },
    {
      email: 'alex@tuimpulsalab.com',
      role: 'consultant',
      name: 'Alex',
      consultantCode: 'ALEX2025'
    },
    {
      email: 'katty@tuimpulsalab.com',
      role: 'consultant',
      name: 'Katty',
      consultantCode: 'KATTY2025'
    },
    {
      email: 'diego@tuimpulsalab.com',
      role: 'consultant',
      name: 'Diego',
      consultantCode: 'DIEGO2025'
    }
  ];

  let successCount = 0;
  let errorCount = 0;

  for (const userData of users) {
    try {
      const user = await admin.auth().getUserByEmail(userData.email);
      console.log(`✅ Usuario encontrado: ${userData.email}`);
      
      await admin.auth().setCustomUserClaims(user.uid, {
        role: userData.role,
        ...(userData.consultantCode && { consultantCode: userData.consultantCode })
      });
      
      await admin.firestore().collection('users').doc(user.uid).set({
        uid: user.uid,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        emailVerified: true,
        phoneVerified: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        createdBy: 'system',
        ...(userData.consultantCode && { consultantCode: userData.consultantCode }),
        ...(userData.permissions && { permissions: userData.permissions })
      }, { merge: true });
      
      console.log(`   ✓ Rol asignado: ${userData.role}`);
      console.log(`   ✓ Datos guardados en Firestore\n`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Error con ${userData.email}:`, error.message);
      console.log(`   → Asegúrate de crear este usuario en Firebase Console primero\n`);
      errorCount++;
    }
  }
  
  console.log('═══════════════════════════════════');
  console.log(`✨ Proceso completado!`);
  console.log(`   ✓ Exitosos: ${successCount}`);
  console.log(`   ✗ Errores: ${errorCount}`);
  console.log('═══════════════════════════════════');
}

assignRoles().then(() => process.exit(0));
