'use client'

import { useState } from 'react'
import { LINKS } from '@/lib/constants'

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Aquí normalmente enviarías el formulario
    // Por ahora solo mostramos el mensaje de éxito
    setFormStatus('success')
    setTimeout(() => setFormStatus('idle'), 5000)
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
              <div>
                <input type="text" 
                       name="nombre" 
                       placeholder="Nombre" 
                       required
                       className="w-full px-4 py-3 rounded-lg border border-gray-300 
                                bg-white text-gray-900 placeholder-gray-500
                                focus:border-blue-500 focus:outline-none focus:ring-2 
                                focus:ring-blue-200 transition-all" />
              </div>
              <div>
                <input type="email" 
                       name="email" 
                       placeholder="Correo Electrónico" 
                       required
                       className="w-full px-4 py-3 rounded-lg border border-gray-300 
                                bg-white text-gray-900 placeholder-gray-500
                                focus:border-blue-500 focus:outline-none focus:ring-2 
                                focus:ring-blue-200 transition-all" />
              </div>
              <div>
                <textarea name="mensaje" 
                          placeholder="Mensaje" 
                          rows={4}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 
                                   bg-white text-gray-900 placeholder-gray-500
                                   focus:border-blue-500 focus:outline-none focus:ring-2 
                                   focus:ring-blue-200 transition-all resize-none" />
              </div>
              <button type="submit" 
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg 
                               font-semibold hover:bg-blue-700 transition-all duration-300">
                Enviar Mensaje
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
              <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
                ¡Gracias por tu mensaje! Te contactaremos pronto.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}