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
    
    if (!phone) {
      return NextResponse.json(
        { error: 'Número de teléfono requerido' },
        { status: 400 }
      );
    }
    
    const code = generateCode();
    console.log(`Enviando código ${code} a ${phone}`);
    
    // TODO: En el futuro, verificar si el número ya existe
    // Por ahora permitimos el envío para pruebas
    
    try {
      const message = await client.messages.create({
        from: 'whatsapp:+15558240286',
        to: `whatsapp:${phone}`,
        body: `🚀 *Impulsa Lab*\n\nTu código de verificación es:\n\n*${code}*\n\nVálido por 10 minutos.\n\nImpulsa LAB LLC`
      });
      
      console.log('✅ WhatsApp enviado:', message.sid);
      
      return NextResponse.json({
        success: true,
        message: 'Código enviado por WhatsApp Business',
        messageSid: message.sid,
        channel: 'whatsapp',
        debugCode: code // Para pruebas, quitar en producción
      });
      
    } catch (whatsappError: any) {
      console.error('WhatsApp falló, intentando SMS');
      
      try {
        const sms = await client.messages.create({
          from: process.env.TWILIO_PHONE_NUMBER || '+19296589612',
          to: phone,
          body: `Impulsa Lab - Tu código es: ${code}`
        });
        
        return NextResponse.json({
          success: true,
          message: 'Código enviado por SMS',
          messageSid: sms.sid,
          channel: 'sms',
          fallback: true,
          debugCode: code // Para pruebas
        });
      } catch (smsError: any) {
        throw smsError;
      }
    }
    
  } catch (error: any) {
    console.error('Error general:', error);
    return NextResponse.json(
      { 
        error: 'Error al enviar código',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
