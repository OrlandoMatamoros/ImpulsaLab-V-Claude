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
    console.log(`Sending SMS verification code ${code} to ${phone}`);
    
    // SMS COMO MÉTODO ÚNICO DE VERIFICACIÓN
    const message = await client.messages.create({
      from: '+19296589612',
      to: phone,
      body: `Impulsa Lab verification code: ${code}\nValid for 10 minutes. Do not share this code.`
    });
    
    console.log('SMS sent:', message.sid, 'Status:', message.status);
    
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
      { 
        error: 'Failed to send verification code. Please check your phone number.',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
