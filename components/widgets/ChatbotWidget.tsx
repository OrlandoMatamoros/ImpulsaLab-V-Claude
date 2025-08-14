'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Bot, Send, Minimize2, Maximize2 } from 'lucide-react'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp, doc, updateDoc, arrayUnion } from 'firebase/firestore'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  options?: string[]
}

interface ChatFlow {
  [key: string]: {
    response: string
    options?: string[]
    action?: string
  }
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const [showOptions, setShowOptions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Flujo de conversación del chatbot
  const chatFlow: ChatFlow = {
    'inicio': {
      response: '¡Hola! 👋 Soy Atlas, el asistente virtual de Impulsa Lab. Estoy aquí para ayudarte a descubrir cómo podemos transformar tu negocio. ¿Qué te gustaría saber?',
      options: [
        '📊 Quiero hacer el Diagnóstico 3D',
        '💡 ¿Qué es Impulsa Lab?',
        '🚀 Ver servicios disponibles',
        '🛠️ Explorar herramientas gratuitas',
        '💬 Hablar con un humano'
      ]
    },
    '📊 Quiero hacer el Diagnóstico 3D': {
      response: '¡Excelente decisión! 🎯 El Diagnóstico 3D es una evaluación completa de tu negocio en 3 dimensiones:\n\n📈 **Marketing**: Analizamos tu presencia digital y estrategia de ventas\n💰 **Finanzas**: Evaluamos tu salud financiera y oportunidades de crecimiento\n⚙️ **Operaciones**: Identificamos procesos a optimizar con IA\n\n⏱️ Toma solo 10-15 minutos y es GRATIS.',
      options: [
        '🔗 Comenzar diagnóstico ahora',
        '📅 Agendar con un especialista',
        '❓ Más información',
        '🔙 Volver al menú'
      ]
    },
    '💡 ¿Qué es Impulsa Lab?': {
      response: 'Impulsa Lab es tu socio estratégico en transformación digital 🚀\n\nAyudamos a negocios como el tuyo a:\n✅ Automatizar procesos con IA\n✅ Tomar decisiones basadas en datos\n✅ Escalar operaciones eficientemente\n✅ Aumentar ventas con marketing digital\n\nTodo comienza con nuestro Diagnóstico 3D gratuito.',
      options: [
        '🎥 Ver video explicativo',
        '📊 Hacer diagnóstico',
        '👥 Conocer al equipo',
        '🔙 Volver al menú'
      ]
    },
    '🚀 Ver servicios disponibles': {
      response: 'Nuestros servicios están diseñados para impulsar cada área de tu negocio:\n\n💰 **FINANZAS**\n• Dashboards en tiempo real\n• Control de flujo de caja\n• Análisis de rentabilidad\n\n📈 **MARKETING**\n• Estrategia de contenidos\n• Automatización de ventas\n• Publicidad digital optimizada\n\n⚙️ **OPERACIONES**\n• Agentes de IA personalizados\n• Automatización de procesos\n• Optimización de recursos',
      options: [
        '💰 Más sobre Finanzas',
        '📈 Más sobre Marketing',
        '⚙️ Más sobre Operaciones',
        '💵 Ver planes y precios',
        '🔙 Volver al menú'
      ]
    },
    '🛠️ Explorar herramientas gratuitas': {
      response: '¡Tenemos herramientas gratuitas para ti! 🎁\n\n🤖 **Agentes de IA**: Asistentes virtuales para tareas específicas\n📰 **ImpulsaNews**: Las últimas noticias de tu industria\n💡 **Prompt Designer**: Crea prompts efectivos para IA\n🎯 **Arsenal Digital**: Recursos y plantillas gratuitas\n\nTodas disponibles sin costo en nuestra sección de herramientas.',
      options: [
        '🔗 Ir a herramientas',
        '🤖 Probar un agente IA',
        '📊 Mejor hacer diagnóstico',
        '🔙 Volver al menú'
      ]
    },
    '💬 Hablar con un humano': {
      response: 'Por supuesto, te conecto con nuestro equipo humano 🤝\n\nOpciones disponibles:\n📱 WhatsApp: Respuesta en minutos\n📅 Videollamada: Agenda 30 min gratis\n✉️ Email: orlando@impulsalab.com\n\n¿Cuál prefieres?',
      options: [
        '📱 Abrir WhatsApp',
        '📅 Agendar videollamada',
        '✉️ Enviar email',
        '🔙 Volver al menú'
      ]
    },
    // Respuestas a opciones secundarias
    '🔗 Comenzar diagnóstico ahora': {
      response: 'Perfecto, te llevaré al diagnóstico. ¡Prepárate para descubrir el potencial oculto de tu negocio! 🚀',
      action: 'redirect:/diagnostico'
    },
    '📅 Agendar con un especialista': {
      response: 'Te conectaré con el calendario de Orlando, nuestro CEO. Podrás elegir el horario que mejor te convenga para una sesión estratégica personalizada.',
      action: 'redirect:https://calendly.com/orlando-tuimpulsalab/30min'
    },
    '📱 Abrir WhatsApp': {
      response: 'Te estoy redirigiendo a WhatsApp. ¡Hablamos en segundos! 💬',
      action: 'whatsapp'
    },
    '🔗 Ir a herramientas': {
      response: 'Te llevo a nuestra sección de herramientas gratuitas. ¡Disfrútalas! 🛠️',
      action: 'redirect:/herramientas'
    },
    '🔙 Volver al menú': {
      response: '¿En qué más puedo ayudarte?',
      options: [
        '📊 Quiero hacer el Diagnóstico 3D',
        '💡 ¿Qué es Impulsa Lab?',
        '🚀 Ver servicios disponibles',
        '🛠️ Explorar herramientas gratuitas',
        '💬 Hablar con un humano'
      ]
    }
  }

  // Crear sesión en Firebase
  const createSession = async () => {
    try {
      const sessionData = {
        type: 'chatbot',
        startedAt: serverTimestamp(),
        lastActivity: serverTimestamp(),
        messages: [],
        userInfo: {
          userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
          url: typeof window !== 'undefined' ? window.location.href : '',
          screenSize: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : ''
        },
        status: 'active'
      }

      const docRef = await addDoc(collection(db, 'chatbot-sessions'), sessionData)
      setSessionId(docRef.id)
      return docRef.id
    } catch (error) {
      console.error('Error creando sesión de chatbot:', error)
      return null
    }
  }

  // Guardar mensaje en Firebase
  const saveMessageToSession = async (message: Message, currentSessionId?: string) => {
    const sessionToUse = currentSessionId || sessionId
    if (!sessionToUse) return

    try {
      const messageData = {
        text: message.text,
        isUser: message.isUser,
        timestamp: new Date().toISOString(),
        options: message.options || []
      }
      
      const sessionRef = doc(db, 'chatbot-sessions', sessionToUse)
      await updateDoc(sessionRef, {
        messages: arrayUnion(messageData),
        lastActivity: serverTimestamp()
      })
    } catch (error) {
      console.error('Error guardando mensaje:', error)
    }
  }

  // Inicializar chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat()
    }
  }, [isOpen])

  const initializeChat = async () => {
    const newSessionId = await createSession()
    
    if (newSessionId) {
      const welcomeMessage: Message = {
        id: '1',
        text: chatFlow.inicio.response,
        isUser: false,
        timestamp: new Date(),
        options: chatFlow.inicio.options
      }
      
      setMessages([welcomeMessage])
      await saveMessageToSession(welcomeMessage, newSessionId)
    }
  }

  // Manejar selección de opciones
  const handleOptionClick = async (option: string) => {
    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: option,
      isUser: true,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setShowOptions(false)
    setIsTyping(true)
    
    await saveMessageToSession(userMessage)

    // Simular tiempo de respuesta
    setTimeout(async () => {
      const flowResponse = chatFlow[option] || {
        response: 'Interesante pregunta. Un especialista de nuestro equipo te puede dar una respuesta más detallada. ¿Te gustaría agendar una llamada?',
        options: ['📅 Sí, agendar llamada', '🔙 Volver al menú']
      }

      // Manejar acciones especiales
      if (flowResponse.action) {
        handleAction(flowResponse.action)
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: flowResponse.response,
        isUser: false,
        timestamp: new Date(),
        options: flowResponse.options
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
      if (flowResponse.options) {
        setShowOptions(true)
      }
      
      await saveMessageToSession(botMessage)
    }, 1000)
  }

  // Manejar acciones especiales
  const handleAction = (action: string) => {
    if (action.startsWith('redirect:')) {
      const url = action.replace('redirect:', '')
      setTimeout(() => {
        if (url.startsWith('http')) {
          window.open(url, '_blank')
        } else {
          window.location.href = url
        }
      }, 1500)
    } else if (action === 'whatsapp') {
      const phoneNumber = '+13479043169'
      const text = encodeURIComponent('Hola, vengo del chatbot de Impulsa Lab')
      window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank')
    }
  }

  // Manejar envío de mensajes personalizados
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)
    
    await saveMessageToSession(userMessage)

    // Respuesta genérica para mensajes personalizados
    setTimeout(async () => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Gracias por tu mensaje. Para darte la mejor respuesta posible, te recomiendo agendar una llamada con nuestro equipo.',
        isUser: false,
        timestamp: new Date(),
        options: ['📅 Agendar llamada', '📱 Ir a WhatsApp', '🔙 Volver al menú']
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
      setShowOptions(true)
      
      await saveMessageToSession(botMessage)
    }, 1500)
  }

  // Cerrar chat
  const handleCloseChat = () => {
    if (sessionId && messages.length > 1) {
      updateDoc(doc(db, 'chatbot-sessions', sessionId), {
        status: 'closed',
        closedAt: serverTimestamp(),
        totalMessages: messages.length
      })
    }
    
    setIsOpen(false)
    setMessages([])
    setSessionId('')
    setShowOptions(true)
    setIsMinimized(false)
  }

  return (
    <>
      {/* Botón flotante del chatbot */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-40 bg-gradient-to-r from-purple-600 to-purple-700 
                   text-white rounded-full p-4 shadow-lg hover:shadow-xl transform 
                   transition-all duration-300 hover:scale-110 ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Abrir chatbot"
      >
        <Bot className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
        </span>
      </button>

      {/* Widget del chatbot */}
      <div className={`fixed bottom-6 left-6 z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        <div className={`bg-white rounded-2xl shadow-2xl w-[380px] max-w-[calc(100vw-3rem)] 
                        ${isMinimized ? 'h-16' : 'h-[600px] max-h-[calc(100vh-6rem)]'} 
                        flex flex-col overflow-hidden transition-all duration-300`}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-semibold">Atlas - Asistente IA</h3>
                  <p className="text-xs opacity-90">Impulsa Lab</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleCloseChat}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Mensajes */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div key={message.id}>
                    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        message.isUser 
                          ? 'bg-purple-600 text-white rounded-br-none' 
                          : 'bg-white text-gray-800 rounded-bl-none shadow-sm border border-gray-100'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.isUser ? 'text-purple-200' : 'text-gray-400'
                        }`}>
                          {message.timestamp.toLocaleTimeString('es-ES', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                    
                    {/* Opciones */}
                    {!message.isUser && message.options && showOptions && (
                      <div className="mt-3 space-y-2 ml-2">
                        {message.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className="w-full text-left bg-white hover:bg-purple-50 text-gray-700 
                                     px-4 py-3 rounded-xl shadow-sm transition-all duration-200 
                                     hover:shadow-md text-sm border border-purple-100 hover:border-purple-300
                                     hover:translate-x-1"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Indicador de escritura */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-gray-100">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></span>
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribe tu pregunta..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full 
                             bg-white text-gray-900 placeholder-gray-500
                             focus:outline-none focus:border-purple-500 focus:ring-2 
                             focus:ring-purple-200 text-sm"
                    style={{
                      WebkitTextFillColor: '#111827',
                      opacity: 1
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 
                             transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!inputValue.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center mt-2">
                  Potenciado por IA 🤖 • Respuestas instantáneas 24/7
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}