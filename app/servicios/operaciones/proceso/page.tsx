'use client'

import Link from 'next/link'
import { ArrowLeft, Zap, Clock, Check } from 'lucide-react'
import { LINKS } from '@/lib/constants'

export default function ProcesoPage() {
  const pasos = [
    {
      numero: "1",
      titulo: "Diagnóstico Operativo",
      descripcion: "Analizamos tu flujo de trabajo actual para identificar los cuellos de botella y las tareas repetitivas que más tiempo te consumen.",
      duracion: "1-2 días",
      entregables: ["Mapa de procesos", "Análisis de tiempo", "Oportunidades de mejora"]
    },
    {
      numero: "2",
      titulo: "Diseño del Agente de IA",
      descripcion: "Definimos la 'personalidad' de tu agente, las tareas que ejecutará y las plataformas con las que se integrará.",
      duracion: "3-5 días",
      entregables: ["Arquitectura de solución", "Flujos de trabajo", "Integraciones definidas"]
    },
    {
      numero: "3",
      titulo: "Desarrollo y Entrenamiento",
      descripcion: "Construimos el cerebro de tu agente y lo entrenamos con la información específica de tu negocio.",
      duracion: "1-2 semanas",
      entregables: ["Agente configurado", "Base de conocimiento", "Pruebas iniciales"]
    },
    {
      numero: "4",
      titulo: "Implementación e Integración",
      descripcion: "Conectamos el agente a tus sistemas y lo ponemos en marcha con pruebas exhaustivas.",
      duracion: "3-5 días",
      entregables: ["Integración completa", "Pruebas de usuario", "Documentación"]
    },
    {
      numero: "5",
      titulo: "Monitoreo y Optimización",
      descripcion: "Monitoreamos el rendimiento y hacemos ajustes continuos para maximizar resultados.",
      duracion: "Continuo",
      entregables: ["Dashboard de métricas", "Reportes mensuales", "Optimizaciones"]
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
            <span className="text-indigo-600 font-semibold">Proceso</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-6">
              <Zap className="w-5 h-5" />
              <span>Metodología probada</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              De Manual a Automático en 5 Pasos
            </h1>
            <p className="text-xl text-gray-200">
              Nuestro proceso garantiza una transformación exitosa y sin fricciones
            </p>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {pasos.map((paso, index) => (
              <div key={index} className="relative mb-12">
                <div className={`flex gap-8 items-start ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Número */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center text-3xl font-bold">
                      {paso.numero}
                    </div>
                  </div>
                  
                  {/* Contenido */}
                  <div className="flex-1 bg-gray-50 rounded-xl p-8">
                    <h3 className="text-2xl font-bold mb-2">{paso.titulo}</h3>
                    <p className="text-gray-600 mb-4">{paso.descripcion}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-5 h-5 text-indigo-600" />
                      <span className="font-semibold">Duración: {paso.duracion}</span>
                    </div>
                    
                    <div>
                      <p className="font-semibold mb-2">Entregables:</p>
                      <ul className="space-y-1">
                        {paso.entregables.map((entregable, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5" />
                            <span className="text-gray-600">{entregable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Línea conectora */}
                {index < pasos.length - 1 && (
                  <div className="absolute left-10 top-20 bottom-0 w-0.5 bg-indigo-200"></div>
                )}
              </div>
            ))}
            
            {/* CTA */}
            <div className="mt-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Comienza tu Transformación Hoy</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                En menos de 30 días puedes tener tu negocio completamente automatizado. 
                Agenda tu diagnóstico gratuito ahora.
              </p>
              <Link href="https://calendly.com/orlando-tuimpulsalab/30min"
                    target="_blank"
                    className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition">
                Iniciar Diagnóstico Gratis
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
                  className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition">
              <ArrowLeft className="w-5 h-5" />
              Volver a Operaciones
            </Link>
            <Link href="/servicios/operaciones/agentes"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Conocer Agente 4IA →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
