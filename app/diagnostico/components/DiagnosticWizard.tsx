'use client';

import { useState, useEffect } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Progress } from '@/components/ui/index';
import { useDiagnosticStore } from '@/store/diagnosticStore';
import { ClientInfoStep } from './ClientInfoStep';
import { PreAssessment } from './PreAssessment';
import { AdaptiveQuestions } from './AdaptiveQuestions';
import { ResultsDashboard } from './ResultsDashboard';

// Configuración de links directamente aquí
const LINKS = {
  calendly: 'https://calendly.com/orlando-tuimpulsalab/30min',
  email: 'contacto@tuimpulsalab.com',
};

interface DiagnosticWizardProps {
  consultantId: string;
  isInternalMode?: boolean; // Nueva prop para controlar el modo
}

const STEPS = [
  { id: 'client-info', title: 'Información del Cliente', icon: '📋' },
  { id: 'pre-assessment', title: 'Evaluación Inicial', icon: '🎯' },
  { id: 'finance', title: 'Diagnóstico Financiero', icon: '💰' },
  { id: 'operations', title: 'Diagnóstico Operacional', icon: '⚙️' },
  { id: 'marketing', title: 'Diagnóstico de Marketing', icon: '📈' },
  { id: 'results', title: 'Resultados y Análisis', icon: '📊' }
];

export default function DiagnosticWizard({ consultantId, isInternalMode = false }: DiagnosticWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [financeResponses, setFinanceResponses] = useState<any[]>([]);
  const [operationsResponses, setOperationsResponses] = useState<any[]>([]);
  const [marketingResponses, setMarketingResponses] = useState<any[]>([]);
  const [calculatedScores, setCalculatedScores] = useState<any>(null);
  const { clientInfo, setClientInfo } = useDiagnosticStore();

  // Cargar progreso guardado al iniciar
  useEffect(() => {
    const savedData = localStorage.getItem('diagnostico-3d-progress');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setCurrentStep(parsed.currentStep || 0);
        setClientInfo(parsed.clientInfo || {});
        setFinanceResponses(parsed.financeResponses || []);
        setOperationsResponses(parsed.operationsResponses || []);
        setMarketingResponses(parsed.marketingResponses || []);
        setCalculatedScores(parsed.calculatedScores || null);
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, [setClientInfo]);

  // Guardar progreso automáticamente
  useEffect(() => {
    const dataToSave = {
      currentStep,
      clientInfo,
      financeResponses,
      operationsResponses,
      marketingResponses,
      calculatedScores,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('diagnostico-3d-progress', JSON.stringify(dataToSave));
  }, [currentStep, clientInfo, financeResponses, operationsResponses, marketingResponses, calculatedScores]);

  const calculateProgress = () => {
    return Math.round((currentStep / (STEPS.length - 1)) * 100);
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateFinalScores = () => {
    console.log('=== CALCULANDO PUNTUACIONES FINALES ===');
    console.log('Respuestas finance:', financeResponses.length, financeResponses);
    console.log('Respuestas operations:', operationsResponses.length, operationsResponses);
    console.log('Respuestas marketing:', marketingResponses.length, marketingResponses);
    
    const calculateAxisScore = (responses: any[]) => {
      if (responses.length === 0) return 0;
      const totalWeight = responses.reduce((sum, r) => sum + (r.weight || 1), 0);
      const weightedSum = responses.reduce((sum, r) => sum + (r.score * (r.weight || 1)), 0);
      const score = Math.round(weightedSum / totalWeight);
      console.log(`Cálculo - Total weight: ${totalWeight}, Weighted sum: ${weightedSum}, Score: ${score}`);
      return score;
    };
    
    const scores = {
      finance: calculateAxisScore(financeResponses),
      operations: calculateAxisScore(operationsResponses),
      marketing: calculateAxisScore(marketingResponses)
    };
    
    console.log('PUNTUACIONES FINALES:', scores);
    setCalculatedScores(scores);
  };

const resetDiagnostic = () => {
  if (confirm('¿Deseas iniciar un nuevo diagnóstico? Se perderán los datos actuales.')) {
    localStorage.removeItem('diagnostico-3d-progress');
    setCurrentStep(0);
    setClientInfo({});
    setFinanceResponses([]);
    setOperationsResponses([]);
    setMarketingResponses([]);
    setCalculatedScores(null);
    // Recargar la página para asegurar limpieza completa
    window.location.reload();
  }
};

// Agregar un useEffect para detectar si es una nueva sesión:
useEffect(() => {
  // Si el usuario viene de la página principal, limpiar datos
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('new') === 'true') {
    localStorage.removeItem('diagnostico-3d-progress');
    window.location.href = window.location.pathname; // Remover el parámetro
  }
}, []);

  const handleScheduleConsultation = () => {
    // Construir URL con parámetros pre-llenados
    const calendlyUrl = new URL(LINKS.calendly);
    
    // Agregar parámetros de pre-llenado si existen
    const contactName = (clientInfo as any).contactName || '';
    const email = (clientInfo as any).email || '';
    
    if (contactName) {
      calendlyUrl.searchParams.append('name', contactName);
    }
    if (email) {
      calendlyUrl.searchParams.append('email', email);
    }
    
    // Agregar información adicional
    const avgScore = calculatedScores ? 
      Math.round((calculatedScores.finance + calculatedScores.operations + calculatedScores.marketing) / 3) : 
      'N/A';
    
    // Mensaje diferente según el modo
    const message = isInternalMode ? 
      `Implementación Impulsa 3D - Score: ${avgScore}` : 
      `Diagnóstico 3D - Score: ${avgScore}`;
    
    calendlyUrl.searchParams.append('a1', message);
    
    // Abrir en nueva ventana
    window.open(calendlyUrl.toString(), '_blank');
  };

  // Contador total de preguntas
  const getTotalQuestions = () => {
    return financeResponses.length + operationsResponses.length + marketingResponses.length;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ClientInfoStep
            clientInfo={clientInfo}
            onUpdate={setClientInfo}
            onNext={handleNext}
          />
        );
      
      case 1:
        return (
          <PreAssessment
            onComplete={(scores) => {
              console.log('Pre-assessment scores:', scores);
              handleNext();
            }}
          />
        );
        
      case 2: // Finanzas
        return (
          <AdaptiveQuestions
            key="finance-questions"
            axis="finance"
            onResponse={(question, response) => {
              console.log('Agregando respuesta finance:', response);
              setFinanceResponses(prev => {
                const newResponses = [...prev, { ...response, axis: 'finance', weight: question.weight }];
                console.log('Total respuestas finance:', newResponses.length);
                return newResponses;
              });
            }}
            onComplete={handleNext}
          />
        );
        
      case 3: // Operaciones
        return (
          <AdaptiveQuestions
            key="operations-questions"
            axis="operations"
            onResponse={(question, response) => {
              console.log('Agregando respuesta operations:', response);
              setOperationsResponses(prev => {
                const newResponses = [...prev, { ...response, axis: 'operations', weight: question.weight }];
                console.log('Total respuestas operations:', newResponses.length);
                return newResponses;
              });
            }}
            onComplete={handleNext}
          />
        );
        
      case 4: // Marketing
        return (
          <AdaptiveQuestions
            key="marketing-questions"
            axis="marketing"
            onResponse={(question, response) => {
              console.log('Agregando respuesta marketing:', response);
              setMarketingResponses(prev => {
                const newResponses = [...prev, { ...response, axis: 'marketing', weight: question.weight }];
                console.log('Total respuestas marketing:', newResponses.length);
                return newResponses;
              });
            }}
            onComplete={() => {
              // Calcular puntuaciones antes de avanzar
              setTimeout(() => {
                calculateFinalScores();
                handleNext();
              }, 100);
            }}
          />
        );
        
      case STEPS.length - 1:
        // Recalcular puntuaciones si no existen
        if (!calculatedScores) {
          calculateFinalScores();
        }

        // Combinar todas las respuestas
        const allResponses = [
          ...financeResponses,
          ...operationsResponses,
          ...marketingResponses
        ];
        
        return (
          <div className="space-y-6">
            <ResultsDashboard
              scores={calculatedScores || { finance: 0, operations: 0, marketing: 0 }}
              responses={allResponses}
              clientInfo={clientInfo}
              onScheduleConsultation={handleScheduleConsultation}
              isInternalMode={isInternalMode} // Pasar el modo al dashboard
            />
            <div className="text-center pt-4 border-t">
              <Button
                variant="outline"
                onClick={resetDiagnostic}
              >
                🔄 Iniciar Nuevo Diagnóstico
              </Button>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="space-y-4">
            <p className="text-gray-600">
              Contenido del paso {STEPS[currentStep].title} - Próximamente
            </p>
            <div className="flex justify-between mt-8">
              <Button 
                onClick={handlePrevious}
                variant="outline"
              >
                Anterior
              </Button>
              <Button onClick={handleNext}>
                Siguiente
              </Button>
            </div>
          </div>
        );
    }
  };

  // RETURN PRINCIPAL DEL COMPONENTE
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          Diagnóstico 3D Impulsa™ {isInternalMode && <span className="text-sm font-normal text-gray-600">(Modo Interno)</span>}
        </h1>
        
      {/* Barra de progreso */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">
            Paso {currentStep + 1} de {STEPS.length}
          </span>
          <span className="text-sm text-gray-500">
            {STEPS[currentStep].title}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
        
        {/* Mostrar contador de preguntas totales durante el diagnóstico */}
        {currentStep >= 2 && currentStep <= 4 && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            {getTotalQuestions()} de 15 preguntas completadas en total
          </p>
        )}
      </div>

      {/* Contenido del paso actual */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">{STEPS[currentStep].icon}</span>
          {STEPS[currentStep].title}
        </h2>
        
        {renderStepContent()}
      </div>
      {/* Cerrando el div principal */}
    </div>
  );
  </div>
  );
}