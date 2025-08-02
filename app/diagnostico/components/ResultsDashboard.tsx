'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index';
import { Button } from '@/components/ui/button';
import { TrendingUp, Download, Calendar, ArrowRight, Share2, Award, Target, AlertTriangle, CheckCircle, Clock, DollarSign, FileText } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { ProfessionalRecommendations } from './ProfessionalRecommendations';
import Link from 'next/link';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  const [generatingPDF, setGeneratingPDF] = useState(false);
  
  // Aplicar ponderaciones finales
  const finalScores = {
    finance: Math.round(rawScores.finance),
    operations: Math.round(rawScores.operations),
    marketing: Math.round(rawScores.marketing)
  };

  const averageScore = Math.round((finalScores.finance + finalScores.operations + finalScores.marketing) / 3);

  // Determinar el estado general
  const getBusinessStage = (avg: number) => {
    if (avg >= 70) return { stage: 'Expansión', color: 'text-green-600', bg: 'bg-green-50', description: 'Tu negocio está listo para escalar' };
    if (avg >= 40) return { stage: 'Crecimiento', color: 'text-blue-600', bg: 'bg-blue-50', description: 'Tienes una base sólida para crecer' };
    return { stage: 'Supervivencia', color: 'text-orange-600', bg: 'bg-orange-50', description: 'Es momento de fortalecer los fundamentos' };
  };

  const businessStage = getBusinessStage(averageScore);

  // Datos para el gráfico de radar mejorado
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

  // Datos para el gráfico de barras
  const barData = [
    {
      name: 'Finanzas',
      score: finalScores.finance,
      benchmark: 65,
      color: '#3B82F6'
    },
    {
      name: 'Operaciones',
      score: finalScores.operations,
      benchmark: 70,
      color: '#10B981'
    },
    {
      name: 'Marketing',
      score: finalScores.marketing,
      benchmark: 60,
      color: '#8B5CF6'
    }
  ];

  // Identificar el eje más débil
  const weakestAxis = Object.entries(finalScores).reduce((min, [key, value]) => 
    value < min.value ? { key, value } : min, 
    { key: 'finance', value: finalScores.finance }
  );

  // Calcular el potencial de mejora
  const improvementPotential = {
    finance: 100 - finalScores.finance,
    operations: 100 - finalScores.operations,
    marketing: 100 - finalScores.marketing
  };

  const totalImprovementPotential = improvementPotential.finance + improvementPotential.operations + improvementPotential.marketing;

  // Contador total de preguntas
  const getTotalQuestions = () => {
    return responses.length;
  };

  // Función para generar PDF mejorado
 const handleDownloadPDF = async () => {
  setGeneratingPDF(true);
  
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Colores corporativos como tuplas
    const primaryBlue: [number, number, number] = [0, 45, 98];
    const accentBlue: [number, number, number] = [59, 130, 246];
    const purple: [number, number, number] = [147, 51, 234];
    const green: [number, number, number] = [16, 185, 129];
    
    // Página 1: Portada mejorada
    // Fondo gradiente
    for (let i = 0; i < pageHeight; i += 2) {
      const ratio = i / pageHeight;
      const r = Math.round(59 + (147 - 59) * ratio);
      const g = Math.round(130 + (51 - 130) * ratio);
      const b = Math.round(246 + (234 - 246) * ratio);
      pdf.setFillColor(r, g, b);
      pdf.rect(0, i, pageWidth, 2, 'F');
    }
    
    // Marco decorativo
    pdf.setDrawColor(255, 255, 255);
    pdf.setLineWidth(2);
    pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);
    
    // Logo/Título
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(48);
    pdf.setFont('helvetica', 'bold');
    pdf.text('DIAGNÓSTICO 3D', pageWidth / 2, 60, { align: 'center' });
    
    pdf.setFontSize(32);
    pdf.setFont('helvetica', 'normal');
    pdf.text('IMPULSA™', pageWidth / 2, 80, { align: 'center' });
    
    // Línea decorativa
    pdf.setLineWidth(1);
    pdf.line(30, 90, pageWidth - 30, 90);
    
    // Información del cliente
    pdf.setFontSize(28);
    pdf.setFont('helvetica', 'bold');
    pdf.text(clientInfo.companyName || 'Tu Empresa', pageWidth / 2, 120, { align: 'center' });
    
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'normal');
    pdf.text(new Date().toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }), pageWidth / 2, 135, { align: 'center' });
    
    // Score principal en círculo más grande
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(255, 255, 255);
    pdf.setLineWidth(3);
    pdf.circle(pageWidth / 2, 180, 40, 'S');
    
    pdf.setFontSize(64);
    pdf.setFont('helvetica', 'bold');
    pdf.text(averageScore.toString(), pageWidth / 2, 195, { align: 'center' });
    
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'normal');
    pdf.text('PUNTUACIÓN GLOBAL', pageWidth / 2, 235, { align: 'center' });
    
    // Estado del negocio
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`ETAPA: ${businessStage.stage.toUpperCase()}`, pageWidth / 2, 260, { align: 'center' });
    
    // Página 2: Resumen Ejecutivo
    pdf.addPage();
    
    // Header con mejor contraste
    pdf.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    pdf.rect(0, 0, pageWidth, 35, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text('RESUMEN EJECUTIVO', pageWidth / 2, 22, { align: 'center' });
    
    pdf.setTextColor(0, 0, 0);
    let yPos = 50;
    
    // Contexto con texto justificado
    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Contexto del Diagnóstico', 20, yPos);
    pdf.setFont('helvetica', 'normal');
    yPos += 8;
    
    const contextText = `Este diagnóstico integral evalúa el estado actual de ${clientInfo.companyName || 'su empresa'} en tres dimensiones críticas: Finanzas, Operaciones y Marketing. El análisis se basa en ${getTotalQuestions()} indicadores clave evaluados mediante nuestra metodología propietaria Impulsa 3D™.`;
    const contextLines = pdf.splitTextToSize(contextText, pageWidth - 40);
    pdf.setFontSize(11);
    contextLines.forEach((line: string) => {
      pdf.text(line, 20, yPos, { align: 'justify', maxWidth: pageWidth - 40 });
      yPos += 6;
    });
    yPos += 5;
    
    // Hallazgos clave con mejor diseño
    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Hallazgos Clave', 20, yPos);
    yPos += 8;
    
    // Fortaleza principal
    const strongestAxis = Object.entries(finalScores).reduce((max, [key, value]) => 
      value > max.value ? { key, value } : max, 
      { key: 'finance', value: finalScores.finance }
    );
    
    // Cuadros de hallazgos
    pdf.setFillColor(green[0], green[1], green[2], 0.1);
    pdf.rect(20, yPos - 5, pageWidth - 40, 20, 'F');
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text('✓ Fortaleza Principal:', 25, yPos + 3);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${strongestAxis.key === 'finance' ? 'Finanzas' : strongestAxis.key === 'operations' ? 'Operaciones' : 'Marketing'} (${strongestAxis.value} puntos)`, 70, yPos + 3);
    yPos += 25;
    
    pdf.setFillColor(255, 193, 7, 0.1);
    pdf.rect(20, yPos - 5, pageWidth - 40, 20, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.text('⚠ Área Crítica:', 25, yPos + 3);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${weakestAxis.key === 'finance' ? 'Finanzas' : weakestAxis.key === 'operations' ? 'Operaciones' : 'Marketing'} (${weakestAxis.value} puntos)`, 70, yPos + 3);
    yPos += 25;
    
    pdf.setFillColor(accentBlue[0], accentBlue[1], accentBlue[2], 0.1);
    pdf.rect(20, yPos - 5, pageWidth - 40, 20, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.text('↗ Potencial de Mejora:', 25, yPos + 3);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${Math.round(totalImprovementPotential/3)}% promedio en los tres ejes`, 70, yPos + 3);
    
    // Página 3: Análisis de Finanzas
    pdf.addPage();
    
    // Header con buen contraste
    pdf.setFillColor(accentBlue[0], accentBlue[1], accentBlue[2]);
    pdf.rect(0, 0, pageWidth, 35, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ANÁLISIS DEL EJE DE FINANZAS', pageWidth / 2, 22, { align: 'center' });
    
    pdf.setTextColor(0, 0, 0);
    yPos = 50;
    
    // Score visual mejorado
    pdf.setFillColor(accentBlue[0], accentBlue[1], accentBlue[2]);
    pdf.circle(35, yPos + 10, 15, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(finalScores.finance.toString(), 35, yPos + 18, { align: 'center' });
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(16);
    pdf.text('de 100 puntos posibles', 60, yPos + 15);
    
    yPos += 35;
    
    // Análisis detallado
    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Diagnóstico', 20, yPos);
    pdf.setFont('helvetica', 'normal');
    yPos += 8;
    
    const financeAnalysis = finalScores.finance >= 70 ? 
      `Excelente gestión financiera. ${clientInfo.companyName} demuestra un control sobresaliente sobre sus métricas financieras clave. La visibilidad sobre rentabilidad, flujo de caja y márgenes permite una toma de decisiones ágil y fundamentada.` :
      finalScores.finance >= 40 ?
      `Control financiero en desarrollo. Aunque existen procesos básicos de gestión, hay oportunidades significativas para mejorar la visibilidad y el análisis. La implementación de dashboards podría generar ahorros de 10-15 horas semanales.` :
      `Gestión financiera reactiva. La falta de visibilidad sobre métricas clave está limitando el potencial de crecimiento. Es crítico implementar sistemas de control para estabilizar y hacer crecer el negocio.`;
    
    const financeLines = pdf.splitTextToSize(financeAnalysis, pageWidth - 40);
    pdf.setFontSize(11);
    financeLines.forEach((line: string) => {
      pdf.text(line, 20, yPos, { align: 'justify', maxWidth: pageWidth - 40 });
      yPos += 6;
    });
    yPos += 10;
    
    // Recomendaciones con viñetas mejoradas
    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Plan de Acción Recomendado', 20, yPos);
    yPos += 8;
    
    const financeRecs = finalScores.finance < 70 ? [
      'Implementar dashboard financiero automatizado con KPIs en tiempo real',
      'Establecer proceso de revisión semanal de métricas clave',
      'Categorizar gastos para identificar oportunidades de optimización',
      'Implementar sistema de costeo por producto/servicio',
      'Crear proyecciones de flujo de caja a 90 días'
    ] : [
      'Explorar herramientas de IA para análisis predictivo',
      'Implementar benchmarking contra líderes de la industria',
      'Desarrollar modelos de pricing dinámico',
      'Automatizar reportes para stakeholders',
      'Evaluar oportunidades de inversión estratégica'
    ];
    
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    financeRecs.forEach(rec => {
      pdf.setFillColor(accentBlue[0], accentBlue[1], accentBlue[2]);
      pdf.circle(23, yPos - 2, 2, 'F');
      pdf.setTextColor(0, 0, 0);
      pdf.text(rec, 30, yPos);
      yPos += 8;
    });
    
    // Página 4: Operaciones (similar pero con color verde)
    pdf.addPage();
    
    pdf.setFillColor(green[0], green[1], green[2]);
    pdf.rect(0, 0, pageWidth, 35, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ANÁLISIS DEL EJE DE OPERACIONES', pageWidth / 2, 22, { align: 'center' });
    
    pdf.setTextColor(0, 0, 0);
    yPos = 50;
    
    // Score visual
    pdf.setFillColor(green[0], green[1], green[2]);
    pdf.circle(35, yPos + 10, 15, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text(finalScores.operations.toString(), 35, yPos + 18, { align: 'center' });
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(16);
    pdf.text('de 100 puntos posibles', 60, yPos + 15);
    
    yPos += 35;
    
    // Continuar con el mismo patrón para operaciones...
    
    // Página 5: Marketing (similar pero con color púrpura)
    pdf.addPage();
    
    pdf.setFillColor(purple[0], purple[1], purple[2]);
    pdf.rect(0, 0, pageWidth, 35, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ANÁLISIS DEL EJE DE MARKETING', pageWidth / 2, 22, { align: 'center' });
    
    // ... continuar con el mismo patrón
    
    // Página final: Siguiente paso
    pdf.addPage();
    
    // Fondo suave
    pdf.setFillColor(245, 245, 245);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    
    // Header
    pdf.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    pdf.rect(0, 0, pageWidth, 35, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text('TU SIGUIENTE PASO', pageWidth / 2, 22, { align: 'center' });
    
    pdf.setTextColor(0, 0, 0);
    yPos = 60;
    
    // Mensaje personalizado
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    const nextStepText = isInternalMode ? 
      `${clientInfo.companyName}, este diagnóstico revela oportunidades concretas para transformar tu negocio. Nuestro equipo ha diseñado un plan personalizado que atacará primero ${weakestAxis.key === 'finance' ? 'las Finanzas' : weakestAxis.key === 'operations' ? 'las Operaciones' : 'el Marketing'}.` :
      `${clientInfo.companyName}, este diagnóstico gratuito es solo el primer paso. En una consultoría personalizada, diseñaremos juntos el plan exacto para transformar tu negocio.`;
    
    const nextStepLines = pdf.splitTextToSize(nextStepText, pageWidth - 60);
    nextStepLines.forEach((line: string) => {
      pdf.text(line, pageWidth / 2, yPos, { align: 'center' });
      yPos += 8;
    });
    yPos += 20;
    
    // CTA principal
    pdf.setFillColor(accentBlue[0], accentBlue[1], accentBlue[2]);
    pdf.roundedRect(pageWidth/2 - 70, yPos - 10, 140, 25, 5, 5, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(isInternalMode ? 'AGENDA TU SESIÓN DE IMPULSO' : 'AGENDA TU CONSULTORÍA GRATUITA', pageWidth / 2, yPos + 3, { align: 'center' });
    
    yPos += 40;
    
    // Información de contacto centrada
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Contacto directo:', pageWidth / 2, yPos, { align: 'center' });
    pdf.setFont('helvetica', 'bold');
    pdf.text('orlando@tuimpulsalab.com', pageWidth / 2, yPos + 8, { align: 'center' });
    pdf.text('tuimpulsalab.com', pageWidth / 2, yPos + 16, { align: 'center' });
    pdf.text('+1 234 567 890', pageWidth / 2, yPos + 24, { align: 'center' });
    
    // Footer
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.setFont('helvetica', 'normal');
    pdf.text('© 2025 Impulsa Lab - Encontramos Tu Coordenada Correcta', pageWidth / 2, pageHeight - 25, { align: 'center' });
    pdf.text(`Diagnóstico confidencial preparado para ${clientInfo.companyName || 'la empresa'}`, pageWidth / 2, pageHeight - 20, { align: 'center' });
    pdf.text(new Date().toLocaleDateString('es-ES'), pageWidth / 2, pageHeight - 15, { align: 'center' });
    
    // Guardar el PDF
    pdf.save(`Diagnostico-3D-${clientInfo.companyName || 'Empresa'}-${new Date().toISOString().split('T')[0]}.pdf`);
    
  } catch (error) {
    console.error('Error generando PDF:', error);
    alert('Hubo un error al generar el PDF. Por favor intenta de nuevo.');
  } finally {
    setGeneratingPDF(false);
  }
};

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header con estado del negocio - COMPACTO Y VIBRANTE */}
      <div className="relative overflow-hidden rounded-xl p-4 border-2">
        {/* Fondo con gradiente vibrante */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/20 to-blue-500/30"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                Diagnóstico 3D Completado
              </h2>
              <p className="text-white/90 text-sm">
                {clientInfo.companyName || 'Tu Empresa'} • {new Date().toLocaleDateString('es-ES')}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-semibold border border-white/30 mt-2">
                <Award className="w-4 h-4" />
                {businessStage.stage}: {businessStage.description}
              </div>
            </div>
            <div className="text-right">
              <div className="text-6xl font-bold text-white drop-shadow-lg">
                {averageScore}
              </div>
              <div className="text-xs text-white/80 uppercase tracking-wider">Puntuación Global</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'overview' 
              ? 'border-b-2 border-blue-600 text-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Vista General
        </button>
        <button
          onClick={() => setActiveTab('details')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'details' 
              ? 'border-b-2 border-blue-600 text-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Análisis Detallado
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'recommendations' 
              ? 'border-b-2 border-blue-600 text-blue-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Plan de Acción con IA
        </button>
      </div>

      {/* Contenido según la pestaña activa */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Gráficos principales */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Gráfico de Radar con fondo vibrante */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
                <CardTitle className="text-white">Mapa 3D de tu Negocio</CardTitle>
              </CardHeader>
              <CardContent className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-0">
                <div className="h-80 p-4">
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
                        tick={{ fill: '#1e293b', fontSize: 14, fontWeight: 600 }}
                      />
                      <PolarRadiusAxis 
                        domain={[0, 100]} 
                        tick={{ fill: '#64748b', fontSize: 12 }}
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
                <div className="grid grid-cols-3 gap-4 text-center p-4 bg-white/50">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">{finalScores.finance}</div>
                    <div className="text-sm text-gray-700 font-medium">Finanzas</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">{finalScores.operations}</div>
                    <div className="text-sm text-gray-700 font-medium">Operaciones</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600">{finalScores.marketing}</div>
                    <div className="text-sm text-gray-700 font-medium">Marketing</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comparación con Benchmark */}
            <Card>
              <CardHeader>
                <CardTitle>Comparación de {clientInfo.companyName || 'Tu Empresa'} con la Industria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="score" name={clientInfo.companyName || 'Tu Negocio'}>
                        {barData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                      <Bar dataKey="benchmark" name="Promedio Industria" fill="#E5E7EB" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights clave */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-8 h-8 text-orange-600" />
                  <h3 className="font-semibold text-lg">Área Crítica</h3>
                </div>
                <p className="text-gray-700">
                  Tu eje más débil es <span className="font-bold">
                    {weakestAxis.key === 'finance' ? 'Finanzas' : 
                     weakestAxis.key === 'operations' ? 'Operaciones' : 'Marketing'}
                  </span> con {weakestAxis.value} puntos.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Enfocarte aquí puede generar el mayor impacto inmediato.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-8 h-8 text-blue-600" />
                  <h3 className="font-semibold text-lg">Potencial de Mejora</h3>
                </div>
                <p className="text-gray-700">
                  Tienes un <span className="font-bold">{Math.round(totalImprovementPotential/3)}%</span> de 
                  potencial de mejora promedio en los 3 ejes.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Con las estrategias correctas, puedes transformar tu negocio.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <h3 className="font-semibold text-lg">Proyección</h3>
                </div>
                <p className="text-gray-700">
                  Implementando nuestras recomendaciones, podrías alcanzar 
                  <span className="font-bold"> 85+ puntos</span> en 90 días.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  El 87% de nuestros clientes lo logran.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'details' && (
        <div className="space-y-6">
          {/* Análisis detallado por eje */}
          <Card>
            <CardHeader>
              <CardTitle>Análisis Detallado por Eje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Finanzas */}
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  Finanzas - {finalScores.finance} puntos
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    {finalScores.finance >= 70 ? 
                      "Excelente control financiero. Tienes visibilidad clara de tu rentabilidad y flujo de caja." :
                      finalScores.finance >= 40 ?
                      "Control financiero moderado. Hay oportunidades para mejorar la visibilidad y análisis." :
                      "Control financiero limitado. Es crítico implementar sistemas de gestión financiera."
                    }
                  </p>
                  <div className="flex gap-4 text-sm">
                    <span className="text-gray-600">Benchmark industria: 65</span>
                    <span className={finalScores.finance >= 65 ? "text-green-600" : "text-red-600"}>
                      {finalScores.finance >= 65 ? "✓ Por encima" : "✗ Por debajo"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Operaciones */}
              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  Operaciones - {finalScores.operations} puntos
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    {finalScores.operations >= 70 ? 
                      "Operaciones optimizadas. Tus procesos son eficientes y escalables." :
                      finalScores.operations >= 40 ?
                      "Operaciones funcionales. Existen oportunidades de automatización y mejora." :
                      "Operaciones manuales. La automatización puede liberar tiempo valioso."
                    }
                  </p>
                  <div className="flex gap-4 text-sm">
                    <span className="text-gray-600">Benchmark industria: 70</span>
                    <span className={finalScores.operations >= 70 ? "text-green-600" : "text-red-600"}>
                      {finalScores.operations >= 70 ? "✓ Por encima" : "✗ Por debajo"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Marketing */}
              <div className="border-l-4 border-purple-600 pl-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Marketing - {finalScores.marketing} puntos
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    {finalScores.marketing >= 70 ? 
                      "Marketing avanzado. Tu marca es fuerte y atraes clientes consistentemente." :
                      finalScores.marketing >= 40 ?
                      "Marketing en desarrollo. Hay potencial para fortalecer tu presencia." :
                      "Marketing básico. Es momento de construir una estrategia de crecimiento."
                    }
                  </p>
                  <div className="flex gap-4 text-sm">
                    <span className="text-gray-600">Benchmark industria: 60</span>
                    <span className={finalScores.marketing >= 60 ? "text-green-600" : "text-red-600"}>
                      {finalScores.marketing >= 60 ? "✓ Por encima" : "✗ Por debajo"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          {/* Recomendaciones Personalizadas con IA */}
          <ProfessionalRecommendations 
            scores={finalScores} 
            clientInfo={clientInfo}
            responses={responses}
          />
        </div>
      )}

      {/* Call to Action - MEJORADO */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <CardContent className="relative z-10 py-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-white">
              ¿Listo para transformar tu negocio?
            </h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              {isInternalMode ? 
                "Iniciemos la transformación de tu negocio con el plan personalizado que hemos diseñado para ti." :
                "Agenda una consultoría gratuita de 30 minutos y te mostraremos exactamente cómo implementar estas mejoras en tu negocio."
              }
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link 
                href="https://calendly.com/orlando-tuimpulsalab/30min"
                target="_blank"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg 
                         font-semibold text-lg transition-all duration-300 
                         hover:scale-105 hover:bg-gray-100 hover:shadow-xl group"
              >
                {isInternalMode ? "Agendemos tu Impulso" : "Agendar Consultoría Gratuita"}
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Button 
                size="lg" 
                onClick={handleDownloadPDF}
                disabled={generatingPDF}
                className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-purple-600 
                         font-semibold text-lg transition-all duration-300 px-8 py-4"
              >
                {generatingPDF ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Generando PDF...
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5 mr-2" />
                    Descargar Diagnóstico PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}