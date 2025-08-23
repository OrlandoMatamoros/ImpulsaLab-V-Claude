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
    
    // WhatsApp Business (esperando aprobación)
    const message = await client.messages.create({
      from: 'whatsapp:+15558240286',
      to: `whatsapp:${phone}`,
      body: `🚀 *Impulsa Lab*\n\nTu código de verificación es:\n\n*${code}*\n\nVálido por 10 minutos.`
    });
    
    return NextResponse.json({
      success: true,
      message: 'Código enviado por WhatsApp',
      channel: 'whatsapp'
    });
    
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Sistema de verificación en mantenimiento. Por favor contacta al administrador.' },
      { status: 503 }
    );
  }
}
