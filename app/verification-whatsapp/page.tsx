'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { signInWithCustomToken } from 'firebase/auth'

export default function VerificationWhatsApp() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'phone' | 'verify'>('phone')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendTimer, setResendTimer] = useState(0)

  useEffect(() => {
    // Verificar que el email fue verificado y pre-llenar teléfono
    const emailData = sessionStorage.getItem('verifiedEmailData')
    if (!emailData) {
      router.push('/signup')
    } else {
      const data = JSON.parse(emailData)
      if (data.phone) {
        setPhone(data.phone)
      }
    }
  }, [router])

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleSendWhatsApp = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/verification/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error enviando código')
      }

      setStep('verify')
      setResendTimer(60)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyAndCreateAccount = async () => {
    setLoading(true)
    setError('')

    try {
      const emailData = sessionStorage.getItem('verifiedEmailData')
      if (!emailData) {
        throw new Error('Datos de verificación no encontrados')
      }

      const userData = JSON.parse(emailData)

      // FIX: Ruta correcta sin /route
      const response = await fetch('/api/auth/create-verified-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          name: userData.name,
          phone: phone,
          whatsappCode: code,
          consultantCode: userData.consultantCode
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error creando cuenta')
      }

      // Auto-login con custom token
      if (data.customToken) {
        await signInWithCustomToken(auth, data.customToken)
      }

      // Limpiar storage
      sessionStorage.clear()

      // Redirigir según rol
      setTimeout(() => {
        switch (data.role) {
          case 'admin':
            router.push('/admin')
            break
          case 'consultant':
            router.push('/consultant')
            break
          default:
            router.push('/dashboard')
        }
      }, 1500)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Verificación WhatsApp
          </h1>
          <p className="text-gray-600">
            Último paso para crear tu cuenta
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">❌ {error}</p>
          </div>
        )}

        {step === 'phone' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de WhatsApp
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+52 1234567890"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                Incluye código de país (ej: +52 para México, +1 para USA)
              </p>
            </div>

            <button
              onClick={handleSendWhatsApp}
              disabled={loading || !phone}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Enviando...' : 'Enviar Código WhatsApp'}
            </button>
          </div>
        )}

        {step === 'verify' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código de WhatsApp
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\\D/g, '').slice(0, 6))}
                placeholder="000000"
                maxLength={6}
                className="w-full px-4 py-3 text-center text-2xl font-mono border border-gray-300 rounded-lg tracking-widest focus:ring-2 focus:ring-green-600 focus:border-transparent"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                Enviamos código a: <strong>{phone}</strong>
              </p>
            </div>

            <button
              onClick={handleVerifyAndCreateAccount}
              disabled={loading || code.length !== 6}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creando cuenta...' : 'Verificar y Crear Cuenta'}
            </button>

            <button
              onClick={() => handleSendWhatsApp()}
              disabled={resendTimer > 0}
              className="w-full text-green-600 hover:text-green-700 font-medium disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {resendTimer > 0 
                ? `Reenviar en ${resendTimer}s`
                : '¿No recibiste el código? Reenviar'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}