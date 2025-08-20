import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    console.log(`Código generado para ${email}: ${code}`);

    const { data, error } = await resend.emails.send({
      from: 'Impulsa Lab <noreply@tuimpulsalab.com>',
      to: email,
      subject: 'Tu código de verificación - Impulsa Lab',
      html: `
        <div style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb;">Impulsa Lab</h2>
          <p>Tu código de verificación es:</p>
          <div style="background: #f0f0f0; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; margin: 20px 0; border-radius: 8px;">
            ${code}
          </div>
          <p>Este código expira en 10 minutos.</p>
        </div>
      `
    });

    if (error) {
      console.error('Error Resend:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('Email enviado:', data);
    
    return NextResponse.json({ 
      success: true,
      message: 'Código enviado al email',
      debugCode: code // Temporal para testing
    });
    
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
