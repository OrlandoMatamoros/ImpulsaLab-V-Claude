# 📊 DIAGNÓSTICO 3D - DOCUMENTACIÓN TÉCNICA COMPLETA

**Fecha:** Enero 2026
**Proyecto:** ImpulsaLab - Sistema de Diagnóstico Empresarial
**Versión:** 2.0 (Con Industry Benchmarks y Company Size Analysis)

---

## 📋 TABLA DE CONTENIDOS

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Arquitectura Técnica](#arquitectura-técnica)
3. [Flujo del Usuario](#flujo-del-usuario)
4. [Sistema de Preguntas](#sistema-de-preguntas)
5. [Motor de Scoring](#motor-de-scoring)
6. [Benchmarking por Industria](#benchmarking-por-industria)
7. [Análisis por Tamaño de Empresa](#análisis-por-tamaño-de-empresa)
8. [Integración CRM](#integración-crm)
9. [Sistema de Emails](#sistema-de-emails)
10. [Stack Tecnológico](#stack-tecnológico)
11. [Base de Datos de Preguntas](#base-de-datos-de-preguntas)

---

## 🎯 RESUMEN EJECUTIVO

### Objetivo
Sistema de diagnóstico empresarial que evalúa 3 dimensiones clave de un negocio:
- 💰 **Finanzas** (40% del score)
- ⚙️ **Operaciones** (30% del score)
- 📈 **Marketing** (30% del score)

### Características Principales
- ✅ **Acceso público** (sin necesidad de login)
- ✅ **18 preguntas adaptativas** (3 iniciales + 15 específicas)
- ✅ **Benchmarking por industria** (10 industrias diferentes)
- ✅ **Análisis por tamaño** (4 categorías empresariales)
- ✅ **Personalización contextual** (recomendaciones específicas)
- ✅ **Lead capture temprano** (datos al inicio del proceso)
- ✅ **Emails automatizados** (usuario + admin con contexto)
- ✅ **Integración CRM** (Google Sheets automático)
- ✅ **Persistencia local** (localStorage para progreso)

### Métricas Clave
- **Tiempo de completación:** 5-7 minutos
- **Tasa de conversión esperada:** 30-50%
- **Datos capturados:** 6 campos iniciales + 18 respuestas
- **Contexto generado:** Industria + Tamaño + Scores

---

## 🏗️ ARQUITECTURA TÉCNICA

### Stack Tecnológico

```typescript
// Framework
Next.js 15.5.9 (App Router)
React 18
TypeScript 5.x

// UI Components
Tailwind CSS
shadcn/ui
lucide-react (iconos)
Recharts (gráficos)

// Estado
Zustand (store global)
React Hooks (estado local)
localStorage (persistencia)

// Backend/APIs
Next.js API Routes
Resend (email service)
Google Sheets API (CRM)

// Helpers
lib/industry-benchmarks.ts (450 líneas)
lib/company-size.ts (450 líneas)
lib/scoring-engine.ts
lib/google-sheets.ts
```

### Estructura de Carpetas

```
app/
├── diagnostico/
│   ├── page.tsx                    # Página principal (público)
│   ├── components/
│   │   ├── DiagnosticWizard.tsx    # Orquestador principal
│   │   ├── InitialLeadCapture.tsx  # Formulario inicial (6 campos)
│   │   ├── PreAssessment.tsx       # 3 preguntas iniciales
│   │   ├── AdaptiveQuestions.tsx   # 15 preguntas adaptativas
│   │   ├── AutoProcessing.tsx      # Procesamiento automático
│   │   └── ResultsDashboard.tsx    # Resultados con contexto
│   └── lib/
│       ├── questions-data.ts       # Base de preguntas
│       └── scoring-engine.ts       # Lógica de puntuación
│
├── api/
│   └── diagnostic/
│       ├── send-welcome/route.ts   # Email de bienvenida
│       └── send-report/route.ts    # Emails de resultados
│
lib/
├── industry-benchmarks.ts          # Comparativas por industria
├── company-size.ts                 # Análisis por tamaño
└── google-sheets.ts                # Integración CRM

store/
└── diagnosticStore.ts              # Estado global Zustand
```

---

## 🔄 FLUJO DEL USUARIO

### Paso 0: Lead Capture (NUEVO - Lead Gate Pattern)
**Componente:** `InitialLeadCapture.tsx`

**Captura:**
```typescript
{
  nombre: string,          // Requerido
  email: string,           // Requerido
  telefono?: string,       // Opcional
  negocio: string,         // Requerido
  industria: string,       // Requerido - 10 opciones
  empleados: number        // Requerido - min: 1
}
```

**Industrias Disponibles:**
1. Tecnología
2. Retail / Comercio
3. Servicios Profesionales
4. Manufactura
5. Salud y Bienestar
6. Educación
7. Alimentos y Restaurantes
8. Construcción
9. Turismo y Hospitalidad
10. Otro

**Validación:**
- Email: formato válido
- Empleados: número entero ≥ 1
- Todos los campos requeridos completos

**Acción Post-Captura:**
1. Guardar en estado (`initialLeadData`)
2. Enviar email de bienvenida (API: `/api/diagnostic/send-welcome`)
3. Guardar en localStorage (persistencia)
4. Avanzar a Paso 1

---

### Paso 1: Pre-Assessment
**Componente:** `PreAssessment.tsx`

**Objetivo:** Establecer baseline rápido de las 3 dimensiones

**Preguntas:**
1. **Finanzas:** ¿Qué tan en control te sientes de las finanzas?
2. **Operaciones:** ¿Cuánto tiempo dedicas a tareas repetitivas?
3. **Marketing:** ¿Qué tan efectiva es tu presencia digital?

**Sistema de Puntuación:**
- Cada pregunta: 3 opciones (20, 50, 80 puntos)
- Score inicial por dimensión establecido
- Determina nivel de madurez inicial

---

### Paso 2: Finanzas (5 Preguntas Adaptativas)
**Componente:** `AdaptiveQuestions.tsx` (dimension="finance")

**Preguntas:**
1. Frecuencia de revisión de números (peso: 2.0) 🔴
2. Conocimiento de márgenes (peso: 1.8) 🔴
3. Separación de finanzas (peso: 1.5) 🟡
4. Cash runway / colchón (peso: 1.8) 🔴
5. Herramientas de gestión (peso: 1.2) 🟡

**Sistema de Scoring:**
```typescript
// Cada pregunta tiene options con score 0-100
// Score final = Σ(score_opcion * peso) / Σ(pesos)
// Normalizado a 0-100
```

---

### Paso 3: Operaciones (5 Preguntas Adaptativas)
**Componente:** `AdaptiveQuestions.tsx` (dimension="operations")

**Preguntas:**
1. Horas en tareas repetitivas (peso: 2.0) 🔴
2. Gestión de citas (peso: 1.5) 🟡
3. Documentación de procesos (peso: 1.6) 🔴
4. Manejo de inventario (peso: 1.4) 🟡
5. Tiempo para reportes (peso: 1.3) 🟡

---

### Paso 4: Marketing (5 Preguntas Adaptativas)
**Componente:** `AdaptiveQuestions.tsx` (dimension="marketing")

**Preguntas:**
1. Visibilidad en Google (peso: 2.0) 🔴
2. Frecuencia en redes (peso: 1.5) 🟡
3. Cliente ideal definido (peso: 1.8) 🔴
4. Captación de clientes (peso: 1.6) 🔴
5. Medición de ROI (peso: 1.4) 🟡

---

### Paso 5: AutoProcessing
**Componente:** `AutoProcessing.tsx`

**Proceso Automático:**
```typescript
1. Calcular scores finales → 20%
2. Enviar email al usuario → 40%
3. Enviar email al admin → 80%
4. Guardar en Google Sheets → 95%
5. Redirect a /gracias → 100%
```

**APIs Llamadas:**
```typescript
POST /api/diagnostic/send-report
Body: {
  leadData: {
    nombre, email, empresa, industria, empleados,
    score_finanzas, score_operaciones, score_marketing,
    score_promedio, fecha, origen
  },
  clientInfo: { ... },
  scores: { finance, operations, marketing },
  responses: [ ...todas las respuestas... ]
}
```

**Duración:** ~3-5 segundos

---

### Paso 6: Resultados
**Componente:** `ResultsDashboard.tsx`

**Secciones Mostradas:**

#### 1. Header con Score Global
```typescript
{
  nombre_empresa,
  fecha,
  score_promedio: 0-100,
  etapa_negocio: "Supervivencia" | "Crecimiento" | "Expansión"
}
```

#### 2. Perfil de Empresa (NUEVO)
```typescript
{
  clasificacion: "Microempresa" | "Pequeña" | "Mediana" | "Grande",
  empleados: number,
  rango: string, // "1-10", "11-50", etc.
  industria: string,
  growth_stage_message: string,
  prioridad_acciones: [
    { accion, prioridad: "alta"|"media"|"baja", axis }
  ]
}
```

#### 3. Comparaciones con Industria (NUEVO)
```typescript
// Por cada eje (Finanzas, Operaciones, Marketing)
{
  score_empresa: number,
  benchmark_industria: number,
  comparacion_mensaje: string,
  performance_level: "excellent"|"good"|"average"|"below_average"|"poor"
}
```

Ejemplo:
```
📊 Finanzas: 72/100
Benchmark Tecnología: 65
🌟 Excelente para Tecnología - Estás en el top 20% de tu industria en Finanzas
```

#### 4. Gráficos
- **Radar Chart:** Visualización 3D de las dimensiones
- **Bar Chart:** Comparación empresa vs industria

#### 5. Análisis Detallado
- Diagnóstico por eje con contexto de industria
- Mejores prácticas del sector
- ROI potencial y tiempos de implementación

#### 6. Plan de Acción con IA
**Componente:** `ProfessionalRecommendations.tsx`

Genera recomendaciones usando:
```typescript
POST /api/ai/generate-recommendations
Body: { scores, clientInfo, responses }
Response: {
  priorities,
  quick_wins,
  strategic_recommendations,
  action_plan
}
```

---

## 📝 SISTEMA DE PREGUNTAS

### Estructura de Pregunta

```typescript
interface Question {
  id: string;                    // "fin-b-1"
  text: string;                  // Texto de la pregunta
  helpText?: string;             // Texto de ayuda adicional
  type: "multiple_choice";       // Tipo de pregunta
  options: Array<{
    text: string;                // Texto de la opción
    score: number;               // Puntuación 0-100
  }>;
  weight: number;                // Peso de la pregunta (1.0-2.0)
  category: "CRÍTICO" | "IMPORTANTE" | "RELEVANTE";
  maturityLevel: "basic" | "intermediate" | "advanced";
  dimension: "finance" | "operations" | "marketing";
}
```

### Categorización de Preguntas

**🔴 CRÍTICAS** (weight: 1.6-2.0)
- Alto impacto en el score
- Fundamentales para la dimensión
- Determinan el nivel de madurez

**Finanzas:**
- Frecuencia de revisión
- Conocimiento de márgenes
- Cash runway

**Operaciones:**
- Horas en tareas repetitivas
- Documentación de procesos

**Marketing:**
- Visibilidad en Google
- Cliente ideal definido
- Captación de clientes

**🟡 IMPORTANTES** (weight: 1.2-1.5)
- Impacto moderado
- Complementan el diagnóstico
- Refinan el score

**🔵 RELEVANTES** (weight: < 1.2)
- Impacto bajo
- Información complementaria
- Matices del diagnóstico

### Banco de Preguntas Completo

**Total: 18 preguntas**
- Pre-Assessment: 3 (1 por dimensión)
- Finanzas: 5 adaptativas
- Operaciones: 5 adaptativas
- Marketing: 5 adaptativas

---

## 🎯 MOTOR DE SCORING

### Archivo: `lib/scoring-engine.ts`

### Algoritmo de Puntuación

```typescript
// 1. PRE-ASSESSMENT
// Score inicial simple por dimensión
scoreInicial = opcionSeleccionada.valor // 20, 50, o 80

// 2. PREGUNTAS ADAPTATIVAS
// Por cada dimensión:
scoreAdaptativo = Σ(opcion.score * pregunta.weight) / Σ(pregunta.weight)

// 3. COMBINACIÓN
scoreFinal = (scoreInicial * 0.3) + (scoreAdaptativo * 0.7)

// 4. NORMALIZACIÓN
scoreFinal = Math.round(Math.min(100, Math.max(0, scoreFinal)))
```

### Pesos por Dimensión (Score Global)

```typescript
const dimensionWeights = {
  finance: 0.40,      // 40%
  operations: 0.30,   // 30%
  marketing: 0.30     // 30%
};

scoreGlobal =
  (scoreFinanzas * 0.40) +
  (scoreOperaciones * 0.30) +
  (scoreMarketing * 0.30)
```

### Niveles de Madurez

```typescript
function getMaturityLevel(score: number): string {
  if (score >= 70) return "Expansión";     // Top 30%
  if (score >= 40) return "Crecimiento";   // Middle 40%
  return "Supervivencia";                  // Bottom 30%
}
```

**Expansión (≥70):**
- Negocio listo para escalar
- Fundamentos sólidos
- Optimización y crecimiento

**Crecimiento (40-69):**
- Base establecida
- Oportunidades de mejora
- Sistematización necesaria

**Supervivencia (<40):**
- Fundamentos débiles
- Riesgo operativo alto
- Requiere intervención urgente

---

## 🏭 BENCHMARKING POR INDUSTRIA

### Archivo: `lib/industry-benchmarks.ts` (450 líneas)

### 10 Industrias Soportadas

```typescript
type IndustryType =
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
```

### Benchmarks por Industria

**Estructura:**
```typescript
{
  industria: {
    finance: { excellent: 85, good: 72, average: 60, below_average: 48 },
    operations: { excellent: 88, good: 75, average: 62, below_average: 50 },
    marketing: { excellent: 90, good: 78, average: 65, below_average: 52 },
    description: string
  }
}
```

**Ejemplos:**

**Tecnología:**
- Finance: 85/72/60/48 (alto estándar financiero)
- Operations: 88/75/62/50 (eficiencia crítica)
- Marketing: 90/78/65/52 (marketing es fundamental)

**Alimentos:**
- Finance: 80/68/56/44 (márgenes ajustados)
- Operations: 88/76/64/52 (control operacional crítico)
- Marketing: 85/72/60/48 (presencia de marca importante)

**Retail:**
- Finance: 78/65/52/40 (márgenes muy ajustados)
- Operations: 85/72/60/48 (eficiencia es clave)
- Marketing: 88/75/62/50 (marketing muy competitivo)

### Funciones Principales

```typescript
// 1. Obtener nivel de desempeño
getPerformanceLevel(
  score: number,
  axis: 'finance'|'operations'|'marketing',
  industry: IndustryType
): 'excellent'|'good'|'average'|'below_average'|'poor'

// 2. Mensaje de comparación
getIndustryComparison(
  score: number,
  axis: AxisType,
  industry: IndustryType
): string

// Ejemplo de output:
// "🌟 Excelente para Tecnología - Estás en el top 20% en Finanzas"
// "⚠️ Por debajo del promedio - Operaciones requiere atención en Alimentos"

// 3. Recomendaciones específicas
getIndustryRecommendations(
  scores: { finance, operations, marketing },
  industry: IndustryType
): string[]

// 4. Áreas de fortaleza y mejora
getStrengthAreas(scores, industry): string[]
getImprovementAreas(scores, industry): string[]
```

---

## 🏢 ANÁLISIS POR TAMAÑO DE EMPRESA

### Archivo: `lib/company-size.ts` (450 líneas)

### 4 Categorías de Tamaño

```typescript
type CompanySizeCategory = 'micro' | 'pequeña' | 'mediana' | 'grande';

const SIZE_THRESHOLDS = {
  micro: { min: 1, max: 10 },
  pequeña: { min: 11, max: 50 },
  mediana: { min: 51, max: 250 },
  grande: { min: 251, max: Infinity }
};
```

### Perfil por Categoría

```typescript
interface CompanySizeProfile {
  category: CompanySizeCategory;
  label: string;                    // "Microempresa"
  employeeRange: string;            // "1-10 empleados"
  icon: string;                     // "🌱"
  description: string;
  typicalChallenges: string[];
  growthPriorities: string[];
  recommendedFocus: {
    finance: string;
    operations: string;
    marketing: string;
  };
}
```

### Perfiles Detallados

**🌱 Microempresa (1-10 empleados)**

**Desafíos Típicos:**
- Recursos limitados
- Dueño hace múltiples funciones
- Falta de procesos formales
- Flujo de efectivo ajustado

**Prioridades:**
- Establecer procesos básicos
- Separar finanzas personales/empresariales
- Presencia digital básica
- Automatizar tareas repetitivas

**Enfoque Recomendado:**
- **Finance:** Control básico, separar cuentas, Excel/software simple
- **Operations:** Documentar procesos básicos, checklists
- **Marketing:** Presencia digital básica, Google Business, boca a boca

---

**🌿 Pequeña Empresa (11-50 empleados)**

**Desafíos Típicos:**
- Transición startup → empresa formal
- Necesidad de estructura
- Delegar responsabilidades
- Sistematizar procesos

**Prioridades:**
- Implementar sistemas de gestión
- Definir roles claros
- Establecer KPIs
- Profesionalizar marketing y ventas

**Enfoque Recomendado:**
- **Finance:** Software contable profesional, presupuestos anuales
- **Operations:** CRM básico, workflows documentados
- **Marketing:** Marketing digital consistente, embudos de ventas

---

**🌳 Mediana Empresa (51-250 empleados)**

**Desafíos Típicos:**
- Mantener cultura organizacional
- Optimizar múltiples departamentos
- Gestión de equipo de líderes
- Competitividad en mercado

**Prioridades:**
- Profesionalizar gestión financiera
- Tecnología empresarial (ERP)
- Desarrollar liderazgo interno
- Expandir mercados

**Enfoque Recomendado:**
- **Finance:** CFO tiempo completo, sistemas ERP, planeación 3-5 años
- **Operations:** ERP integrado, procesos por departamento, métricas
- **Marketing:** Departamento profesional, automation, multicanal

---

**🏢 Gran Empresa (250+ empleados)**

**Desafíos Típicos:**
- Agilidad a escala
- Múltiples unidades de negocio
- Innovación corporativa
- Expansión geográfica

**Prioridades:**
- Optimización a escala
- Transformación digital
- Expansión estratégica
- Excelencia operacional

**Enfoque Recomendado:**
- **Finance:** Equipo completo, análisis avanzado, dashboards ejecutivos
- **Operations:** SAP/Oracle, Six Sigma, Lean
- **Marketing:** Departamento robusto, analytics avanzados, brand corporativo

---

### Funciones Principales

```typescript
// 1. Obtener perfil completo
getCompanySizeProfile(employeeCount: number): CompanySizeProfile

// 2. Recomendaciones específicas
getSizeSpecificRecommendations(
  employeeCount: number,
  scores: { finance, operations, marketing }
): string[]

// 3. Acciones prioritarias con urgencia
getPriorityActions(
  employeeCount: number,
  scores: { finance, operations, marketing }
): Array<{
  action: string,
  priority: 'alta'|'media'|'baja',
  axis: string
}>

// Ejemplo de output:
[
  {
    action: "Implementar software de contabilidad profesional",
    priority: "alta",
    axis: "Finanzas"
  },
  {
    action: "Definir workflows documentados para operaciones",
    priority: "media",
    axis: "Operaciones"
  }
]

// 4. Mensaje de etapa de crecimiento
getGrowthStageMessage(employeeCount: number): string

// Ejemplo:
// "🌿 Tu empresa está en modo crecimiento. Es momento de
//  profesionalizar procesos y prepararte para el siguiente nivel."

// 5. Comparación con madurez esperada
compareToMaturityLevel(
  score: number,
  employeeCount: number,
  axis: 'finance'|'operations'|'marketing'
): { status: 'above'|'at'|'below', message: string }
```

### Niveles de Madurez Esperados

```typescript
const maturityBaselines = {
  micro: { finance: 50, operations: 45, marketing: 40 },
  pequeña: { finance: 60, operations: 55, marketing: 55 },
  mediana: { finance: 70, operations: 70, marketing: 65 },
  grande: { finance: 80, operations: 80, marketing: 75 }
};
```

---

## 💾 INTEGRACIÓN CRM

### Archivo: `lib/google-sheets.ts`

### Google Sheets como CRM

**Sheet ID:** Configurado en `.env`
```
GOOGLE_SHEETS_SPREADSHEET_ID=your_sheet_id
```

**Credenciales:** Service Account JSON
```json
{
  "type": "service_account",
  "project_id": "...",
  "private_key": "...",
  "client_email": "..."
}
```

### Estructura de la Hoja

**Columnas (A-N):**
```
A: Fecha (YYYY-MM-DD)
B: Nombre
C: Email
D: Teléfono
E: Empresa
F: Industria           ← NUEVO
G: Empleados           ← NUEVO
H: Facturación Anual (null si no se captura)
I: Score Finanzas (0-100)
J: Score Operaciones (0-100)
K: Score Marketing (0-100)
L: Score Promedio (0-100)
M: Origen ("Diagnóstico Web")
N: Timestamp (ISO 8601)
```

### Función de Guardado

```typescript
async function appendToGoogleSheet(leadData: LeadData) {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS!),
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  const sheets = google.sheets({ version: 'v4', auth });

  const values = [[
    leadData.fecha,
    leadData.nombre,
    leadData.email,
    leadData.telefono,
    leadData.empresa,
    leadData.industria,              // ← NUEVO
    leadData.empleados,              // ← NUEVO
    leadData.facturacion_anual || 'No especificada',
    leadData.score_finanzas,
    leadData.score_operaciones,
    leadData.score_marketing,
    leadData.score_promedio,
    leadData.origen,
    new Date().toISOString()
  ]];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range: 'Leads!A:N',
    valueInputOption: 'RAW',
    requestBody: { values }
  });
}
```

### Datos Guardados

```typescript
interface LeadData {
  fecha: string;              // "2026-01-22"
  nombre: string;             // "Juan Pérez"
  email: string;              // "juan@empresa.com"
  telefono: string;           // "555-1234" o "No proporcionado"
  empresa: string;            // "Mi Empresa SAS"
  industria: string;          // "Tecnología" ← NUEVO
  empleados: number;          // 25 ← NUEVO
  facturacion_anual: number | null;
  score_finanzas: number;     // 72
  score_operaciones: number;  // 68
  score_marketing: number;    // 55
  score_promedio: number;     // 66
  origen: string;             // "Diagnóstico Web"
}
```

---

## 📧 SISTEMA DE EMAILS

### Proveedor: Resend
**API Key:** Configurado en `.env`
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

### Email 1: Bienvenida (Inmediato)

**Endpoint:** `POST /api/diagnostic/send-welcome`

**Trigger:** Después de completar InitialLeadCapture

**Contenido:**
- Saludo personalizado
- Explicación del Diagnóstico 3D
- Próximos pasos (4 pasos claros)
- CTA: Continuar Diagnóstico
- Tiempo estimado: 5-7 minutos

**Template:**
```html
<!DOCTYPE html>
<html>
<head>...</head>
<body>
  <div style="max-width: 650px; margin: 40px auto; background: white;">
    <!-- Header con logo ImpulsaLab -->
    <div style="background: linear-gradient(135deg, #002D62, #0047AB);">
      <h1>ImpulsaLab</h1>
      <p>Transformación Digital Empresarial</p>
    </div>

    <!-- Saludo personalizado -->
    <h2>¡Hola {{nombre}}! 👋</h2>
    <p>Gracias por iniciar tu Diagnóstico 3D...</p>

    <!-- Explicación de dimensiones -->
    <ul>
      <li>💰 Finanzas</li>
      <li>⚙️ Operaciones</li>
      <li>📈 Marketing</li>
    </ul>

    <!-- Próximos pasos -->
    <div style="background: #EBF4FF;">
      <h3>🚀 Próximos Pasos</h3>
      <ol>
        <li>Responde preguntas de evaluación inicial</li>
        <li>Completa análisis de Finanzas</li>
        <li>Completa análisis de Operaciones</li>
        <li>Completa análisis de Marketing</li>
      </ol>
    </div>

    <!-- CTA -->
    <a href="{{diagnostico_url}}" style="...">
      Continuar Diagnóstico
    </a>
  </div>
</body>
</html>
```

---

### Email 2: Resultados Usuario

**Endpoint:** `POST /api/diagnostic/send-report`

**Trigger:** Después de AutoProcessing

**Contenido:**
```html
<!-- Header con logo -->

<!-- Saludo + intro -->
<h2>¡Hola {{nombre}}! 👋</h2>
<p>Tu Diagnóstico 3D está completo. Aquí están tus resultados:</p>

<!-- Scores Card -->
<div class="scores">
  <h3>📊 Tus Puntajes</h3>

  <!-- Finanzas -->
  <div>
    <span>💰 Finanzas</span>
    <span>{{score_finanzas}}/100</span>
    <div class="progress-bar" style="width: {{score_finanzas}}%"></div>
  </div>

  <!-- Operaciones -->
  <div>
    <span>⚙️ Operaciones</span>
    <span>{{score_operaciones}}/100</span>
    <div class="progress-bar" style="width: {{score_operaciones}}%"></div>
  </div>

  <!-- Marketing -->
  <div>
    <span>📈 Marketing</span>
    <span>{{score_marketing}}/100</span>
    <div class="progress-bar" style="width: {{score_marketing}}%"></div>
  </div>

  <!-- Promedio -->
  <div class="total">
    <span>Promedio General</span>
    <span>{{score_promedio}}/100</span>
  </div>
</div>

<!-- NUEVO: Perfil de Empresa -->
{{#if companyProfile}}
<div class="company-profile">
  <h3>{{companyProfile.icon}} Tu Perfil Empresarial</h3>

  <div class="profile-cards">
    <div>
      <small>Clasificación</small>
      <strong>{{companyProfile.label}}</strong>
    </div>
    <div>
      <small>Empleados</small>
      <strong>{{empleados}} ({{companyProfile.employeeRange}})</strong>
    </div>
    <div>
      <small>Industria</small>
      <strong>{{industria}}</strong>
    </div>
  </div>

  <p>{{companyProfile.description}}</p>
</div>
{{/if}}

<!-- NUEVO: Comparación con Industria -->
<div class="industry-comparison">
  <h3>📊 Comparación con tu Industria ({{industria}})</h3>

  <div class="comparison-card">
    <strong>💰 Finanzas</strong>
    <p>{{industryComparisons.finance}}</p>
  </div>

  <div class="comparison-card">
    <strong>⚙️ Operaciones</strong>
    <p>{{industryComparisons.operations}}</p>
  </div>

  <div class="comparison-card">
    <strong>📈 Marketing</strong>
    <p>{{industryComparisons.marketing}}</p>
  </div>
</div>

<!-- NUEVO: Acciones Prioritarias -->
{{#if priorityActions}}
<div class="priority-actions">
  <h3>🎯 Acciones Prioritarias para tu Empresa</h3>

  {{#each priorityActions}}
  <div class="action-card priority-{{priority}}">
    <span class="badge">{{priority}}</span>
    <span class="axis">{{axis}}</span>
    <p>{{action}}</p>
  </div>
  {{/each}}
</div>
{{/if}}

<!-- Próximos Pasos -->
<div class="next-steps">
  <h3>🚀 Próximos Pasos</h3>
  <ul>
    <li>Revisa tu análisis completo</li>
    <li>Agenda consulta gratuita</li>
    <li>Recibe plan de acción</li>
  </ul>
</div>

<!-- CTA -->
<a href="https://calendly.com/orlando-tuimpulsalab/30min">
  📅 Agendar Consultoría Gratuita
</a>
```

---

### Email 3: Notificación Admin

**Endpoint:** `POST /api/diagnostic/send-report`

**Destinatarios:**
- leads@tuimpulsalab.com
- orlando@tuimpulsalab.com

**Contenido:**
```html
<h2>🎯 Nuevo Lead del Diagnóstico 3D</h2>

<!-- Información del Lead -->
<div class="lead-info">
  <h3>📊 Información del Lead</h3>
  <table>
    <tr>
      <td>Nombre:</td>
      <td>{{nombre}}</td>
    </tr>
    <tr>
      <td>Email:</td>
      <td><a href="mailto:{{email}}">{{email}}</a></td>
    </tr>
    <tr>
      <td>Teléfono:</td>
      <td>{{telefono}}</td>
    </tr>
    <tr>
      <td>Empresa:</td>
      <td>{{empresa}}</td>
    </tr>
    <tr>
      <td>Industria:</td>
      <td>{{industria}}</td>
    </tr>
    <tr>
      <td>Empleados:</td>
      <td>{{empleados}}</td>
    </tr>
  </table>
</div>

<!-- Scores -->
<div class="scores-summary">
  <h3>🎯 Scores del Diagnóstico</h3>
  <table>
    <tr>
      <td>💰 Finanzas:</td>
      <td style="font-weight: bold;">{{score_finanzas}}/100</td>
    </tr>
    <tr>
      <td>⚙️ Operaciones:</td>
      <td style="font-weight: bold;">{{score_operaciones}}/100</td>
    </tr>
    <tr>
      <td>📈 Marketing:</td>
      <td style="font-weight: bold;">{{score_marketing}}/100</td>
    </tr>
    <tr style="border-top: 2px solid;">
      <td>PROMEDIO:</td>
      <td style="font-weight: 800;">{{score_promedio}}/100</td>
    </tr>
  </table>
</div>

<!-- NUEVO: Perfil de Empresa & Contexto -->
{{#if companyProfile}}
<div class="company-context">
  <h3>🏢 Perfil de Empresa</h3>
  <table>
    <tr>
      <td>Clasificación:</td>
      <td style="font-weight: bold;">{{companyProfile.icon}} {{companyProfile.label}}</td>
    </tr>
    <tr>
      <td>Rango de Empleados:</td>
      <td>{{companyProfile.employeeRange}}</td>
    </tr>
    <tr>
      <td>Descripción:</td>
      <td>{{companyProfile.description}}</td>
    </tr>
  </table>
</div>
{{/if}}

<!-- NUEVO: Comparación con Industria -->
<div class="industry-context">
  <h3>📊 Comparación con Industria ({{industria}})</h3>

  <div style="margin-bottom: 10px; padding: 10px; background: white;">
    <strong>💰 Finanzas:</strong>
    <p>{{industryComparisons.finance}}</p>
  </div>

  <div style="margin-bottom: 10px; padding: 10px; background: white;">
    <strong>⚙️ Operaciones:</strong>
    <p>{{industryComparisons.operations}}</p>
  </div>

  <div style="padding: 10px; background: white;">
    <strong>📈 Marketing:</strong>
    <p>{{industryComparisons.marketing}}</p>
  </div>
</div>

<!-- NUEVO: Acciones Prioritarias para Follow-up -->
{{#if priorityActions}}
<div class="sales-intelligence">
  <h3>🎯 Acciones Prioritarias (para follow-up)</h3>

  {{#each priorityActions}}
  <div class="priority-card priority-{{priority}}">
    <span class="badge">{{priority}}</span>
    <strong>{{axis}}</strong>
    <p>{{action}}</p>
  </div>
  {{/each}}

  <div class="sales-tip">
    💡 <strong>Tip de Ventas:</strong> Enfoca la conversación en estas
    acciones prioritarias durante el follow-up. Son específicas para su
    tamaño e industria.
  </div>
</div>
{{/if}}

<!-- Metadata -->
<div class="metadata">
  <p>⚡ Fecha: {{fecha}}</p>
  <p>📍 Origen: {{origen}}</p>
</div>

<!-- BLOQUE JSON PARA AUTOMATIZACIÓN CRM -->
<div class="json-block" style="background: #263238; color: #aed581;">
  <p>// DATOS PARA CRM (Zapier/Make) - NO BORRAR</p>
<pre>---START_LEAD_DATA---
{{leadDataJSON}}
---END_LEAD_DATA---</pre>
</div>
```

---

## 💾 PERSISTENCIA DE DATOS

### localStorage Schema

```typescript
interface DiagnosticProgress {
  currentStep: number;                  // 0-6
  completedSteps: number[];             // [0, 1, 2, ...]
  scores: {
    finance: number;                    // 0-100
    operations: number;                 // 0-100
    marketing: number;                  // 0-100
  };
  allResponses: {
    clientInfo: object;
    preAssessment: object;
    finance: Array<any>;
    operations: Array<any>;
    marketing: Array<any>;
  };
  initialLeadData: {                    // ← NUEVO (bug fix)
    nombre: string;
    email: string;
    telefono?: string;
    negocio: string;
    industria: string;
    empleados: number;
  } | null;
  timestamp: string;                    // ISO 8601
}
```

**Key:** `'diagnosticProgress'`

**Guardado:**
- Después de cada paso completado
- Cuando initialLeadData cambia (useEffect)
- Antes de navegar entre pasos

**Restauración:**
- Al montar DiagnosticWizard
- Con parámetro `?showResults=true` va directo a resultados

**Limpieza:**
- Al hacer click en "Reiniciar"
- Al completar y ver resultados (opcional)

---

## 🔄 ESTADO GLOBAL (Zustand)

### Archivo: `store/diagnosticStore.ts`

```typescript
interface DiagnosticStore {
  // Client Info
  clientInfo: {
    contactName?: string;
    email?: string;
    phone?: string;
    companyName?: string;
    industry?: string;              // ← NUEVO
    employeeCount?: number;         // ← NUEVO
    annualRevenue?: number;
  };
  setClientInfo: (info: Partial<ClientInfo>) => void;

  // Results
  diagnosticResults: {
    scores?: {
      finance: number;
      operations: number;
      marketing: number;
      overall: number;
    };
    recommendations?: string[];
    timestamp?: Date;
  };
  setDiagnosticResults: (results: DiagnosticResults) => void;

  // Actions
  clearDiagnostic: () => void;
}

const useDiagnosticStore = create<DiagnosticStore>()(
  persist(
    (set) => ({
      clientInfo: {},
      diagnosticResults: {},

      setClientInfo: (info) =>
        set((state) => ({
          clientInfo: { ...state.clientInfo, ...info }
        })),

      setDiagnosticResults: (results) =>
        set({ diagnosticResults: results }),

      clearDiagnostic: () =>
        set({
          clientInfo: {},
          diagnosticResults: {}
        })
    }),
    {
      name: 'diagnostic-storage'
    }
  )
);
```

---

## 🎨 UI/UX PATTERNS

### Design System

**Colores Principales:**
```css
--primary: #002D62 (Azul oscuro ImpulsaLab)
--secondary: #0047AB (Azul medio)
--accent: #3B82F6 (Azul claro)
--success: #10B981 (Verde)
--warning: #F59E0B (Amarillo)
--danger: #EF4444 (Rojo)
```

**Gradientes:**
```css
--gradient-header: linear-gradient(135deg, #002D62, #0047AB)
--gradient-card: linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)
```

### Componentes de UI

**Cards:**
- Border radius: 12px
- Box shadow: 0 4px 20px rgba(0,0,0,0.08)
- Padding: 24px

**Buttons:**
- Primary: bg-[#002D62] hover:bg-[#001d42]
- Secondary: bg-white border text-[#002D62]
- Success: bg-green-600 hover:bg-green-700

**Progress Bar:**
```tsx
<Progress value={percentage} className="h-3" />
```

**Gráficos:**
- Recharts library
- Radar Chart para 3D visualization
- Bar Chart para comparaciones

### Responsive Design

**Breakpoints:**
```css
sm: 640px   (móvil pequeño)
md: 768px   (tablet)
lg: 1024px  (desktop)
xl: 1280px  (desktop grande)
```

**Mobile First:**
- Columnas: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Font sizes: `text-sm md:text-base lg:text-lg`
- Padding: `p-4 md:p-6 lg:p-8`

### Animaciones

```css
.animate-fadeIn {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 🔐 SEGURIDAD Y PRIVACIDAD

### Acceso Público

**Middleware Config:**
```typescript
// middleware.ts
const publicRoutes = [
  '/',
  '/diagnostico',  // ← Público desde v2.0
  '/login',
  '/signup',
  // ...
];
```

### Protección de Datos

**Variables de Entorno:**
```env
# Email Service
RESEND_API_KEY=re_xxxxx

# Google Sheets CRM
GOOGLE_SHEETS_SPREADSHEET_ID=1xxxxx
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account",...}

# OpenAI (opcional - para recomendaciones IA)
OPENAI_API_KEY=sk-xxxxx
```

**Validación de Inputs:**
- Email: regex validation
- Teléfono: formato internacional opcional
- Empleados: number >= 1
- All required fields checked

**Rate Limiting:**
```typescript
// TODO: Implementar rate limiting en APIs
// Sugerencia: usar Vercel rate limiting o Upstash Redis
```

---

## 🚀 DEPLOYMENT

### Vercel (Recomendado)

**vercel.json:**
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

**Environment Variables:**
- RESEND_API_KEY
- GOOGLE_SHEETS_SPREADSHEET_ID
- GOOGLE_SHEETS_CREDENTIALS
- OPENAI_API_KEY (opcional)

### Build Process

```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Build for production
npm run build

# Start production server
npm run start
```

### Performance

**Optimizaciones:**
- Next.js Image optimization
- Dynamic imports para componentes pesados
- React.lazy() para código splitting
- useMemo/useCallback para renders

**Métricas Target:**
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

---

## 📊 MÉTRICAS Y ANALYTICS

### Tracking Recomendado

**Google Analytics 4:**
```typescript
// Track diagnostic start
gtag('event', 'diagnostic_start', {
  user_industry: industria,
  user_size: employeeCount
});

// Track step completion
gtag('event', 'diagnostic_step_complete', {
  step_number: currentStep,
  step_name: stepName
});

// Track completion
gtag('event', 'diagnostic_complete', {
  score_finance: finalScores.finance,
  score_operations: finalScores.operations,
  score_marketing: finalScores.marketing,
  score_overall: averageScore,
  industry: industria,
  company_size: companyProfile.category
});
```

### KPIs a Monitorear

**Conversion Funnel:**
```
Visitas a /diagnostico
  ↓ (% que inician)
Completar Lead Capture (Paso 0)
  ↓ (% que continúan)
Completar Pre-Assessment (Paso 1)
  ↓ (% que continúan)
Completar Finanzas (Paso 2)
  ↓ (% que continúan)
Completar Operaciones (Paso 3)
  ↓ (% que continúan)
Completar Marketing (Paso 4)
  ↓ (% que llegan)
Ver Resultados (Paso 6)
  ↓ (% que agendan)
Agendar Consultoría
```

**Métricas Clave:**
- Tasa de inicio: % que completan paso 0
- Tasa de completación: % que llegan a resultados
- Tiempo promedio: minutos de inicio a fin
- Tasa de abandono por paso
- Distribución de scores
- Tasa de conversión a consultoría

---

## 🐛 BUG FIXES Y CHANGELOG

### v2.0 - Enero 2026

**Features:**
- ✅ Acceso público (sin login)
- ✅ Lead capture al inicio (Lead Gate pattern)
- ✅ Campos industria y empleados agregados
- ✅ Sistema de benchmarking por industria (10 industrias)
- ✅ Análisis por tamaño de empresa (4 categorías)
- ✅ Emails enriquecidos con contexto
- ✅ Perfil de empresa en resultados
- ✅ Comparaciones contextualizadas
- ✅ Acciones prioritarias con urgencia

**Bug Fixes:**
- ✅ Fix: Persistir initialLeadData en localStorage
  - **Problema:** "Error: No se encontraron datos del lead"
  - **Causa:** initialLeadData no se guardaba en localStorage
  - **Solución:** useEffect que guarda automáticamente + useCallback

**Files Changed:**
- NEW: lib/industry-benchmarks.ts (450 líneas)
- NEW: lib/company-size.ts (450 líneas)
- MODIFIED: app/diagnostico/page.tsx (acceso público)
- MODIFIED: app/diagnostico/components/DiagnosticWizard.tsx (bug fix)
- MODIFIED: app/diagnostico/components/InitialLeadCapture.tsx (2 campos nuevos)
- MODIFIED: app/diagnostico/components/ResultsDashboard.tsx (contexto)
- MODIFIED: app/api/diagnostic/send-report/route.ts (emails mejorados)

---

## 📚 BASE DE DATOS DE PREGUNTAS COMPLETA

### PRE-ASSESSMENT (3 preguntas)

#### FIN-PRE-1: Control Financiero
**Texto:** ¿Qué tan en control te sientes de las finanzas de tu negocio?
**Opciones:**
- Sin control - No sé mis números → 20
- Control básico - Reviso ocasionalmente → 50
- Buen control - Monitoreo constante → 80

#### OPS-PRE-1: Tareas Repetitivas
**Texto:** ¿Cuánto tiempo dedicas a tareas repetitivas y manuales?
**Opciones:**
- Demasiado - Más del 60% del tiempo → 20
- Moderado - Entre 30-60% del tiempo → 50
- Poco - Menos del 30% del tiempo → 80

#### MKT-PRE-1: Presencia Digital
**Texto:** ¿Qué tan efectiva es tu presencia digital y atracción de clientes?
**Opciones:**
- Muy básica - Casi no tengo presencia → 20
- Moderada - Algo de presencia pero sin estrategia → 50
- Fuerte - Estrategia clara y resultados medibles → 80

---

### FINANZAS (5 preguntas básicas)

#### FIN-B-1: Frecuencia de Revisión (CRÍTICO 🔴)
**ID:** fin-b-1
**Texto:** ¿Con qué frecuencia revisas los números de tu negocio?
**Ayuda:** Incluye revisión de ventas, gastos y utilidades
**Peso:** 2.0

**Opciones:**
1. Diariamente con dashboard automatizado → 95
2. Semanalmente con reportes → 80
3. Mensualmente → 60
4. Trimestralmente → 40
5. Anualmente o menos → 20

---

#### FIN-B-2: Márgenes de Ganancia (CRÍTICO 🔴)
**ID:** fin-b-2
**Texto:** ¿Conoces el margen de ganancia de cada producto/servicio que ofreces?
**Peso:** 1.8

**Opciones:**
1. No lo conozco → 10
2. Tengo una idea aproximada → 40
3. Lo sé para mis productos principales → 70
4. Lo tengo calculado para todo mi catálogo → 95

---

#### FIN-B-3: Separación de Finanzas (IMPORTANTE 🟡)
**ID:** fin-b-3
**Texto:** ¿Tienes separadas las finanzas personales de las del negocio?
**Peso:** 1.5

**Opciones:**
1. No, están mezcladas → 15
2. Parcialmente separadas → 50
3. Sí, completamente separadas → 95

---

#### FIN-B-4: Cash Runway (CRÍTICO 🔴)
**ID:** fin-b-4
**Texto:** ¿Cuántos meses podrías operar si mañana se detuvieran todas tus ventas?
**Ayuda:** Cash runway o colchón financiero
**Peso:** 1.8

**Opciones:**
1. Menos de 1 mes → 10
2. 1-2 meses → 30
3. 3-6 meses → 60
4. 6-12 meses → 85
5. Más de 1 año → 100

---

#### FIN-B-5: Herramientas de Gestión (IMPORTANTE 🟡)
**ID:** fin-b-5
**Texto:** ¿Qué herramientas utilizas para gestionar tus finanzas?
**Peso:** 1.2

**Opciones:**
1. Papel o notas → 15
2. Excel básico → 40
3. Excel con fórmulas avanzadas → 65
4. Software especializado → 85
5. Sistema ERP integrado → 100

---

### OPERACIONES (5 preguntas básicas)

#### OPS-B-1: Horas en Tareas Repetitivas (CRÍTICO 🔴)
**ID:** ops-b-1
**Texto:** ¿Cuántas horas a la semana dedicas a tareas repetitivas?
**Ayuda:** Tareas que haces una y otra vez de la misma manera
**Peso:** 2.0

**Opciones:**
1. 0-2 horas → 95
2. 3-5 horas → 75
3. 6-10 horas → 55
4. 11-20 horas → 35
5. Más de 20 horas → 15

---

#### OPS-B-2: Gestión de Citas (IMPORTANTE 🟡)
**ID:** ops-b-2
**Texto:** ¿Cómo gestionas las citas con clientes?
**Peso:** 1.5

**Opciones:**
1. Por teléfono/WhatsApp manual → 20
2. Por email ida y vuelta → 40
3. Calendario compartido → 60
4. Sistema de reservas online → 80
5. Totalmente automatizado → 95

---

#### OPS-B-3: Documentación de Procesos (CRÍTICO 🔴)
**ID:** ops-b-3
**Texto:** ¿Tienes documentados los procesos clave de tu negocio?
**Peso:** 1.6

**Opciones:**
1. No, todo está en mi cabeza → 10
2. Algunos procesos básicos → 35
3. La mayoría documentados → 65
4. Todos con procedimientos detallados → 85
5. Sistema digital con videos → 100

---

#### OPS-B-4: Manejo de Inventario (IMPORTANTE 🟡)
**ID:** ops-b-4
**Texto:** ¿Cómo manejas el inventario de tu negocio?
**Peso:** 1.4

**Opciones:**
1. Control mental → 15
2. Registros en papel → 30
3. Excel actualizado manualmente → 50
4. Software especializado → 75
5. Sistema automatizado con alertas → 95

---

#### OPS-B-5: Tiempo para Reportes (IMPORTANTE 🟡)
**ID:** ops-b-5
**Texto:** ¿Cuánto tiempo te toma generar un reporte de desempeño?
**Peso:** 1.3

**Opciones:**
1. Es instantáneo → 100
2. Menos de 30 minutos → 80
3. Unas 2 horas → 60
4. Medio día → 40
5. Un día completo o más → 20

---

### MARKETING (5 preguntas básicas)

#### MKT-B-1: Visibilidad en Google (CRÍTICO 🔴)
**ID:** mkt-b-1
**Texto:** ¿Los clientes te encuentran fácilmente en Google?
**Peso:** 2.0

**Opciones:**
1. No tengo sitio web → 10
2. No estoy seguro → 30
3. A veces aparezco → 50
4. Usualmente en primera página → 75
5. Siempre en los primeros resultados → 95

---

#### MKT-B-2: Frecuencia en Redes (IMPORTANTE 🟡)
**ID:** mkt-b-2
**Texto:** ¿Con qué frecuencia publicas en redes sociales?
**Peso:** 1.5

**Opciones:**
1. Nunca o casi nunca → 15
2. Cuando me acuerdo → 35
3. 1-2 veces por semana → 55
4. Diariamente → 75
5. Varias veces al día con estrategia → 95

---

#### MKT-B-3: Cliente Ideal (CRÍTICO 🔴)
**ID:** mkt-b-3
**Texto:** ¿Conoces quién es tu cliente ideal?
**Peso:** 1.8

**Opciones:**
1. No lo tengo claro → 15
2. Idea general → 40
3. Perfil básico definido → 65
4. Buyer persona detallado → 85
5. Múltiples personas basadas en datos → 100

---

#### MKT-B-4: Captación de Clientes (CRÍTICO 🔴)
**ID:** mkt-b-4
**Texto:** ¿Cómo captas nuevos clientes?
**Peso:** 1.6

**Opciones:**
1. Solo por recomendaciones → 25
2. Algo de publicidad básica → 45
3. Varios canales sin integrar → 65
4. Estrategia multicanal integrada → 85
5. Omnicanal con automatización → 100

---

#### MKT-B-5: Medición de ROI (IMPORTANTE 🟡)
**ID:** mkt-b-5
**Texto:** ¿Mides el retorno de tu inversión en marketing?
**Peso:** 1.4

**Opciones:**
1. No mido ROI → 20
2. Tengo una idea aproximada → 45
3. Medición básica → 65
4. Métricas detalladas → 85
5. Analytics avanzado con atribución → 100

---

## 🎓 GLOSARIO DE TÉRMINOS

**Lead Gate:** Patrón de captura de leads al inicio del funnel en lugar del final

**Pre-Assessment:** Preguntas iniciales rápidas para establecer baseline

**Adaptive Questions:** Preguntas que se ajustan según respuestas previas (futuro)

**Score:** Puntuación 0-100 por dimensión o global

**Benchmark:** Punto de referencia de la industria para comparación

**Maturity Level:** Nivel de madurez: Básico, Intermedio, Avanzado

**Weight:** Peso de una pregunta en el cálculo del score

**Cash Runway:** Meses que puede operar sin ingresos

**CAC:** Customer Acquisition Cost (costo de adquisición de cliente)

**LTV:** Lifetime Value (valor de vida del cliente)

**ROI:** Return on Investment (retorno de inversión)

---

## 📞 CONTACTO Y SOPORTE

**Desarrollador:** Claude AI + Orlando Matamoros
**Proyecto:** ImpulsaLab
**Email:** contacto@tuimpulsalab.com
**Repositorio:** OrlandoMatamoros/ImpulsaLab-V-Claude

---

**Fin de la Documentación Técnica**

_Versión 2.0 - Enero 2026_
