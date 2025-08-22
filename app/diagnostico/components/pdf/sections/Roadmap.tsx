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
  
  // Header principal
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
  
  // Si hay datos del roadmap de IA, usarlos
  if (roadmapData && roadmapData.length > 0) {
    roadmapData.forEach((phase, index) => {
      const phaseColor = index === 0 ? styles.colors.secondary : 
                        index === 1 ? styles.colors.purple : 
                        styles.colors.success;
      
      // Verificar espacio para toda la fase
      yPos = checkPageSpace(yPos, 70);
      
      // Header de fase
      pdf.setFillColor(...phaseColor);
      pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${phase.phase}: ${phase.focus}`, 20, yPos);
      
      yPos += 10;
      
      // Card de contenido
      pdf.setFillColor(245, 245, 245);
      pdf.roundedRect(20, yPos, pageWidth - 40, 45, 3, 3, 'F');
      
      pdf.setTextColor(...styles.colors.black);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.text('Acciones clave:', 25, yPos + 8);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      let tempY = yPos + 15;
      
      phase.keyActions.forEach(action => {
        const actionLines = pdf.splitTextToSize(`• ${action}`, pageWidth - 50);
        
        // Verificar si necesitamos nueva página
        if (tempY + (actionLines.length * 5) > maxY) {
          pdf.addPage();
          pdf.setFillColor(...styles.colors.primary);
          pdf.rect(0, 0, pageWidth, 35, 'F');
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(20);
          pdf.setFont('helvetica', 'bold');
          pdf.text('ROADMAP DE TRANSFORMACIÓN - 90 DÍAS (Cont.)', 20, 22);
          tempY = 45;
          
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(10);
          pdf.setTextColor(...styles.colors.black);
        }
        
        actionLines.forEach((line: string) => {
          pdf.text(line, 30, tempY);
          tempY += 5;
        });
      });
      
      // Resultado esperado
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...phaseColor);
      pdf.text(`Resultado esperado: ${phase.expectedOutcome}`, 25, tempY + 3);
      
      yPos = tempY + 15;
    });
  } else {
    // Roadmap por defecto si no hay datos de IA
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
    
    defaultRoadmap.forEach((phase, index) => {
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
      pdf.setFillColor(245, 245, 245);
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
        const actionLines = pdf.splitTextToSize(`• ${action}`, pageWidth - 50);
        
        // Verificar si necesitamos nueva página para esta acción
        if (tempY + (actionLines.length * 5) > maxY) {
          pdf.addPage();
          // Header en nueva página
          pdf.setFillColor(...styles.colors.primary);
          pdf.rect(0, 0, pageWidth, 35, 'F');
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(20);
          pdf.setFont('helvetica', 'bold');
          pdf.text('ROADMAP DE TRANSFORMACIÓN - 90 DÍAS (Cont.)', 20, 22);
          tempY = 45;
          
          // Continuar con el título de la fase
          pdf.setFillColor(...phase.color);
          pdf.rect(15, tempY - 8, pageWidth - 30, 12, 'F');
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`${phase.title} (Continuación)`, 20, tempY);
          tempY += 15;
          
          // Reestablecer el color y fuente para el texto
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(10);
          pdf.setTextColor(...styles.colors.black);
        }
        
        actionLines.forEach((line: string) => {
          pdf.text(line, 30, tempY);
          tempY += 5;
        });
      });
      
      // Verificar espacio para el resultado
      if (tempY + 10 > maxY) {
        pdf.addPage();
        // Header en nueva página
        pdf.setFillColor(...styles.colors.primary);
        pdf.rect(0, 0, pageWidth, 35, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.text('ROADMAP DE TRANSFORMACIÓN - 90 DÍAS (Cont.)', 20, 22);
        tempY = 45;
      }
      
      // Resultado esperado
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...styles.colors.success);
      pdf.text(`Resultado: ${phase.result}`, 25, tempY + 5);
      
      yPos = tempY + 15;
    });
  }
  
  // Indicadores de éxito si hay espacio
  yPos = checkPageSpace(yPos, 40);
  
  if (yPos < maxY - 35) {
    yPos += 10;
    
    pdf.setFillColor(245, 245, 245);
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
    
    // Dividir métricas en líneas si es necesario
    const metricsText = metrics.join('  |  ');
    const metricsLines = pdf.splitTextToSize(metricsText, pageWidth - 50);
    
    let metricY = yPos + 18;
    metricsLines.forEach((line: string) => {
      pdf.text(line, pageWidth/2, metricY, { align: 'center' });
      metricY += 5;
    });
  }
  
  // Número de página
  pdf.setFontSize(9);
  pdf.setTextColor(...styles.colors.gray);
  pdf.text('Página 5 de 7', pageWidth - 20, pageHeight - 10, { align: 'right' });
}