'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  UserCheck, 
  Clock, 
  DollarSign, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  Brain,
  Zap,
  Calendar,
  MessageSquare,
  MapPin,
  Award,
  FileText,
  Video,
  Mail,
  Settings,
  Code,
  TrendingUp,
  Lightbulb,
  Shield
} from 'lucide-react'

export default function MentoriaPersonalizadaPage() {
  const [selectedTier, setSelectedTier] = useState<'basic' | 'standard' | 'premium'>('standard')

  const tiers = {
    basic: {
      name: 'BASIC',
      subtitle: 'AI Foundations',
      price: 200,
      duration: '2 horas',
      color: 'emerald',
      description: 'Introducción completa al mundo de la IA',
      ideal: 'Emprendedores, gerentes y profesionales curiosos sobre IA',
      modules: [
        {
          title: 'Fundamentos de IA Generativa',
          time: '60 min',
          topics: [
            'Historia y evolución de la IA',
            '¿Qué son los LLMs? (Large Language Models)',
            'Conceptos: Tokens, contexto, temperatura',
            'Redes neuronales explicadas (simple)',
            'Fine-tuning vs Prompt Engineering',
            'Limitaciones y capacidades reales'
          ]
        },
        {
          title: 'Plataformas y Herramientas',
          time: '60 min',
          topics: [
            'ChatGPT: Versiones (3.5, 4, 4o, o1), GPTs, plugins',
            'Claude: Modelos (Sonnet 4, Opus), Projects',
            'Gemini: Integración Google, AI Studio',
            'Comparación: ¿Cuándo usar cada una?',
            'Herramientas complementarias (MidJourney, ElevenLabs)',
            'Perplexity para research'
          ]
        }
      ],
      deliverables: [
        'Guía de plataformas AI (PDF)',
        'Comparativa detallada de modelos',
        '20 prompts starter por industria',
        'Glosario de términos AI'
      ]
    },
    standard: {
      name: 'STANDARD',
      subtitle: 'AI en Acción',
      price: 349,
      duration: '4 horas',
      color: 'blue',
      description: 'De teoría a práctica. Herramientas listas para usar.',
      ideal: 'Negocios que quieren implementar IA HOY',
      modules: [
        {
          title: 'Todo lo de BASIC +',
          time: '2h',
          topics: ['Fundamentos completos', 'Plataformas y comparativa']
        },
        {
          title: 'Prompt Engineering Avanzado',
          time: '60 min',
          topics: [
            'Estructura de prompts efectivos',
            'Chain-of-thought prompting',
            'Few-shot learning práctico',
            'Roles y contexto optimizado',
            'Casos por área: Finanzas, Ops, Marketing'
          ]
        },
        {
          title: 'Setup Estratégico de IA',
          time: '60 min',
          topics: [
            'GPTs personalizados (ChatGPT): configuración completa',
            'Claude Projects setup con tus documentos',
            'Gemini AI Studio: prompts guardados',
            'Integraciones básicas'
          ]
        }
      ],
      deliverables: [
        'Todo lo de BASIC',
        '3 GPTs configurados (ChatGPT + Claude + Gemini)',
        '50+ prompts específicos para tu industria',
        'Blueprint de automatización simple (diagrama)',
        '30 días de soporte por email'
      ]
    },
    premium: {
      name: 'PREMIUM',
      subtitle: 'AI Estratégico',
      price: 899,
      duration: '6 horas',
      color: 'amber',
      description: 'Transformación completa. Blueprint + implementación.',
      ideal: 'Líderes que quieren transformar su operación',
      modules: [
        {
          title: 'Todo lo de STANDARD +',
          time: '4h',
          topics: ['Fundamentos + plataformas', 'Prompt engineering', 'Setup estratégico']
        },
        {
          title: 'Caso de Uso Estratégico',
          time: '90 min',
          topics: [
            'Análisis profundo de UN proceso clave',
            'Diseño de solución con IA paso a paso',
            'Inputs, outputs y herramientas necesarias',
            'Integraciones requeridas',
            'Timeline de implementación realista',
            'Blueprint detallado (documento completo)'
          ]
        },
        {
          title: 'Demo + Roadmap de Adopción',
          time: '90 min',
          topics: [
            'Demo en vivo de automatización (con mis APIs)',
            'Replica en ambiente sandbox',
            'Plan de adopción AI 90 días',
            'Quick wins (semana 1-2)',
            'Change management para el equipo'
          ]
        }
      ],
      deliverables: [
        'Todo lo de STANDARD',
        '1 automatización simple configurada (sin APIs complejas)',
        'Roadmap personalizado 90 días',
        '60 días de soporte prioritario',
        'Sesión de seguimiento (1h) a los 30 días',
        'Toolkit premium (templates, workflows, prompts avanzados)'
      ]
    }
  }

  const currentTier = tiers[selectedTier]

  const testimonials = [
    {
      name: 'María González',
      business: 'Café Andino, Brooklyn',
      image: '👩‍💼',
      tier: 'Standard',
      text: 'En 4 horas configuramos ChatGPT para mi inventario. Ahora genero reportes en 5 minutos.',
      result: '10h/semana ahorradas',
      savings: '$800/mes en tiempo'
    },
    {
      name: 'Carlos Ramírez',
      business: 'Tech Solutions, Manhattan',
      image: '👨‍💻',
      tier: 'Premium',
      text: 'El blueprint nos dio claridad total. Implementamos IA en 3 departamentos en 60 días.',
      result: '3 áreas automatizadas',
      savings: '40% más eficiente'
    },
    {
      name: 'Ana Martínez',
      business: 'Beauty Studio, Queens',
      image: '👩‍🦱',
      tier: 'Basic',
      text: 'Necesitaba entender qué era posible con IA. Ahora uso Claude diariamente para marketing.',
      result: 'Contenido 5x más rápido',
      savings: '$600/mes en freelancers'
    }
  ]

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <Link 
              href="/capacitacion"
              className="inline-flex items-center gap-2 text-emerald-200 hover:text-white mb-8 transition-colors group"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Volver a Impulsa Academy
            </Link>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <UserCheck className="w-4 h-4" />
              Mentoría Individual
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Mentoría 1-a-1
            </h1>

            <p className="text-2xl text-emerald-100 mb-8 leading-relaxed">
              Atención personalizada para transformar tu visión en realidad. 
              De 2 a 6 horas intensivas con un experto dedicado exclusivamente a tu proyecto.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 bg-white/10 backdrop-blur rounded-2xl p-6 mb-8">
              <div>
                <div className="flex items-center gap-2 text-emerald-200 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-medium">Duración</span>
                </div>
                <div className="text-3xl font-bold">2-6h</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-emerald-200 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium">Formato</span>
                </div>
                <div className="text-2xl font-bold">Presencial</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-emerald-200 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm font-medium">Desde</span>
                </div>
                <div className="text-3xl font-bold">$200</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/#contacto"
                className="px-8 py-4 bg-white text-emerald-900 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-white/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Agendar mi Mentoría
              </Link>
              <a 
                href="https://wa.me/19295007815"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-emerald-800/50 backdrop-blur text-white rounded-xl font-semibold text-lg border-2 border-white/20 hover:bg-emerald-800 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Selector de Tiers */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Elige tu nivel
              </h2>
              <p className="text-xl text-gray-600">
                3 opciones diseñadas para diferentes etapas
              </p>
            </div>

            {/* Tier Tabs */}
            <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
              {(['basic', 'standard', 'premium'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`flex-1 p-6 rounded-2xl border-4 transition-all duration-300 ${
                    selectedTier === tier
                      ? tier === 'basic' 
                        ? 'border-emerald-500 bg-emerald-50 scale-105 shadow-xl'
                        : tier === 'standard'
                        ? 'border-blue-500 bg-blue-50 scale-105 shadow-xl'
                        : 'border-amber-500 bg-amber-50 scale-105 shadow-xl'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-bold text-lg text-slate-900 mb-1">
                      {tiers[tier].name}
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      {tiers[tier].subtitle}
                    </div>
                    <div className="text-4xl font-bold text-slate-900 mb-1">
                      ${tiers[tier].price}
                    </div>
                    <div className="text-sm text-gray-600">
                      {tiers[tier].duration}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Tier Content */}
            <div className={`bg-gradient-to-br ${
              selectedTier === 'basic' ? 'from-emerald-50 to-teal-50' :
              selectedTier === 'standard' ? 'from-blue-50 to-indigo-50' :
              'from-amber-50 to-orange-50'
            } rounded-3xl p-8 md:p-12 shadow-2xl border-4 ${
              selectedTier === 'basic' ? 'border-emerald-200' :
              selectedTier === 'standard' ? 'border-blue-200' :
              'border-amber-200'
            }`}>
              {/* Header */}
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-slate-900 mb-4">
                  {currentTier.name} - {currentTier.subtitle}
                </h3>
                <p className="text-xl text-gray-700 mb-6">
                  {currentTier.description}
                </p>
                <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <span className="text-gray-700">
                    <span className="font-semibold">Ideal para:</span> {currentTier.ideal}
                  </span>
                </div>
              </div>

              {/* Modules */}
              <div className="mb-12">
                <h4 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Brain className="w-7 h-7 text-emerald-600" />
                  Contenido de la sesión
                </h4>
                <div className="space-y-6">
                  {currentTier.modules.map((module, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <h5 className="text-xl font-bold text-slate-900">{module.title}</h5>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                          {module.time}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {module.topics.map((topic, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div className="mb-12">
                <h4 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Award className="w-7 h-7 text-emerald-600" />
                  Lo que recibes
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {currentTier.deliverables.map((item, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 shadow-lg border-2 border-gray-100 flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Comparison */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Valor de mercado en NYC</div>
                  <div className="text-3xl font-bold text-gray-400 line-through mb-2">
                    ${currentTier.price * 2}+
                  </div>
                  <div className="text-sm text-emerald-600 font-semibold mb-4">
                    Ahorras más de ${currentTier.price}
                  </div>
                  <div className="text-5xl font-bold text-slate-900 mb-6">
                    ${currentTier.price}
                  </div>
                  <Link
                    href="/#contacto"
                    className={`inline-block px-12 py-4 bg-gradient-to-r ${
                      selectedTier === 'basic' ? 'from-emerald-600 to-teal-600' :
                      selectedTier === 'standard' ? 'from-blue-600 to-indigo-600' :
                      'from-amber-600 to-orange-600'
                    } text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}
                  >
                    Agendar {currentTier.name}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Comparación completa
              </h2>
              <p className="text-xl text-gray-600">
                Encuentra el tier perfecto para tu momento
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 text-left font-bold">Característica</th>
                    <th className="p-4 text-center font-bold">BASIC<br/><span className="text-emerald-400">$200</span></th>
                    <th className="p-4 text-center font-bold bg-blue-800">STANDARD<br/><span className="text-blue-200">$349</span></th>
                    <th className="p-4 text-center font-bold">PREMIUM<br/><span className="text-amber-400">$899</span></th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { feature: 'Duración', basic: '2 horas', standard: '4 horas', premium: '6 horas' },
                    { feature: 'Fundamentos IA', basic: '✓', standard: '✓', premium: '✓' },
                    { feature: 'Plataformas (ChatGPT, Claude, Gemini)', basic: '✓', standard: '✓', premium: '✓' },
                    { feature: 'Prompt Engineering', basic: '—', standard: '✓', premium: '✓' },
                    { feature: 'GPTs configurados', basic: '—', standard: '3 GPTs', premium: '3 GPTs' },
                    { feature: 'Caso de uso estratégico', basic: '—', standard: '—', premium: '✓' },
                    { feature: 'Blueprint automatización', basic: '—', standard: 'Simple', premium: 'Detallado' },
                    { feature: 'Demo en vivo', basic: '—', standard: '—', premium: '✓' },
                    { feature: 'Automatización configurada', basic: '—', standard: '—', premium: '✓' },
                    { feature: 'Roadmap 90 días', basic: '—', standard: '—', premium: '✓' },
                    { feature: 'Soporte post-sesión', basic: '—', standard: '30 días', premium: '60 días' },
                    { feature: 'Seguimiento', basic: '—', standard: '—', premium: '1 sesión' },
                    { feature: 'Toolkit', basic: 'Básico', standard: 'Standard', premium: 'Premium' }
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-4 font-semibold text-gray-900 border">{row.feature}</td>
                      <td className="p-4 text-center border">{row.basic}</td>
                      <td className="p-4 text-center border bg-blue-50 font-semibold">{row.standard}</td>
                      <td className="p-4 text-center border">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Casos de éxito reales
              </h2>
              <p className="text-xl text-gray-600">
                Lo que lograron otros emprendedores en NYC
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300">
                  <div className="text-6xl mb-4">{testimonial.image}</div>
                  <div className="mb-4">
                    <div className="font-bold text-lg text-slate-900">{testimonial.name}</div>
                    <div className="text-emerald-600 text-sm font-medium mb-2">{testimonial.business}</div>
                    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                      Tier: {testimonial.tier}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 italic leading-relaxed">"{testimonial.text}"</p>
                  <div className="space-y-2">
                    <div className="inline-flex bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      {testimonial.result}
                    </div>
                    <div className="text-sm text-gray-600 font-semibold">
                      💰 {testimonial.savings}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Sparkles className="w-20 h-20 mx-auto mb-6 text-emerald-300" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tu transformación con IA empieza aquí
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Desde <span className="font-bold text-white text-3xl">$200</span> puedes aprender los fundamentos.
              Desde <span className="font-bold text-white text-3xl">$349</span> implementas herramientas reales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#contacto"
                className="px-10 py-5 bg-white text-emerald-900 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-6 h-6" />
                Agendar Mentoría Ahora
              </Link>
              <Link 
                href="/capacitacion"
                className="px-10 py-5 bg-emerald-800/50 backdrop-blur text-white rounded-xl font-bold text-lg border-2 border-white/30 hover:bg-emerald-800 transition-all duration-300"
              >
                Ver Impulsa Teams
              </Link>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-emerald-200 text-sm mb-4">
                📍 Todas las sesiones son presenciales en tu locación (NYC)
              </p>
              <p className="text-emerald-200 text-sm">
                ¿Prefieres remoto? Disponible con 15% descuento
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
