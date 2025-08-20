import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Verify endpoint - Body recibido:', body);
    
    const { email, code, userData, password } = body;
    
    if (!email || !code) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      );
    }
    
    // Por ahora, aceptar cualquier código de 6 dígitos para testing
    if (code.length === 6 && /^\d+$/.test(code)) {
      console.log(`✅ Código ${code} verificado para ${email}`);
      
      // Guardar en sessionStorage que el email está verificado
      // NO crear cuenta aún - esperar verificación de WhatsApp
      
      return NextResponse.json({
        success: true,
        emailVerified: true,
        message: 'Email verificado. Ahora verifica tu WhatsApp.',
        nextStep: 'whatsapp_verification',
        // Devolver los datos para el siguiente paso
        userData: {
          email,
          ...userData
        }
      });
    }
    
    return NextResponse.json(
      { error: 'Código inválido o expirado' },
      { status: 400 }
    );
    
  } catch (error: any) {
    console.error('Error en verify-codes:', error);
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
}
