// app/diagnostico/components/pdf/sections/ROIMetrics.tsx
import jsPDF from 'jspdf';
import { PDFStyles } from '../utils/pdfStyles';

export async function generateROIMetrics(
  pdf: jsPDF,
  scores: any,
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
  pdf.text('MÉTRICAS DE ÉXITO Y RETORNO DE INVERSIÓN', 20, 22);
  
  let yPos = 50;
  
  // Identificar el eje más débil para personalizar métricas
  const weakestAxis = Object.entries(scores).reduce(
    (min, [key, value]) =>
      (typeof value === 'number' && value < (min.value as number))
        ? { key, value: value as number }
        : min,
    { key: 'finance', value: scores.finance as number }
  );
  
  const weakAxisLabel = weakestAxis.key === 'finance' ? 'Finanzas' : 
                       weakestAxis.key === 'operations' ? 'Operaciones' : 'Marketing';
  
  // SECCIÓN 1: KPIs principales
  pdf.setFillColor(...styles.colors.success);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('INDICADORES CLAVE DE ÉXITO (KPIs)', 20, yPos);
  
  yPos += 15;
  
  // Tabla de KPIs
  const kpis = [
    {
      metric: `Score ${weakAxisLabel}`,
      current: weakestAxis.value.toString(),
      target: Math.min(weakestAxis.value + 35, 100).toString(),
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
  
  // Header de tabla
  pdf.setFillColor(...styles.colors.lightGray);
  pdf.rect(20, yPos, pageWidth - 40, 10, 'F');
  
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(...styles.colors.black);
  pdf.text('Métrica', 25, yPos + 7);
  pdf.text('Actual', 70, yPos + 7);
  pdf.text('Objetivo', 100, yPos + 7);
  pdf.text('Plazo', 135, yPos + 7);
  pdf.text('Impacto', 165, yPos + 7);
  
  yPos += 12;
  
  // Filas de KPIs
  kpis.forEach((kpi, index) => {
    // Alternar color de fondo
    if (index % 2 === 0) {
      pdf.setFillColor(250, 250, 250);
      pdf.rect(20, yPos - 3, pageWidth - 40, 8, 'F');
    }
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(...styles.colors.black);
    pdf.text(kpi.metric, 25, yPos + 2);
    pdf.text(kpi.current, 70, yPos + 2);
    
    // Target en verde
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...styles.colors.success);
    pdf.text(kpi.target, 100, yPos + 2);
    
    // Timeline
    pdf.setTextColor(...styles.colors.black);
    pdf.setFont('helvetica', 'normal');
    pdf.text(kpi.timeline, 135, yPos + 2);
    
    // Impact con color
    const impactColor = kpi.impact === 'ALTO' ? styles.colors.success : styles.colors.warning;
    pdf.setTextColor(...impactColor);
    pdf.setFont('helvetica', 'bold');
    pdf.text(kpi.impact, 165, yPos + 2);
    
    yPos += 8;
  });
  
  yPos += 15;
  
  // SECCIÓN 2: ROI Proyectado
  pdf.setFillColor(...styles.colors.secondary);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('RETORNO DE INVERSIÓN PROYECTADO', 20, yPos);
  
  yPos += 15;
  
  // Cards de ROI
  const roiCards = [
    {
      title: 'ROI Año 1',
      value: '250-350%',
      color: styles.colors.success,
      detail: 'Recuperación total + ganancias'
    },
    {
      title: 'Payback',
      value: '3-4 meses',
      color: styles.colors.secondary,
      detail: 'Tiempo de recuperación'
    },
    {
      title: 'Ahorro Anual',
      value: '$50-150K',
      color: styles.colors.purple,
      detail: 'En eficiencias y automatización'
    }
  ];
  
  const cardWidth = (pageWidth - 50) / 3;
  roiCards.forEach((card, index) => {
    const xPos = 20 + (index * (cardWidth + 5));
    
    pdf.setFillColor(...card.color);
    pdf.roundedRect(xPos, yPos, cardWidth, 35, 3, 3, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.text(card.title, xPos + cardWidth/2, yPos + 10, { align: 'center' });
    
    pdf.setFontSize(16);
    pdf.text(card.value, xPos + cardWidth/2, yPos + 20, { align: 'center' });
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text(card.detail, xPos + cardWidth/2, yPos + 28, { align: 'center' });
  });
  
  yPos += 45;
  
  // SECCIÓN 3: Cálculo detallado del ROI
  pdf.setFillColor(...styles.colors.lightGray);
  pdf.roundedRect(20, yPos, pageWidth - 40, 50, 3, 3, 'F');
  
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.setTextColor(...styles.colors.primary);
  pdf.text('DESGLOSE DEL RETORNO DE INVERSIÓN', 25, yPos + 10);
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(...styles.colors.black);
  
  const roiBreakdown = [
    'Ahorro en horas laborales: 20-30 hrs/semana × $30/hr = $24,000-36,000/año',
    'Incremento en capacidad sin contratar: Equivalente a 2-3 empleados = $100,000-150,000/año',
    'Reducción de errores y reprocesos: 70-80% menos errores = $20,000-30,000/año',
    'Mejora en conversión de ventas: 20-30% más conversión = $50,000-100,000/año'
  ];
  
  let tempY = yPos + 18;
  roiBreakdown.forEach(item => {
    pdf.text(`• ${item}`, 30, tempY);
    tempY += 7;
  });
  
  yPos += 60;
  
  // SECCIÓN 4: Beneficios intangibles
  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('BENEFICIOS INTANGIBLES', 20, yPos);
  
  yPos += 10;
  
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
  pdf.setTextColor(...styles.colors.black);
  
  benefits.forEach(benefit => {
    pdf.setFillColor(...styles.colors.success);
    pdf.circle(25, yPos - 1, 2, 'F');
    pdf.setTextColor(...styles.colors.black);
    pdf.text(benefit, 30, yPos);
    yPos += 7;
  });
  
  // SECCIÓN 5: Garantía de resultados
  if (yPos < pageHeight - 40) {
    yPos += 10;
    
    pdf.setFillColor(220, 252, 231);
    pdf.setDrawColor(...styles.colors.success);
    pdf.setLineWidth(2);
    pdf.roundedRect(20, yPos, pageWidth - 40, 25, 3, 3, 'FD');
    
    pdf.setTextColor(...styles.colors.success);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text('GARANTÍA DE RESULTADOS IMPULSA LAB', pageWidth/2, yPos + 8, { align: 'center' });
    
    pdf.setTextColor(...styles.colors.black);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('Si no alcanzas al menos 50% del ROI proyectado en 6 meses,', pageWidth/2, yPos + 15, { align: 'center' });
    pdf.text('te proporcionamos consultoría adicional sin costo hasta lograrlo.', pageWidth/2, yPos + 20, { align: 'center' });
  }
  
  // Número de página
  pdf.setFontSize(9);
  pdf.setTextColor(...styles.colors.gray);
  pdf.text('Página 6 de 7', pageWidth - 20, pageHeight - 10, { align: 'right' });
}
