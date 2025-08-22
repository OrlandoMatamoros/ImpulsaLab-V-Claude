const twilio = require('twilio');
require('dotenv').config({ path: '.env.local' });

// Usar las variables de entorno
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  console.error('❌ Faltan credenciales de Twilio');
  process.exit(1);
}

const client = twilio(accountSid, authToken);

async function testWhatsApp() {
  console.log('🧪 Probando WhatsApp Business...\n');
  console.log('Account SID:', accountSid.substring(0, 10) + '...');
  console.log('Enviando a: +19293686749\n');
  
  try {
    const message = await client.messages.create({
      from: 'whatsapp:+15558240286',
      to: 'whatsapp:+19293686749',
      body: 'TEST Impulsa Lab: Este es un mensaje de prueba directo. Tu código sería: 123456'
    });
    
    console.log('✅ ÉXITO! Mensaje enviado');
    console.log('Message SID:', message.sid);
    console.log('Status:', message.status);
    console.log('Date Created:', message.dateCreated);
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    if (error.code) console.error('Código de error:', error.code);
    if (error.moreInfo) console.error('Más info:', error.moreInfo);
  }
}

testWhatsApp();
