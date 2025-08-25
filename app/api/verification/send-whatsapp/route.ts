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
    const expirationMinutes = '10';
    
    console.log(`Sending WhatsApp verification code ${code} to ${phone}`);
    
    try {
      const message = await client.messages.create({
        from: 'whatsapp:+15558240286',
        to: `whatsapp:${phone}`,
        contentSid: 'HX03bd7f21fa662f0a6f6ac30ff1a1a44f', // SID CORRECTO
        contentVariables: JSON.stringify({
          '1': code,
          '2': expirationMinutes
        })
      });
      
      console.log('✅ WhatsApp sent successfully:', message.sid);
      
      return NextResponse.json({
        success: true,
        message: 'Verification code sent via WhatsApp',
        messageSid: message.sid,
        channel: 'whatsapp',
        debugCode: code
      });
      
    } catch (whatsappError: any) {
      console.error('WhatsApp failed:', whatsappError.message);
      
      const sms = await client.messages.create({
        from: '+19296589612',
        to: phone,
        body: `Impulsa Lab - Your verification code is: ${code}\nValid for ${expirationMinutes} minutes.`
      });
      
      return NextResponse.json({
        success: true,
        message: 'Verification code sent via SMS',
        messageSid: sms.sid,
        channel: 'sms',
        fallback: true,
        debugCode: code
      });
    }
    
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    );
  }
}
