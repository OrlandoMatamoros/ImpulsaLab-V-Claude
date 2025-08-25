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
    const expirationMinutes = '10'; // Tiempo de expiración
    
    console.log(`Sending WhatsApp verification code ${code} to ${phone}`);
    
    try {
      // WHATSAPP CON TEMPLATE APROBADO
      const message = await client.messages.create({
        from: 'whatsapp:+15558240286',
        to: `whatsapp:${phone}`,
        contentSid: 'HX05bd7f21fa662f0a6f6ac30ff1a1a44f', // Template aprobado!
        contentVariables: JSON.stringify({
          '1': code,  // El código de verificación
          '2': expirationMinutes  // Minutos de expiración
        })
      });
      
      console.log('✅ WhatsApp sent successfully:', message.sid);
      
      // TODO: Guardar código en base de datos con timestamp
      // Para verificación real, debes almacenar: { phone, code, expiresAt }
      
      return NextResponse.json({
        success: true,
        message: 'Verification code sent via WhatsApp',
        messageSid: message.sid,
        channel: 'whatsapp',
        debugCode: code // QUITAR EN PRODUCCIÓN
      });
      
    } catch (whatsappError: any) {
      console.error('WhatsApp failed, trying SMS fallback:', whatsappError.message);
      
      // FALLBACK A SMS SI WHATSAPP FALLA
      try {
        const sms = await client.messages.create({
          from: '+19296589612',
          to: phone,
          body: `Impulsa Lab - Your verification code is: ${code}\nValid for ${expirationMinutes} minutes.`
        });
        
        console.log('✅ SMS sent as fallback:', sms.sid);
        
        return NextResponse.json({
          success: true,
          message: 'Verification code sent via SMS',
          messageSid: sms.sid,
          channel: 'sms',
          fallback: true,
          debugCode: code // QUITAR EN PRODUCCIÓN
        });
        
      } catch (smsError: any) {
        console.error('SMS also failed:', smsError.message);
        throw smsError;
      }
    }
    
  } catch (error: any) {
    console.error('Error in verification:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send verification code',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
