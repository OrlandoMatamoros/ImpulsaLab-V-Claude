'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/index';
import { Progress } from '@/components/ui/index';
import { selectAdaptiveQuestions } from '../lib/questions-data';

interface AdaptiveQuestionsProps {
  axis: 'finance' | 'operations' | 'marketing';
  onResponse: (question: any, response: any) => void;
  onComplete: () => void;
}

export function AdaptiveQuestions({ axis, onResponse, onComplete }: AdaptiveQuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [selectedValue, setSelectedValue] = useState<any>(null);
  
  // Por ahora usamos un score fijo, después lo obtendremos del pre-assessment
  const questions = selectAdaptiveQuestions(axis, 50, 5);
  const currentQuestion = questions[currentQuestionIndex];
  
  // DEBUG: Ver qué preguntas se están cargando (solo una vez)
  useEffect(() => {
    console.log(`Preguntas para ${axis}:`, questions.length, questions);
  }, [axis]);
  
  const axisInfo = {
    finance: { title: 'Diagnóstico Financiero', icon: '💰', color: 'blue' },
    operations: { title: 'Diagnóstico Operacional', icon: '⚙️', color: 'green' },
    marketing: { title: 'Diagnóstico de Marketing', icon: '📈', color: 'purple' }
  };
  
  const info = axisInfo[axis];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleNext = () => {
    if (selectedValue !== null) {
      // Guardar respuesta
      const response = {
        questionId: currentQuestion.id,
        score: selectedValue,
        rawValue: selectedValue
      };
      
      console.log(`Guardando respuesta para ${axis}:`, response);
      
      onResponse(currentQuestion, response);
      
      const newAnswers = [...answers, response];
      setAnswers(newAnswers);
      
      // Avanzar a la siguiente pregunta o completar
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedValue(null);
      } else {
        onComplete();
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedValue(answers[currentQuestionIndex - 1]?.score || null);
    }
  };

  // Si no hay preguntas disponibles
  if (!currentQuestion) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Preparando preguntas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header del eje */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-3xl">{info.icon}</span>
          <h3 className="text-xl font-semibold">{info.title}</h3>
        </div>
        <Progress value={progress} className="h-2 max-w-md mx-auto" />
        <p className="text-sm text-gray-600 mt-2">
          Pregunta {currentQuestionIndex + 1} de {questions.length}
        </p>
      </div>

      {/* Pregunta actual */}
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-medium mb-2">{currentQuestion.text}</h4>
          {currentQuestion.helpText && (
            <p className="text-sm text-gray-600 mb-4">{currentQuestion.helpText}</p>
          )}
        </div>

        {/* Opciones de respuesta */}
        {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
          <div className="space-y-3">
            {currentQuestion.options.map((option: any) => (
              <button
                key={option.value}
                onClick={() => setSelectedValue(option.score)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedValue === option.score
                    ? `border-${info.color}-500 bg-${info.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{option.label}</div>
              </button>
            ))}
          </div>
        )}

        {/* Slider para preguntas de tipo slider */}
        {currentQuestion.type === 'slider' && (
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="100"
              value={selectedValue || 50}
              onChange={(e) => setSelectedValue(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-center">
              <span className="text-2xl font-bold">{selectedValue || 50}</span>
              <span className="text-gray-600"> / 100</span>
            </div>
          </div>
        )}
      </div>

      {/* Navegación */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={handlePrevious}
          variant="outline"
          disabled={currentQuestionIndex === 0}
        >
          Anterior
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={selectedValue === null}
        >
          {currentQuestionIndex === questions.length - 1 ? 'Completar' : 'Siguiente'}
        </Button>
      </div>
    </div>
  );
}