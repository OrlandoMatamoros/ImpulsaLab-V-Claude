'use client';

import { useState } from 'react';
import Link from 'next/link';
import HorizontalTechTicker from './HorizontalTechTicker';
import { getToolIcon } from './icons/ToolIcons';

interface Tool {
  name: string;
  category: string;
  description: string;
  url: string;
  keywords: string[];
  logo: string;
  useCase?: string;
}

// Base de datos completa de herramientas (mínimo 5 por categoría)
const allTools: Tool[] = [
  // CHAT IA (10 herramientas)
  { 
    name: 'ChatGPT', 
    category: 'Chat IA', 
    description: 'Asistente de IA conversacional avanzado de OpenAI', 
    url: 'https://chatgpt.com', 
    keywords: ['ai', 'asistente', 'chat', 'texto', 'gpt', 'conversación'],
    logo: '🤖',
    useCase: 'Ideal para: consultas generales, generación de contenido, análisis'
  },
  { 
    name: 'Claude', 
    category: 'Chat IA', 
    description: 'IA para análisis profundo y escritura avanzada', 
    url: 'https://claude.ai', 
    keywords: ['ai', 'asistente', 'analisis', 'texto', 'anthropic'],
    logo: '🧠',
    useCase: 'Ideal para: análisis complejos, escritura técnica, código'
  },
  { 
    name: 'Gemini', 
    category: 'Chat IA', 
    description: 'IA multimodal de Google con acceso a información actualizada', 
    url: 'https://gemini.google.com', 
    keywords: ['ai', 'google', 'multimodal', 'búsqueda'],
    logo: '✨',
    useCase: 'Ideal para: búsquedas actualizadas, análisis de imágenes'
  },
  { 
    name: 'Perplexity', 
    category: 'Chat IA', 
    description: 'Motor de respuestas IA con fuentes en tiempo real', 
    url: 'https://perplexity.ai', 
    keywords: ['búsqueda', 'ai', 'investigación', 'fuentes'],
    logo: '🔍',
    useCase: 'Ideal para: investigación con fuentes verificadas'
  },
  { 
    name: 'Microsoft Copilot', 
    category: 'Chat IA', 
    description: 'Asistente IA de Microsoft integrado con Bing', 
    url: 'https://copilot.microsoft.com', 
    keywords: ['microsoft', 'bing', 'ai', 'chat'],
    logo: '🚁',
    useCase: 'Ideal para: búsquedas web, generación de imágenes'
  },
  { 
    name: 'Poe', 
    category: 'Chat IA', 
    description: 'Acceso a múltiples modelos de IA en una plataforma', 
    url: 'https://poe.com', 
    keywords: ['ai', 'múltiple', 'chat', 'modelos'],
    logo: '🤝',
    useCase: 'Ideal para: comparar respuestas de diferentes IAs'
  },
  { 
    name: 'Pi', 
    category: 'Chat IA', 
    description: 'IA personal diseñada para conversaciones empáticas', 
    url: 'https://pi.ai', 
    keywords: ['ai', 'personal', 'empatía', 'conversación'],
    logo: '💬',
    useCase: 'Ideal para: conversaciones personales, apoyo emocional'
  },
  { 
    name: 'Character AI', 
    category: 'Chat IA', 
    description: 'Chat con personajes IA personalizados', 
    url: 'https://character.ai', 
    keywords: ['ai', 'personajes', 'roleplay', 'chat'],
    logo: '🎭',
    useCase: 'Ideal para: entretenimiento, aprendizaje interactivo'
  },
  { 
    name: 'HuggingChat', 
    category: 'Chat IA', 
    description: 'Chat IA open source de Hugging Face', 
    url: 'https://huggingface.co/chat', 
    keywords: ['ai', 'open source', 'chat', 'hugging face'],
    logo: '🤗',
    useCase: 'Ideal para: alternativa open source, privacidad'
  },
  { 
    name: 'You.com', 
    category: 'Chat IA', 
    description: 'Motor de búsqueda con IA conversacional', 
    url: 'https://you.com', 
    keywords: ['búsqueda', 'ai', 'chat', 'privacidad'],
    logo: '🔎',
    useCase: 'Ideal para: búsquedas privadas con IA'
  },
  
  // DISEÑO (10 herramientas)
  { 
    name: 'Figma', 
    category: 'Diseño', 
    description: 'Herramienta de diseño colaborativo en la nube', 
    url: 'https://figma.com', 
    keywords: ['diseño', 'ui', 'ux', 'prototipo', 'colaborativo'],
    logo: '🎨',
    useCase: 'Ideal para: diseño UI/UX, prototipos, trabajo en equipo'
  },
  { 
    name: 'Canva', 
    category: 'Diseño', 
    description: 'Diseño gráfico simplificado con plantillas y IA', 
    url: 'https://canva.com', 
    keywords: ['diseño', 'plantillas', 'gráfico', 'social media'],
    logo: '🎯',
    useCase: 'Ideal para: posts sociales, presentaciones, diseño rápido'
  },
  { 
    name: 'Adobe Firefly', 
    category: 'Diseño', 
    description: 'IA generativa integrada en Creative Cloud', 
    url: 'https://firefly.adobe.com', 
    keywords: ['adobe', 'imagen', 'ai', 'diseño'],
    logo: '🔥',
    useCase: 'Ideal para: edición profesional con IA'
  },
  { 
    name: 'Framer', 
    category: 'Diseño', 
    description: 'Diseño y desarrollo web con IA', 
    url: 'https://framer.com', 
    keywords: ['web', 'diseño', 'no-code', 'ai'],
    logo: '🖼️',
    useCase: 'Ideal para: sitios web interactivos sin código'
  },
  { 
    name: 'Sketch', 
    category: 'Diseño', 
    description: 'Diseño de interfaces para Mac', 
    url: 'https://sketch.com', 
    keywords: ['diseño', 'ui', 'mac', 'interfaces'],
    logo: '💎',
    useCase: 'Ideal para: diseño de apps y sistemas de diseño'
  },
  { 
    name: 'Webflow', 
    category: 'Diseño', 
    description: 'Constructor visual de sitios web profesionales', 
    url: 'https://webflow.com', 
    keywords: ['web', 'diseño', 'cms', 'no-code'],
    logo: '🌐',
    useCase: 'Ideal para: sitios web complejos sin programar'
  },
  { 
    name: 'Spline', 
    category: 'Diseño', 
    description: 'Diseño 3D colaborativo en el navegador', 
    url: 'https://spline.design', 
    keywords: ['3d', 'diseño', 'web', 'interactivo'],
    logo: '🎲',
    useCase: 'Ideal para: diseños 3D interactivos para web'
  },
  { 
    name: 'Penpot', 
    category: 'Diseño', 
    description: 'Diseño open source para equipos', 
    url: 'https://penpot.app', 
    keywords: ['diseño', 'open source', 'ui', 'colaborativo'],
    logo: '🖊️',
    useCase: 'Ideal para: alternativa open source a Figma'
  },
  { 
    name: 'Lunacy', 
    category: 'Diseño', 
    description: 'Editor gráfico gratuito con IA', 
    url: 'https://icons8.com/lunacy', 
    keywords: ['diseño', 'gratis', 'windows', 'ai'],
    logo: '🌙',
    useCase: 'Ideal para: diseño en Windows, recursos gratuitos'
  },
  { 
    name: 'Rive', 
    category: 'Diseño', 
    description: 'Animaciones interactivas para apps y web', 
    url: 'https://rive.app', 
    keywords: ['animación', 'interactivo', 'diseño', 'motion'],
    logo: '🎬',
    useCase: 'Ideal para: animaciones complejas e interactivas'
  },
  
  // IMÁGENES IA (10 herramientas)
  { 
    name: 'DALL-E 3', 
    category: 'Imágenes IA', 
    description: 'Generación de imágenes con IA de OpenAI', 
    url: 'https://openai.com/dall-e-3', 
    keywords: ['imagen', 'ai', 'generación', 'arte', 'dall-e'],
    logo: '🖼️',
    useCase: 'Ideal para: ilustraciones únicas, conceptos visuales'
  },
  { 
    name: 'Midjourney', 
    category: 'Imágenes IA', 
    description: 'Creación artística avanzada con IA', 
    url: 'https://midjourney.com', 
    keywords: ['imagen', 'ai', 'arte', 'creativo'],
    logo: '🎭',
    useCase: 'Ideal para: arte conceptual, imágenes artísticas'
  },
  { 
    name: 'Stable Diffusion', 
    category: 'Imágenes IA', 
    description: 'Modelo open source para generación de imágenes', 
    url: 'https://stability.ai', 
    keywords: ['imagen', 'ai', 'open source', 'stable'],
    logo: '🌟',
    useCase: 'Ideal para: generación personalizable, uso comercial'
  },
  { 
    name: 'Leonardo AI', 
    category: 'Imágenes IA', 
    description: 'Plataforma de generación con control granular', 
    url: 'https://leonardo.ai', 
    keywords: ['imagen', 'ai', 'diseño', 'gaming'],
    logo: '🎨',
    useCase: 'Ideal para: assets para juegos, concept art'
  },
  { 
    name: 'Ideogram', 
    category: 'Imágenes IA', 
    description: 'IA especializada en texto dentro de imágenes', 
    url: 'https://ideogram.ai', 
    keywords: ['imagen', 'texto', 'ai', 'tipografía'],
    logo: '📝',
    useCase: 'Ideal para: logos, pósters con texto'
  },
  { 
    name: 'Bing Image Creator', 
    category: 'Imágenes IA', 
    description: 'Generador de imágenes gratuito de Microsoft', 
    url: 'https://bing.com/create', 
    keywords: ['imagen', 'microsoft', 'gratis', 'ai'],
    logo: '🖌️',
    useCase: 'Ideal para: generación rápida y gratuita'
  },
  { 
    name: 'Playground AI', 
    category: 'Imágenes IA', 
    description: 'Editor de imágenes IA con herramientas avanzadas', 
    url: 'https://playgroundai.com', 
    keywords: ['imagen', 'editor', 'ai', 'filtros'],
    logo: '🎮',
    useCase: 'Ideal para: edición y generación combinadas'
  },
  { 
    name: 'NightCafe', 
    category: 'Imágenes IA', 
    description: 'Comunidad de arte IA con múltiples modelos', 
    url: 'https://nightcafe.studio', 
    keywords: ['arte', 'comunidad', 'ai', 'imagen'],
    logo: '🌃',
    useCase: 'Ideal para: explorar estilos artísticos, comunidad'
  },
  { 
    name: 'Lexica', 
    category: 'Imágenes IA', 
    description: 'Motor de búsqueda de imágenes generadas por IA', 
    url: 'https://lexica.art', 
    keywords: ['búsqueda', 'imagen', 'ai', 'prompts'],
    logo: '🔍',
    useCase: 'Ideal para: inspiración, encontrar prompts'
  },
  { 
    name: 'Clipdrop', 
    category: 'Imágenes IA', 
    description: 'Suite de herramientas IA para edición de imágenes', 
    url: 'https://clipdrop.co', 
    keywords: ['edición', 'imagen', 'ai', 'herramientas'],
    logo: '✂️',
    useCase: 'Ideal para: remover fondos, upscaling, edición rápida'
  },
  
  // VIDEO IA (5 herramientas)
  { 
    name: 'Synthesia', 
    category: 'Video IA', 
    description: 'Creación de videos con avatares IA', 
    url: 'https://synthesia.io', 
    keywords: ['video', 'ai', 'avatar', 'presentación'],
    logo: '🎬',
    useCase: 'Ideal para: videos corporativos, formación'
  },
  { 
    name: 'RunwayML', 
    category: 'Video IA', 
    description: 'Suite completa de herramientas IA para video', 
    url: 'https://runwayml.com', 
    keywords: ['video', 'edición', 'ai', 'efectos'],
    logo: '🛫',
    useCase: 'Ideal para: edición avanzada, efectos VFX'
  },
  { 
    name: 'Pika Labs', 
    category: 'Video IA', 
    description: 'Generación de videos desde texto o imágenes', 
    url: 'https://pika.art', 
    keywords: ['video', 'generación', 'ai', 'animación'],
    logo: '⚡',
    useCase: 'Ideal para: videos cortos, animaciones'
  },
  { 
    name: 'HeyGen', 
    category: 'Video IA', 
    description: 'Videos con avatares IA para marketing', 
    url: 'https://heygen.com', 
    keywords: ['video', 'avatar', 'marketing', 'ai'],
    logo: '👋',
    useCase: 'Ideal para: videos de ventas personalizados'
  },
  { 
    name: 'Descript', 
    category: 'Video IA', 
    description: 'Edición de video como si fuera texto', 
    url: 'https://descript.com', 
    keywords: ['video', 'edición', 'podcast', 'transcripción'],
    logo: '📹',
    useCase: 'Ideal para: podcasts, videos YouTube'
  },
  
  // PRODUCTIVIDAD (6 herramientas)
  { 
    name: 'Notion', 
    category: 'Productividad', 
    description: 'Workspace todo-en-uno para notas y gestión', 
    url: 'https://notion.so', 
    keywords: ['productividad', 'notas', 'gestión', 'workspace'],
    logo: '📝',
    useCase: 'Ideal para: gestión de proyectos, wiki personal'
  },
  { 
    name: 'Obsidian', 
    category: 'Productividad', 
    description: 'Notas con conexiones y gestión del conocimiento', 
    url: 'https://obsidian.md', 
    keywords: ['notas', 'conocimiento', 'markdown', 'local'],
    logo: '💎',
    useCase: 'Ideal para: segunda cerebro, investigación'
  },
  { 
    name: 'ClickUp', 
    category: 'Productividad', 
    description: 'Plataforma todo-en-uno con IA para equipos', 
    url: 'https://clickup.com', 
    keywords: ['gestión', 'proyectos', 'equipo', 'ai'],
    logo: '✅',
    useCase: 'Ideal para: gestión de proyectos complejos'
  },
  { 
    name: 'Monday.com', 
    category: 'Productividad', 
    description: 'Work OS con automatizaciones y IA', 
    url: 'https://monday.com', 
    keywords: ['gestión', 'proyectos', 'equipo', 'workflow'],
    logo: '📅',
    useCase: 'Ideal para: flujos de trabajo personalizados'
  },
  { 
    name: 'Airtable', 
    category: 'Productividad', 
    description: 'Base de datos visual con funciones de hoja de cálculo', 
    url: 'https://airtable.com', 
    keywords: ['base datos', 'spreadsheet', 'colaboración', 'automatización'],
    logo: '📊',
    useCase: 'Ideal para: CRM personalizado, inventarios'
  },
  { 
    name: 'Asana', 
    category: 'Productividad', 
    description: 'Gestión de tareas y proyectos en equipo', 
    url: 'https://asana.com', 
    keywords: ['tareas', 'proyectos', 'equipo', 'colaboración'],
    logo: '🎯',
    useCase: 'Ideal para: seguimiento de proyectos en equipo'
  },
  
  // ESCRITURA (5 herramientas)
  { 
    name: 'Jasper', 
    category: 'Escritura', 
    description: 'IA para copywriting y contenido de marketing', 
    url: 'https://jasper.ai', 
    keywords: ['escritura', 'copy', 'marketing', 'contenido'],
    logo: '✍️',
    useCase: 'Ideal para: blogs, copy publicitario, emails'
  },
  { 
    name: 'Copy.ai', 
    category: 'Escritura', 
    description: 'Generador de copy para marketing y ventas', 
    url: 'https://copy.ai', 
    keywords: ['copy', 'marketing', 'ventas', 'ai'],
    logo: '📄',
    useCase: 'Ideal para: ads, emails, descripciones'
  },
  { 
    name: 'Writesonic', 
    category: 'Escritura', 
    description: 'Plataforma de escritura IA con SEO integrado', 
    url: 'https://writesonic.com', 
    keywords: ['escritura', 'seo', 'contenido', 'ai'],
    logo: '🚀',
    useCase: 'Ideal para: artículos SEO, contenido web'
  },
  { 
    name: 'Grammarly', 
    category: 'Escritura', 
    description: 'Corrector avanzado con sugerencias de IA', 
    url: 'https://grammarly.com', 
    keywords: ['gramática', 'escritura', 'corrección', 'ai'],
    logo: '📝',
    useCase: 'Ideal para: corrección y mejora de estilo'
  },
  { 
    name: 'Quillbot', 
    category: 'Escritura', 
    description: 'Parafraseo y mejora de textos con IA', 
    url: 'https://quillbot.com', 
    keywords: ['parafraseo', 'escritura', 'mejora', 'ai'],
    logo: '🪶',
    useCase: 'Ideal para: reescribir y mejorar textos'
  },
  
  // AUDIO/MÚSICA (5 herramientas)
  { 
    name: 'ElevenLabs', 
    category: 'Audio/Música', 
    description: 'Las voces IA más realistas del mercado', 
    url: 'https://elevenlabs.io', 
    keywords: ['voz', 'audio', 'ai', 'text-to-speech'],
    logo: '🎙️',
    useCase: 'Ideal para: narración, doblaje, audiolibros'
  },
  { 
    name: 'Murf AI', 
    category: 'Audio/Música', 
    description: 'Generación de voces profesionales para videos', 
    url: 'https://murf.ai', 
    keywords: ['voz', 'narración', 'ai', 'audio'],
    logo: '🗣️',
    useCase: 'Ideal para: videos corporativos, e-learning'
  },
  { 
    name: 'Suno AI', 
    category: 'Audio/Música', 
    description: 'Crea canciones completas con IA', 
    url: 'https://suno.ai', 
    keywords: ['música', 'canción', 'ai', 'composición'],
    logo: '🎵',
    useCase: 'Ideal para: jingles, música de fondo'
  },
  { 
    name: 'Soundraw', 
    category: 'Audio/Música', 
    description: 'Música personalizada generada por IA', 
    url: 'https://soundraw.io', 
    keywords: ['música', 'ai', 'royalty-free', 'personalizada'],
    logo: '🎼',
    useCase: 'Ideal para: música para videos y podcasts'
  },
  { 
    name: 'Adobe Podcast', 
    category: 'Audio/Música', 
    description: 'Mejora la calidad de audio con IA', 
    url: 'https://podcast.adobe.com', 
    keywords: ['audio', 'podcast', 'mejora', 'ai'],
    logo: '🎧',
    useCase: 'Ideal para: limpiar y mejorar grabaciones'
  },
  
  // CÓDIGO/DEV (5 herramientas)
  { 
    name: 'GitHub Copilot', 
    category: 'Código/Dev', 
    description: 'Asistente de código IA integrado en el IDE', 
    url: 'https://github.com/features/copilot', 
    keywords: ['código', 'programación', 'github', 'ai'],
    logo: '👨‍💻',
    useCase: 'Ideal para: autocompletado inteligente de código'
  },
  { 
    name: 'Cursor', 
    category: 'Código/Dev', 
    description: 'IDE con IA integrada para desarrollo rápido', 
    url: 'https://cursor.sh', 
    keywords: ['ide', 'código', 'ai', 'editor'],
    logo: '💻',
    useCase: 'Ideal para: desarrollo con IA asistida'
  },
  { 
    name: 'Tabnine', 
    category: 'Código/Dev', 
    description: 'Autocompletado de código con IA', 
    url: 'https://tabnine.com', 
    keywords: ['código', 'autocompletado', 'ai', 'ide'],
    logo: '⌨️',
    useCase: 'Ideal para: predicción de código'
  },
  { 
    name: 'Replit', 
    category: 'Código/Dev', 
    description: 'IDE en la nube con IA y deployment', 
    url: 'https://replit.com', 
    keywords: ['ide', 'cloud', 'código', 'deployment'],
    logo: '🔧',
    useCase: 'Ideal para: desarrollo colaborativo'
  },
  { 
    name: 'Codeium', 
    category: 'Código/Dev', 
    description: 'Autocompletado de código gratuito con IA', 
    url: 'https://codeium.com', 
    keywords: ['código', 'gratis', 'ai', 'autocompletado'],
    logo: '🤖',
    useCase: 'Ideal para: desarrollo con IA gratuito'
  }
];

const agents: Agent[] = [
  {
    name: 'Agente Unificador 4 IAs',
    description: 'Una consulta, cuatro respuestas integradas',
    price: '5 consultas gratis/dia',
    status: 'active',
    url: '/agente-unificador',
    icon: '🤖'
  }
];

const news: NewsItem[] = [
  {
    title: 'IA aumenta productividad en 40%',
    category: 'Productividad',
    readTime: '3 min',
    url: '#'
  }
];

interface Agent {
  name: string;
  description: string;
  price: string;
  status: 'active' | 'coming-soon';
  url: string;
  icon: string;
}

interface NewsItem {
  title: string;
  category: string;
  readTime: string;
  url: string;
}

export default function ToolsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  
  const categories = ['Todas', 'Chat IA', 'Diseño', 'Productividad', 'Imágenes IA', 'Video IA', 'Audio/Música', 'Código/Dev', 'Escritura'];
  
  const filteredTools = allTools.filter(tool => {
    const matchesSearch = searchTerm === '' || 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Todas' || tool.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="herramientas" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        
        {/* Tech Ticker - configurado para correr infinito */}
        <div className="mb-16">
          <HorizontalTechTicker />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Columna izquierda - Arsenal Tecnológico mejorado */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-lg">
                <span className="text-2xl">🔍</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Arsenal Tecnológico</h3>
                <p className="text-gray-600">Busca herramientas IA por categoría</p>
              </div>
            </div>

            {/* Barra de búsqueda */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar herramientas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Botón Ver Arsenal Completo - justo debajo de la búsqueda */}
            <Link
              href="#"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg mb-6"
            >
              <span>🔧</span>
              Ver Arsenal Completo
            </Link>

            {/* Selector de categorías mejorado */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Filtrar por categoría:</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Resultados de búsqueda */}
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {filteredTools.length > 0 ? (
                <>
                  <p className="text-sm text-gray-500 mb-2">
                    {filteredTools.length} herramientas encontradas
                  </p>
                  {filteredTools.slice(0, 8).map((tool, index) => {
                    const IconComponent = getToolIcon(tool.name);
                    return (
                      <a
                        key={index}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-gray-600 group-hover:text-blue-600 transition-colors">
                            <IconComponent className="w-8 h-8" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 flex items-center gap-2">
                              {tool.name}
                              <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                            {tool.useCase && (
                              <p className="text-xs text-blue-600 mt-2">{tool.useCase}</p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                {tool.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl mb-4 block">🔍</span>
                  <p className="font-medium">No se encontraron herramientas</p>
                  <p className="text-sm mt-2">Intenta con otra categoría o término de búsqueda</p>
                </div>
              )}
            </div>
          </div>

          {/* Columna del medio - Agentes */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 p-3 rounded-lg">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Agentes Impulsa Lab</h3>
                <p className="text-gray-600">IA especializada para tu negocio</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {agents.map((agent, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-green-200 bg-green-50"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{agent.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-sm">{agent.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{agent.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-purple-600">{agent.price}</span>
                        <Link
                          href={agent.url}
                          className="bg-purple-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-purple-700 transition-colors"
                        >
                          Usar Ahora
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/agentes-ia"
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>🤖</span>
              Ver Todos los Agentes
            </Link>
          </div>

          {/* Columna derecha - Noticias */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="text-2xl">📰</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Noticias IA</h3>
                <p className="text-gray-600">Últimas tendencias para negocios</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {news.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="block p-3 rounded-lg border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-200 group"
                >
                  <h4 className="font-medium text-gray-900 group-hover:text-green-600 mb-1 text-sm">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>
                </a>
              ))}
            </div>

            <Link
              href="/noticias-ia"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>📰</span>
              Ver Todas las Noticias
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </section>
  );
}
