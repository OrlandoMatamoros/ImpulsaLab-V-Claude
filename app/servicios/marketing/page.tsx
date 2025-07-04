import Link from 'next/link'
import { LINKS } from '@/lib/constants'
import { ArrowRight, Target, Megaphone, PenTool, TrendingUp, CheckCircle2, Package, Rocket } from 'lucide-react'

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
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
            <Link 
              href={LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all transform hover:scale-105"
            >
              Descubre tu Potencial de Marca
            </Link>
          </div>
        </div>
      </section>

      {/* ¿Te Suena Familiar? Section */}
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

      {/* Video Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Transforma tu Marca con IA
            </h2>
            
            {/* Video de YouTube */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="aspect-video">
                <iframe
                  src="https://youtu.be/lWWmMPlpFls"
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
                      con herramientas de IA.
                    </p>
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
                      asistencia de IA generativa.
                    </p>
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
                      optimizado con copywriting de IA.
                    </p>
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
                      en tiempo real.
                    </p>
                  </div>
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
              Planes de Marketing
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Plan Identidad */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-purple-500 transition-colors">
                <div className="mb-4">
                  <Package className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Plan Identidad</h3>
                <p className="text-gray-600 mb-6">
                  Construye los cimientos de tu marca profesional
                </p>
                <div className="text-3xl font-bold mb-6">
                  Desde <span className="text-purple-600">$1,200</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Logo profesional y guía de marca</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Kit de redes sociales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">20 plantillas de contenido</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Estrategia de messaging</span>
                  </li>
                </ul>
                <Link
                  href={LINKS.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Empezar Ahora
                </Link>
              </div>

              {/* Plan Crecimiento */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-500 rounded-lg p-8 relative">
                <div className="absolute -top-4 right-4 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Más Popular
                </div>
                <div className="mb-4">
                  <Rocket className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Plan Crecimiento</h3>
                <p className="text-gray-600 mb-6">
                  Marketing completo con IA para escalar tu negocio
                </p>
                <div className="text-3xl font-bold mb-6">
                  Desde <span className="text-purple-600">$2,500</span>
                  <span className="text-lg font-normal text-gray-600"> + mensualidad</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Todo del Plan Identidad</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Gestión de redes con IA</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Campañas de email marketing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Analytics y reportes mensuales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">Chatbot de atención 24/7</span>
                  </li>
                </ul>
                <Link
                  href={LINKS.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Agenda tu Diagnóstico
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
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