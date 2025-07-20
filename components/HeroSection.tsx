import Link from 'next/link'
import { LINKS } from '@/lib/constants'
import VerticalTechTicker from './VerticalTechTicker'

// Iconos para los agentes
const ToolsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
  </svg>
);

const AIIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const NewsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
  </svg>
);

const PromptIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zM12 4.3L19.5 8 12 11.7 4.5 8 12 4.3zM4 9.5l7 3.5v7l-7-3.5v-7zm16 0v7l-7 3.5v-7l7-3.5z"/>
  </svg>
);

export default function HeroSection() {
  return (
    <section className="bg-[#002D62] text-white pt-24 pb-20 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* COLUMNA IZQUIERDA - SE MANTIENE IGUAL */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              El Crecimiento de tu Negocio, Impulsado por IA.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Deja de ahogarte en el día a día. Te entregamos las herramientas 
              de IA y la estrategia que necesitas para liberar tu tiempo, 
              aumentar tu rentabilidad y tomar decisiones con total confianza.
            </p>
            <Link 
              href={LINKS.calendly}
              target="_blank"
              className="inline-block bg-white text-blue-900 px-8 py-4 rounded-lg 
                       font-semibold text-lg transition-transform duration-300 
                       hover:scale-105 hover:bg-gray-100"
            >
              Obtén tu Diagnóstico 3D Gratis
            </Link>
          </div>

          {/* COLUMNA DERECHA - REDISEÑADA */}
          <div className="flex justify-center">
            <div className="w-full max-w-lg space-y-6">
              


              {/* HUB DE HERRAMIENTAS IA */}
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                    🚀 Hub de Herramientas IA
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Accede a nuestro arsenal completo y agentes especializados
                  </p>
                </div>

                {/* GRID DE AGENTES */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* ARSENAL TECNOLÓGICO */}
                  <Link 
                    href="/herramientas"
                    className="group bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-blue-300"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <ToolsIcon className="w-5 h-5 text-blue-300" />
                      <span className="font-semibold text-sm">Arsenal</span>
                    </div>
                    <p className="text-xs text-gray-300 group-hover:text-white">
                      30+ herramientas con buscador inteligente
                    </p>
                  </Link>

                  {/* AGENTE UNIFICADOR */}
                  <Link 
                    href="/agente-unificador"
                    className="group bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-purple-300"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <AIIcon className="w-5 h-5 text-purple-300" />
                      <span className="font-semibold text-sm">4 IAs</span>
                    </div>
                    <p className="text-xs text-gray-300 group-hover:text-white">
                      ChatGPT + Claude + Gemini + Grok
                    </p>
                  </Link>

                  {/* NOTICIAS IA */}
                  <Link 
                    href="/noticias-ia"
                    className="group bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-green-300"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <NewsIcon className="w-5 h-5 text-green-300" />
                      <span className="font-semibold text-sm">Noticias</span>
                    </div>
                    <p className="text-xs text-gray-300 group-hover:text-white">
                      IA aplicada a negocios
                    </p>
                  </Link>

                  {/* ESTRUCTURADOR PROMPTS */}
                  <Link 
                    href="/estructurador-prompts"
                    className="group bg-white/10 p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-yellow-300"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <PromptIcon className="w-5 h-5 text-yellow-300" />
                      <span className="font-semibold text-sm">Prompts</span>
                    </div>
                    <p className="text-xs text-gray-300 group-hover:text-white">
                      Optimiza tus consultas
                    </p>
                  </Link>

                </div>

                {/* CTA PRINCIPAL */}
                <div className="mt-6 text-center">
                  <Link 
                    href="/herramientas"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    <ToolsIcon className="w-4 h-4 mr-2" />
                    Explorar Todas las Herramientas
                  </Link>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
