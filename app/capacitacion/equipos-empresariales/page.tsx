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
  Brain,
  Zap,
  Calendar,
  MessageSquare,
  MapPin,
  Award,
  FileText,
  Video,
  Mail,
  TrendingUp,
  Rocket,
  Building2,
  Shield,
  BarChart3,
  Lightbulb,
  Plus
} from 'lucide-react'

export default function EquiposEmpresarialesPage() {
  const [selectedTier, setSelectedTier] = useState<'workshop' | 'standard' | 'premium'>('standard')
  const [additionalPeople, setAdditionalPeople] = useState(0)

  const tiers = {
    workshop: {
      name: 'WORKSHOP',
      subtitle: 'AI para Equipos',
      price: 400,
      duration: '3 horas',
      color: 'emerald',
      description: 'Alfabetización AI rápida para todo el equipo',
      ideal: 'Equipos que necesitan entender qué es posible con IA',
      capacity: 'Hasta 5 personas',
      modules: [
        {
          title: 'Fundamentos AI para Negocios',
          time: '90 min',
          topics: [
            'Todo el contenido de BASIC 1-a-1 (adaptado para grupo)',
            'Historia y evolución de la IA',
            'Plataformas: ChatGPT, Claude, Gemini',
            'Conceptos clave: tokens, contexto, modelos',
            'Ejercicios en equipo',
            'Casos de uso por departamento'
          ]
        },
        {
          title: 'Herramientas Prácticas',
          time: '90 min',
          topics: [
            'Setup de plataformas en dispositivos del equipo',
            'Ejercicio práctico: Resolver problema real del negocio',
            'Prompts por rol (finanzas, ops, marketing, ventas)',
            'Q&A interactivo',
            'Plan de primeros pasos'
          ]
        }
      ],
      deliverables: [
        'Guía de AI para equipos (PDF)',
        'Prompts por departamento (100+)',
        'Certificados de participación',
        '15 días de soporte grupal (email)'
      ]
    },
    standard: {
      name: 'STANDARD',
      subtitle: 'Implementación AI',
      price: 749,
      duration: '6 horas',
      color: 'blue',
      description: 'Herramientas configuradas y listas para usar en equipo',
      ideal: 'Equipos listos para adoptar AI en sus procesos',
      capacity: 'Hasta 5 personas',
      modules: [
        {
          title: 'Todo lo de WORKSHOP +',
          time: '3h',
          topics: ['Fundamentos completos', 'Herramientas prácticas', 'Setup inicial']
        },
        {
          title: 'Setup Colaborativo',
          time: '90 min',
          topics: [
            'Configuración de GPTs para cada departamento:',
            '• Finanzas: Análisis de números',
            '• Operaciones: Gestión de procesos',
            '• Marketing: Generación de contenido',
            '• Ventas: Pitch y propuestas',
            'Claude Projects compartidos',
            'Gemini workspace setup'
          ]
        },
        {
          title: 'Casos de Uso por Área',
          time: '90 min',
          topics: [
            '3 casos prácticos implementados en la sesión:',
            'Caso Finanzas: Dashboard básico o reporte automatizado',
            'Caso Operaciones: SOP generado con AI',
            'Caso Marketing: 30 días de contenido creado',
            'Documentación de cada caso'
          ]
        }
      ],
      deliverables: [
        'Todo lo de WORKSHOP',
        'GPTs configurados para cada departamento',
        '3 casos de uso documentados',
        'Blueprints de 5 automatizaciones (diagramas)',
        '45 días de soporte grupal',
        'Certificados premium'
      ]
    },
    premium: {
      name: 'PREMIUM',
      subtitle: 'Transformación AI',
      price: 2099,
      duration: '12 horas (2 días)',
      color: 'amber',
      description: 'Transformación completa con implementaciones avanzadas',
      ideal: 'Empresas serias sobre transformación digital',
      capacity: 'Hasta 5 personas',
      modules: [
        {
          title: 'DÍA 1: Estrategia e Implementación',
          time: '6 horas',
          topics: [
            'Todo lo de STANDARD (comprimido y más profundo)',
            'Diagnóstico organizacional completo',
            'Identificación de 10 oportunidades AI',
            'Setup estratégico de plataformas',
            'GPTs por departamento configurados'
          ]
        },
        {
          title: 'DÍA 2: Proyectos Prácticos (3 horas)',
          time: '3 horas',
          topics: [
            'OPCIÓN A: Setup AI empresarial completo',
            '• ChatGPT Enterprise/Teams (configuración)',
            '• Claude for Business (setup)',
            '• Gemini Workspace (integración)',
            '• Roles, permisos, governance',
            '',
            'OPCIÓN B: 3 casos de uso implementados (1h cada uno)',
            '• Finanzas: Dashboard o automatización',
            '• Operaciones: Workflow o bot',
            '• Marketing: Sistema de contenido',
            '',
            'OPCIÓN C: Demo + Blueprint de automatización compleja',
            '• Ejemplo: CRM → AI → Email automático',
            '• Inventario → AI → Alertas inteligentes'
          ]
        },
        {
          title: 'DÍA 2: Roadmap y Adopción (3 horas)',
          time: '3 horas',
          topics: [
            'Plan detallado 90 días',
            'Change management workshop',
            'Entrenamiento de "champions" internos',
            'Métricas y KPIs de adopción',
            'Sesión ejecutiva con liderazgo',
            'Estrategia de escalamiento'
          ]
        }
      ],
      deliverables: [
        'Todo lo de STANDARD',
        'Materiales 100% personalizados con su branding',
        'Dashboard de adopción (Google Sheets template)',
        '90 días de soporte ilimitado',
        '2 sesiones de seguimiento (1h cada una: día 30 y día 60)',
        'Acceso a comunidad privada',
        'Certificados ejecutivos premium',
        'Toolkit empresarial completo'
      ]
    }
  }

  const currentTier = tiers[selectedTier]
  const totalPrice = currentTier.price + (additionalPeople * 59)

  const companyTestimonials = [
    {
      company: 'TechStart Colombia',
      industry: 'Software Development',
      size: '5 personas',
      tier: 'Standard',
      result: '40% más productivos',
      quote: 'Implementamos IA en nuestros procesos y el equipo ahora trabaja mucho más eficiente. El ROI fue inmediato.',
      person: 'Laura Gómez, CEO',
      savings: '$3,000/mes en eficiencia'
    },
    {
      company: 'Café Imperial',
      industry: 'Retail',
      size: '4 personas',
      tier: 'Workshop',
      result: 'Ahorro de 15h/semana',
      quote: 'Necesitábamos entender AI rápido. En 3 horas todo el equipo ya usaba ChatGPT para inventario y pedidos.',
      person: 'Miguel Torres, Gerente',
      savings: '15h/semana recuperadas'
    },
    {
      company: 'Digital Agency Pro',
      industry: 'Marketing',
      size: '5 personas',
      tier: 'Premium',
      result: '+25% capacidad',
      quote: 'La transformación de 2 días cambió nuestra operación. Ahora manejamos 25% más clientes con el mismo equipo.',
      person: 'Sofia Medina, COO',
      savings: '+$8,000/mes en revenue'
    }
  ]

  const benefits = [
    {
      icon: Users,
      title: 'Todo el equipo alineado',
      description: 'Todos aprenden juntos, mismo lenguaje AI',
      stat: 'Hasta 5 personas'
    },
    {
      icon: Clock,
      title: 'Tiempo optimizado',
      description: 'Una sola sesión vs capacitar uno por uno',
      stat: '3-12 horas'
    },
    {
      icon: Target,
      title: 'Implementación inmediata',
      description: 'Salen con herramientas configuradas',
      stat: '100% práctico'
    },
    {
      icon: TrendingUp,
      title: 'ROI comprobado',
      description: 'Empresas reportan 3x retorno en 90 días',
      stat: '3x ROI'
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
              className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-8 transition-colors group"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
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
              Potencia las habilidades digitales de tu equipo completo. 
              Workshop práctico de 3 a 12 horas con implementación inmediata.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/10 backdrop-blur rounded-2xl p-6 mb-8">
              <div>
                <div className="flex items-center gap-2 text-blue-200 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm font-medium">Duración</span>
                </div>
                <div className="text-3xl font-bold">3-12h</div>
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
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm font-medium">Formato</span>
                </div>
                <div className="text-2xl font-bold">Presencial</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-blue-200 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm font-medium">Desde</span>
                </div>
                <div className="text-3xl font-bold">$400</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/#contacto"
                className="px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-white/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Solicitar Cotización
              </Link>
              <a 
                href="https://wa.me/19295007815"
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

      {/* Selector de Tiers con calculadora */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Elige tu nivel
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                3 formatos para diferentes etapas de madurez AI
              </p>
              
              {/* Calculadora de personas */}
              <div className="inline-flex flex-col items-center gap-4 bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-100">
                <div className="text-sm font-semibold text-gray-700">
                  Todas las opciones incluyen hasta 5 personas
                </div>
                <div className="flex items-center gap-4">
                  <label className="text-gray-700 font-medium">Personas adicionales:</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setAdditionalPeople(Math.max(0, additionalPeople - 1))}
                      className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-lg font-bold text-blue-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-slate-900 w-12 text-center">
                      {additionalPeople}
                    </span>
                    <button
                      onClick={() => setAdditionalPeople(additionalPeople + 1)}
                      className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-lg font-bold text-blue-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">× $59 = ${additionalPeople * 59}</span>
                </div>
              </div>
            </div>

            {/* Tier Tabs */}
            <div className="flex flex-col md:flex-row gap-4 mb-12">
              {(['workshop', 'standard', 'premium'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`flex-1 p-6 rounded-2xl border-4 transition-all duration-300 ${
                    selectedTier === tier
                      ? tier === 'workshop' 
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
                      ${tier === selectedTier && additionalPeople > 0 ? totalPrice : tiers[tier].price}
                    </div>
                    <div className="text-sm text-gray-600">
                      {tiers[tier].duration}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {tiers[tier].capacity}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Tier Content */}
            <div className={`bg-gradient-to-br ${
              selectedTier === 'workshop' ? 'from-emerald-50 to-teal-50' :
              selectedTier === 'standard' ? 'from-blue-50 to-indigo-50' :
              'from-amber-50 to-orange-50'
            } rounded-3xl p-8 md:p-12 shadow-2xl border-4 ${
              selectedTier === 'workshop' ? 'border-emerald-200' :
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
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg">
                    <Target className="w-5 h-5 text-emerald-600" />
                    <span className="text-gray-700">
                      <span className="font-semibold">Ideal para:</span> {currentTier.ideal}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-semibold">
                      {currentTier.capacity}
                    </span>
                  </div>
                </div>
                {additionalPeople > 0 && (
                  <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <Plus className="w-5 h-5" />
                    <span className="font-semibold">
                      +{additionalPeople} persona{additionalPeople > 1 ? 's' : ''} adicional{additionalPeople > 1 ? 'es' : ''} = +${additionalPeople * 59}
                    </span>
                  </div>
                )}
              </div>

              {/* Modules */}
              <div className="mb-12">
                <h4 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Brain className="w-7 h-7 text-blue-600" />
                  Contenido del workshop
                </h4>
                <div className="space-y-6">
                  {currentTier.modules.map((module, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <h5 className="text-xl font-bold text-slate-900">{module.title}</h5>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold whitespace-nowrap">
                          {module.time}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {module.topics.map((topic, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
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
                  <Award className="w-7 h-7 text-blue-600" />
                  Lo que recibe el equipo
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {currentTier.deliverables.map((item, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 shadow-lg border-2 border-gray-100 flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Valor de mercado en NYC</div>
                  <div className="text-3xl font-bold text-gray-400 line-through mb-2">
                    ${(currentTier.price * 2) + (additionalPeople * 118)}+
                  </div>
                  <div className="text-sm text-emerald-600 font-semibold mb-4">
                    Ahorras más de ${currentTier.price + (additionalPeople * 59)}
                  </div>
                  
                  {additionalPeople > 0 && (
                    <div className="mb-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                      <div className="text-sm text-gray-600 mb-2">Desglose:</div>
                      <div className="flex justify-center gap-4 text-sm">
                        <span className="text-gray-700">
                          Tier base: <span className="font-bold">${currentTier.price}</span>
                        </span>
                        <span className="text-gray-400">+</span>
                        <span className="text-gray-700">
                          {additionalPeople} adicional{additionalPeople > 1 ? 'es' : ''}: <span className="font-bold">${additionalPeople * 59}</span>
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-5xl font-bold text-slate-900 mb-2">
                    ${totalPrice}
                  </div>
                  <div className="text-sm text-gray-600 mb-6">
                    ${Math.round(totalPrice / (5 + additionalPeople))}/persona • {currentTier.capacity}
                    {additionalPeople > 0 && ` + ${additionalPeople}`}
                  </div>
                  <Link
                    href="/#contacto"
                    className={`inline-block px-12 py-4 bg-gradient-to-r ${
                      selectedTier === 'workshop' ? 'from-emerald-600 to-teal-600' :
                      selectedTier === 'standard' ? 'from-blue-600 to-indigo-600' :
                      'from-amber-600 to-orange-600'
                    } text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}
                  >
                    Solicitar {currentTier.name}
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
                Encuentra el formato perfecto para tu equipo
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 text-left font-bold">Característica</th>
                    <th className="p-4 text-center font-bold">WORKSHOP<br/><span className="text-emerald-400">$400</span></th>
                    <th className="p-4 text-center font-bold bg-blue-800">STANDARD<br/><span className="text-blue-200">$749</span></th>
                    <th className="p-4 text-center font-bold">PREMIUM<br/><span className="text-amber-400">$2,099</span></th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { feature: 'Duración', workshop: '3 horas', standard: '6 horas', premium: '12h (2 días)' },
                    { feature: 'Capacidad base', workshop: 'Hasta 5', standard: 'Hasta 5', premium: 'Hasta 5' },
                    { feature: 'Persona adicional', workshop: '+$59', standard: '+$59', premium: '+$59' },
                    { feature: 'Fundamentos IA', workshop: '✓', standard: '✓', premium: '✓' },
                    { feature: 'Setup plataformas', workshop: '—', standard: '✓', premium: '✓' },
                    { feature: 'GPTs por departamento', workshop: '—', standard: '✓', premium: '✓' },
                    { feature: 'Casos implementados', workshop: '—', standard: '3', premium: '3 avanzados' },
                    { feature: 'Setup empresarial AI', workshop: '—', standard: '—', premium: '✓' },
                    { feature: 'Roadmap detallado', workshop: '—', standard: '—', premium: '✓' },
                    { feature: 'Change management', workshop: '—', standard: '—', premium: '✓' },
                    { feature: 'Materiales personalizados', workshop: '—', standard: '—', premium: '✓' },
                    { feature: 'Soporte post', workshop: '15 días', standard: '45 días', premium: '90 días' },
                    { feature: 'Seguimientos', workshop: '—', standard: '—', premium: '2 sesiones' },
                    { feature: 'Certificados', workshop: 'Básicos', standard: 'Premium', premium: 'Ejecutivos' }
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-4 font-semibold text-gray-900 border">{row.feature}</td>
                      <td className="p-4 text-center border">{row.workshop}</td>
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
                Empresas que transformaron sus equipos
              </h2>
              <p className="text-xl text-gray-600">
                ROI comprobado en menos de 90 días
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {companyTestimonials.map((testimonial, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="font-bold text-lg text-slate-900">{testimonial.company}</div>
                      <div className="text-sm text-gray-600">{testimonial.industry}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{testimonial.size}</span>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                      {testimonial.tier}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="inline-flex bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-3">
                      {testimonial.result}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 italic leading-relaxed">"{testimonial.quote}"</p>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <div className="text-sm font-medium text-blue-600 mb-2">
                      — {testimonial.person}
                    </div>
                    <div className="text-sm font-bold text-emerald-600">
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
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Rocket className="w-20 h-20 mx-auto mb-6 text-blue-300" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Impulsa a tu equipo hacia el futuro
            </h2>
            <p className="text-xl text-blue-100 mb-4">
              Desde <span className="font-bold text-white text-3xl">$400</span> (3h) hasta <span className="font-bold text-white text-3xl">$2,099</span> (2 días)
            </p>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Inversión de <span className="font-bold">$80-$150</span> por persona para transformar las capacidades de todo tu equipo.
              <br/>Persona adicional: <span className="font-bold">+$59</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#contacto"
                className="px-10 py-5 bg-white text-blue-900 rounded-xl font-bold text-lg shadow-2xl hover:shadow-white/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-6 h-6" />
                Solicitar Información
              </Link>
              <Link 
                href="/capacitacion"
                className="px-10 py-5 bg-blue-800/50 backdrop-blur text-white rounded-xl font-bold text-lg border-2 border-white/30 hover:bg-blue-800 transition-all duration-300"
              >
                Ver Mentoría 1-a-1
              </Link>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-blue-200 text-sm mb-4">
                📍 Todas las sesiones son presenciales en tu locación (NYC)
              </p>
              <p className="text-blue-200 text-sm">
                ¿Prefieres remoto? Disponible con 15% descuento
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
