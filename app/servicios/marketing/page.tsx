'use client'

import Link from 'next/link'
import { LINKS } from '@/lib/constants'
import { ArrowRight, Target, Megaphone, PenTool, TrendingUp, CheckCircle2, Package, Rocket } from 'lucide-react'
import ProtectedSection from '@/components/ProtectedSection'

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - SIEMPRE VISIBLE */}
      <section className="relative bg-gradient-to-br from-purple-900 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Marketing e Identidad de Marca con IA
            </h1>
            <p className="text-xl mb-8 text-purple-100">
              Construye una marca memorable y atrae clientes con estrategias 
              de marketing potenciadas por Inteligencia Artificial
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-purple-800 rounded-full">
              <span className="font-medium">Próximamente: Automatización completa de campañas</span>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Te Suena Familiar? Section - SIEMPRE VISIBLE */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              ¿Te Suena Familiar?
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
                <p className="text-gray-700">
                  <span className="font-semibold">"Tengo un buen producto, pero nadie me conoce"</span> 
                  - No sabes cómo hacer que tu negocio destaque en un mercado saturado.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
                <p className="text-gray-700">
                  <span className="font-semibold">"Publico en redes pero no veo resultados"</span> 
                  - Inviertes tiempo en contenido que no genera engagement ni ventas.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
                <p className="text-gray-700">
                  <span className="font-semibold">"Mi competencia parece más profesional"</span> 
                  - Tu imagen no refleja la calidad de tu servicio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section - SIEMPRE VISIBLE */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Transforma tu Marca con IA
            </h2>
            
            {/* Video de YouTube */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl max-w-3xl mx-auto">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/lWWmMPlpFls"
                  title="Marketing e Identidad de Marca - Impulsa Lab"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO PROTEGIDO - Metodología y Planes */}
      <ProtectedSection
        message="Regístrate gratis para acceder a nuestra metodología completa de marketing con IA, planes detallados y casos de éxito"
        showPreview={true}
        previewBlur={false}
      >
        {/* Metodología Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
                Nuestra Metodología de Marketing con IA
              </h2>
              <p className="text-center text-gray-600 mb-12">
                Un proceso probado para construir tu presencia digital
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">1. Análisis de Marca</h3>
                      <p className="text-gray-600">
                        Definimos tu propuesta única de valor y analizamos a tu competencia 
                        con herramientas de IA para identificar oportunidades de mercado.
                      </p>
                      <div className="mt-3 space-y-1 text-sm text-gray-500">
                        <div>• Análisis competitivo automatizado</div>
                        <div>• Investigación de audiencia con IA</div>
                        <div>• Definición de buyer personas</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <PenTool className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">2. Identidad Visual</h3>
                      <p className="text-gray-600">
                        Creamos tu logo, paleta de colores y guía de estilo con 
                        asistencia de IA generativa para garantizar consistencia.
                      </p>
                      <div className="mt-3 space-y-1 text-sm text-gray-500">
                        <div>• Logo y marca gráfica</div>
                        <div>• Paleta de colores estratégica</div>
                        <div>• Guía de estilo completa</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Megaphone className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">3. Estrategia de Contenido</h3>
                      <p className="text-gray-600">
                        Desarrollamos un calendario editorial y creamos contenido 
                        optimizado con copywriting de IA que convierte.
                      </p>
                      <div className="mt-3 space-y-1 text-sm text-gray-500">
                        <div>• Calendario editorial mensual</div>
                        <div>• Copywriting optimizado para conversión</div>
                        <div>• Contenido multimedia automatizado</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">4. Implementación y Análisis</h3>
                      <p className="text-gray-600">
                        Lanzamos campañas y monitoreamos resultados con dashboards 
                        en tiempo real para optimización continua.
                      </p>
                      <div className="mt-3 space-y-1 text-sm text-gray-500">
                        <div>• Automatización de campañas</div>
                        <div>• Dashboards de métricas en vivo</div>
                        <div>• Optimización basada en datos</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Casos de Éxito Preview */}
              <div className="mt-16 bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
                  Resultados Reales de Nuestros Clientes
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">+340%</div>
                    <div className="text-gray-700">Aumento en engagement</div>
                    <div className="text-sm text-gray-500 mt-2">Restaurante Gourmet</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">+180%</div>
                    <div className="text-gray-700">Crecimiento en ventas</div>
                    <div className="text-sm text-gray-500 mt-2">E-commerce Fashion</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">+250%</div>
                    <div className="text-gray-700">Leads calificados</div>
                    <div className="text-sm text-gray-500 mt-2">Consultoría B2B</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Planes Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Planes de Marketing con IA
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Plan Identidad */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-purple-500 transition-all duration-300 hover:shadow-xl">
                  <div className="mb-4">
                    <Package className="w-12 h-12 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Plan Identidad</h3>
                  <p className="text-gray-600 mb-6">
                    Construye los cimientos de tu marca profesional con IA
                  </p>
                  <div className="text-3xl font-bold mb-6">
                    Desde <span className="text-purple-600">$1,200</span>
                    <div className="text-sm font-normal text-gray-500 mt-1">Pago único</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Logo profesional y guía de marca</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Kit completo de redes sociales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">50 plantillas de contenido generadas con IA</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Estrategia de messaging y tono de voz</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Análisis competitivo con IA</span>
                    </li>
                  </ul>
                  <Link
                    href={LINKS.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Empezar Ahora
                  </Link>
                </div>

                {/* Plan Crecimiento */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-500 rounded-lg p-8 relative hover:shadow-2xl transition-all duration-300">
                  <div className="absolute -top-4 right-4 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Más Popular
                  </div>
                  <div className="mb-4">
                    <Rocket className="w-12 h-12 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Plan Crecimiento</h3>
                  <p className="text-gray-600 mb-6">
                    Marketing completo con IA para escalar tu negocio exponencialmente
                  </p>
                  <div className="text-3xl font-bold mb-6">
                    Desde <span className="text-purple-600">$2,500</span>
                    <div className="text-sm font-normal text-gray-600 mt-1">+ $800/mes gestión</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Todo del Plan Identidad</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Gestión automatizada de redes con IA</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Campañas de email marketing inteligentes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Analytics avanzados y reportes mensuales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Chatbot de atención 24/7</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Optimización continua con machine learning</span>
                    </li>
                  </ul>
                  <Link
                    href={LINKS.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Agenda tu Diagnóstico
                  </Link>
                </div>
              </div>

              {/* Herramientas de IA que utilizamos */}
              <div className="mt-16 bg-gray-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
                  Herramientas de IA que Potencian tu Marketing
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div className="p-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <span className="text-2xl">🤖</span>
                    </div>
                    <div className="font-semibold text-gray-800">ChatGPT</div>
                    <div className="text-sm text-gray-600">Copywriting</div>
                  </div>
                  <div className="p-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <span className="text-2xl">🎨</span>
                    </div>
                    <div className="font-semibold text-gray-800">Midjourney</div>
                    <div className="text-sm text-gray-600">Diseño Visual</div>
                  </div>
                  <div className="p-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <span className="text-2xl">📊</span>
                    </div>
                    <div className="font-semibold text-gray-800">Analytics IA</div>
                    <div className="text-sm text-gray-600">Insights</div>
                  </div>
                  <div className="p-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div className="font-semibold text-gray-800">Targeting IA</div>
                    <div className="text-sm text-gray-600">Audiencias</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ProtectedSection>

      {/* CTA Final - SIEMPRE VISIBLE */}
      <section className="py-16 bg-gradient-to-br from-purple-900 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para Brillar en el Mercado?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Descubre cómo la IA puede transformar tu marketing y hacer crecer 
              tu negocio de forma exponencial
            </p>
            <Link
              href={LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all transform hover:scale-105"
            >
              Obtén tu Diagnóstico 3D Gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}