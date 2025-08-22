// app/diagnostico/components/pdf/sections/ActionPlan.tsx
import jsPDF from 'jspdf';
import { PDFStyles } from '../utils/pdfStyles';

export async function generateActionPlan(
  pdf: jsPDF,
  scores: any,
  aiAnalysis: any,
  clientInfo: any,
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
  pdf.text('PLAN DE ACCIÓN PERSONALIZADO', 20, 22);
  
  let yPos = 50;
  
  // Determinar prioridad basada en scores
  const weakestDimension = getWeakestDimension(scores);
  const weakestScore = Math.min(scores.finance, scores.operations, scores.marketing);
  
  // Card de prioridad crítica
  pdf.setFillColor(255, 239, 239);
  pdf.setDrawColor(...styles.colors.danger);
  pdf.setLineWidth(2);
  pdf.roundedRect(15, yPos - 5, pageWidth - 30, 25, 5, 5, 'FD');
  
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(220, 38, 127);
  pdf.text('ACCIÓN CRÍTICA PRIORITARIA', pageWidth / 2, yPos + 3, { align: 'center' });
  
  pdf.setFontSize(14);
  pdf.setTextColor(...styles.colors.black);
  const priorityAction = aiAnalysis?.primaryRecommendation?.title || 
    `Fortalecer ${weakestDimension} (Score actual: ${weakestScore})`;
  pdf.text(priorityAction, pageWidth / 2, yPos + 12, { align: 'center' });
  
  yPos += 30;
  
  // Por qué es crítico
  pdf.setFillColor(255, 249, 196);
  pdf.roundedRect(20, yPos, pageWidth - 40, 30, 3, 3, 'F');
  
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(...styles.colors.black);
  pdf.text('¿Por qué actuar AHORA?', 25, yPos + 7);
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  const whyText = aiAnalysis?.primaryRecommendation?.why || 
    `Tu puntuación de ${weakestScore} en ${weakestDimension} es el principal cuello de botella. Mejorar esta área puede incrementar tu capacidad operativa en 30-50% en los próximos 90 días.`;
  
  const whyLines = pdf.splitTextToSize(whyText, pageWidth - 50);
  let tempY = yPos + 14;
  whyLines.forEach((line: string) => {
    pdf.text(line, 25, tempY);
    tempY += 4;
  });
  
  yPos += 35;
  
  // Plan de 5 pasos
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.primary);
  pdf.text('Plan de Implementación - 5 Pasos Clave:', 25, yPos);
  yPos += 8;
  
  const actions = aiAnalysis?.primaryRecommendation?.actions || [
    'Auditoría profunda de procesos actuales',
    'Implementación de sistema de monitoreo',
    'Automatización de procesos críticos',
    'Establecimiento de KPIs específicos',
    'Creación de cultura de mejora continua'
  ];
  
  actions.forEach((action: string, index: number) => {
    // Número en círculo
    pdf.setFillColor(...styles.colors.secondary);
    pdf.circle(28, yPos - 2, 3, 'F');
    pdf.setTextColor(...styles.colors.white);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.text((index + 1).toString(), 28, yPos, { align: 'center' });
    
    // Texto de la acción
    pdf.setTextColor(...styles.colors.black);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    
    const actionLines = pdf.splitTextToSize(action, pageWidth - 60);
    actionLines.forEach((line: string) => {
      pdf.text(line, 35, yPos);
      yPos += 4;
    });
    yPos += 3;
  });
  
  yPos += 5;
  
  // Quick Win
  pdf.setFillColor(255, 241, 118);
  pdf.setDrawColor(255, 193, 7);
  pdf.setLineWidth(2);
  pdf.roundedRect(15, yPos, pageWidth - 30, 25, 5, 5, 'FD');
  
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.black);
  pdf.text('QUICK WIN - Acción para HOY:', 25, yPos + 8);
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  const quickWin = aiAnalysis?.primaryRecommendation?.quickWin || 
    'Implementa un dashboard básico con 3-5 métricas clave para tener visibilidad inmediata.';
  
  const quickWinLines = pdf.splitTextToSize(quickWin, pageWidth - 50);
  tempY = yPos + 14;
  quickWinLines.forEach((line: string) => {
    pdf.text(line, 25, tempY);
    tempY += 4;
  });
  
  yPos += 30;
  
  // Métricas de éxito
  if (yPos > 220) {
    pdf.addPage();
    yPos = 30;
  }
  
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.primary);
  pdf.text('Métricas de Éxito:', 25, yPos);
  yPos += 8;
  
  const metrics = aiAnalysis?.successMetrics || [
    `Incremento de score en ${weakestDimension} de ${weakestScore} a ${Math.min(weakestScore + 30, 100)} puntos`,
    'Reducción del 40% en tiempo de tareas manuales',
    'ROI positivo en los primeros 60 días'
  ];
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  metrics.forEach((metric: string) => {
    pdf.setFillColor(...styles.colors.success);
    pdf.circle(25, yPos - 1, 2, 'F');
    pdf.setTextColor(...styles.colors.black);
    pdf.text(metric, 30, yPos);
    yPos += 6;
  });
  
  // Número de página
  pdf.setFontSize(9);
  pdf.setTextColor(...styles.colors.gray);
  pdf.text('Página 4', pageWidth - 20, pageHeight - 10, { align: 'right' });
}

function getWeakestDimension(scores: any): string {
  const min = Math.min(scores.finance, scores.operations, scores.marketing);
  if (scores.finance === min) return 'Finanzas';
  if (scores.operations === min) return 'Operaciones';
  return 'Marketing';
}