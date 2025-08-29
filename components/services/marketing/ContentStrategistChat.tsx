'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Loader2 } from 'lucide-react';

type Message = {
  type: 'bot' | 'user';
  text?: string;
  content?: React.ReactNode;
  timestamp: Date;
};

const ContentStrategistChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userResponses, setUserResponses] = useState<UserResponses>({
    industry: '',
    idealClient: '',
    objective: ''
  });
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const questions = [
    "Primero, ¿a qué industria pertenece tu negocio y qué producto o servicio principal ofreces?",
    "¡Genial! Ahora, describe en una frase a tu cliente ideal. ¿Qué gran problema o necesidad le resuelves?",
    "Entendido. Y por último, ¿cuál es tu objetivo número uno con tu contenido este mes?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      addBotMessage("¡Hola! 👋 Soy el Estratega de Contenidos IA de Impulsa Lab. Estoy aquí para ayudarte a generar ideas frescas y potentes para tu marketing en menos de un minuto.");
      setTimeout(() => {
        addBotMessage("Para darte las mejores ideas, necesito entender un poco sobre tu negocio. Solo son 3 preguntas rápidas:");
        setTimeout(() => {
          addBotMessage(questions[0]);
        }, 1000);
      }, 1500);
    }, 500);
  }, []);

  const addBotMessage = (text: string) => {
    setMessages(prev => [...prev, { type: 'bot', text, timestamp: new Date() }]);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { type: 'user', text, timestamp: new Date() }]);
  };

  type UserResponses = {
    industry: string;
    idealClient: string;
    objective: string;
  };

  const generateContentPlan = async (responses: UserResponses) => {
    const { industry, idealClient, objective } = responses;
    
    const plan = {
      objective: objective,
      instagram: [
        {
          type: "Carrusel Educativo",
          content: `Los 5 errores más comunes en ${industry} y cómo evitarlos`
        },
        {
          type: "Reel Detrás de Cámaras",
          content: `Muestra cómo trabajas con clientes en ${industry}. La autenticidad vende.`
        },
        {
          type: "Post de Testimonio",
          content: `Comparte el éxito de un cliente similar a "${idealClient}"`
        }
      ],
      blog: [
        `7 Estrategias Probadas para ${industry} en 2025`,
        `Cómo ${idealClient} Puede Multiplicar Sus Resultados`
      ],
      video: {
        title: `Mito vs Realidad en ${industry}`,
        description: "Video de 30 segundos desmintiendo un mito común y mostrando tu solución"
      },
      email: {
        subject: `[${idealClient}] 3 Oportunidades Que Estás Perdiendo`,
        content: "Email de valor con CTA suave al final"
      }
    };

    return plan;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    addUserMessage(input);
    const responseKeys = ['industry', 'idealClient', 'objective'];
    const newResponses = { 
      ...userResponses, 
      [responseKeys[currentStep]]: input 
    };
    setUserResponses(newResponses);
    setInput('');
    
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
      setTimeout(() => {
        addBotMessage(questions[currentStep + 1]);
      }, 1000);
    } else {
      setIsLoading(true);
      addBotMessage("¡Excelente! Estoy analizando tus respuestas y preparando un plan personalizado... ⚙️🧠");
      
      setTimeout(async () => {
        const plan = await generateContentPlan(newResponses);
        setIsLoading(false);
        
        const planMessage = (
          <div className="bg-purple-50 rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-bold text-purple-900">
              📈 Tu Plan de Contenidos Personalizado
            </h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-purple-800 mb-2">
                  🎯 Objetivo: {plan.objective}
                </h4>
              </div>

              <div>
                <h4 className="font-semibold text-purple-800 mb-2">
                  �� Instagram (3 posts esta semana):
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  {plan.instagram.map((item, i) => (
                    <li key={i} className="pl-4">
                      → <strong>{item.type}:</strong> {item.content}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-purple-800 mb-2">
                  ✍️ Blog (2 artículos este mes):
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  {plan.blog.map((title, i) => (
                    <li key={i} className="pl-4">→ "{title}"</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-purple-800 mb-2">
                  🎬 Video Viral:
                </h4>
                <p className="text-sm text-gray-700 pl-4">
                  → <strong>{plan.video.title}:</strong> {plan.video.description}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-purple-800 mb-2">
                  📧 Email Marketing:
                </h4>
                <p className="text-sm text-gray-700 pl-4">
                  → <strong>Asunto:</strong> {plan.email.subject}<br/>
                  → {plan.email.content}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-purple-200">
              <p className="text-sm text-gray-600 mb-3">
                Esto es solo el comienzo. En Impulsa Lab, creamos sistemas completos 
                de marketing con IA que trabajan 24/7 para hacer crecer tu negocio.
              </p>
              <a 
                href="https://calendly.com/impulsalab/estrategia-marketing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full font-semibold hover:from-purple-700 hover:to-purple-800 transition-all"
              >
                Quiero una Estrategia Completa →
              </a>
            </div>
          </div>
        );

        setMessages(prev => [...prev, { 
          type: 'bot', 
          content: planMessage, 
          timestamp: new Date() 
        }]);
      }, 3000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Estratega de Contenidos IA</h2>
            <p className="text-purple-100 text-sm">Tu plan personalizado en 60 segundos</p>
          </div>
        </div>
      </div>

      <div className="h-96 overflow-y-auto p-6 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <Bot className="w-5 h-5 text-purple-600" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white'
                    : 'bg-white shadow-sm'
                }`}
              >
                {message.content || message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <Bot className="w-5 h-5 text-purple-600" />
              </div>
              <div className="bg-white shadow-sm rounded-2xl px-4 py-3">
                <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t bg-white p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu respuesta aquí..."
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-purple-500 transition-colors"
            disabled={isLoading || messages.length === 0}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentStrategistChat;
