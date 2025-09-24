'use client'

import OperationsEnhancedSection from '@/components/operations/OperationsEnhancedSection'
import Link from 'next/link'
import { ArrowLeft, Bot } from 'lucide-react'

export default function AgentesPage() {
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
            <span className="text-purple-600 font-semibold">Agente 4IA</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full mb-6">
              <Bot className="w-5 h-5" />
              <span>Exclusivo Impulsa Lab</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Agente Unificador 4IA
            </h1>
            <p className="text-xl text-gray-200">
              El único sistema que consulta ChatGPT, Claude y Gemini simultáneamente
            </p>
          </div>
        </div>
      </section>

      {/* Componente principal */}
      <OperationsEnhancedSection />

      {/* Navegación */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/servicios/operaciones" 
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition">
              <ArrowLeft className="w-5 h-5" />
              Volver a Operaciones
            </Link>
            <Link href="/servicios/operaciones/arsenal"
                  className="text-purple-600 hover:text-purple-700 font-semibold">
              Explorar Arsenal →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
