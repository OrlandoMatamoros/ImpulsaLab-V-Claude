'use client'

import React, { useState, useMemo } from 'react'
import { 
  Calendar, 
  Clock, 
  ExternalLink, 
  Filter, 
  Search,
  TrendingUp,
  Mail,
  X,
  ChevronRight,
  Sparkles,
  Building2,
  FileText,
  Shield,
  BookOpen,
  Trophy,
  BarChart3
} from 'lucide-react'

// Tipos de datos
interface NewsItem {
  id: string
  title: string
  summary: string
  content: string
  category: string
  source: string
  sourceUrl: string
  date: string
  readTime: number
  imageUrl: string
  tags: string[]
  isTrending?: boolean
  isFeatured?: boolean
}

// Mock data de noticias con enfoque empresarial
const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'JPMorgan reduce 40% costos operativos con IA: Guía para el sector financiero',
    summary: 'El gigante bancario comparte su estrategia de implementación de IA que revolucionó sus operaciones, ahorrando $1.5B anuales en procesamiento de documentos.',
    content: 'JPMorgan Chase ha logrado reducir significativamente sus costos operativos mediante la implementación estratégica de IA...',
    category: 'business-ai',
    source: 'Financial Times',
    sourceUrl: 'https://www.ft.com',
    date: '2025-01-25',
    readTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop',
    tags: ['Finanzas', 'JPMorgan', 'ROI', 'Automatización', 'Negocios'],
    isTrending: true,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Microsoft lanza Copilot para PYMES: IA empresarial desde $30/mes',
    summary: 'Nueva suite de herramientas de IA diseñada específicamente para pequeñas y medianas empresas, democratizando el acceso a tecnología avanzada.',
    content: 'Microsoft ha anunciado el lanzamiento de Copilot for Business Essentials, una solución de IA accesible para PYMES...',
    category: 'product-launches',
    source: 'The Wall Street Journal',
    sourceUrl: 'https://www.wsj.com',
    date: '2025-01-24',
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    tags: ['Microsoft', 'PYMES', 'Copilot', 'Productividad', 'SaaS'],
    isTrending: true
  },
  {
    id: '3',
    title: 'Amazon optimiza cadena de suministro con IA: -23% en tiempos de entrega',
    summary: 'El gigante del e-commerce revela cómo su sistema de IA predictiva transformó la logística, beneficiando a millones de negocios en su marketplace.',
    content: 'Amazon ha compartido detalles sobre su revolucionario sistema de IA para optimización logística...',
    category: 'business-ai',
    source: 'Bloomberg',
    sourceUrl: 'https://www.bloomberg.com',
    date: '2025-01-23',
    readTime: 7,
    imageUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=600&fit=crop',
    tags: ['Amazon', 'Logística', 'Supply Chain', 'E-commerce', 'Eficiencia']
  },
  {
    id: '4',
    title: 'Deloitte: 78% de CEOs planean invertir en IA generativa este año',
    summary: 'Estudio global revela las prioridades de inversión tecnológica de las Fortune 500, con IA liderando la transformación digital empresarial.',
    content: 'El último informe de Deloitte sobre tendencias tecnológicas empresariales muestra un cambio sísmico...',
    category: 'market-trends',
    source: 'Forbes',
    sourceUrl: 'https://www.forbes.com',
    date: '2025-01-22',
    readTime: 8,
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    tags: ['Deloitte', 'Inversión', 'CEOs', 'Estrategia', 'Fortune 500'],
    isFeatured: true
  },
  {
    id: '5',
    title: 'Salesforce Einstein GPT triplica ventas de empresa retail en 6 meses',
    summary: 'Caso de estudio: Cómo una cadena minorista aumentó conversiones del 2% al 6.5% usando IA para personalización en tiempo real.',
    content: 'Una importante cadena de retail ha compartido resultados extraordinarios tras implementar Einstein GPT...',
    category: 'success-stories',
    source: 'Harvard Business Review',
    sourceUrl: 'https://hbr.org',
    date: '2025-01-21',
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    tags: ['Salesforce', 'Retail', 'CRM', 'Ventas', 'ROI']
  },
  {
    id: '6',
    title: 'NY Times: Startups de IA empresarial recaudan $45B en 2024',
    summary: 'Análisis del ecosistema de inversión revela que las soluciones B2B de IA dominan el interés de VCs, superando al sector consumer.',
    content: 'El New York Times analiza el boom de inversión en startups de IA enfocadas en soluciones empresariales...',
    category: 'market-trends',
    source: 'The New York Times',
    sourceUrl: 'https://www.nytimes.com',
    date: '2025-01-20',
    readTime: 7,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
    tags: ['Startups', 'Inversión', 'B2B', 'VCs', 'Mercado'],
    isTrending: true
  },
  {
    id: '7',
    title: 'Google Cloud AI reduce 60% el tiempo de análisis de datos para Walmart',
    summary: 'El gigante minorista procesa ahora 2.5TB de datos diarios en minutos, transformando la toma de decisiones en tiempo real.',
    content: 'Walmart ha revelado los impresionantes resultados de su partnership con Google Cloud...',
    category: 'business-ai',
    source: 'Reuters',
    sourceUrl: 'https://www.reuters.com',
    date: '2025-01-19',
    readTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    tags: ['Google Cloud', 'Walmart', 'Big Data', 'Analytics', 'Retail']
  },
  {
    id: '8',
    title: 'McKinsey: IA generativa puede aumentar productividad empresarial hasta 40%',
    summary: 'Nuevo informe detalla sectores y funciones con mayor potencial de mejora, incluyendo ventas, marketing y desarrollo de software.',
    content: 'McKinsey & Company publica su análisis más completo sobre el impacto de la IA generativa en la productividad...',
    category: 'research',
    source: 'McKinsey & Company',
    sourceUrl: 'https://www.mckinsey.com',
    date: '2025-01-18',
    readTime: 10,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['McKinsey', 'Productividad', 'Investigación', 'ROI', 'Estrategia']
  },
  {
    id: '9',
    title: 'OpenAI y PwC lanzan programa de IA para transformación empresarial',
    summary: 'Alianza estratégica ofrece implementación de GPT personalizado para empresas Fortune 1000, con casos de uso específicos por industria.',
    content: 'OpenAI y PwC anuncian una colaboración sin precedentes para acelerar la adopción de IA en grandes corporaciones...',
    category: 'business-ai',
    source: 'Financial Times',
    sourceUrl: 'https://www.ft.com',
    date: '2025-01-17',
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop',
    tags: ['OpenAI', 'PwC', 'Consultoría', 'Enterprise', 'GPT']
  },
  {
    id: '10',
    title: 'Tesla automatiza 70% de su cadena de producción con visión por IA',
    summary: 'Elon Musk revela cómo la IA de visión computacional redujo defectos de manufactura en 85% y aceleró la producción.',
    content: 'Tesla ha compartido detalles sobre su revolucionario sistema de IA para manufactura automatizada...',
    category: 'success-stories',
    source: 'The Economist',
    sourceUrl: 'https://www.economist.com',
    date: '2025-01-16',
    readTime: 8,
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    tags: ['Tesla', 'Manufactura', 'Automatización', 'Computer Vision', 'Innovación']
  }
]

// Configuración de categorías
const categories = [
  { id: 'all', label: 'Todas las Noticias', icon: Sparkles },
  { id: 'business-ai', label: 'IA para Negocios', icon: Building2 },
  { id: 'product-launches', label: 'Lanzamientos', icon: FileText },
  { id: 'success-stories', label: 'Casos de Éxito', icon: Trophy },
  { id: 'market-trends', label: 'Tendencias de Mercado', icon: BarChart3 },
  { id: 'research', label: 'Investigación', icon: BookOpen },
  { id: 'regulations', label: 'Regulaciones', icon: Shield }
]

// Opciones de ordenamiento
const sortOptions = [
  { value: 'date', label: 'Más Recientes' },
  { value: 'relevance', label: 'Más Relevantes' },
  { value: 'trending', label: 'En Tendencia' }
]

export default function NoticiasPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [showFilters, setShowFilters] = useState(false)
  const [showNewsletter, setShowNewsletter] = useState(false)
  const [email, setEmail] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Manejar click en tags
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag)
    setSearchQuery(tag)
  }

  // Filtrar y ordenar noticias
  const filteredNews = useMemo(() => {
    let filtered = mockNews

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(news => news.category === selectedCategory)
    }

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(news => 
        news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Ordenar
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case 'relevance':
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
        break
      case 'trending':
        filtered.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0))
        break
    }

    return filtered
  }, [selectedCategory, searchQuery, sortBy])

  // Noticias destacadas
  const featuredNews = mockNews.filter(news => news.isFeatured)
  const trendingNews = mockNews.filter(news => news.isTrending)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para suscribir al newsletter
    console.log('Email subscrito:', email)
    setEmail('')
    setShowNewsletter(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          from {
            background-position: -1000px 0;
          }
          to {
            background-position: 1000px 0;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .news-card {
          animation: fadeInUp 0.5s ease-out;
          animation-fill-mode: both;
        }

        .news-card:nth-child(1) { animation-delay: 0.1s; }
        .news-card:nth-child(2) { animation-delay: 0.2s; }
        .news-card:nth-child(3) { animation-delay: 0.3s; }
        .news-card:nth-child(4) { animation-delay: 0.4s; }
        .news-card:nth-child(5) { animation-delay: 0.5s; }
        .news-card:nth-child(6) { animation-delay: 0.6s; }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .shimmer-bg {
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black" />
        
        <div className="relative z-10 max-w-7xl mx-auto text-center animate-fadeInUp">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
            Noticias IA
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Tu fuente confiable para las últimas novedades, tendencias y avances en inteligencia artificial
          </p>

          {/* Barra de búsqueda principal */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar noticias, herramientas, tendencias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categorías y Filtros */}
      <section className="sticky top-0 z-40 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Categorías */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                      selectedCategory === category.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{category.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Controles de filtrado */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-gray-900">
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Principal - Noticias */}
          <div className="lg:col-span-2">
            {/* Noticia Destacada */}
            {featuredNews.length > 0 && filteredNews.includes(featuredNews[0]) && (
              <article className="mb-8 group cursor-pointer animate-fadeInUp">
                <a
                  href={featuredNews[0].sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block h-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 group"
                >
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
                      DESTACADO
                    </span>
                  </div>
                  
                  <img
                    src={featuredNews[0].imageUrl}
                    alt={featuredNews[0].title}
                    className="w-full h-96 object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-purple-400 text-sm font-medium">
                        {featuredNews[0].source}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {new Date(featuredNews[0].date).toLocaleDateString('es-ES', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-3 transition-colors group-hover:text-purple-400">
                      {featuredNews[0].title}
                    </h2>
                    
                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {featuredNews[0].summary}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {featuredNews[0].tags.slice(0, 3).map((tag, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.preventDefault()
                              handleTagClick(tag)
                            }}
                            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-1 text-purple-400">
                        <span className="text-sm font-medium">Leer más</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            )}

            {/* Grid de Noticias */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNews.filter(news => !news.isFeatured || news !== featuredNews[0]).map((news, index) => (
                <article
                  key={news.id}
                  className="group cursor-pointer news-card h-full"
                >
                  <a 
                    href={news.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-full flex flex-col bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={news.imageUrl}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {news.isTrending && (
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3 text-sm">
                        <span className="text-purple-400 font-medium">{news.source}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400">
                          {new Date(news.date).toLocaleDateString('es-ES')}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {news.readTime} min
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 transition-colors group-hover:text-purple-400 line-clamp-2">
                        {news.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-4 line-clamp-3 flex-1">
                        {news.summary}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {news.tags.slice(0, 2).map((tag, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handleTagClick(tag)
                              }}
                              className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs transition-colors"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                        
                        <ExternalLink className="w-4 h-4 text-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  No se encontraron noticias con los filtros actuales.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Newsletter */}
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-white/10 rounded-xl p-6 mb-8 animate-fadeInUp">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">Newsletter IA</h3>
              </div>
              
              <p className="text-gray-300 mb-4">
                Recibe las noticias más importantes de IA directamente en tu correo cada semana.
              </p>
              
              <button
                onClick={() => setShowNewsletter(true)}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
              >
                Suscribirse Gratis
              </button>
            </div>

            {/* Trending Topics */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                En Tendencia
              </h3>
              
              <div className="space-y-4">
                {trendingNews.slice(0, 5).map((news, index) => (
                  <a
                    key={news.id}
                    href={news.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group cursor-pointer block"
                  >
                    <div className="flex gap-3">
                      <span className="text-2xl font-bold text-gray-600">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-medium transition-colors group-hover:text-purple-400 line-clamp-2">
                          {news.title}
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">
                          {news.source} • {news.readTime} min lectura
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Tags populares */}
            <div className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-bold mb-4">Tags Populares</h3>
              <div className="flex flex-wrap gap-2">
                {['OpenAI', 'GPT-5', 'Claude', 'IA Generativa', 'Machine Learning', 'Regulación', 'Startups', 'Inversión'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Modal Newsletter */}
      {showNewsletter && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowNewsletter(false)}
        >
          <div
            className="bg-gray-900 border border-white/10 rounded-2xl p-8 max-w-md w-full animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Suscríbete al Newsletter</h3>
              <button
                onClick={() => setShowNewsletter(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-300 mb-6">
              Mantente al día con las últimas noticias y tendencias en inteligencia artificial.
            </p>

            <form onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
              />

              <button
                type="submit"
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
              >
                Suscribirse
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              No compartiremos tu email. Puedes cancelar cuando quieras.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}