import { google } from 'googleapis'

/**
 * Helper para escribir datos directamente en Google Sheets
 *
 * CONFIGURACIÓN REQUERIDA:
 * 1. Crear Service Account en Google Cloud Console
 * 2. Descargar credenciales JSON
 * 3. Configurar variables de entorno en Vercel:
 *    - GOOGLE_SHEETS_PRIVATE_KEY: La clave privada del service account
 *    - GOOGLE_SHEETS_CLIENT_EMAIL: El email del service account
 *    - GOOGLE_SHEETS_SPREADSHEET_ID: El ID del Google Sheet (de la URL)
 * 4. Compartir el Google Sheet con el email del service account (dar permisos de Editor)
 */

export async function appendToGoogleSheet(leadData: any) {
  try {
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n')
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

    if (!privateKey || !clientEmail || !spreadsheetId) {
      console.warn('Google Sheets credentials not configured. Skipping sheet update.')
      return { success: false, error: 'Credentials not configured' }
    }

    // Autenticar con Google
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    // Preparar los datos para insertar
    // El orden debe coincidir con las columnas del Google Sheet
    const values = [[
      leadData.fecha,                  // A: Fecha
      leadData.nombre,                 // B: Nombre
      leadData.email,                  // C: Email
      leadData.telefono,               // D: Teléfono
      leadData.empresa,                // E: Empresa
      leadData.industria,              // F: Industria
      leadData.empleados,              // G: Empleados
      leadData.score_finanzas,         // H: Score Finanzas
      leadData.score_operaciones,      // I: Score Operaciones
      leadData.score_marketing,        // J: Score Marketing
      leadData.score_promedio,         // K: Score Promedio
      leadData.origen,                 // L: Origen
      new Date().toISOString(),        // M: Timestamp de creación
    ]]

    // Insertar en Google Sheets
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Leads!A:M', // Nombre de la hoja y rango de columnas
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    })

    console.log('✅ Datos escritos en Google Sheets:', response.data)
    return { success: true, data: response.data }

  } catch (error: any) {
    console.error('❌ Error escribiendo en Google Sheets:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Crear los headers del Google Sheet si no existen
 * Ejecuta esta función una vez para inicializar el sheet
 */
export async function initializeGoogleSheetHeaders() {
  try {
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n')
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

    if (!privateKey || !clientEmail || !spreadsheetId) {
      throw new Error('Google Sheets credentials not configured')
    }

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    // Headers para el Google Sheet
    const headers = [[
      'Fecha',
      'Nombre',
      'Email',
      'Teléfono',
      'Empresa',
      'Industria',
      'Empleados',
      'Score Finanzas',
      'Score Operaciones',
      'Score Marketing',
      'Score Promedio',
      'Origen',
      'Timestamp Creación',
    ]]

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Leads!A1:M1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: headers,
      },
    })

    console.log('✅ Headers del Google Sheet inicializados')
    return { success: true }

  } catch (error: any) {
    console.error('❌ Error inicializando headers:', error)
    return { success: false, error: error.message }
  }
}
