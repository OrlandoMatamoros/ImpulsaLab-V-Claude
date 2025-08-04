'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/index';
import { Button } from '@/components/ui/button';
import { TrendingUp, Download, Calendar, ArrowRight, Share2, Award, Target, AlertTriangle, CheckCircle, Clock, DollarSign, FileText, Lock } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { ProfessionalRecommendations } from './ProfessionalRecommendations';
import Link from 'next/link';
import jsPDF from 'jspdf';

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

// Datos de benchmarking por industria
const industryBenchmarks: { [key: string]: { finance: number; operations: number; marketing: number } } = {
  'Tecnología': { finance: 75, operations: 80, marketing: 70 },
  'Retail': { finance: 65, operations: 70, marketing: 75 },
  'Servicios': { finance: 70, operations: 65, marketing: 65 },
  'Manufactura': { finance: 70, operations: 75, marketing: 60 },
  'Salud': { finance: 80, operations: 75, marketing: 55 },
  'Educación': { finance: 60, operations: 65, marketing: 60 },
  'Alimentos': { finance: 65, operations: 70, marketing: 65 },
  'Otro': { finance: 65, operations: 70, marketing: 60 }
};

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
  const [recommendations, setRecommendations] = useState<any>(null);
  
  // Debug info
  console.log('ClientInfo en ResultsDashboard:', clientInfo);
  
  // Aplicar ponderaciones finales
  const finalScores = {
    finance: Math.round(rawScores.finance),
    operations: Math.round(rawScores.operations),
    marketing: Math.round(rawScores.marketing)
  };

  const averageScore = Math.round((finalScores.finance + finalScores.operations + finalScores.marketing) / 3);
  
  // Obtener benchmarks de la industria
  const industryName = clientInfo?.industry || 'Otro';
  const benchmarks = industryBenchmarks[industryName] || industryBenchmarks['Otro'];

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

  // Función OPTIMIZADA COMPLETA para generar PDF profesional
  const handleDownloadPDF = async () => {
    // En modo público, mostrar mensaje personalizado
    if (!isInternalMode) {
      alert('📊 El PDF detallado está disponible después de agendar tu consultoría gratuita. ¡Agenda ahora para recibir tu diagnóstico completo con plan de acción personalizado!');
      onScheduleConsultation();
      return;
    }

    setGeneratingPDF(true);
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Colores corporativos Impulsa Lab
      const primaryBlue: [number, number, number] = [0, 45, 98];
      const secondaryBlue: [number, number, number] = [59, 130, 246];
      const green: [number, number, number] = [16, 185, 129];
      const purple: [number, number, number] = [139, 92, 246];
      const white: [number, number, number] = [255, 255, 255];
      const black: [number, number, number] = [0, 0, 0];
      const gray: [number, number, number] = [100, 100, 100];
      const lightGray: [number, number, number] = [245, 245, 245];
      const darkGray: [number, number, number] = [64, 64, 64];
      
      // Función MEJORADA para manejar texto con UTF-8 correctamente
      const cleanText = (text: string): string => {
        if (!text) return '';
        
        // No eliminar caracteres especiales, mantenerlos
        return text.trim();
      };
      
      // Configurar fuente con soporte UTF-8
      pdf.setFont('helvetica', 'normal');
      
      // Función auxiliar para texto UTF-8
      const addTextUTF8 = (text: string, x: number, y: number, options?: any) => {
        try {
          // Intentar primero con el texto original
          pdf.text(text, x, y, options);
        } catch (error) {
          // Si falla, usar un fallback más robusto
          console.warn('Error con caracteres especiales, usando fallback:', error);
          const fallbackText = text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos
            .replace(/[^\x00-\x7F]/g, (char) => {
              // Mapeo manual para caracteres comunes
              const charMap: { [key: string]: string } = {
                'á': 'a', 'à': 'a', 'ä': 'a', 'â': 'a', 'ã': 'a', 'å': 'a', 'ą': 'a',
                'é': 'e', 'è': 'e', 'ë': 'e', 'ê': 'e', 'ę': 'e', 'ė': 'e', 'ē': 'e',
                'í': 'i', 'ì': 'i', 'ï': 'i', 'î': 'i', 'į': 'i', 'ī': 'i',
                'ó': 'o', 'ò': 'o', 'ö': 'o', 'ô': 'o', 'õ': 'o', 'ø': 'o', 'ō': 'o',
                'ú': 'u', 'ù': 'u', 'ü': 'u', 'û': 'u', 'ū': 'u', 'ų': 'u',
                'ñ': 'n', 'ń': 'n', 'ň': 'n', 'ņ': 'n',
                'ç': 'c', 'ć': 'c', 'č': 'c',
                'ž': 'z', 'ź': 'z', 'ż': 'z',
                'š': 's', 'ś': 's', 'ș': 's',
                'ľ': 'l', 'ł': 'l',
                'ý': 'y', 'ÿ': 'y',
                'đ': 'd', 'ď': 'd',
                'ř': 'r', 'ŕ': 'r',
                'ť': 't', 'ț': 't',
                'ě': 'e',
                'ů': 'u',
                // Mayúsculas
                'Á': 'A', 'À': 'A', 'Ä': 'A', 'Â': 'A', 'Ã': 'A', 'Å': 'A', 'Ą': 'A',
                'É': 'E', 'È': 'E', 'Ë': 'E', 'Ê': 'E', 'Ę': 'E', 'Ė': 'E', 'Ē': 'E',
                'Í': 'I', 'Ì': 'I', 'Ï': 'I', 'Î': 'I', 'Į': 'I', 'Ī': 'I',
                'Ó': 'O', 'Ò': 'O', 'Ö': 'O', 'Ô': 'O', 'Õ': 'O', 'Ø': 'O', 'Ō': 'O',
                'Ú': 'U', 'Ù': 'U', 'Ü': 'U', 'Û': 'U', 'Ū': 'U', 'Ų': 'U',
                'Ñ': 'N', 'Ń': 'N', 'Ň': 'N', 'Ņ': 'N',
                'Ç': 'C', 'Ć': 'C', 'Č': 'C',
                'Ž': 'Z', 'Ź': 'Z', 'Ż': 'Z',
                'Š': 'S', 'Ś': 'S', 'Ș': 'S',
                'Ľ': 'L', 'Ł': 'L',
                'Ý': 'Y', 'Ÿ': 'Y',
                'Đ': 'D', 'Ď': 'D',
                'Ř': 'R', 'Ŕ': 'R',
                'Ť': 'T', 'Ț': 'T',
                'Ě': 'E',
                'Ů': 'U',
                // Símbolos
                '€': 'EUR', '£': 'GBP', '¥': 'JPY', '₹': 'INR', '¢': 'c',
                '©': '(C)', '®': '(R)', '™': 'TM', '℠': 'SM',
                '°': 'o', '№': 'No', '℃': 'C', '℉': 'F',
                '¼': '1/4', '½': '1/2', '¾': '3/4',
                '×': 'x', '÷': '/', '±': '+/-', '≈': '~', '≠': '!=', '≤': '<=', '≥': '>=',
                '←': '<-', '→': '->', '↑': '^', '↓': 'v',
                '•': '*', '·': '.', '…': '...', '–': '-', '—': '--',
                '"': '"', '“': '"', '”': '"', '‘': "'", '’': "'",
                '¿': '?', '¡': '!',
                // Espacios especiales
                '\u00A0': ' ', '\u2002': ' ', '\u2003': ' ', '\u2009': ' ',
              };
              return charMap[char] || '';
            });
          
          pdf.text(fallbackText, x, y, options);
        }
      };
      
      // Función mejorada para texto con word wrap y control de paginación
      const addWrappedText = (
        text: string, 
        x: number, 
        y: number, 
        maxWidth: number, 
        lineHeight: number = 5,
        fontSize: number = 11,
        font: string = 'helvetica',
        style: string = 'normal',
        color: [number, number, number] = black
      ): number => {
        pdf.setFontSize(fontSize);
        pdf.setFont(font, style);
        pdf.setTextColor(...color);
        
        const lines = pdf.splitTextToSize(text, maxWidth);
        let currentY = y;
        
        for (const line of lines) {
          // Verificar si necesitamos nueva página
          if (currentY > pageHeight - 25) {
            pdf.addPage();
            currentY = 30;
            // Agregar número de página si cambiamos
            addPageNumber(pdf.getCurrentPageInfo().pageNumber, 7);
          }
          addTextUTF8(line, x, currentY);
          currentY += lineHeight;
        }
        
        return currentY;
      };

      // Función para headers de sección con control de página
      const addSectionHeader = (
        title: string, 
        yPos: number, 
        color: [number, number, number] = primaryBlue,
        addTopMargin: boolean = true
      ): number => {
        // Verificar si necesitamos nueva página
        if (yPos > pageHeight - 50) {
          pdf.addPage();
          yPos = 30;
          // Agregar número de página
          addPageNumber(pdf.getCurrentPageInfo().pageNumber, 7);
        }
        
        if (addTopMargin && yPos > 40) {
          yPos += 5;
        }
        
        pdf.setFillColor(...color);
        pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
        pdf.setTextColor(...white);
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        addTextUTF8(title, 20, yPos);
        pdf.setTextColor(...black);
        
        return yPos + 12;
      };

      // Función para agregar número de página
      const addPageNumber = (pageNum: number, totalPages: number) => {
        pdf.setFontSize(9);
        pdf.setTextColor(...gray);
        pdf.setFont('helvetica', 'normal');
        addTextUTF8(`Página ${pageNum} de ${totalPages}`, pageWidth - 20, pageHeight - 10, { align: 'right' });
      };

      // Función CORREGIDA para dibujar barra de progreso
      const drawProgressBar = (label: string, score: number, color: [number, number, number], y: number) => {
        // Validar parámetros para evitar errores
        const validY = Number(y) || 50;
        const validScore = Math.max(0, Math.min(100, Number(score) || 0));
        
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(12);
        pdf.setTextColor(...black);
        addTextUTF8(`${label}:`, 25, validY);
        
        // Score numérico
        pdf.setFont('helvetica', 'normal');
        addTextUTF8(`${validScore}/100`, 160, validY);
        
        // Barra de fondo
        pdf.setFillColor(...lightGray);
        pdf.roundedRect(25, validY + 2, 130, 8, 2, 2, 'F');
        
        // Barra de progreso
        if (validScore > 0) {
          pdf.setFillColor(...color);
          const progressWidth = Math.max(1, (validScore / 100) * 130);
          pdf.roundedRect(25, validY + 2, progressWidth, 8, 2, 2, 'F');
        }
        
        // Indicador de benchmark
        const benchmarkKey = label.toLowerCase() as keyof typeof benchmarks;
        const benchmarkScore = benchmarks[benchmarkKey] || 50;
        const benchmarkX = 25 + (benchmarkScore / 100) * 130;
        
        // Validar coordenadas antes de dibujar la línea
        if (isFinite(benchmarkX) && benchmarkX >= 25 && benchmarkX <= 155) {
          pdf.setDrawColor(...darkGray);
          pdf.setLineWidth(2);
          // Línea vertical para benchmark
          pdf.line(benchmarkX, validY + 1, benchmarkX, validY + 11);
        }
        
        return validY + 15;
      };

      // ===================
      // PÁGINA 1: PORTADA PROFESIONAL
      // ===================
      pdf.setFillColor(...primaryBlue);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      
      // Marco decorativo doble
      pdf.setDrawColor(...white);
      pdf.setLineWidth(3);
      pdf.rect(15, 15, pageWidth - 30, pageHeight - 30);
      pdf.setLineWidth(1);
      pdf.rect(18, 18, pageWidth - 36, pageHeight - 36);
      
      // Logo area mejorada
      pdf.setFillColor(...white);
      pdf.roundedRect(20, 25, 60, 25, 3, 3, 'F');
      pdf.setTextColor(...primaryBlue);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      addTextUTF8('IMPULSA', 30, 37);
      pdf.setFontSize(18);
      addTextUTF8('LAB', 30, 45);
      
      // Línea decorativa bajo el logo
      pdf.setDrawColor(...secondaryBlue);
      pdf.setLineWidth(2);
      pdf.line(85, 37, 100, 37);
      
      // Título principal con sombra
      pdf.setTextColor(...white);
      pdf.setFontSize(40);
      pdf.setFont('helvetica', 'bold');
      addTextUTF8('DIAGNÓSTICO 3D', pageWidth / 2, 75, { align: 'center' });
      
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'normal');
      addTextUTF8('IMPULSA BUSINESS INTELLIGENCE', pageWidth / 2, 90, { align: 'center' });
      
      // Doble línea decorativa
      pdf.setDrawColor(...white);
      pdf.setLineWidth(3);
      pdf.line(30, 100, pageWidth - 30, 100);
      pdf.setLineWidth(1);
      pdf.line(35, 104, pageWidth - 35, 104);
      
      // Información del cliente en un recuadro
      const companyName = clientInfo?.companyName || clientInfo?.name || 'Tu Empresa';
      const contactName = clientInfo?.contactName || '';
      const employeeCount = clientInfo?.employees || clientInfo?.employeeCount || '';
      
      // Recuadro para información del cliente
      pdf.setFillColor(255, 255, 255, 0.1);
      pdf.roundedRect(30, 115, pageWidth - 60, 45, 5, 5, 'F');
      
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      addTextUTF8(companyName.toUpperCase(), pageWidth / 2, 130, { align: 'center' });
      
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');
      if (contactName) {
        addTextUTF8(`Contacto: ${contactName}`, pageWidth / 2, 140, { align: 'center' });
      }
      addTextUTF8(`Industria: ${industryName}`, pageWidth / 2, 148, { align: 'center' });
      if (employeeCount) {
        addTextUTF8(`Empleados: ${employeeCount}`, pageWidth / 2, 156, { align: 'center' });
      }
      
      // Score Global con diseño mejorado
      // Círculo exterior decorativo
      pdf.setDrawColor(...white);
      pdf.setLineWidth(2);
      pdf.circle(pageWidth / 2, 190, 45, 'S');
      
      // Círculo principal
      pdf.setFillColor(...white);
      pdf.circle(pageWidth / 2, 190, 40, 'F');
      
      // Anillo de color según score
      const scoreColor = averageScore >= 70 ? green : 
                        averageScore >= 40 ? [255, 193, 7] as [number, number, number] : 
                        [239, 68, 68] as [number, number, number];
      pdf.setDrawColor(...scoreColor);
      pdf.setLineWidth(5);
      pdf.circle(pageWidth / 2, 190, 38, 'S');
      
      // Score
      pdf.setTextColor(...primaryBlue);
      pdf.setFontSize(52);
      pdf.setFont('helvetica', 'bold');
      addTextUTF8(averageScore.toString(), pageWidth / 2, 195, { align: 'center' });
      
      pdf.setFontSize(14);
      pdf.setTextColor(...gray);
      addTextUTF8('/100', pageWidth / 2 + 22, 190);
      
      // Etiquetas del score
      pdf.setTextColor(...white);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      addTextUTF8('PUNTUACIÓN GLOBAL', pageWidth / 2, 240, { align: 'center' });
      
      // Badge de etapa con colores
      const stageColor = businessStage.stage === 'Expansión' ? green :
                        businessStage.stage === 'Crecimiento' ? secondaryBlue : 
                        [255, 193, 7] as [number, number, number];
      
      pdf.setFillColor(...stageColor);
      pdf.roundedRect(pageWidth / 2 - 40, 245, 80, 25, 10, 10, 'F');
      
      pdf.setTextColor(...white);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      addTextUTF8(businessStage.stage.toUpperCase(), pageWidth / 2, 255, { align: 'center' });
      
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'normal');
      addTextUTF8(businessStage.description, pageWidth / 2, 265, { align: 'center' });
      
      // Footer elegante
      pdf.setTextColor(255, 255, 255, 0.7);
      pdf.setFontSize(10);
      const currentDate = new Date().toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      addTextUTF8(`Generado el ${currentDate}`, pageWidth / 2, 275, { align: 'center' });
      
      pdf.setTextColor(255, 255, 255, 0.5);
      pdf.setFontSize(9);
      addTextUTF8('www.tuimpulsalab.com | contacto@tuimpulsalab.com | +57 311 266 9878', pageWidth / 2, 285, { align: 'center' });

      // ===================
      // PÁGINA 2: RESUMEN EJECUTIVO
      // ===================
      pdf.addPage();
      
      // Header con gradiente simulado
      pdf.setFillColor(...primaryBlue);
      pdf.rect(0, 0, pageWidth, 35, 'F');
      pdf.setFillColor(0, 45, 98, 0.8);
      pdf.rect(0, 30, pageWidth, 5, 'F');
      
      pdf.setTextColor(...white);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      addTextUTF8('RESUMEN EJECUTIVO', 20, 22);
      
      let yPos = 50;
      
      // Card de información general
      pdf.setFillColor(...lightGray);
      pdf.roundedRect(15, yPos - 5, pageWidth - 30, 45, 3, 3, 'F');
      
      pdf.setTextColor(...black);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      addTextUTF8('Información General', 20, yPos + 5);
      
      yPos += 12;
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      
      const infoItems = [
        `Empresa: ${companyName}`,
        `Contacto: ${contactName || 'No especificado'}`,
        `Industria: ${industryName}`,
        `Fecha: ${currentDate}`,
        `Preguntas respondidas: ${responses.length}`
      ];
      
      infoItems.forEach(item => {
        addTextUTF8(item, 25, yPos);
        yPos += 6;
      });
      
      yPos += 10;

      // Puntuaciones con barras visuales mejoradas
      yPos = addSectionHeader('Puntuaciones por Dimensión', yPos);
      yPos += 5;
      
      yPos = drawProgressBar('Finanzas', finalScores.finance, secondaryBlue, yPos);
      yPos = drawProgressBar('Operaciones', finalScores.operations, green, yPos);
      yPos = drawProgressBar('Marketing', finalScores.marketing, purple, yPos);
      
      yPos += 10;

      // Comparación con industria en tabla
      yPos = addSectionHeader('Comparación con Industria', yPos);
      yPos += 5;
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      addTextUTF8(`Benchmark promedio en ${industryName}:`, 25, yPos);
      yPos += 8;
      
      // Crear tabla de comparación
      const comparisons = [
        {
          name: 'Finanzas',
          score: finalScores.finance,
          benchmark: benchmarks.finance,
          color: secondaryBlue
        },
        {
          name: 'Operaciones',
          score: finalScores.operations,
          benchmark: benchmarks.operations,
          color: green
        },
        {
          name: 'Marketing',
          score: finalScores.marketing,
          benchmark: benchmarks.marketing,
          color: purple
        }
      ];
      
      pdf.setFont('helvetica', 'normal');
      comparisons.forEach(comp => {
        const diff = comp.score - comp.benchmark;
        const status = diff >= 0 ? 'SUPERIOR' : 'INFERIOR';
        const statusColor = diff >= 0 ? green : [239, 68, 68] as [number, number, number];
        
        // Bullet point con color
        pdf.setFillColor(...comp.color);
        pdf.circle(28, yPos - 2, 2, 'F');
        
        pdf.setTextColor(...black);
        addTextUTF8(`${comp.name}: ${comp.benchmark} pts`, 35, yPos);
        
        // Badge de status
        pdf.setFillColor(...statusColor);
        pdf.roundedRect(100, yPos - 5, 35, 7, 2, 2, 'F');
        pdf.setTextColor(...white);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        addTextUTF8(status, 117, yPos - 0.5, { align: 'center' });
        
        // Diferencia
        pdf.setTextColor(...black);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        addTextUTF8(`(${diff >= 0 ? '+' : ''}${diff} pts)`, 140, yPos);
        
        yPos += 8;
      });
      
      yPos += 10;

      // Insights clave con iconos
      yPos = addSectionHeader('Insights Clave del Diagnóstico', yPos);
      yPos += 5;
      
      const strongAxis = strongestAxis.key === 'finance' ? 'Finanzas' : 
                        strongestAxis.key === 'operations' ? 'Operaciones' : 'Marketing';
      const weakAxis = weakestAxis.key === 'finance' ? 'Finanzas' : 
                      weakestAxis.key === 'operations' ? 'Operaciones' : 'Marketing';
      
      const insights = [
        {
          icon: '+',
          color: green,
          text: `Fortaleza principal: ${strongAxis} (${strongestAxis.value} puntos)`
        },
        {
          icon: '!',
          color: [239, 68, 68] as [number, number, number],
          text: `Área crítica: ${weakAxis} (${weakestAxis.value} puntos)`
        },
        {
          icon: '>',
          color: secondaryBlue,
          text: `Etapa actual: ${businessStage.stage}`
        },
        {
          icon: '%',
          color: purple,
          text: `Potencial de mejora: ${Math.round(totalImprovementPotential/3)}%`
        },
        {
          icon: '=',
          color: [255, 193, 7] as [number, number, number],
          text: `Brecha vs. industria: ${Math.round((benchmarks.finance + benchmarks.operations + benchmarks.marketing)/3 - averageScore)} puntos`
        }
      ];
      
      insights.forEach(insight => {
        // Icon box
        pdf.setFillColor(...insight.color);
        pdf.roundedRect(25, yPos - 5, 8, 8, 1, 1, 'F');
        pdf.setTextColor(...white);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
        addTextUTF8(insight.icon, 29, yPos, { align: 'center' });
        
        // Text
        pdf.setTextColor(...black);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        addTextUTF8(insight.text, 37, yPos);
        yPos += 9;
      });

      addPageNumber(2, 7);

      // ===================
      // PÁGINA 3: ANÁLISIS DETALLADO POR DIMENSIÓN
      // ===================
      pdf.addPage();
      
      pdf.setFillColor(...primaryBlue);
      pdf.rect(0, 0, pageWidth, 35, 'F');
      pdf.setTextColor(...white);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      addTextUTF8('ANÁLISIS DETALLADO POR DIMENSIÓN', 20, 22);
      
      yPos = 50;
      
      // Análisis de Finanzas
      yPos = addSectionHeader('DIMENSIÓN: FINANZAS', yPos, secondaryBlue);
      
      // Score card
      pdf.setFillColor(59, 130, 246, 0.1);
      pdf.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'F');
      
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...secondaryBlue);
      addTextUTF8(`Score: ${finalScores.finance}/100`, 30, yPos + 10);
      
      pdf.setTextColor(...black);
      addTextUTF8(`Benchmark ${industryName}: ${benchmarks.finance}`, 90, yPos + 10);
      
      const financeDiff = finalScores.finance - benchmarks.finance;
      const financeStatus = financeDiff >= 0 ? 'SUPERIOR' : 'POR MEJORAR';
      if (financeDiff >= 0) {
        pdf.setTextColor(green[0], green[1], green[2]);
      } else {
        pdf.setTextColor(239, 68, 68);
      }
      addTextUTF8(`${financeStatus} (${financeDiff >= 0 ? '+' : ''}${financeDiff})`, 30, yPos + 18);
      
      yPos += 30;
      
      // Análisis narrativo
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(...black);
      
      const financeAnalysis = 
        finalScores.finance >= 80 ? 
          `Excelente gestión financiera. ${companyName} demuestra control excepcional con sistemas maduros de planificación y seguimiento. El score de ${finalScores.finance} supera ampliamente el promedio de ${benchmarks.finance} en ${industryName}, posicionando a la empresa en el top 10% del sector.` :
        finalScores.finance >= 60 ?
          `Control financiero sólido con oportunidades de optimización. Con ${finalScores.finance} puntos, la empresa ${financeDiff >= 0 ? 'supera' : 'se aproxima al'} benchmark de la industria. Implementar dashboards en tiempo real y automatización de reportes puede elevar el score 15-20 puntos adicionales.` :
        finalScores.finance >= 40 ?
          `Control financiero básico que requiere fortalecimiento. El score de ${finalScores.finance} indica sistemas fundamentales implementados pero con brechas en visibilidad y predictibilidad. La industria ${industryName} promedia ${benchmarks.finance} puntos, representando una oportunidad de mejora del ${Math.round(((benchmarks.finance - finalScores.finance) / finalScores.finance) * 100)}%.` :
          `Gestión financiera reactiva que limita el crecimiento. Con ${finalScores.finance} puntos, existe una brecha crítica de ${benchmarks.finance - finalScores.finance} puntos respecto al estándar industrial. Esta situación requiere intervención inmediata para evitar riesgos de liquidez y pérdida de oportunidades.`;
      
      yPos = addWrappedText(financeAnalysis, 25, yPos, pageWidth - 50, 6) + 8;
      
      // KPIs de mejora
      pdf.setFillColor(59, 130, 246, 0.05);
      pdf.roundedRect(20, yPos - 3, pageWidth - 40, 20, 3, 3, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(...secondaryBlue);
      addTextUTF8('ROI Esperado:', 25, yPos + 3);
      pdf.setTextColor(...black);
      addTextUTF8(`${finalScores.finance < 60 ? '250-400%' : '150-200%'} en 12 meses`, 60, yPos + 3);
      
      pdf.setTextColor(...secondaryBlue);
      addTextUTF8('Tiempo:', 25, yPos + 10);
      pdf.setTextColor(...black);
      addTextUTF8(`${finalScores.finance < 60 ? '30-45' : '15-30'} días para primeros resultados`, 50, yPos + 10);
      
      pdf.setTextColor(...secondaryBlue);
      addTextUTF8('Inversión:', 100, yPos + 10);
      pdf.setTextColor(...black);
      addTextUTF8(`${finalScores.finance < 60 ? 'Media-Alta' : 'Baja-Media'}`, 130, yPos + 10);
      
      yPos += 25;

      // Análisis de Operaciones
      yPos = addSectionHeader('DIMENSIÓN: OPERACIONES', yPos, green);
      
      // Score card
      pdf.setFillColor(16, 185, 129, 0.1);
      pdf.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'F');
      
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...green);
      addTextUTF8(`Score: ${finalScores.operations}/100`, 30, yPos + 10);
      
      pdf.setTextColor(...black);
      addTextUTF8(`Benchmark ${industryName}: ${benchmarks.operations}`, 90, yPos + 10);
      
      const opsDiff = finalScores.operations - benchmarks.operations;
      const opsStatus = opsDiff >= 0 ? 'SUPERIOR' : 'POR MEJORAR';
      if (opsDiff >= 0) {
        pdf.setTextColor(green[0], green[1], green[2]);
      } else {
        pdf.setTextColor(239, 68, 68);
      }
      addTextUTF8(`${opsStatus} (${opsDiff >= 0 ? '+' : ''}${opsDiff})`, 30, yPos + 18);
      
      yPos += 30;
      
      // Análisis narrativo
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(...black);
      
      const operationsAnalysis = 
        finalScores.operations >= 80 ?
          `Operaciones de clase mundial con procesos optimizados. El score de ${finalScores.operations} supera el benchmark de ${benchmarks.operations}, demostrando excelencia operacional. Los procesos están documentados, automatizados y permiten escalabilidad sin incremento proporcional de recursos.` :
        finalScores.operations >= 60 ?
          `Operaciones eficientes con potencial de automatización. Con ${finalScores.operations} puntos, la empresa ${opsDiff >= 0 ? 'supera' : 'se acerca al'} promedio industrial. Automatizar 2-3 procesos clave adicionales puede liberar 15-20 horas semanales del equipo para actividades estratégicas.` :
        finalScores.operations >= 40 ?
          `Operaciones funcionales pero manuales. El score de ${finalScores.operations} revela dependencia de procesos manuales que limitan la escalabilidad. Con el benchmark de ${benchmarks.operations} en ${industryName}, existe oportunidad de duplicar la capacidad operativa mediante automatización selectiva.` :
          `Operaciones reactivas que requieren reestructuración. Con ${finalScores.operations} puntos, la empresa está ${benchmarks.operations - finalScores.operations} puntos bajo el estándar. Se estima que 60-70% del tiempo se dedica a tareas repetitivas automatizables, representando pérdida de competitividad.`;
      
      yPos = addWrappedText(operationsAnalysis, 25, yPos, pageWidth - 50, 6) + 8;
      
      // KPIs de mejora
      pdf.setFillColor(16, 185, 129, 0.05);
      pdf.roundedRect(20, yPos - 3, pageWidth - 40, 20, 3, 3, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(...green);
      addTextUTF8('Ahorro:', 25, yPos + 3);
      pdf.setTextColor(...black);
      addTextUTF8(`${finalScores.operations < 60 ? '20-30' : '10-15'} hrs/semana`, 50, yPos + 3);
      
      pdf.setTextColor(...green);
      addTextUTF8('Capacidad:', 100, yPos + 3);
      pdf.setTextColor(...black);
      addTextUTF8(`+${finalScores.operations < 60 ? '200-300%' : '150-200%'}`, 135, yPos + 3);
      
      pdf.setTextColor(...green);
      addTextUTF8('Eficiencia:', 25, yPos + 10);
      pdf.setTextColor(...black);
      addTextUTF8(`${finalScores.operations < 60 ? '35-50%' : '20-30%'} mejora`, 60, yPos + 10);
      
      pdf.setTextColor(...green);
      addTextUTF8('Errores:', 110, yPos + 10);
      pdf.setTextColor(...black);
      addTextUTF8(`-${finalScores.operations < 60 ? '70-80%' : '40-50%'}`, 135, yPos + 10);
      
      yPos += 25;

      // Verificar si necesitamos nueva página para Marketing
      if (yPos > 200) {
        pdf.addPage();
        yPos = 30;
        addPageNumber(pdf.getCurrentPageInfo().pageNumber, 7);
      }
      
      // Análisis de Marketing
      yPos = addSectionHeader('DIMENSIÓN: MARKETING', yPos, purple);
      
      // Score card
      pdf.setFillColor(139, 92, 246, 0.1);
      pdf.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'F');
      
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...purple);
      addTextUTF8(`Score: ${finalScores.marketing}/100`, 30, yPos + 10);
      
      pdf.setTextColor(...black);
      addTextUTF8(`Benchmark ${industryName}: ${benchmarks.marketing}`, 90, yPos + 10);
      
      const mktDiff = finalScores.marketing - benchmarks.marketing;
      const mktStatus = mktDiff >= 0 ? 'SUPERIOR' : 'POR MEJORAR';
      pdf.setTextColor(...(mktDiff >= 0 ? green : [239, 68, 68] as [number, number, number]));
      addTextUTF8(`${mktStatus} (${mktDiff >= 0 ? '+' : ''}${mktDiff})`, 30, yPos + 18);
      
      yPos += 30;
      
      // Análisis narrativo
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(...black);
      
      const marketingAnalysis = 
        finalScores.marketing >= 80 ?
          `Marketing de alto rendimiento con estrategia digital madura. Con ${finalScores.marketing} puntos, la empresa supera el benchmark de ${benchmarks.marketing}, demostrando dominio en generación de demanda. El CAC optimizado y LTV/CAC superior a 3:1 indican sostenibilidad en adquisición.` :
        finalScores.marketing >= 60 ?
          `Estrategia de marketing efectiva con oportunidades digitales. El score de ${finalScores.marketing} ${mktDiff >= 0 ? 'supera' : 'se acerca al'} promedio industrial. Optimizar canales digitales y automatizar nurturing puede reducir CAC 20-30% y duplicar conversión de leads.` :
        finalScores.marketing >= 40 ?
          `Marketing básico con potencial sin explotar. Con ${finalScores.marketing} puntos vs ${benchmarks.marketing} del benchmark, existe brecha significativa en posicionamiento digital. La competencia está capturando market share mediante estrategias omnicanal más efectivas.` :
          `Marketing reactivo que limita el crecimiento. El score de ${finalScores.marketing} está ${benchmarks.marketing - finalScores.marketing} puntos bajo el estándar, indicando pérdida de oportunidades. Sin presencia digital efectiva, la empresa depende de referencias limitando su potencial de expansión.`;
      
      yPos = addWrappedText(marketingAnalysis, 25, yPos, pageWidth - 50, 6) + 8;
      
      // KPIs de mejora
      pdf.setFillColor(139, 92, 246, 0.05);
      pdf.roundedRect(20, yPos - 3, pageWidth - 40, 20, 3, 3, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(...purple);
      addTextUTF8('Leads:', 25, yPos + 3);
      pdf.setTextColor(...black);
      addTextUTF8(`+${finalScores.marketing < 60 ? '300-500%' : '200-300%'}`, 50, yPos + 3);
      
      pdf.setTextColor(...purple);
      addTextUTF8('CAC:', 95, yPos + 3);
      pdf.setTextColor(...black);
      addTextUTF8(`-${finalScores.marketing < 60 ? '40-60%' : '20-30%'}`, 115, yPos + 3);
      
      pdf.setTextColor(...purple);
      addTextUTF8('Conversión:', 25, yPos + 10);
      pdf.setTextColor(...black);
      addTextUTF8(`+${finalScores.marketing < 60 ? '3-5X' : '2-3X'}`, 70, yPos + 10);
      
      pdf.setTextColor(...purple);
      addTextUTF8('ROI:', 110, yPos + 10);
      pdf.setTextColor(...black);
      addTextUTF8(`${finalScores.marketing < 60 ? '400-600%' : '200-400%'}`, 130, yPos + 10);

      addPageNumber(3, 7);

      // ===================
      // PÁGINA 4: PLAN DE ACCIÓN PERSONALIZADO CON IA
      // ===================
      pdf.addPage();
      
      pdf.setFillColor(...primaryBlue);
      pdf.rect(0, 0, pageWidth, 35, 'F');
      pdf.setTextColor(...white);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      addTextUTF8('PLAN DE ACCIÓN PERSONALIZADO CON IA', 20, 22);
      
      yPos = 50;
      
      // Determinar acción prioritaria
      const weakAxisName = weakestAxis.key === 'finance' ? 'Sistema Financiero Inteligente' : 
                          weakestAxis.key === 'operations' ? 'Automatización Operativa' : 
                          'Marketing Digital Estratégico';
      
      const weakAxisLabel = weakestAxis.key === 'finance' ? 'Finanzas' : 
                           weakestAxis.key === 'operations' ? 'Operaciones' : 
                           'Marketing';
      
      // Card de prioridad crítica
      pdf.setFillColor(255, 239, 239);
      pdf.setDrawColor(239, 68, 68);
      pdf.setLineWidth(2);
      pdf.roundedRect(15, yPos - 5, pageWidth - 30, 30, 5, 5, 'FD');
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(220, 38, 127);
      addTextUTF8('ACCIÓN CRÍTICA PRIORITARIA', pageWidth / 2, yPos + 5, { align: 'center' });
      
      pdf.setFontSize(16);
      pdf.setTextColor(...black);
      addTextUTF8(weakAxisName, pageWidth / 2, yPos + 15, { align: 'center' });
      
      yPos += 35;
      
      // Por qué es crítico
      pdf.setFillColor(255, 249, 196);
      pdf.roundedRect(20, yPos, pageWidth - 40, 35, 3, 3, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(...black);
      addTextUTF8('¿Por qué actuar AHORA es crítico para tu negocio?', 25, yPos + 8);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      const whyText = `Tu puntuación de ${weakestAxis.value} en ${weakAxisLabel} representa el cuello de botella principal que está limitando el crecimiento exponencial de tu negocio. Esta brecha de ${benchmarks[weakestAxis.key as keyof typeof benchmarks] - weakestAxis.value} puntos respecto al benchmark te está costando oportunidades diarias y ventaja competitiva.`;
      yPos = addWrappedText(whyText, 25, yPos + 15, pageWidth - 50, 5, 10) + 5;
      
      // Impacto esperado
      pdf.setFillColor(220, 252, 231);
      pdf.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(...green);
      addTextUTF8('Impacto esperado en tu negocio:', 25, yPos + 8);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(...black);
      const impactText = `Mejora del 35-50% en ${weakAxisLabel} en 90 días, con impacto directo en rentabilidad (+20-30%), eficiencia operativa (+40%) y capacidad de crecimiento (2-3X). ROI esperado: 250-400% en el primer año.`;
      yPos = addWrappedText(impactText, 25, yPos + 15, pageWidth - 50, 5, 10) + 10;
      
      // Plan de acción paso a paso
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(...primaryBlue);
      addTextUTF8('Plan de Implementación - 5 Pasos Clave:', 25, yPos);
      yPos += 10;
      
      const actions = [
        'Auditoría profunda y mapeo de procesos actuales para identificar quick wins',
        'Implementación de sistema de monitoreo con dashboards en tiempo real',
        'Automatización de procesos críticos usando IA y herramientas no-code',
        'Establecimiento de KPIs específicos con alertas automáticas',
        'Creación de cultura de mejora continua basada en datos'
      ];
      
      actions.forEach((action, index) => {
        // Número en círculo
        pdf.setFillColor(...secondaryBlue);
        pdf.circle(28, yPos - 2, 4, 'F');
        pdf.setTextColor(...white);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        addTextUTF8((index + 1).toString(), 28, yPos, { align: 'center' });
        
        // Texto de la acción
        pdf.setTextColor(...black);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        yPos = addWrappedText(action, 35, yPos - 2, pageWidth - 60, 5, 10) + 5;
      });
      
      yPos += 5;
      
      // Quick Win destacado
      pdf.setFillColor(255, 241, 118);
      pdf.setDrawColor(255, 193, 7);
      pdf.setLineWidth(2);
      pdf.roundedRect(15, yPos, pageWidth - 30, 30, 5, 5, 'FD');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(...black);
      addTextUTF8('QUICK WIN - Acción para HOY:', 25, yPos + 10);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      const quickWinText = 'Implementa inmediatamente un dashboard básico de seguimiento con las 3-5 métricas más críticas de tu negocio. Esto te dará visibilidad instantánea y control desde el día 1.';
      yPos = addWrappedText(quickWinText, 25, yPos + 17, pageWidth - 50, 5, 10) + 10;
      
      // Timeline y recursos
      pdf.setFillColor(...lightGray);
      pdf.roundedRect(20, yPos, pageWidth - 40, 20, 3, 3, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      addTextUTF8('Timeline: 4-8 semanas', 25, yPos + 8);
      addTextUTF8('Inversión: Media', 90, yPos + 8);
      addTextUTF8('Equipo: 2-3 personas', 140, yPos + 8);
      
      pdf.setFont('helvetica', 'normal');
      addTextUTF8('Herramientas: BI Platform, Automation Tools, AI Analytics', 25, yPos + 15);

      addPageNumber(4, 7);

      // ===================
      // PÁGINA 5: ROADMAP 90 DÍAS
      // ===================
      pdf.addPage();
      
      pdf.setFillColor(...primaryBlue);
      pdf.rect(0, 0, pageWidth, 35, 'F');
      pdf.setTextColor(...white);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      addTextUTF8('ROADMAP DE TRANSFORMACIÓN - 90 DÍAS', 20, 22);
      
      yPos = 50;
      
      // Timeline visual
      pdf.setDrawColor(...lightGray);
      pdf.setLineWidth(3);
      pdf.line(30, yPos, pageWidth - 30, yPos);
      
      // Marcadores de fases
      const phases = [
        { x: 30, label: 'Inicio', day: '0' },
        { x: 76, label: 'Fase 1', day: '30' },
        { x: 122, label: 'Fase 2', day: '60' },
        { x: 168, label: 'Fase 3', day: '90' }
      ];
      
      phases.forEach((phase, index) => {
        pdf.setFillColor(...(index === 0 ? primaryBlue : index === 1 ? secondaryBlue : index === 2 ? purple : green));
        pdf.circle(phase.x, yPos, 5, 'F');
        pdf.setTextColor(...black);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        addTextUTF8(phase.label, phase.x, yPos - 10, { align: 'center' });
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        addTextUTF8(`Día ${phase.day}`, phase.x, yPos + 12, { align: 'center' });
      });
      
      yPos += 30;
      
      // FASE 1: Fundamentos
      const phase1Color = secondaryBlue;
      yPos = addSectionHeader('FASE 1: FUNDAMENTOS (Días 1-30)', yPos, phase1Color);
      
      pdf.setFillColor(59, 130, 246, 0.05);
      pdf.roundedRect(20, yPos, pageWidth - 40, 55, 3, 3, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(...phase1Color);
      addTextUTF8('Objetivo: Establecer las bases sólidas', 25, yPos + 8);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(...black);
      
      const phase1Actions = [
        'Auditoría completa de sistemas y procesos actuales',
        'Implementación de quick wins identificados (10-15% mejora inmediata)',
        'Configuración de herramientas básicas de monitoreo y control',
        'Capacitación inicial del equipo en nuevas metodologías'
      ];
      
      let tempY = yPos + 15;
      phase1Actions.forEach(action => {
        addTextUTF8(`• ${action}`, 30, tempY);
        tempY += 6;
      });
      
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...green);
      addTextUTF8('Resultado: Sistema básico operativo con 40% más visibilidad', 25, tempY + 3);
      
      yPos += 65;
      
      // FASE 2: Optimización
      const phase2Color = purple;
      yPos = addSectionHeader('FASE 2: OPTIMIZACIÓN (Días 31-60)', yPos, phase2Color);
      
      pdf.setFillColor(139, 92, 246, 0.05);
      pdf.roundedRect(20, yPos, pageWidth - 40, 55, 3, 3, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(...phase2Color);
      addTextUTF8('Objetivo: Automatizar y optimizar procesos clave', 25, yPos + 8);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(...black);
      
      const phase2Actions = [
        'Automatización de 3-5 procesos críticos identificados',
        'Implementación de dashboards avanzados con IA predictiva',
        'Optimización de flujos de trabajo y eliminación de cuellos de botella',
        'Establecimiento de métricas de rendimiento automatizadas'
      ];
      
      tempY = yPos + 15;
      phase2Actions.forEach(action => {
        addTextUTF8(`• ${action}`, 30, tempY);
        tempY += 6;
      });
      
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...green);
      addTextUTF8('Resultado: Eficiencia operativa mejorada 35-45% con procesos automatizados', 25, tempY + 3);
      
      yPos += 65;
      
      // FASE 3: Escalamiento
      const phase3Color = green;
      yPos = addSectionHeader('FASE 3: ESCALAMIENTO (Días 61-90)', yPos, phase3Color);
      
      pdf.setFillColor(16, 185, 129, 0.05);
      pdf.roundedRect(20, yPos, pageWidth - 40, 55, 3, 3, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(...phase3Color);
      addTextUTF8('Objetivo: Escalar el sistema y preparar crecimiento exponencial', 25, yPos + 8);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(...black);
      
      const phase3Actions = [
        'Expansión del sistema a todas las áreas del negocio',
        'Implementación de analytics predictivos y machine learning',
        'Optimización continua basada en datos reales',
        'Preparación para la siguiente fase de crecimiento (scaling 2-3X)'
      ];
      
      tempY = yPos + 15;
      phase3Actions.forEach(action => {
        addTextUTF8(`• ${action}`, 30, tempY);
        tempY += 6;
      });
      
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...green);
      addTextUTF8('Resultado: Sistema completo con capacidad de escalar 2-3X sin fricción', 25, tempY + 3);

      addPageNumber(5, 7);

      // ===================
      // PÁGINA 6: MÉTRICAS DE ÉXITO Y ROI
      // ===================
      pdf.addPage();
      
      pdf.setFillColor(...primaryBlue);
      pdf.rect(0, 0, pageWidth, 35, 'F');
      pdf.setTextColor(...white);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      addTextUTF8('MÉTRICAS DE ÉXITO Y RETORNO DE INVERSIÓN', 20, 22);
      
      yPos = 50;
      
      // KPIs principales
      yPos = addSectionHeader('INDICADORES CLAVE DE ÉXITO (KPIs)', yPos, green);
      
      const kpis = [
        {
          metric: `Score ${weakAxisLabel}`,
          current: weakestAxis.value,
          target: Math.min(weakestAxis.value + 35, 100),
          timeline: '90 días',
          impact: 'ALTO'
        },
        {
          metric: 'Eficiencia Operativa',
          current: '100%',
          target: '145%',
          timeline: '60 días',
          impact: 'ALTO'
        },
        {
          metric: 'Tiempo en Tareas Manuales',
          current: '100%',
          target: '60%',
          timeline: '30 días',
          impact: 'MEDIO'
        },
        {
          metric: 'Visibilidad de Datos',
          current: 'Reactiva',
          target: 'Proactiva',
          timeline: '45 días',
          impact: 'ALTO'
        },
        {
          metric: 'Capacidad de Procesamiento',
          current: '1X',
          target: '2.5X',
          timeline: '90 días',
          impact: 'ALTO'
        },
        {
          metric: 'Tiempo de Respuesta',
          current: '100%',
          target: '30%',
          timeline: '60 días',
          impact: 'MEDIO'
        }
      ];
      
      // Tabla de KPIs
      pdf.setFillColor(...lightGray);
      pdf.rect(20, yPos, pageWidth - 40, 10, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(...black);
      addTextUTF8('Métrica', 25, yPos + 7);
      addTextUTF8('Actual', 70, yPos + 7);
      addTextUTF8('Objetivo', 100, yPos + 7);
      addTextUTF8('Plazo', 135, yPos + 7);
      addTextUTF8('Impacto', 165, yPos + 7);
      
      yPos += 12;
      
      kpis.forEach((kpi, index) => {
        if (index % 2 === 0) {
          pdf.setFillColor(250, 250, 250);
          pdf.rect(20, yPos - 3, pageWidth - 40, 8, 'F');
        }
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(9);
        addTextUTF8(kpi.metric, 25, yPos + 2);
        addTextUTF8(kpi.current.toString(), 70, yPos + 2);
        
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(...green);
        addTextUTF8(kpi.target.toString(), 100, yPos + 2);
        
        pdf.setTextColor(...black);
        pdf.setFont('helvetica', 'normal');
        addTextUTF8(kpi.timeline, 135, yPos + 2);
        
        const impactColor = kpi.impact === 'ALTO' ? green : [255, 193, 7] as [number, number, number];
        pdf.setTextColor(...impactColor);
        pdf.setFont('helvetica', 'bold');
        addTextUTF8(kpi.impact, 165, yPos + 2);
        
        pdf.setTextColor(...black);
        yPos += 8;
      });
      
      yPos += 15;
      
      // ROI Proyectado
      yPos = addSectionHeader('RETORNO DE INVERSIÓN PROYECTADO', yPos, secondaryBlue);
      
      // Cards de ROI
      const roiCards = [
        {
          title: 'ROI Año 1',
          value: '250-350%',
          color: green,
          detail: 'Recuperación total + ganancias'
        },
        {
          title: 'Payback',
          value: '3-4 meses',
          color: secondaryBlue,
          detail: 'Tiempo de recuperación'
        },
        {
          title: 'Ahorro Anual',
          value: '$50-150K',
          color: purple,
          detail: 'En eficiencias y automatización'
        }
      ];
      
      const cardWidth = (pageWidth - 50) / 3;
      roiCards.forEach((card, index) => {
        const xPos = 20 + (index * (cardWidth + 5));
        
        pdf.setFillColor(...card.color);
        pdf.roundedRect(xPos, yPos, cardWidth, 35, 3, 3, 'F');
        
        pdf.setTextColor(...white);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
        addTextUTF8(card.title, xPos + cardWidth/2, yPos + 10, { align: 'center' });
        
        pdf.setFontSize(16);
        addTextUTF8(card.value, xPos + cardWidth/2, yPos + 20, { align: 'center' });
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        addTextUTF8(card.detail, xPos + cardWidth/2, yPos + 28, { align: 'center' });
      });
      
      yPos += 45;
      
      // Beneficios adicionales
      yPos = addSectionHeader('BENEFICIOS INTANGIBLES', yPos);
      
      const benefits = [
        'Mayor agilidad para responder a cambios del mercado',
        'Mejora en la moral y productividad del equipo',
        'Posicionamiento como líder innovador en tu industria',
        'Capacidad de tomar decisiones basadas en datos reales',
        'Reducción del estrés operativo y burnout del equipo',
        'Preparación para oportunidades de inversión o expansión'
      ];
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      benefits.forEach(benefit => {
        pdf.setFillColor(...green);
        pdf.circle(25, yPos - 1, 2, 'F');
        pdf.setTextColor(...black);
        addTextUTF8(benefit, 30, yPos);
        yPos += 7;
      });

      addPageNumber(6, 7);

      // ===================
      // PÁGINA 7: CONCLUSIONES Y PRÓXIMOS PASOS
      // ===================
      pdf.addPage();
      
      pdf.setFillColor(...primaryBlue);
      pdf.rect(0, 0, pageWidth, 35, 'F');
      pdf.setTextColor(...white);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      addTextUTF8('CONCLUSIONES Y PRÓXIMOS PASOS', 20, 22);
      
      yPos = 50;
      
      // Resumen ejecutivo final
      yPos = addSectionHeader('RESUMEN DE TU SITUACIÓN ACTUAL', yPos);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      const summaryText = `${companyName} ha completado el Diagnóstico 3D Impulsa obteniendo una puntuación global de ${averageScore}/100, ubicándose en la etapa de "${businessStage.stage}". El análisis integral de ${responses.length} puntos críticos revela un perfil empresarial con fortalezas notables en ${strongAxis} (${strongestAxis.value} puntos) y oportunidades significativas de mejora en ${weakAxis} (${weakestAxis.value} puntos).

La brecha de ${Math.round((benchmarks.finance + benchmarks.operations + benchmarks.marketing)/3 - averageScore)} puntos respecto al promedio de la industria ${industryName} representa tanto un desafío como una oportunidad extraordinaria de crecimiento y diferenciación competitiva.`;
      
      yPos = addWrappedText(summaryText, 25, yPos, pageWidth - 50, 6) + 10;
      
      // Potencial identificado
      yPos = addSectionHeader('TU POTENCIAL DE CRECIMIENTO', yPos, green);
      
      const potentialText = `El análisis detallado revela un potencial de mejora del ${Math.round(totalImprovementPotential/3)}% promedio en las tres dimensiones evaluadas. La implementación del plan de acción recomendado puede posicionar a ${companyName} en el percentil superior de la industria ${industryName} en los próximos 90 días.

Con las estrategias correctas y el acompañamiento experto, tu empresa puede lograr:
• Incremento del 35-50% en eficiencia operativa
• Reducción del 40-60% en costos operativos
• Aumento del 200-300% en capacidad sin contratar personal adicional
• ROI del 250-350% en el primer año de implementación`;
      
      yPos = addWrappedText(potentialText, 25, yPos, pageWidth - 50, 6) + 10;
      
      // Recomendación final
      yPos = addSectionHeader('RECOMENDACIÓN ESTRATÉGICA', yPos, [220, 38, 127]);
      
      const recommendationText = `Basado en el diagnóstico integral, la recomendación prioritaria es iniciar inmediatamente con la transformación de ${weakAxisLabel} mediante la implementación del ${weakAxisName}. Esta intervención estratégica abordará el cuello de botella principal que limita tu crecimiento y generará el mayor impacto en el menor tiempo posible.

El momento de actuar es AHORA. Cada día que pasa sin optimizar representa oportunidades perdidas y ventaja competitiva cedida a la competencia.`;
      
      yPos = addWrappedText(recommendationText, 25, yPos, pageWidth - 50, 6) + 15;
      
      // Call to Action principal
      pdf.setFillColor(0, 123, 255);
      pdf.roundedRect(20, yPos, pageWidth - 40, 35, 5, 5, 'F');
      
      pdf.setTextColor(...white);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      addTextUTF8('TU PRÓXIMO PASO', pageWidth / 2, yPos + 12, { align: 'center' });
      
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'normal');
      addTextUTF8('Agenda tu sesión estratégica GRATUITA de 30 minutos', pageWidth / 2, yPos + 22, { align: 'center' });
      addTextUTF8('para diseñar tu plan de implementación personalizado', pageWidth / 2, yPos + 28, { align: 'center' });
      
      yPos += 45;
      
      // Beneficios de la sesión
      pdf.setFillColor(245, 245, 245);
      pdf.roundedRect(20, yPos, pageWidth - 40, 45, 3, 3, 'F');
      
      pdf.setTextColor(...black);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      addTextUTF8('En tu sesión estratégica gratuita recibirás:', 25, yPos + 8);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      const sessionBenefits = [
        '• Análisis detallado de tus resultados con un experto',
        '• Plan de acción personalizado para tu situación específica',
        '• Identificación de 3-5 quick wins para implementar inmediatamente',
        '• Estimación de ROI y timeline específico para tu empresa',
        '• Acceso a herramientas y recursos exclusivos'
      ];
      
      let benefitY = yPos + 16;
      sessionBenefits.forEach(benefit => {
        addTextUTF8(benefit, 30, benefitY);
        benefitY += 6;
      });
      
      yPos += 55;
      
      // Garantía
      pdf.setFillColor(220, 252, 231);
      pdf.setDrawColor(...green);
      pdf.setLineWidth(1);
      pdf.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'FD');
      
      pdf.setTextColor(...green);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      addTextUTF8('GARANTÍA IMPULSA LAB', pageWidth / 2, yPos + 8, { align: 'center' });
      
      pdf.setTextColor(...black);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      addTextUTF8('Si no encuentras valor en la sesión estratégica, te compensamos con', pageWidth / 2, yPos + 15, { align: 'center' });
      addTextUTF8('1 hora adicional de consultoría sin costo. Sin riesgos, solo resultados.', pageWidth / 2, yPos + 20, { align: 'center' });
      
      // Footer final profesional
      pdf.setFillColor(...primaryBlue);
      pdf.rect(0, pageHeight - 35, pageWidth, 35, 'F');
      
      pdf.setTextColor(...white);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      addTextUTF8('IMPULSA LAB', 20, pageHeight - 25);
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      addTextUTF8('Business Intelligence & Digital Transformation', 20, pageHeight - 20);
      
      pdf.setFontSize(9);
      addTextUTF8('Este diagnóstico es confidencial y propiedad de tu organización', 20, pageHeight - 13);
      addTextUTF8(`Validez: 30 días desde ${currentDate}`, 20, pageHeight - 8);
      
      // Información de contacto
      pdf.setFont('helvetica', 'bold');
      addTextUTF8('Contacto Directo:', pageWidth - 80, pageHeight - 25);
      pdf.setFont('helvetica', 'normal');
      addTextUTF8('contacto@tuimpulsalab.com', pageWidth - 80, pageHeight - 20);
      addTextUTF8('+57 311 266 9878', pageWidth - 80, pageHeight - 15);
      addTextUTF8('www.tuimpulsalab.com', pageWidth - 80, pageHeight - 10);
      
      addPageNumber(7, 7);
      
      // ===================
      // GUARDAR PDF
      // ===================
      
      // Generar nombre de archivo descriptivo
      const safeCompanyName = (companyName || 'Empresa')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 30) || 'empresa';
      
      const dateStr = new Date().toISOString().split('T')[0];
      const fileName = `Diagnostico-3D-Impulsa-${safeCompanyName}-${dateStr}.pdf`;
      
      // Guardar el PDF
      pdf.save(fileName);
      
      // Opcional: Guardar metadata en localStorage para referencia futura
      const pdfMetadata = {
        fileName,
        companyName: companyName || 'Tu Empresa',
        score: averageScore,
        scores: finalScores,
        generatedAt: new Date().toISOString(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      };
      
      // Guardar historial de PDFs generados
      try {
        const pdfHistory = JSON.parse(localStorage.getItem('diagnostico-pdf-history') || '[]');
        pdfHistory.unshift(pdfMetadata);
        // Mantener solo los últimos 10 PDFs en el historial
        if (pdfHistory.length > 10) {
          pdfHistory.pop();
        }
        localStorage.setItem('diagnostico-pdf-history', JSON.stringify(pdfHistory));
      } catch (storageError) {
        console.warn('No se pudo guardar el historial en localStorage:', storageError);
      }
      
      // Opcional: Si necesitas integración con Firebase
      // await saveDiagnosticToFirebase(pdfMetadata, responses, clientInfo);
      
      // Notificación de éxito (opcional)
      console.log('PDF generado exitosamente:', fileName);
      
    } catch (error) {
      console.error('Error generando PDF:', error);
      alert('Hubo un error al generar el PDF. Por favor intenta de nuevo o contacta soporte.');
    } finally {
      setGeneratingPDF(false);
    }
  };

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
                <div className="h-64 md:h-80">
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
                <div className="h-64 md:h-80">
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
          {/* Recomendaciones Personalizadas con IA */}
          <ProfessionalRecommendations 
            scores={finalScores} 
            clientInfo={clientInfo}
            responses={responses}
          />
        </div>
      )}

      {/* Call to Action mejorado para móvil */}
      <Card className="relative overflow-hidden border-2 border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <CardContent className="relative z-10 py-6 md:py-8">
          <div className="text-center space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-white">
              ¿Listo para transformar tu negocio?
            </h3>
            <p className="text-blue-100 max-w-2xl mx-auto text-sm md:text-base px-4">
              {isInternalMode ? 
                "Iniciemos la transformación de tu negocio con el plan personalizado que hemos diseñado para ti." :
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
                         font-semibold text-base md:text-lg transition-all duration-300 px-6 md:px-8 py-3 md:py-4 w-full md:w-auto"
              >
                {generatingPDF ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Generando PDF...
                  </>
                ) : (
                  <>
                    {!isInternalMode && <Lock className="w-4 h-4 mr-2" />}
                    <FileText className="w-5 h-5 mr-2" />
                    {isInternalMode ? 'Descargar PDF Completo' : 'PDF (Disponible en Consultoría)'}
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