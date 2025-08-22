// app/diagnostico/components/pdf/sections/DetailedAnalysis.tsx
import jsPDF from 'jspdf';
import { PDFStyles } from '../utils/pdfStyles';

export async function generateDetailedAnalysis(
  pdf: jsPDF,
  scores: any,
  responses: any[],
  clientInfo: any,
  styles: typeof PDFStyles
) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Header
  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ANÁLISIS DETALLADO POR EJE', 20, 22);
  
  let yPos = 50;
  
  const industryName = clientInfo?.industry || 'Otro';
  const benchmarks = styles.industryBenchmarks[industryName as keyof typeof styles.industryBenchmarks] || styles.industryBenchmarks['Otro'];
  
  // FINANZAS
  pdf.setFillColor(...styles.colors.secondary);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('FINANZAS', 20, yPos);
  
  yPos += 15;
  
  // Score card con fondo gris muy claro
  pdf.setFillColor(245, 245, 245);
  pdf.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'F');
  
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...styles.colors.secondary);
  pdf.text(`Score: ${scores.finance}/100`, 30, yPos + 10);
  
  pdf.setTextColor(...styles.colors.gray);
  pdf.setFontSize(12);
  pdf.text(`Benchmark ${industryName}: ${benchmarks.finance}`, 30, yPos + 18);
  
  const financeDiff = scores.finance - benchmarks.finance;
  pdf.setTextColor(...(financeDiff >= 0 ? styles.colors.success : styles.colors.danger));
  pdf.setFontSize(11);
  pdf.text(`${financeDiff >= 0 ? '+' : ''}${financeDiff} pts`, pageWidth - 50, yPos + 14);
  
  yPos += 35;
  
  // Análisis de Finanzas
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.black);
  
  const financeAnalysis = scores.finance >= 40 ? 
    `Control financiero básico que requiere fortalecimiento. El score de ${scores.finance} indica sistemas fundamentales pero con brechas en visibilidad. La industria ${industryName} promedia ${benchmarks.finance} puntos, representando una oportunidad de mejora significativa.` :
    `Gestión financiera reactiva. Con ${scores.finance} puntos, estás ${benchmarks.finance - scores.finance} puntos por debajo del estándar de la industria. Esto representa la mayor oportunidad de mejora inmediata.`;
  
  const lines1 = pdf.splitTextToSize(financeAnalysis, pageWidth - 50);
  lines1.forEach((line: string) => {
    pdf.text(line, 25, yPos);
    yPos += 6;
  });
  
  yPos += 5;
  
  // ROI Info
  pdf.setFillColor(...styles.colors.secondary.map(c => Math.min(255, c + 200)) as [number, number, number]);
  pdf.roundedRect(20, yPos, (pageWidth - 45) / 2, 20, 3, 3, 'F');
  
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(...styles.colors.secondary);
  pdf.text('ROI Esperado:', 25, yPos + 8);
  pdf.setTextColor(...styles.colors.black);
  pdf.text(`${scores.finance < 60 ? '200-300%' : '150-200%'}`, 70, yPos + 8); // Corregido: faltaba cerrar comilla
  
  pdf.setTextColor(...styles.colors.secondary);
  pdf.text('Tiempo:', 25, yPos + 15);
  pdf.setTextColor(...styles.colors.black);
  pdf.text(`${scores.finance < 60 ? '30-45' : '15-30'} días`, 55, yPos + 15);
  
  pdf.setTextColor(...styles.colors.secondary);
  pdf.text('Prioridad: ALTA', 110, yPos + 12);
  
  yPos += 30;
  
  // OPERACIONES
  pdf.setFillColor(...styles.colors.success);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('OPERACIONES', 20, yPos);
  
  yPos += 15;
  
  // Score card con fondo gris muy claro
  pdf.setFillColor(245, 245, 245);
  pdf.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'F');
  
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...styles.colors.success);
  pdf.text(`Score: ${scores.operations}/100`, 30, yPos + 10);
  
  pdf.setTextColor(...styles.colors.gray);
  pdf.setFontSize(12);
  pdf.text(`Benchmark ${industryName}: ${benchmarks.operations}`, 30, yPos + 18);
  
  const opsDiff = scores.operations - benchmarks.operations;
  pdf.setTextColor(...(opsDiff >= 0 ? styles.colors.success : styles.colors.danger));
  pdf.setFontSize(11);
  pdf.text(`${opsDiff >= 0 ? '+' : ''}${opsDiff} pts`, pageWidth - 50, yPos + 14);
  
  yPos += 35;
  
  // Análisis de Operaciones
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.black);
  
  const operationsAnalysis = scores.operations >= 40 ?
    `Operaciones funcionales pero manuales. El score de ${scores.operations} revela dependencia de procesos manuales que limitan escalabilidad. Con el benchmark en ${benchmarks.operations}, existe oportunidad de duplicar capacidad mediante automatización.` :
    `Operaciones principalmente manuales. Tu puntuación de ${scores.operations} está ${benchmarks.operations - scores.operations} puntos debajo del promedio. Se estima que el 60-70% del tiempo se dedica a tareas automatizables.`;
  
  const lines2 = pdf.splitTextToSize(operationsAnalysis, pageWidth - 50);
  lines2.forEach((line: string) => {
    pdf.text(line, 25, yPos);
    yPos += 6;
  });
  
  yPos += 5;
  
  // ROI Info
  pdf.setFillColor(...styles.colors.success.map(c => Math.min(255, c + 200)) as [number, number, number]);
  pdf.roundedRect(20, yPos, (pageWidth - 45) / 2, 20, 3, 3, 'F');
  
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(...styles.colors.success);
  pdf.text('ROI Esperado:', 25, yPos + 8);
  pdf.setTextColor(...styles.colors.black);
  pdf.text(`${scores.operations < 60 ? '200-300%' : '150-200%'}`, 70, yPos + 8); // Corregido
  
  pdf.setTextColor(...styles.colors.success);
  pdf.text('Tiempo:', 25, yPos + 15);
  pdf.setTextColor(...styles.colors.black);
  pdf.text(`${scores.operations < 60 ? '30-45' : '15-30'} días`, 55, yPos + 15);
  
  pdf.setTextColor(...styles.colors.success);
  pdf.text('Prioridad: ALTA', 110, yPos + 12);
  
  // Verificar si necesitamos nueva página
  if (yPos > 200) {
    pdf.addPage();
    yPos = 30;
  } else {
    yPos += 30;
  }
  
  // MARKETING
  pdf.setFillColor(...styles.colors.purple);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('MARKETING', 20, yPos);
  
  yPos += 15;
  
  // Score card con fondo gris muy claro
  pdf.setFillColor(245, 245, 245);
  pdf.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'F');
  
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...styles.colors.purple);
  pdf.text(`Score: ${scores.marketing}/100`, 30, yPos + 10);
  
  pdf.setTextColor(...styles.colors.gray);
  pdf.setFontSize(12);
  pdf.text(`Benchmark ${industryName}: ${benchmarks.marketing}`, 30, yPos + 18);
  
  const mktDiff = scores.marketing - benchmarks.marketing;
  pdf.setTextColor(...(mktDiff >= 0 ? styles.colors.success : styles.colors.danger));
  pdf.setFontSize(11);
  pdf.text(`${mktDiff >= 0 ? '+' : ''}${mktDiff} pts`, pageWidth - 50, yPos + 14);
  
  yPos += 35;
  
  // Análisis de Marketing
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.black);
  
  const marketingAnalysis = scores.marketing >= 40 ?
    `Marketing básico con potencial sin explotar. Con ${scores.marketing} puntos vs ${benchmarks.marketing} del benchmark, existe brecha en posicionamiento digital. La competencia está capturando market share mediante estrategias omnicanal.` :
    `Marketing reactivo y limitado. Tu puntuación de ${scores.marketing} está ${benchmarks.marketing - scores.marketing} puntos bajo el estándar. Los competidores están capturando tu mercado potencial mediante estrategias digitales efectivas.`;
  
  const lines3 = pdf.splitTextToSize(marketingAnalysis, pageWidth - 50);
  lines3.forEach((line: string) => {
    pdf.text(line, 25, yPos);
    yPos += 6;
  });
  
  yPos += 5;
  
  // ROI Info
  pdf.setFillColor(...styles.colors.purple.map(c => Math.min(255, c + 200)) as [number, number, number]);
  pdf.roundedRect(20, yPos, (pageWidth - 45) / 2, 20, 3, 3, 'F');
  
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(...styles.colors.purple);
  pdf.text('ROI Esperado:', 25, yPos + 8);
  pdf.setTextColor(...styles.colors.black);
  pdf.text(`${scores.marketing < 60 ? '200-300%' : '150-200%'}`, 70, yPos + 8); // Corregido
  
  pdf.setTextColor(...styles.colors.purple);
  pdf.text('Tiempo:', 25, yPos + 15);
  pdf.setTextColor(...styles.colors.black);
  pdf.text(`${scores.marketing < 60 ? '30-45' : '15-30'} días`, 55, yPos + 15);
  
  pdf.setTextColor(...styles.colors.purple);
  pdf.text('Prioridad: ALTA', 110, yPos + 12);
  
  // Número de página
  pdf.setFontSize(9);
  pdf.setTextColor(...styles.colors.gray);
  pdf.text('Página 3', pageWidth - 20, pageHeight - 10, { align: 'right' });
}