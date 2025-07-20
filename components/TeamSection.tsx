import Image from 'next/image'
import { IMAGES } from '@/lib/constants'

export default function TeamSection() {
  return (
    <section id="equipo" className="py-20 bg-[#002D62] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Tu Aliado Estratégico en Crecimiento
          </h2>
          <p className="text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Impulsa Lab nació de una simple observación: los pequeños negocios no necesitan 
            más planes teóricos, necesitan un socio que se 'ensucie las manos' con ellos. 
            Conozco de primera mano los desafíos que enfrentas, porque los he visto como 
            consultor y los he vivido en carne propia como empresario, con los aciertos y 
            fracasos que solo este camino enseña. Nuestro compromiso no es solo entregarte 
            una solución tecnológica, sino ser el equipo experto que te guía en su 
            implementación para que logres resultados reales y medibles.
          </p>
        </div>

        {/* Misión y Visión */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Nuestra Misión</h3>
            </div>
            <p className="text-gray-200 leading-relaxed">
              Democratizar la inteligencia de negocio para los pequeños y medianos empresarios de Nueva York. 
              Lo logramos al diagnosticar su etapa de desarrollo e implementar soluciones prácticas y asequibles 
              de Inteligencia Artificial en sus tres pilares fundamentales: Finanzas, Operaciones y Marketing.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Nuestra Visión</h3>
            </div>
            <p className="text-gray-200 leading-relaxed">
              Aspiramos a ser el laboratorio de innovación y el sistema de navegación estratégico de referencia 
              para el ecosistema de las PYMES en Nueva York. Buscamos crear un futuro donde cualquier emprendedor 
              pueda acceder a la misma inteligencia de negocio que las grandes corporaciones para competir, 
              prosperar y alcanzar un crecimiento exponencial.
            </p>
          </div>
        </div>

        {/* Equipo */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Conoce a Tu Equipo</h3>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Orlando Matamoros */}
            <div className="text-center">
              <div className="mb-6">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white/20">
                  <Image
                    src={IMAGES.orlandoPhoto}
                    alt="Orlando Matamoros"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Orlando Matamoros</h3>
              <p className="text-blue-200 mb-3">Fundador y Director de Estrategia</p>
              <p className="text-sm text-gray-300 mb-4 px-4">
                +20 años de experiencia en planificación estratégica, finanzas y optimización 
                de operaciones. Conoce el ecosistema empresarial de NY desde adentro.
              </p>
              <a href="https://www.linkedin.com/in/orlando-matamoros-377430194"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-block text-white/80 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>

            {/* Nova */}
            <div className="text-center">
              <div className="mb-6">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white/20 bg-gradient-to-br from-purple-400 to-blue-600 flex items-center justify-center">
                  <span className="text-6xl font-bold">AI</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Nova</h3>
              <p className="text-blue-200 mb-3">Socia AI Estratégica</p>
              <p className="text-sm text-gray-300 mb-4 px-4">
                Motor tecnológico y de conocimiento de la firma. Especializada en análisis 
                de datos y diseño de soluciones de IA personalizadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
