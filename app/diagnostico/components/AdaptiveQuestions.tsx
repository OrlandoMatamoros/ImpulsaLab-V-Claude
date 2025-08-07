'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/index';
import { Progress } from '@/components/ui/index';
import { selectAdaptiveQuestions } from '../lib/questions-data';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';

interface AdaptiveQuestionsProps {
  axis: 'finance' | 'operations' | 'marketing';
  onComplete: (score: number) => void; // CAMBIADO: Ahora acepta score
  initialScore?: number;
}

export function AdaptiveQuestions({ axis, onComplete, initialScore = 50 }: AdaptiveQuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const [score, setScore] = useState(initialScore);

  useEffect(() => {
    // Cargar preguntas basadas en el eje y el score inicial
    const loadedQuestions = selectAdaptiveQuestions(axis, initialScore);
    setQuestions(loadedQuestions);
  }, [axis, initialScore]);

  const handleAnswer = (value: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Guardar respuesta
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));

    // Calcular nuevo score
    const baseScore = initialScore;
    const adjustment = (value - 50) * 0.4; // Ajuste basado en la respuesta
    const newScore = Math.max(0, Math.min(100, baseScore + adjustment));
    setScore(newScore);

    // Avanzar o completar
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calcular score final
      const allAnswers = { ...answers, [currentQuestion.id]: value };
      const avgScore = (Object.values(allAnswers) as number[]).reduce((a, b) => a + b, 0) / Object.keys(allAnswers).length;
      onComplete(Math.round(avgScore));
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando preguntas...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      {/* Header con título del eje */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize mb-2">
          {axis === 'finance' ? '💰 Finanzas' : axis === 'operations' ? '⚙️ Operaciones' : '📈 Marketing'}
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Evaluación detallada de {axis === 'finance' ? 'la gestión financiera' : 
                                   axis === 'operations' ? 'los procesos operativos' : 
                                   'las estrategias de marketing'}
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
          <span>Pregunta {currentQuestionIndex + 1} de {questions.length}</span>
          <span>{Math.round(progress)}% completado</span>
        </div>
        <Progress value={progress} className="h-2 sm:h-3" />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-6">
        {/* Question */}
        <div className="mb-8">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
            {currentQuestion?.question}
          </h3>
          
          {currentQuestion?.description && (
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">{currentQuestion.description}</p>
            </div>
          )}
        </div>

        {/* Slider Response */}
        <div className="space-y-6">
          <div className="px-2">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Totalmente en desacuerdo</span>
              <span>Totalmente de acuerdo</span>
            </div>
            
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={answers[currentQuestion?.id] || 50}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setAnswers(prev => ({
                  ...prev,
                  [currentQuestion.id]: value
                }));
              }}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer 
                       slider-thumb:appearance-none slider-thumb:w-6 slider-thumb:h-6 
                       slider-thumb:rounded-full slider-thumb:bg-blue-600 
                       slider-thumb:cursor-pointer slider-thumb:shadow-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            />
            
            <div className="flex justify-between mt-2">
              {[0, 25, 50, 75, 100].map((val) => (
                <span key={val} className="text-xs text-gray-500">{val}</span>
              ))}
            </div>
          </div>

          {/* Current Value Display */}
          <div className="text-center py-4 bg-gray-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">
              {answers[currentQuestion?.id] || 50}
            </p>
            <p className="text-sm text-gray-600 mt-1">Puntuación actual</p>
          </div>

          {/* Quick Select Buttons - Mobile Optimized */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Bajo', value: 25 },
              { label: 'Medio', value: 50 },
              { label: 'Alto', value: 75 }
            ].map(({ label, value }) => (
              <Button
                key={value}
                variant={answers[currentQuestion?.id] === value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAnswers(prev => ({
                  ...prev,
                  [currentQuestion.id]: value
                }))}
                className="text-xs sm:text-sm"
              >
                {label} ({value})
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Anterior</span>
        </Button>

        <span className="text-sm text-gray-500">
          {currentQuestionIndex + 1} / {questions.length}
        </span>

        <Button
          onClick={() => handleAnswer(answers[currentQuestion?.id] || 50)}
          className="flex items-center gap-2"
        >
          <span className="hidden sm:inline">
            {currentQuestionIndex === questions.length - 1 ? 'Completar' : 'Siguiente'}
          </span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}