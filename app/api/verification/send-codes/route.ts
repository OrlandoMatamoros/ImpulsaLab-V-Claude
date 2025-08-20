import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Almacenamiento temporal (en producción usar Firestore)
const codes = new Map<string, string>();

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
    }

    const code = generateCode();
    
    // Guardar código temporalmente
    codes.set(email, code);
    console.log(`Código para ${email}: ${code}`);

    const { data, error } = await resend.emails.send({
      from: 'Impulsa Lab <noreply@tuimpulsalab.com>',
      to: email,
      subject: 'Tu código de verificación - Impulsa Lab',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Impulsa Lab</h1>
            </div>
            <div style="padding: 40px 30px;">
              <h2 style="color: #333; margin-bottom: 20px;">Verifica tu cuenta</h2>
              <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
                Hola! Usa el siguiente código para verificar tu cuenta:
              </p>
              <div style="background: #f8f9fa; border: 2px dashed #dee2e6; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333;">
                  ${code}
                </span>
              </div>
              <p style="color: #999; font-size: 14px; margin-top: 30px;">
                Este código expira en 10 minutos. Si no solicitaste este código, ignora este mensaje.
              </p>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; text-align: center;">
                  ⚠️ <strong>Importante:</strong> Este email puede llegar a tu carpeta de SPAM. 
                  Agrega noreply@tuimpulsalab.com a tu lista de contactos.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    });

    if (error) {
      console.error('Error Resend:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Código enviado. Revisa tu email (y carpeta SPAM)',
      debugCode: code // Solo para testing, quitar en producción
    });
    
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
