// app/diagnostico/components/pdf/sections/Roadmap.tsx
import jsPDF from 'jspdf';
import { PDFStyles } from '../utils/pdfStyles';

interface RoadmapPhase {
  phase: string;
  focus: string;
  keyActions: string[];
  expectedOutcome: string;
}

export async function generateRoadmap(
  pdf: jsPDF,
  roadmapData: RoadmapPhase[] | undefined,
  styles: typeof PDFStyles
) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const maxY = pageHeight - 30;
  
  // Función helper para verificar espacio
  const checkPageSpace = (currentY: number, requiredSpace: number): number => {
    if (currentY + requiredSpace > maxY) {
      pdf.addPage();
      // Header en nueva página
      pdf.setFillColor(...styles.colors.primary);
      pdf.rect(0, 0, pageWidth, 35, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('ROADMAP DE TRANSFORMACIÓN - 90 DÍAS (Cont.)', 20, 22);
      return 45;
    }
    return currentY;
  };
  
  // Header
  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ROADMAP DE TRANSFORMACIÓN - 90 DÍAS', 20, 22);
  
  let yPos = 50;
  
  // Timeline visual
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(3);
  pdf.line(30, yPos, pageWidth - 30, yPos);
  
  // Marcadores de fases
  const phases = [
    { x: 30, label: 'Inicio', day: '0', color: styles.colors.primary },
    { x: 76, label: 'Fase 1', day: '30', color: styles.colors.secondary },
    { x: 122, label: 'Fase 2', day: '60', color: styles.colors.purple },
    { x: 168, label: 'Fase 3', day: '90', color: styles.colors.success }
  ];
  
  phases.forEach((phase) => {
    pdf.setFillColor(...phase.color);
    pdf.circle(phase.x, yPos, 5, 'F');
    pdf.setTextColor(...styles.colors.black);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.text(phase.label, phase.x, yPos - 10, { align: 'center' });
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text(`Día ${phase.day}`, phase.x, yPos + 12, { align: 'center' });
  });
  
  yPos += 30;
  
  // Roadmap por defecto
  const defaultRoadmap = [
    {
      title: 'FASE 1: FUNDAMENTOS (Días 1-30)',
      color: styles.colors.secondary,
      objective: 'Establecer las bases sólidas',
      actions: [
        'Auditoría completa de sistemas y procesos actuales',
        'Implementación de quick wins identificados',
        'Configuración de herramientas básicas de monitoreo',
        'Capacitación inicial del equipo'
      ],
      result: 'Sistema básico operativo con 40% más visibilidad'
    },
    {
      title: 'FASE 2: OPTIMIZACIÓN (Días 31-60)',
      color: styles.colors.purple,
      objective: 'Automatizar y optimizar procesos clave',
      actions: [
        'Automatización de 3-5 procesos críticos',
        'Implementación de dashboards avanzados',
        'Optimización de flujos de trabajo',
        'Establecimiento de métricas automatizadas'
      ],
      result: 'Eficiencia operativa mejorada 35-45%'
    },
    {
      title: 'FASE 3: ESCALAMIENTO (Días 61-90)',
      color: styles.colors.success,
      objective: 'Escalar el sistema y preparar crecimiento',
      actions: [
        'Expansión del sistema a todas las áreas',
        'Implementación de analytics predictivos',
        'Optimización continua basada en datos',
        'Preparación para scaling 2-3X'
      ],
      result: 'Sistema completo con capacidad de escalar'
    }
  ];
  
  defaultRoadmap.forEach(phase => {
    // Verificar espacio para toda la fase
    yPos = checkPageSpace(yPos, 70);
    
    // Header de fase
    pdf.setFillColor(...phase.color);
    pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(phase.title, 20, yPos);
    
    yPos += 10;
    
    // Card de contenido con fondo gris muy claro
    pdf.setFillColor(245, 245, 245); // Gris muy claro como en DetailedAnalysis
    pdf.roundedRect(20, yPos, pageWidth - 40, 55, 3, 3, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(...phase.color);
    pdf.text(`Objetivo: ${phase.objective}`, 25, yPos + 8);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(...styles.colors.black);
    
    let tempY = yPos + 15;
    pdf.text('Acciones:', 25, tempY);
    tempY += 5;
    
    phase.actions.forEach(action => {
      // Verificar si la acción cabe
      const actionLines = pdf.splitTextToSize(`• ${action}`, pageWidth - 50);
      if (tempY + (actionLines.length * 5) > yPos + 50) {
        // Si no cabe, ajustar
        return;
      }
      
      actionLines.forEach((line: string) => {
        pdf.text(line, 30, tempY);
        tempY += 5;
      });
    });
    
    // Resultado esperado
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...styles.colors.success);
    pdf.text(`Resultado: ${phase.result}`, 25, yPos + 48);
    
    yPos += 65;
  });
  
  // Indicadores de éxito si hay espacio
  if (yPos < maxY - 40) {
    yPos += 10;
    
    pdf.setFillColor(245, 245, 245); // Gris muy claro
    pdf.roundedRect(20, yPos, pageWidth - 40, 30, 3, 3, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(...styles.colors.primary);
    pdf.text('🎯 INDICADORES DE ÉXITO DEL ROADMAP', pageWidth/2, yPos + 10, { align: 'center' });
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(...styles.colors.black);
    
    const metrics = [
      '✓ Reducción 40-60% en tareas manuales',
      '✓ Incremento 2-3X en capacidad',
      '✓ ROI positivo desde mes 3'
    ];
    
    pdf.text(metrics.join('  |  '), pageWidth/2, yPos + 20, { align: 'center' });
  }
  
  // Número de página
  pdf.setFontSize(9);
  pdf.setTextColor(...styles.colors.gray);
  pdf.text('Página 5 de 7', pageWidth - 20, pageHeight - 10, { align: 'right' });
}