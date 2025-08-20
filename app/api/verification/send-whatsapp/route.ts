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
      return NextResponse.json({ error: 'Phone required' }, { status: 400 });
    }

    const code = generateCode();
    console.log(`Code for ${phone}: ${code}`);

    // Intentar WhatsApp
    try {
      const message = await client.messages.create({
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${phone}`,
        body: `Impulsa Lab - Tu código: ${code}`
      });

      return NextResponse.json({
        success: true,
        message: 'Código enviado por WhatsApp',
        debugCode: code
      });

    } catch (error: any) {
      // Si falla, intentar SMS
      const sms = await client.messages.create({
        from: '+19296589612',
        to: phone,
        body: `Impulsa Lab - Código: ${code}`
      });
      
      return NextResponse.json({
        success: true,
        message: 'Código enviado por SMS',
        debugCode: code
      });
    }
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
