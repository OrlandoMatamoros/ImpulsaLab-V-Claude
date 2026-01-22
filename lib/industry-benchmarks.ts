/**
 * Industry Benchmarks for Diagnostic Scoring
 *
 * Provides industry-specific score thresholds and comparison logic
 * to deliver contextualized, credible diagnostic results.
 */

export type IndustryType =
  | 'Tecnología'
  | 'Retail'
  | 'Servicios'
  | 'Manufactura'
  | 'Salud'
  | 'Educación'
  | 'Alimentos'
  | 'Construcción'
  | 'Turismo'
  | 'Otro';

export type AxisType = 'finance' | 'operations' | 'marketing';

export type PerformanceLevel = 'excellent' | 'good' | 'average' | 'below_average' | 'poor';

interface BenchmarkThresholds {
  excellent: number;  // Top 20% of industry
  good: number;       // Top 40% of industry
  average: number;    // Top 60% of industry
  below_average: number; // Top 80% of industry
  // Below this = poor
}

interface IndustryBenchmark {
  finance: BenchmarkThresholds;
  operations: BenchmarkThresholds;
  marketing: BenchmarkThresholds;
  description: string;
}

/**
 * Industry-specific benchmark thresholds
 * Based on typical performance patterns in each sector
 */
export const industryBenchmarks: Record<IndustryType, IndustryBenchmark> = {
  'Tecnología': {
    finance: { excellent: 85, good: 72, average: 60, below_average: 48 },
    operations: { excellent: 88, good: 75, average: 62, below_average: 50 },
    marketing: { excellent: 90, good: 78, average: 65, below_average: 52 },
    description: 'Sector altamente competitivo con énfasis en innovación y crecimiento rápido'
  },

  'Retail': {
    finance: { excellent: 78, good: 65, average: 52, below_average: 40 },
    operations: { excellent: 85, good: 72, average: 60, below_average: 48 },
    marketing: { excellent: 88, good: 75, average: 62, below_average: 50 },
    description: 'Sector con márgenes ajustados que requiere excelencia operacional y marketing efectivo'
  },

  'Servicios': {
    finance: { excellent: 80, good: 68, average: 55, below_average: 43 },
    operations: { excellent: 82, good: 70, average: 58, below_average: 46 },
    marketing: { excellent: 86, good: 73, average: 60, below_average: 48 },
    description: 'Sector basado en relaciones donde la reputación y eficiencia son clave'
  },

  'Manufactura': {
    finance: { excellent: 82, good: 70, average: 58, below_average: 46 },
    operations: { excellent: 90, good: 78, average: 66, below_average: 54 },
    marketing: { excellent: 75, good: 62, average: 50, below_average: 38 },
    description: 'Sector con alta inversión en activos que prioriza eficiencia operacional'
  },

  'Salud': {
    finance: { excellent: 84, good: 72, average: 60, below_average: 48 },
    operations: { excellent: 88, good: 76, average: 64, below_average: 52 },
    marketing: { excellent: 78, good: 65, average: 52, below_average: 40 },
    description: 'Sector regulado que requiere excelencia operacional y gestión financiera sólida'
  },

  'Educación': {
    finance: { excellent: 76, good: 63, average: 50, below_average: 38 },
    operations: { excellent: 80, good: 68, average: 56, below_average: 44 },
    marketing: { excellent: 82, good: 70, average: 58, below_average: 46 },
    description: 'Sector enfocado en calidad de servicio con creciente necesidad de marketing digital'
  },

  'Alimentos': {
    finance: { excellent: 80, good: 68, average: 56, below_average: 44 },
    operations: { excellent: 88, good: 76, average: 64, below_average: 52 },
    marketing: { excellent: 85, good: 72, average: 60, below_average: 48 },
    description: 'Sector con márgenes ajustados que requiere control estricto y buena presencia de marca'
  },

  'Construcción': {
    finance: { excellent: 78, good: 66, average: 54, below_average: 42 },
    operations: { excellent: 86, good: 74, average: 62, below_average: 50 },
    marketing: { excellent: 72, good: 60, average: 48, below_average: 36 },
    description: 'Sector intensivo en capital con ciclos largos que requiere gestión de flujo de efectivo'
  },

  'Turismo': {
    finance: { excellent: 76, good: 64, average: 52, below_average: 40 },
    operations: { excellent: 84, good: 72, average: 60, below_average: 48 },
    marketing: { excellent: 90, good: 78, average: 66, below_average: 54 },
    description: 'Sector estacional con alta dependencia en experiencia del cliente y marketing'
  },

  'Otro': {
    finance: { excellent: 80, good: 68, average: 56, below_average: 44 },
    operations: { excellent: 82, good: 70, average: 58, below_average: 46 },
    marketing: { excellent: 82, good: 70, average: 58, below_average: 46 },
    description: 'Benchmarks generales aplicables a diversos sectores'
  },
};

/**
 * Get performance level based on score and industry benchmark
 */
export function getPerformanceLevel(
  score: number,
  axis: AxisType,
  industry: IndustryType
): PerformanceLevel {
  const benchmark = industryBenchmarks[industry]?.[axis];

  if (!benchmark) {
    // Fallback to 'Otro' if industry not found
    return getPerformanceLevel(score, axis, 'Otro');
  }

  if (score >= benchmark.excellent) return 'excellent';
  if (score >= benchmark.good) return 'good';
  if (score >= benchmark.average) return 'average';
  if (score >= benchmark.below_average) return 'below_average';
  return 'poor';
}

/**
 * Get industry-contextualized comparison message
 */
export function getIndustryComparison(
  score: number,
  axis: AxisType,
  industry: IndustryType
): string {
  const level = getPerformanceLevel(score, axis, industry);
  const axisName = getAxisName(axis);

  const messages: Record<PerformanceLevel, string> = {
    excellent: `🌟 Excelente para ${industry} - Estás en el top 20% de tu industria en ${axisName}`,
    good: `✅ Por encima del promedio - Tu desempeño en ${axisName} supera al 60% de empresas en ${industry}`,
    average: `📊 En el promedio de ${industry} - Hay oportunidad de mejorar en ${axisName}`,
    below_average: `⚠️ Por debajo del promedio - ${axisName} requiere atención en comparación con otras empresas de ${industry}`,
    poor: `🚨 Requiere atención inmediata - Tu ${axisName} está significativamente por debajo del estándar de ${industry}`,
  };

  return messages[level];
}

/**
 * Get detailed industry-specific recommendations
 */
export function getIndustryRecommendations(
  scores: { finance: number; operations: number; marketing: number },
  industry: IndustryType
): string[] {
  const recommendations: string[] = [];
  const benchmark = industryBenchmarks[industry];

  // Finance recommendations
  const financeLevel = getPerformanceLevel(scores.finance, 'finance', industry);
  if (financeLevel === 'poor' || financeLevel === 'below_average') {
    recommendations.push(
      `En ${industry}, es crítico tener control financiero estricto. Considera implementar un dashboard financiero en tiempo real y proyecciones de flujo de efectivo.`
    );
  }

  // Operations recommendations
  const operationsLevel = getPerformanceLevel(scores.operations, 'operations', industry);
  if (operationsLevel === 'poor' || operationsLevel === 'below_average') {
    recommendations.push(
      `La eficiencia operacional es clave en ${industry}. Recomendamos automatizar procesos repetitivos y establecer KPIs claros.`
    );
  }

  // Marketing recommendations
  const marketingLevel = getPerformanceLevel(scores.marketing, 'marketing', industry);
  if (marketingLevel === 'poor' || marketingLevel === 'below_average') {
    recommendations.push(
      `En ${industry}, el marketing efectivo es diferenciador. Invierte en presencia digital y estrategias de captación específicas para tu sector.`
    );
  }

  // Industry-specific recommendations
  if (industry === 'Tecnología' && scores.marketing < 70) {
    recommendations.push(
      'Para empresas de tecnología, el marketing de contenido y la presencia en redes profesionales son fundamentales para el crecimiento.'
    );
  }

  if (industry === 'Retail' && scores.operations < 70) {
    recommendations.push(
      'En retail, la experiencia del cliente y la gestión de inventario son críticas. Considera implementar un sistema POS integrado.'
    );
  }

  if (industry === 'Alimentos' && scores.operations < 75) {
    recommendations.push(
      'Para restaurantes y negocios de alimentos, el control de costos de insumos y la eficiencia operacional son vitales para rentabilidad.'
    );
  }

  if (industry === 'Manufactura' && scores.operations < 80) {
    recommendations.push(
      'En manufactura, la optimización de procesos productivos y el control de calidad son esenciales para competitividad.'
    );
  }

  if (industry === 'Servicios' && scores.marketing < 75) {
    recommendations.push(
      'Los servicios profesionales dependen de reputación y referencias. Invierte en testimonios, casos de éxito y marketing de contenido.'
    );
  }

  if (industry === 'Turismo' && scores.marketing < 80) {
    recommendations.push(
      'En turismo y hospitalidad, la presencia en línea y las reseñas positivas son críticas. Optimiza tu presencia en plataformas de reservas.'
    );
  }

  if (industry === 'Construcción' && scores.finance < 75) {
    recommendations.push(
      'En construcción, la gestión de flujo de efectivo entre proyectos es crítica. Implementa facturación por hitos y control de gastos estricto.'
    );
  }

  if (industry === 'Salud' && scores.operations < 80) {
    recommendations.push(
      'En el sector salud, la eficiencia operacional y el cumplimiento regulatorio son fundamentales. Considera software especializado de gestión.'
    );
  }

  if (industry === 'Educación' && scores.marketing < 70) {
    recommendations.push(
      'Para instituciones educativas, el marketing digital y la gestión de reputación son cada vez más importantes para atraer estudiantes.'
    );
  }

  // If no specific recommendations, add a general one
  if (recommendations.length === 0) {
    recommendations.push(
      `Tu desempeño general es sólido para ${industry}. Mantén el enfoque en mejora continua y monitoreo de KPIs.`
    );
  }

  return recommendations;
}

/**
 * Get strength areas (top performing axes)
 */
export function getStrengthAreas(
  scores: { finance: number; operations: number; marketing: number },
  industry: IndustryType
): string[] {
  const strengths: string[] = [];

  if (getPerformanceLevel(scores.finance, 'finance', industry) === 'excellent') {
    strengths.push('💰 Gestión Financiera');
  }
  if (getPerformanceLevel(scores.operations, 'operations', industry) === 'excellent') {
    strengths.push('⚙️ Eficiencia Operacional');
  }
  if (getPerformanceLevel(scores.marketing, 'marketing', industry) === 'excellent') {
    strengths.push('📈 Marketing y Ventas');
  }

  return strengths;
}

/**
 * Get improvement areas (lowest performing axes)
 */
export function getImprovementAreas(
  scores: { finance: number; operations: number; marketing: number },
  industry: IndustryType
): string[] {
  const improvements: string[] = [];

  const financeLevel = getPerformanceLevel(scores.finance, 'finance', industry);
  const operationsLevel = getPerformanceLevel(scores.operations, 'operations', industry);
  const marketingLevel = getPerformanceLevel(scores.marketing, 'marketing', industry);

  if (financeLevel === 'poor' || financeLevel === 'below_average') {
    improvements.push('💰 Gestión Financiera');
  }
  if (operationsLevel === 'poor' || operationsLevel === 'below_average') {
    improvements.push('⚙️ Eficiencia Operacional');
  }
  if (marketingLevel === 'poor' || marketingLevel === 'below_average') {
    improvements.push('📈 Marketing y Ventas');
  }

  return improvements;
}

/**
 * Helper: Get human-readable axis name
 */
function getAxisName(axis: AxisType): string {
  const names: Record<AxisType, string> = {
    finance: 'Finanzas',
    operations: 'Operaciones',
    marketing: 'Marketing',
  };
  return names[axis];
}

/**
 * Get industry description
 */
export function getIndustryDescription(industry: IndustryType): string {
  return industryBenchmarks[industry]?.description || industryBenchmarks['Otro'].description;
}

/**
 * Get benchmark threshold for display (e.g., "Para Tecnología, el promedio es 65/100")
 */
export function getBenchmarkThreshold(
  axis: AxisType,
  industry: IndustryType,
  level: PerformanceLevel = 'average'
): number {
  const benchmark = industryBenchmarks[industry]?.[axis];
  if (!benchmark) return 0;

  switch (level) {
    case 'excellent':
      return benchmark.excellent;
    case 'good':
      return benchmark.good;
    case 'average':
      return benchmark.average;
    case 'below_average':
      return benchmark.below_average;
    default:
      return 0;
  }
}
