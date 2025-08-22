import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';
import { adminDb } from '@/lib/firebaseAdmin';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📱 WHATSAPP VERIFICATION START');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  try {
    const { phone } = await request.json();
    console.log('📞 Phone received:', phone);
    
    if (!phone) {
      console.log('❌ No phone provided');
      return NextResponse.json(
        { error: 'Número de teléfono requerido' },
        { status: 400 }
      );
    }
    
    // Verificar si el número ya está registrado
    console.log('🔍 Checking if phone exists in database...');
    const existingUser = await adminDb
      .collection('users')
      .where('phoneNumber', '==', phone)
      .limit(1)
      .get();
    
    if (!existingUser.empty) {
      console.log('⚠️ Phone already registered');
      return NextResponse.json(
        { error: 'Este número ya está registrado' },
        { status: 400 }
      );
    }
    
    const code = generateCode();
    console.log('�� Generated code:', code);
    
    // Guardar código en Firestore
    console.log('💾 Saving code to Firestore...');
    await adminDb.collection('verificationCodes').doc(`phone_${phone}`).set({
      code,
      phone,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      used: false
    });
    console.log('✅ Code saved to Firestore');
    
    // Enviar WhatsApp
    console.log('📤 Sending WhatsApp message...');
    console.log('From:', 'whatsapp:+15558240286');
    console.log('To:', `whatsapp:${phone}`);
    
    try {
      const message = await client.messages.create({
        from: 'whatsapp:+15558240286',
        to: `whatsapp:${phone}`,
        body: `🚀 *Impulsa Lab*\n\nTu código de verificación es:\n\n*${code}*\n\nVálido por 10 minutos.\n\nImpulsa LAB LLC`
      });
      
      console.log('✅ WhatsApp sent successfully!');
      console.log('Message SID:', message.sid);
      console.log('Status:', message.status);
      
      return NextResponse.json({
        success: true,
        message: 'Código enviado por WhatsApp Business',
        messageSid: message.sid,
        channel: 'whatsapp'
      });
      
    } catch (whatsappError: any) {
      console.error('❌ WhatsApp failed:', whatsappError.message);
      console.error('Error code:', whatsappError.code);
      
      // Intentar SMS como fallback
      console.log('📱 Trying SMS fallback...');
      
      try {
        const sms = await client.messages.create({
          from: process.env.TWILIO_PHONE_NUMBER || '+19296589612',
          to: phone,
          body: `Impulsa Lab - Tu código es: ${code}`
        });
        
        console.log('✅ SMS sent as fallback');
        console.log('SMS SID:', sms.sid);
        
        return NextResponse.json({
          success: true,
          message: 'Código enviado por SMS (WhatsApp no disponible)',
          messageSid: sms.sid,
          channel: 'sms',
          fallback: true
        });
        
      } catch (smsError: any) {
        console.error('❌ SMS also failed:', smsError.message);
        throw smsError;
      }
    }
    
  } catch (error: any) {
    console.error('❌ GENERAL ERROR:', error);
    console.error('Stack:', error.stack);
    
    return NextResponse.json(
      { 
        error: 'Error al enviar código',
        details: error.message 
      },
      { status: 500 }
    );
  } finally {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📱 WHATSAPP VERIFICATION END');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }
}
