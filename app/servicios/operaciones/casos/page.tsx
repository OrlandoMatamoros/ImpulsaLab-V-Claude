'use client'

import Link from 'next/link'
import { ArrowLeft, Briefcase, TrendingUp, Clock, DollarSign } from 'lucide-react'
import { LINKS } from '@/lib/constants'

export default function CasosPage() {
  const industrias = [
    {
      nombre: "Restaurantes",
      casos: [
        { titulo: "Reservas automáticas", ahorro: "15 hrs/semana", roi: "300%" },
        { titulo: "Pedidos WhatsApp", ahorro: "20 hrs/semana", roi: "400%" },
        { titulo: "Inventario inteligente", ahorro: "$5k/mes", roi: "250%" }
      ],
      color: "orange"
    },
    {
      nombre: "Salud",
      casos: [
        { titulo: "Citas médicas 24/7", ahorro: "25 hrs/semana", roi: "350%" },
        { titulo: "Recordatorios pacientes", ahorro: "10 hrs/semana", roi: "200%" },
        { titulo: "Historia clínica digital", ahorro: "$8k/mes", roi: "500%" }
      ],
      color: "blue"
    },
    {
      nombre: "Retail",
      casos: [
        { titulo: "Inventario multi-tienda", ahorro: "$10k/mes", roi: "400%" },
        { titulo: "Atención cliente IA", ahorro: "30 hrs/semana", roi: "450%" },
        { titulo: "Análisis ventas", ahorro: "$3k/mes", roi: "300%" }
      ],
      color: "purple"
    },
    {
      nombre: "Servicios Profesionales",
      casos: [
        { titulo: "Facturación automática", ahorro: "8 hrs/semana", roi: "200%" },
        { titulo: "Onboarding clientes", ahorro: "12 hrs/semana", roi: "350%" },
        { titulo: "Reportes automáticos", ahorro: "$2k/mes", roi: "250%" }
      ],
      color: "green"
    }
  ];

  const casosExito = [
    {
      empresa: "Consultoría Legal",
      problema: "80% del tiempo en tareas administrativas",
      solucion: "Automatización completa de contratos y seguimientos",
      resultado: "85% reducción en tiempo administrativo",
      testimonial: "Ahora nos enfocamos en lo que realmente importa: nuestros clientes"
    },
    {
      empresa: "E-commerce de Moda",
      problema: "Pérdida de ventas por respuesta lenta",
      solucion: "Chatbot 24/7 con catálogo inteligente",
      resultado: "24/7 atención con 95% resolución automática",
      testimonial: "Las ventas nocturnas aumentaron 40% el primer mes"
    },
    {
      empresa: "Agencia de Marketing",
      problema: "Reportes manuales consumían días",
      solucion: "Dashboard automático multi-cliente",
      resultado: "$15K ahorro mensual en nómina",
      testimonial: "Eliminamos 3 posiciones administrativas y mejoramos el servicio"
    }
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 pt-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/servicios" className="text-gray-500 hover:text-gray-700">
              Servicios
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/servicios/operaciones" className="text-gray-500 hover:text-gray-700">
              Operaciones
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-green-600 font-semibold">Casos de Uso</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-teal-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-6">
              <Briefcase className="w-5 h-5" />
              <span>Soluciones por industria</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Casos de Uso por Industria
            </h1>
            <p className="text-xl text-gray-200">
              Descubre cómo empresas como la tuya están transformando sus operaciones
            </p>
          </div>
        </div>
      </section>

      {/* Casos por Industria */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Automatizaciones por Sector
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {industrias.map((industria, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">
                    {industria.nombre}
                  </h3>
                  
                  <div className="space-y-4">
                    {industria.casos.map((caso, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold mb-2">{caso.titulo}</h4>
                        <div className="flex gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-green-600" />
                            {caso.ahorro}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4 text-blue-600" />
                            ROI: {caso.roi}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Casos de Éxito Detallados */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Historias de Transformación
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {casosExito.map((caso, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{caso.empresa}</h3>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm font-semibold text-red-600 mb-1">Problema:</p>
                      <p className="text-gray-600">{caso.problema}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold text-blue-600 mb-1">Solución:</p>
                      <p className="text-gray-600">{caso.solucion}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold text-green-600 mb-1">Resultado:</p>
                      <p className="text-lg font-bold text-gray-900">{caso.resultado}</p>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <p className="text-gray-600 italic">"{caso.testimonial}"</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl p-12 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">
                ¿Listo para escribir tu historia de éxito?
              </h3>
              <p className="text-gray-100 mb-8 max-w-2xl mx-auto">
                Agenda una consulta gratuita y descubre cómo podemos automatizar 
                los procesos específicos de tu industria.
              </p>
              <Link href="https://calendly.com/orlando-tuimpulsalab/30min"
                    target="_blank"
                    className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition">
                Comenzar mi Transformación
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navegación */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/servicios/operaciones" 
                  className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition">
              <ArrowLeft className="w-5 h-5" />
              Volver a Operaciones
            </Link>
            <Link href="/servicios/operaciones/precios"
                  className="text-green-600 hover:text-green-700 font-semibold">
              Ver Planes y Precios →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
