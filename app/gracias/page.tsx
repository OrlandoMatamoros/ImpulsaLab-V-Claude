'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { FaCheckCircle } from 'react-icons/fa'

declare global {
  interface Window {
    gtag: (command: string, action: string, params: any) => void
    dataLayer: any[]
  }
}

export default function GraciasPage() {
  useEffect(() => {
    // Disparar evento de conversión de Google Ads cuando la página cargue
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17854811161/k7rXCLXI_N0bEJmY68FC'
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Ícono de éxito */}
        <div className="flex justify-center mb-8">
          <div className="bg-green-100 rounded-full p-6">
            <FaCheckCircle className="text-green-600 text-6xl" />
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#002D62' }}>
          ¡Solicitud Recibida!
        </h1>

        {/* Mensaje principal */}
        <p className="text-xl md:text-2xl text-gray-700 mb-4 leading-relaxed">
          Tu camino hacia la inteligencia de negocio comienza ahora.
        </p>

        {/* Mensaje secundario */}
        <p className="text-lg text-gray-600 mb-10">
          Te contactaremos en breve para agendar tu <span className="font-semibold" style={{ color: '#002D62' }}>Diagnóstico 3D</span>
        </p>

        {/* Decoración visual */}
        <div className="w-24 h-1 mx-auto mb-10" style={{ backgroundColor: '#002D62' }}></div>

        {/* Información adicional */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-100">
          <h2 className="text-lg font-semibold mb-3" style={{ color: '#002D62' }}>
            ¿Qué sigue?
          </h2>
          <ul className="text-left text-gray-700 space-y-2 max-w-md mx-auto">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Revisaremos tu información</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Te contactaremos en las próximas 24 horas</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>Agendaremos tu Diagnóstico 3D personalizado</span>
            </li>
          </ul>
        </div>

        {/* Botón para volver al inicio */}
        <Link
          href="/"
          className="inline-block px-8 py-4 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          style={{ backgroundColor: '#002D62' }}
        >
          Volver al Inicio
        </Link>

        {/* Mensaje de soporte */}
        <p className="text-sm text-gray-500 mt-8">
          ¿Tienes alguna pregunta? Contáctanos en{' '}
          <a
            href="mailto:contacto@impulsalab.com"
            className="underline hover:text-blue-600"
            style={{ color: '#002D62' }}
          >
            contacto@impulsalab.com
          </a>
        </p>
      </div>
    </div>
  )
}
