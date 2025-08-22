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
  const industryName = (clientInfo?.industry || 'Otro') as keyof typeof styles.industryBenchmarks;
  const benchmarks = styles.industryBenchmarks[industryName];
  
  // Header
  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(0, 0, pageWidth, 35, 'F');
  pdf.setTextColor(...styles.colors.white);
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('ANÁLISIS DETALLADO POR DIMENSIÓN', 20, 22);
  
  let yPos = 50;
  
  // Análisis de Finanzas
  yPos = addDimensionAnalysis(
    pdf,
    'FINANZAS',
    scores.finance,
    benchmarks.finance,
    industryName,
    getFinanceAnalysis(scores.finance, benchmarks.finance, industryName),
    styles.colors.secondary,
    yPos,
    pageWidth,
    styles
  );
  
  // Verificar si necesitamos nueva página
  if (yPos > 180) {
    pdf.addPage();
    yPos = 30;
  }
  
  // Análisis de Operaciones
  yPos = addDimensionAnalysis(
    pdf,
    'OPERACIONES',
    scores.operations,
    benchmarks.operations,
    industryName,
    getOperationsAnalysis(scores.operations, benchmarks.operations, industryName),
    styles.colors.success,
    yPos,
    pageWidth,
    styles
  );
  
  // Verificar si necesitamos nueva página
  if (yPos > 180) {
    pdf.addPage();
    yPos = 30;
  }
  
  // Análisis de Marketing
  yPos = addDimensionAnalysis(
    pdf,
    'MARKETING',
    scores.marketing,
    benchmarks.marketing,
    industryName,
    getMarketingAnalysis(scores.marketing, benchmarks.marketing, industryName),
    styles.colors.purple,
    yPos,
    pageWidth,
    styles
  );
  
  // Número de página
  pdf.setFontSize(9);
  pdf.setTextColor(...styles.colors.gray);
  pdf.text('Página 3', pageWidth - 20, pageHeight - 10, { align: 'right' });
}

function addDimensionAnalysis(
  pdf: jsPDF,
  title: string,
  score: number,
  benchmark: number,
  industry: string,
  analysis: string,
  color: [number, number, number],
  yPos: number,
  pageWidth: number,
  styles: typeof PDFStyles
): number {
  // Título de la dimensión
  pdf.setFillColor(...color);
  pdf.rect(15, yPos - 5, pageWidth - 30, 10, 'F');
  pdf.setTextColor(...styles.colors.white);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.text(title, 20, yPos + 2);
  
  yPos += 12;
  
  // Score card
  const r = color[0];
  const g = color[1];
  const b = color[2];
  pdf.setFillColor(r, g, b, 0.1);
  pdf.roundedRect(20, yPos, pageWidth - 40, 20, 3, 3, 'F');
  
  pdf.setTextColor(...color);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(14);
  pdf.text(`Score: ${score}/100`, 25, yPos + 8);
  
  pdf.setTextColor(...styles.colors.black);
  pdf.setFontSize(11);
  pdf.text(`Benchmark ${industry}: ${benchmark}`, 25, yPos + 15);
  
  const diff = score - benchmark;
  const diffColor = diff >= 0 ? styles.colors.success : styles.colors.danger;
  pdf.setTextColor(...diffColor);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`${diff >= 0 ? '✓' : '✗'} ${diff >= 0 ? '+' : ''}${diff} pts`, 120, yPos + 8);
  
  yPos += 25;
  
  // Análisis
  pdf.setTextColor(...styles.colors.black);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  
  const lines = pdf.splitTextToSize(analysis, pageWidth - 50);
  lines.forEach((line: string) => {
    pdf.text(line, 25, yPos);
    yPos += 5;
  });
  
  yPos += 10;
  
  // KPIs de mejora
  pdf.setFillColor(...styles.colors.lightGray);
  pdf.roundedRect(20, yPos - 3, pageWidth - 40, 15, 3, 3, 'F');
  
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(...color);
  pdf.text('ROI Esperado:', 25, yPos + 3);
  pdf.setTextColor(...styles.colors.black);
  pdf.text(`${score < 60 ? '200-300%' : '100-150%'}`, 55, yPos + 3);
  
  pdf.setTextColor(...color);
  pdf.text('Tiempo:', 90, yPos + 3);
  pdf.setTextColor(...styles.colors.black);
  pdf.text(`${score < 60 ? '30-45' : '15-30'} días`, 110, yPos + 3);
  
  pdf.setTextColor(...color);
  pdf.text('Prioridad:', 25, yPos + 9);
  pdf.setTextColor(...styles.colors.black);
  pdf.text(score < 40 ? 'CRÍTICA' : score < 60 ? 'ALTA' : 'MEDIA', 55, yPos + 9);
  
  return yPos + 20;
}

function getFinanceAnalysis(score: number, benchmark: number, industry: string): string {
  if (score >= 80) {
    return `Excelente gestión financiera con sistemas maduros de control y planificación. El score de ${score} supera ampliamente el promedio de ${benchmark} en ${industry}, posicionando a la empresa en el top 10% del sector.`;
  } else if (score >= 60) {
    return `Control financiero sólido con oportunidades de optimización. Con ${score} puntos, la empresa ${score >= benchmark ? 'supera' : 'se aproxima al'} benchmark de la industria. Implementar dashboards en tiempo real puede elevar el score 15-20 puntos adicionales.`;
  } else if (score >= 40) {
    return `Control financiero básico que requiere fortalecimiento. El score de ${score} indica sistemas fundamentales pero con brechas en visibilidad. La industria promedia ${benchmark} puntos, representando una oportunidad de mejora significativa.`;
  } else {
    return `Gestión financiera reactiva que limita el crecimiento. Con ${score} puntos existe una brecha crítica de ${benchmark - score} puntos respecto al estándar. Requiere intervención inmediata para evitar riesgos de liquidez.`;
  }
}

function getOperationsAnalysis(score: number, benchmark: number, industry: string): string {
  if (score >= 80) {
    return `Operaciones de clase mundial con procesos optimizados y automatizados. El score de ${score} supera el benchmark de ${benchmark}, demostrando excelencia operacional que permite escalabilidad sin incremento proporcional de recursos.`;
  } else if (score >= 60) {
    return `Operaciones eficientes con potencial de automatización. Con ${score} puntos, la empresa ${score >= benchmark ? 'supera' : 'se acerca al'} promedio industrial. Automatizar 2-3 procesos clave puede liberar 15-20 horas semanales del equipo.`;
  } else if (score >= 40) {
    return `Operaciones funcionales pero manuales. El score de ${score} revela dependencia de procesos manuales que limitan escalabilidad. Con el benchmark en ${benchmark}, existe oportunidad de duplicar capacidad mediante automatización.`;
  } else {
    return `Operaciones reactivas que requieren reestructuración. Con ${score} puntos, la empresa está ${benchmark - score} puntos bajo el estándar. Se estima que 60-70% del tiempo se dedica a tareas repetitivas automatizables.`;
  }
}

function getMarketingAnalysis(score: number, benchmark: number, industry: string): string {
  if (score >= 80) {
    return `Marketing de alto rendimiento con estrategia digital madura. Con ${score} puntos, la empresa supera el benchmark de ${benchmark}, demostrando dominio en generación de demanda con CAC optimizado y LTV/CAC superior a 3:1.`;
  } else if (score >= 60) {
    return `Estrategia de marketing efectiva con oportunidades digitales. El score de ${score} ${score >= benchmark ? 'supera' : 'se acerca al'} promedio industrial. Optimizar canales digitales puede reducir CAC 20-30% y duplicar conversión.`;
  } else if (score >= 40) {
    return `Marketing básico con potencial sin explotar. Con ${score} puntos vs ${benchmark} del benchmark, existe brecha en posicionamiento digital. La competencia está capturando market share mediante estrategias omnicanal.`;
  } else {
    return `Marketing reactivo que limita el crecimiento. El score de ${score} está ${benchmark - score} puntos bajo el estándar. Sin presencia digital efectiva, la empresa depende de referencias limitando su potencial de expansión.`;
  }
}