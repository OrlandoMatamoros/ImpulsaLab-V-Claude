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

  // Cargar idioma guardado
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

  return (
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
          
          {/* Desktop Navigation y Auth */}
          <div className="hidden md:flex items-center gap-6">
            {/* Navegación principal */}
            <nav className="flex items-center space-x-6 lg:space-x-8">
              <Link href="/#diagnostico" className="text-gray-700 hover:text-[#002D62] transition-colors font-medium">
                Diagnóstico 3D
              </Link>
              <Link href="/herramientas" className="text-gray-700 hover:text-[#002D62] transition-colors font-medium">
                Herramientas
              </Link>
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
              {/* Toggle de idioma - Muestra la opción OPUESTA */}
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
              
              {/* Botones de autenticación */}
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

          {/* Mobile: Selector de idioma + Menu button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Toggle de idioma móvil - Muestra la opción OPUESTA */}
            <button 
              onClick={handleLanguageToggle}
              className="p-2 text-2xl"
              title={currentLang === 'ES' ? 'EN' : 'ES'}
            >
              {currentLang === 'ES' ? '🇬🇧' : '🇪🇸'}
            </button>

            {/* Menu hamburguesa */}
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
            {/* Botones de autenticación móvil */}
            <div className="flex gap-3 pb-4 mb-4 border-b border-gray-100">
              <Link 
                href="/login"
                className="flex-1 px-4 py-3 text-sm font-medium text-[#002D62] border-2 border-[#002D62] rounded-lg text-center active:bg-[#002D62] active:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {currentLang === 'ES' ? 'Iniciar sesión' : 'Login'}
              </Link>
              <Link 
                href="/signup"
                className="flex-1 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#002D62] to-blue-600 rounded-lg text-center active:opacity-90 transition-opacity"
                onClick={() => setIsMenuOpen(false)}
              >
                {currentLang === 'ES' ? 'Crear cuenta' : 'Sign up'}
              </Link>
            </div>

            {/* Enlaces de navegación */}
            <Link 
              href="/#diagnostico" 
              className="block text-gray-700 font-medium hover:text-[#002D62] py-3 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Diagnóstico 3D
            </Link>
            
            {/* Herramientas móvil con despliegue */}
            <div>
              <div 
                className="flex items-center justify-between text-gray-700 font-medium hover:text-[#002D62] py-3 transition-colors cursor-pointer"
                onClick={() => setShowMobileTools(!showMobileTools)}
              >
                <span>Herramientas</span>
                <span className={`text-gray-400 transition-transform duration-300 ${showMobileTools ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </div>
              
              {/* Sub-herramientas móvil */}
              <div className={`overflow-hidden transition-all duration-300 ${
                showMobileTools ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="pl-6 space-y-1 border-l-2 border-gray-200 ml-2 mt-2">
                  <Link
                    href="/arsenal-tecnologico"
                    className="block text-sm text-gray-600 hover:text-[#002D62] py-2 pl-4 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setShowMobileTools(false)
                    }}
                  >
                    Arsenal Tecnológico
                  </Link>
                  <Link
                    href="/agentes-ia"
                    className="block text-sm text-gray-600 hover:text-[#002D62] py-2 pl-4 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setShowMobileTools(false)
                    }}
                  >
                    Agentes IA
                  </Link>
                  <Link
                    href="/noticias-ia"
                    className="block text-sm text-gray-600 hover:text-[#002D62] py-2 pl-4 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setShowMobileTools(false)
                    }}
                  >
                    Noticias IA
                  </Link>
                </div>
              </div>
            </div>

            <Link 
              href="/servicios/finanzas" 
              className="block text-gray-700 font-medium hover:text-[#002D62] py-3 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Finanzas
            </Link>
            <Link 
              href="/servicios/operaciones" 
              className="block text-gray-700 font-medium hover:text-[#002D62] py-3 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Operaciones
            </Link>
            <Link 
              href="/servicios/marketing" 
              className="block text-gray-700 font-medium hover:text-[#002D62] py-3 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketing
            </Link>
            <Link 
              href="/#equipo" 
              className="block text-gray-700 font-medium hover:text-[#002D62] py-3 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Quiénes Somos
            </Link>
            <Link 
              href="/#contacto" 
              className="block text-gray-700 font-medium hover:text-[#002D62] py-3 transition-colors"
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