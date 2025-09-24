const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function diagnose() {
  console.log('🔍 DIAGNÓSTICO DE GMAIL API\n');
  console.log('='.repeat(50));
  
  // Verificar variables de entorno
  console.log('\n1. VARIABLES DE ENTORNO:');
  console.log('   CLIENT_ID:', process.env.GMAIL_CLIENT_ID ? '✅ Configurado' : '❌ Faltante');
  console.log('   CLIENT_SECRET:', process.env.GMAIL_CLIENT_SECRET ? '✅ Configurado' : '❌ Faltante');
  console.log('   REFRESH_TOKEN:', process.env.GMAIL_REFRESH_TOKEN ? '✅ Configurado' : '❌ Faltante');
  
  if (!process.env.GMAIL_CLIENT_ID || !process.env.GMAIL_CLIENT_SECRET || !process.env.GMAIL_REFRESH_TOKEN) {
    console.log('\n❌ Faltan variables de entorno. No se puede continuar.');
    return;
  }
  
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    'http://localhost:8080'
  );
  
  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN
  });
  
  console.log('\n2. PRUEBA DE CONEXIÓN:');
  
  try {
    // Obtener access token
    const { credentials } = await oauth2Client.refreshAccessToken();
    console.log('   Access Token:', credentials.access_token ? '✅ Generado' : '❌ Error');
    console.log('   Token Type:', credentials.token_type);
    console.log('   Expira en:', credentials.expiry_date ? new Date(credentials.expiry_date).toLocaleString() : 'N/A');
    
    // Probar API
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const profile = await gmail.users.getProfile({ userId: 'me' });
    console.log('\n3. PERFIL DE GMAIL:');
    console.log('   Email:', profile.data.emailAddress);
    console.log('   Total mensajes:', profile.data.messagesTotal);
    
    // Buscar Google Alerts
    const alerts = await gmail.users.messages.list({
      userId: 'me',
      q: 'from:googlealerts-noreply@google.com newer_than:7d',
      maxResults: 5
    });
    
    console.log('\n4. GOOGLE ALERTS (últimos 7 días):');
    console.log('   Mensajes encontrados:', alerts.data.messages?.length || 0);
    
    if (alerts.data.messages?.length > 0) {
      const msg = await gmail.users.messages.get({
        userId: 'me',
        id: alerts.data.messages[0].id,
        format: 'metadata',
        metadataHeaders: ['Date', 'Subject']
      });
      
      const date = msg.data.payload.headers.find(h => h.name === 'Date');
      const subject = msg.data.payload.headers.find(h => h.name === 'Subject');
      console.log('   Último alert:', date?.value);
      console.log('   Tema:', subject?.value);
    }
    
    console.log('\n✅ DIAGNÓSTICO EXITOSO - Todo funciona correctamente');
    
  } catch (error) {
    console.log('\n❌ ERROR DETECTADO:');
    console.log('   Tipo:', error.message);
    
    if (error.message.includes('invalid_grant')) {
      console.log('\n🔄 CAUSA: El refresh token ha expirado o fue revocado');
      console.log('\nPOSIBLES RAZONES:');
      console.log('   1. Token no usado en 6 meses');
      console.log('   2. Más de 50 tokens activos para la app');
      console.log('   3. Cambios en la configuración de seguridad de Google');
      console.log('   4. La app no está en producción en Google Cloud Console');
    }
    
    console.log('\n📝 Detalles completos:', error.response?.data || error);
  }
}

diagnose();
