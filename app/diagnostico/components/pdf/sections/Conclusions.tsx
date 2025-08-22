// app/diagnostico/components/pdf/sections/Conclusions.tsx
import jsPDF from 'jspdf';
import { PDFStyles } from '../utils/pdfStyles';

export async function generateConclusions(
  pdf: jsPDF,
  scores: any,
  clientInfo: any,
  userData: any,
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
  pdf.text('CONCLUSIONES Y PRÓXIMOS PASOS', 20, 22);
  
  let yPos = 50;
  
  // Calcular datos para personalización
  const averageScore = Math.round((scores.finance + scores.operations + scores.marketing) / 3);
  const companyName = clientInfo?.companyName || clientInfo?.name || 'Tu Empresa';
  const industryName = clientInfo?.industry || 'tu industria';
  
  const businessStage = averageScore >= 70 ? 'Expansión' : 
                        averageScore >= 40 ? 'Crecimiento' : 
                        'Supervivencia';
  
  const weakestAxis = Object.entries(scores).reduce(
    (min, [key, value]) =>
      (typeof value === 'number' && value < min.value) ? { key, value } : min,
    { key: 'finance', value: scores.finance as number }
  );
  
  const strongestAxis = Object.entries(scores).reduce(
    (max, [key, value]) =>
      (typeof value === 'number' && value > max.value) ? { key, value } : max,
    { key: 'finance', value: scores.finance as number }
  );
  
  const weakAxis = weakestAxis.key === 'finance' ? 'Finanzas' : 
                   weakestAxis.key === 'operations' ? 'Operaciones' : 'Marketing';
  
  const strongAxis = strongestAxis.key === 'finance' ? 'Finanzas' : 
                     strongestAxis.key === 'operations' ? 'Operaciones' : 'Marketing';
  
  // SECCIÓN 1: Resumen ejecutivo final
  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('RESUMEN DE TU SITUACIÓN ACTUAL', 20, yPos);
  
  yPos += 12;
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.black);
  
  const summaryText = `${companyName} ha completado el Diagnóstico 3D Impulsa obteniendo una puntuación global de ${averageScore}/100, ubicándose en la etapa de "${businessStage}". El análisis revela fortalezas notables en ${strongAxis} (${strongestAxis.value} puntos) y oportunidades significativas de mejora en ${weakAxis} (${weakestAxis.value} puntos).`;
  
  const lines1 = pdf.splitTextToSize(summaryText, pageWidth - 50);
  lines1.forEach((line: string) => {
    pdf.text(line, 25, yPos);
    yPos += 6;
  });
  
  yPos += 10;
  
  // SECCIÓN 2: Potencial de crecimiento
  pdf.setFillColor(...styles.colors.success);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('TU POTENCIAL DE CRECIMIENTO', 20, yPos);
  
  yPos += 12;
  
  const totalPotential = Math.round(((100 - scores.finance) + (100 - scores.operations) + (100 - scores.marketing)) / 3);
  
  pdf.setFillColor(220, 252, 231);
  pdf.roundedRect(20, yPos, pageWidth - 40, 60, 3, 3, 'F');
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.black);
  
  const potentialText = `El análisis revela un potencial de mejora del ${totalPotential}% promedio. Con las estrategias correctas y el acompañamiento experto, ${companyName} puede lograr:`;
  
  const lines2 = pdf.splitTextToSize(potentialText, pageWidth - 50);
  let tempY = yPos + 8;
  lines2.forEach((line: string) => {
    pdf.text(line, 25, tempY);
    tempY += 6;
  });
  
  tempY += 3;
  
  const achievements = [
    '• Incremento del 35-50% en eficiencia operativa',
    '• Reducción del 40-60% en costos operativos',
    '• Aumento del 200-300% en capacidad sin contratar',
    '• ROI del 250-350% en el primer año'
  ];
  
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...styles.colors.success);
  achievements.forEach(achievement => {
    pdf.text(achievement, 30, tempY);
    tempY += 6;
  });
  
  yPos += 70;
  
  // SECCIÓN 3: Recomendación estratégica
  pdf.setFillColor(220, 38, 127);
  pdf.rect(15, yPos - 8, pageWidth - 30, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('RECOMENDACIÓN ESTRATÉGICA', 20, yPos);
  
  yPos += 12;
  
  pdf.setFillColor(255, 239, 239);
  pdf.roundedRect(20, yPos, pageWidth - 40, 35, 3, 3, 'F');
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  pdf.setTextColor(...styles.colors.black);
  
  const recommendationText = `Basado en el diagnóstico integral, la recomendación prioritaria es iniciar inmediatamente con la transformación de ${weakAxis}. Esta intervención estratégica abordará el cuello de botella principal que limita tu crecimiento y generará el mayor impacto en el menor tiempo posible.`;
  
  const lines3 = pdf.splitTextToSize(recommendationText, pageWidth - 50);
  tempY = yPos + 8;
  lines3.forEach((line: string) => {
    pdf.text(line, 25, tempY);
    tempY += 6;
  });
  
  yPos += 45;
  
  // SECCIÓN 4: Call to Action principal
  pdf.setFillColor(0, 123, 255);
  pdf.roundedRect(20, yPos, pageWidth - 40, 35, 5, 5, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.text('TU PRÓXIMO PASO', pageWidth/2, yPos + 12, { align: 'center' });
  
  pdf.setFontSize(13);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Agenda tu sesión estratégica GRATUITA de 30 minutos', pageWidth/2, yPos + 22, { align: 'center' });
  pdf.text('para diseñar tu plan de implementación personalizado', pageWidth/2, yPos + 28, { align: 'center' });
  
  yPos += 45;
  
  // SECCIÓN 5: Beneficios de la sesión
  pdf.setFillColor(245, 245, 245);
  pdf.roundedRect(20, yPos, pageWidth - 40, 45, 3, 3, 'F');
  
  pdf.setTextColor(...styles.colors.black);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.text('En tu sesión estratégica gratuita recibirás:', 25, yPos + 8);
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  const sessionBenefits = [
    '• Análisis detallado de tus resultados con un experto',
    '• Plan de acción personalizado para tu situación',
    '• Identificación de 3-5 quick wins inmediatos',
    '• Estimación de ROI y timeline específico',
    '• Acceso a herramientas y recursos exclusivos'
  ];
  
  let benefitY = yPos + 16;
  sessionBenefits.forEach(benefit => {
    pdf.text(benefit, 30, benefitY);
    benefitY += 6;
  });
  
  // Footer profesional
  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(0, pageHeight - 35, pageWidth, 35, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.text('IMPULSA LAB', 20, pageHeight - 25);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Business Intelligence & Digital Transformation', 20, pageHeight - 20);
  
  pdf.setFontSize(9);
  pdf.text('Este diagnóstico es confidencial y propiedad de tu organización', 20, pageHeight - 13);
  
  const currentDate = new Date().toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  pdf.text(`Validez: hasta ${validUntil}`, 20, pageHeight - 8);
  
  // Información de contacto
  pdf.setFont('helvetica', 'bold');
  pdf.text('Contacto Directo:', pageWidth - 80, pageHeight - 25);
  pdf.setFont('helvetica', 'normal');
  pdf.text('contacto@tuimpulsalab.com', pageWidth - 80, pageHeight - 20);
  pdf.text('+1 347 904 3169', pageWidth - 80, pageHeight - 15);
  pdf.text('www.tuimpulsalab.com', pageWidth - 80, pageHeight - 10);
  
  // Agregar código QR o link si el usuario puede descargar
  if (userData && ['client', 'consultant', 'admin'].includes(userData.role)) {
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(8);
    pdf.text(`Generado por: ${userData.email || 'Usuario autorizado'}`, pageWidth/2, pageHeight - 3, { align: 'center' });
  }
  
  // Número de página final
  pdf.setFontSize(9);
  pdf.setTextColor(255, 255, 255, 200);
  pdf.text('Página 7 de 7', pageWidth - 20, pageHeight - 3, { align: 'right' });
}