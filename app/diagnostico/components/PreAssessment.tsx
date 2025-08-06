'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/index';

interface PreAssessmentProps {
  onComplete: (scores: { finance: number; operations: number; marketing: number }) => void;
}

export function PreAssessment({ onComplete }: PreAssessmentProps) {
  const [answers, setAnswers] = useState({
    finance: 0,
    operations: 0,
    marketing: 0
  });

  const questions = [
    {
      id: 'finance',
      icon: '💰',
      title: '¿Qué tan en control te sientes de las finanzas de tu negocio?',
      description: 'Considera tu capacidad para conocer tu rentabilidad, flujo de caja y métricas clave.',
      options: [
        { value: 20, label: 'Sin control', description: 'No tengo claridad de mis números' },
        { value: 50, label: 'Control básico', description: 'Reviso ocasionalmente' },
        { value: 80, label: 'Buen control', description: 'Monitoreo regular con reportes' }
      ]
    },
    {
      id: 'operations',
      icon: '⚙️',
      title: '¿Cuánto tiempo dedicas a tareas repetitivas y manuales?',
      description: 'Piensa en procesos que haces una y otra vez que podrían automatizarse.',
      options: [
        { value: 20, label: 'Demasiado tiempo', description: 'La mayoría de mi día' },
        { value: 50, label: 'Tiempo moderado', description: 'Varias horas a la semana' },
        { value: 80, label: 'Poco tiempo', description: 'Casi todo está automatizado' }
      ]
    },
    {
      id: 'marketing',
      icon: '📈',
      title: '¿Qué tan efectiva es tu presencia digital y atracción de clientes?',
      description: 'Evalúa tu capacidad para ser encontrado online y convertir visitantes en clientes.',
      options: [
        { value: 20, label: 'Muy básica', description: 'Poca o nula presencia online' },
        { value: 50, label: 'Presencia moderada', description: 'Tengo web y redes pero sin estrategia' },
        { value: 80, label: 'Presencia fuerte', description: 'Estrategia digital activa y efectiva' }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const isComplete = answers.finance > 0 && answers.operations > 0 && answers.marketing > 0;

  const handleContinue = () => {
    if (isComplete) {
      onComplete(answers);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header responsive */}
      <div className="text-center mb-4 sm:mb-6">
        <p className="text-sm sm:text-base text-gray-600 px-4">
          Responde estas 3 preguntas rápidas para personalizar tu diagnóstico
        </p>
      </div>

      {/* Preguntas con diseño touch-friendly */}
      {questions.map((question, index) => (
        <div key={question.id} className="space-y-4">
          {/* Pregunta header */}
          <div className="flex items-start space-x-3">
            <span className="text-2xl sm:text-3xl flex-shrink-0 mt-1">{question.icon}</span>
            <div className="flex-1 space-y-2">
              <h3 className="text-base sm:text-lg font-semibold">
                {index + 1}. {question.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">{question.description}</p>
            </div>
          </div>
          
          {/* Opciones touch-optimized */}
          <div className="grid gap-3 pl-0 sm:pl-11">
            {question.options.map(option => (
              <button
                key={option.value}
                onClick={() => handleAnswer(question.id, option.value)}
                className={`
                  relative text-left p-4 rounded-lg border-2 transition-all 
                  min-h-[60px] sm:min-h-[auto]
                  ${answers[question.id as keyof typeof answers] === option.value
                    ? 'border-blue-500 bg-blue-50 shadow-md scale-[1.02]'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98]'
                  }
                `}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {/* Radio indicator */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <div className={`
                    w-5 h-5 rounded-full border-2 transition-all
                    ${answers[question.id as keyof typeof answers] === option.value
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-400'
                    }
                  `}>
                    {answers[question.id as keyof typeof answers] === option.value && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Contenido */}
                <div className="pl-8">
                  <div className="font-medium text-base sm:text-sm text-gray-900">
                    {option.label}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">
                    {option.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Botón continuar - responsive */}
      <div className="flex justify-center sm:justify-end pt-6">
        <Button 
          onClick={handleContinue}
          disabled={!isComplete}
          size="lg"
          className={`
            w-full sm:w-auto min-h-[48px] text-base font-medium
            transition-all duration-200
            ${!isComplete ? 'opacity-50' : 'hover:scale-105'}
          `}
        >
          Continuar con el Diagnóstico Detallado
        </Button>
      </div>

      {/* Indicador de progreso móvil */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-3 border z-50">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Preguntas respondidas:</span>
          <div className="flex gap-2">
            {questions.map((q) => (
              <div
                key={q.id}
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                  ${answers[q.id as keyof typeof answers] > 0
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {answers[q.id as keyof typeof answers] > 0 ? '✓' : (questions.findIndex(x => x.id === q.id) + 1)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}