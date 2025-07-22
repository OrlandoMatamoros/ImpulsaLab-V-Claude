'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, type Language } from '@/utils/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.ES
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ES')
  const [t, setT] = useState(translations.ES)

  useEffect(() => {
    // Detectar idioma del navegador o cargar el guardado
    const savedLang = localStorage.getItem('language') as Language
    const browserLang = navigator.language.startsWith('es') ? 'ES' : 'EN'
    const initialLang = savedLang || browserLang
    
    setLanguage(initialLang)
    setT(translations[initialLang])
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    setT(translations[lang])
    localStorage.setItem('language', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}