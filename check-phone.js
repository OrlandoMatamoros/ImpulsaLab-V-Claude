const admin = require('firebase-admin');

if (!admin.apps.length) {
  const serviceAccount = require('./firebase-admin-key.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

async function checkPhone() {
  const phone = '+19293686749';
  
  console.log('🔍 Buscando número:', phone);
  
  // Buscar en users
  const users = await admin.firestore()
    .collection('users')
    .where('phoneNumber', '==', phone)
    .get();
  
  // Buscar en users con phone field
  const users2 = await admin.firestore()
    .collection('users')
    .where('phone', '==', phone)
    .get();
  
  console.log('\nResultados:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  if (!users.empty) {
    console.log('⚠️ Encontrado en phoneNumber:');
    users.forEach(doc => {
      const data = doc.data();
      console.log(`  Email: ${data.email}`);
      console.log(`  ID: ${doc.id}`);
      console.log(`  Rol: ${data.role}`);
    });
  }
  
  if (!users2.empty) {
    console.log('⚠️ Encontrado en phone:');
    users2.forEach(doc => {
      const data = doc.data();
      console.log(`  Email: ${data.email}`);
      console.log(`  ID: ${doc.id}`);
    });
  }
  
  if (users.empty && users2.empty) {
    console.log('✅ Número disponible - no está registrado');
  }
  
  // Verificar códigos pendientes
  const codeDoc = await admin.firestore()
    .collection('verificationCodes')
    .doc(`phone_${phone}`)
    .get();
  
  if (codeDoc.exists) {
    const data = codeDoc.data();
    console.log('\n📱 Código de verificación encontrado:');
    console.log(`  Código: ${data.code}`);
    console.log(`  Creado: ${data.createdAt?.toDate()}`);
    console.log(`  Usado: ${data.used}`);
  }
}

checkPhone().then(() => process.exit(0));
