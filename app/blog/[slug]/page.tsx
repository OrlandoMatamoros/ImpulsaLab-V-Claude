import Link from 'next/link';
import { FaArrowLeft, FaPencilAlt, FaBell, FaRocket } from 'react-icons/fa';

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostEnDesarrollo({ params }: PageProps) {
  const { slug } = await params;
  
  // Convertir el slug en un título más legible
  const titulo = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header simple */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Volver al Blog
          </Link>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex items-center justify-center py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          {/* Icono principal */}
          <div className="mb-8 flex justify-center">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-full shadow-2xl">
              <FaPencilAlt className="text-6xl text-white animate-pulse" />
            </div>
          </div>

          {/* Mensaje principal */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Artículo en Desarrollo
          </h1>
          
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 inline-block">
            <p className="text-lg text-gray-600">
              <span className="font-semibold">{titulo}</span>
            </p>
          </div>

          <p className="text-xl text-gray-600 mb-8">
            Estamos trabajando en este contenido para brindarte información valiosa 
            sobre inteligencia artificial y transformación digital.
          </p>

          {/* Features próximas */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <FaRocket className="text-3xl text-blue-500 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Contenido Premium</h3>
              <p className="text-sm text-gray-600">
                Casos reales y estrategias probadas
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <FaPencilAlt className="text-3xl text-purple-500 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Guías Prácticas</h3>
              <p className="text-sm text-gray-600">
                Paso a paso para implementar IA
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <FaBell className="text-3xl text-green-500 mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Actualizaciones</h3>
              <p className="text-sm text-gray-600">
                Las últimas tendencias del sector
              </p>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-8">
            <h2 className="text-2xl font-bold mb-4">
              ¿Quieres ser el primero en leer este artículo?
            </h2>
            <p className="mb-6">
              Suscríbete y te notificaremos cuando esté disponible
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Notificarme
              </button>
            </div>
          </div>

          {/* CTAs alternativos */}
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">Mientras tanto, te invitamos a:</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/blog" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaArrowLeft className="mr-2" />
                Explorar otros artículos
              </Link>
              
              <Link 
                href="/diagnostico" 
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Hacer diagnóstico gratuito
                <FaRocket className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}