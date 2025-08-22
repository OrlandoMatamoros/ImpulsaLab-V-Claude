// app/diagnostico/components/pdf/sections/Roadmap.tsx
import jsPDF from 'jspdf';
import { PDFStyles } from '../utils/pdfStyles';

export async function generateRoadmap(
  pdf: jsPDF,
  roadmap: any[],
  styles: typeof PDFStyles
) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Header
  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(...styles.colors.white);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ROADMAP DE TRANSFORMACIÓN - 90 DÍAS', 20, 22);
  
  let yPos = 50;
  
  // Timeline visual
  pdf.setDrawColor(...styles.colors.gray);
  pdf.setLineWidth(3);
  pdf.line(30, yPos, pageWidth - 30, yPos);
  
  // Marcadores de fases
  const phases = [
    { x: 30, label: 'Inicio', day: '0', color: styles.colors.primary },
    { x: 76, label: 'Fase 1', day: '30', color: styles.colors.secondary },
    { x: 122, label: 'Fase 2', day: '60', color: styles.colors.purple },
    { x: 168, label: 'Fase 3', day: '90', color: styles.colors.success }
  ];
  
  phases.forEach(phase => {
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
  
  // Fases del roadmap
  const defaultRoadmap = [
    {
      phase: 'Días 1-30',
      focus: 'Fundamentos',
      keyActions: [
        'Auditoría completa de sistemas',
        'Implementación de quick wins',
        'Configuración de herramientas básicas'
      ],
      expectedOutcome: 'Sistema básico con 40% más visibilidad'
    },
    {
      phase: 'Días 31-60',
      focus: 'Optimización',
      keyActions: [
        'Automatización de procesos críticos',
        'Implementación de dashboards',
        'Optimización de flujos de trabajo'
      ],
      expectedOutcome: 'Eficiencia mejorada 35-45%'
    },
    {
      phase: 'Días 61-90',
      focus: 'Escalamiento',
      keyActions: [
        'Expansión del sistema',
        'Analytics predictivos',
        'Preparación para crecimiento'
      ],
      expectedOutcome: 'Capacidad de escalar 2-3X'
    }
  ];
  
  const roadmapData = roadmap && roadmap.length > 0 ? roadmap : defaultRoadmap;
  
  roadmapData.forEach((phase, index) => {
    const phaseColor = index === 0 ? styles.colors.secondary :
                      index === 1 ? styles.colors.purple :
                      styles.colors.success;
    
    // Header de fase
    pdf.setFillColor(...phaseColor);
    pdf.rect(15, yPos - 5, pageWidth - 30, 10, 'F');
    pdf.setTextColor(...styles.colors.white);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text(`FASE ${index + 1}: ${phase.focus?.toUpperCase()} (${phase.phase})`, 20, yPos + 2);
    
    yPos += 12;
    
    // Contenido de la fase
    const r = phaseColor[0];
    const g = phaseColor[1];
    const b = phaseColor[2];
    pdf.setFillColor(r, g, b, 0.05);
    pdf.roundedRect(20, yPos, pageWidth - 40, 40, 3, 3, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.setTextColor(...phaseColor);
    pdf.text('Objetivo:', 25, yPos + 7);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(...styles.colors.black);
    pdf.text(phase.focus || 'Mejora continua', 65, yPos + 7);
    
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...phaseColor);
    pdf.text('Acciones:', 25, yPos + 14);
    
    let actionY = yPos + 20;
    phase.keyActions?.forEach((action: string) => {
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(...styles.colors.black);
      pdf.text(`• ${action}`, 30, actionY);
      actionY += 5;
    });
    
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...styles.colors.success);
    pdf.text('Resultado:', 25, actionY);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...styles.colors.black);
    pdf.text(phase.expectedOutcome || 'Mejora significativa', 50, actionY);
    
    yPos += 50;
    
    // Nueva página si es necesario
    if (yPos > 220 && index < roadmapData.length - 1) {
      pdf.addPage();
      yPos = 30;
    }
  });
  
  // Número de página
  pdf.setFontSize(9);
  pdf.setTextColor(...styles.colors.gray);
  pdf.text('Página 5', pageWidth - 20, pageHeight - 10, { align: 'right' });
}