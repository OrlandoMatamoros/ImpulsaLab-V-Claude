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
    console.log(`Sending WhatsApp code ${code} to ${phone}`);
    
    try {
      // WhatsApp para TODOS - funcionando YA
      const message = await client.messages.create({
        from: 'whatsapp:+15558240286',
        to: `whatsapp:${phone}`,
        body: `🚀 *Impulsa Lab*\n\nYour verification code is:\n\n*${code}*\n\nValid for 10 minutes.\n\nImpulsa LAB LLC`
      });
      
      console.log('✅ WhatsApp sent successfully:', message.sid);
      
      return NextResponse.json({
        success: true,
        message: 'Verification code sent via WhatsApp',
        messageSid: message.sid,
        channel: 'whatsapp',
        debugCode: code // QUITAR en producción final
      });
      
    } catch (whatsappError: any) {
      console.error('WhatsApp failed, trying SMS fallback:', whatsappError.message);
      
      // SMS como fallback si WhatsApp falla
      try {
        const sms = await client.messages.create({
          from: '+19296589612',
          to: phone,
          body: `Impulsa Lab - Your verification code is: ${code}\nValid for 10 minutes.`
        });
        
        console.log('✅ SMS sent as fallback:', sms.sid);
        
        return NextResponse.json({
          success: true,
          message: 'Verification code sent via SMS',
          messageSid: sms.sid,
          channel: 'sms',
          fallback: true,
          debugCode: code
        });
        
      } catch (smsError: any) {
        console.error('SMS also failed:', smsError.message);
        throw smsError;
      }
    }
    
  } catch (error: any) {
    console.error('Error in send-whatsapp:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send verification code',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
