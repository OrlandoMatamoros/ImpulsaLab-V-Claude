'use client'

import Link from 'next/link'
import { LINKS } from '@/lib/constants'
import { Bot, Search, Zap, Briefcase, DollarSign, Layers } from 'lucide-react'

export default function OperacionesPage() {
  return (
    <>
      {/* Hero - MANTENER */}
      <section className="relative bg-green-900 text-white pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Automatiza tu Negocio. Recupera tu Tiempo. Enfócate en Crecer.
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Implementamos agentes de IA que se encargan de las tareas repetitivas mientras 
              tú te dedicas a lo que realmente importa: hacer crecer tu negocio.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-green-800 rounded-full">
              <span className="font-medium">5,670+ Automatizaciones disponibles</span>
            </div>
          </div>
        </div>
      </section>

      {/* El Problema - MANTENER */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              ¿Te Suena Familiar?
            </h2>
            <div className="space-y-6">
              {[
                "¿Pasas horas en tareas administrativas que no agregan valor?",
                "¿Tu equipo pierde tiempo en procesos manuales y repetitivos?",
                "¿Los errores humanos en tareas rutinarias te cuestan dinero?",
                "¿Sientes que trabajas EN tu negocio en lugar de PARA tu negocio?"
              ].map((problema, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-red-600 font-bold">?</span>
                  </div>
                  <p className="text-lg text-gray-700">{problema}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Demo - MANTENER */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Agentes de IA: Tu Equipo Digital 24/7
            </h2>
            
            <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-12 aspect-video">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/lMFV5mq_IXo"
                title="Automatización Demo - Impulsa Lab"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Automatización de emails y seguimientos",
                  description: "Responde consultas y programa citas automáticamente"
                },
                {
                  title: "Gestión inteligente de agenda",
                  description: "Optimiza tu calendario y evita conflictos de horario"
                },
                {
                  title: "Procesamiento automático de documentos",
                  description: "Extrae datos y genera reportes sin intervención manual"
                },
                {
                  title: "Chatbots de atención al cliente",
                  description: "Atiende a tus clientes 24/7 con respuestas personalizadas"
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN: Cards de navegación */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              Explora Nuestras Soluciones de Automatización
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Desde agentes de IA personalizados hasta un arsenal de más de 5,670 automatizaciones listas para usar
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Agente 4IA */}
              <Link href="/servicios/operaciones/agentes" 
                    className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition">
                    <Bot className="w-12 h-12 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Agente Unificador 4IA</h3>
                <p className="text-gray-600 text-center mb-4">
                  Consulta ChatGPT, Claude y Gemini simultáneamente con nuestro agente inteligente
                </p>
                <div className="text-center text-purple-600 font-semibold group-hover:text-purple-700">
                  Explorar →
                </div>
              </Link>

              {/* Arsenal */}
              <Link href="/servicios/operaciones/arsenal"
                    className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition">
                    <Search className="w-12 h-12 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Arsenal 5,670+</h3>
                <p className="text-gray-600 text-center mb-4">
                  Busca entre miles de automatizaciones listas para implementar en tu negocio
                </p>
                <div className="text-center text-blue-600 font-semibold group-hover:text-blue-700">
                  Buscar →
                </div>
              </Link>

              {/* Plataformas */}
              <Link href="/servicios/operaciones/plataformas"
                    className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-orange-100 rounded-xl group-hover:bg-orange-200 transition">
                    <Layers className="w-12 h-12 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Plataformas</h3>
                <p className="text-gray-600 text-center mb-4">
                  Make, Zapier, n8n y más herramientas de automatización empresarial
                </p>
                <div className="text-center text-orange-600 font-semibold group-hover:text-orange-700">
                  Descubrir →
                </div>
              </Link>

              {/* Casos de Uso */}
              <Link href="/servicios/operaciones/casos"
                    className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-green-100 rounded-xl group-hover:bg-green-200 transition">
                    <Briefcase className="w-12 h-12 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Casos por Industria</h3>
                <p className="text-gray-600 text-center mb-4">
                  Soluciones específicas para retail, salud, restaurantes y más
                </p>
                <div className="text-center text-green-600 font-semibold group-hover:text-green-700">
                  Ver casos →
                </div>
              </Link>

              {/* Precios */}
              <Link href="/servicios/operaciones/precios"
                    className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition">
                    <DollarSign className="w-12 h-12 text-emerald-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Planes y Precios</h3>
                <p className="text-gray-600 text-center mb-4">
                  Desde $99/mes con opciones flexibles para cada necesidad
                </p>
                <div className="text-center text-emerald-600 font-semibold group-hover:text-emerald-700">
                  Ver precios →
                </div>
              </Link>

              {/* Proceso */}
              <Link href="/servicios/operaciones/proceso"
                    className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-indigo-100 rounded-xl group-hover:bg-indigo-200 transition">
                    <Zap className="w-12 h-12 text-indigo-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">Nuestro Proceso</h3>
                <p className="text-gray-600 text-center mb-4">
                  5 pasos para transformar tu negocio con automatización inteligente
                </p>
                <div className="text-center text-indigo-600 font-semibold group-hover:text-indigo-700">
                  Conocer →
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final - MANTENER */}
      <section className="py-20 bg-green-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para Recuperar tu Tiempo y Enfocarte en Crecer?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Agenda tu diagnóstico gratuito y descubre cómo la automatización inteligente 
              puede transformar la forma en que operas tu negocio.
            </p>
            <Link href="https://calendly.com/orlando-tuimpulsalab/30min"
                  target="_blank"
                  className="inline-block bg-white text-green-900 px-8 py-4 rounded-lg 
                           font-semibold text-lg transition-all duration-300 
                           hover:scale-105 hover:bg-gray-100">
              Agendar Diagnóstico 3D Gratis
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
