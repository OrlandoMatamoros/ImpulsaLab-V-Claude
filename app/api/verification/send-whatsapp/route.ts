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
        { error: 'Phone number required' },
        { status: 400 }
      );
    }
    
    const code = generateCode();
    console.log(`Sending SMS code ${code} to ${phone}`);
    
    // SMS directo - funciona inmediatamente
    const message = await client.messages.create({
      from: '+19296589612', // Tu número Twilio verificado
      to: phone,
      body: `Impulsa Lab - Your verification code is: ${code}\n\nValid for 10 minutes.`
    });
    
    console.log('SMS sent successfully:', message.sid);
    
    // TODO: Guardar código en base de datos para verificación
    // Por ahora retornamos el código para testing
    
    return NextResponse.json({
      success: true,
      message: 'Verification code sent via SMS',
      messageSid: message.sid,
      channel: 'sms',
      debugCode: code // QUITAR EN PRODUCCIÓN
    });
    
  } catch (error: any) {
    console.error('SMS Error:', error.message);
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    );
  }
}
