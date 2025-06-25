'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-[#002D62]">Impulsa Lab</span>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/diagnostico-3d" className="text-gray-600 hover:text-gray-900">
              Diagnóstico 3D
            </Link>
            <Link href="/servicios/finanzas" className="text-gray-600 hover:text-gray-900">
              Finanzas
            </Link>
            <Link href="/servicios/operaciones" className="text-gray-600 hover:text-gray-900">
              Operaciones
            </Link>
            <Link href="/servicios/marketing" className="text-gray-600 hover:text-gray-900">
              Marketing
            </Link>
            <Link href="/quienes-somos" className="text-gray-600 hover:text-gray-900">
              Quiénes Somos
            </Link>
            <Link href="/contacto" className="text-gray-600 hover:text-gray-900">
              Contacto
            </Link>
          </nav>

          {/* Botón CTA Desktop */}
          <div className="hidden md:block">
            <Link href="/agendar" className="bg-[#002D62] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
              Agendar Consulta
            </Link>
          </div>

          {/* Botón de menú móvil */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navegación Móvil */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <Link href="/diagnostico-3d" 
                    className="block text-gray-600 hover:text-gray-900 py-2"
                    onClick={() => setIsMenuOpen(false)}>
                Diagnóstico 3D
              </Link>
              <Link href="/servicios/finanzas" 
                    className="block text-gray-600 hover:text-gray-900 py-2"
                    onClick={() => setIsMenuOpen(false)}>
                Finanzas
              </Link>
              <Link href="/servicios/operaciones" 
                    className="block text-gray-600 hover:text-gray-900 py-2"
                    onClick={() => setIsMenuOpen(false)}>
                Operaciones
              </Link>
              <Link href="/servicios/marketing" 
                    className="block text-gray-600 hover:text-gray-900 py-2"
                    onClick={() => setIsMenuOpen(false)}>
                Marketing
              </Link>
              <Link href="/quienes-somos" 
                    className="block text-gray-600 hover:text-gray-900 py-2"
                    onClick={() => setIsMenuOpen(false)}>
                Quiénes Somos
              </Link>
              <Link href="/contacto" 
                    className="block text-gray-600 hover:text-gray-900 py-2"
                    onClick={() => setIsMenuOpen(false)}>
                Contacto
              </Link>
              <Link href="/agendar" 
                    className="block bg-[#002D62] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors mt-4 text-center"
                    onClick={() => setIsMenuOpen(false)}>
                Agendar Consulta
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}