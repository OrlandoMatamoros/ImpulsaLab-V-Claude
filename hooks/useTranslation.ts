// Archivo: /hooks/useTranslation.ts

import { useState, useEffect } from 'react'
import { translations, type Language, type Translations } from '@/utils/translations'

export function useTranslation() {
  const [language, setLanguage] = useState<Language>('ES')
  const [t, setT] = useState<Translations>(translations.ES)

  useEffect(() => {
    // Obtener idioma guardado o usar el del navegador
    const savedLang = localStorage.getItem('language') as Language
    const browserLang = navigator.language.startsWith('en') ? 'EN' : 'ES'
    const currentLang = savedLang || browserLang

    setLanguage(currentLang)
    setT(translations[currentLang])
  }, [])

  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang)
    setT(translations[newLang])
    localStorage.setItem('language', newLang)
  }

  return { t, language, changeLanguage }
}

// Hook para usar solo en el contexto del idioma actual
export function useLanguage() {
  const [language, setLanguage] = useState<Language>('ES')

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang) {
      setLanguage(savedLang)
    }
  }, [])

  return language
}