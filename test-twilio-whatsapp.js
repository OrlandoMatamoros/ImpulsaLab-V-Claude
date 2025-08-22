const twilio = require('twilio');

// Tus credenciales
const accountSid = 'AC28bdbadd6eaa1cae87f5b71335dcd6da';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'TU_AUTH_TOKEN_AQUI';

const client = twilio(accountSid, authToken);

async function testWhatsApp() {
  console.log('🧪 Probando WhatsApp Business...\n');
  
  try {
    const message = await client.messages.create({
      from: 'whatsapp:+15558240286',
      to: 'whatsapp:+19293686749', // Tu número
      body: 'TEST: Este es un mensaje de prueba de Impulsa Lab'
    });
    
    console.log('✅ Mensaje enviado:', message.sid);
    console.log('Estado:', message.status);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Código:', error.code);
    console.error('Detalles:', error.moreInfo);
  }
}

testWhatsApp();
