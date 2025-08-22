import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();
    const code = generateCode();
    
    console.log(`Enviando código ${code} a ${phone}`);
    
    try {
      // Usar tu WhatsApp Business REAL
      const message = await client.messages.create({
        from: 'whatsapp:+15558240286', // TU NÚMERO BUSINESS!
        to: `whatsapp:${phone}`,
        body: `🚀 *Impulsa Lab*\n\nTu código de verificación es:\n\n*${code}*\n\nVálido por 10 minutos.\n\nImpulsa LAB LLC`
      });
      
      console.log('✅ WhatsApp Business enviado:', message.sid);
      
      // Guardar código en sesión o DB temporal
      // TODO: Implementar guardado de código
      
      return NextResponse.json({
        success: true,
        message: 'Código enviado por WhatsApp Business',
        channel: 'whatsapp_business'
      });
      
    } catch (whatsappError: any) {
      console.error('WhatsApp falló, intentando SMS:', whatsappError);
      
      // Fallback a SMS si WhatsApp falla
      const sms = await client.messages.create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
        body: `Impulsa Lab - Tu código es: ${code}`
      });
      
      return NextResponse.json({
        success: true,
        message: 'Código enviado por SMS',
        channel: 'sms',
        fallback: true
      });
    }
    
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error al enviar código' },
      { status: 500 }
    );
  }
}
