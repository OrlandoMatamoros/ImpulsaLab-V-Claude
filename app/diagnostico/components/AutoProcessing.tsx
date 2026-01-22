'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/index';
import { Loader2, CheckCircle, Mail, Database, TrendingUp } from 'lucide-react';

interface AutoProcessingProps {
  leadData: {
    nombre: string;
    email: string;
    telefono?: string;
    negocio: string;
    industria: string;
    empleados: number;
  };
  scores: {
    finance: number;
    operations: number;
    marketing: number;
  };
  responses: any[];
}

export function AutoProcessing({ leadData, scores, responses }: AutoProcessingProps) {
  const router = useRouter();
  const [processingStep, setProcessingStep] = useState<
    'calculating' | 'sending_report' | 'sending_admin' | 'saving_crm' | 'complete'
  >('calculating');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const processResults = async () => {
      try {
        // Step 1: Calculando (simulación visual - los scores ya están calculados)
        setProcessingStep('calculating');
        setProgress(20);
        await delay(800);

        // Step 2: Enviar email de reporte al usuario + admin + Google Sheets
        setProcessingStep('sending_report');
        setProgress(40);

        const scorePromedio = Math.round((scores.finance + scores.operations + scores.marketing) / 3);

        const reportResponse = await fetch('/api/diagnostic/send-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadData: {
              fecha: new Date().toISOString().split('T')[0],
              nombre: leadData.nombre,
              email: leadData.email,
              telefono: leadData.telefono || 'No proporcionado',
              empresa: leadData.negocio,
              industria: leadData.industria,
              empleados: leadData.empleados,
              facturacion_anual: null, // No lo pedimos en el formulario inicial
              score_finanzas: Math.round(scores.finance),
              score_operaciones: Math.round(scores.operations),
              score_marketing: Math.round(scores.marketing),
              score_promedio: scorePromedio,
              origen: 'Diagnóstico Web'
            },
            clientInfo: leadData,
            scores: scores,
            responses: responses
          }),
        });

        if (!reportResponse.ok) {
          console.error('Error enviando reporte');
        }

        setProgress(60);
        await delay(600);

        // Step 3: Confirmación de envío admin
        setProcessingStep('sending_admin');
        setProgress(80);
        await delay(500);

        // Step 4: Guardado en CRM
        setProcessingStep('saving_crm');
        setProgress(95);
        await delay(500);

        // Step 5: Completado
        setProcessingStep('complete');
        setProgress(100);
        await delay(1000);

        // Redirect a /gracias
        console.log('✅ Procesamiento completo. Redirigiendo a /gracias');
        router.push('/gracias');

      } catch (error) {
        console.error('Error en procesamiento automático:', error);
        // Aún así redirigir - no queremos dejar al usuario atrapado
        setTimeout(() => {
          router.push('/gracias');
        }, 2000);
      }
    };

    processResults();
  }, [leadData, scores, responses, router]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const stepInfo = {
    calculating: {
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Calculando Inteligencia de Negocio',
      description: 'Analizando tus respuestas en las 3 dimensiones...'
    },
    sending_report: {
      icon: <Mail className="w-12 h-12" />,
      title: 'Generando tu Reporte Personalizado',
      description: 'Preparando resultados detallados...'
    },
    sending_admin: {
      icon: <CheckCircle className="w-12 h-12" />,
      title: 'Enviando Resultados',
      description: `Enviando reporte a ${leadData.email}...`
    },
    saving_crm: {
      icon: <Database className="w-12 h-12" />,
      title: 'Guardando Información',
      description: 'Almacenando tus resultados de forma segura...'
    },
    complete: {
      icon: <CheckCircle className="w-12 h-12" />,
      title: '¡Todo Listo!',
      description: 'Redirigiendo a tus resultados...'
    }
  };

  const currentStep = stepInfo[processingStep];

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
        <CardContent className="pt-12 pb-12">

          {/* Animated Icon */}
          <div className="flex justify-center mb-8">
            <div className={`
              ${processingStep === 'complete' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}
              rounded-full p-6 ${processingStep !== 'complete' ? 'animate-pulse' : ''}
            `}>
              {currentStep.icon}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            {currentStep.title}
          </h2>

          {/* Description */}
          <p className="text-center text-lg text-gray-600 mb-8">
            {currentStep.description}
          </p>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progreso</span>
              <span className="font-semibold">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Scores Preview */}
          <div className="bg-white rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Vista Previa de Resultados
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {Math.round(scores.finance)}
                </div>
                <div className="text-xs text-gray-600 mt-1">💰 Finanzas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {Math.round(scores.operations)}
                </div>
                <div className="text-xs text-gray-600 mt-1">⚙️ Operaciones</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {Math.round(scores.marketing)}
                </div>
                <div className="text-xs text-gray-600 mt-1">📈 Marketing</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 text-center">
              <div className="text-sm text-gray-600">Promedio General</div>
              <div className="text-4xl font-bold text-indigo-600 mt-1">
                {Math.round((scores.finance + scores.operations + scores.marketing) / 3)}
              </div>
            </div>
          </div>

          {/* Status Steps */}
          <div className="mt-8 space-y-3">
            <StepIndicator
              label="Análisis completado"
              completed={progress >= 20}
              active={processingStep === 'calculating'}
            />
            <StepIndicator
              label="Reporte generado"
              completed={progress >= 40}
              active={processingStep === 'sending_report'}
            />
            <StepIndicator
              label="Email enviado"
              completed={progress >= 80}
              active={processingStep === 'sending_admin'}
            />
            <StepIndicator
              label="Datos guardados"
              completed={progress >= 95}
              active={processingStep === 'saving_crm'}
            />
            <StepIndicator
              label="¡Listo para ver resultados!"
              completed={progress === 100}
              active={processingStep === 'complete'}
            />
          </div>

          {/* Loading Indicator */}
          {processingStep !== 'complete' && (
            <div className="mt-8 flex justify-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          )}

        </CardContent>
      </Card>

      {/* Info Note */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          ⏱️ Este proceso toma solo unos segundos...
        </p>
      </div>
    </div>
  );
}

// Helper Component
function StepIndicator({ label, completed, active }: { label: string; completed: boolean; active: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`
        w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
        ${completed ? 'bg-green-500' : active ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}
      `}>
        {completed && <CheckCircle className="w-4 h-4 text-white" />}
        {active && !completed && <Loader2 className="w-4 h-4 text-white animate-spin" />}
      </div>
      <span className={`text-sm ${completed || active ? 'text-gray-800 font-semibold' : 'text-gray-500'}`}>
        {label}
      </span>
    </div>
  );
}
