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
            <p className="text-blue-200">Fundador y Estratega Principal</p>
            <a href="https://linkedin.com/in/orlando-matamoros" 
               target="_blank"
               rel="noopener noreferrer"
               className="inline-block mt-4 text-white/80 hover:text-white transition-colors">
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
            <p className="text-blue-200">Socia AI Estratégica</p>
          </div>
        </div>
      </div>
    </section>
  )
}