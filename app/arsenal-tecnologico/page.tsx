'use client';

import React, { useState, useMemo } from 'react';
import { Search, Grid, List, Filter, ExternalLink, Tag, DollarSign } from 'lucide-react';

// Tipos de datos
interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  tags: string[];
  pricing: string;
  pricingType: 'free' | 'freemium' | 'paid' | 'subscription';
  url: string;
  features: string[];
}

// Base de datos de herramientas (100+)
const toolsDatabase: Tool[] = [
  // Herramientas de Escritura y Contenido
  {
    id: 1,
    name: "ChatGPT",
    description: "Asistente de IA conversacional para múltiples tareas",
    category: "Escritura y Contenido",
    tags: ["chat", "escritura", "productividad"],
    pricing: "Gratis / $20/mes",
    pricingType: "freemium",
    url: "https://chat.openai.com",
    features: ["Chat conversacional", "Generación de texto", "Análisis de datos"]
  },
  {
    id: 2,
    name: "Claude",
    description: "Asistente de IA avanzado con capacidades de razonamiento",
    category: "Escritura y Contenido",
    tags: ["chat", "análisis", "programación"],
    pricing: "Gratis / $20/mes",
    pricingType: "freemium",
    url: "https://claude.ai",
    features: ["Conversación avanzada", "Análisis de documentos", "Generación de código"]
  },
  {
    id: 3,
    name: "Jasper AI",
    description: "Plataforma de escritura con IA para marketing",
    category: "Escritura y Contenido",
    tags: ["marketing", "copywriting", "contenido"],
    pricing: "$49-$125/mes",
    pricingType: "subscription",
    url: "https://jasper.ai",
    features: ["Templates de marketing", "Generación de blog posts", "Optimización SEO"]
  },
  {
    id: 4,
    name: "Copy.ai",
    description: "Generador de copys y contenido de marketing",
    category: "Escritura y Contenido",
    tags: ["copywriting", "marketing", "ventas"],
    pricing: "Gratis / $49/mes",
    pricingType: "freemium",
    url: "https://copy.ai",
    features: ["Templates predefinidos", "Generación rápida", "Múltiples idiomas"]
  },
  {
    id: 5,
    name: "Writesonic",
    description: "Suite completa de escritura con IA",
    category: "Escritura y Contenido",
    tags: ["blog", "artículos", "SEO"],
    pricing: "$19-$99/mes",
    pricingType: "subscription",
    url: "https://writesonic.com",
    features: ["Artículos largos", "Parafraseo", "Expansión de texto"]
  },

  // Herramientas de Diseño e Imagen
  {
    id: 6,
    name: "Midjourney",
    description: "Generador de imágenes artísticas con IA",
    category: "Diseño e Imagen",
    tags: ["arte", "imágenes", "creatividad"],
    pricing: "$10-$120/mes",
    pricingType: "subscription",
    url: "https://midjourney.com",
    features: ["Arte conceptual", "Estilos variados", "Alta resolución"]
  },
  {
    id: 7,
    name: "DALL-E 3",
    description: "Generador de imágenes de OpenAI",
    category: "Diseño e Imagen",
    tags: ["imágenes", "diseño", "arte"],
    pricing: "Incluido en ChatGPT Plus",
    pricingType: "subscription",
    url: "https://openai.com/dall-e-3",
    features: ["Generación precisa", "Integración con ChatGPT", "Edición de imágenes"]
  },
  {
    id: 8,
    name: "Canva AI",
    description: "Herramientas de diseño potenciadas con IA",
    category: "Diseño e Imagen",
    tags: ["diseño", "plantillas", "presentaciones"],
    pricing: "Gratis / $14.99/mes",
    pricingType: "freemium",
    url: "https://canva.com",
    features: ["Magic Design", "Background Remover", "Text to Image"]
  },
  {
    id: 9,
    name: "Adobe Firefly",
    description: "Suite de IA creativa de Adobe",
    category: "Diseño e Imagen",
    tags: ["diseño", "edición", "profesional"],
    pricing: "Incluido en Creative Cloud",
    pricingType: "subscription",
    url: "https://firefly.adobe.com",
    features: ["Generación de imágenes", "Efectos de texto", "Recoloring"]
  },
  {
    id: 10,
    name: "Stable Diffusion",
    description: "Modelo open source de generación de imágenes",
    category: "Diseño e Imagen",
    tags: ["open source", "imágenes", "personalizable"],
    pricing: "Gratis",
    pricingType: "free",
    url: "https://stability.ai",
    features: ["Código abierto", "Personalizable", "Sin restricciones"]
  },

  // Herramientas de Video
  {
    id: 11,
    name: "Synthesia",
    description: "Creación de videos con avatares de IA",
    category: "Video",
    tags: ["avatares", "presentaciones", "educación"],
    pricing: "$29-$89/mes",
    pricingType: "subscription",
    url: "https://synthesia.io",
    features: ["120+ avatares", "65+ idiomas", "Templates profesionales"]
  },
  {
    id: 12,
    name: "D-ID",
    description: "Videos con personas virtuales que hablan",
    category: "Video",
    tags: ["avatares", "talking heads", "marketing"],
    pricing: "$5.99-$299/mes",
    pricingType: "subscription",
    url: "https://d-id.com",
    features: ["Avatares realistas", "Sincronización labial", "API disponible"]
  },
  {
    id: 13,
    name: "Runway ML",
    description: "Suite creativa de IA para video",
    category: "Video",
    tags: ["edición", "efectos", "generación"],
    pricing: "$15-$95/mes",
    pricingType: "subscription",
    url: "https://runwayml.com",
    features: ["Gen-2 video", "Motion Brush", "Image to Video"]
  },
  {
    id: 14,
    name: "Descript",
    description: "Editor de video y podcast con IA",
    category: "Video",
    tags: ["edición", "transcripción", "podcast"],
    pricing: "Gratis / $15-$40/mes",
    pricingType: "freemium",
    url: "https://descript.com",
    features: ["Edición por texto", "Overdub", "Screen recording"]
  },
  {
    id: 15,
    name: "Pictory",
    description: "Convierte texto en videos profesionales",
    category: "Video",
    tags: ["texto a video", "marketing", "social media"],
    pricing: "$23-$119/mes",
    pricingType: "subscription",
    url: "https://pictory.ai",
    features: ["Script to Video", "Blog to Video", "Auto captions"]
  },

  // Herramientas de Audio
  {
    id: 16,
    name: "ElevenLabs",
    description: "Síntesis de voz ultra realista",
    category: "Audio",
    tags: ["voz", "narración", "doblaje"],
    pricing: "Gratis / $5-$330/mes",
    pricingType: "freemium",
    url: "https://elevenlabs.io",
    features: ["Clonación de voz", "29 idiomas", "Emociones en voz"]
  },
  {
    id: 17,
    name: "Murf.ai",
    description: "Generador de voiceovers profesionales",
    category: "Audio",
    tags: ["narración", "voiceover", "podcasts"],
    pricing: "$23-$79/mes",
    pricingType: "subscription",
    url: "https://murf.ai",
    features: ["120+ voces", "20+ idiomas", "Editor de audio"]
  },
  {
    id: 18,
    name: "Speechify",
    description: "Convierte texto en audio natural",
    category: "Audio",
    tags: ["texto a voz", "lectura", "accesibilidad"],
    pricing: "Gratis / $11.58/mes",
    pricingType: "freemium",
    url: "https://speechify.com",
    features: ["Voces naturales", "Velocidad ajustable", "OCR incluido"]
  },
  {
    id: 19,
    name: "AIVA",
    description: "Compositor de música con IA",
    category: "Audio",
    tags: ["música", "composición", "soundtracks"],
    pricing: "Gratis / €11-€33/mes",
    pricingType: "freemium",
    url: "https://aiva.ai",
    features: ["Múltiples géneros", "Derechos comerciales", "Edición MIDI"]
  },
  {
    id: 20,
    name: "Soundraw",
    description: "Generador de música libre de derechos",
    category: "Audio",
    tags: ["música", "background", "royalty-free"],
    pricing: "$16.99-$29.99/mes",
    pricingType: "subscription",
    url: "https://soundraw.io",
    features: ["Personalización total", "Descargas ilimitadas", "Uso comercial"]
  },

  // Herramientas de Productividad
  {
    id: 21,
    name: "Notion AI",
    description: "Asistente de IA integrado en Notion",
    category: "Productividad",
    tags: ["notas", "organización", "escritura"],
    pricing: "$10/mes adicional",
    pricingType: "subscription",
    url: "https://notion.so",
    features: ["Resúmenes", "Brainstorming", "Traducción"]
  },
  {
    id: 22,
    name: "Otter.ai",
    description: "Transcripción automática de reuniones",
    category: "Productividad",
    tags: ["transcripción", "reuniones", "notas"],
    pricing: "Gratis / $16.99/mes",
    pricingType: "freemium",
    url: "https://otter.ai",
    features: ["Transcripción en vivo", "Resúmenes", "Integración Zoom"]
  },
  {
    id: 23,
    name: "Grammarly",
    description: "Asistente de escritura con IA",
    category: "Productividad",
    tags: ["gramática", "escritura", "corrección"],
    pricing: "Gratis / $12-$15/mes",
    pricingType: "freemium",
    url: "https://grammarly.com",
    features: ["Corrección avanzada", "Tono", "Plagio"]
  },
  {
    id: 24,
    name: "Motion",
    description: "Planificador automático con IA",
    category: "Productividad",
    tags: ["calendario", "tareas", "planificación"],
    pricing: "$19-$34/mes",
    pricingType: "subscription",
    url: "https://motion.app",
    features: ["Auto-scheduling", "Priorización", "Integración calendario"]
  },
  {
    id: 25,
    name: "Reclaim.ai",
    description: "Optimización de calendario con IA",
    category: "Productividad",
    tags: ["calendario", "tiempo", "hábitos"],
    pricing: "Gratis / $8-$15/mes",
    pricingType: "freemium",
    url: "https://reclaim.ai",
    features: ["Smart scheduling", "Habit tracking", "Buffer time"]
  },

  // Herramientas de Marketing
  {
    id: 26,
    name: "Surfer SEO",
    description: "Optimización de contenido SEO con IA",
    category: "Marketing",
    tags: ["SEO", "contenido", "optimización"],
    pricing: "$69-$249/mes",
    pricingType: "subscription",
    url: "https://surferseo.com",
    features: ["Content Editor", "SERP Analyzer", "Keyword Research"]
  },
  {
    id: 27,
    name: "MarketMuse",
    description: "Estrategia de contenido impulsada por IA",
    category: "Marketing",
    tags: ["contenido", "estrategia", "SEO"],
    pricing: "$149-$399/mes",
    pricingType: "subscription",
    url: "https://marketmuse.com",
    features: ["Content Planning", "Topic Modeling", "Competitive Analysis"]
  },
  {
    id: 28,
    name: "Phrasee",
    description: "Optimización de copy para marketing",
    category: "Marketing",
    tags: ["email", "copy", "A/B testing"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://phrasee.co",
    features: ["Email optimization", "Brand voice", "Performance prediction"]
  },
  {
    id: 29,
    name: "Persado",
    description: "Generación de mensajes de marketing con IA",
    category: "Marketing",
    tags: ["messaging", "personalización", "conversión"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://persado.com",
    features: ["Language generation", "Emotional targeting", "Multi-channel"]
  },
  {
    id: 30,
    name: "Seventh Sense",
    description: "Optimización de email marketing con IA",
    category: "Marketing",
    tags: ["email", "automatización", "timing"],
    pricing: "$80-$450/mes",
    pricingType: "subscription",
    url: "https://theseventhsense.com",
    features: ["Send time optimization", "Engagement scoring", "Deliverability"]
  },

  // Herramientas de Análisis de Datos
  {
    id: 31,
    name: "Julius AI",
    description: "Análisis de datos conversacional",
    category: "Análisis de Datos",
    tags: ["datos", "visualización", "estadística"],
    pricing: "Gratis / $20/mes",
    pricingType: "freemium",
    url: "https://julius.ai",
    features: ["Chat con datos", "Visualizaciones", "Análisis estadístico"]
  },
  {
    id: 32,
    name: "DataRobot",
    description: "Plataforma de AutoML empresarial",
    category: "Análisis de Datos",
    tags: ["machine learning", "enterprise", "AutoML"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://datarobot.com",
    features: ["AutoML", "Model deployment", "MLOps"]
  },
  {
    id: 33,
    name: "H2O.ai",
    description: "Plataforma open source de ML",
    category: "Análisis de Datos",
    tags: ["machine learning", "open source", "AutoML"],
    pricing: "Gratis / Enterprise",
    pricingType: "freemium",
    url: "https://h2o.ai",
    features: ["AutoML", "Driverless AI", "Model interpretability"]
  },
  {
    id: 34,
    name: "Tableau AI",
    description: "Visualización de datos con IA",
    category: "Análisis de Datos",
    tags: ["visualización", "BI", "dashboards"],
    pricing: "$75-$150/mes",
    pricingType: "subscription",
    url: "https://tableau.com",
    features: ["Einstein Discovery", "Natural language", "Predictive analytics"]
  },
  {
    id: 35,
    name: "Power BI Copilot",
    description: "Análisis de datos con IA de Microsoft",
    category: "Análisis de Datos",
    tags: ["BI", "Microsoft", "visualización"],
    pricing: "$10-$20/usuario/mes",
    pricingType: "subscription",
    url: "https://powerbi.microsoft.com",
    features: ["Natural language queries", "Auto insights", "Data modeling"]
  },

  // Herramientas de Desarrollo
  {
    id: 36,
    name: "GitHub Copilot",
    description: "Asistente de programación con IA",
    category: "Desarrollo",
    tags: ["código", "programación", "GitHub"],
    pricing: "$10-$19/mes",
    pricingType: "subscription",
    url: "https://github.com/features/copilot",
    features: ["Autocompletado", "Generación de funciones", "Multi-lenguaje"]
  },
  {
    id: 37,
    name: "Tabnine",
    description: "Autocompletado de código con IA",
    category: "Desarrollo",
    tags: ["código", "IDE", "productividad"],
    pricing: "Gratis / $12-$39/mes",
    pricingType: "freemium",
    url: "https://tabnine.com",
    features: ["Code completion", "Team learning", "Privacy focused"]
  },
  {
    id: 38,
    name: "Replit AI",
    description: "IDE en la nube con asistente de IA",
    category: "Desarrollo",
    tags: ["IDE", "cloud", "colaboración"],
    pricing: "Gratis / $7-$20/mes",
    pricingType: "freemium",
    url: "https://replit.com",
    features: ["Ghostwriter", "Code generation", "Debugging"]
  },
  {
    id: 39,
    name: "Codeium",
    description: "Asistente de código gratuito",
    category: "Desarrollo",
    tags: ["código", "gratis", "autocompletado"],
    pricing: "Gratis / Teams $12/mes",
    pricingType: "freemium",
    url: "https://codeium.com",
    features: ["70+ lenguajes", "IDE support", "Chat assistant"]
  },
  {
    id: 40,
    name: "Amazon CodeWhisperer",
    description: "Asistente de código de AWS",
    category: "Desarrollo",
    tags: ["AWS", "código", "seguridad"],
    pricing: "Gratis / $19/mes",
    pricingType: "freemium",
    url: "https://aws.amazon.com/codewhisperer",
    features: ["Security scanning", "AWS optimization", "Multi-language"]
  },

  // Herramientas de Educación
  {
    id: 41,
    name: "Khan Academy AI",
    description: "Tutor personalizado con IA",
    category: "Educación",
    tags: ["aprendizaje", "tutor", "matemáticas"],
    pricing: "Gratis",
    pricingType: "free",
    url: "https://khanacademy.org",
    features: ["Khanmigo tutor", "Personalized learning", "Progress tracking"]
  },
  {
    id: 42,
    name: "Duolingo Max",
    description: "Aprendizaje de idiomas con IA avanzada",
    category: "Educación",
    tags: ["idiomas", "aprendizaje", "conversación"],
    pricing: "$29.99/mes",
    pricingType: "subscription",
    url: "https://duolingo.com",
    features: ["Roleplay", "Explain my answer", "AI conversations"]
  },
  {
    id: 43,
    name: "Socratic by Google",
    description: "Ayuda con tareas usando IA",
    category: "Educación",
    tags: ["tareas", "estudiantes", "matemáticas"],
    pricing: "Gratis",
    pricingType: "free",
    url: "https://socratic.org",
    features: ["Photo math solving", "Explanations", "Multiple subjects"]
  },
  {
    id: 44,
    name: "Gradescope",
    description: "Calificación automática con IA",
    category: "Educación",
    tags: ["calificación", "profesores", "evaluación"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://gradescope.com",
    features: ["AI grading", "Rubrics", "Analytics"]
  },
  {
    id: 45,
    name: "Century Tech",
    description: "Plataforma de aprendizaje adaptativo",
    category: "Educación",
    tags: ["adaptativo", "personalizado", "K-12"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://century.tech",
    features: ["Adaptive learning", "Real-time insights", "Curriculum aligned"]
  },

  // Herramientas de Investigación
  {
    id: 46,
    name: "Perplexity AI",
    description: "Motor de búsqueda conversacional con IA",
    category: "Investigación",
    tags: ["búsqueda", "investigación", "fuentes"],
    pricing: "Gratis / $20/mes",
    pricingType: "freemium",
    url: "https://perplexity.ai",
    features: ["Citas de fuentes", "Búsqueda web", "Modo académico"]
  },
  {
    id: 47,
    name: "Semantic Scholar",
    description: "Búsqueda de papers académicos con IA",
    category: "Investigación",
    tags: ["papers", "académico", "ciencia"],
    pricing: "Gratis",
    pricingType: "free",
    url: "https://semanticscholar.org",
    features: ["AI-powered search", "Citation graph", "Paper recommendations"]
  },
  {
    id: 48,
    name: "Research Rabbit",
    description: "Descubrimiento de literatura académica",
    category: "Investigación",
    tags: ["papers", "literatura", "colaboración"],
    pricing: "Gratis",
    pricingType: "free",
    url: "https://researchrabbit.ai",
    features: ["Paper discovery", "Citation mapping", "Collaboration"]
  },
  {
    id: 49,
    name: "Elicit",
    description: "Asistente de investigación con IA",
    category: "Investigación",
    tags: ["research", "papers", "análisis"],
    pricing: "Gratis / $10/mes",
    pricingType: "freemium",
    url: "https://elicit.org",
    features: ["Literature review", "Data extraction", "Summarization"]
  },
  {
    id: 50,
    name: "Consensus",
    description: "Búsqueda de evidencia científica",
    category: "Investigación",
    tags: ["ciencia", "evidencia", "papers"],
    pricing: "Gratis / $9.99/mes",
    pricingType: "freemium",
    url: "https://consensus.app",
    features: ["Evidence search", "Study quality", "Consensus meter"]
  },

  // Herramientas de Recursos Humanos
  {
    id: 51,
    name: "HireVue",
    description: "Entrevistas en video con análisis de IA",
    category: "Recursos Humanos",
    tags: ["reclutamiento", "entrevistas", "evaluación"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://hirevue.com",
    features: ["Video interviews", "AI assessment", "Bias reduction"]
  },
  {
    id: 52,
    name: "Pymetrics",
    description: "Evaluación de talento con juegos y IA",
    category: "Recursos Humanos",
    tags: ["evaluación", "soft skills", "juegos"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://pymetrics.ai",
    features: ["Gamified assessment", "Bias-free", "Soft skills"]
  },
  {
    id: 53,
    name: "Textio",
    description: "Optimización de textos de RRHH con IA",
    category: "Recursos Humanos",
    tags: ["escritura", "job posts", "inclusión"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://textio.com",
    features: ["Augmented writing", "Bias interruption", "Performance data"]
  },
  {
    id: 54,
    name: "Eightfold AI",
    description: "Plataforma de talento con IA",
    category: "Recursos Humanos",
    tags: ["talento", "career", "matching"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://eightfold.ai",
    features: ["Talent intelligence", "Career pathing", "Diversity insights"]
  },
  {
    id: 55,
    name: "Paradox",
    description: "Asistente conversacional para RRHH",
    category: "Recursos Humanos",
    tags: ["chatbot", "reclutamiento", "automatización"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://paradox.ai",
    features: ["Olivia assistant", "Scheduling", "Screening"]
  },

  // Herramientas de Ventas
  {
    id: 56,
    name: "Gong.io",
    description: "Inteligencia de ingresos con IA",
    category: "Ventas",
    tags: ["revenue", "calls", "coaching"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://gong.io",
    features: ["Call recording", "Deal intelligence", "Coaching insights"]
  },
  {
    id: 57,
    name: "Chorus.ai",
    description: "Inteligencia conversacional para ventas",
    category: "Ventas",
    tags: ["conversaciones", "análisis", "coaching"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://chorus.ai",
    features: ["Conversation intelligence", "Deal analytics", "Team performance"]
  },
  {
    id: 58,
    name: "Crystal Knows",
    description: "Perfiles de personalidad para ventas",
    category: "Ventas",
    tags: ["personalidad", "comunicación", "DISC"],
    pricing: "$49/mes",
    pricingType: "subscription",
    url: "https://crystalknows.com",
    features: ["Personality insights", "Communication tips", "Email coaching"]
  },
  {
    id: 59,
    name: "Outreach",
    description: "Plataforma de engagement de ventas",
    category: "Ventas",
    tags: ["automatización", "sequences", "analytics"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://outreach.io",
    features: ["Sales automation", "AI insights", "Forecasting"]
  },
  {
    id: 60,
    name: "Salesloft",
    description: "Plataforma de engagement con IA",
    category: "Ventas",
    tags: ["cadences", "engagement", "coaching"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://salesloft.com",
    features: ["Rhythm AI", "Conversation intelligence", "Pipeline management"]
  },

  // Herramientas de Customer Service
  {
    id: 61,
    name: "Intercom AI",
    description: "Chatbot y soporte al cliente con IA",
    category: "Customer Service",
    tags: ["chatbot", "soporte", "automatización"],
    pricing: "$74-$395/mes",
    pricingType: "subscription",
    url: "https://intercom.com",
    features: ["Resolution Bot", "AI answers", "Workflow automation"]
  },
  {
    id: 62,
    name: "Zendesk AI",
    description: "Suite de soporte con IA integrada",
    category: "Customer Service",
    tags: ["tickets", "soporte", "automatización"],
    pricing: "$55-$115/agente/mes",
    pricingType: "subscription",
    url: "https://zendesk.com",
    features: ["Answer Bot", "Intelligence panel", "Macro suggestions"]
  },
  {
    id: 63,
    name: "Ada",
    description: "Plataforma de chatbot conversacional",
    category: "Customer Service",
    tags: ["chatbot", "automatización", "personalización"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://ada.cx",
    features: ["No-code builder", "Personalization", "Analytics"]
  },
  {
    id: 64,
    name: "Drift",
    description: "Marketing conversacional con IA",
    category: "Customer Service",
    tags: ["chat", "conversiones", "qualifying"],
    pricing: "$2,500/mes+",
    pricingType: "subscription",
    url: "https://drift.com",
    features: ["Conversational AI", "Meeting booking", "Lead routing"]
  },
  {
    id: 65,
    name: "Kustomer",
    description: "CRM de servicio al cliente con IA",
    category: "Customer Service",
    tags: ["CRM", "omnichannel", "automatización"],
    pricing: "$89-$169/mes",
    pricingType: "subscription",
    url: "https://kustomer.com",
    features: ["AI-powered CRM", "Omnichannel", "Workflow automation"]
  },

  // Herramientas de Finanzas
  {
    id: 66,
    name: "Mint AI",
    description: "Gestión de finanzas personales con IA",
    category: "Finanzas",
    tags: ["personal", "presupuesto", "ahorro"],
    pricing: "Gratis",
    pricingType: "free",
    url: "https://mint.com",
    features: ["Categorización", "Insights", "Alertas"]
  },
  {
    id: 67,
    name: "Klarity",
    description: "Automatización de documentos financieros",
    category: "Finanzas",
    tags: ["documentos", "automatización", "accounting"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://klarity.ai",
    features: ["Document review", "Data extraction", "Compliance"]
  },
  {
    id: 68,
    name: "AlphaSense",
    description: "Inteligencia de mercado con IA",
    category: "Finanzas",
    tags: ["market intelligence", "research", "análisis"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://alpha-sense.com",
    features: ["Market intelligence", "Earnings search", "Expert insights"]
  },
  {
    id: 69,
    name: "Truewind",
    description: "Bookkeeping y contabilidad con IA",
    category: "Finanzas",
    tags: ["contabilidad", "bookkeeping", "startups"],
    pricing: "$299-$2,999/mes",
    pricingType: "subscription",
    url: "https://truewind.ai",
    features: ["AI bookkeeping", "Financial reports", "Integration"]
  },
  {
    id: 70,
    name: "Datarails",
    description: "FP&A y reporting con IA",
    category: "Finanzas",
    tags: ["FP&A", "reporting", "Excel"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://datarails.com",
    features: ["Excel automation", "Consolidation", "Reporting"]
  },

  // Herramientas de Legal
  {
    id: 71,
    name: "Harvey AI",
    description: "Asistente legal con IA",
    category: "Legal",
    tags: ["contratos", "research", "drafting"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://harvey.ai",
    features: ["Legal research", "Contract analysis", "Document drafting"]
  },
  {
    id: 72,
    name: "Casetext",
    description: "Investigación legal con IA",
    category: "Legal",
    tags: ["research", "cases", "análisis"],
    pricing: "$65-$500/mes",
    pricingType: "subscription",
    url: "https://casetext.com",
    features: ["CARA AI", "Case law search", "Brief analysis"]
  },
  {
    id: 73,
    name: "LawGeex",
    description: "Revisión de contratos con IA",
    category: "Legal",
    tags: ["contratos", "revisión", "automatización"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://lawgeex.com",
    features: ["Contract review", "Redlining", "Policy compliance"]
  },
  {
    id: 74,
    name: "Luminance",
    description: "Due diligence legal con IA",
    category: "Legal",
    tags: ["due diligence", "M&A", "documentos"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://luminance.com",
    features: ["Document analysis", "Pattern recognition", "Risk identification"]
  },
  {
    id: 75,
    name: "DoNotPay",
    description: "Robot abogado para consumidores",
    category: "Legal",
    tags: ["consumidor", "disputas", "automatización"],
    pricing: "$36/año",
    pricingType: "subscription",
    url: "https://donotpay.com",
    features: ["Dispute letters", "Small claims", "Cancellations"]
  },

  // Herramientas de Salud
  {
    id: 76,
    name: "Ada Health",
    description: "Evaluación de síntomas con IA",
    category: "Salud",
    tags: ["síntomas", "diagnóstico", "salud"],
    pricing: "Gratis / Enterprise",
    pricingType: "freemium",
    url: "https://ada.com",
    features: ["Symptom assessment", "Health tracking", "Doctor reports"]
  },
  {
    id: 77,
    name: "Babylon Health",
    description: "Consultas médicas con IA",
    category: "Salud",
    tags: ["telemedicina", "consultas", "IA"],
    pricing: "Variable por región",
    pricingType: "subscription",
    url: "https://babylonhealth.com",
    features: ["AI consultations", "Symptom checker", "Health monitoring"]
  },
  {
    id: 78,
    name: "Viz.ai",
    description: "Detección de strokes con IA",
    category: "Salud",
    tags: ["radiología", "emergencias", "stroke"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://viz.ai",
    features: ["Stroke detection", "Care coordination", "Real-time alerts"]
  },
  {
    id: 79,
    name: "PathAI",
    description: "Patología asistida por IA",
    category: "Salud",
    tags: ["patología", "diagnóstico", "cancer"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://pathai.com",
    features: ["Pathology analysis", "Drug development", "Biomarker discovery"]
  },
  {
    id: 80,
    name: "Tempus",
    description: "Medicina de precisión con IA",
    category: "Salud",
    tags: ["genómica", "oncología", "datos"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://tempus.com",
    features: ["Genomic sequencing", "Clinical insights", "Data platform"]
  },

  // Herramientas de E-commerce
  {
    id: 81,
    name: "Shopify Magic",
    description: "Herramientas de IA para e-commerce",
    category: "E-commerce",
    tags: ["tienda online", "productos", "descripciones"],
    pricing: "Incluido en Shopify",
    pricingType: "subscription",
    url: "https://shopify.com",
    features: ["Product descriptions", "Email campaigns", "Store design"]
  },
  {
    id: 82,
    name: "Algolia AI",
    description: "Búsqueda inteligente para e-commerce",
    category: "E-commerce",
    tags: ["búsqueda", "recomendaciones", "personalización"],
    pricing: "$0-$2,000+/mes",
    pricingType: "subscription",
    url: "https://algolia.com",
    features: ["AI search", "Personalization", "Recommendations"]
  },
  {
    id: 83,
    name: "Dynamic Yield",
    description: "Personalización para e-commerce",
    category: "E-commerce",
    tags: ["personalización", "A/B testing", "recomendaciones"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://dynamicyield.com",
    features: ["Personalization", "Product recommendations", "Email targeting"]
  },
  {
    id: 84,
    name: "Nosto",
    description: "Plataforma de personalización commerce",
    category: "E-commerce",
    tags: ["personalización", "email", "onsite"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://nosto.com",
    features: ["Product recommendations", "Content personalization", "Email"]
  },
  {
    id: 85,
    name: "Klevu",
    description: "Búsqueda y descubrimiento con IA",
    category: "E-commerce",
    tags: ["búsqueda", "discovery", "conversión"],
    pricing: "$299-$999/mes",
    pricingType: "subscription",
    url: "https://klevu.com",
    features: ["Smart search", "Category merchandising", "Recommendations"]
  },

  // Herramientas de Ciberseguridad
  {
    id: 86,
    name: "Darktrace",
    description: "Ciberseguridad autónoma con IA",
    category: "Ciberseguridad",
    tags: ["detección", "respuesta", "enterprise"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://darktrace.com",
    features: ["Threat detection", "Autonomous response", "Attack visualization"]
  },
  {
    id: 87,
    name: "CrowdStrike Falcon",
    description: "Protección endpoint con IA",
    category: "Ciberseguridad",
    tags: ["endpoint", "EDR", "prevención"],
    pricing: "$10-$25/endpoint/mes",
    pricingType: "subscription",
    url: "https://crowdstrike.com",
    features: ["AI-powered EDR", "Threat intelligence", "Cloud security"]
  },
  {
    id: 88,
    name: "Cylance",
    description: "Antivirus predictivo con IA",
    category: "Ciberseguridad",
    tags: ["antivirus", "prevención", "machine learning"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://cylance.com",
    features: ["Predictive prevention", "Zero-day protection", "Lightweight agent"]
  },
  {
    id: 89,
    name: "Vectra AI",
    description: "Detección de amenazas en red",
    category: "Ciberseguridad",
    tags: ["NDR", "detección", "red"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://vectra.ai",
    features: ["Network detection", "Attack campaigns", "Threat prioritization"]
  },
  {
    id: 90,
    name: "SentinelOne",
    description: "Plataforma XDR autónoma",
    category: "Ciberseguridad",
    tags: ["XDR", "endpoint", "cloud"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://sentinelone.com",
    features: ["Autonomous XDR", "EDR", "Cloud workload protection"]
  },

  // Herramientas de Automatización
  {
    id: 91,
    name: "Zapier AI",
    description: "Automatización con componentes de IA",
    category: "Automatización",
    tags: ["workflows", "integración", "no-code"],
    pricing: "Gratis / $19.99-$799/mes",
    pricingType: "freemium",
    url: "https://zapier.com",
    features: ["AI fields", "Formatter", "Code steps"]
  },
  {
    id: 92,
    name: "Make (Integromat)",
    description: "Automatización visual con IA",
    category: "Automatización",
    tags: ["workflows", "visual", "integración"],
    pricing: "Gratis / $9-$299/mes",
    pricingType: "freemium",
    url: "https://make.com",
    features: ["Visual builder", "AI helpers", "Advanced logic"]
  },
  {
    id: 93,
    name: "UiPath",
    description: "RPA empresarial con IA",
    category: "Automatización",
    tags: ["RPA", "enterprise", "bots"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://uipath.com",
    features: ["Process mining", "Document understanding", "AI Center"]
  },
  {
    id: 94,
    name: "Automation Anywhere",
    description: "Plataforma RPA con IA integrada",
    category: "Automatización",
    tags: ["RPA", "bots", "IQ Bot"],
    pricing: "Contactar ventas",
    pricingType: "subscription",
    url: "https://automationanywhere.com",
    features: ["IQ Bot", "Discovery Bot", "AARI"]
  },
  {
    id: 95,
    name: "Power Automate",
    description: "Automatización de Microsoft con IA",
    category: "Automatización",
    tags: ["Microsoft", "workflows", "RPA"],
    pricing: "$15-$40/usuario/mes",
    pricingType: "subscription",
    url: "https://powerautomate.microsoft.com",
    features: ["AI Builder", "Process advisor", "Desktop flows"]
  },

  // Herramientas de Social Media
  {
    id: 96,
    name: "Lately AI",
    description: "Generación de contenido social con IA",
    category: "Social Media",
    tags: ["contenido", "programación", "análisis"],
    pricing: "$39-$219/mes",
    pricingType: "subscription",
    url: "https://lately.ai",
    features: ["Content generation", "Social scheduling", "Analytics"]
  },
  {
    id: 97,
    name: "Buffer AI Assistant",
    description: "Asistente de IA para social media",
    category: "Social Media",
    tags: ["programación", "ideas", "engagement"],
    pricing: "$5-$100/mes",
    pricingType: "subscription",
    url: "https://buffer.com",
    features: ["Post ideas", "Repurposing", "Best times"]
  },
  {
    id: 98,
    name: "Hootsuite Insights",
    description: "Análisis social con IA",
    category: "Social Media",
    tags: ["monitoreo", "análisis", "sentiment"],
    pricing: "$49-$739/mes",
    pricingType: "subscription",
    url: "https://hootsuite.com",
    features: ["Social listening", "Sentiment analysis", "Trend detection"]
  },
  {
    id: 99,
    name: "Sprout Social",
    description: "Gestión social con inteligencia",
    category: "Social Media",
    tags: ["gestión", "análisis", "engagement"],
    pricing: "$249-$499/mes",
    pricingType: "subscription",
    url: "https://sproutsocial.com",
    features: ["Smart Inbox", "Sentiment analysis", "Optimal send times"]
  },
  {
    id: 100,
    name: "FeedHive",
    description: "Gestión de contenido con IA",
    category: "Social Media",
    tags: ["contenido", "predicción", "scheduling"],
    pricing: "$19-$299/mes",
    pricingType: "subscription",
    url: "https://feedhive.com",
    features: ["AI writing assistant", "Performance prediction", "Content recycling"]
  },

  // Herramientas adicionales
  {
    id: 101,
    name: "Loom AI",
    description: "Grabación de videos con transcripción IA",
    category: "Video",
    tags: ["grabación", "transcripción", "compartir"],
    pricing: "Gratis / $8-$20/mes",
    pricingType: "freemium",
    url: "https://loom.com",
    features: ["Auto titles", "Summaries", "Chapters"]
  },
  {
    id: 102,
    name: "Beautiful.ai",
    description: "Presentaciones con diseño automático",
    category: "Productividad",
    tags: ["presentaciones", "diseño", "templates"],
    pricing: "$12-$50/mes",
    pricingType: "subscription",
    url: "https://beautiful.ai",
    features: ["Smart templates", "Design AI", "Brand consistency"]
  },
  {
    id: 103,
    name: "Mem",
    description: "Notas con IA y búsqueda inteligente",
    category: "Productividad",
    tags: ["notas", "conocimiento", "búsqueda"],
    pricing: "$10-$15/mes",
    pricingType: "subscription",
    url: "https://mem.ai",
    features: ["Smart search", "AI chat", "Auto-organization"]
  },
  {
    id: 104,
    name: "Warp",
    description: "Terminal moderno con IA",
    category: "Desarrollo",
    tags: ["terminal", "CLI", "productividad"],
    pricing: "Gratis / $20/mes",
    pricingType: "freemium",
    url: "https://warp.dev",
    features: ["AI commands", "Workflows", "Knowledge sharing"]
  },
  {
    id: 105,
    name: "Pieces for Developers",
    description: "Gestión de snippets con IA",
    category: "Desarrollo",
    tags: ["snippets", "código", "productividad"],
    pricing: "Gratis / Pro próximamente",
    pricingType: "free",
    url: "https://pieces.app",
    features: ["Code snippets", "AI search", "Context awareness"]
  }
];

export default function ArsenalTecnologico() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [selectedPricing, setSelectedPricing] = useState('todos');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');

  // Obtener categorías únicas
  const categories = ['todas', ...Array.from(new Set(toolsDatabase.map(tool => tool.category)))];

  // Filtrar herramientas
  const filteredTools = useMemo(() => {
    let filtered = toolsDatabase;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtro por categoría
    if (selectedCategory !== 'todas') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    // Filtro por precio
    if (selectedPricing !== 'todos') {
      filtered = filtered.filter(tool => tool.pricingType === selectedPricing);
    }

    // Ordenar
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedPricing, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900">Arsenal Tecnológico</h1>
          <p className="mt-2 text-lg text-gray-600">
            Más de {toolsDatabase.length} herramientas de IA para potenciar tu negocio
          </p>
        </div>
      </div>

      {/* Filtros y controles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar herramientas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Controles de filtro */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Precio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de precio
              </label>
              <select
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos</option>
                <option value="free">Gratis</option>
                <option value="freemium">Freemium</option>
                <option value="paid">Pago único</option>
                <option value="subscription">Suscripción</option>
              </select>
            </div>

            {/* Ordenar por */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Nombre</option>
                <option value="category">Categoría</option>
              </select>
            </div>

            {/* Vista */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vista
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 px-3 py-2 rounded-lg border ${
                    viewMode === 'grid'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  <Grid className="h-5 w-5 mx-auto" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 px-3 py-2 rounded-lg border ${
                    viewMode === 'list'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300'
                  }`}
                >
                  <List className="h-5 w-5 mx-auto" />
                </button>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredTools.length} herramientas encontradas
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('todas');
                setSelectedPricing('todos');
              }}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>

      {/* Lista de herramientas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map(tool => (
              <div key={tool.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                
                <div className="mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {tool.category}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>{tool.pricing}</span>
                </div>

                <div className="space-y-1">
                  {tool.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="text-xs text-gray-500">
                      • {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {tool.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Herramienta
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Características
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enlace
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTools.map(tool => (
                  <tr key={tool.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{tool.name}</div>
                        <div className="text-sm text-gray-500">{tool.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {tool.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tool.pricing}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="max-w-xs">
                        {tool.features.slice(0, 2).join(', ')}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}