'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { COMPANY_INFO, IMAGES } from '@/lib/constants'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showTools, setShowTools] = useState(false)
  const toolsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setShowTools(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <style jsx>{`
        /* Estilo del submenu mejorado */
        .tools-submenu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(${showTools ? '0' : '-10px'});
          margin-top: 0.75rem;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          min-width: 220px;
          opacity: ${showTools ? '1' : '0'};
          visibility: ${showTools ? 'visible' : 'hidden'};
          transition: all 0.3s ease;
          z-index: 50;
        }
        
        /* Flecha triangular que apunta hacia arriba */
        .tools-submenu::before {
          content: '';
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 6px solid white;
          z-index: 1;
        }
        
        /* Borde de la flecha */
        .tools-submenu::after {
          content: '';
          position: absolute;
          top: -7px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-bottom: 7px solid #e5e7eb;
          z-index: 0;
        }
        
        .tools-submenu a {
          display: block;
          padding: 0.875rem 1.25rem;
          color: #4b5563;
          text-decoration: none;
          transition: all 0.2s;
          font-size: 0.95rem;
        }
        
        .tools-submenu a:not(:last-child) {
          border-bottom: 1px solid #f3f4f6;
        }
        
        .tools-submenu a:hover {
          background-color: #002D62;
          color: white;
        }
        
        .tools-submenu a:first-child:hover {
          border-top-left-radius: 0.4rem;
          border-top-right-radius: 0.4rem;
        }
        
        .tools-submenu a:last-child:hover {
          border-bottom-left-radius: 0.4rem;
          border-bottom-right-radius: 0.4rem;
        }
      `}</style>

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
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/#diagnostico" className="text-gray-600 hover:text-gray-900 transition-colors py-2">
              Diagnóstico 3D
            </Link>
            
            {/* Herramientas con submenú mejorado */}
            <div 
              ref={toolsRef}
              className="relative"
              onMouseEnter={() => setShowTools(true)}
              onMouseLeave={() => setShowTools(false)}
            >
              <Link 
                href="/herramientas" 
                className="text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                Herramientas
              </Link>
              
              {/* Submenu desplegable */}
              <div className="tools-submenu">
                <Link href="/arsenal-tecnologico">
                  Arsenal Tecnológico
                </Link>
                <Link href="/agentes-ia">
                  Agentes IA
                </Link>
                <Link href="/noticias-ia">
                  Noticias IA
                </Link>
              </div>
            </div>

            <Link href="/servicios/finanzas" className="text-gray-600 hover:text-gray-900 transition-colors py-2">
              Finanzas
            </Link>
            <Link href="/servicios/operaciones" className="text-gray-600 hover:text-gray-900 transition-colors py-2">
              Operaciones
            </Link>
            <Link href="/servicios/marketing" className="text-gray-600 hover:text-gray-900 transition-colors py-2">
              Marketing
            </Link>
            <Link href="/#equipo" className="text-gray-600 hover:text-gray-900 transition-colors py-2">
              Quiénes Somos
            </Link>
            <Link href="/#contacto" className="text-gray-600 hover:text-gray-900 transition-colors py-2">
              Contacto
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-gray-600 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-gray-600"></div>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="px-4 py-2 space-y-2">
              <Link 
                href="/#diagnostico" 
                className="block text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Diagnóstico 3D
              </Link>
              
              <Link 
                href="/herramientas"
                className="block text-gray-600 hover:text-gray-900 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Herramientas
              </Link>
              
              <div className="pl-6 space-y-1 border-l-2 border-gray-200 ml-2">
                <Link
                  href="/arsenal-tecnologico"
                  className="block text-sm text-gray-500 hover:text-[#002D62] py-1.5 pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Arsenal Tecnológico
                </Link>
                <Link
                  href="/agentes-ia"
                  className="block text-sm text-gray-500 hover:text-[#002D62] py-1.5 pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Agentes IA
                </Link>
                <Link
                  href="/noticias-ia"
                  className="block text-sm text-gray-500 hover:text-[#002D62] py-1.5 pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Noticias IA
                </Link>
              </div>

              <Link 
                href="/servicios/finanzas" 
                className="block text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Finanzas
              </Link>
              <Link 
                href="/servicios/operaciones" 
                className="block text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Operaciones
              </Link>
              <Link 
                href="/servicios/marketing" 
                className="block text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Marketing
              </Link>
              <Link 
                href="/#equipo" 
                className="block text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Quiénes Somos
              </Link>
              <Link 
                href="/#contacto" 
                className="block text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}