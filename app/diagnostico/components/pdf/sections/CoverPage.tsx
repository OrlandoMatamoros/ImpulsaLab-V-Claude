// app/diagnostico/components/pdf/sections/CoverPage.tsx
import jsPDF from 'jspdf';
import { PDFStyles } from '../utils/pdfStyles';

export async function generateCoverPage(
  pdf: jsPDF,
  clientInfo: any,
  scores: any,
  styles: typeof PDFStyles
) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Fondo degradado (simulado con rectángulos)
  // Ensure primary is an array of numbers [r, g, b]
  if (Array.isArray(styles.colors.primary)) {
    pdf.setFillColor(...(styles.colors.primary as [number, number, number]));
  } else if (typeof styles.colors.primary === 'string') {
    // If it's a hex string, convert to RGB
    const hex = (styles.colors.primary as string).replace('#', '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    pdf.setFillColor(r, g, b);
  } else {
    // Fallback to black
    pdf.setFillColor(0, 0, 0);
  }
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Marco decorativo
  pdf.setDrawColor(255, 255, 255);
  pdf.setLineWidth(3);
  pdf.rect(15, 15, pageWidth - 30, pageHeight - 30);
  pdf.setLineWidth(1);
  pdf.rect(18, 18, pageWidth - 36, pageHeight - 36);
  
  // Logo Impulsa Lab
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(pageWidth/2 - 40, 30, 80, 30, 5, 5, 'F');

  // Ensure styles.colors.primary is an array of numbers for setTextColor
  let primaryColor: [number, number, number];
  if (Array.isArray(styles.colors.primary)) {
    primaryColor = styles.colors.primary as [number, number, number];
  } else if (typeof styles.colors.primary === 'string') {
    const colorStr: string = styles.colors.primary as string;
    const hex = colorStr.replace('#', '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    primaryColor = [r, g, b];
  } else {
    primaryColor = [0, 0, 0];
  }

  pdf.setTextColor(...primaryColor);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('IMPULSA', pageWidth/2, 42, { align: 'center' });
  pdf.setFontSize(20);
  pdf.text('LAB', pageWidth/2, 52, { align: 'center' });
  
  // Título principal
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(36);
  pdf.text('DIAGNÓSTICO 3D', pageWidth/2, 90, { align: 'center' });
  
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'normal');
  pdf.text('BUSINESS INTELLIGENCE', pageWidth/2, 105, { align: 'center' });
  
  // Línea decorativa
  pdf.setDrawColor(255, 255, 255);
  pdf.setLineWidth(2);
  pdf.line(30, 115, pageWidth - 30, 115);
  
  // Información del cliente
  const companyName = clientInfo?.companyName || clientInfo?.name || 'Tu Empresa';
  const industry = clientInfo?.industry || 'No especificada';
  
  pdf.setFillColor(255, 255, 255, 0.1);
  pdf.roundedRect(30, 130, pageWidth - 60, 50, 5, 5, 'F');
  
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text(companyName.toUpperCase(), pageWidth/2, 145, { align: 'center' });
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Industria: ${industry}`, pageWidth/2, 160, { align: 'center' });
  
  if (clientInfo?.contactName) {
    pdf.text(`Contacto: ${clientInfo.contactName}`, pageWidth/2, 170, { align: 'center' });
  }
  
  // Score Global
  const averageScore = Math.round((scores.finance + scores.operations + scores.marketing) / 3);
  
  // Círculo para el score
  pdf.setFillColor(255, 255, 255);
  pdf.circle(pageWidth/2, 210, 35, 'F');
  
  // Score color según valor
  let scoreColor: [number, number, number];
  const rawScoreColor: string | [number, number, number] =
    (averageScore >= 70
      ? styles.colors.success
      : averageScore >= 40
      ? styles.colors.warning
      : styles.colors.danger) as string | [number, number, number];
  if (Array.isArray(rawScoreColor)) {
    scoreColor = rawScoreColor as [number, number, number];
  } else if (typeof rawScoreColor === 'string') {
    const hex = rawScoreColor.replace('#', '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    scoreColor = [r, g, b];
  } else {
    scoreColor = [0, 0, 0];
  }

  pdf.setDrawColor(...scoreColor);
  pdf.setLineWidth(4);
  pdf.circle(pageWidth/2, 210, 33, 'S');
  
  // Número del score
  pdf.setTextColor(...primaryColor);
  pdf.setFontSize(48);
  pdf.setFont('helvetica', 'bold');
  pdf.text(averageScore.toString(), pageWidth/2, 220, { align: 'center' });
  
  pdf.setFontSize(14);
  pdf.setTextColor(100, 100, 100);
  pdf.text('/100', pageWidth/2 + 25, 215);
  
  // Etiqueta del score
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('PUNTUACIÓN GLOBAL', pageWidth/2, 255, { align: 'center' });
  
  // Estado del negocio
  const stage = averageScore >= 70 ? 'EXPANSIÓN' : 
                averageScore >= 40 ? 'CRECIMIENTO' : 
                'SUPERVIVENCIA';
  
  pdf.setFillColor(...scoreColor);
  pdf.roundedRect(pageWidth/2 - 40, 265, 80, 20, 8, 8, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.text(stage, pageWidth/2, 277, { align: 'center' });
  
  // Footer
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  pdf.setTextColor(255, 255, 255, 180);
  pdf.setFontSize(10);
  pdf.text(`Generado el ${currentDate}`, pageWidth/2, pageHeight - 20, { align: 'center' });
  
  pdf.setFontSize(9);
  pdf.text('www.tuimpulsalab.com | contacto@tuimpulsalab.com | +1 929 500-1850', pageWidth/2, pageHeight - 10, { align: 'center' });
}