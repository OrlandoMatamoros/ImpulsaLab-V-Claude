'use client'

import { MessageCircle } from 'lucide-react'

export default function WhatsAppWidgetSimple() {
  const phoneNumber = '+13479043196'
  const message = '¡Hola! Me gustaría obtener más información sobre Impulsa Lab.'

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-[9999] bg-gradient-to-r from-green-500 to-green-600 
                 text-white rounded-full p-4 shadow-lg hover:shadow-xl transform 
                 transition-all duration-300 hover:scale-110"
      aria-label="Abrir WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>
    </button>
  )
}