'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  GraduationCap, 
  Users, 
  UserCheck, 
  Clock, 
  DollarSign, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  Lightbulb,
  TrendingUp,
  BookOpen,
  Award,
  Video,
  MessageSquare,
  Calendar
} from 'lucide-react'

export default function ImpulsaAcademyPage() {
  const [selectedProgram, setSelectedProgram] = useState<'mentoria' | 'corporate' | null>(null)

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
              <Sparkles className="w-4 h-4" />
              Lanzamiento Oficial - Impulsa Academy
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-emerald-700 bg-clip-text text-transparent leading-tight">
              Transforma tu visión en realidad
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Capacitación práctica en tecnología e IA con expertos. 
              <span className="font-semibold text-emerald-600"> Mentoría personalizada</span> o 
              <span className="font-semibold text-blue-600"> formación para equipos</span>.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
              <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg border border-emerald-100">
                <div className="text-3xl font-bold text-emerald-600 mb-1">4h</div>
                <div className="text-sm text-gray-600">Mentoría</div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-1">6h</div>
                <div className="text-sm text-gray-600">Corporativo</div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg border border-purple-100">
                <div className="text-3xl font-bold text-purple-600 mb-1">100%</div>
                <div className="text-sm text-gray-600">Práctico</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#programas"
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Explorar Programas
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link 
                href="/#contacto"
                className="px-8 py-4 bg-white text-slate-800 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-slate-200"
              >
                Hablar con un experto
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparación de Programas */}
      <section id="programas" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Elige tu camino de aprendizaje
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dos formatos diseñados para diferentes necesidades. Mismo nivel de excelencia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Mentoría 1-a-1 Card */}
            <div 
              className={`bg-white rounded-3xl shadow-2xl border-4 transition-all duration-300 overflow-hidden ${
                selectedProgram === 'mentoria' 
                  ? 'border-emerald-500 scale-105' 
                  : 'border-transparent hover:border-emerald-200 hover:scale-102'
              }`}
              onMouseEnter={() => setSelectedProgram('mentoria')}
              onMouseLeave={() => setSelectedProgram(null)}
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-white">
                <div className="flex items-center justify-between mb-4">
                  <UserCheck className="w-12 h-12" />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    Individual
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-2">Mentoría 1-a-1</h3>
                <p className="text-emerald-50 mb-6">
                  Atención personalizada para tu proyecto o negocio
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">$300</span>
                  <span className="text-emerald-100">USD</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5 text-emerald-500" />
                    <span className="font-semibold">4 horas</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5 text-emerald-500" />
                    <span className="font-semibold">1 persona</span>
                  </div>
                </div>

                {/* Incluye */}
                <div className="mb-8">
                  <h4 className="font-bold text-lg mb-4 text-slate-900">Incluye:</h4>
                  <ul className="space-y-3">
                    {[
                      'Diagnóstico personalizado de tu proyecto',
                      'Plan de acción tecnológico a medida',
                      'Herramientas y recursos exclusivos',
                      'Sesión grabada para revisión',
                      '30 días de soporte por email',
                      'Certificado de participación'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link 
                  href="/capacitacion/mentoria-personalizada"
                  className="block w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold text-center hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Ver detalles de Mentoría
                </Link>
              </div>
            </div>

            {/* Capacitación Corporativa Card */}
            <div 
              className={`bg-white rounded-3xl shadow-2xl border-4 transition-all duration-300 overflow-hidden ${
                selectedProgram === 'corporate' 
                  ? 'border-blue-500 scale-105' 
                  : 'border-transparent hover:border-blue-200 hover:scale-102'
              }`}
              onMouseEnter={() => setSelectedProgram('corporate')}
              onMouseLeave={() => setSelectedProgram(null)}
            >
              {/* Header */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-12 h-12" />
                  <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                    Equipos
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-2">Impulsa Teams</h3>
                <p className="text-blue-50 mb-6">
                  Potencia las habilidades de tu equipo
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">$500</span>
                  <span className="text-blue-100">USD</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold">6 horas</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold">Hasta 5 personas</span>
                  </div>
                </div>

                {/* Incluye */}
                <div className="mb-8">
                  <h4 className="font-bold text-lg mb-4 text-slate-900">Incluye:</h4>
                  <ul className="space-y-3">
                    {[
                      'Workshop interactivo y práctico',
                      'Diagnóstico organizacional',
                      'Plan de implementación para el equipo',
                      'Materiales y plantillas personalizadas',
                      '60 días de soporte post-capacitación',
                      'Certificados para todos',
                      'Sesión de seguimiento a los 30 días'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link 
                  href="/capacitacion/equipos-empresariales"
                  className="block w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-center hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Ver detalles Corporativos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados de Aprendizaje */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                ¿Qué vas a lograr?
              </h2>
              <p className="text-xl text-gray-600">
                Resultados tangibles desde el primer día
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Target,
                  title: 'Claridad Estratégica',
                  description: 'Identifica exactamente qué tecnología necesitas y cómo implementarla en tu negocio.',
                  color: 'emerald'
                },
                {
                  icon: Lightbulb,
                  title: 'Soluciones Prácticas',
                  description: 'Herramientas y procesos listos para usar, no solo teoría.',
                  color: 'blue'
                },
                {
                  icon: TrendingUp,
                  title: 'ROI Medible',
                  description: 'Aprende a automatizar procesos que te ahorran tiempo y dinero.',
                  color: 'purple'
                },
                {
                  icon: Award,
                  title: 'Certificación',
                  description: 'Acredita tus nuevas habilidades con certificados reconocidos.',
                  color: 'teal'
                }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <div className={`inline-flex p-3 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-xl mb-4`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Temáticas Disponibles */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Temáticas disponibles
              </h2>
              <p className="text-xl text-gray-600">
                Enfocados en lo que realmente necesitas
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Automatización con IA',
                  description: 'Implementa IA en tus procesos diarios',
                  icon: Sparkles
                },
                {
                  title: 'Transformación Digital',
                  description: 'De lo análogo a lo digital, paso a paso',
                  icon: TrendingUp
                },
                {
                  title: 'Productos Digitales',
                  description: 'Crea y lanza productos digitales rentables',
                  icon: Target
                },
                {
                  title: 'Optimización Operacional',
                  description: 'Mejora eficiencia con tecnología',
                  icon: BookOpen
                },
                {
                  title: 'Data-Driven Decisions',
                  description: 'Toma decisiones basadas en datos',
                  icon: TrendingUp
                },
                {
                  title: 'Metodologías Ágiles',
                  description: 'Implementa Scrum, Kanban en tu equipo',
                  icon: Users
                }
              ].map((tema, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300">
                  <tema.icon className="w-10 h-10 text-emerald-600 mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{tema.title}</h3>
                  <p className="text-gray-600 text-sm">{tema.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-12 text-center shadow-2xl">
            <GraduationCap className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para transformar tu negocio?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Agenda una sesión de consulta gratuita para identificar cuál programa se ajusta mejor a tus necesidades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#contacto"
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Agendar Consulta Gratuita
              </Link>
              <a 
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Hablar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
