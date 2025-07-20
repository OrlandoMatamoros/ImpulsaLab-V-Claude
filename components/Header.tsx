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
    { name: 'Arsenal Tecnológico', href: '/arsenal-tecnologico' },
    { name: 'Agentes IA', href: '/agentes-ia' },
    { name: 'Noticias IA', href: '/noticias-ia' }
  ]

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .tools-container {
          animation: fadeInScale 0.3s ease-out forwards;
        }
        
        .tool-item {
          animation: slideIn 0.3s ease-out forwards;
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
            
            {/* Herramientas - Diseño Estilizado */}
            <div
              ref={toolsRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                Herramientas
              </span>
              
              {/* Herramientas desplegadas horizontalmente */}
              {showTools && (
                <div className="absolute top-0 left-full ml-2 flex items-center space-x-2 tools-container">
                  <span className="text-gray-400 mx-2">→</span>
                  {toolsItems.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="bg-gradient-to-r from-[#002D62] to-blue-600 text-white px-4 py-2 rounded-full text-sm hover:shadow-lg transition-all hover:scale-105 whitespace-nowrap tool-item"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {item.name}
                    </Link>
                  ))}
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
                onClick={() => setShowMobileTools(!showMobileTools)}
              >
                Herramientas
              </div>
              
              {/* Herramientas móvil expandidas */}
              {showMobileTools && (
                <div className="pl-4 space-y-2 mt-2">
                  {toolsItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block bg-gradient-to-r from-[#002D62] to-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                      onClick={() => {
                        setIsMenuOpen(false)
                        setShowMobileTools(false)
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
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
    </>
  )
}