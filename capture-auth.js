const http = require('http');
const url = require('url');
const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'http://localhost:8080'
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/gmail.readonly'],
  prompt: 'consent'  // Importante: fuerza nuevo token
});

console.log('\n🔗 Abre esta URL en tu navegador:\n');
console.log(authUrl);
console.log('\n⏳ Esperando autorización...\n');

const server = http.createServer(async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  
  if (queryObject.code) {
    try {
      const { tokens } = await oauth2Client.getToken(queryObject.code);
      
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <html>
          <body style="font-family: Arial; padding: 50px; text-align: center;">
            <h1 style="color: green;">✅ Token de PRODUCCIÓN generado!</h1>
            <p>Este token NO expirará porque la app está en producción.</p>
            <div style="background: #f0f0f0; padding: 20px; margin: 20px; border-radius: 5px;">
              <code>GMAIL_REFRESH_TOKEN=${tokens.refresh_token}</code>
            </div>
            <p>Actualiza en .env.local y Vercel</p>
          </body>
        </html>
      `);
      
      console.log('\n✅ NUEVO TOKEN DE PRODUCCIÓN:\n');
      console.log('GMAIL_REFRESH_TOKEN=' + tokens.refresh_token);
      console.log('\n✨ Este token NO expirará!\n');
      
      setTimeout(() => {
        server.close();
        process.exit(0);
      }, 3000);
      
    } catch (error) {
      console.error('Error:', error);
      res.writeHead(500);
      res.end('Error generando token');
    }
  }
});

server.listen(8080);
