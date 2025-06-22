export default function DiagnosticSection() {
  return (
    <section id="diagnostico" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestro Diagnóstico 3D: Encontramos tu "Coordenada" de Crecimiento
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Todo negocio tiene 3 ejes fundamentales: Finanzas, Operaciones y Marketing. 
            Pero no siempre crecen al mismo ritmo. Nuestro primer paso es identificar 
            tu posición única en este espacio tridimensional para aplicar la estrategia correcta.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Eje X: FINANZAS */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Eje X: FINANZAS</h3>
            <h4 className="text-lg font-medium mb-3 text-blue-600">Control Total de tus Números</h4>
            <p className="text-gray-600">
              Te entregamos un dashboard a medida para que visualices tu rentabilidad, 
              controles tus costos y tomes decisiones inteligentes.
            </p>
          </div>

          {/* Eje Y: OPERACIONES */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Eje Y: OPERACIONES</h3>
            <h4 className="text-lg font-medium mb-3 text-green-600">Automatiza y Libera tu Tiempo</h4>
            <p className="text-gray-600">
              Implementamos agentes de IA que gestionan tareas repetitivas para que 
              tú te dediques a hacer crecer tu negocio.
            </p>
          </div>

          {/* Eje Z: MARKETING */}
          <div className="bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Eje Z: MARKETING</h3>
            <h4 className="text-lg font-medium mb-3 text-purple-600">Crea tu Marca, Atrae Clientes</h4>
            <p className="text-gray-600">
              Usamos IA para ayudarte a diseñar tu marca, crear contenido y lanzar 
              campañas que conecten con tu público.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}