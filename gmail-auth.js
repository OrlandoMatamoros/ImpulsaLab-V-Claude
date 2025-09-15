const { google } = require('googleapis');
const readline = require('readline');
require('dotenv').config({ path: '.env.local' });

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'http://localhost:8080'
);

// Generar URL de autorización
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/gmail.readonly'],
  prompt: 'consent' // Forzar para obtener refresh token
});

console.log('\n�� Abre esta URL en tu navegador:');
console.log(authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('\n📝 Pega el código de autorización aquí: ', async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    
    console.log('\n✅ Tokens generados exitosamente!');
    console.log('\n📋 Actualiza tu archivo .env.local con este nuevo refresh token:');
    console.log('\nGMAIL_REFRESH_TOKEN=' + tokens.refresh_token);
    
    // Verificar que funciona
    oauth2Client.setCredentials(tokens);
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: 'from:googlealerts-noreply@google.com',
      maxResults: 1
    });
    
    console.log('\n✅ Verificación exitosa! Encontrados', response.data.messages?.length || 0, 'mensajes');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  rl.close();
});
