'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index';
import { TrendingUp, Clock, Target, AlertCircle, CheckCircle, ArrowRight, Loader2, Zap } from 'lucide-react';

interface RecommendationProps {
  scores: {
    finance: number;
    operations: number;
    marketing: number;
  };
  clientInfo: any;
  responses?: any[];
}

export function ProfessionalRecommendations({ scores, clientInfo, responses = [] }: RecommendationProps) {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateAIRecommendations();
  }, [scores, clientInfo]);

  const generateAIRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('=== INICIANDO GENERACIÓN DE RECOMENDACIONES ===');
      console.log('Scores:', scores);
      console.log('Client Info:', clientInfo);

      const response = await fetch('/api/ai/generate-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scores,
          clientInfo,
          responses
        }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        setRecommendations(data.recommendations);
      } else {
        setError('Error al generar recomendaciones');
        console.error('Error en la respuesta:', data.error);
        // Usar recomendaciones por defecto si falla la IA
        setDefaultRecommendations();
      }
    } catch (err) {
      console.error('Error en catch:', err);
      setError('Error de conexión');
      setDefaultRecommendations();
    } finally {
      setLoading(false);
    }
  };

  const setDefaultRecommendations = () => {
    // Recomendaciones por defecto si falla la IA
    const weakestAxis = Object.entries(scores).reduce((min, [key, value]) => 
      value < min.value ? { key, value } : min, 
      { key: 'finance', value: scores.finance }
    );

    setRecommendations({
      primaryRecommendation: {
        title: `Mejora Urgente en ${weakestAxis.key === 'finance' ? 'Finanzas' : weakestAxis.key === 'operations' ? 'Operaciones' : 'Marketing'}`,
        why: 'Este es tu punto más débil y está limitando el crecimiento de tu negocio.',
        impact: 'Mejora esperada del 30-50% en los próximos 90 días',
        actions: [
          'Implementar sistema de control básico',
          'Automatizar procesos clave',
          'Establecer métricas de seguimiento',
          'Crear plan de mejora continua'
        ],
        timeline: '4-6 semanas',
        tools: ['Herramientas digitales', 'Automatización', 'IA'],
        quickWin: 'Comienza hoy mismo con una auditoría rápida de tu situación actual'
      },
      roadmap90Days: [
        {
          phase: 'Días 1-30',
          focus: 'Establecer fundamentos',
          keyActions: ['Auditoría inicial', 'Quick wins'],
          expectedOutcome: 'Sistema básico funcionando'
        },
        {
          phase: 'Días 31-60',
          focus: 'Optimización y automatización',
          keyActions: ['Automatizar procesos', 'Entrenar equipo'],
          expectedOutcome: 'Eficiencia mejorada 30%'
        },
        {
          phase: 'Días 61-90',
          focus: 'Escalamiento',
          keyActions: ['Expandir sistema', 'Medir resultados'],
          expectedOutcome: 'Sistema completo operativo'
        }
      ]
    });
  };

  if (loading) {
    return (
      <Card className="border-2 border-blue-200">
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            <p className="text-lg font-medium">Analizando tu situación con IA...</p>
            <p className="text-sm text-gray-600">Generando recomendaciones personalizadas</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!recommendations) {
    return null;
  }

  const { primaryRecommendation, secondaryRecommendations, roadmap90Days, warningMessage, successMetrics } = recommendations;

  return (
    <div className="space-y-6">
      {/* Recomendación Principal con IA */}
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              Plan de Acción Principal
            </CardTitle>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              {error ? 'Recomendaciones Estándar' : 'Generado con IA'}
            </span>
          </div>
          <h3 className="text-xl font-semibold mt-2">{primaryRecommendation.title}</h3>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Quick Win */}
          {primaryRecommendation.quickWin && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
              <Zap className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-900 mb-1">¡Acción Inmediata!</h4>
                <p className="text-yellow-800 text-sm">{primaryRecommendation.quickWin}</p>
              </div>
            </div>
          )}

          {/* Por qué es crítico */}
          <div className="flex gap-4">
            <AlertCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-lg mb-1">¿Por qué es crítico actuar ahora?</h4>
              <p className="text-gray-700">{primaryRecommendation.why}</p>
            </div>
          </div>

          {/* Impacto esperado */}
          <div className="flex gap-4">
            <TrendingUp className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-lg mb-1">Impacto esperado</h4>
              <p className="text-gray-700">{primaryRecommendation.impact}</p>
            </div>
          </div>

          {/* Plan de acción */}
          <div className="flex gap-4">
            <CheckCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-semibold text-lg mb-3">Plan de acción paso a paso</h4>
              <ol className="space-y-2">
                {primaryRecommendation.actions.map((action: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{action}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Timeline y herramientas */}
          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
            <div className="flex gap-4">
              <Clock className="w-5 h-5 text-purple-500 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Tiempo de implementación</h4>
                <p className="text-gray-700">{primaryRecommendation.timeline}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Herramientas recomendadas</h4>
              <div className="flex flex-wrap gap-2">
                {primaryRecommendation.tools.map((tool: string, index: number) => (
                  <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advertencia si existe */}
      {warningMessage && (
        <Card className="border-2 border-red-200 bg-red-50">
          <CardContent className="py-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-900 mb-1">⚠️ Atención</h4>
                <p className="text-red-800 text-sm">{warningMessage}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Roadmap de 90 días */}
      <Card>
        <CardHeader>
          <CardTitle>Tu Roadmap Personalizado de 90 Días</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roadmap90Days.map((phase: any, index: number) => (
              <div key={index} className="flex items-start gap-4">
                <div className={`${
                  index === 0 ? 'bg-blue-600' : 
                  index === 1 ? 'bg-purple-600' : 
                  'bg-green-600'
                } text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{phase.phase}: {phase.focus}</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    {phase.keyActions.map((action: string, i: number) => (
                      <li key={i}>• {action}</li>
                    ))}
                  </ul>
                  <p className="text-sm font-medium text-green-700 mt-2">
                    Resultado esperado: {phase.expectedOutcome}
                  </p>
                </div>
                {index < roadmap90Days.length - 1 ? (
                  <ArrowRight className="w-5 h-5 text-gray-400 mt-2" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-500 mt-2" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Métricas de éxito */}
      {successMetrics && successMetrics.length > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-lg">📊 Métricas Clave para Medir tu Éxito</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {successMetrics.map((metric: string, index: number) => (
                <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-sm font-medium text-gray-700">{metric}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recomendaciones secundarias */}
      {secondaryRecommendations && (
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(secondaryRecommendations).map(([axis, rec]: [string, any]) => (
            <Card key={axis} className="border-gray-200">
              <CardHeader className={`${
                axis === 'finance' ? 'bg-blue-50' :
                axis === 'operations' ? 'bg-green-50' :
                'bg-purple-50'
              } py-4`}>
                <CardTitle className="text-base">
                  {axis === 'finance' ? '💰 Finanzas' :
                   axis === 'operations' ? '⚙️ Operaciones' :
                   '📈 Marketing'}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <h4 className="font-semibold text-sm mb-2">{rec.title}</h4>
                <p className="text-xs text-gray-600 mb-2">{rec.action}</p>
                <p className="text-xs font-medium text-green-700">→ {rec.impact}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Debug info - eliminar en producción */}
      {error && (
        <div className="text-xs text-gray-500 text-center mt-4">
          Nota: Usando recomendaciones estándar. {error}
        </div>
      )}
    </div>
  );
}