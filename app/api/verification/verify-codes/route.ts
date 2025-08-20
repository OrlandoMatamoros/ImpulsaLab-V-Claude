// app/api/verification/verify-codes/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { identifier, code, type } = await request.json();

    if (!identifier || !code) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      );
    }

    // Por ahora, aceptar cualquier código de 6 dígitos para testing
    // En producción, verificar contra la base de datos
    if (code.length === 6 && /^\d+$/.test(code)) {
      return NextResponse.json({
        success: true,
        message: 'Código verificado correctamente'
      });
    }

    return NextResponse.json(
      { error: 'Código inválido' },
      { status: 400 }
    );

  } catch (error: any) {
    console.error('Error verificando:', error);
    return NextResponse.json(
      { error: 'Error al verificar' },
      { status: 500 }
    );
  }
}
