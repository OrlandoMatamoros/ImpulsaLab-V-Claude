'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, X, DollarSign, Clock, Zap, Tag } from 'lucide-react'
import Link from 'next/link'

interface Workflow {
  id: string;
  nombre_es: string;
  nombre_en: string;
  descripcion_es?: string;
  descripcion_en?: string;
  complexity: 'simple' | 'medium' | 'complex';
  precio_unico: number;
  precio_mensual: number;
  plataformas?: string[];
  categorias?: string[];
}

export default function WorkflowArsenal() {
  const [searchQuery, setSearchQuery] = useState('')
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [filteredWorkflows, setFilteredWorkflows] = useState<Workflow[]>([])
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [complexityFilter, setComplexityFilter] = useState<string>('')
  const [categoryFilter, setCategoryFilter] = useState<string>('')
  const [priceFilter, setPriceFilter] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)
  const [stats, setStats] = useState<any>(null)
  const [availableCategories, setAvailableCategories] = useState<string[]>([])

  // Cargar workflows iniciales
  useEffect(() => {
    loadInitialWorkflows()
  }, [])

  // Extraer categorías únicas cuando se cargan workflows
  useEffect(() => {
    const categories = new Set<string>()
    workflows.forEach(w => {
      w.categorias?.forEach(cat => categories.add(cat))
    })
    setAvailableCategories(Array.from(categories).sort())
  }, [workflows])

  const loadInitialWorkflows = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/arsenal/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '', filters: {} })
      })
      
      if (!response.ok) {
        throw new Error('Error al cargar workflows')
      }
      
      const data = await response.json()
      setWorkflows(data.results || [])
      setFilteredWorkflows(data.results || [])
      setStats(data.stats)
    } catch (err) {
      console.error('Error loading workflows:', err)
      setError('No se pudieron cargar los workflows. Por favor, intente más tarde.')
      // Datos de ejemplo para que no se rompa
      const sampleWorkflows: Workflow[] = [
        {
          id: '1',
          nombre_es: 'Automatización de Email Marketing',
          nombre_en: 'Email Marketing Automation',
          descripcion_es: 'Envía emails personalizados automáticamente',
          complexity: 'simple',
          precio_unico: 475,
          precio_mensual: 99,
          plataformas: ['Gmail', 'Mailchimp'],
          categorias: ['Marketing', 'Email']
        },
        {
          id: '2',
          nombre_es: 'Sincronización de Inventario',
          nombre_en: 'Inventory Sync',
          descripcion_es: 'Mantén tu inventario actualizado en todas las plataformas',
          complexity: 'medium',
          precio_unico: 750,
          precio_mensual: 149,
          plataformas: ['Shopify', 'WooCommerce'],
          categorias: ['E-commerce', 'Inventario']
        },
        {
          id: '3',
          nombre_es: 'Análisis Predictivo con IA',
          nombre_en: 'AI Predictive Analytics',
          descripcion_es: 'Predice tendencias y comportamientos con machine learning',
          complexity: 'complex',
          precio_unico: 1250,
          precio_mensual: 249,
          plataformas: ['OpenAI', 'BigQuery'],
          categorias: ['Analytics', 'AI', 'Data']
        },
        {
          id: '4',
          nombre_es: 'Chatbot de Atención al Cliente',
          nombre_en: 'Customer Service Chatbot',
          descripcion_es: 'Responde automáticamente a consultas frecuentes',
          complexity: 'medium',
          precio_unico: 750,
          precio_mensual: 149,
          plataformas: ['WhatsApp', 'Telegram'],
          categorias: ['Servicio al Cliente', 'Chat']
        },
        {
          id: '5',
          nombre_es: 'Generación de Reportes Automáticos',
          nombre_en: 'Automated Report Generation',
          descripcion_es: 'Crea y envía reportes personalizados automáticamente',
          complexity: 'simple',
          precio_unico: 475,
          precio_mensual: 99,
          plataformas: ['Google Sheets', 'Excel'],
          categorias: ['Reportes', 'Analytics']
        }
      ]
      setWorkflows(sampleWorkflows)
      setFilteredWorkflows(sampleWorkflows)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    setLoading(true)
    setError(null)

    try {
      // Aplicar filtros localmente primero
      let filtered = [...workflows]

      // Filtro de búsqueda
      if (searchQuery.trim()) {
        filtered = filtered.filter(w => {
          const query = searchQuery.toLowerCase()
          return (
            w.nombre_es?.toLowerCase().includes(query) ||
            w.nombre_en?.toLowerCase().includes(query) ||
            w.descripcion_es?.toLowerCase().includes(query) ||
            w.descripcion_en?.toLowerCase().includes(query) ||
            w.plataformas?.some(p => p.toLowerCase().includes(query)) ||
            w.categorias?.some(c => c.toLowerCase().includes(query))
          )
        })
      }

      // Filtro de complejidad
      if (complexityFilter) {
        filtered = filtered.filter(w => w.complexity === complexityFilter)
      }

      // Filtro de categoría
      if (categoryFilter) {
        filtered = filtered.filter(w => 
          w.categorias?.includes(categoryFilter)
        )
      }

      // Filtro de precio
      if (priceFilter) {
        const [min, max] = priceFilter.split('-').map(Number)
        filtered = filtered.filter(w => {
          if (max) {
            return w.precio_mensual >= min && w.precio_mensual <= max
          } else {
            return w.precio_mensual >= min
          }
        })
      }

      setFilteredWorkflows(filtered)

      // Intentar búsqueda en servidor si hay query
      if (searchQuery.trim() || complexityFilter || categoryFilter || priceFilter) {
        const response = await fetch('/api/arsenal/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: searchQuery,
            filters: {
              complexity: complexityFilter,
              category: categoryFilter,
              priceRange: priceFilter
            }
          })
        })

        if (response.ok) {
          const data = await response.json()
          if (data.results && data.results.length > 0) {
            setFilteredWorkflows(data.results)
          }
        }
      }
    } catch (err) {
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setComplexityFilter('')
    setCategoryFilter('')
    setPriceFilter('')
    setFilteredWorkflows(workflows)
  }

  const getComplexityBadge = (complexity: string) => {
    const styles = {
      simple: 'bg-green-100 text-green-700',
      medium: 'bg-yellow-100 text-yellow-700',
      complex: 'bg-red-100 text-red-700'
    }
    const labels = {
      simple: 'Simple',
      medium: 'Medio',
      complex: 'Complejo'
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[complexity as keyof typeof styles] || styles.simple}`}>
        {labels[complexity as keyof typeof labels] || complexity}
      </span>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Buscador */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, herramienta o categoría..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
              >
                <Filter className="w-5 h-5" />
                Filtros {(complexityFilter || categoryFilter || priceFilter) && (
                  <span className="bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs">
                    {[complexityFilter, categoryFilter, priceFilter].filter(Boolean).length}
                  </span>
                )}
              </button>
              <button
                onClick={handleSearch}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Buscar
              </button>
            </div>

            {/* Filtros */}
            {showFilters && (
              <div className="border-t pt-6">
                <div className="grid md:grid-cols-4 gap-4">
                  {/* Filtro de Categoría */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Tag className="inline w-4 h-4 mr-1" />
                      Categoría
                    </label>
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Todas las categorías</option>
                      <option value="Marketing">Marketing</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Analytics">Analytics</option>
                      <option value="AI">Inteligencia Artificial</option>
                      <option value="Servicio al Cliente">Servicio al Cliente</option>
                      <option value="Finanzas">Finanzas</option>
                      <option value="Inventario">Inventario</option>
                      <option value="Reportes">Reportes</option>
                      <option value="CRM">CRM</option>
                      <option value="Email">Email</option>
                      <option value="Social Media">Redes Sociales</option>
                      <option value="Productividad">Productividad</option>
                    </select>
                  </div>

                  {/* Filtro de Complejidad */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Zap className="inline w-4 h-4 mr-1" />
                      Complejidad
                    </label>
                    <select
                      value={complexityFilter}
                      onChange={(e) => setComplexityFilter(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Todas</option>
                      <option value="simple">Simple</option>
                      <option value="medium">Media</option>
                      <option value="complex">Compleja</option>
                    </select>
                  </div>

                  {/* Filtro de Precio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <DollarSign className="inline w-4 h-4 mr-1" />
                      Rango de Precio
                    </label>
                    <select
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Todos los precios</option>
                      <option value="0-100">$0 - $100/mes</option>
                      <option value="100-150">$100 - $150/mes</option>
                      <option value="150-200">$150 - $200/mes</option>
                      <option value="200-300">$200 - $300/mes</option>
                      <option value="300">Más de $300/mes</option>
                    </select>
                  </div>

                  {/* Botón Limpiar */}
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="w-full p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                      Limpiar Filtros
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-blue-500" />
                {filteredWorkflows.length} de {workflows.length} workflows
              </span>
              {categoryFilter && (
                <span className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                  <Tag className="w-4 h-4 text-blue-600" />
                  {categoryFilter}
                  <button
                    onClick={() => setCategoryFilter('')}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {complexityFilter && (
                <span className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full">
                  <Zap className="w-4 h-4 text-green-600" />
                  {complexityFilter}
                  <button
                    onClick={() => setComplexityFilter('')}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </div>

          {/* Resultados */}
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
              {error}
            </div>
          ) : loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Buscando workflows...</p>
            </div>
          ) : filteredWorkflows.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
              <p className="text-yellow-800 text-lg font-semibold mb-2">
                No se encontraron workflows con estos filtros
              </p>
              <p className="text-yellow-600 mb-4">
                Intenta ajustar los filtros o términos de búsqueda
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
              >
                Limpiar Filtros
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition cursor-pointer transform hover:scale-105"
                  onClick={() => setSelectedWorkflow(workflow)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg line-clamp-2 flex-1">
                      {workflow.nombre_es || workflow.nombre_en}
                    </h3>
                    {getComplexityBadge(workflow.complexity)}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {workflow.descripcion_es || workflow.descripcion_en || 'Automatización profesional'}
                  </p>
                  
                  {/* Categorías */}
                  {workflow.categorias && workflow.categorias.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {workflow.categorias.slice(0, 2).map((cat, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-50 text-purple-600 rounded text-xs">
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Plataformas */}
                  {workflow.plataformas && workflow.plataformas.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {workflow.plataformas.slice(0, 3).map((tool, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
                          {tool}
                        </span>
                      ))}
                      {workflow.plataformas.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs">
                          +{workflow.plataformas.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-500">Mensual</p>
                      <p className="text-xl font-bold text-green-600">${workflow.precio_mensual}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Único</p>
                      <p className="text-xl font-bold text-gray-900">${workflow.precio_unico}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal de detalles */}
          {selectedWorkflow && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b sticky top-0 bg-white">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold">
                      {selectedWorkflow.nombre_es}
                    </h2>
                    <button
                      onClick={() => setSelectedWorkflow(null)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6 flex gap-2">
                    {getComplexityBadge(selectedWorkflow.complexity)}
                    {selectedWorkflow.categorias?.map((cat, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                        {cat}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    {selectedWorkflow.descripcion_es || 'Automatización profesional para optimizar tu negocio'}
                  </p>
                  
                  {selectedWorkflow.plataformas && selectedWorkflow.plataformas.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Herramientas utilizadas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedWorkflow.plataformas.map((tool, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-600 rounded">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Precio Mensual</p>
                      <p className="text-2xl font-bold text-green-600">${selectedWorkflow.precio_mensual}/mes</p>
                      <p className="text-xs text-gray-500 mt-1">+ ${Math.round(selectedWorkflow.precio_unico * 0.7)} implementación</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500 mb-1">Precio Único</p>
                      <p className="text-2xl font-bold text-gray-900">${selectedWorkflow.precio_unico}</p>
                      <p className="text-xs text-gray-500 mt-1">Pago único, sin mensualidad</p>
                    </div>
                  </div>
                  
                  <Link 
                    href="https://calendly.com/orlando-tuimpulsalab/30min"
                    target="_blank"
                    className="block w-full bg-green-600 text-white text-center py-4 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Agendar Diagnóstico 3D
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
