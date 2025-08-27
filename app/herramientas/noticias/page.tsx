'use client'

import React, { useState, useMemo, useEffect } from 'react'
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
import ProtectedSection from '@/components/ProtectedSection'

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
  
  // NUEVOS ESTADOS para datos dinámicos
  const [newsData, setNewsData] = useState<NewsItem[]>(mockNews)
  const [isLoading, setIsLoading] = useState(true)

  // NUEVO useEffect para cargar noticias de Gmail
  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/news/sync')
        const data = await response.json()
        
        if (data && Array.isArray(data) && data.length > 0) {
          setNewsData(data)
        } else {
          setNewsData(mockNews)
        }
      } catch (error) {
        console.error('Error loading news:', error)
        setNewsData(mockNews)
      } finally {
        setIsLoading(false)
      }
    }

    loadNews()
  }, [])

  // Manejar click en tags
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag)
    setSearchQuery(tag)
  }

  // Filtrar y ordenar noticias
  const filteredNews = useMemo(() => {
    let filtered = newsData // CAMBIO: usar newsData en vez de mockNews

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
  }, [selectedCategory, searchQuery, sortBy, newsData]) // AÑADIR newsData a las dependencias

  // Noticias destacadas y en tendencia
  const featuredNews = newsData.filter(news => news.isFeatured)
  const trendingNews = newsData.filter(news => news.isTrending)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Email subscrito:', email)
    setEmail('')
    setShowNewsletter(false)
  }

  // Mostrar indicador de carga
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando noticias...</p>
        </div>
      </div>
    )
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
      `}</style>

      {/* Hero Section - SIEMPRE VISIBLE */}
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

      {/* Categorías */}
      <section className="sticky top-0 z-40 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
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
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO PROTEGIDO */}
      <ProtectedSection
        message="Regístrate gratis para leer noticias completas, suscribirte al newsletter y personalizar tu feed de IA empresarial"
        showPreview={true}
        previewBlur={false}
      >
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
                            <span
                              key={index}
                              className="px-3 py-1 bg-white/10 rounded-full text-xs"
                            >
                              {tag}
                            </span>
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
                {filteredNews.filter(news => !news.isFeatured || news !== featuredNews[0]).slice(0, 6).map((news, index) => (
                  <article
                    key={news.id}
                    className="group cursor-pointer news-card h-full"
                  >
                    <div className="h-full flex flex-col bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300">
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
                              <span
                                key={index}
                                className="px-2 py-1 bg-white/10 rounded-full text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <ExternalLink className="w-4 h-4 text-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
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
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 animate-fadeInUp">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  En Tendencia
                </h3>
                
                <div className="space-y-4">
                  {trendingNews.slice(0, 5).map((news, index) => (
                    <div key={news.id} className="group cursor-pointer block">
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
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags populares */}
              <div className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 animate-fadeInUp">
                <h3 className="text-xl font-bold mb-4">Tags Populares</h3>
                <div className="flex flex-wrap gap-2">
                  {['OpenAI', 'GPT-5', 'Claude', 'IA Generativa', 'Machine Learning', 'Regulación', 'Startups', 'Inversión'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm cursor-pointer hover:bg-white/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </ProtectedSection>

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