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
    <div className="space-y-8">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Responde estas 3 preguntas rápidas para personalizar tu diagnóstico
        </p>
      </div>

      {questions.map((question, index) => (
        <div key={question.id} className="space-y-4">
          <div className="flex items-start space-x-3">
            <span className="text-3xl">{question.icon}</span>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">
                {index + 1}. {question.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{question.description}</p>
              
              <div className="grid gap-3">
                {question.options.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(question.id, option.value)}
                    className={`text-left p-4 rounded-lg border-2 transition-all ${
                      answers[question.id as keyof typeof answers] === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end pt-4">
        <Button 
          onClick={handleContinue}
          disabled={!isComplete}
          size="lg"
        >
          Continuar con el Diagnóstico Detallado
        </Button>
      </div>
    </div>
  );
}