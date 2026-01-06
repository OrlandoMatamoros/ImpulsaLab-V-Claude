import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { appendToGoogleSheet } from '@/lib/google-sheets'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { leadData, clientInfo, scores, responses } = await request.json()

    console.log('📥 Datos recibidos en send-report API')
    console.log('Lead Data:', {
      nombre: leadData?.nombre,
      email: leadData?.email,
      empresa: leadData?.empresa,
      scores: `${leadData?.score_finanzas}/${leadData?.score_operaciones}/${leadData?.score_marketing}`
    })

    if (!leadData || !leadData.email || !leadData.nombre) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      )
    }

    // 1. CORREO AL USUARIO (Diseño amigable con resumen)
    const userEmailResult = await resend.emails.send({
      from: 'Impulsa Lab <noreply@tuimpulsalab.com>',
      to: leadData.email,
      subject: '🎯 Tu Diagnóstico 3D - ImpulsaLab',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f7fa;">
          <div style="max-width: 650px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #002D62 0%, #0047AB 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700;">ImpulsaLab</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Transformación Digital Empresarial</p>
            </div>

            <!-- Contenido Principal -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #002D62; margin-bottom: 10px; font-size: 26px;">¡Hola ${leadData.nombre}! 👋</h2>
              <p style="color: #555; line-height: 1.7; font-size: 16px; margin-bottom: 25px;">
                Gracias por completar tu <strong>Diagnóstico 3D</strong>. Aquí está el resumen de los resultados de tu empresa:
              </p>

              <!-- Scores Card -->
              <div style="background: #f8f9fb; border-radius: 10px; padding: 25px; margin: 30px 0;">
                <h3 style="color: #002D62; margin-top: 0; margin-bottom: 20px; font-size: 20px;">📊 Tus Puntajes</h3>

                <div style="margin-bottom: 15px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="color: #333; font-weight: 600;">💰 Finanzas</span>
                    <span style="color: #002D62; font-weight: 700; font-size: 18px;">${leadData.score_finanzas}/100</span>
                  </div>
                  <div style="background: #e0e7ff; height: 8px; border-radius: 4px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #4f46e5, #002D62); height: 100%; width: ${leadData.score_finanzas}%; border-radius: 4px;"></div>
                  </div>
                </div>

                <div style="margin-bottom: 15px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="color: #333; font-weight: 600;">⚙️ Operaciones</span>
                    <span style="color: #002D62; font-weight: 700; font-size: 18px;">${leadData.score_operaciones}/100</span>
                  </div>
                  <div style="background: #e0e7ff; height: 8px; border-radius: 4px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #4f46e5, #002D62); height: 100%; width: ${leadData.score_operaciones}%; border-radius: 4px;"></div>
                  </div>
                </div>

                <div style="margin-bottom: 15px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="color: #333; font-weight: 600;">📈 Marketing</span>
                    <span style="color: #002D62; font-weight: 700; font-size: 18px;">${leadData.score_marketing}/100</span>
                  </div>
                  <div style="background: #e0e7ff; height: 8px; border-radius: 4px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #4f46e5, #002D62); height: 100%; width: ${leadData.score_marketing}%; border-radius: 4px;"></div>
                  </div>
                </div>

                <div style="margin-top: 25px; padding-top: 20px; border-top: 2px solid #002D62;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #002D62; font-weight: 700; font-size: 18px;">Promedio General</span>
                    <span style="color: #002D62; font-weight: 800; font-size: 24px;">${leadData.score_promedio}/100</span>
                  </div>
                </div>
              </div>

              <!-- Próximos Pasos -->
              <div style="background: linear-gradient(135deg, #EBF4FF 0%, #E0F2FE 100%); border-left: 4px solid #002D62; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <h3 style="color: #002D62; margin-top: 0; margin-bottom: 15px; font-size: 18px;">🚀 Próximos Pasos</h3>
                <ul style="color: #555; line-height: 1.8; padding-left: 20px; margin: 0;">
                  <li>Revisa tu análisis completo y recomendaciones personalizadas</li>
                  <li>Agenda una consulta gratuita para profundizar en los resultados</li>
                  <li>Recibe un plan de acción específico para tu empresa</li>
                </ul>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center; margin: 35px 0;">
                <a href="https://calendly.com/orlando-tuimpulsalab/30min"
                   style="display: inline-block; background: #002D62; color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(0, 45, 98, 0.3);">
                  📅 Agendar Consulta Gratuita
                </a>
              </div>

              <p style="color: #777; font-size: 14px; line-height: 1.6; margin-top: 30px;">
                ¿Tienes preguntas? Responde a este correo o contáctanos en
                <a href="mailto:contacto@tuimpulsalab.com" style="color: #002D62; text-decoration: none; font-weight: 600;">contacto@tuimpulsalab.com</a>
              </p>
            </div>

            <!-- Footer -->
            <div style="background: #f8f9fb; padding: 25px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #999; font-size: 13px; margin: 0;">
                © ${new Date().getFullYear()} ImpulsaLab. Todos los derechos reservados.
              </p>
              <p style="color: #999; font-size: 12px; margin: 10px 0 0 0;">
                Transformando empresas a través de la inteligencia de negocio.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    })

    if (userEmailResult.error) {
      console.error('Error enviando correo al usuario:', userEmailResult.error)
      return NextResponse.json(
        { error: 'Error al enviar correo al usuario' },
        { status: 500 }
      )
    }

    // 2. CORREO AL ADMIN (Con JSON estructurado para CRM)
    console.log('📧 Enviando correo al admin...')
    const adminEmailResult = await resend.emails.send({
      from: 'Impulsa Lab Leads <noreply@tuimpulsalab.com>',
      to: ['leads@tuimpulsalab.com', 'orlando@tuimpulsalab.com'], // Enviar a ambos emails
      replyTo: leadData.email,
      subject: `🎯 Nuevo Lead: ${leadData.nombre} - Score: ${leadData.score_promedio}/100`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="font-family: 'Courier New', monospace; padding: 20px; background: #f5f5f5;">
          <div style="max-width: 700px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #002D62; border-bottom: 3px solid #002D62; padding-bottom: 10px;">🎯 Nuevo Lead del Diagnóstico 3D</h2>

            <div style="background: #f8f9fa; border-radius: 6px; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">📊 Información del Lead</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Nombre:</td>
                  <td style="padding: 8px 0; color: #333;">${leadData.nombre}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Email:</td>
                  <td style="padding: 8px 0; color: #333;"><a href="mailto:${leadData.email}" style="color: #002D62;">${leadData.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Teléfono:</td>
                  <td style="padding: 8px 0; color: #333;">${leadData.telefono}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Empresa:</td>
                  <td style="padding: 8px 0; color: #333;">${leadData.empresa}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Industria:</td>
                  <td style="padding: 8px 0; color: #333;">${leadData.industria}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Empleados:</td>
                  <td style="padding: 8px 0; color: #333;">${leadData.empleados}</td>
                </tr>
              </table>
            </div>

            <div style="background: #e3f2fd; border-radius: 6px; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #002D62;">🎯 Scores del Diagnóstico</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">💰 Finanzas:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 700; font-size: 18px;">${leadData.score_finanzas}/100</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">⚙️ Operaciones:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 700; font-size: 18px;">${leadData.score_operaciones}/100</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">📈 Marketing:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: 700; font-size: 18px;">${leadData.score_marketing}/100</td>
                </tr>
                <tr style="border-top: 2px solid #002D62;">
                  <td style="padding: 12px 0; color: #002D62; font-weight: 700; font-size: 16px;">PROMEDIO:</td>
                  <td style="padding: 12px 0; color: #002D62; font-weight: 800; font-size: 22px;">${leadData.score_promedio}/100</td>
                </tr>
              </table>
            </div>

            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0; color: #856404; font-weight: 600;">⚡ Fecha: ${leadData.fecha}</p>
              <p style="margin: 5px 0 0 0; color: #856404;">📍 Origen: ${leadData.origen}</p>
            </div>

            <hr style="border: none; border-top: 2px dashed #dee2e6; margin: 30px 0;">

            <!-- BLOQUE JSON PARA AUTOMATIZACIÓN CRM -->
            <div style="background: #263238; color: #aed581; padding: 20px; border-radius: 6px; font-family: 'Courier New', monospace; font-size: 13px; overflow-x: auto;">
              <p style="margin: 0 0 10px 0; color: #64b5f6; font-weight: 700;">// DATOS PARA CRM (Zapier/Make) - NO BORRAR</p>
<pre style="margin: 0; white-space: pre-wrap;">---START_LEAD_DATA---
${JSON.stringify(leadData, null, 2)}
---END_LEAD_DATA---</pre>
            </div>

          </div>
        </body>
        </html>
      `
    })

    if (adminEmailResult.error) {
      console.error('❌ Error enviando correo al admin:', adminEmailResult.error)
      console.error('Detalles del error:', JSON.stringify(adminEmailResult.error, null, 2))
      // No retornamos error aquí porque el correo al usuario ya se envió
    } else {
      console.log('✅ Correo al admin enviado exitosamente')
      console.log('ID del email:', adminEmailResult.data?.id)
    }

    // 3. ESCRIBIR DIRECTAMENTE EN GOOGLE SHEETS (Automatización CRM)
    const sheetsResult = await appendToGoogleSheet(leadData)

    if (sheetsResult.success) {
      console.log('✅ Lead guardado en Google Sheets exitosamente')
    } else {
      console.warn('⚠️ No se pudo guardar en Google Sheets:', sheetsResult.error)
      // No retornamos error porque los correos ya se enviaron
    }

    return NextResponse.json({
      success: true,
      message: 'Reporte enviado exitosamente',
      sheetsSaved: sheetsResult.success
    })

  } catch (error: any) {
    console.error('Error en send-report:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor', message: error.message },
      { status: 500 }
    )
  }
}
