'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { COMPANY_INFO, IMAGES } from '@/lib/constants'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showToolsPreview, setShowToolsPreview] = useState(false)
  const [showMobileToolsPreview, setShowMobileToolsPreview] = useState(false)
  const toolsRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cerrar preview cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setShowToolsPreview(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Manejo del hover con delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setShowToolsPreview(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowToolsPreview(false)
    }, 300)
  }

  // Secciones de la página de herramientas
  const toolsSections = [
    { 
      name: 'Arsenal Tecnológico', 
      href: '/herramientas#arsenal-tecnologico',
      description: '24+ herramientas IA de élite'
    },
    { 
      name: 'Agentes Impulsa Lab', 
      href: '/herramientas#agentes-ia',
      description: 'Automatización inteligente 24/7'
    },
    { 
      name: 'Noticias IA Aplicada', 
      href: '/herramientas#noticias-ia',
      description: 'Últimas tendencias en IA'
    }
  ]

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
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
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/#diagnostico" className="text-gray-600 hover:text-gray-900 transition-colors">
            Diagnóstico 3D
          </Link>
          
          {/* Herramientas con Preview */}
          <div
            ref={toolsRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link 
              href="/herramientas" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Herramientas
            </Link>
            
            {/* Preview de secciones */}
            {showToolsPreview && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-80 bg-white rounded-lg shadow-2xl border border-gray-100 p-4 before:content-[''] before:absolute before:top-[-8px] before:left-1/2 before:transform before:-translate-x-1/2 before:w-0 before:h-0 before:border-l-[8px] before:border-l-transparent before:border-r-[8px] before:border-r-transparent before:border-b-[8px] before:border-b-white">
                <div className="text-sm text-gray-500 mb-3">Explorar secciones:</div>
                <div className="space-y-3">
                  {toolsSections.map((section, index) => (
                    <Link
                      key={section.name}
                      href={section.href}
                      className="block group"
                    >
                      <div className="p-3 rounded-lg hover:bg-blue-50 transition-colors">
                        <div className="font-medium text-gray-800 group-hover:text-[#002D62]">
                          {section.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {section.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <Link 
                    href="/herramientas" 
                    className="text-xs text-[#002D62] hover:underline"
                  >
                    Ver todas las herramientas →
                  </Link>
                </div>
              </div>
            )}
          </div>

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
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden bg-white border-t transition-all duration-300 ${
        isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <nav className="px-4 py-2 space-y-2">
          <Link href="/#diagnostico" 
                className="block text-gray-600 hover:text-gray-900 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}>
            Diagnóstico 3D
          </Link>
          
          {/* Herramientas móvil */}
          <div>
            <div 
              className="text-gray-600 hover:text-gray-900 py-2 transition-colors"
              onClick={() => setShowMobileToolsPreview(!showMobileToolsPreview)}
            >
              <div className="flex items-center justify-between">
                <span>Herramientas</span>
                <span className="text-xs text-gray-400">
                  {showMobileToolsPreview ? '−' : '+'}
                </span>
              </div>
            </div>
            
            {/* Preview móvil */}
            {showMobileToolsPreview && (
              <div className="ml-4 mt-2 space-y-2 pb-2">
                {toolsSections.map((section) => (
                  <Link
                    key={section.name}
                    href={section.href}
                    className="block text-sm text-gray-500 hover:text-[#002D62] py-1"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setShowMobileToolsPreview(false)
                    }}
                  >
                    {section.name}
                  </Link>
                ))}
                <Link
                  href="/herramientas"
                  className="block text-sm font-medium text-[#002D62] hover:underline py-1 mt-2"
                  onClick={() => {
                    setIsMenuOpen(false)
                    setShowMobileToolsPreview(false)
                  }}
                >
                  Ver todas →
                </Link>
              </div>
            )}
          </div>

          <Link href="/servicios/finanzas" 
                className="block text-gray-600 hover:text-gray-900 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}>
            Finanzas
          </Link>
          <Link href="/servicios/operaciones" 
                className="block text-gray-600 hover:text-gray-900 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}>
            Operaciones
          </Link>
          <Link href="/servicios/marketing" 
                className="block text-gray-600 hover:text-gray-900 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}>
            Marketing
          </Link>
          <Link href="/#equipo" 
                className="block text-gray-600 hover:text-gray-900 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}>
            Quiénes Somos
          </Link>
          <Link href="/#contacto" 
                className="block text-gray-600 hover:text-gray-900 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}>
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  )
}