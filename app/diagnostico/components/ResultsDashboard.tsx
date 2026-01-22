
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index';
import { Button } from '@/components/ui/button';
import { TrendingUp, Download, Calendar, ArrowRight, Share2, Award, Target, AlertTriangle, CheckCircle, Clock, DollarSign, FileText, Lock, Users, Building2 } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { ProfessionalRecommendations } from './ProfessionalRecommendations';
import Link from 'next/link';
import { PDFGenerator } from './pdf/PDFGenerator';
import { useAuth } from '@/contexts/FirebaseAuthContext';
import {
  getIndustryComparison,
  getIndustryRecommendations,
  getStrengthAreas,
  getImprovementAreas,
  getIndustryDescription,
  getBenchmarkThreshold,
  type IndustryType
} from '@/lib/industry-benchmarks';
import {
  getCompanySizeProfile,
  getSizeSpecificRecommendations,
  getGrowthStageMessage,
  compareToMaturityLevel,
  getPriorityActions,
  getSizeBenchmarkMessage
} from '@/lib/company-size';

interface ResultsDashboardProps {
  scores: {
    finance: number;
    operations: number;
    marketing: number;
  };
  responses: any[];
  clientInfo: any;
  onScheduleConsultation: () => void;
  isInternalMode?: boolean;
}

export function ResultsDashboard({ 
  scores: rawScores, 
  responses, 
  clientInfo, 
  onScheduleConsultation,
  isInternalMode = false
}: ResultsDashboardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  
  // Referencias para los gráficos
  const radarChartRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const barChartRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  
  // Obtener usuario actual
  const { userData } = useAuth();
  
  // Debug info
  console.log('ClientInfo en ResultsDashboard:', clientInfo);
  console.log('User Role:', userData?.role);
  
  // Aplicar ponderaciones finales
  const finalScores = {
    finance: Math.round(rawScores.finance),
    operations: Math.round(rawScores.operations),
    marketing: Math.round(rawScores.marketing)
  };

  const averageScore = Math.round((finalScores.finance + finalScores.operations + finalScores.marketing) / 3);

  // Obtener datos de industria y tamaño de empresa
  const industryName = (clientInfo?.industry || 'Otro') as IndustryType;
  const employeeCount = clientInfo?.employeeCount || 0;

  // Obtener benchmarks de la industria usando helper
  const benchmarks = {
    finance: getBenchmarkThreshold('finance', industryName, 'average'),
    operations: getBenchmarkThreshold('operations', industryName, 'average'),
    marketing: getBenchmarkThreshold('marketing', industryName, 'average')
  };

  // Obtener perfil de tamaño de empresa
  const companyProfile = employeeCount > 0 ? getCompanySizeProfile(employeeCount) : null;

  // Obtener comparaciones de industria
  const industryComparisons = {
    finance: getIndustryComparison(finalScores.finance, 'finance', industryName),
    operations: getIndustryComparison(finalScores.operations, 'operations', industryName),
    marketing: getIndustryComparison(finalScores.marketing, 'marketing', industryName)
  };

  // Obtener recomendaciones específicas de industria y tamaño
  const industryRecs = getIndustryRecommendations(finalScores, industryName);
  const sizeRecs = employeeCount > 0 ? getSizeSpecificRecommendations(employeeCount, finalScores) : [];
  const priorityActions = employeeCount > 0 ? getPriorityActions(employeeCount, finalScores) : [];

  // Obtener áreas de fortaleza y mejora
  const strengthAreas = getStrengthAreas(finalScores, industryName);
  const improvementAreas = getImprovementAreas(finalScores, industryName);

  // Determinar el estado general
  const getBusinessStage = (avg: number) => {
    if (avg >= 70) return { stage: 'Expansión', color: 'text-green-600', bg: 'bg-green-50 border-green-200', description: 'Tu negocio está listo para escalar' };
    if (avg >= 40) return { stage: 'Crecimiento', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200', description: 'Tienes una base sólida para crecer' };
    return { stage: 'Supervivencia', color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200', description: 'Es momento de fortalecer los fundamentos' };
  };

  const businessStage = getBusinessStage(averageScore);

  // Datos para el gráfico de radar
  const radarData = [
    {
      axis: 'Finanzas',
      value: finalScores.finance,
      fullMark: 100,
    },
    {
      axis: 'Operaciones',
      value: finalScores.operations,
      fullMark: 100,
    },
    {
      axis: 'Marketing',
      value: finalScores.marketing,
      fullMark: 100,
    },
  ];

  // Datos para el gráfico de barras con benchmarks reales
  const barData = [
    {
      name: 'Finanzas',
      score: finalScores.finance,
      benchmark: benchmarks.finance,
      color: '#3B82F6'
    },
    {
      name: 'Operaciones',
      score: finalScores.operations,
      benchmark: benchmarks.operations,
      color: '#10B981'
    },
    {
      name: 'Marketing',
      score: finalScores.marketing,
      benchmark: benchmarks.marketing,
      color: '#8B5CF6'
    }
  ];

  // Identificar fortalezas y debilidades
  const weakestAxis = Object.entries(finalScores).reduce((min, [key, value]) => 
    value < min.value ? { key, value } : min, 
    { key: 'finance', value: finalScores.finance }
  );

  const strongestAxis = Object.entries(finalScores).reduce((max, [key, value]) => 
    value > max.value ? { key, value } : max, 
    { key: 'finance', value: finalScores.finance }
  );

  // Calcular el potencial de mejora
  const improvementPotential = {
    finance: 100 - finalScores.finance,
    operations: 100 - finalScores.operations,
    marketing: 100 - finalScores.marketing
  };

  const totalImprovementPotential = improvementPotential.finance + improvementPotential.operations + improvementPotential.marketing;

  // Cargar recomendaciones de IA al montar el componente
  useEffect(() => {
    const fetchAIRecommendations = async () => {
      setLoadingAI(true);
      try {
        const response = await fetch('/api/ai/generate-recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            scores: finalScores,
            clientInfo,
            responses
          })
        });

        const data = await response.json();
        if (data.success) {
          setRecommendations(data.recommendations);
        }
      } catch (error) {
        console.error('Error fetching AI recommendations:', error);
      } finally {
        setLoadingAI(false);
      }
    };

    fetchAIRecommendations();
  }, []);

  // RETURN PRINCIPAL DEL COMPONENTE
  return (
    <div className="space-y-8 animate-fadeIn pb-20 md:pb-8">
      {/* Header mejorado sin scroll horizontal */}
      <div className="relative overflow-hidden rounded-xl p-4 md:p-6 border-2 border-gray-200 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/20 to-blue-500/30"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="w-full md:w-auto">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
                Diagnóstico 3D Completado
              </h2>
              <p className="text-white/90 text-sm md:text-base mt-1">
                {clientInfo?.companyName || clientInfo?.name || 'Tu Empresa'} • {new Date().toLocaleDateString('es-ES')}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs md:text-sm font-semibold border border-white/30 mt-2">
                <Award className="w-4 h-4" />
                <span className="truncate">{businessStage.stage}: {businessStage.description}</span>
              </div>
            </div>
            <div className="text-left md:text-right">
              <div className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
                {averageScore}
              </div>
              <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider">Puntuación Global</div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Profile & Industry Context */}
      {companyProfile && (
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Size Profile */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Perfil de Empresa</h3>
                    <p className="text-sm text-gray-600">Contexto para tu diagnóstico</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Clasificación:</span>
                    <span className="font-bold text-blue-600">{companyProfile.icon} {companyProfile.label}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Empleados:</span>
                    <span className="font-semibold text-gray-800">{employeeCount} ({companyProfile.employeeRange})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Industria:</span>
                    <span className="font-semibold text-gray-800">{industryName}</span>
                  </div>
                </div>
                <div className="bg-blue-100 rounded-lg p-3">
                  <p className="text-sm text-blue-900">{getGrowthStageMessage(employeeCount)}</p>
                </div>
              </div>

              {/* Priority Actions */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Acciones Prioritarias</h3>
                    <p className="text-sm text-gray-600">Para tu tamaño e industria</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 space-y-3">
                  {priorityActions.slice(0, 3).map((action, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`mt-0.5 px-2 py-0.5 rounded text-xs font-bold ${
                        action.priority === 'alta' ? 'bg-red-100 text-red-700' :
                        action.priority === 'media' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {action.priority.toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 font-semibold">{action.axis}</div>
                        <div className="text-sm text-gray-700">{action.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-purple-100 rounded-lg p-3">
                  <p className="text-xs text-purple-900 font-semibold">
                    {getSizeBenchmarkMessage(employeeCount, averageScore)}
                  </p>
                </div>
              </div>
            </div>

            {/* Strengths & Improvement Areas */}
            {(strengthAreas.length > 0 || improvementAreas.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-blue-200">
                {strengthAreas.length > 0 && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Tus Fortalezas en {industryName}
                    </h4>
                    <div className="space-y-1">
                      {strengthAreas.map((area, idx) => (
                        <div key={idx} className="text-sm text-green-700">{area}</div>
                      ))}
                    </div>
                  </div>
                )}
                {improvementAreas.length > 0 && (
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Oportunidades de Mejora
                    </h4>
                    <div className="space-y-1">
                      {improvementAreas.map((area, idx) => (
                        <div key={idx} className="text-sm text-orange-700">{area}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tabs de navegación mejorados para móvil */}
      <div className="flex gap-1 md:gap-2 border-b overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
            activeTab === 'overview' 
              ? 'border-b-2 border-blue-600 text-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Vista General
        </button>
        <button
          onClick={() => setActiveTab('details')}
          className={`px-3 py-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
            activeTab === 'details' 
              ? 'border-b-2 border-blue-600 text-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Análisis Detallado
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-3 py-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base ${
            activeTab === 'recommendations' 
              ? 'border-b-2 border-blue-600 text-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Plan de Acción IA
        </button>
      </div>

      {/* Contenido según la pestaña activa */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Gráficos principales */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Radar */}
            <Card className="overflow-hidden border-gray-200">
              <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
                <CardTitle className="text-white text-lg md:text-xl">Mapa 3D de tu Negocio</CardTitle>
              </CardHeader>
              <CardContent className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-2 md:p-4">
                <div ref={radarChartRef} className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <defs>
                        <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
                          <stop offset="50%" stopColor="#8B5CF6" stopOpacity={0.6} />
                          <stop offset="100%" stopColor="#EC4899" stopOpacity={0.4} />
                        </linearGradient>
                      </defs>
                      <PolarGrid 
                        gridType="polygon" 
                        radialLines={true}
                        stroke="#9333ea"
                        strokeOpacity={0.3}
                      />
                      <PolarAngleAxis 
                        dataKey="axis" 
                        tick={{ fill: '#1e293b', fontSize: 12, fontWeight: 600 }}
                      />
                      <PolarRadiusAxis 
                        domain={[0, 100]} 
                        tick={{ fill: '#475569', fontSize: 10 }}
                        tickCount={6}
                      />
                      <Radar 
                        name="Tu Negocio" 
                        dataKey="value" 
                        stroke="#7c3aed" 
                        fill="url(#radarGradient)" 
                        strokeWidth={3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-2 md:gap-4 text-center p-2 md:p-4 bg-white/70 rounded-lg">
                  <div>
                    <div className="text-xl md:text-3xl font-bold text-blue-600">{finalScores.finance}</div>
                    <div className="text-xs md:text-sm text-gray-700 font-medium">Finanzas</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-3xl font-bold text-green-600">{finalScores.operations}</div>
                    <div className="text-xs md:text-sm text-gray-700 font-medium">Operaciones</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-3xl font-bold text-purple-600">{finalScores.marketing}</div>
                    <div className="text-xs md:text-sm text-gray-700 font-medium">Marketing</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comparación con Benchmark */}
            <Card className="border-gray-200">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-lg md:text-xl text-gray-800">
                  {clientInfo?.companyName || 'Tu Empresa'} vs Industria {industryName}
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <div ref={barChartRef} className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: '#374151', fontSize: 12 }}
                      />
                      <YAxis 
                        domain={[0, 100]} 
                        tick={{ fill: '#374151', fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="score" name={clientInfo?.companyName || 'Tu Negocio'}>
                        {barData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                      <Bar dataKey="benchmark" name={`Promedio ${industryName}`} fill="#E5E7EB" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights clave mejorados */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-base md:text-lg text-gray-800">Área Crítica</h3>
                </div>
                <p className="text-gray-700 text-sm md:text-base">
                  Tu eje más débil es <span className="font-bold text-orange-700">
                    {weakestAxis.key === 'finance' ? 'Finanzas' : 
                     weakestAxis.key === 'operations' ? 'Operaciones' : 'Marketing'}
                  </span> con {weakestAxis.value} puntos.
                </p>
                <p className="text-xs md:text-sm text-gray-600 mt-2">
                  {benchmarks[weakestAxis.key as keyof typeof benchmarks] - weakestAxis.value} puntos por debajo del promedio de {industryName}.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Target className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-base md:text-lg text-gray-800">Potencial de Mejora</h3>
                </div>
                <p className="text-gray-700 text-sm md:text-base">
                  Tienes un <span className="font-bold text-blue-700">{Math.round(totalImprovementPotential/3)}%</span> de 
                  potencial de mejora promedio.
                </p>
                <p className="text-xs md:text-sm text-gray-600 mt-2">
                  Con las estrategias correctas, puedes superar el promedio de la industria.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-base md:text-lg text-gray-800">Tu Fortaleza</h3>
                </div>
                <p className="text-gray-700 text-sm md:text-base">
                  Destacas en <span className="font-bold text-green-700">
                    {strongestAxis.key === 'finance' ? 'Finanzas' : 
                     strongestAxis.key === 'operations' ? 'Operaciones' : 'Marketing'}
                  </span> con {strongestAxis.value} puntos.
                </p>
                <p className="text-xs md:text-sm text-gray-600 mt-2">
                  {strongestAxis.value > benchmarks[strongestAxis.key as keyof typeof benchmarks] ? 
                    `${strongestAxis.value - benchmarks[strongestAxis.key as keyof typeof benchmarks]} puntos sobre el promedio.` :
                    'Aprovecha esta base sólida para crecer.'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'details' && (
        <div className="space-y-6">
          {/* Análisis detallado mejorado */}
          <Card className="border-gray-200">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-xl md:text-2xl text-gray-800">
                Análisis Detallado por Eje - Industria: {industryName}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 pt-6">
              {/* Finanzas */}
              <div className="border-l-4 border-blue-600 pl-4 md:pl-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 flex items-center gap-2 text-gray-800">
                      <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                      Finanzas - {finalScores.finance} puntos
                    </h3>
                    <div className="flex items-center gap-4 text-sm md:text-base">
                      <span className="text-gray-600">Benchmark {industryName}: {benchmarks.finance}</span>
                      <span className={finalScores.finance >= benchmarks.finance ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {finalScores.finance >= benchmarks.finance ? "✓ Por encima" : "✗ Por debajo"}
                        ({finalScores.finance >= benchmarks.finance ? '+' : ''}{finalScores.finance - benchmarks.finance})
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Industry Comparison */}
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-lg border-2 border-blue-300">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Comparación con {industryName}
                    </h4>
                    <p className="text-blue-800 text-sm md:text-base font-medium">
                      {industryComparisons.finance}
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Diagnóstico:</h4>
                    <p className="text-gray-700 text-sm md:text-base">
                      {finalScores.finance >= 80 ? 
                        `Excelente gestión financiera. ${clientInfo?.companyName || 'Tu empresa'} demuestra un control excepcional, superando ampliamente el promedio de ${benchmarks.finance} puntos en ${industryName}. Este nivel de madurez financiera te posiciona en el top 10% de tu industria.` :
                        finalScores.finance >= 60 ?
                        `Control financiero sólido. Con ${finalScores.finance} puntos, ${finalScores.finance >= benchmarks.finance ? 'superas' : 'estás cerca de'} el promedio de la industria. Hay oportunidades específicas para optimizar márgenes y flujo de caja que podrían elevar tu puntuación 15-20 puntos adicionales.` :
                        finalScores.finance >= 40 ?
                        `Control financiero en desarrollo. Tu puntuación de ${finalScores.finance} indica que hay sistemas básicos implementados, pero falta visibilidad en tiempo real. Las empresas de ${industryName} con mejores prácticas promedian ${benchmarks.finance} puntos.` :
                        `Gestión financiera reactiva. Con ${finalScores.finance} puntos, estás ${benchmarks.finance - finalScores.finance} puntos por debajo del estándar de la industria. Esto representa la mayor oportunidad de mejora inmediata para tu negocio.`
                      }
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Contexto de la Industria:</h4>
                    <p className="text-gray-700 text-sm md:text-base">
                      {industryName === 'Tecnología' ? 
                        'En el sector tecnológico, el control financiero riguroso es crítico debido a los ciclos de inversión y la necesidad de demostrar métricas SaaS como MRR, CAC y LTV a inversores.' :
                        industryName === 'Retail' ?
                        'En retail, la gestión de inventario y márgenes ajustados requiere visibilidad financiera diaria. Los líderes del sector operan con dashboards en tiempo real.' :
                        industryName === 'Servicios' ?
                        'En servicios profesionales, el tracking de rentabilidad por proyecto y cliente es fundamental. Las firmas exitosas mantienen márgenes del 20-30% mediante control estricto.' :
                        industryName === 'Alimentos' ?
                        'En la industria alimentaria, el control de costos variables y la gestión de mermas puede significar la diferencia entre pérdida y ganancia. Los márgenes típicos oscilan entre 3-8%.' :
                        `En ${industryName}, el control financiero efectivo es la base para la toma de decisiones estratégicas y el crecimiento sostenible.`
                      }
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-blue-800">ROI Potencial:</p>
                      <p className="text-lg md:text-xl font-bold text-blue-900">
                        {finalScores.finance < 60 ? '250-400%' : '150-200%'}
                      </p>
                      <p className="text-xs text-blue-700">en 12 meses</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-blue-800">Tiempo de Implementación:</p>
                      <p className="text-lg md:text-xl font-bold text-blue-900">
                        {finalScores.finance < 60 ? '30-45' : '15-30'} días
                      </p>
                      <p className="text-xs text-blue-700">para ver resultados</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operaciones */}
              <div className="border-l-4 border-green-600 pl-4 md:pl-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 flex items-center gap-2 text-gray-800">
                      <Clock className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                      Operaciones - {finalScores.operations} puntos
                    </h3>
                    <div className="flex items-center gap-4 text-sm md:text-base">
                      <span className="text-gray-600">Benchmark {industryName}: {benchmarks.operations}</span>
                      <span className={finalScores.operations >= benchmarks.operations ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {finalScores.operations >= benchmarks.operations ? "✓ Por encima" : "✗ Por debajo"}
                        ({finalScores.operations >= benchmarks.operations ? '+' : ''}{finalScores.operations - benchmarks.operations})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Industry Comparison */}
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-lg border-2 border-green-300">
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Comparación con {industryName}
                    </h4>
                    <p className="text-green-800 text-sm md:text-base font-medium">
                      {industryComparisons.operations}
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Diagnóstico:</h4>
                    <p className="text-gray-700 text-sm md:text-base">
                      {finalScores.operations >= 80 ? 
                        `Operaciones de clase mundial. Con ${finalScores.operations} puntos, superas el benchmark de ${benchmarks.operations} en ${industryName}. Tus procesos automatizados y documentados son un activo competitivo que te permite escalar eficientemente.` :
                        finalScores.operations >= 60 ?
                        `Operaciones eficientes. Tu puntuación de ${finalScores.operations} ${finalScores.operations >= benchmarks.operations ? 'supera' : 'se acerca a'} la media de la industria. Existe potencial para automatizar 2-3 procesos clave adicionales que liberarían 10-15 horas semanales.` :
                        finalScores.operations >= 40 ?
                        `Operaciones funcionales con oportunidades. Con ${finalScores.operations} puntos, hay margen significativo para alcanzar el estándar de ${benchmarks.operations} en ${industryName}. La automatización selectiva puede duplicar tu capacidad sin aumentar costos.` :
                        `Operaciones principalmente manuales. Tu puntuación de ${finalScores.operations} está ${benchmarks.operations - finalScores.operations} puntos debajo del promedio. Se estima que el 60-70% del tiempo de tu equipo se dedica a tareas repetitivas automatizables.`
                      }
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Mejores Prácticas en {industryName}:</h4>
                    <p className="text-gray-700 text-sm md:text-base">
                      {industryName === 'Tecnología' ? 
                        'Las empresas tech líderes automatizan deployment, testing y soporte nivel 1. Utilizan metodologías ágiles y DevOps para reducir time-to-market en 40-60%.' :
                        industryName === 'Retail' ?
                        'Los retailers exitosos integran inventario, POS y e-commerce en tiempo real. La automatización de reabastecimiento y pricing dinámico son estándares de la industria.' :
                        industryName === 'Servicios' ?
                        'Las firmas de servicios eficientes automatizan propuestas, onboarding y facturación. Los líderes mantienen utilización del 75-85% mediante gestión inteligente de recursos.' :
                        industryName === 'Alimentos' ?
                        'En alimentos, la trazabilidad automatizada, control de temperatura y gestión FIFO son críticos. Los líderes reducen mermas al 2-3% mediante sistemas predictivos.' :
                        `En ${industryName}, la eficiencia operativa marca la diferencia entre líderes y seguidores del mercado.`
                      }
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-green-800">Ahorro Potencial:</p>
                      <p className="text-lg md:text-xl font-bold text-green-900">
                        {finalScores.operations < 60 ? '20-30' : '10-15'} hrs/semana
                      </p>
                      <p className="text-xs text-green-700">en tareas manuales</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-green-800">Incremento Capacidad:</p>
                      <p className="text-lg md:text-xl font-bold text-green-900">
                        {finalScores.operations < 60 ? '2-3X' : '1.5-2X'}
                      </p>
                      <p className="text-xs text-green-700">sin contratar más personal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Marketing */}
              <div className="border-l-4 border-purple-600 pl-4 md:pl-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 flex items-center gap-2 text-gray-800">
                      <Target className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                      Marketing - {finalScores.marketing} puntos
                    </h3>
                    <div className="flex items-center gap-4 text-sm md:text-base">
                      <span className="text-gray-600">Benchmark {industryName}: {benchmarks.marketing}</span>
                      <span className={finalScores.marketing >= benchmarks.marketing ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                        {finalScores.marketing >= benchmarks.marketing ? "✓ Por encima" : "✗ Por debajo"}
                        ({finalScores.marketing >= benchmarks.marketing ? '+' : ''}{finalScores.marketing - benchmarks.marketing})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Industry Comparison */}
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg border-2 border-purple-300">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Comparación con {industryName}
                    </h4>
                    <p className="text-purple-800 text-sm md:text-base font-medium">
                      {industryComparisons.marketing}
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Diagnóstico:</h4>
                    <p className="text-gray-700 text-sm md:text-base">
                      {finalScores.marketing >= 80 ? 
                        `Marketing de alto rendimiento. Con ${finalScores.marketing} puntos, superas significativamente el promedio de ${benchmarks.marketing} en ${industryName}. Tu marca genera demanda consistente y tiene un CAC optimizado con LTV/CAC > 3:1.` :
                        finalScores.marketing >= 60 ?
                        `Estrategia de marketing efectiva. Tu puntuación de ${finalScores.marketing} ${finalScores.marketing >= benchmarks.marketing ? 'está por encima del' : 'se acerca al'} promedio de la industria. Con optimizaciones específicas en canales digitales, podrías reducir CAC en 20-30%.` :
                        finalScores.marketing >= 40 ?
                        `Marketing en fase de construcción. Con ${finalScores.marketing} puntos, tienes base pero falta consistencia. El promedio en ${industryName} es ${benchmarks.marketing}, indicando oportunidad de crecimiento significativo en generación de demanda.` :
                        `Marketing reactivo y limitado. Tu puntuación de ${finalScores.marketing} está ${benchmarks.marketing - finalScores.marketing} puntos bajo el estándar. Los competidores están capturando tu mercado potencial mediante estrategias digitales efectivas.`
                      }
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Tendencias en {industryName}:</h4>
                    <p className="text-gray-700 text-sm md:text-base">
                      {industryName === 'Tecnología' ? 
                        'En tech, el content marketing y product-led growth dominan. Las empresas exitosas generan 60% de leads mediante contenido educativo y mantienen tasas de conversión del 2-4%.' :
                        industryName === 'Retail' ?
                        'El retail moderno requiere omnicanalidad. Los líderes integran experiencias online/offline, utilizan personalización AI y mantienen engagement rates del 15-20% en email.' :
                        industryName === 'Servicios' ?
                        'En servicios, el thought leadership y referencias son clave. Las firmas exitosas generan 40% de nuevos clientes vía referencias y mantienen presencia activa en LinkedIn.' :
                        industryName === 'Alimentos' ?
                        'En alimentos, la presencia local y redes sociales son críticas. Los exitosos mantienen ratings 4.5+ en Google y generan 30% de ventas vía marketing digital local.' :
                        `En ${industryName}, el marketing digital efectivo es indispensable para el crecimiento sostenible.`
                      }
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-purple-800">Incremento en Leads:</p>
                      <p className="text-lg md:text-xl font-bold text-purple-900">
                        {finalScores.marketing < 60 ? '3-5X' : '2-3X'}
                      </p>
                      <p className="text-xs text-purple-700">en 6 meses</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-purple-800">Reducción CAC:</p>
                      <p className="text-lg md:text-xl font-bold text-purple-900">
                        {finalScores.marketing < 60 ? '40-60%' : '20-30%'}
                      </p>
                      <p className="text-xs text-purple-700">con automatización</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          {/* Mostrar loading mientras carga IA */}
          {loadingAI ? (
            <Card className="border-gray-200">
              <CardContent className="py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Generando recomendaciones personalizadas con IA...</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <ProfessionalRecommendations 
              scores={finalScores} 
              clientInfo={clientInfo}
              responses={responses}
            />
          )}
        </div>
      )}

      {/* Call to Action mejorado con PDFGenerator integrado */}
      <Card className="relative overflow-hidden border-2 border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <CardContent className="relative z-10 py-6 md:py-8">
          <div className="text-center space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-white">
              ¿Listo para transformar tu negocio?
            </h3>
            <p className="text-blue-100 max-w-2xl mx-auto text-sm md:text-base px-4">
              {userData?.role === 'client' || userData?.role === 'consultant' || userData?.role === 'admin' ? 
                "Descarga tu diagnóstico completo y agenda tu sesión de estrategia para implementar las mejoras." :
                "Agenda una consultoría gratuita de 30 minutos y te mostraremos exactamente cómo implementar estas mejoras en tu negocio."
              }
            </p>
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center pt-2 md:pt-4 px-4">
              <Link 
                href="https://calendly.com/orlando-tuimpulsalab/30min"
                target="_blank"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-lg 
                         font-semibold text-base md:text-lg transition-all duration-300 
                         hover:scale-105 hover:bg-gray-100 hover:shadow-xl group w-full md:w-auto"
              >
                Agendar Consultoría Gratuita
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              {/* Integración del PDFGenerator */}
              <PDFGenerator
                scores={finalScores}
                responses={responses}
                clientInfo={clientInfo}
                aiAnalysis={recommendations}
                chartRefs={{
                  radar: radarChartRef,
                  bar: barChartRef
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}