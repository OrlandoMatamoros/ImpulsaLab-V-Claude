'use client'

import Link from 'next/link'
import { ArrowLeft, Check, DollarSign, Info } from 'lucide-react'

export default function PreciosPage() {
  const planes = [
    {
      nombre: "Automatización Simple",
      descripcion: "Para tareas básicas y repetitivas",
      precio_mensual: 99,
      precio_unico: 475,
      costo_implementacion: 333, // 70% de 475
      workflows: "3,626 workflows disponibles",
      caracteristicas: [
        "Notificaciones automáticas",
        "Emails simples", 
        "Alertas básicas",
        "Soporte por email"
      ]
    },
    {
      nombre: "Automatización Media",
      descripcion: "Para procesos multi-paso",
      precio_mensual: 149,
      precio_unico: 750,
      costo_implementacion: 525, // 70% de 750
      workflows: "130 workflows especializados",
      caracteristicas: [
        "Sincronizaciones complejas",
        "Workflows multi-paso",
        "Integraciones avanzadas",
        "Soporte prioritario"
      ],
      popular: true
    },
    {
      nombre: "Automatización Compleja",
      descripcion: "Con IA y análisis avanzado",
      precio_mensual: 249,
      precio_unico: 1250,
      costo_implementacion: 875, // 70% de 1250
      workflows: "1,914 workflows avanzados",
      caracteristicas: [
        "Inteligencia Artificial",
        "Machine Learning",
        "Multi-integración",
        "Soporte 24/7 dedicado"
      ]
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
            <span className="text-green-600 font-semibold">Planes y Precios</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 to-emerald-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-6">
              <DollarSign className="w-5 h-5" />
              <span>Basado en 5,670 workflows procesados</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Planes de Automatización Inteligente
            </h1>
            <p className="text-xl text-gray-200">
              Precios transparentes y flexibles para cada etapa de tu negocio
            </p>
          </div>
        </div>
      </section>

      {/* Planes */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Info sobre implementación */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-12">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900">Sobre los costos de implementación</p>
                  <p className="text-blue-700 text-sm mt-1">
                    Los planes de suscripción incluyen un costo único de implementación del 70% del precio de instalación, 
                    ya que requieren la misma configuración inicial y personalización.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {planes.map((plan, index) => (
                <div key={index} 
                     className={`rounded-xl shadow-lg p-8 border-2 transition relative
                       ${plan.popular 
                         ? 'bg-green-50 border-green-500 transform scale-105' 
                         : 'bg-white border-gray-200 hover:border-green-500'}`}>
                  
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        MÁS POPULAR
                      </span>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2">{plan.nombre}</h3>
                  <p className="text-gray-600 mb-6">{plan.descripcion}</p>
                  
                  {/* Opción 1: Pago único */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-500 mb-1">Opción 1: Pago único</p>
                    <p className="text-3xl font-bold text-gray-900">${plan.precio_unico}</p>
                    <p className="text-xs text-gray-500">Una sola vez</p>
                  </div>

                  {/* Opción 2: Suscripción */}
                  <div className="bg-green-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-500 mb-1">Opción 2: Suscripción</p>
                    <p className="text-3xl font-bold text-green-600">${plan.precio_mensual}/mes</p>
                    <p className="text-xs text-gray-500">
                      + ${plan.costo_implementacion} implementación
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-gray-700 mb-4">
                    {plan.workflows}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {plan.caracteristicas.map((car, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-gray-700">{car}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="https://calendly.com/orlando-tuimpulsalab/30min" 
                        target="_blank"
                        className="block w-full text-center py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
                    Agendar Diagnóstico 3D
                  </Link>
                </div>
              ))}
            </div>

            {/* Calculadora ROI */}
            <div className="mt-16 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">
                Calculadora de ROI: ¿Cuánto Podrías Ahorrar?
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="text-sm text-gray-600 mb-2">Salario promedio empleado admin</div>
                  <div className="text-2xl font-bold text-gray-900">$800/mes</div>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="text-sm text-gray-600 mb-2">Costo agente IA promedio</div>
                  <div className="text-2xl font-bold text-green-600">$149/mes</div>
                </div>
                <div className="bg-white rounded-lg p-6 text-center">
                  <div className="text-sm text-gray-600 mb-2">Ahorro mensual</div>
                  <div className="text-2xl font-bold text-blue-600">$651/mes</div>
                </div>
              </div>
              <p className="text-center text-gray-600 mt-4">
                *Basado en automatización del 60% de tareas administrativas
              </p>
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
            <Link href="/servicios/operaciones/casos"
                  className="text-green-600 hover:text-green-700 font-semibold">
              Ver Casos de Uso →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
