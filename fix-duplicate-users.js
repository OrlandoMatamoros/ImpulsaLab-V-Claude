const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin-key.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

async function fixUsers() {
  const auth = admin.auth();
  const db = admin.firestore();
  
  // Emails a verificar
  const emails = [
    'alejandrahmo22@gmail.com',
    'alex.witzig64@gmail.com'
  ];
  
  for (const email of emails) {
    try {
      // Buscar en Auth
      const userRecord = await auth.getUserByEmail(email);
      console.log(`Found in Auth: ${email} - UID: ${userRecord.uid}`);
      
      // Verificar en Firestore
      const userDoc = await db.collection('users').doc(userRecord.uid).get();
      
      if (!userDoc.exists) {
        console.log(`Missing in Firestore, creating...`);
        
        // Crear documento en Firestore
        await db.collection('users').doc(userRecord.uid).set({
          email: email,
          role: 'registered', // ROL CORRECTO
          createdAt: new Date(),
          emailVerified: true,
          phoneVerified: true,
          features: {
            diagnostics3D: true,
            basicReports: true,
            emailSupport: true
          }
        });
        
        // Actualizar claims
        await auth.setCustomUserClaims(userRecord.uid, {
          role: 'registered'
        });
        
        console.log(`✅ Fixed: ${email}`);
      }
    } catch (error) {
      console.log(`User ${email} not found:`, error.message);
    }
  }
  
  // Actualizar Ridwan a 'registered'
  try {
    const ridwan = await auth.getUserByEmail('hamzaridwan24@gmail.com');
    await db.collection('users').doc(ridwan.uid).update({
      role: 'registered'
    });
    await auth.setCustomUserClaims(ridwan.uid, { role: 'registered' });
    console.log('✅ Updated Ridwan to registered');
  } catch (e) {
    console.log('Ridwan update error:', e.message);
  }
}

fixUsers().then(() => process.exit(0));
