'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { COMPANY_INFO, IMAGES } from '@/lib/constants'
import { ChevronDown } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
    }
  }, [])

  // Manejo del hover con delay para mejor UX
  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setIsDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false)
    }, 300)
  }

  // Opciones del dropdown de Herramientas
  const toolsDropdownItems = [
    { name: 'Arsenal Tecnológico', href: '/arsenal-tecnologico', icon: '🚀' },
    { name: 'Agentes Impulsa Lab', href: '/agentes-ia', icon: '🤖' },
    { name: 'Noticias IA Aplicada', href: '/noticias-ia', icon: '📰' }
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
          
          {/* Herramientas con Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link 
              href="/herramientas" 
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <span>Herramientas</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-300 ${
                  isDropdownOpen ? 'rotate-180' : ''
                } group-hover:text-[#002D62]`}
              />
            </Link>
            
            {/* Dropdown Menu Desktop */}
            <div 
              className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                isDropdownOpen 
                  ? 'opacity-100 translate-y-0 visible' 
                  : 'opacity-0 -translate-y-2 invisible'
              }`}
              aria-label="Herramientas submenu"
              role="menu"
            >
              {toolsDropdownItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-[#002D62] transition-all group ${
                    index !== 0 ? 'border-t border-gray-100' : ''
                  }`}
                  role="menuitem"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
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
          
          {/* Herramientas móvil con dropdown */}
          <div>
            <button
              onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
              className="flex items-center justify-between w-full text-gray-600 hover:text-gray-900 py-2 transition-colors"
            >
              <Link 
                href="/herramientas"
                onClick={(e) => {
                  if (isMobileDropdownOpen) {
                    e.preventDefault()
                    setIsMobileDropdownOpen(false)
                  } else {
                    setIsMenuOpen(false)
                  }
                }}
                className="flex-1 text-left"
              >
                Herramientas
              </Link>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-300 ${
                  isMobileDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {/* Dropdown móvil */}
            <div className={`pl-4 space-y-1 transition-all duration-300 ${
              isMobileDropdownOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
              {toolsDropdownItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-500 hover:text-[#002D62] py-2 transition-colors"
                  onClick={() => {
                    setIsMenuOpen(false)
                    setIsMobileDropdownOpen(false)
                  }}
                >
                  <span>{item.icon}</span>
                  <span className="text-sm">{item.name}</span>
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
  )
}