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
    console.log(`Código generado: ${code} para ${phone}`);
    
    // WhatsApp Business (esperando aprobación de Meta)
    try {
      const message = await client.messages.create({
        from: 'whatsapp:+15558240286',
        to: `whatsapp:${phone}`,
        body: `🚀 *Impulsa Lab*\n\nTu código de verificación es:\n\n*${code}*\n\nVálido por 10 minutos.\n\nImpulsa LAB LLC`
      });
      
      return NextResponse.json({
        success: true,
        message: 'Código enviado por WhatsApp',
        messageSid: message.sid,
        channel: 'whatsapp'
      });
      
    } catch (error: any) {
      console.error('WhatsApp temporalmente no disponible:', error.message);
      
      // Mensaje de mantenimiento mientras se aprueba
      return NextResponse.json(
        { 
          error: 'Sistema de verificación en mantenimiento hasta el 26 de agosto. Para acceso anticipado contacta a: orlando@tuimpulsalab.com',
          maintenance: true 
        },
        { status: 503 }
      );
    }
    
  } catch (error: any) {
    console.error('Error general:', error);
    return NextResponse.json(
      { error: 'Sistema temporalmente no disponible' },
      { status: 503 }
    );
  }
}
