'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Mail, User, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface LeadConfirmationProps {
  clientInfo: any
  scores: {
    finance: number
    operations: number
    marketing: number
  }
  responses: any[]
  onConfirm: () => void
}

export function LeadConfirmation({
  clientInfo,
  scores,
  responses,
  onConfirm
}: LeadConfirmationProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombre: clientInfo?.contactName || '',
    email: clientInfo?.email || '',
  })
  const [errors, setErrors] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Email inválido'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Enviar datos al API para procesamiento y envío de correos
      const response = await fetch('/api/diagnostic/send-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadData: {
            fecha: new Date().toISOString().split('T')[0],
            nombre: formData.nombre,
            email: formData.email,
            telefono: clientInfo?.phone || 'No proporcionado',
            empresa: clientInfo?.companyName || 'No proporcionado',
            industria: clientInfo?.industry || 'No especificada',
            empleados: clientInfo?.employeeCount || 0,
            score_finanzas: Math.round(scores.finance),
            score_operaciones: Math.round(scores.operations),
            score_marketing: Math.round(scores.marketing),
            score_promedio: Math.round((scores.finance + scores.operations + scores.marketing) / 3),
            origen: clientInfo?.userType || 'Registrado'
          },
          clientInfo,
          scores,
          responses
        }),
      })

      if (response.ok) {
        // Redirigir a página de gracias para conversión
        router.push('/gracias')
      } else {
        const errorData = await response.json()
        setErrors({ submit: errorData.message || 'Error al enviar el reporte. Intenta nuevamente.' })
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Error al enviar:', error)
      setErrors({ submit: 'Error de conexión. Verifica tu internet e intenta nuevamente.' })
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header con mensaje de éxito */}
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Diagnóstico Completado!
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Confirma tus datos para enviarte el reporte completo y desbloquear tu resultado.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulario de confirmación */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            Confirma tus Datos de Contacto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <User className="w-4 h-4 inline mr-2" />
                Nombre Completo *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
                  transition-all duration-200 ${
                  errors.nombre ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Tu nombre completo"
                disabled={isSubmitting}
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.nombre}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4 inline mr-2" />
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
                  transition-all duration-200 ${
                  errors.email ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="tu@email.com"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Error de envío */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Información adicional */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>📧 Recibirás:</strong>
              </p>
              <ul className="text-sm text-gray-600 mt-2 space-y-1 ml-4">
                <li>✓ Reporte completo con tu diagnóstico</li>
                <li>✓ Análisis detallado de las 3 dimensiones</li>
                <li>✓ Recomendaciones personalizadas</li>
                <li>✓ Acceso a agendar consultoría gratuita</li>
              </ul>
            </div>

            {/* Botón de envío */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-[#002D62] hover:bg-[#001d42] text-white font-semibold py-4 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Enviando...
                </>
              ) : (
                <>
                  Enviar Resultados y Continuar
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Nota de privacidad */}
      <p className="text-xs text-gray-500 text-center">
        Al continuar, aceptas recibir el reporte y comunicaciones de ImpulsaLab.
        <br />
        Consulta nuestra <a href="/legal/datos" className="underline text-blue-600">Política de Privacidad</a>
      </p>
    </div>
  )
}
