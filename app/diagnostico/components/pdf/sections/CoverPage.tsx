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
  
  // Fondo degradado azul corporativo
  pdf.setFillColor(...styles.colors.primary);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Marco decorativo doble
  pdf.setDrawColor(255, 255, 255);
  pdf.setLineWidth(3);
  pdf.rect(15, 15, pageWidth - 30, pageHeight - 30);
  pdf.setLineWidth(1);
  pdf.rect(18, 18, pageWidth - 36, pageHeight - 36);
  
  // LOGO SECTION - Isotipo + Logo solo texto
  try {
    // Isotipo centrado
    pdf.addImage('/images/isotipo.jpg', 'JPEG', pageWidth/2 - 25, 35, 50, 50);
    // Logo solo texto debajo del isotipo
    pdf.addImage('/images/logo solo texto.jpg', 'JPEG', pageWidth/2 - 40, 88, 80, 20);
  } catch (error) {
    // Fallback si no cargan las imágenes
    console.error('Error cargando logos:', error);
    
    // Área blanca para el logo fallback
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(pageWidth/2 - 40, 35, 80, 30, 5, 5, 'F');
    
    pdf.setTextColor(...styles.colors.primary);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('IMPULSA', pageWidth/2, 47, { align: 'center' });
    pdf.setFontSize(20);
    pdf.text('LAB', pageWidth/2, 47, { align: 'center' });
  }
  
  // Título principal - DIAGNÓSTICO 3D
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(36);
  pdf.setFont('helvetica', 'bold');
  pdf.text('DIAGNÓSTICO 3D', pageWidth/2, 130, { align: 'center' });
  
  // Subtítulo - BUSINESS INTELLIGENCE
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'normal');
  pdf.text('BUSINESS INTELLIGENCE', pageWidth/2, 145, { align: 'center' });
  
  // Línea decorativa doble
  pdf.setDrawColor(255, 255, 255);
  pdf.setLineWidth(2);
  pdf.line(30, 155, pageWidth - 30, 155);
  pdf.setLineWidth(1);
  pdf.line(35, 159, pageWidth - 35, 159);
  
  // INFORMACIÓN DEL CLIENTE - Cuadro con fondo blanco y texto azul
  const companyName = clientInfo?.companyName || clientInfo?.name || 'Tu Empresa';
  const industry = clientInfo?.industry || 'No especificada';
  const contactName = clientInfo?.contactName || '';
  
  // Recuadro blanco con opacidad alta
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(30, 170, pageWidth - 60, 45, 5, 5, 'F');
  
  // Textos en azul corporativo
  pdf.setTextColor(...styles.colors.primary);
  pdf.setFontSize(22);
  pdf.setFont('helvetica', 'bold');
  pdf.text(companyName.toUpperCase(), pageWidth/2, 185, { align: 'center' });
  
  pdf.setFontSize(13);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Industria: ${industry}`, pageWidth/2, 195, { align: 'center' });
  
  if (contactName) {
    pdf.text(`Contacto: ${contactName}`, pageWidth/2, 205, { align: 'center' });
  }
  
  // SCORE GLOBAL - Círculo mejorado
  const averageScore = Math.round((scores.finance + scores.operations + scores.marketing) / 3);
  
  // Círculo blanco de fondo
  pdf.setFillColor(255, 255, 255);
  pdf.circle(pageWidth/2, 240, 35, 'F');
  
  // Color del anillo según score
  const scoreColor = averageScore >= 70 ? styles.colors.success : 
                    averageScore >= 40 ? styles.colors.warning : 
                    styles.colors.danger;
  
  // Anillo de color
  pdf.setDrawColor(...scoreColor);
  pdf.setLineWidth(4);
  pdf.circle(pageWidth/2, 240, 33, 'S');
  
  // Número del score centrado
  pdf.setTextColor(...styles.colors.primary);
  pdf.setFontSize(42);
  pdf.setFont('helvetica', 'bold');
  pdf.text(averageScore.toString(), pageWidth/2, 248, { align: 'center' });
  
  // "/100" dentro del círculo, más pequeño y abajo
  pdf.setFontSize(12);
  pdf.setTextColor(...styles.colors.gray);
  pdf.text('/100', pageWidth/2, 258, { align: 'center' });
  
  // PUNTUACIÓN Y ETAPA en la misma línea
  const stage = averageScore >= 70 ? 'EXPANSIÓN' : 
                averageScore >= 40 ? 'CRECIMIENTO' : 
                'SUPERVIVENCIA';
  
  // Textos alineados horizontalmente
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  
  // "PUNTUACIÓN GLOBAL" a la izquierda
  pdf.text('PUNTUACIÓN GLOBAL', pageWidth/2 - 50, 285, { align: 'center' });
  
  // Badge de etapa a la derecha
  pdf.setFillColor(...scoreColor);
  pdf.roundedRect(pageWidth/2 + 10, 275, 80, 18, 8, 8, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(13);
  pdf.setFont('helvetica', 'bold');
  pdf.text(stage, pageWidth/2 + 50, 285, { align: 'center' });
  
  // FOOTER MEJORADO - Más espacio y mejor distribución
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Fecha de generación
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generado el ${currentDate}`, pageWidth/2, pageHeight - 35, { align: 'center' });
  
  // Línea separadora sutil
  pdf.setDrawColor(255, 255, 255, 100);
  pdf.setLineWidth(0.5);
  pdf.line(40, pageHeight - 28, pageWidth - 40, pageHeight - 28);
  
  // Información de contacto
  pdf.setFontSize(10);
  pdf.setTextColor(255, 255, 255);
  
  // Website
  pdf.text('www.tuimpulsalab.com', pageWidth/2 - 60, pageHeight - 20, { align: 'center' });
  
  // Separador vertical
  pdf.text('|', pageWidth/2, pageHeight - 20, { align: 'center' });
  
  // Email
  pdf.text('contacto@tuimpulsalab.com', pageWidth/2 + 60, pageHeight - 20, { align: 'center' });
  
  // Teléfono centrado abajo
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text('+1 929 500-1850', pageWidth/2, pageHeight - 10, { align: 'center' });
}