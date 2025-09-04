'use client'

import { useState } from 'react'
import { LINKS } from '@/lib/constants'

// Tipos para mejor type safety
interface FormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

export default function ContactSection() {
  // Estados del formulario
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: 'general', // Valor por defecto
    message: ''
  })
  
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Webhook URL - Considera moverlo a variable de entorno en producción
  const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_CONTACT || 
    'https://orlandom88.app.n8n.cloud/webhook/272d180d-39d1-44f7-af8f-fec01dbad68a'

  // Validación de email
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  // Validación de teléfono (ajusta según tu país)
  const validatePhone = (phone: string): boolean => {
    const re = /^[\d\s\-\+\(\)]+$/
    return re.test(phone) && phone.replace(/\D/g, '').length >= 8
  }

  // Validación del formulario
  const validateForm = (): boolean => {
    const errors: FormErrors = {}

    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido'
    }

    if (!formData.email.trim()) {
      errors.email = 'El email es requerido'
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Email inválido'
    }

    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es requerido'
    } else if (!validatePhone(formData.phone)) {
      errors.phone = 'Teléfono inválido'
    }

    if (!formData.message.trim()) {
      errors.message = 'El mensaje es requerido'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Manejo de cambios en inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Validar antes de enviar
    if (!validateForm()) {
      return
    }

    setFormStatus('loading')
    setErrorMessage('')

    // Preparar datos para enviar
    const dataToSend = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
      timestamp: new Date().toISOString(),
      source: 'ImpulsaLab-Website',
      page: 'homepage', // Puedes hacer esto dinámico según la página
      // Agregar UTM parameters si existen
      ...(typeof window !== 'undefined' && {
        utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || '',
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || ''
      })
    }

    try {
      // Enviar a n8n webhook
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      })

      // n8n normalmente devuelve 200 incluso para respuestas simples
      if (response.ok) {
        setFormStatus('success')
        // Limpiar formulario
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'general',
          message: ''
        })
        
        // Tracking de conversión (si tienes GA4/GTM)
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'form_submit', {
            event_category: 'engagement',
            event_label: 'contact_form',
            value: 1
          })
        }
        
        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => setFormStatus('idle'), 5000)
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error enviando formulario:', error)
      setFormStatus('error')
      setErrorMessage('Hubo un problema enviando tu mensaje. Por favor, intenta nuevamente o contáctanos directamente por email.')
      
      // Reintentar una vez después de 2 segundos
      setTimeout(async () => {
        try {
          const retryResponse = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
          })
          
          if (retryResponse.ok) {
            setFormStatus('success')
            setFormData({
              name: '',
              email: '',
              phone: '',
              service: 'general',
              message: ''
            })
            setTimeout(() => setFormStatus('idle'), 5000)
          }
        } catch (retryError) {
          console.error('Retry failed:', retryError)
        }
      }, 2000)
    }
  }

  return (
    <section id="contacto" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            ¿Listo para Encontrar la 'Coordenada' de tu Negocio?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            El primer paso es nuestro Diagnóstico 3D gratuito. Agenda una videollamada 
            de 30 minutos sin ningún tipo de compromiso. Nuestros planes son flexibles 
            y se adaptan a la realidad de cada negocio; la primera conversación es para 
            ayudarte, no para venderte.
          </p>
          
          <a href={LINKS.calendly}
             target="_blank"
             rel="noopener noreferrer"
             className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg 
                      font-semibold text-lg transition-all duration-300 
                      hover:bg-blue-700 hover:scale-105 mb-12">
            Obtén tu Diagnóstico 3D Gratis
          </a>

          {/* Formulario de Contacto */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
              {/* Campo Nombre */}
              <div>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre *" 
                  required
                  disabled={formStatus === 'loading'}
                  className={`w-full px-4 py-3 rounded-lg border transition-all
                    ${formErrors.name 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-blue-200'} 
                    bg-white text-gray-900 placeholder-gray-500
                    focus:border-blue-500 focus:outline-none focus:ring-2
                    disabled:opacity-50 disabled:cursor-not-allowed`} 
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600 text-left">{formErrors.name}</p>
                )}
              </div>

              {/* Campo Email */}
              <div>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange} 
                  placeholder="Correo Electrónico *" 
                  required
                  disabled={formStatus === 'loading'}
                  className={`w-full px-4 py-3 rounded-lg border transition-all
                    ${formErrors.email 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-blue-200'} 
                    bg-white text-gray-900 placeholder-gray-500
                    focus:border-blue-500 focus:outline-none focus:ring-2
                    disabled:opacity-50 disabled:cursor-not-allowed`} 
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600 text-left">{formErrors.email}</p>
                )}
              </div>

              {/* Campo Teléfono */}
              <div>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange} 
                  placeholder="Teléfono *" 
                  required
                  disabled={formStatus === 'loading'}
                  className={`w-full px-4 py-3 rounded-lg border transition-all
                    ${formErrors.phone 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-blue-200'} 
                    bg-white text-gray-900 placeholder-gray-500
                    focus:border-blue-500 focus:outline-none focus:ring-2
                    disabled:opacity-50 disabled:cursor-not-allowed`} 
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-600 text-left">{formErrors.phone}</p>
                )}
              </div>

              {/* Campo Servicio */}
              <div>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  disabled={formStatus === 'loading'}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 
                           bg-white text-gray-900
                           focus:border-blue-500 focus:outline-none focus:ring-2 
                           focus:ring-blue-200 transition-all
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="general">Consulta General</option>
                  <option value="diagnostico">Diagnóstico 3D</option>
                  <option value="marketing">Marketing Digital</option>
                  <option value="desarrollo">Desarrollo Web</option>
                  <option value="consultoria">Consultoría</option>
                </select>
              </div>

              {/* Campo Mensaje */}
              <div>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange} 
                  placeholder="Mensaje *" 
                  rows={4}
                  required
                  disabled={formStatus === 'loading'}
                  className={`w-full px-4 py-3 rounded-lg border transition-all
                    ${formErrors.message 
                      ? 'border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:ring-blue-200'} 
                    bg-white text-gray-900 placeholder-gray-500
                    focus:border-blue-500 focus:outline-none focus:ring-2
                    resize-none disabled:opacity-50 disabled:cursor-not-allowed`} 
                />
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-600 text-left">{formErrors.message}</p>
                )}
              </div>

              {/* Honeypot field para bots (oculto) */}
              <div style={{ display: 'none' }}>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Botón de envío */}
              <button 
                type="submit"
                disabled={formStatus === 'loading'} 
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg 
                         font-semibold hover:bg-blue-700 transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2">
                {formStatus === 'loading' ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" 
                              stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  'Enviar Mensaje'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-gray-600">
              <p className="mb-2">O si lo prefieres, escríbenos a:</p>
              <a href={`mailto:${LINKS.email}`} 
                 className="text-blue-600 hover:underline block">
                {LINKS.email}
              </a>
            </div>

            {/* Mensaje de éxito */}
            {formStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg 
                            animate-fade-in flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" />
                </svg>
                ¡Gracias por tu mensaje! Te contactaremos pronto.
              </div>
            )}

            {/* Mensaje de error */}
            {formStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}