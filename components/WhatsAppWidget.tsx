'use client'

import { useState, useEffect } from 'react'
import { X, MessageCircle, Send, Clock, ChevronDown } from 'lucide-react'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp, doc, updateDoc, arrayUnion } from 'firebase/firestore'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  buttons?: string[]
}

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [showInitialButtons, setShowInitialButtons] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const [mounted, setMounted] = useState(false)
  const [businessOpen, setBusinessOpen] = useState(true)

  const phoneNumber = '+13479043196'
  const businessHours = {
    weekdays: '9:00 AM - 8:00 PM EST',
    saturday: '9:00 AM - 2:00 PM EST',
    sunday: 'Cerrado'
  }

  const initialButtons = [
    'Quiero mi Diagnóstico 3D Gratis',
    'Información sobre servicios',
    'Ver planes y precios',
    'Hablar con un especialista',
    'Tengo otra consulta'
  ]

  const responses: { [key: string]: string } = {
    'Quiero mi Diagnóstico 3D Gratis': '¡Excelente decisión! 🎯 El Diagnóstico 3D es una sesión estratégica de 30 minutos donde analizaremos la "coordenada" de crecimiento de tu negocio en Finanzas, Operaciones y Marketing. Es el primer paso para tomar el control.\n\n📅 Puedes agendar directamente en el calendario de Orlando aquí: https://calendly.com/orlando-tuimpulsalab/30min',
    
    'Información sobre servicios': '¡Claro! En Impulsa Lab te ayudamos a potenciar tu negocio a través de 3 pilares:\n\n💰 **FINANZAS:** Implementamos un sistema de control para que visualices tu rentabilidad en tiempo real.\n\n⚙️ **OPERACIONES:** Automatizamos tareas repetitivas con Agentes de IA para que recuperes tu tiempo.\n\n📈 **MARKETING:** Creamos tu identidad de marca y una estrategia de contenidos para que atraigas a más clientes.\n\n¿Te gustaría profundizar en alguno de ellos?',
    
    'Ver planes y precios': 'Nuestros servicios están diseñados para adaptarse a la realidad de tu negocio. El primer paso recomendado es la "Auditoría de Potencial de Crecimiento".\n\nNuestros planes de implementación comienzan en:\n\n🚀 **Plan "Piloto Automático":** Desde $1,500\n🚀 **Plan "Cohete":** Desde $2,500 + suscripción mensual\n\n💡 Solo a través del diagnóstico podemos crear una propuesta real y a tu medida, que incluso podría tener un costo menor dependiendo de tus necesidades específicas.',
    
    'Hablar con un especialista': 'Por supuesto. Por favor, deja tu mensaje y uno de nuestros especialistas te responderá dentro de nuestro horario de atención:\n\n🕐 L-V: 9am-8pm EST\n🕐 Sáb: 9am-2pm EST\n\nSi es urgente, la forma más rápida de conectar es agendando un Diagnóstico 3D en nuestro calendario.',
    
    'Tengo otra consulta': 'Entendido. Por favor, escribe tu pregunta a continuación y te responderemos a la brevedad posible durante nuestro horario de atención. 📝'
  }

  // Función para verificar horario de negocio
  const checkBusinessOpen = () => {
    const now = new Date()
    const estOffset = -5
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
    const estTime = new Date(utc + (3600000 * estOffset))
    
    const day = estTime.getDay()
    const hour = estTime.getHours()
    
    if (day === 0) return false
    if (day === 6) return hour >= 9 && hour < 14
    return hour >= 9 && hour < 20
  }

  useEffect(() => {
    setMounted(true)
    setBusinessOpen(checkBusinessOpen())
    
    const interval = setInterval(() => {
      setBusinessOpen(checkBusinessOpen())
    }, 60000)
    
    return () => clearInterval(interval)
  }, [])

  // Crear nueva sesión en Firebase
  const createSession = async () => {
    try {
      console.log('Creando nueva sesión...')
      
      const sessionData = {
        startedAt: serverTimestamp(),
        lastActivity: serverTimestamp(),
        messages: [],
        userInfo: {
          userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
          url: typeof window !== 'undefined' ? window.location.href : ''
        },
        status: 'active',
        isBusinessOpen: businessOpen
      }

      const docRef = await addDoc(collection(db, 'chat-sessions'), sessionData)
      setSessionId(docRef.id)
      console.log('✅ Sesión creada con ID:', docRef.id)
      return docRef.id
    } catch (error) {
      console.error('❌ Error creando sesión:', error)
      return null
    }
  }

  // Agregar mensaje a sesión existente
  const addMessageToSession = async (message: Message, currentSessionId?: string) => {
    const sessionToUse = currentSessionId || sessionId
    
    if (!sessionToUse) {
      console.error('❌ No hay ID de sesión para guardar el mensaje')
      return
    }

    try {
      console.log(`📝 Guardando mensaje (isUser: ${message.isUser}):`, message.text.substring(0, 50))
      
      const messageData = {
        text: message.text,
        isUser: message.isUser,
        timestamp: new Date().toISOString() // Usar ISO string en lugar de serverTimestamp para debugging
      }
      
      const sessionRef = doc(db, 'chat-sessions', sessionToUse)
      await updateDoc(sessionRef, {
        messages: arrayUnion(messageData),
        lastActivity: serverTimestamp()
      })
      
      console.log(`✅ Mensaje guardado en sesión ${sessionToUse}`)
    } catch (error) {
      console.error('❌ Error guardando mensaje:', error)
    }
  }

  // Inicializar chat
  useEffect(() => {
    if (isOpen && messages.length === 0 && !sessionId) {
      const initChat = async () => {
        // Primero crear la sesión
        const newSessionId = await createSession()
        
        if (newSessionId) {
          // Luego agregar el mensaje de bienvenida
          const welcomeMessage: Message = {
            id: '1',
            text: '¡Hola! 👋 Soy Nova, la asistente virtual de Impulsa Lab. Gracias por visitarnos. ¿En qué podemos ayudarte hoy?',
            isUser: false,
            timestamp: new Date()
          }
          
          setMessages([welcomeMessage])
          await addMessageToSession(welcomeMessage, newSessionId)
        }
      }
      
      initChat()
    }
  }, [isOpen, sessionId])

  const handleButtonClick = async (buttonText: string) => {
    console.log('🔘 Botón clickeado:', buttonText)
    
    // Crear mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: buttonText,
      isUser: true,
      timestamp: new Date()
    }
    
    // Actualizar UI
    setMessages(prev => [...prev, userMessage])
    setShowInitialButtons(false)
    setIsTyping(true)
    
    // Guardar en Firebase INMEDIATAMENTE
    await addMessageToSession(userMessage)

    // Simular respuesta del bot
    setTimeout(async () => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[buttonText] || 'Gracias por tu mensaje. Te responderemos pronto.',
        isUser: false,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
      
      // Guardar respuesta del bot
      await addMessageToSession(botResponse)
    }, 1500)
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    console.log('💬 Enviando mensaje personalizado:', inputValue)

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)
    
    // Guardar mensaje del usuario INMEDIATAMENTE
    await addMessageToSession(userMessage)

    setTimeout(async () => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Gracias por tu mensaje. Un especialista de Impulsa Lab te responderá dentro de nuestro horario de atención. Si necesitas una respuesta inmediata, puedes agendar una llamada en: https://calendly.com/orlando-tuimpulsalab/30min',
        isUser: false,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
      
      // Guardar respuesta del bot
      await addMessageToSession(botResponse)
    }, 1500)
  }

  const handleWhatsAppRedirect = () => {
    if (sessionId) {
      console.log('📱 Redirigiendo a WhatsApp, sesión:', sessionId)
      updateDoc(doc(db, 'chat-sessions', sessionId), {
        status: 'moved_to_whatsapp',
        movedToWhatsAppAt: serverTimestamp()
      })
    }

    const text = messages
      .filter(m => m.isUser)
      .map(m => m.text)
      .join('\n')
    const encodedText = encodeURIComponent(text || '¡Hola! Me gustaría obtener más información sobre Impulsa Lab.')
    window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank')
  }

  const handleCloseChat = () => {
    if (sessionId && messages.length > 1) {
      console.log('🔒 Cerrando chat, sesión:', sessionId)
      updateDoc(doc(db, 'chat-sessions', sessionId), {
        status: 'closed',
        closedAt: serverTimestamp(),
        totalMessages: messages.length
      })
    }
    
    // Resetear todo
    setIsOpen(false)
    setMessages([])
    setSessionId('')
    setShowInitialButtons(true)
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 to-blue-700 
                   text-white rounded-full p-4 shadow-lg hover:shadow-xl transform 
                   transition-all duration-300 hover:scale-110 ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Abrir chat de WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        {mounted && !businessOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
        )}
      </button>

      {/* Widget de chat */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        <div className="bg-white rounded-2xl shadow-2xl w-[370px] h-[600px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-semibold">Nova - Impulsa Lab</h3>
                  {mounted && (
                    <p className="text-xs opacity-90 flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${businessOpen ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                      {businessOpen ? 'En línea' : 'Fuera de horario'}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleCloseChat}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Horario */}
            <details className="text-xs">
              <summary className="cursor-pointer opacity-80 hover:opacity-100 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Horario de atención
                <ChevronDown className="w-3 h-3" />
              </summary>
              <div className="mt-2 space-y-1 ml-4">
                <p>L-V: {businessHours.weekdays}</p>
                <p>Sáb: {businessHours.saturday}</p>
                <p>Dom: {businessHours.sunday}</p>
              </div>
            </details>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.isUser 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isUser ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString('es-ES', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}

            {/* Botones de opciones */}
            {showInitialButtons && messages.length === 1 && !isTyping && (
              <div className="space-y-2">
                {initialButtons.map((button) => (
                  <button
                    key={button}
                    onClick={() => handleButtonClick(button)}
                    className="w-full text-left bg-white hover:bg-gray-50 text-gray-700 
                             px-4 py-3 rounded-xl shadow-sm transition-all duration-200 
                             hover:shadow-md text-sm border border-gray-100"
                  >
                    {button}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full 
                         focus:outline-none focus:border-blue-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 
                         transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleWhatsAppRedirect}
              className="w-full mt-2 text-xs text-gray-500 hover:text-gray-700 
                       transition-colors flex items-center justify-center gap-1"
            >
              Continuar en WhatsApp
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}