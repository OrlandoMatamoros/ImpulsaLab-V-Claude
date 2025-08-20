import { NextRequest, NextResponse } from 'next/server';

// Almacenamiento temporal de códigos (en producción usar Firestore)
const verificationCodes = new Map<string, { code: string; expires: number }>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Verify endpoint - Body recibido:', body);
    
    const { email, code } = body;
    
    if (!email || !code) {
      return NextResponse.json(
        { error: 'Datos incompletos', missing: { email: !email, code: !code } },
        { status: 400 }
      );
    }
    
    // Por ahora, aceptar cualquier código de 6 dígitos para testing
    // En producción, verificar contra Firestore
    if (code.length === 6 && /^\d+$/.test(code)) {
      console.log(`✅ Código ${code} verificado para ${email}`);
      
      return NextResponse.json({
        success: true,
        verified: true,
        message: 'Código verificado correctamente'
      });
    }
    
    return NextResponse.json(
      { error: 'Código inválido o expirado' },
      { status: 400 }
    );
    
  } catch (error: any) {
    console.error('Error en verify-codes:', error);
    return NextResponse.json(
      { error: 'Error del servidor', details: error.message },
      { status: 500 }
    );
  }
}
