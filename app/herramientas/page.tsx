'use client'

import ToolsSection from '@/components/ToolsSection'
import ProtectedSection from '@/components/ProtectedSection'

export default function HerramientasPage() {
  return (
    <main className="min-h-screen">
      {/* Header y descripción - SIEMPRE VISIBLE */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Hub de Herramientas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Arsenal completo de herramientas de IA para impulsar tu negocio
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-full">
            <span className="font-medium">Más de 100 herramientas disponibles</span>
          </div>
        </div>
      </section>

      {/* Contenido principal - PROTEGIDO */}
      <ProtectedSection
        message="Regístrate gratis para acceder a nuestro Hub completo de herramientas de IA y acelerar tu transformación digital"
        showPreview={true}
        previewBlur={false}
      >
        <ToolsSection />
      </ProtectedSection>
    </main>
  )
}