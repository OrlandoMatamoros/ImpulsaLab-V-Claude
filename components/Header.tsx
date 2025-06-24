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
        <div className="flex items-center">
          <Image
            src={IMAGES.isotipo}
            alt={COMPANY_INFO.name}
            width={50}
            height={50}
            className="mr-3"
          />
  <span className="text-2xl font-bold text-gray-800">{COMPANY_INFO.name}</span>
</div>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="#diagnostico" className="text-gray-600 hover:text-gray-900">
            Diagnóstico 3D
          </Link>
          <Link href="#equipo" className="text-gray-600 hover:text-gray-900">
            Quiénes Somos
          </Link>
          <Link href="#contacto" className="text-gray-600 hover:text-gray-900">
            Contacto
          </Link>
        </nav>

        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="px-4 py-2 space-y-2">
            <Link href="#diagnostico" 
                  className="block text-gray-600 hover:text-gray-900 py-2"
                  onClick={() => setIsMenuOpen(false)}>
              Diagnóstico 3D
            </Link>
            <Link href="#equipo" 
                  className="block text-gray-600 hover:text-gray-900 py-2"
                  onClick={() => setIsMenuOpen(false)}>
              Quiénes Somos
            </Link>
            <Link href="#contacto" 
                  className="block text-gray-600 hover:text-gray-900 py-2"
                  onClick={() => setIsMenuOpen(false)}>
              Contacto
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}