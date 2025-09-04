'use client'

import { useState, useEffect } from 'react'
import { Bot, Sparkles, Brain, Zap, ArrowRight, Clock, TrendingUp } from 'lucide-react'
import ContentStrategistChat from '@/components/services/marketing/ContentStrategistChat'
import OperationsEnhancedSection from '@/components/operations/OperationsEnhancedSection'

type AgentType = 'content' | 'unified' | 'prompt' | 'news'

interface AgentUsage {
  [key: string]: {
    count: number
    lastReset: string
  }
}

const DAILY_LIMIT = 3

export default function AgentesPlayground() {
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null)
  const [usage, setUsage] = useState<AgentUsage>({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('agent-usage')
    if (stored) {
      const parsed = JSON.parse(stored)
      const today = new Date().toDateString()
      const updated: AgentUsage = {}
      
      Object.keys(parsed).forEach(key => {
        if (parsed[key].lastReset !== today) {
          updated[key] = { count: 0, lastReset: today }
        } else {
          updated[key] = parsed[key]
        }
      })
      
      setUsage(updated)
      localStorage.setItem('agent-usage', JSON.stringify(updated))
    }
  }, [])

  const checkUsage = (agentType: AgentType): boolean => {
    const today = new Date().toDateString()
    const agentUsage = usage[agentType] || { count: 0, lastReset: today }
    
    if (agentUsage.lastReset !== today) {
      return true
    }
    
    return agentUsage.count < DAILY_LIMIT
  }

  const incrementUsage = (agentType: AgentType) => {
    const today = new Date().toDateString()
    const newUsage = { ...usage }
    
    if (!newUsage[agentType] || newUsage[agentType].lastReset !== today) {
      newUsage[agentType] = { count: 1, lastReset: today }
    } else {
      newUsage[agentType].count += 1
    }
    
    setUsage(newUsage)
    localStorage.setItem('agent-usage', JSON.stringify(newUsage))
  }

  const handleAgentClick = (agentType: AgentType) => {
    if (checkUsage(agentType)) {
      setSelectedAgent(agentType)
      setIsModalOpen(true)
      incrementUsage(agentType)
    } else {
      alert('Has alcanzado el límite diario. ¡Agenda tu Diagnóstico 3D para acceso ilimitado!')
    }
  }

  const agents = [
    {
      id: 'content' as AgentType,
      title: 'El Estratega de Contenidos',
      subtitle: 'Crea tu Plan de Marketing en 60 Segundos',
      description: '¿No sabes qué publicar? Responde 3 simples preguntas sobre tu negocio y este agente te diseñará un plan de contenidos multicanal (Instagram, Blog, Video) al instante.',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'purple',
      isEmbedded: true
    },
    {
      id: 'unified' as AgentType,
      title: 'El Agente Unificador',
      subtitle: 'Tres Cerebros, Una Respuesta Perfecta',
      description: 'Haz una pregunta de negocio compleja. Este agente consultará simultáneamente a Google (Gemini), Anthropic (Claude) y OpenAI (GPT), y luego usará un cuarto modelo avanzado para unificar las respuestas.',
      icon: <Brain className="w-6 h-6" />,
      color: 'blue',
      isEmbedded: true
    },
    {
      id: 'prompt' as AgentType,
      title: 'El Diseñador de Prompts',
      subtitle: 'Diseña Prompts como un Experto',
      description: 'Convierte tus ideas en instrucciones claras para la IA. Este agente te guía con preguntas para construir un prompt perfectamente estructurado y listo para usar.',
      icon: <Zap className="w-6 h-6" />,
      color: 'green',
      link: '/herramientas/prompt-designer'
    },
    {
      id: 'news' as AgentType,
      title: 'El Agente de Noticias',
      subtitle: 'Tu Resumen Diario de Noticias de IA',
      description: 'Mantente a la vanguardia. Este agente revisa nuestras alertas de Google y te presenta las noticias más relevantes sobre IA aplicada a negocios.',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'orange',
      link: '/herramientas/noticias'
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full filter blur-xl"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full filter blur-xl"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full filter blur-xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium">Playground Activo • Prueba Sin Registro</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Más Allá de un Chatbot:<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">
                Conoce a tu Futuro Equipo Digital
              </span>
            </h1>
            
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-12">
              Imagina tener un equipo de especialistas trabajando para ti 24/7. Un agente que diseña tu estrategia de marketing, 
              otro que califica a tus clientes potenciales, y uno que unifica la inteligencia de los mejores modelos del mundo. 
              Eso no es ciencia ficción. Bienvenido al <span className="font-bold text-white">"AI Agents Playground"</span> de Impulsa Lab. 
              <span className="block mt-2 text-lg">Pruébalos ahora.</span>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">4</div>
                <div className="text-purple-200 text-sm">Agentes Activos</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-purple-200 text-sm">Disponibilidad</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">3</div>
                <div className="text-purple-200 text-sm">Usos Diarios Gratis</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">$0</div>
                <div className="text-purple-200 text-sm">Sin Tarjeta</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Qué es un Agente de IA? */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tu Especialista Personal para Cada Tarea
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Un Cerebro con un Objetivo</h3>
              <p className="text-gray-600">
                Un Agente de IA es un programa diseñado para una misión específica. 
                Le das un objetivo (como "crear una estrategia de contenidos") y un conjunto de reglas, 
                y él se encarga del resto.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Conectado a tus Herramientas</h3>
              <p className="text-gray-600">
                Funciona conectándose a las herramientas que ya usas: tu calendario, tu email, tu CRM. 
                Actúa como el puente que las pone a trabajar juntas.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Aprende y Mejora</h3>
              <p className="text-gray-600">
                Los agentes más avanzados pueden aprender de sus interacciones para volverse más eficientes, 
                liberándote tiempo para que te enfoques en hacer crecer tu negocio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agents Playground */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pon a Prueba a Nuestro Equipo Digital
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Haz clic en cualquier agente para probarlo en vivo. Sin registro. Sin compromiso.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {agents.map((agent) => {
              const usageData = usage[agent.id] || { count: 0, lastReset: new Date().toDateString() }
              const remainingUses = DAILY_LIMIT - usageData.count
              const colorClasses = {
                purple: 'border-purple-500 bg-purple-50 hover:bg-purple-100',
                blue: 'border-blue-500 bg-blue-50 hover:bg-blue-100',
                green: 'border-green-500 bg-green-50 hover:bg-green-100',
                orange: 'border-orange-500 bg-orange-50 hover:bg-orange-100'
              }

              return agent.link ? (
                // Enlaces externos para Prompt Designer y Noticias
                <a
                  key={agent.id}
                  href={agent.link}
                  className={`block relative border-2 ${colorClasses[agent.color as keyof typeof colorClasses]} 
                             rounded-xl p-8 cursor-pointer transition-all duration-300 hover:shadow-xl 
                             hover:scale-[1.02] group no-underline`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{agent.title}</h3>
                      <p className="text-lg text-gray-700 font-medium">{agent.subtitle}</p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center 
                                   shadow-md group-hover:scale-110 transition-transform">
                      {agent.icon}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{agent.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Click para abrir</span>
                    <span className="flex items-center gap-2 text-gray-700 font-medium 
                                     group-hover:text-gray-900 transition-colors">
                      Probar Ahora
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </a>
              ) : (
                // Modales embebidos para Content y Unified
                <div
                  key={agent.id}
                  onClick={() => handleAgentClick(agent.id)}
                  className={`relative border-2 ${colorClasses[agent.color as keyof typeof colorClasses]} 
                             rounded-xl p-8 cursor-pointer transition-all duration-300 hover:shadow-xl 
                             hover:scale-[1.02] group`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{agent.title}</h3>
                      <p className="text-lg text-gray-700 font-medium">{agent.subtitle}</p>
                    </div>
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center 
                                   shadow-md group-hover:scale-110 transition-transform">
                      {agent.icon}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{agent.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(DAILY_LIMIT)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < remainingUses ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {remainingUses} usos restantes hoy
                      </span>
                    </div>
                    <span className="flex items-center gap-2 text-gray-700 font-medium 
                                     group-hover:text-gray-900 transition-colors">
                      Probar Ahora
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Modal para Agentes Embebidos */}
      {isModalOpen && selectedAgent && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
              onClick={() => setIsModalOpen(false)} 
            />
            
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="p-8 overflow-y-auto max-h-[90vh]">
                {selectedAgent === 'content' && <ContentStrategistChat />}
                {selectedAgent === 'unified' && <OperationsEnhancedSection />}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Impresionado? Esto es solo una demostración.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            El verdadero poder no está en usar un agente genérico, sino en construir un equipo de agentes 
            <span className="text-white font-bold"> personalizados</span> que trabajen para los procesos específicos de TU negocio. 
            En Impulsa Lab, no vendemos herramientas; diseñamos, construimos e implementamos tu futuro equipo digital.
          </p>
          
          <a
            href="https://calendly.com/orlando-tuimpulsalab/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-lg 
                     font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
          >
            Agenda tu Diagnóstico 3D y Diseñemos tu Estrategia de Automatización
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </main>
  )
}