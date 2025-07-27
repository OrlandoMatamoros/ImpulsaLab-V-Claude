'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { COMPANY_INFO, IMAGES } from '@/lib/constants'

type Language = 'ES' | 'EN'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showMobileTools, setShowMobileTools] = useState(false)
  const [currentLang, setCurrentLang] = useState<Language>('ES')

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang) {
      setCurrentLang(savedLang)
    }
  }, [])

  const handleLanguageToggle = () => {
    const newLang = currentLang === 'ES' ? 'EN' : 'ES'
    setCurrentLang(newLang)
    localStorage.setItem('language', newLang)
  }

  const toolsItems = [
    { 
      name: 'Ver Todas', 
      href: '/herramientas',
      className: 'dropdown-item-all'
    },
    { 
      name: 'Arsenal Tecnológico', 
      href: '/herramientas/arsenal',
      className: 'dropdown-item-arsenal'
    },
    { 
      name: 'Agentes IA', 
      href: '/herramientas/agentes',
      className: 'dropdown-item-agentes'
    },
    { 
      name: 'Prompt Designer', 
      href: '/herramientas/prompt-designer',
      className: 'dropdown-item-prompt'
    },
    { 
      name: 'Agente de Noticias', 
      href: '/herramientas/noticias',
      className: 'dropdown-item-noticias'
    }
  ]

  return (
    <>
      {/* CSS puro para el dropdown */}
      <style jsx global>{`
        /* Dropdown Container */
        .tools-dropdown-container {
          position: relative;
        }

        /* Dropdown Menu */
        .tools-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 10px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
          min-width: 240px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          z-index: 50;
          padding: 8px 0;
        }

        /* Mostrar dropdown al hover */
        .tools-dropdown-container:hover .tools-dropdown-menu {
          opacity: 1;
          visibility: visible;
          margin-top: 6px;
        }

        /* Triángulo superior */
        .tools-dropdown-menu::before {
          content: '';
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 12px;
          height: 12px;
          background: white;
          transform: translateX(-50%) rotate(45deg);
          box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.05);
        }

        /* Items del dropdown */
        .dropdown-item {
          display: block;
          padding: 10px 20px;
          color: #374151;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        /* Primer item (Ver Todas) */
        .dropdown-item-all {
          font-weight: 600;
          border-bottom: 1px solid #f3f4f6;
          margin-bottom: 4px;
          padding-bottom: 12px;
        }

        .dropdown-item-all:hover {
          background: #f9fafb;
          color: #111827;
        }

        /* Arsenal Tecnológico - Azul */
        .dropdown-item-arsenal:hover {
          background: #dbeafe;
          color: #1e40af;
        }

        /* Agentes IA - Púrpura */
        .dropdown-item-agentes:hover {
          background: #f3e8ff;
          color: #7c3aed;
        }

        /* Prompt Designer - Naranja */
        .dropdown-item-prompt:hover {
          background: #fed7aa;
          color: #ea580c;
        }

        /* Agente de Noticias - Negro */
        .dropdown-item-noticias:hover {
          background: #1f2937;
          color: #ffffff;
        }

        /* Link de Herramientas */
        .tools-link {
          position: relative;
          color: #374151;
          font-weight: 500;
          text-decoration: none;
          padding: 8px 4px;
          transition: color 0.2s ease;
        }

        .tools-link:hover {
          color: #002D62;
        }

        /* Línea inferior animada */
        .tools-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #002D62;
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }

        .tools-dropdown-container:hover .tools-link::after {
          transform: scaleX(1);
        }

        /* Ajuste para que el dropdown no se cierre al mover el mouse */
        .tools-dropdown-container::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          height: 10px;
        }
      `}</style>

      <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Image
                src={IMAGES.isotipo}
                alt={COMPANY_INFO.name}
                width={40}
                height={40}
                className="w-10 h-10 md:w-12 md:h-12 mr-2 md:mr-3"
              />
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#002D62] to-blue-600 bg-clip-text text-transparent">
                {COMPANY_INFO.name}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex items-center space-x-6 lg:space-x-8">
                <Link href="/#diagnostico" className="text-gray-700 hover:text-[#002D62] transition-colors font-medium">
                  Diagnóstico 3D
                </Link>
                
                {/* Herramientas con dropdown mejorado */}
                <div className="tools-dropdown-container">
                  <Link 
                    href="/herramientas"
                    className="tools-link"
                  >
                    Herramientas
                  </Link>
                  
                  {/* Dropdown con CSS puro */}
                  <div className="tools-dropdown-menu">
                    {toolsItems.map((item) => (
                      <Link 
                        key={item.href}
                        href={item.href} 
                        className={`dropdown-item ${item.className}`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link href="/servicios/finanzas" className="text-gray-700 hover:text-[#002D62] transition-colors font-medium">
                  Finanzas
                </Link>
                <Link href="/servicios/operaciones" className="text-gray-700 hover:text-[#002D62] transition-colors font-medium">
                  Operaciones
                </Link>
                <Link href="/servicios/marketing" className="text-gray-700 hover:text-[#002D62] transition-colors font-medium">
                  Marketing
                </Link>
                <Link href="/#equipo" className="text-gray-700 hover:text-[#002D62] transition-colors font-medium">
                  Quiénes Somos
                </Link>
                <Link href="/#contacto" className="text-gray-700 hover:text-[#002D62] transition-colors font-medium">
                  Contacto
                </Link>
              </nav>

              {/* Auth section */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleLanguageToggle}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#002D62] transition-colors"
                  title={currentLang === 'ES' ? 'Switch to English' : 'Cambiar a Español'}
                >
                  {currentLang === 'ES' ? (
                    <>
                      <span className="text-lg">🇬🇧</span>
                      <span>English</span>
                    </>
                  ) : (
                    <>
                      <span className="text-lg">🇪🇸</span>
                      <span>Español</span>
                    </>
                  )}
                </button>
                
                <Link 
                  href="/login"
                  className="px-5 py-2 text-sm font-medium text-[#002D62] border-2 border-[#002D62] rounded-lg hover:bg-[#002D62] hover:text-white transition-all duration-300"
                >
                  {currentLang === 'ES' ? 'Iniciar sesión' : 'Login'}
                </Link>
                <Link 
                  href="/signup"
                  className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#002D62] to-blue-600 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  {currentLang === 'ES' ? 'Crear cuenta' : 'Sign up'}
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center gap-2">
              <button 
                onClick={handleLanguageToggle}
                className="p-2 text-2xl"
                title={currentLang === 'ES' ? 'EN' : 'ES'}
              >
                {currentLang === 'ES' ? '🇬🇧' : '🇪🇸'}
              </button>
              
              <button 
                className="p-2 text-gray-700 hover:text-[#002D62] transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <nav className="px-4 py-4 space-y-1">
              {/* Auth buttons móvil */}
              <div className="flex gap-3 pb-4 mb-4 border-b border-gray-100">
                <Link 
                  href="/login"
                  className="flex-1 px-4 py-3 text-sm font-medium text-[#002D62] border-2 border-[#002D62] rounded-lg text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {currentLang === 'ES' ? 'Iniciar sesión' : 'Login'}
                </Link>
                <Link 
                  href="/signup"
                  className="flex-1 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#002D62] to-blue-600 rounded-lg text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {currentLang === 'ES' ? 'Crear cuenta' : 'Sign up'}
                </Link>
              </div>

              <Link 
                href="/#diagnostico" 
                className="block text-gray-700 font-medium hover:text-[#002D62] py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Diagnóstico 3D
              </Link>
              
              {/* Herramientas móvil con todas las opciones */}
              <div>
                <button
                  className="flex items-center justify-between w-full text-gray-700 font-medium hover:text-[#002D62] py-3"
                  onClick={() => setShowMobileTools(!showMobileTools)}
                >
                  <span>Herramientas</span>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${showMobileTools ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showMobileTools && (
                  <div className="pl-4 space-y-1 mt-2">
                    {toolsItems.map((item, index) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block text-gray-600 hover:text-[#002D62] py-2 pl-4 text-sm ${
                          index === 0 ? 'border-b border-gray-100 pb-3 mb-2 font-medium' : ''
                        }`}
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

              <Link 
                href="/servicios/finanzas" 
                className="block text-gray-700 font-medium hover:text-[#002D62] py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Finanzas
              </Link>
              <Link 
                href="/servicios/operaciones" 
                className="block text-gray-700 font-medium hover:text-[#002D62] py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Operaciones
              </Link>
              <Link 
                href="/servicios/marketing" 
                className="block text-gray-700 font-medium hover:text-[#002D62] py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Marketing
              </Link>
              <Link 
                href="/#equipo" 
                className="block text-gray-700 font-medium hover:text-[#002D62] py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Quiénes Somos
              </Link>
              <Link 
                href="/#contacto" 
                className="block text-gray-700 font-medium hover:text-[#002D62] py-3"
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