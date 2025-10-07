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
  Video,
  FileText,
  Mail,
  Award,
  Calendar,
  MessageSquare,
  Zap,
  Brain,
  TrendingUp,
  Shield,
  Users
} from 'lucide-react'

export default function MentoriaPersonalizadaPage() {
  const [selectedModule, setSelectedModule] = useState(0)

  const modules = [
    {
      title: 'Automatización con IA',
      duration: '4 horas',
      topics: [
        'Identificación de procesos automatizables',
        'Herramientas de IA para tu industria',
        'Implementación práctica paso a paso',
        'ChatGPT, Claude y otras herramientas'
      ]
    },
    {
      title: 'Transformación Digital',
      duration: '4 horas',
      topics: [
        'Diagnóstico digital de tu negocio',
        'Roadmap de transformación',
        'Herramientas esenciales',
        'Casos de éxito en tu sector'
      ]
    },
    {
      title: 'Estrategia de Productos Digitales',
      duration: '4 horas',
      topics: [
        'Validación de ideas digitales',
        'MVP y prototipado rápido',
        'Estrategia de monetización',
        'Plan de lanzamiento'
      ]
    },
    {
      title: 'Optimización Operacional',
      duration: '4 horas',
      topics: [
        'Análisis de cuellos de botella',
        'Automatización de workflows',
        'Stack tecnológico recomendado',
        'KPIs y métricas de éxito'
      ]
    },
    {
      title: 'Data-Driven Decisions',
      duration: '4 horas',
      topics: [
        'Dashboards financieros en tiempo real',
        'Google Sheets + Zapier/Make',
        'Análisis predictivo básico',
        'Toma de decisiones con datos'
      ]
    }
  ]

  const testimonials = [
    {
      name: 'María González',
      business: 'Café Andino',
      image: '👩‍💼',
      text: 'En 4 horas aprendí a automatizar mi inventario. Ahora ahorro 10 horas semanales.',
      result: '10h/semana ahorradas'
    },
    {
      name: 'Carlos Ramírez',
      business: 'Tech Solutions',
      image: '👨‍💻',
      text: 'La mentoría me ayudó a estructurar mi producto digital. Lancé en 3 semanas.',
      result: 'Lanzamiento en 3 semanas'
    },
    {
      name: 'Ana Martínez',
      business: 'Belleza Natural',
      image: '👩‍🦱',
      text: 'Implementamos ChatGPT para atención al cliente. Incrementamos ventas 40%.',
      result: '+40% en ventas'
    }
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Consulta Inicial',
      description: 'Conversación de 15 min para entender tus necesidades',
      icon: MessageSquare
    },
    {
      step: '02',
      title: 'Preparación',
      description: 'Enviamos cuestionario pre-sesión para maximizar el tiempo',
      icon: FileText
    },
    {
      step: '03',
      title: 'Sesión Intensiva',
      description: '4 horas de mentoría práctica, grabada para tu revisión',
      icon: Video
    },
    {
      step: '04',
      title: 'Plan de Acción',
      description: 'Recibes roadmap detallado y recursos exclusivos',
      icon: Target
    },
    {
      step: '05',
      title: 'Soporte',
      description: '30 días de seguimiento por email para dudas',
      icon: Mail
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
              className="inline-flex items-center gap-2 text-emerald-200 hover:text-white mb-8 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
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
              4 horas intensivas con un experto dedicado exclusivamente a tu proyecto.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-6 bg-white/10 backdrop-blur rounded-2xl p-6 mb-8">
              <div>
                <div className="flex items-center gap-2 text-emerald-200 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-medium">Duración</span>
                </div>
                <div className="text-3xl font-bold">4 horas</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-emerald-200 mb-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm font-medium">Formato</span>
                </div>
                <div className="text-3xl font-bold">1-a-1</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-emerald-200 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm font-medium">Inversión</span>
                </div>
                <div className="text-3xl font-bold">$300</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/#contacto"
                className="px-8 py-4 bg-white text-emerald-900 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Agendar mi Mentoría
              </Link>
              <a 
                href="https://wa.me/1234567890"
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

      {/* Lo que incluye */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Todo lo que incluye
              </h2>
              <p className="text-xl text-gray-600">
                Inversión completa sin sorpresas
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Brain,
                  title: 'Diagnóstico Personalizado',
                  description: 'Análisis profundo de tu proyecto, negocio o idea para identificar oportunidades y prioridades.',
                  color: 'emerald'
                },
                {
                  icon: Target,
                  title: 'Plan de Acción a Medida',
                  description: 'Roadmap específico con pasos claros, herramientas recomendadas y timeline realista.',
                  color: 'teal'
                },
                {
                  icon: Zap,
                  title: 'Herramientas Exclusivas',
                  description: 'Acceso a plantillas, prompts, workflows y recursos que usamos internamente.',
                  color: 'blue'
                },
                {
                  icon: Video,
                  title: 'Sesión Grabada',
                  description: 'Grabación completa de las 4 horas para que puedas revisar cuando quieras.',
                  color: 'purple'
                },
                {
                  icon: Mail,
                  title: '30 Días de Soporte',
                  description: 'Seguimiento por email para resolver dudas durante la implementación.',
                  color: 'pink'
                },
                {
                  icon: Award,
                  title: 'Certificado',
                  description: 'Certificado de participación para acreditar tu capacitación.',
                  color: 'orange'
                }
              ].map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border-2 border-gray-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300">
                  <div className={`inline-flex p-3 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-xl mb-4`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Temáticas Disponibles */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Elige tu temática
              </h2>
              <p className="text-xl text-gray-600">
                Sesión 100% enfocada en lo que necesitas
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Lista de módulos */}
              <div className="lg:col-span-1 space-y-3">
                {modules.map((module, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedModule(i)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      selectedModule === i
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 hover:bg-emerald-50 border-2 border-gray-100'
                    }`}
                  >
                    <div className="font-bold mb-1">{module.title}</div>
                    <div className={`text-sm ${selectedModule === i ? 'text-emerald-100' : 'text-gray-500'}`}>
                      {module.duration}
                    </div>
                  </button>
                ))}
              </div>

              {/* Detalle del módulo seleccionado */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-xl border-2 border-emerald-100">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">
                  {modules[selectedModule].title}
                </h3>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                    <Clock className="w-4 h-4" />
                    {modules[selectedModule].duration}
                  </div>
                </div>
                <h4 className="font-bold text-lg mb-4 text-slate-900">
                  Lo que cubriremos:
                </h4>
                <ul className="space-y-4">
                  {modules[selectedModule].topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-lg">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                ¿Cómo funciona?
              </h2>
              <p className="text-xl text-gray-600">
                Proceso simple, resultados extraordinarios
              </p>
            </div>

            <div className="space-y-6">
              {processSteps.map((step, i) => (
                <div key={i} className="flex gap-6 items-start bg-gradient-to-r from-slate-50 to-white p-6 rounded-2xl border-2 border-gray-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <step.icon className="w-6 h-6 text-emerald-600" />
                      <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 text-lg">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Casos de éxito
              </h2>
              <p className="text-xl text-gray-600">
                Lo que dicen quienes ya transformaron sus negocios
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300">
                  <div className="text-6xl mb-4">{testimonial.image}</div>
                  <div className="mb-4">
                    <div className="font-bold text-lg text-slate-900">{testimonial.name}</div>
                    <div className="text-emerald-600 text-sm font-medium">{testimonial.business}</div>
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div className="inline-flex bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {testimonial.result}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900 rounded-3xl p-12 text-center shadow-2xl text-white">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-emerald-300" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tu transformación empieza aquí
            </h2>
            <p className="text-xl text-emerald-100 mb-4">
              <span className="font-bold text-white text-3xl">$300 USD</span> • 4 horas intensivas
            </p>
            <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
              Una inversión que recuperarás en semanas al automatizar procesos y optimizar tu operación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#contacto"
                className="px-8 py-4 bg-white text-emerald-900 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Reservar mi Mentoría
              </Link>
              <Link 
                href="/capacitacion"
                className="px-8 py-4 bg-emerald-800/50 backdrop-blur text-white rounded-xl font-semibold text-lg border-2 border-white/20 hover:bg-emerald-800 transition-all duration-300"
              >
                Ver otros programas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
