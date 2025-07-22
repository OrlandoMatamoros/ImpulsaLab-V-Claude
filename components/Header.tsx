'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { COMPANY_INFO, IMAGES } from '@/lib/constants'

type Language = 'ES' | 'EN'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showMobileTools, setShowMobileTools] = useState(false)
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const [currentLang, setCurrentLang] = useState<Language>('ES')
  const langRef = useRef<HTMLDivElement>(null)

  // Cerrar dropdown de idioma al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setShowLangDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Cargar idioma guardado
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang) {
      setCurrentLang(savedLang)
    }
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang)
    localStorage.setItem('language', lang)
    setShowLangDropdown(false)
    // Aquí puedes añadir lógica para cambiar el idioma del sitio
  }

  const languages = [
    { code: 'ES', flag: '🇪🇸', name: 'Español' },
    { code: 'EN', flag: '🇬🇧', name: 'English' }
  ]

  const currentLanguage = languages.find(lang => lang.code === currentLang)

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-4">
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
            <span className="text-xl md:text-2xl font-bold text-gray-800">{COMPANY_INFO.name}</span>
          </Link>
          
          {/* Desktop Navigation y Auth */}
          <div className="hidden md:flex items-center gap-6">
            {/* Navegación principal */}
            <nav className="flex items-center space-x-6">
              <Link href="/#diagnostico" className="text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base">
                Diagnóstico 3D
              </Link>
              <Link href="/herramientas" className="text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base">
                Herramientas
              </Link>
              <Link href="/servicios/finanzas" className="text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base">
                Finanzas
              </Link>
              <Link href="/servicios/operaciones" className="text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base">
                Operaciones
              </Link>
              <Link href="/servicios/marketing" className="text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base">
                Marketing
              </Link>
              <Link href="/#equipo" className="text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base">
                Quiénes Somos
              </Link>
              <Link href="/#contacto" className="text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base">
                Contacto
              </Link>
            </nav>

            {/* Separador */}
            <div className="h-6 w-px bg-gray-300"></div>

            {/* Auth section */}
            <div className="flex items-center gap-3">
              {/* Selector de idioma */}
              <div ref={langRef} className="relative">
                <button 
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-[#002D62] transition-colors rounded-lg hover:bg-gray-50"
                >
                  <span className="text-lg">{currentLanguage?.flag}</span>
                  <span className="hidden lg:block">{currentLanguage?.code}</span>
                  <svg className={`w-4 h-4 transition-transform ${showLangDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown de idiomas */}
                <div className={`absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden transition-all duration-200 ${
                  showLangDropdown ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code as Language)}
                      className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3 text-sm transition-colors ${
                        currentLang === lang.code ? 'bg-blue-50 text-[#002D62]' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Botones de autenticación */}
              <Link 
                href="/login"
                className="px-4 py-2 text-sm font-medium text-[#002D62] border border-[#002D62] rounded-lg hover:bg-blue-50 transition-all duration-300"
              >
                Iniciar sesión
              </Link>
              <Link 
                href="/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#002D62] to-blue-600 rounded-lg hover:opacity-90 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Crear cuenta
              </Link>
            </div>
          </div>

          {/* Mobile: Selector de idioma + Menu button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Selector de idioma móvil (solo bandera) */}
            <button 
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="p-2 text-2xl relative"
            >
              {currentLanguage?.flag}
              
              {/* Dropdown móvil */}
              {showLangDropdown && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLanguageChange(lang.code as Language)
                      }}
                      className={`px-4 py-3 text-left flex items-center gap-3 text-sm min-w-[120px] ${
                        currentLang === lang.code ? 'bg-blue-50' : ''
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </button>

            {/* Menu hamburguesa */}
            <button 
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
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
        <div className="md:hidden bg-white border-t">
          <nav className="px-4 py-4 space-y-3">
            {/* Botones de autenticación móvil */}
            <div className="flex gap-3 pb-3 border-b border-gray-100">
              <Link 
                href="/login"
                className="flex-1 px-4 py-3 text-sm font-medium text-[#002D62] border border-[#002D62] rounded-lg text-center active:bg-blue-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Iniciar sesión
              </Link>
              <Link 
                href="/signup"
                className="flex-1 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#002D62] to-blue-600 rounded-lg text-center active:opacity-90 transition-opacity"
                onClick={() => setIsMenuOpen(false)}
              >
                Crear cuenta
              </Link>
            </div>

            {/* Enlaces de navegación */}
            <Link 
              href="/#diagnostico" 
              className="block text-gray-600 active:text-gray-900 py-3 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Diagnóstico 3D
            </Link>
            
            {/* Herramientas móvil con despliegue */}
            <div>
              <div 
                className="flex items-center justify-between text-gray-600 active:text-gray-900 py-3 transition-colors"
                onClick={() => setShowMobileTools(!showMobileTools)}
              >
                <Link 
                  href="/herramientas"
                  onClick={(e) => {
                    if (showMobileTools) {
                      e.preventDefault()
                      setShowMobileTools(false)
                    } else {
                      setIsMenuOpen(false)
                    }
                  }}
                  className="flex-1"
                >
                  Herramientas
                </Link>
                <span className={`transition-transform duration-300 text-gray-600 ${showMobileTools ? 'rotate-180' : ''}`}>
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
                    className="block text-sm text-gray-500 active:text-[#002D62] py-2 pl-4 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setShowMobileTools(false)
                    }}
                  >
                    Arsenal Tecnológico
                  </Link>
                  <Link
                    href="/agentes-ia"
                    className="block text-sm text-gray-500 active:text-[#002D62] py-2 pl-4 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setShowMobileTools(false)
                    }}
                  >
                    Agentes IA
                  </Link>
                  <Link
                    href="/noticias-ia"
                    className="block text-sm text-gray-500 active:text-[#002D62] py-2 pl-4 transition-colors"
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
              className="block text-gray-600 active:text-gray-900 py-3 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Finanzas
            </Link>
            <Link 
              href="/servicios/operaciones" 
              className="block text-gray-600 active:text-gray-900 py-3 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Operaciones
            </Link>
            <Link 
              href="/servicios/marketing" 
              className="block text-gray-600 active:text-gray-900 py-3 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketing
            </Link>
            <Link 
              href="/#equipo" 
              className="block text-gray-600 active:text-gray-900 py-3 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Quiénes Somos
            </Link>
            <Link 
              href="/#contacto" 
              className="block text-gray-600 active:text-gray-900 py-3 transition-colors"
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