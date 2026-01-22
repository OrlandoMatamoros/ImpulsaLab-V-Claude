import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { appendToGoogleSheet } from '@/lib/google-sheets'
import {
  getIndustryComparison,
  getIndustryRecommendations,
  type IndustryType
} from '@/lib/industry-benchmarks'
import {
  getCompanySizeProfile,
  getSizeSpecificRecommendations,
  getPriorityActions
} from '@/lib/company-size'

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

    // Generar contexto de industria y tamaño de empresa
    const industria = (leadData.industria || 'Otro') as IndustryType
    const empleados = leadData.empleados || 0
    const finalScores = {
      finance: leadData.score_finanzas,
      operations: leadData.score_operaciones,
      marketing: leadData.score_marketing
    }

    // Obtener perfil de empresa
    const companyProfile = empleados > 0 ? getCompanySizeProfile(empleados) : null

    // Obtener comparaciones de industria
    const industryComparisons = {
      finance: getIndustryComparison(finalScores.finance, 'finance', industria),
      operations: getIndustryComparison(finalScores.operations, 'operations', industria),
      marketing: getIndustryComparison(finalScores.marketing, 'marketing', industria)
    }

    // Obtener recomendaciones
    const industryRecs = getIndustryRecommendations(finalScores, industria)
    const priorityActions = empleados > 0 ? getPriorityActions(empleados, finalScores) : []

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

              <!-- Perfil de Empresa -->
              ${companyProfile ? `
              <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 10px; padding: 25px; margin: 30px 0; border: 2px solid #0284c7;">
                <h3 style="color: #0284c7; margin-top: 0; margin-bottom: 15px; font-size: 20px;">
                  ${companyProfile.icon} Tu Perfil Empresarial
                </h3>
                <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 15px;">
                  <div style="background: white; border-radius: 8px; padding: 12px; flex: 1; min-width: 150px;">
                    <div style="color: #64748b; font-size: 13px; margin-bottom: 4px;">Clasificación</div>
                    <div style="color: #0284c7; font-weight: 700; font-size: 16px;">${companyProfile.label}</div>
                  </div>
                  <div style="background: white; border-radius: 8px; padding: 12px; flex: 1; min-width: 150px;">
                    <div style="color: #64748b; font-size: 13px; margin-bottom: 4px;">Empleados</div>
                    <div style="color: #0284c7; font-weight: 700; font-size: 16px;">${empleados} (${companyProfile.employeeRange})</div>
                  </div>
                  <div style="background: white; border-radius: 8px; padding: 12px; flex: 1; min-width: 150px;">
                    <div style="color: #64748b; font-size: 13px; margin-bottom: 4px;">Industria</div>
                    <div style="color: #0284c7; font-weight: 700; font-size: 16px;">${industria}</div>
                  </div>
                </div>
                <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0;">
                  <strong>${companyProfile.description}</strong>
                </p>
              </div>
              ` : ''}

              <!-- Comparación con tu Industria -->
              <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 10px; padding: 25px; margin: 30px 0; border: 2px solid #f59e0b;">
                <h3 style="color: #92400e; margin-top: 0; margin-bottom: 15px; font-size: 20px;">
                  📊 Comparación con tu Industria (${industria})
                </h3>
                <div style="background: white; border-radius: 8px; padding: 15px; margin-bottom: 12px;">
                  <div style="color: #4f46e5; font-weight: 600; margin-bottom: 6px;">💰 Finanzas</div>
                  <div style="color: #475569; font-size: 14px; line-height: 1.5;">${industryComparisons.finance}</div>
                </div>
                <div style="background: white; border-radius: 8px; padding: 15px; margin-bottom: 12px;">
                  <div style="color: #10b981; font-weight: 600; margin-bottom: 6px;">⚙️ Operaciones</div>
                  <div style="color: #475569; font-size: 14px; line-height: 1.5;">${industryComparisons.operations}</div>
                </div>
                <div style="background: white; border-radius: 8px; padding: 15px;">
                  <div style="color: #8b5cf6; font-weight: 600; margin-bottom: 6px;">📈 Marketing</div>
                  <div style="color: #475569; font-size: 14px; line-height: 1.5;">${industryComparisons.marketing}</div>
                </div>
              </div>

              <!-- Acciones Prioritarias -->
              ${priorityActions.length > 0 ? `
              <div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); border-radius: 10px; padding: 25px; margin: 30px 0; border: 2px solid #a855f7;">
                <h3 style="color: #6b21a8; margin-top: 0; margin-bottom: 15px; font-size: 20px;">
                  🎯 Acciones Prioritarias para tu Empresa
                </h3>
                ${priorityActions.slice(0, 3).map((action, idx) => `
                  <div style="background: white; border-left: 4px solid ${
                    action.priority === 'alta' ? '#ef4444' :
                    action.priority === 'media' ? '#f59e0b' : '#10b981'
                  }; border-radius: 6px; padding: 15px; margin-bottom: 12px;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                      <span style="background: ${
                        action.priority === 'alta' ? '#fee2e2' :
                        action.priority === 'media' ? '#fef3c7' : '#d1fae5'
                      }; color: ${
                        action.priority === 'alta' ? '#991b1b' :
                        action.priority === 'media' ? '#92400e' : '#065f46'
                      }; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase;">
                        ${action.priority}
                      </span>
                      <span style="color: #64748b; font-size: 12px; font-weight: 600;">${action.axis}</span>
                    </div>
                    <div style="color: #1e293b; font-size: 14px; line-height: 1.5;">${action.action}</div>
                  </div>
                `).join('')}
              </div>
              ` : ''}

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
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Facturación Anual:</td>
                  <td style="padding: 8px 0; color: #333;">${leadData.facturacion_anual ? `$${leadData.facturacion_anual.toLocaleString()} USD` : 'No especificada'}</td>
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

            <!-- Perfil de Empresa & Contexto -->
            ${companyProfile ? `
            <div style="background: #e8f5e9; border-radius: 6px; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #2e7d32;">🏢 Perfil de Empresa</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Clasificación:</td>
                  <td style="padding: 8px 0; color: #2e7d32; font-weight: 700; font-size: 16px;">${companyProfile.icon} ${companyProfile.label}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Rango de Empleados:</td>
                  <td style="padding: 8px 0; color: #333;">${companyProfile.employeeRange}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: 600;">Descripción:</td>
                  <td style="padding: 8px 0; color: #333;">${companyProfile.description}</td>
                </tr>
              </table>
            </div>
            ` : ''}

            <!-- Comparación con Industria -->
            <div style="background: #fff9e6; border-radius: 6px; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #f57c00;">📊 Comparación con Industria (${industria})</h3>
              <div style="margin-bottom: 10px; padding: 10px; background: white; border-radius: 4px;">
                <strong style="color: #4f46e5;">💰 Finanzas:</strong>
                <p style="margin: 5px 0 0 0; color: #555; font-size: 14px;">${industryComparisons.finance}</p>
              </div>
              <div style="margin-bottom: 10px; padding: 10px; background: white; border-radius: 4px;">
                <strong style="color: #10b981;">⚙️ Operaciones:</strong>
                <p style="margin: 5px 0 0 0; color: #555; font-size: 14px;">${industryComparisons.operations}</p>
              </div>
              <div style="padding: 10px; background: white; border-radius: 4px;">
                <strong style="color: #8b5cf6;">📈 Marketing:</strong>
                <p style="margin: 5px 0 0 0; color: #555; font-size: 14px;">${industryComparisons.marketing}</p>
              </div>
            </div>

            <!-- Acciones Prioritarias para Follow-up -->
            ${priorityActions.length > 0 ? `
            <div style="background: #f3e5f5; border-radius: 6px; padding: 20px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #7b1fa2;">🎯 Acciones Prioritarias (para follow-up)</h3>
              ${priorityActions.slice(0, 3).map((action, idx) => `
                <div style="margin-bottom: 15px; padding: 12px; background: white; border-left: 4px solid ${
                  action.priority === 'alta' ? '#ef4444' :
                  action.priority === 'media' ? '#f59e0b' : '#10b981'
                }; border-radius: 4px;">
                  <div style="margin-bottom: 6px;">
                    <span style="background: ${
                      action.priority === 'alta' ? '#fee2e2' :
                      action.priority === 'media' ? '#fef3c7' : '#d1fae5'
                    }; color: ${
                      action.priority === 'alta' ? '#991b1b' :
                      action.priority === 'media' ? '#92400e' : '#065f46'
                    }; padding: 2px 8px; border-radius: 3px; font-size: 11px; font-weight: 700; text-transform: uppercase; margin-right: 8px;">
                      ${action.priority}
                    </span>
                    <strong style="color: #666; font-size: 13px;">${action.axis}</strong>
                  </div>
                  <p style="margin: 0; color: #333; font-size: 14px;">${action.action}</p>
                </div>
              `).join('')}
              <p style="margin: 15px 0 0 0; padding: 10px; background: #fff3e0; border-radius: 4px; color: #e65100; font-size: 13px;">
                💡 <strong>Tip de Ventas:</strong> Enfoca la conversación en estas acciones prioritarias durante el follow-up. Son específicas para su tamaño e industria.
              </p>
            </div>
            ` : ''}

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
