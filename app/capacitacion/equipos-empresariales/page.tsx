'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Users, 
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
  Briefcase,
  Building2,
  Rocket,
  BarChart3,
  Lightbulb,
  Settings
} from 'lucide-react'

export default function EquiposEmpresarialesPage() {
  const [selectedModule, setSelectedModule] = useState(0)

  const modules = [
    {
      title: 'IA y Automatización para Equipos',
      duration: '6 horas',
      topics: [
        'Diagnóstico de procesos automatizables en equipo',
        'Implementación colaborativa de IA',
        'ChatGPT Teams, Claude Projects',
        'Workflows compartidos con Make/Zapier',
        'Casos de uso por departamento',
        'Plan de adopción de IA en la empresa'
      ]
    },
    {
      title: 'Metodologías Ágiles en Acción',
      duration: '6 horas',
      topics: [
        'Scrum y Kanban adaptados a tu negocio',
        'Sprints, dailies y retrospectivas',
        'Herramientas: Trello, Asana, Monday',
        'OKRs y KPIs para equipos',
        'Cultura de mejora continua',
        'Implementación práctica inmediata'
      ]
    },
    {
      title: 'Herramientas Colaborativas Avanzadas',
      duration: '6 horas',
      topics: [
        'Google Workspace avanzado',
        'Notion para knowledge management',
        'Slack/Teams optimizado',
        'Automatizaciones entre herramientas',
        'Seguridad y permisos',
        'Best practices de colaboración'
      ]
    },
    {
      title: 'Análisis de Datos para Decisiones',
      duration: '6 horas',
      topics: [
        'Dashboards en tiempo real (Looker, Tableau)',
        'Google Sheets avanzado + Apps Script',
        'Métricas clave por departamento',
        'Data storytelling',
        'Cultura data-driven',
        'Reportes automatizados'
      ]
    },
    {
      title: 'Innovación y Design Thinking',
      duration: '6 horas',
      topics: [
        'Framework de Design Thinking',
        'Brainstorming estructurado',
        'Validación rápida de ideas',
        'Prototipado colaborativo',
        'Testing con usuarios',
        'De la idea a la implementación'
      ]
    }
  ]

  const companyLogos = [
    { name: 'Startup Tech', size: 'sm' },
    { name: 'Retail Corp', size: 'md' },
    { name: 'Food Chain', size: 'lg' },
    { name: 'Agency Pro', size: 'sm' },
    { name: 'Health Plus', size: 'md' },
    { name: 'Edu Solutions', size: 'sm' }
  ]

  const benefits = [
    {
      icon: Users,
      title: 'Hasta 5 Personas',
      description: 'Capacita a tu equipo completo en una sola sesión',
      stat: '5 personas'
    },
    {
      icon: Clock,
      title: 'Sesión Extendida',
      description: 'Más tiempo para profundizar y practicar en equipo',
      stat: '6 horas'
    },
    {
      icon: Target,
      title: 'Implementación Inmediata',
      description: 'Salen con plan de acción listo para ejecutar',
      stat: '100% práctico'
    },
    {
      icon: TrendingUp,
      title: 'ROI Comprobado',
      description: 'Empresas reportan 3x de retorno en 90 días',
      stat: '3x ROI'
    }
  ]

  const testimonials = [
    {
      company: 'TechStart Colombia',
      industry: 'Software Development',
      size: '5 personas',
      result: '40% más productivos',
      quote: 'Implementamos IA en nuestros procesos y el equipo ahora trabaja mucho más eficiente. El ROI fue inmediato.',
      person: 'Laura Gómez, CEO'
    },
    {
      company: 'Café Imperial',
      industry: 'Retail',
      size: '4 personas',
      result: 'Ahorro de 15h/semana',
      quote: 'Automatizamos inventario y pedidos. Ahora el equipo se enfoca en atención al cliente, no en Excel.',
      person: 'Miguel Torres, Gerente'
    },
    {
      company: 'Digital Agency',
      industry: 'Marketing',
      size: '5 personas',
      result: '+25% capacidad',
      quote: 'Con las herramientas que nos enseñaron, podemos manejar 25% más clientes con el mismo equipo.',
      person: 'Sofia Medina, COO'
    }
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Diagnóstico Previo',
      description: 'Llamada de 30 min con el líder para entender necesidades del equipo y objetivos',
      icon: MessageSquare
    },
    {
      step: '02',
      title: 'Cuestionario Pre-Workshop',
      description: 'Cada participante completa assessment para personalizar el contenido',
      icon: FileText
    },
    {
      step: '03',
      title: 'Workshop de 6 Horas',
      description: 'Sesión intensiva interactiva con ejercicios prácticos y grabación completa',
      icon: Video
    },
    {
      step: '04',
      title: 'Plan de Implementación',
      description: 'Roadmap detallado con tareas asignadas y timeline para el equipo',
      icon: Target
    },
    {
      step: '05',
      title: 'Materiales Personalizados',
      description: 'Plantillas, prompts, workflows y recursos adaptados a su negocio',
      icon: Briefcase
    },
    {
      step: '06',
      title: 'Seguimiento a 30 días',
      description: 'Sesión de 1 hora para resolver dudas y optimizar implementación',
      icon: Calendar
    },
    {
      step: '07',
      title: 'Soporte Extendido',
      description: '60 días de soporte por email para todo el equipo',
      icon: Mail
    }
  ]

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 text-white">
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
              className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-8 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Volver a Impulsa Academy
            </Link>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Users className="w-4 h-4" />
              Capacitación Corporativa
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Impulsa Teams
            </h1>

            <p className="text-2xl text-blue-100 mb-8 leading-relaxed">
              Potencia las habilidades digitales de tu equipo. 
              Workshop práctico de 6 horas para hasta 5 personas con implementación inmediata.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-6 bg-white/10 backdrop-blur rounded-2xl p-6 mb-8">
              <div>
                <div className="flex items-center gap-2 text-blue-200 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-medium">Duración</span>
                </div>
                <div className="text-3xl font-bold">6 horas</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-blue-200 mb-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm font-medium">Capacidad</span>
                </div>
                <div className="text-3xl font-bold">Hasta 5</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-blue-200 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm font-medium">Inversión</span>
                </div>
                <div className="text-3xl font-bold">$500</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/#contacto"
                className="px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Solicitar Cotización
              </Link>
              <a 
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-blue-800/50 backdrop-blur text-white rounded-xl font-semibold text-lg border-2 border-white/20 hover:bg-blue-800 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Clave */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                ¿Por qué capacitar a tu equipo?
              </h2>
              <p className="text-xl text-gray-600">
                Inversión que se paga sola en semanas
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 text-center">
                  <div className="inline-flex p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{benefit.stat}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lo que incluye */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Todo lo que incluye
              </h2>
              <p className="text-xl text-gray-600">
                Paquete completo para transformar a tu equipo
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Video,
                  title: 'Workshop Interactivo de 6 Horas',
                  description: 'Sesión práctica con ejercicios en equipo, grabada para revisión posterior.',
                  color: 'blue'
                },
                {
                  icon: Brain,
                  title: 'Diagnóstico Organizacional',
                  description: 'Análisis de madurez digital y oportunidades de mejora específicas.',
                  color: 'purple'
                },
                {
                  icon: Target,
                  title: 'Plan de Implementación',
                  description: 'Roadmap detallado con tareas asignadas y timeline para 90 días.',
                  color: 'teal'
                },
                {
                  icon: Briefcase,
                  title: 'Materiales Personalizados',
                  description: 'Plantillas, prompts, workflows y recursos adaptados a su industria.',
                  color: 'emerald'
                },
                {
                  icon: Calendar,
                  title: 'Sesión de Seguimiento',
                  description: 'Reunión a los 30 días para resolver dudas y optimizar.',
                  color: 'orange'
                },
                {
                  icon: Mail,
                  title: '60 Días de Soporte',
                  description: 'Soporte extendido por email para todo el equipo.',
                  color: 'pink'
                },
                {
                  icon: Award,
                  title: 'Certificados Individuales',
                  description: 'Cada participante recibe certificado de capacitación.',
                  color: 'indigo'
                },
                {
                  icon: Zap,
                  title: 'Herramientas Premium',
                  description: 'Acceso a recursos y herramientas que usamos internamente.',
                  color: 'red'
                }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
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

      {/* Módulos Disponibles */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Módulos corporativos
              </h2>
              <p className="text-xl text-gray-600">
                Workshops diseñados para equipos de alto rendimiento
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
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                        : 'bg-slate-50 text-gray-700 hover:bg-blue-50 border-2 border-gray-100'
                    }`}
                  >
                    <div className="font-bold mb-1">{module.title}</div>
                    <div className={`text-sm ${selectedModule === i ? 'text-blue-100' : 'text-gray-500'}`}>
                      {module.duration}
                    </div>
                  </button>
                ))}
              </div>

              {/* Detalle del módulo seleccionado */}
              <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-xl border-2 border-blue-100">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">
                  {modules[selectedModule].title}
                </h3>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    <Clock className="w-4 h-4" />
                    {modules[selectedModule].duration}
                  </div>
                </div>
                <h4 className="font-bold text-lg mb-4 text-slate-900">
                  Agenda del workshop:
                </h4>
                <ul className="space-y-4">
                  {modules[selectedModule].topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-lg">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso Completo */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Proceso de capacitación
              </h2>
              <p className="text-xl text-gray-600">
                De la consulta inicial a la implementación exitosa
              </p>
            </div>

            <div className="space-y-6">
              {processSteps.map((step, i) => (
                <div key={i} className="flex gap-6 items-start bg-white p-6 rounded-2xl border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <step.icon className="w-6 h-6 text-blue-600" />
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

      {/* Casos de Éxito */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Empresas que ya transformaron sus equipos
              </h2>
              <p className="text-xl text-gray-600">
                ROI comprobado en menos de 90 días
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="font-bold text-lg text-slate-900">{testimonial.company}</div>
                      <div className="text-sm text-gray-600">{testimonial.industry}</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-sm text-gray-600">Equipo: </span>
                    <span className="font-semibold text-gray-800">{testimonial.size}</span>
                  </div>

                  <div className="mb-4 inline-flex bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {testimonial.result}
                  </div>
                  
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  
                  <div className="text-sm font-medium text-blue-600">
                    — {testimonial.person}
                  </div>
                </div>
              ))}
            </div>

            {/* Logos de empresas */}
            <div className="text-center">
              <p className="text-gray-600 mb-8">Confían en nosotros:</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-40">
                {companyLogos.map((logo, i) => (
                  <div key={i} className="flex items-center justify-center">
                    <Building2 className={`${
                      logo.size === 'sm' ? 'w-8 h-8' :
                      logo.size === 'md' ? 'w-12 h-12' :
                      'w-16 h-16'
                    } text-slate-400`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 rounded-3xl p-12 text-center shadow-2xl text-white">
            <Rocket className="w-16 h-16 mx-auto mb-6 text-blue-300" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Impulsa a tu equipo hacia el futuro
            </h2>
            <p className="text-xl text-blue-100 mb-4">
              <span className="font-bold text-white text-3xl">$500 USD</span> • 6 horas • Hasta 5 personas
            </p>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Inversión de $100 USD por persona para transformar las capacidades de todo tu equipo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#contacto"
                className="px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Solicitar Información
              </Link>
              <Link 
                href="/capacitacion"
                className="px-8 py-4 bg-blue-800/50 backdrop-blur text-white rounded-xl font-semibold text-lg border-2 border-white/20 hover:bg-blue-800 transition-all duration-300"
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
