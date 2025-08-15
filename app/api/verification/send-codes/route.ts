// app/api/verification/send-codes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { adminDb } from '@/lib/firebase-admin';
import crypto from 'crypto';

// Inicializar Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting simple en memoria
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(identifier);
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + 15 * 60 * 1000 // 15 minutos
    });
    return true;
  }
  
  if (limit.count >= 5) {
    return false;
  }
  
  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  console.log('📧 Send-codes API called');
  
  try {
    // 1. Parsear el body
    const body = await request.json();
    const { email, isConsultant = false } = body;
    
    console.log('Processing verification for:', email);
    
    // 2. Validar email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }
    
    // 3. Verificar rate limiting
    if (!checkRateLimit(email)) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Intente en 15 minutos.' },
        { status: 429 }
      );
    }
    
    // 4. Generar código de 6 dígitos
    const code = crypto.randomInt(100000, 999999).toString();
    console.log('Generated code:', code);
    
    // 5. Guardar en Firestore con expiración
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos
    
    await adminDb.collection('verification_codes').add({
      email,
      code,
      isConsultant,
      used: false,
      createdAt: new Date(),
      expiresAt,
      attempts: 0
    });
    
    console.log('Code saved to Firestore');
    
    // 6. Enviar email con Resend
    const emailResult = await resend.emails.send({
      from: 'Impulsa Lab <noreply@tuimpulsalab.com>',
      to: email,
      subject: 'Código de Verificación - Impulsa Lab',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Código de Verificación</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; text-align: center;">Impulsa Lab</h1>
            </div>
            
            <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
              <h2 style="color: #1f2937; margin-bottom: 20px;">Verificación de Cuenta</h2>
              
              <p style="color: #4b5563; margin-bottom: 25px;">
                Gracias por registrarte en Impulsa Lab. Tu código de verificación es:
              </p>
              
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
                <span style="font-size: 32px; font-weight: bold; color: #7c3aed; letter-spacing: 8px;">
                  ${code}
                </span>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">
                Este código expirará en 10 minutos. Si no solicitaste este código, puedes ignorar este email.
              </p>
              
              ${isConsultant ? `
                <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-top: 20px;">
                  <p style="color: #92400e; margin: 0; font-weight: 500;">
                    🎯 Registro como Consultor
                  </p>
                  <p style="color: #92400e; margin: 5px 0 0 0; font-size: 14px;">
                    Estás registrándote como consultor. Tendrás acceso a herramientas especializadas y panel de analytics.
                  </p>
                </div>
              ` : ''}
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              
              <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
                © 2024 Impulsa Lab. Todos los derechos reservados.
              </p>
            </div>
          </body>
        </html>
      `
    });
    
    console.log('Email sent successfully:', emailResult);
    
    // 7. Respuesta exitosa
    return NextResponse.json({
      success: true,
      message: 'Código enviado correctamente',
      email
    });
    
  } catch (error) {
    // Log detallado del error
    console.error('❌ Error in send-codes:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      type: typeof error
    });
    
    // Respuesta de error más informativa (solo en desarrollo)
    const isDev = process.env.NODE_ENV === 'development';
    
    return NextResponse.json(
      { 
        error: 'Error al enviar el código',
        ...(isDev && { 
          details: error instanceof Error ? error.message : 'Unknown error',
          type: error instanceof Error ? error.constructor.name : typeof error
        })
      },
      { status: 500 }
    );
  }
}