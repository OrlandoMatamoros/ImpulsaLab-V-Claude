import { Question } from '@/types/questions';

export const questionBank = {
  finance: {
    basic: [
      {
        id: 'fin-b-1',
        text: '¿Con qué frecuencia revisas los números de tu negocio?',
        helpText: 'Incluye revisión de ventas, gastos y utilidades',
        type: 'multiple-choice' as const,
        weight: 2.0,
        category: 'critical' as const,
        maturityLevel: 'basic' as const,
        options: [
          { value: 'daily-automated', label: 'Diariamente con dashboard automatizado', score: 95 },
          { value: 'weekly', label: 'Semanalmente con reportes', score: 80 },
          { value: 'monthly', label: 'Mensualmente', score: 60 },
          { value: 'quarterly', label: 'Trimestralmente', score: 40 },
          { value: 'yearly', label: 'Anualmente o menos', score: 20 }
        ]
      },
      {
        id: 'fin-b-2',
        text: '¿Conoces el margen de ganancia de cada producto/servicio que ofreces?',
        type: 'multiple-choice' as const,
        weight: 1.8,
        category: 'critical' as const,
        maturityLevel: 'basic' as const,
        options: [
          { value: 'none', label: 'No lo conozco', score: 10 },
          { value: 'approx', label: 'Tengo una idea aproximada', score: 40 },
          { value: 'some', label: 'Lo sé para mis productos principales', score: 70 },
          { value: 'all', label: 'Lo tengo calculado para todo mi catálogo', score: 95 }
        ]
      },
      {
        id: 'fin-b-3',
        text: '¿Tienes separadas las finanzas personales de las del negocio?',
        type: 'multiple-choice' as const,
        weight: 1.5,
        category: 'important' as const,
        maturityLevel: 'basic' as const,
        options: [
          { value: 'no', label: 'No, están mezcladas', score: 15 },
          { value: 'partial', label: 'Parcialmente separadas', score: 50 },
          { value: 'yes', label: 'Sí, completamente separadas', score: 95 }
        ]
      },
      {
        id: 'fin-b-4',
        text: '¿Cuántos meses podrías operar si mañana se detuvieran todas tus ventas?',
        helpText: 'Cash runway o colchón financiero',
        type: 'multiple-choice' as const,
        weight: 1.8,
        category: 'critical' as const,
        maturityLevel: 'basic' as const,
        options: [
          { value: 'none', label: 'Menos de 1 mes', score: 10 },
          { value: '1-2', label: '1-2 meses', score: 30 },
          { value: '3-6', label: '3-6 meses', score: 60 },
          { value: '6-12', label: '6-12 meses', score: 85 },
          { value: '12+', label: 'Más de 1 año', score: 100 }
        ]
      },
      {
        id: 'fin-b-5',
        text: '¿Qué herramientas utilizas para gestionar tus finanzas?',
        type: 'multiple-choice' as const,
        weight: 1.2,
        category: 'important' as const,
        maturityLevel: 'basic' as const,
        options: [
          { value: 'paper', label: 'Papel o notas', score: 15 },
          { value: 'excel-basic', label: 'Excel básico', score: 40 },
          { value: 'excel-advanced', label: 'Excel con fórmulas avanzadas', score: 65 },
          { value: 'software', label: 'Software especializado', score: 85 },
          { value: 'erp', label: 'Sistema ERP integrado', score: 100 }
        ]
      }
    ],
    intermediate: [],
    advanced: []
  },
  operations: {
    basic: [
      {
        id: 'ops-b-1',
        text: '¿Cuántas horas a la semana dedicas a tareas repetitivas?',
        helpText: 'Tareas que haces una y otra vez de la misma manera',
        type: 'multiple-choice' as const,
        weight: 2.0,
        category: 'critical' as const,
        maturityLevel: 'basic' as const,
        options: [
          { value: '0-2', label: '0-2 horas', score: 95 },
          { value: '3-5', label: '3-5 horas', score: 75 },
          { value: '6-10', label: '6-10 horas', score: 55 },
          { value: '11-20', label: '11-20 horas', score: 35 },
          { value: '20+', label: 'Más de 20 horas', score: 15 }
        ]
      },
      {
        id: 'ops-b-2',
        text: '¿Cómo gestionas las citas con clientes?',
        type: 'multiple-choice' as const,
        weight: 1.5,
        category: 'important' as const,
        maturityLevel: 'basic' as const,
        options: [
          { value: 'phone', label: 'Por teléfono/WhatsApp manual', score: 20 },
          { value: 'email', label: 'Por email ida y vuelta', score: 40 },
          { value: 'calendar', label: 'Calendario compartido', score: 60 },
          { value: 'booking', label: 'Sistema de reservas online', score: 80 },
          { value: 'automated', label: 'Totalmente automatizado', score: 95 }
        ]
      },
      {
        id: 'ops-b-3',
        text: '¿Tienes documentados los procesos clave de tu negocio?',
        type: 'multiple-choice' as const,
        weight: 1.6,
        category: 'critical' as const,
        maturityLevel: 'basic' as const,
        options: [
          { value: 'none', label: 'No, todo está en mi cabeza', score: 10 },
          { value: 'some', label: 'Algunos procesos básicos', score: 35 },
          { value: 'most', label: 'La mayoría documentados', score: 65 },
          { value: 'all', label: 'Todos con procedimientos detallados', score: 85 },
          { value: 'digital', label: 'Sistema digital con videos', score: 100 }
        ]
      },
      {
        id: 'ops-b-4',
        text: '¿Cómo manejas el inventario de tu negocio?',
        type: 'multiple-choice' as const,
        weight: 1.4,
        category: 'important' as const,
        maturityLevel: 'basic' as const,
        options: [
          { value: 'mental', label: 'Control mental', score: 15 },
          { value: 'paper', label: 'Registros en papel', score: 30 },
          { value: 'excel', label: 'Excel actualizado manualmente', score: 50 },
          { value: 'software', label: 'Software especializado', score: 75 },
          { value: 'automated', label: 'Sistema automatizado con alertas', score: 95 }
        ]
      },
      {
        id: 'ops-b-5',
        text: '¿Cuánto tiempo te toma generar un reporte de desempeño?',
        type: 'multiple-choice' as const,
        weight: 1.3,
        category: 'important' as const,
        maturityLevel: 'basic' as const,
        options: [
          { value: 'instant', label: 'Es instantáneo', score: 100 },
          { value: '30min', label: 'Menos de 30 minutos', score: 80 },
          { value: '2hours', label: 'Unas 2 horas', score: 60 },
          { value: '4hours', label: 'Medio día', score: 40 },
          { value: 'day', label: 'Un día completo o más', score: 20 }
        ]
      }
    ],
    intermediate: [],
    advanced: []
  },
  marketing: {
    basic: [
      {
        id: 'mkt-b-1',
        text: '¿Los clientes te encuentran fácilmente en Google?',
        type: 'multiple-choice' as const,
        weight: 2.0,
        category: 'critical' as const,
        maturityLevel: 'basic' as const,
        options: [
          { value: 'no-website', label: 'No tengo sitio web', score: 10 },
          { value: 'unsure', label: 'No estoy seguro', score: 30 },
          { value: 'sometimes', label: 'A veces aparezco', score: 50 },
          { value: 'usually', label: 'Usualmente en primera página', score: 75 },
          { value: 'always', label: 'Siempre en los primeros resultados', score: 95 }
        ]
      },
      {
        id: 'mkt-b-2',
        text: '¿Con qué frecuencia publicas en redes sociales?',
        type: 'multiple-choice' as const,
        weight: 1.5,
        category: 'important' as const,
        maturityLevel: 'basic' as const,
        options: [
          { value: 'never', label: 'Nunca o casi nunca', score: 15 },
          { value: 'sporadic', label: 'Cuando me acuerdo', score: 35 },
          { value: 'weekly', label: '1-2 veces por semana', score: 55 },
          { value: 'daily', label: 'Diariamente', score: 75 },
          { value: 'multiple', label: 'Varias veces al día con estrategia', score: 95 }
        ]
      },
      {
        id: 'mkt-b-3',
        text: '¿Conoces quién es tu cliente ideal?',
        type: 'multiple-choice' as const,
        weight: 1.8,
        category: 'critical' as const,
        maturityLevel: 'basic' as const,
        options: [
          { value: 'no-idea', label: 'No lo tengo claro', score: 15 },
          { value: 'basic', label: 'Idea general', score: 40 },
          { value: 'defined', label: 'Perfil básico definido', score: 65 },
          { value: 'detailed', label: 'Buyer persona detallado', score: 85 },
          { value: 'data-driven', label: 'Múltiples personas basadas en datos', score: 100 }
        ]
      },
      {
        id: 'mkt-b-4',
        text: '¿Cómo captas nuevos clientes?',
        type: 'multiple-choice' as const,
        weight: 1.6,
        category: 'critical' as const,
        maturityLevel: 'basic' as const,
        options: [
          { value: 'referrals', label: 'Solo por recomendaciones', score: 25 },
          { value: 'basic-ads', label: 'Algo de publicidad básica', score: 45 },
          { value: 'multi-channel', label: 'Varios canales sin integrar', score: 65 },
          { value: 'integrated', label: 'Estrategia multicanal integrada', score: 85 },
          { value: 'omnichannel', label: 'Omnicanal con automatización', score: 100 }
        ]
      },
      {
        id: 'mkt-b-5',
        text: '¿Mides el retorno de tu inversión en marketing?',
        type: 'multiple-choice' as const,
        weight: 1.4,
        category: 'important' as const,
        maturityLevel: 'basic' as const,
        options: [
          { value: 'no', label: 'No mido ROI', score: 20 },
          { value: 'guess', label: 'Tengo una idea aproximada', score: 45 },
          { value: 'basic', label: 'Medición básica', score: 65 },
          { value: 'detailed', label: 'Métricas detalladas', score: 85 },
          { value: 'advanced', label: 'Analytics avanzado con atribución', score: 100 }
        ]
      }
    ],
    intermediate: [],
    advanced: []
  }
};

export function selectAdaptiveQuestions(
  axis: 'finance' | 'operations' | 'marketing',
  preAssessmentScore: number,
  numberOfQuestions: number = 5
): Question[] {
  // Por ahora retornamos las preguntas básicas disponibles
  const questions = questionBank[axis].basic;
  return questions.slice(0, numberOfQuestions);
}