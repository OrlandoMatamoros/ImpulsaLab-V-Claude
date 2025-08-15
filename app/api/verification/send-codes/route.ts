import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { db } from '@/lib/firebase'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'

const resend = new Resend(process.env.RESEND_API_KEY!)

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(identifier)
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + 15 * 60 * 1000
    })
    return true
  }
  
  if (limit.count >= 5) {
    return false
  }
  
  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const { email, phoneNumber, method } = await request.json()

    if (!email && !phoneNumber) {
      return NextResponse.json(
        { success: false, error: 'Email o teléfono requerido' },
        { status: 400 }
      )
    }

    const identifier = email || phoneNumber
    
    if (!checkRateLimit(identifier)) {
      return NextResponse.json(
        { success: false, error: 'Demasiados intentos. Intente en 15 minutos.' },
        { status: 429 }
      )
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    
    await addDoc(collection(db, 'verification_codes'), {
      identifier,
      code: verificationCode,
      method: method || 'email',
      used: false,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    })

    if (email) {
      const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [email],
        subject: 'Tu código de verificación - Impulsa Lab',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Tu código de verificación</h2>
            <p>Usa este código para verificar tu cuenta:</p>
            <h1 style="background: #f0f0f0; padding: 20px; text-align: center; letter-spacing: 5px;">
              ${verificationCode}
            </h1>
            <p>Este código expirará en 10 minutos.</p>
          </div>
        `
      })

      if (error) {
        console.error('Error enviando email:', error)
        return NextResponse.json(
          { success: false, error: 'Error enviando email' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Código enviado exitosamente'
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno' },
      { status: 500 }
    )
  }
}
