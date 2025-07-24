'use client'

import Link from 'next/link'
import { LINKS } from '@/lib/constants'
import { useState } from 'react'

// Definir tipos para TypeScript
interface Dashboard {
  id: number
  title: string
  image: string
  category: string
  description: string
  features: string[]
  metrics: string
}

export default function FinanzasPage() {
  // Estado para el modal de dashboards
  const [selectedDashboard, setSelectedDashboard] = useState<Dashboard | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("Todos")
  
  // Datos de los dashboards
  const dashboards: Dashboard[] = [
    {
      id: 1,
      title: "Tablero de Mando Integral",
      image: "/dashboards/dashboard-01-mando-integral.png",
      category: "Visión General",
      description: "Panel ejecutivo con KPIs principales del negocio",
      features: [
        "Ventas totales y tendencias en tiempo real",
        "Análisis de rentabilidad operacional",
        "Comparativa de costos vs ingresos",
        "Métricas de servicios más vendidos"
      ],
      metrics: "Ventas: $352M | Rentabilidad: 43.8%"
    },
    {
      id: 2,
      title: "Análisis de Ventas Detallado",
      image: "/dashboards/dashboard-02-mando-ventas.png",
      category: "Ventas",
      description: "Vista profunda del comportamiento de ventas",
      features: [
        "Segmentación por cliente y período",
        "Análisis de tendencias mensuales",
        "Identificación de patrones de compra",
        "Filtros dinámicos por cliente"
      ],
      metrics: "20 clientes principales monitoreados"
    },
    {
      id: 3,
      title: "Control de Flujo de Caja",
      image: "/dashboards/dashboard-03-flujo-caja.png",
      category: "Finanzas",
      description: "Gestión integral de cobros y pagos",
      features: [
        "Estado de cartera en tiempo real",
        "Antigüedad de cuentas por cobrar",
        "Proyección de ingresos futuros",
        "Alertas de vencimientos"
      ],
      metrics: "Cartera: $588M | Tiempo promedio: 11 meses"
    },
    {
      id: 4,
      title: "Proyección Comercial",
      image: "/dashboards/dashboard-04-proyeccion-ventas.png",
      category: "Estrategia",
      description: "Planificación y seguimiento de metas comerciales",
      features: [
        "Proyección mensual de servicios",
        "Análisis por sector económico",
        "Comparativa público vs privado",
        "Top clientes por valor"
      ],
      metrics: "Proyección anual: $42.2M"
    },
    {
      id: 5,
      title: "KPIs Operacionales",
      image: "/dashboards/dashboard-05-metas-operaciones.png",
      category: "Operaciones",
      description: "Métricas de cumplimiento y eficiencia",
      features: [
        "Cumplimiento por coordinador",
        "Indicadores de servicio",
        "Control de riesgos operativos",
        "Tableros de gestión por área"
      ],
      metrics: "Cumplimiento general: 71%"
    },
    {
      id: 6,
      title: "Dashboard Financiero ROTI",
      image: "/dashboards/dashboard-06-control-financiero.png",
      category: "Restaurante",
      description: "Control especializado para restaurantes",
      features: [
        "Ventas diarias y semanales",
        "Control de costos por categoría",
        "Análisis de rentabilidad EBITDA",
        "Variación mensual de costos"
      ],
      metrics: "Ventas: $5.7M | Rentabilidad: 61%"
    },
    {
      id: 7,
      title: "Distribución de Servicios",
      image: "/dashboards/dashboard-07-distribucion-servicios.png",
      category: "Operaciones",
      description: "Análisis geográfico y por modalidad",
      features: [
        "Mapa de calor por región",
        "Distribución por tipo de servicio",
        "Análisis de utilidad por contrato",
        "Métricas de cobertura nacional"
      ],
      metrics: "Cobertura: Nacional | 11,641 servicios"
    },
    {
      id: 8,
      title: "Análisis de Entidades Territoriales",
      image: "/dashboards/dashboard-08-entidades-territoriales.png",
      category: "Gobierno",
      description: "Dashboard para gestión pública departamental",
      features: [
        "Ingresos corrientes vs gastos",
        "Análisis por categoría municipal",
        "Indicadores de gestión fiscal",
        "Comparativas interdepartamentales"
      ],
      metrics: "32 departamentos | $5.8B en ingresos"
    },
    {
      id: 9,
      title: "Gestión Municipal",
      image: "/dashboards/dashboard-09-municipios.png",
      category: "Gobierno",
      description: "Control detallado por municipio",
      features: [
        "1020 municipios monitoreados",
        "Categorización por ingresos",
        "Análisis de gastos de funcionamiento",
        "Indicadores de eficiencia fiscal"
      ],
      metrics: "Población: 49M | Cobertura: 100%"
    },
    {
      id: 10,
      title: "Seguimiento de Proyectos BID",
      image: "/dashboards/dashboard-10-seguimiento-proyectos.png",
      category: "Proyectos",
      description: "Gestión de proyectos internacionales",
      features: [
        "Pipeline de proyectos por país",
        "Estados y avances en tiempo real",
        "Valor cotizado vs aprobado",
        "Análisis geográfico de inversión"
      ],
      metrics: "5000 proyectos | $133.5M aprobados"
    },
    {
      id: 11,
      title: "Proyectos BID Latinoamérica",
      image: "/dashboards/dashboard-11-bid-proyectos-latam.png",
      category: "Internacional",
      description: "Análisis regional de inversiones BID",
      features: [
        "Mapa interactivo de proyectos por país",
        "Desglose detallado de inversiones",
        "Seguimiento de desembolsos por año",
        "Análisis de impacto regional"
      ],
      metrics: "$133.5M total | Cobertura: 20+ países"
    }
  ]

  // Obtener categorías únicas
  const categories = ["Todos", ...new Set(dashboards.map(d => d.category))]
  
  // Filtrar dashboards por categoría
  const filteredDashboards = activeCategory === "Todos" 
    ? dashboards 
    : dashboards.filter(d => d.category === activeCategory)

  return (
    <>
      {/* Sección 1: Hero - Tema Oscuro */}
      <section className="relative bg-[#002D62] text-white pt-24 pb-20 overflow-hidden">
        {/* Patrón de fondo abstracto */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Deja de Adivinar con tus Finanzas. Toma el Control con Datos.
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Transformamos tus ventas, gastos y costos desordenados en un dashboard 
              interactivo que te da claridad total para tomar decisiones rentables.
            </p>
          </div>
        </div>
      </section>

      {/* Sección 2: El Problema - Tema Claro */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              ¿Te Suena Familiar?
            </h2>
            <div className="space-y-6">
              {[
                "¿Sientes que vendes mucho pero no sabes a dónde se va el dinero?",
                "¿Te cuesta saber qué producto o servicio es realmente rentable?",
                "¿Las decisiones sobre precios o compras se basan más en la intuición que en datos reales?",
                "¿Pierdes tiempo haciendo cálculos manuales que no te dan la imagen completa?"
              ].map((problema, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-red-600 font-bold">?</span>
                  </div>
                  <p className="text-lg text-gray-700">{problema}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3: La Solución - Tema Claro */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Nuestra Solución: Un Centro de Mando para tu Negocio
            </h2>
            
            {/* Video Demo */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-12 aspect-video">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/TswtaMkROcU?autoplay=1&mute=1&loop=1&playlist=TswtaMkROcU"
                title="Dashboard Demo - Impulsa Lab"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Características */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "KPIs Personalizados",
                  description: "Métricas específicas para tu industria y modelo de negocio"
                },
                {
                  title: "Análisis de Rentabilidad",
                  description: "Conoce el margen real de cada producto o servicio"
                },
                {
                  title: "Control de Costos en Tiempo Real",
                  description: "Identifica gastos innecesarios y oportunidades de ahorro"
                },
                {
                  title: "Proyecciones y Análisis de Escenarios",
                  description: "Simula decisiones antes de tomarlas"
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN: Ve Tu Negocio en Acción */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              Ve Tu Negocio en Acción
            </h2>
            <p className="text-xl text-center text-gray-600 mb-8 max-w-3xl mx-auto">
              Estos son ejemplos reales de dashboards que hemos creado. 
              Haz clic en cualquier imagen para explorar los detalles.
            </p>

            {/* Filtros por categoría */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category}
                  {category === "Todos" && (
                    <span className="ml-2 text-sm opacity-75">({dashboards.length})</span>
                  )}
                </button>
              ))}
            </div>

            {/* Grid de Dashboards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
              {filteredDashboards.map((dashboard) => (
                <div 
                  key={dashboard.id}
                  onClick={() => setSelectedDashboard(dashboard)}
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl">
                    <div className="relative h-48 bg-gray-100">
                      <img 
                        src={dashboard.image}
                        alt={dashboard.title}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {dashboard.category}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <p className="text-white p-4 text-sm font-medium">
                          Click para ver detalles
                        </p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900 mb-2 line-clamp-1">
                        {dashboard.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {dashboard.description}
                      </p>
                      <p className="text-xs text-blue-600 mt-2 font-semibold">
                        {dashboard.metrics}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal para imagen expandida */}
            {selectedDashboard && (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={() => setSelectedDashboard(null)}
              >
                <div 
                  className="relative max-w-7xl w-full bg-white rounded-2xl overflow-hidden animate-fadeIn"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header del modal */}
                  <div className="flex items-center justify-between p-6 border-b">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {selectedDashboard.title}
                      </h3>
                      <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {selectedDashboard.category}
                      </span>
                    </div>
                    <button 
                      onClick={() => setSelectedDashboard(null)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Contenido del modal */}
                  <div className="grid lg:grid-cols-3 gap-6 p-6 max-h-[80vh] overflow-y-auto">
                    {/* Imagen grande */}
                    <div className="lg:col-span-2">
                      <img 
                        src={selectedDashboard.image}
                        alt={selectedDashboard.title}
                        className="w-full rounded-lg shadow-lg"
                      />
                    </div>

                    {/* Información detallada */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Descripción</h4>
                        <p className="text-gray-600">{selectedDashboard.description}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Funcionalidades Principales</h4>
                        <ul className="space-y-2">
                          {selectedDashboard.features.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-700 text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t">
                        <p className="text-sm font-semibold text-blue-600">
                          {selectedDashboard.metrics}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sección de beneficios */}
            <div className="mt-20 mb-16">
              <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
                La Transformación es Real
              </h3>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Antes */}
                <div className="bg-red-50 rounded-xl p-8 border-2 border-red-200">
                  <h4 className="font-semibold text-xl mb-4 text-red-800 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Antes
                  </h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      Excel con fórmulas rotas y datos desactualizados
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      Horas perdidas consolidando información
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      Decisiones basadas en corazonadas
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      Sorpresas desagradables a fin de mes
                    </li>
                  </ul>
                </div>

                {/* Después */}
                <div className="bg-green-50 rounded-xl p-8 border-2 border-green-200">
                  <h4 className="font-semibold text-xl mb-4 text-green-800 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Después
                  </h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Dashboard actualizado automáticamente en tiempo real
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Toda tu información en un solo lugar
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Decisiones respaldadas por datos precisos
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Control total y anticipación a problemas
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA específico */}
            <div className="text-center">
              <Link 
                href={`https://wa.me/573112669878?text=${encodeURIComponent('Hola, vi los ejemplos de dashboards financieros y quiero ver mis números claramente')}`}
                target="_blank"
                className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-full 
                         font-semibold text-lg transition-all duration-300 
                         hover:scale-105 hover:bg-green-700 shadow-xl hover:shadow-2xl">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Quiero Ver Mis Números Claramente
              </Link>
              <p className="mt-4 text-gray-600">
                Respuesta en menos de 2 horas en horario laboral
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 4: Nuestro Proceso - Tema Gris */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Nuestra Metodología en 4 Pasos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  numero: "1",
                  titulo: "Diagnóstico y Recolección",
                  descripcion: "Entendemos tu negocio y recolectamos tus datos."
                },
                {
                  numero: "2",
                  titulo: "Ingeniería de Datos",
                  descripcion: "Limpiamos, estructuramos y modelamos tus datos."
                },
                {
                  numero: "3",
                  titulo: "Diseño y Entrega",
                  descripcion: "Construimos tu dashboard 100% a medida."
                },
                {
                  numero: "4",
                  titulo: "Capacitación y Soporte",
                  descripcion: "Te enseñamos a usarlo y te acompañamos."
                }
              ].map((paso, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-lg p-6 shadow-lg h-full">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                      {paso.numero}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{paso.titulo}</h3>
                    <p className="text-gray-600">{paso.descripcion}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección 5: Planes y Precios - Tema Claro */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              Planes Diseñados para tu Etapa de Crecimiento
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Plan Piloto Automático */}
              <div className="bg-gray-50 rounded-lg p-8 border-2 border-gray-200">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Implementación "Piloto Automático"</h3>
                <p className="text-gray-600 mb-6">Ideal para: Negocios que necesitan claridad y control inmediato.</p>
                
                <div className="mb-6">
                  <p className="text-3xl font-bold text-blue-600">Desde $1,500</p>
                  <p className="text-gray-500">Pago único</p>
                </div>

                <div className="mb-8">
                  <p className="font-semibold mb-3 text-gray-900">Entregables:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Dashboard personalizado en Excel/Google Sheets</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Automatización de cálculos y reportes</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Capacitación inicial incluida</span>
                    </li>
                  </ul>
                </div>

                <Link href={LINKS.calendly}
                      target="_blank"
                      className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Agendar Diagnóstico
                </Link>
              </div>

              {/* Plan Cohete */}
              <div className="bg-blue-50 rounded-lg p-8 border-2 border-blue-200 relative">
                <div className="absolute -top-3 right-8 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Más Popular
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">Consultoría Estratégica "Cohete"</h3>
                <p className="text-gray-600 mb-6">Ideal para: Negocios que buscan optimizar y escalar con inteligencia de datos.</p>
                
                <div className="mb-6">
                  <p className="text-3xl font-bold text-blue-600">Desde $2,500</p>
                  <p className="text-gray-500">+ Suscripción mensual</p>
                </div>

                <div className="mb-8">
                  <p className="font-semibold mb-3 text-gray-900">Entregables:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Todo lo del plan Piloto Automático</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Análisis avanzado y modelado predictivo</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Reuniones mensuales de estrategia</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">Soporte prioritario continuo</span>
                    </li>
                  </ul>
                </div>

                <Link href={LINKS.calendly}
                      target="_blank"
                      className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Agendar Diagnóstico
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 6: CTA Final - Tema Oscuro */}
      <section className="py-20 bg-[#002D62] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para Tomar Decisiones Basadas en Datos?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Agenda tu diagnóstico gratuito y descubre cómo un dashboard personalizado 
              puede transformar la forma en que manejas tu negocio.
            </p>
            <Link href={LINKS.calendly}
                  target="_blank"
                  className="inline-block bg-white text-blue-900 px-8 py-4 rounded-lg 
                           font-semibold text-lg transition-all duration-300 
                           hover:scale-105 hover:bg-gray-100">
              Obtén tu Diagnóstico 3D Gratis
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}