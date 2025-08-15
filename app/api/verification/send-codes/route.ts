import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import twilio from 'twilio';
import { customAlphabet } from 'nanoid';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const generateCode = customAlphabet('0123456789', 6);

const resend = new Resend(process.env.RESEND_API_KEY);
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const getEmailTemplate = (name: string, code: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Verificación de Email - Impulsa Lab</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 10px;">
    <h1 style="color: #333; text-align: center;">Verifica tu Email</h1>
    <p>Hola ${name || 'Usuario'},</p>
    <p>Tu código de verificación es:</p>
    <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 5px;">
        ${code}
      </span>
    </div>
    <p style="color: #666; font-size: 14px;">Este código expira en 10 minutos.</p>
  </div>
</body>
</html>
`;

export async function POST(request: NextRequest) {
  try {
    const { email, phone, name } = await request.json();
    
    console.log('📧 Sending verification codes to:', email);
    
    const emailCode = generateCode();
    const smsCode = generateCode();
    
    // Guardar códigos en Firestore
    const verificationData = {
      email,
      phone,
      name,
      emailCode,
      smsCode,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      emailVerified: false,
      phoneVerified: false,
      attempts: 0
    };
    
    const docId = email.replace(/[^a-zA-Z0-9]/g, '_');
    await setDoc(doc(db, 'verifications', docId), verificationData);
    
    let emailSent = false;
    let smsSent = false;
    
    // Enviar EMAIL con Resend
    try {
      const emailResult = await resend.emails.send({
        from: 'Impulsa Lab <onboarding@resend.dev>', // TEMPORAL: Usa este mientras verificas tu dominio
        // from: 'Impulsa Lab <noreply@tuimpulsalab.com>', // Usar cuando tu dominio esté verificado
        to: email,
        subject: `${emailCode} es tu código de verificación`,
        html: getEmailTemplate(name, emailCode)
      });
      
      emailSent = true;
      console.log('✅ Email sent successfully');
    } catch (emailError: any) {
      console.error('❌ Email error:', emailError);
      console.error('Details:', emailError.message);
    }
    
    // Enviar SMS con Twilio (OPCIONAL por ahora)
    try {
      // Formatear número de teléfono
      let formattedPhone = phone.replace(/\D/g, ''); // Quitar todo excepto números
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = '+1' + formattedPhone; // Agregar código de país USA
      }
      
      // COMENTADO POR AHORA - Descomentar cuando tengas A2P configurado
      /*
      const smsResult = await twilioClient.messages.create({
        body: `Tu código de Impulsa Lab es: ${smsCode}. Válido por 10 minutos.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: formattedPhone
      });
      
      smsSent = true;
      console.log('✅ SMS sent successfully');
      */
      
      // Por ahora, solo mostrar en consola
      console.log('📱 SMS Code (not sent - A2P pending):', smsCode);
      console.log('Would send to:', formattedPhone);
      
    } catch (smsError: any) {
      console.error('❌ SMS error:', smsError);
      console.error('Details:', smsError.message);
    }
    
    // En desarrollo, mostrar códigos
    console.log('🔐 VERIFICATION CODES:');
    console.log('📧 Email Code:', emailCode);
    console.log('📱 SMS Code:', smsCode);
    
    return NextResponse.json({
      success: true,
      emailSent,
      smsSent,
      // Para desarrollo
      ...(process.env.NODE_ENV === 'development' && {
        debugCodes: { emailCode, smsCode }
      })
    });
    
  } catch (error: any) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
