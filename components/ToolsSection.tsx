'use client';

import * as React from 'react';
import Link from 'next/link';
import { 
  ExternalLink, 
  Grid3X3, 
  Bot, 
  Newspaper, 
  Sparkles, 
  ChevronRight,
  Search,
  MessageSquare,
  Image,
  Video,
  Code,
  Music,
  FileText,
  Briefcase,
  ChevronDown
} from 'lucide-react';
import { tools, getCategories } from '@/lib/tools-data';

export default function ToolsSection() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  const categories = getCategories();
  const categoryIcons: Record<string, any> = {
    'Chat IA': MessageSquare,
    'Generación de Imágenes': Image,
    'Video y Animación': Video,
    'Código y Desarrollo': Code,
    'Audio y Música': Music,
    'Escritura y Contenido': FileText,
    'Productividad': Briefcase
  };

  const categoryColors: Record<string, string> = {
    'Chat IA': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    'Generación de Imágenes': 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    'Video y Animación': 'from-red-500/20 to-orange-500/20 border-red-500/30',
    'Código y Desarrollo': 'from-green-500/20 to-emerald-500/20 border-green-500/30',
    'Audio y Música': 'from-indigo-500/20 to-violet-500/20 border-indigo-500/30',
    'Escritura y Contenido': 'from-amber-500/20 to-yellow-500/20 border-amber-500/30',
    'Productividad': 'from-gray-500/20 to-slate-500/20 border-gray-500/30'
  };

  // Herramientas más populares para mostrar primero
  const popularTools = ['ChatGPT', 'Claude', 'Gemini', 'DALL-E', 'Midjourney', 'GitHub Copilot', 'Canva', 'Notion', 'Figma'];
  const sortedTools = [...tools].sort((a, b) => {
    const aIndex = popularTools.indexOf(a.name);
    const bIndex = popularTools.indexOf(b.name);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return 0;
  });

  const displayedTools = selectedCategory 
    ? tools.filter(tool => tool.category === selectedCategory)
    : sortedTools.slice(0, 18);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Fondo con patrón */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Efectos de luz más dramáticos */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-400 rounded-full blur-[120px] opacity-20"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-400 rounded-full blur-[120px] opacity-20"></div>
      
      {/* Contenedor principal */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header mejorado con más impacto visual */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20 mb-8 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
            <span className="text-base font-semibold text-gray-700">Herramientas y Servicios</span>
          </div>
          
          {/* Título principal con estilo HeroSection */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="text-gray-900">Potencia e impulsa</span>
            <br />
            <span className="text-gray-900"> tu Negocio, </span>
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Con las Ultimas herramientas
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
               de IA.
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Accede a más de <span className="font-semibold text-gray-900">{tools.length} herramientas</span> de inteligencia artificial 
            y servicios especializados para transformar tu negocio
          </p>
        </div>
        
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* 1. Arsenal Tecnológico - Mejorado */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden">
            {/* Efecto gradient al hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg">
                    <Grid3X3 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Arsenal Tecnológico
                  </h3>
                </div>
                <Link 
                  href="/herramientas/arsenal" 
                  className="text-blue-600 hover:text-blue-700 transition hover:scale-110"
                >
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </div>
              
              <p className="text-gray-600 mb-6">
                Explora nuestro catálogo completo de {tools.length} herramientas de IA organizadas por categoría
              </p>
              
              {/* Mini buscador de categorías */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Search className="w-4 h-4" />
                  <span>Categorías disponibles:</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {categories.slice(0, 6).map((category) => {
                    const Icon = categoryIcons[category] || Grid3X3;
                    const count = tools.filter(t => t.category === category).length;
                    const colorClass = categoryColors[category] || 'from-gray-500/20 to-gray-500/20 border-gray-500/30';
                    const isSelected = selectedCategory === category;
                    
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(isSelected ? null : category)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r ${colorClass} border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                          isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-medium text-gray-700">{category}</span>
                        <span className="ml-auto text-xs font-bold text-gray-600">{count}</span>
                      </button>
                    );
                  })}
                </div>
                
                {categories.length > 6 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 mx-auto transition-colors"
                  >
                    {isExpanded ? 'Ver menos' : `+${categories.length - 6} categorías más`}
                    <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
              
              {/* Preview de herramientas con más espacio vertical */}
              <div className="grid grid-cols-6 gap-3 mb-8 min-h-[140px]">
                {displayedTools.map((tool, index) => {
                  const ToolIcon = tool.logo;
                  return (
                    <a
                      key={index}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/icon relative w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-2 flex items-center justify-center shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                      style={{ color: tool.color }}
                    >
                      <ToolIcon className="w-full h-full" />
                      {/* Tooltip mejorado con más espacio */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        {tool.name}
                      </div>
                    </a>
                  );
                })}
              </div>
              
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm text-blue-600 hover:text-blue-700 mb-4 block mx-auto"
                >
                  Mostrar todas las herramientas
                </button>
              )}
              
              <Link 
                href="/herramientas/arsenal"
                className="relative inline-flex items-center gap-2 w-full justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105"
              >
                Explorar Arsenal Completo
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          {/* 2. Columna central con Agentes y Prompt Designer */}
          <div className="space-y-8">
            {/* Agentes de Impulsa Lab */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white shadow-lg">
                      <Bot className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Agentes IA
                    </h3>
                  </div>
                  <Link 
                    href="/herramientas/agentes" 
                    className="text-purple-600 hover:text-purple-700 transition hover:scale-110"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Asistentes especializados para cada área
                </p>
                
                <ul className="space-y-3 mb-6">
                  {['Marketing Digital', 'Desarrollo Web', 'Diseño Creativo', 'Análisis de Datos'].map((agent, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-700 group/item">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full group-hover/item:scale-150 transition-transform"></div>
                      <span className="group-hover/item:text-purple-600 transition-colors">{agent}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href="/herramientas/agentes"
                  className="inline-flex items-center gap-2 w-full justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg"
                >
                  Conocer Agentes
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Prompt Designer - Estilo anterior mejorado */}
            <div className="group relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-emerald-200 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-xl font-bold text-gray-900">
                      Prompt Designer
                    </h3>
                  </div>
                  <Link 
                    href="/herramientas/prompt-designer" 
                    className="text-emerald-600 hover:text-emerald-700 transition hover:scale-110"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Crea prompts profesionales con nuestra guía interactiva
                </p>
                
                {/* Mini formulario preview - Estilo anterior */}
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <label className="text-sm font-medium text-gray-700">
                      ¿Qué quieres lograr?
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ej: Crear contenido para redes sociales"
                      className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-not-allowed"
                      disabled
                    />
                  </div>
                  
                  <Link 
                    href="/herramientas/prompt-designer"
                    className="block w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center py-2 rounded-lg hover:opacity-90 transition font-medium shadow-lg"
                  >
                    Diseñar Mi Prompt
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* 3. Agente de Noticias - Extendido */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl text-white shadow-lg">
                    <Newspaper className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Agente de Noticias
                  </h3>
                </div>
                <Link 
                  href="/herramientas/noticias" 
                  className="text-orange-600 hover:text-orange-700 transition hover:scale-110"
                >
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </div>
              
              <p className="text-gray-600 mb-6">
                Las últimas novedades en IA actualizadas diariamente
              </p>
              
              {/* Preview de noticias extendido */}
              <div className="space-y-3 flex-grow">
                {[
                  { 
                    title: 'OpenAI lanza GPT-5 con capacidades revolucionarias', 
                    time: '2 horas', 
                    tag: 'Tecnología',
                    source: 'TechCrunch'
                  },
                  { 
                    title: 'Nueva regulación de IA aprobada en la Unión Europea', 
                    time: '5 horas', 
                    tag: 'Legal',
                    source: 'Reuters'
                  },
                  { 
                    title: 'Microsoft invierte $10B en startups de IA', 
                    time: '8 horas', 
                    tag: 'Negocios',
                    source: 'Bloomberg'
                  },
                  { 
                    title: 'Google presenta Gemini Ultra: el modelo más avanzado', 
                    time: '1 día', 
                    tag: 'Lanzamiento',
                    source: 'The Verge'
                  },
                  { 
                    title: 'Meta anuncia nuevo framework para IA generativa', 
                    time: '1 día', 
                    tag: 'Desarrollo',
                    source: 'Wired'
                  }
                ].map((news, idx) => (
                  <div 
                    key={idx}
                    className="group/news bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border-l-4 border-orange-500 hover:from-orange-50 hover:to-orange-100 transition-all duration-300 hover:translate-x-1 cursor-pointer"
                  >
                    <h4 className="font-semibold text-sm text-gray-800 group-hover/news:text-orange-700 transition-colors line-clamp-2">
                      {news.title}
                    </h4>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">{news.time}</span>
                        <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">
                          {news.tag}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 italic">{news.source}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link 
                href="/herramientas/noticias"
                className="inline-flex items-center gap-2 w-full justify-center bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 mt-6"
              >
                Ver Todas las Noticias
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
        </div>
        
        {/* CTA final mejorado */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
            <p className="text-lg text-gray-700 font-medium">
              ¿Necesitas ayuda para elegir la herramienta perfecta?
            </p>
            <Link 
              href="/contacto" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105"
            >
              Agenda una Asesoría Gratuita
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
