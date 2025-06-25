import Link from 'next/link'
import { LINKS } from '@/lib/constants'
import { Play, Palette, Megaphone, Target, Share2, CheckCircle, ArrowRight } from 'lucide-react'

export default function MarketingPage() {
  return (
    <>
      {/* Sección 1: Hero - Tema Oscuro */}
      <section className="relative bg-purple-900 text-white pt-24 pb-20 overflow-hidden">
        {/* Patrón de fondo abstracto */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Tu Marca Merece Brillar. Hazlo con Inteligencia Artificial.
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Creamos tu identidad de marca, contenido atractivo y campañas que conectan, 
              todo potenciado por IA para resultados extraordinarios.
            </p>
          </div>
        </div>
      </section>

      {/* Sección 2: El Problema - Tema Claro */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
              ¿Te Suena Familiar?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <h3 className="text-lg font-semibold text-gray-900">Falta de Contenido</h3>
                </div>
                <p className="text-gray-700">
                  ¿No tienes tiempo para crear contenido consistente?
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  <h3 className="text-lg font-semibold text-gray-900">Imagen Inconsistente</h3>
                </div>
                <p className="text-gray-700">
                  ¿Tu marca no refleja la calidad de tu negocio?
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <h3 className="text-lg font-semibold text-gray-900">Redes Abandonadas</h3>
                </div>
                <p className="text-gray-700">
                  ¿Tus redes sociales están abandonadas o sin estrategia?
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-red-600">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-red-600 rounded-full mr-3"></div>
                  <h3 className="text-lg font-semibold text-gray-900">Cliente Perdido</h3>
                </div>
                <p className="text-gray-700">
                  ¿No sabes cómo llegar a tu cliente ideal?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3: La Solución - Tema Claro */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
              Marketing Inteligente que Trabaja por Ti
            </h2>
            
            {/* Video Demo */}
            <div className="relative rounded-lg overflow-hidden mb-12 aspect-video">
              <iframe 
                className="w-full h-full"
                src="https://player.vimeo.com/video/428087309?background=1&autoplay=1&loop=1&muted=1"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 text-white pointer-events-none">
                <p className="text-sm opacity-75">Demo del Sistema</p>
                <p className="text-lg font-semibold">Mira cómo transformamos tu negocio</p>
              </div>
            </div>
            
            {/* Características principales */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Palette className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Diseño de Marca</h3>
                <p className="text-gray-600">Identidad profesional creada con IA</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Megaphone className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Contenido Ilimitado</h3>
                <p className="text-gray-600">Creación automática de posts y campañas</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Share2 className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Gestión de Redes</h3>
                <p className="text-gray-600">Programación y manejo automático</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Campañas Segmentadas</h3>
                <p className="text-gray-600">Publicidad optimizada y dirigida</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 4: Nuestro Proceso - Tema Gris */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
        El Camino para Construir una Marca que Enamora
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          {
            numero: "1",
            titulo: "Taller de Inmersión y Estrategia",
            descripcion: "Realizamos un taller contigo para definir la esencia, los valores, la voz y el público objetivo de tu marca. Esta es la base de todo."
          },
          {
            numero: "2",
            titulo: "Creación de la Identidad Visual con IA",
            descripcion: "Usamos herramientas de IA para generar y refinar conceptos de logo, paletas de colores y tipografías que representen la personalidad de tu marca."
          },
          {
            numero: "3",
            titulo: "Diseño del Plan de Contenidos",
            descripcion: "Creamos una estrategia de contenidos y una parrilla de publicación para tus redes sociales, definiendo los temas y formatos que más conectan con tu audiencia."
          },
          {
            numero: "4",
            titulo: "Producción de Contenido Asistida por IA",
            descripcion: "Generamos los textos, imágenes y conceptos visuales para tus publicaciones, optimizando el tiempo y manteniendo una alta calidad y coherencia."
          },
          {
            numero: "5",
            titulo: "Análisis y Optimización",
            descripcion: "Medimos el rendimiento de tus contenidos y campañas, y usamos esos datos para refinar la estrategia y asegurar un crecimiento constante de tu comunidad."
          }
        ].map((paso, index) => (
          <div key={index} className="relative">
            <div className="bg-white rounded-lg p-6 shadow-lg h-full">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                {paso.numero}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{paso.titulo}</h3>
              <p className="text-gray-600 text-sm">{paso.descripcion}</p>
            </div>
            {index < 4 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
              Planes Diseñados para tu Etapa de Crecimiento
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Plan Marca Digital */}
              <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-purple-200 relative">
                <div className="absolute -top-3 left-6 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Popular
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-4">
                  Marca Digital
                </h3>
                <p className="text-gray-600 mb-6">
                  Ideal para: <span className="font-semibold">Negocios que necesitan presencia profesional online</span>
                </p>
                
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Entregables:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Identidad de marca completa</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Estrategia de contenido inicial</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Presencia en redes sociales</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Material de marketing básico</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900">
                    Desde $800
                  </div>
                  <p className="text-gray-600 text-sm">Pago único</p>
                </div>
                
                <Link href={LINKS.calendly} className="block w-full bg-purple-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                  Agendar Diagnóstico
                </Link>
              </div>
              
              {/* Plan Crecimiento Acelerado */}
              <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-purple-600 relative">
                <div className="absolute -top-3 left-6 bg-purple-900 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Recomendado
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-4">
                  Crecimiento Acelerado
                </h3>
                <p className="text-gray-600 mb-6">
                  Ideal para: <span className="font-semibold">Empresas listas para dominar su mercado</span>
                </p>
                
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-4">Entregables:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Todo del plan anterior</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Campañas publicitarias avanzadas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Automatización de marketing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Análisis y optimización continua</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900">
                    Desde $1,500
                  </div>
                  <p className="text-gray-600 text-sm">+ Suscripción Mensual</p>
                </div>
                
                <Link href={LINKS.calendly} className="block w-full bg-purple-900 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-purple-800 transition-colors">
                  Agendar Diagnóstico
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 6: CTA Final - Tema Oscuro */}
      <section className="bg-purple-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para que tu Marca Brille?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Deja que la IA potencie tu marketing mientras tú te enfocas en hacer crecer tu negocio.
            </p>
            <Link href={LINKS.calendly} className="inline-flex items-center bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Comenzar Ahora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}