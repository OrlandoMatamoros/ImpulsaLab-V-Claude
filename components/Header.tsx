'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { COMPANY_INFO, IMAGES } from '@/lib/constants'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showTools, setShowTools] = useState(false)
  const [showMobileTools, setShowMobileTools] = useState(false)
  const toolsRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cerrar cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setShowTools(false)
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

  // Manejo del hover
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setShowTools(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowTools(false)
    }, 200)
  }

  // Herramientas
  const toolsItems = [
    { name: 'Arsenal Tecnológico', href: '/herramientas#arsenal' },
    { name: 'Agentes IA', href: '/herramientas#agentes' },
    { name: 'Noticias IA', href: '/herramientas#noticias' }
  ]

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .tools-popup {
          animation: fadeInUp 0.3s ease-out forwards;
        }
        
        .tool-link {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>

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
            
            {/* Herramientas - Sin flecha, con popup estilizado */}
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
              
              {/* Popup estilizado que aparece debajo */}
              {showTools && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 tools-popup">
                  <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-1 min-w-[200px]">
                    {toolsItems.map((item, index) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#002D62] hover:to-blue-600 hover:text-white rounded-md transition-all tool-link"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  {/* Pequeño triángulo que apunta hacia arriba */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-white"></div>
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
            
            {/* Herramientas móvil - primero el link principal */}
            <div className="border-b border-gray-100 pb-2">
              <Link 
                href="/herramientas"
                className="block text-gray-600 hover:text-gray-900 py-2 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Herramientas
              </Link>
              
              {/* Sub-herramientas siempre visibles en móvil */}
              <div className="pl-4 space-y-1 mt-1">
                {toolsItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-sm text-gray-500 hover:text-[#002D62] py-1 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    → {item.name}
                  </Link>
                ))}
              </div>
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
    </>
  )
}