import Link from 'next/link'
import { LINKS } from '@/lib/constants'

export default function FinanzasPage() {
  return (
    <>
      {/* Sección 1: Hero - Tema Oscuro */}
      <section className="relative bg-[#002D62] text-white pt-24 pb-20 overflow-hidden">
        {/* Patrón de fondo abstracto */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Deja de Adivinar con tus Finanzas. Toma el Control con Datos.
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Transformamos tus ventas, gastos y costos desordenados en un dashboard 
              interactivo que te da claridad total para tomar decisiones rentables.
            </p>
          </div>
        </div>
      </section>

      {/* Sección 2: El Problema - Tema Claro */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              ¿Te Suena Familiar?
            </h2>
            <div className="space-y-6">
              {[
                "¿Sientes que vendes mucho pero no sabes a dónde se va el dinero?",
                "¿Te cuesta saber qué producto o servicio es realmente rentable?",
                "¿Las decisiones sobre precios o compras se basan más en la intuición que en datos reales?",
                "¿Pierdes tiempo haciendo cálculos manuales que no te dan la imagen completa?"
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

      {/* Sección 3: La Solución - Tema Claro */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Nuestra Solución: Un Centro de Mando para tu Negocio
            </h2>
            
            {/* Video Demo */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-12 aspect-video">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/TswtaMkROcU?autoplay=1&mute=1&loop=1&playlist=TswtaMkROcU"
                title="Dashboard Demo - Impulsa Lab"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Características */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "KPIs Personalizados",
                  description: "Métricas específicas para tu industria y modelo de negocio"
                },
                {
                  title: "Análisis de Rentabilidad",
                  description: "Conoce el margen real de cada producto o servicio"
                },
                {
                  title: "Control de Costos en Tiempo Real",
                  description: "Identifica gastos innecesarios y oportunidades de ahorro"
                },
                {
                  title: "Proyecciones y Análisis de Escenarios",
                  description: "Simula decisiones antes de tomarlas"
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Sección 4: Nuestro Proceso - Tema Gris */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Nuestra Metodología en 4 Pasos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  numero: "1",
                  titulo: "Diagnóstico y Recolección",
                  descripcion: "Entendemos tu negocio y recolectamos tus datos."
                },
                {
                  numero: "2",
                  titulo: "Ingeniería de Datos",
                  descripcion: "Limpiamos, estructuramos y modelamos tus datos."
                },
                {
                  numero: "3",
                  titulo: "Diseño y Entrega",
                  descripcion: "Construimos tu dashboard 100% a medida."
                },
                {
                  numero: "4",
                  titulo: "Capacitación y Soporte",
                  descripcion: "Te enseñamos a usarlo y te acompañamos."
                }
              ].map((paso, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-lg p-6 shadow-lg h-full">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                      {paso.numero}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{paso.titulo}</h3>
                    <p className="text-gray-600">{paso.descripcion}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección 5: Planes y Precios - Tema Claro */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Planes Diseñados para tu Etapa de Crecimiento
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Plan Piloto Automático */}
              <div className="bg-gray-50 rounded-lg p-8 border-2 border-gray-200">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Implementación "Piloto Automático"</h3>
                <p className="text-gray-600 mb-6">Ideal para: Negocios que necesitan claridad y control inmediato.</p>
                
                <div className="mb-6">
                  <p className="text-3xl font-bold text-blue-600">Desde $1,500</p>
                  <p className="text-gray-500">Pago único</p>
                </div>

                <div className="mb-8">
                  <p className="font-semibold mb-3 text-gray-900">Entregables:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Dashboard personalizado en Excel/Google Sheets</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Automatización de cálculos y reportes</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Capacitación inicial incluida</span>
                    </li>
                  </ul>
                </div>

                <Link href={LINKS.calendly}
                      target="_blank"
                      className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Agendar Diagnóstico
                </Link>
              </div>

              {/* Plan Cohete */}
              <div className="bg-blue-50 rounded-lg p-8 border-2 border-blue-200 relative">
                <div className="absolute -top-3 right-8 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Más Popular
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Consultoría Estratégica "Cohete"</h3>
                <p className="text-gray-600 mb-6">Ideal para: Negocios que buscan optimizar y escalar con inteligencia de datos.</p>
                
                <div className="mb-6">
                  <p className="text-3xl font-bold text-blue-600">Desde $2,500</p>
                  <p className="text-gray-500">+ Suscripción mensual</p>
                </div>

                <div className="mb-8">
                  <p className="font-semibold mb-3 text-gray-900">Entregables:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Todo lo del plan Piloto Automático</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Análisis avanzado y modelado predictivo</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Reuniones mensuales de estrategia</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Soporte prioritario continuo</span>
                    </li>
                  </ul>
                </div>

                <Link href={LINKS.calendly}
                      target="_blank"
                      className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Agendar Diagnóstico
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 6: CTA Final - Tema Oscuro */}
      <section className="py-20 bg-[#002D62] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para Tomar Decisiones Basadas en Datos?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Agenda tu diagnóstico gratuito y descubre cómo un dashboard personalizado 
              puede transformar la forma en que manejas tu negocio.
            </p>
            <Link href={LINKS.calendly}
                  target="_blank"
                  className="inline-block bg-white text-blue-900 px-8 py-4 rounded-lg 
                           font-semibold text-lg transition-all duration-300 
                           hover:scale-105 hover:bg-gray-100">
              Obtén tu Diagnóstico 3D Gratis
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}