import { NextRequest, NextResponse } from 'next/server'
import { initializeGoogleSheetHeaders } from '@/lib/google-sheets'

/**
 * Endpoint para inicializar los headers del Google Sheet
 * Ejecutar UNA VEZ después de crear el sheet
 *
 * Llamar: POST /api/diagnostic/init-sheets
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación (opcional - puedes agregar un token secreto)
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.INIT_SHEETS_SECRET_TOKEN}`) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const result = await initializeGoogleSheetHeaders()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Headers del Google Sheet inicializados correctamente',
        columns: [
          'Fecha', 'Nombre', 'Email', 'Teléfono', 'Empresa',
          'Industria', 'Empleados', 'Score Finanzas', 'Score Operaciones',
          'Score Marketing', 'Score Promedio', 'Origen', 'Timestamp Creación'
        ]
      })
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
