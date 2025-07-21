'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { COMPANY_INFO, IMAGES } from '@/lib/constants'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image
            src={IMAGES.isotipo}
            alt={COMPANY_INFO.name}
            width={50}
            height={50}
            className="mr-3"
          />
          <span className="text-2xl font-bold text-gray-800">{COMPANY_INFO.name}</span>
        </Link>
        
        {/* Desktop Navigation - Simple y limpio */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/#diagnostico" className="text-gray-600 hover:text-gray-900 transition-colors">
            Diagnóstico 3D
          </Link>
          <Link href="/herramientas" className="text-gray-600 hover:text-gray-900 transition-colors">
            Herramientas
          </Link>
          <Link href="/servicios/finanzas" className="text-gray-600 hover:text-gray-900 transition-colors">
            Finanzas
          </Link>
          <Link href="/servicios/operaciones" className="text-gray-600 hover:text-gray-900 transition-colors">
            Operaciones
          </Link>
          <Link href="/servicios/marketing" className="text-gray-600 hover:text-gray-900 transition-colors">
            Marketing
          </Link>
          <Link href="/#equipo" className="text-gray-600 hover:text-gray-900 transition-colors">
            Quiénes Somos
          </Link>
          <Link href="/#contacto" className="text-gray-600 hover:text-gray-900 transition-colors">
            Contacto
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="px-4 py-2 space-y-2">
            <Link 
              href="/#diagnostico" 
              className="block text-gray-600 hover:text-gray-900 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Diagnóstico 3D
            </Link>
            <Link 
              href="/herramientas"
              className="block text-gray-600 hover:text-gray-900 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Herramientas
            </Link>
            <Link 
              href="/servicios/finanzas" 
              className="block text-gray-600 hover:text-gray-900 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Finanzas
            </Link>
            <Link 
              href="/servicios/operaciones" 
              className="block text-gray-600 hover:text-gray-900 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Operaciones
            </Link>
            <Link 
              href="/servicios/marketing" 
              className="block text-gray-600 hover:text-gray-900 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketing
            </Link>
            <Link 
              href="/#equipo" 
              className="block text-gray-600 hover:text-gray-900 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Quiénes Somos
            </Link>
            <Link 
              href="/#contacto" 
              className="block text-gray-600 hover:text-gray-900 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}