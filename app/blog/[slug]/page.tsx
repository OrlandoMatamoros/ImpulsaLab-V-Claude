import Link from 'next/link';
import { FaArrowLeft, FaPencilAlt, FaBell, FaRocket } from 'react-icons/fa';

export default function BlogPostEnDesarrollo({ params }: { params: { slug: string } }) {
  // Convertir el slug en un título más legible
  const tituloTemporal = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Inicio
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/blog" className="text-gray-500 hover:text-gray-700">
              Blog
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">Próximamente</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
          >
            <FaArrowLeft />
            Volver al Blog
          </Link>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            {/* Icon */}
            <div className="mb-8 relative inline-block">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto flex items-center justify-center">
                <FaPencilAlt className="text-white text-5xl" />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <FaBell className="text-white text-xl" />
              </div>
            </div>

            {/* Message */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¡Este Artículo Está en Camino!
            </h1>
            
            <div className="text-lg text-gray-600 mb-6">
              <p className="mb-2">Estamos trabajando en:</p>
              <p className="text-2xl font-semibold text-blue-600">"{tituloTemporal}"</p>
            </div>

            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Nuestro equipo de expertos está preparando contenido valioso sobre este tema. 
              Mientras tanto, te invitamos a explorar otros recursos que pueden ayudarte 
              a transformar tu negocio con IA.
            </p>

            {/* Alternative actions */}
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Mientras esperas, puedes:
              </h2>
              <div className="grid md:grid-cols-3 gap-4 text-left">
                <Link href="/casos-de-exito" className="group">
                  <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      Casos de Éxito
                    </h3>
                    <p className="text-sm text-gray-600">
                      Descubre cómo otras empresas se transformaron
                    </p>
                  </div>
                </Link>
                
                <Link href="/herramientas" className="group">
                  <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      Herramientas IA
                    </h3>
                    <p className="text-sm text-gray-600">
                      Explora nuestro arsenal tecnológico
                    </p>
                  </div>
                </Link>
                
                <Link href="/diagnostico" className="group">
                  <div className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      Diagnóstico 3D
                    </h3>
                    <p className="text-sm text-gray-600">
                      Evalúa el potencial de tu negocio
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Newsletter signup */}
            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                🔔 Sé el primero en leer este artículo
              </h3>
              <p className="text-gray-600 mb-4">
                Suscríbete y te notificaremos cuando esté disponible
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Notificarme
                </button>
              </form>
            </div>

            {/* CTA buttons */}
            <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                <FaArrowLeft />
                Ver Otros Artículos
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                Hablar con un Experto
                <FaRocket />
              </Link>
            </div>
          </div>

          {/* Fun fact */}
          <p className="text-center mt-8 text-gray-500 text-sm">
            💡 Dato curioso: Publicamos nuevo contenido cada semana para ayudarte a 
            dominar la IA en tu negocio
          </p>
        </div>
      </div>
    </div>
  );
}

// Metadata genérica
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const titulo = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${titulo} - Próximamente | Blog Impulsa Lab`,
    description: 'Este artículo estará disponible pronto. Suscríbete para ser el primero en leerlo.',
  };
}