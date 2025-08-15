import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('==========================================');
  console.log('🔴 SEND-CODES API - INICIO');
  console.log('==========================================');
  
  try {
    // PASO 1: Verificar que podemos leer el body
    console.log('1. Leyendo body...');
    const body = await request.json();
    console.log('2. Body recibido:', body);
    
    const { email } = body;
    console.log('3. Email:', email);
    
    // PASO 2: Verificar variable de entorno
    console.log('4. RESEND_API_KEY existe?', !!process.env.RESEND_API_KEY);
    console.log('5. Primeros caracteres:', process.env.RESEND_API_KEY?.substring(0, 10));
    
    // PASO 3: Intentar importar Resend
    console.log('6. Importando Resend...');
    const { Resend } = await import('resend');
    console.log('7. Resend importado correctamente');
    
    // PASO 4: Crear instancia
    console.log('8. Creando instancia de Resend...');
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log('9. Instancia creada');
    
    // PASO 5: Generar código
    console.log('10. Generando código...');
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('11. Código generado:', code);
    
    // PASO 6: Intentar enviar email
    console.log('12. Intentando enviar email...');
    
    try {
      const emailResult = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Test - Código: ' + code,
        html: `<h1>Tu código es: ${code}</h1>`
      });
      
      console.log('13. ✅ EMAIL ENVIADO:', emailResult);
      
      return NextResponse.json({
        success: true,
        message: 'Email enviado',
        code: code // TEMPORAL: para testing
      });
      
    } catch (emailError: any) {
      console.log('14. ❌ ERROR AL ENVIAR EMAIL:');
      console.log('    Tipo:', emailError.constructor.name);
      console.log('    Mensaje:', emailError.message);
      console.log('    Stack:', emailError.stack);
      
      throw emailError;
    }
    
  } catch (error: any) {
    console.log('==========================================');
    console.log('❌ ERROR CAPTURADO:');
    console.log('Tipo:', error.constructor.name);
    console.log('Mensaje:', error.message);
    console.log('Stack:', error.stack);
    console.log('==========================================');
    
    return NextResponse.json(
      { 
        error: 'Error en send-codes',
        message: error.message,
        type: error.constructor.name
      },
      { status: 500 }
    );
  }
}
