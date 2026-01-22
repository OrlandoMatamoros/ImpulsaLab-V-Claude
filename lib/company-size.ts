/**
 * Company Size Classification and Logic
 *
 * Provides size-based segmentation and recommendations
 * based on employee count for contextualized diagnostics.
 */

export type CompanySizeCategory = 'micro' | 'pequeña' | 'mediana' | 'grande';

export interface CompanySizeProfile {
  category: CompanySizeCategory;
  label: string;
  employeeRange: string;
  icon: string;
  description: string;
  typicalChallenges: string[];
  growthPriorities: string[];
  recommendedFocus: {
    finance: string;
    operations: string;
    marketing: string;
  };
}

/**
 * Company size classification thresholds
 * Based on common business size definitions
 */
const SIZE_THRESHOLDS = {
  micro: { min: 1, max: 10 },
  pequeña: { min: 11, max: 50 },
  mediana: { min: 51, max: 250 },
  grande: { min: 251, max: Infinity },
} as const;

/**
 * Detailed profiles for each company size
 */
const SIZE_PROFILES: Record<CompanySizeCategory, CompanySizeProfile> = {
  micro: {
    category: 'micro',
    label: 'Microempresa',
    employeeRange: '1-10 empleados',
    icon: '🌱',
    description: 'Empresa en etapa inicial o modelo de negocio compacto',
    typicalChallenges: [
      'Recursos limitados',
      'Dueño hace múltiples funciones',
      'Falta de procesos formales',
      'Flujo de efectivo ajustado',
      'Poca visibilidad de marca',
    ],
    growthPriorities: [
      'Establecer procesos básicos',
      'Separar finanzas personales y empresariales',
      'Construir presencia digital básica',
      'Automatizar tareas repetitivas',
      'Generar flujo de clientes consistente',
    ],
    recommendedFocus: {
      finance: 'Implementa control básico de ingresos y gastos. Usa herramientas simples como hojas de cálculo o software contable básico. Separa cuentas personales de empresariales.',
      operations: 'Documenta tus procesos clave aunque sean simples. Esto te permitirá delegar y crecer. Enfócate en hacer bien pocas cosas en lugar de muchas mal.',
      marketing: 'Construye presencia digital básica: perfil de Google Business, redes sociales activas, y boca a boca. El marketing personal del dueño es tu mejor activo.',
    },
  },

  pequeña: {
    category: 'pequeña',
    label: 'Pequeña Empresa',
    employeeRange: '11-50 empleados',
    icon: '🌿',
    description: 'Empresa en crecimiento con equipo establecido',
    typicalChallenges: [
      'Transición de startup a empresa formal',
      'Necesidad de estructura organizacional',
      'Delegar responsabilidades',
      'Sistematizar procesos',
      'Competir con empresas más grandes',
    ],
    growthPriorities: [
      'Implementar sistemas de gestión',
      'Definir roles y responsabilidades',
      'Establecer KPIs y métricas',
      'Profesionalizar marketing y ventas',
      'Mejorar eficiencia operacional',
    ],
    recommendedFocus: {
      finance: 'Adopta software de contabilidad profesional. Implementa presupuestos anuales y proyecciones trimestrales. Considera contratar un contador o CFO de medio tiempo.',
      operations: 'Es momento de sistematizar. Implementa un CRM básico, procesos de ventas documentados, y workflows para operaciones repetitivas. Delega responsabilidades claras.',
      marketing: 'Invierte en marketing digital consistente. Define tu propuesta de valor clara, implementa embudos de ventas, y considera publicidad pagada con presupuesto definido.',
    },
  },

  mediana: {
    category: 'mediana',
    label: 'Mediana Empresa',
    employeeRange: '51-250 empleados',
    icon: '🌳',
    description: 'Empresa establecida con operaciones complejas',
    typicalChallenges: [
      'Mantener cultura organizacional',
      'Optimizar múltiples departamentos',
      'Gestión de equipo de líderes',
      'Competitividad en el mercado',
      'Innovación vs. estabilidad',
    ],
    growthPriorities: [
      'Profesionalizar gestión financiera',
      'Implementar tecnología empresarial',
      'Desarrollar liderazgo interno',
      'Expandir mercados o líneas de producto',
      'Optimizar márgenes operacionales',
    ],
    recommendedFocus: {
      finance: 'Requieres CFO de tiempo completo y sistemas ERP. Implementa análisis financiero avanzado, gestión de capital de trabajo, y planeación financiera estratégica a 3-5 años.',
      operations: 'Implementa sistemas ERP integrados. Define procesos para cada departamento con métricas claras. Considera certificaciones de calidad (ISO) si aplica a tu industria.',
      marketing: 'Estructura departamento de marketing profesional. Implementa marketing basado en datos, automation, CRM avanzado, y estrategia multicanal. Considera brand positioning estratégico.',
    },
  },

  grande: {
    category: 'grande',
    label: 'Gran Empresa',
    employeeRange: '250+ empleados',
    icon: '🏢',
    description: 'Corporación con operaciones a escala',
    typicalChallenges: [
      'Mantener agilidad a escala',
      'Gestión de múltiples unidades de negocio',
      'Innovación corporativa',
      'Talento y retención',
      'Expansión geográfica o mercados',
    ],
    growthPriorities: [
      'Optimización y eficiencia a escala',
      'Innovación y transformación digital',
      'Expansión estratégica',
      'Desarrollo de liderazgo',
      'Excelencia operacional',
    ],
    recommendedFocus: {
      finance: 'Requieres equipo financiero completo con análisis avanzado, planeación estratégica, gestión de riesgo, y posiblemente auditorías externas. Considera indicadores financieros avanzados y dashboards ejecutivos.',
      operations: 'Implementa sistemas empresariales de clase mundial (SAP, Oracle, etc.). Enfócate en excelencia operacional, Six Sigma, Lean, y mejora continua institucionalizada.',
      marketing: 'Departamento de marketing robusto con especialistas. Estrategia de marca corporativa, marketing basado en datos analíticos avanzados, y posicionamiento de mercado estratégico a largo plazo.',
    },
  },
};

/**
 * Get company size category based on employee count
 */
export function getCompanySizeCategory(employeeCount: number): CompanySizeCategory {
  if (employeeCount <= SIZE_THRESHOLDS.micro.max) return 'micro';
  if (employeeCount <= SIZE_THRESHOLDS.pequeña.max) return 'pequeña';
  if (employeeCount <= SIZE_THRESHOLDS.mediana.max) return 'mediana';
  return 'grande';
}

/**
 * Get complete company size profile
 */
export function getCompanySizeProfile(employeeCount: number): CompanySizeProfile {
  const category = getCompanySizeCategory(employeeCount);
  return SIZE_PROFILES[category];
}

/**
 * Get size-specific recommendations based on scores
 */
export function getSizeSpecificRecommendations(
  employeeCount: number,
  scores: { finance: number; operations: number; marketing: number }
): string[] {
  const profile = getCompanySizeProfile(employeeCount);
  const recommendations: string[] = [];

  // Add contextual intro
  recommendations.push(
    `Como ${profile.label} (${profile.employeeRange}), tu enfoque debe estar en: ${profile.growthPriorities.slice(0, 3).join(', ')}.`
  );

  // Finance recommendations
  if (scores.finance < 70) {
    recommendations.push(`📊 **Finanzas**: ${profile.recommendedFocus.finance}`);
  }

  // Operations recommendations
  if (scores.operations < 70) {
    recommendations.push(`⚙️ **Operaciones**: ${profile.recommendedFocus.operations}`);
  }

  // Marketing recommendations
  if (scores.marketing < 70) {
    recommendations.push(`📈 **Marketing**: ${profile.recommendedFocus.marketing}`);
  }

  // Size-specific challenges
  if (profile.typicalChallenges.length > 0) {
    const topChallenges = profile.typicalChallenges.slice(0, 2).join(' y ');
    recommendations.push(
      `⚠️ **Desafíos típicos de ${profile.label}**: ${topChallenges}. Tu diagnóstico puede ayudarte a abordarlos.`
    );
  }

  return recommendations;
}

/**
 * Get growth stage message
 */
export function getGrowthStageMessage(employeeCount: number): string {
  const profile = getCompanySizeProfile(employeeCount);

  const messages: Record<CompanySizeCategory, string> = {
    micro: `${profile.icon} Estás en una etapa fundamental donde cada decisión cuenta. Enfócate en establecer bases sólidas antes de escalar.`,
    pequeña: `${profile.icon} Tu empresa está en modo crecimiento. Es momento de profesionalizar procesos y prepararte para el siguiente nivel.`,
    mediana: `${profile.icon} Has alcanzado un tamaño significativo. El enfoque ahora es optimización, profesionalización y crecimiento estratégico.`,
    grande: `${profile.icon} Eres una empresa consolidada. La innovación continua y la excelencia operacional son tus diferenciadores.`,
  };

  return messages[profile.category];
}

/**
 * Get expected maturity level per axis based on company size
 */
export function getExpectedMaturityLevel(
  employeeCount: number,
  axis: 'finance' | 'operations' | 'marketing'
): number {
  const category = getCompanySizeCategory(employeeCount);

  // Expected baseline scores by size
  const maturityBaselines: Record<CompanySizeCategory, Record<string, number>> = {
    micro: { finance: 50, operations: 45, marketing: 40 },
    pequeña: { finance: 60, operations: 55, marketing: 55 },
    mediana: { finance: 70, operations: 70, marketing: 65 },
    grande: { finance: 80, operations: 80, marketing: 75 },
  };

  return maturityBaselines[category][axis];
}

/**
 * Compare score against expected maturity
 */
export function compareToMaturityLevel(
  score: number,
  employeeCount: number,
  axis: 'finance' | 'operations' | 'marketing'
): { status: 'above' | 'at' | 'below'; message: string } {
  const expected = getExpectedMaturityLevel(employeeCount, axis);
  const profile = getCompanySizeProfile(employeeCount);
  const axisNames = { finance: 'Finanzas', operations: 'Operaciones', marketing: 'Marketing' };
  const axisName = axisNames[axis];

  if (score >= expected + 10) {
    return {
      status: 'above',
      message: `Tu ${axisName} está por encima de lo esperado para una ${profile.label}. ¡Excelente!`,
    };
  }

  if (score >= expected - 10) {
    return {
      status: 'at',
      message: `Tu ${axisName} está alineado con lo esperado para una ${profile.label}.`,
    };
  }

  return {
    status: 'below',
    message: `Tu ${axisName} está por debajo de lo esperado para una ${profile.label}. Es un área de oportunidad importante.`,
  };
}

/**
 * Get priority actions based on size and scores
 */
export function getPriorityActions(
  employeeCount: number,
  scores: { finance: number; operations: number; marketing: number }
): { action: string; priority: 'alta' | 'media' | 'baja'; axis: string }[] {
  const profile = getCompanySizeProfile(employeeCount);
  const actions: { action: string; priority: 'alta' | 'media' | 'baja'; axis: string }[] = [];

  // Determine weakest area
  const weakestScore = Math.min(scores.finance, scores.operations, scores.marketing);

  // Finance actions
  if (scores.finance === weakestScore || scores.finance < 60) {
    actions.push({
      action: profile.category === 'micro'
        ? 'Separar finanzas personales de empresariales e implementar control básico'
        : profile.category === 'pequeña'
        ? 'Implementar software de contabilidad y presupuesto anual'
        : profile.category === 'mediana'
        ? 'Contratar CFO y establecer análisis financiero avanzado'
        : 'Optimizar análisis financiero y planeación estratégica a largo plazo',
      priority: scores.finance < 50 ? 'alta' : 'media',
      axis: 'Finanzas',
    });
  }

  // Operations actions
  if (scores.operations === weakestScore || scores.operations < 60) {
    actions.push({
      action: profile.category === 'micro'
        ? 'Documentar procesos básicos y crear checklists para tareas repetitivas'
        : profile.category === 'pequeña'
        ? 'Implementar CRM y definir workflows documentados'
        : profile.category === 'mediana'
        ? 'Implementar sistema ERP y certificaciones de calidad'
        : 'Enfocarse en excelencia operacional y mejora continua',
      priority: scores.operations < 50 ? 'alta' : 'media',
      axis: 'Operaciones',
    });
  }

  // Marketing actions
  if (scores.marketing === weakestScore || scores.marketing < 60) {
    actions.push({
      action: profile.category === 'micro'
        ? 'Crear presencia digital básica y activar Google Business Profile'
        : profile.category === 'pequeña'
        ? 'Definir estrategia de marketing digital y embudo de ventas'
        : profile.category === 'mediana'
        ? 'Estructurar departamento de marketing y marketing automation'
        : 'Implementar marketing basado en datos y estrategia de marca corporativa',
      priority: scores.marketing < 50 ? 'alta' : 'media',
      axis: 'Marketing',
    });
  }

  // Sort by priority
  return actions.sort((a, b) => {
    const priorityOrder = { alta: 0, media: 1, baja: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

/**
 * Get benchmark comparison message for company size
 */
export function getSizeBenchmarkMessage(
  employeeCount: number,
  averageScore: number
): string {
  const profile = getCompanySizeProfile(employeeCount);
  const expectedAverage = (
    getExpectedMaturityLevel(employeeCount, 'finance') +
    getExpectedMaturityLevel(employeeCount, 'operations') +
    getExpectedMaturityLevel(employeeCount, 'marketing')
  ) / 3;

  if (averageScore >= expectedAverage + 15) {
    return `${profile.icon} Tu score general de ${averageScore}/100 es sobresaliente para una ${profile.label}. Estás bien posicionado para el siguiente nivel de crecimiento.`;
  }

  if (averageScore >= expectedAverage) {
    return `${profile.icon} Tu score general de ${averageScore}/100 está alineado con lo esperado para una ${profile.label}. Hay oportunidades de optimización.`;
  }

  return `${profile.icon} Tu score general de ${averageScore}/100 está por debajo de lo esperado para una ${profile.label}. Es momento de enfocarse en las áreas de oportunidad identificadas.`;
}
