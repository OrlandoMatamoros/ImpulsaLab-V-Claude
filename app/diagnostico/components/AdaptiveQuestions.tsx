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
  
  const questions = selectAdaptiveQuestions(axis, 50, 5);
  const currentQuestion = questions[currentQuestionIndex];
  
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
      const response = {
        questionId: currentQuestion.id,
        score: selectedValue,
        rawValue: selectedValue
      };
      
      console.log(`Guardando respuesta para ${axis}:`, response);
      
      onResponse(currentQuestion, response);
      
      const newAnswers = [...answers, response];
      setAnswers(newAnswers);
      
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

  if (!currentQuestion) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Preparando preguntas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header del eje - responsive */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-2xl sm:text-3xl">{info.icon}</span>
          <h3 className="text-lg sm:text-xl font-semibold">{info.title}</h3>
        </div>
        <Progress value={progress} className="h-2 max-w-md mx-auto" />
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Pregunta {currentQuestionIndex + 1} de {questions.length}
        </p>
      </div>

      {/* Pregunta actual - responsive */}
      <div className="space-y-4">
        <div className="px-2 sm:px-0">
          <h4 className="text-base sm:text-lg font-medium mb-2">{currentQuestion.text}</h4>
          {currentQuestion.helpText && (
            <p className="text-xs sm:text-sm text-gray-600 mb-4">{currentQuestion.helpText}</p>
          )}
        </div>

        {/* Opciones de respuesta - touch optimized */}
        {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
          <div className="space-y-3 px-2 sm:px-0">
            {currentQuestion.options.map((option: any) => (
              <button
                key={option.value}
                onClick={() => setSelectedValue(option.score)}
                className={`
                  w-full text-left p-4 rounded-lg border-2 transition-all
                  min-h-[60px] active:scale-[0.98]
                  ${selectedValue === option.score
                    ? `border-${info.color}-500 bg-${info.color}-50 shadow-md`
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <div className="flex items-start gap-3">
                  {/* Radio indicator mejorado */}
                  <div className={`
                    w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 transition-all
                    ${selectedValue === option.score
                      ? `border-${info.color}-500 bg-${info.color}-500`
                      : 'border-gray-400'
                    }
                  `}>
                    {selectedValue === option.score && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <div className="font-medium text-sm sm:text-base">{option.label}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Slider mejorado para móvil */}
        {currentQuestion.type === 'slider' && (
          <div className="space-y-6 px-4 sm:px-0">
            {/* Valor grande y centrado */}
            <div className="text-center">
              <div className="inline-flex items-baseline gap-2 bg-gray-100 px-6 py-3 rounded-lg">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {selectedValue || 50}
                </span>
                <span className="text-lg sm:text-xl text-gray-600">/ 100</span>
              </div>
            </div>
            
            {/* Slider con área táctil mejorada */}
            <div className="relative py-4">
              <input
                type="range"
                min="0"
                max="100"
                value={selectedValue || 50}
                onChange={(e) => setSelectedValue(parseInt(e.target.value))}
                className={`
                  w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-8
                  [&::-webkit-slider-thumb]:h-8
                  [&::-webkit-slider-thumb]:bg-${info.color}-500
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:transition-all
                  [&::-webkit-slider-thumb]:hover:scale-110
                  [&::-moz-range-thumb]:w-8
                  [&::-moz-range-thumb]:h-8
                  [&::-moz-range-thumb]:bg-${info.color}-500
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:shadow-lg
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:transition-all
                  [&::-moz-range-thumb]:hover:scale-110
                `}
                style={{
                  background: `linear-gradient(to right, 
                    var(--tw-gradient-from) 0%, 
                    var(--tw-gradient-from) ${selectedValue || 50}%, 
                    #e5e7eb ${selectedValue || 50}%, 
                    #e5e7eb 100%)`,
                  '--tw-gradient-from': info.color === 'blue' ? '#3b82f6' : 
                                       info.color === 'green' ? '#10b981' : '#8b5cf6'
                } as any}
              />
              
              {/* Etiquetas de referencia */}
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Bajo</span>
                <span>Medio</span>
                <span>Alto</span>
              </div>
            </div>
            
            {/* Botones de ajuste rápido */}
            <div className="flex justify-center gap-2">
              {[0, 25, 50, 75, 100].map(val => (
                <button
                  key={val}
                  onClick={() => setSelectedValue(val)}
                  className={`
                    px-3 py-1 rounded-full text-xs font-medium transition-all
                    ${selectedValue === val
                      ? `bg-${info.color}-500 text-white`
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }
                  `}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navegación - responsive y fixed en móvil */}
      <div className="flex justify-between gap-3 pt-6 px-2 sm:px-0">
        <Button
          onClick={handlePrevious}
          variant="outline"
          disabled={currentQuestionIndex === 0}
          className="flex-1 sm:flex-initial min-h-[48px]"
        >
          Anterior
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={selectedValue === null}
          className="flex-1 sm:flex-initial min-h-[48px]"
        >
          {currentQuestionIndex === questions.length - 1 ? 'Completar' : 'Siguiente'}
        </Button>
      </div>

      {/* Indicador de progreso móvil flotante */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-2 border">
        <div className="flex items-center gap-3">
          <Progress value={progress} className="h-2 flex-1" />
          <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
            {currentQuestionIndex + 1}/{questions.length}
          </span>
        </div>
      </div>
    </div>
  );
}