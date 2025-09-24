'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, X, DollarSign, Clock, Zap } from 'lucide-react'
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
  const [showFilters, setShowFilters] = useState(false)
  const [stats, setStats] = useState<any>(null)

  // Cargar workflows iniciales
  useEffect(() => {
    loadInitialWorkflows()
  }, [])

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
          categorias: ['Marketing']
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
          categorias: ['E-commerce']
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
          categorias: ['Analytics', 'AI']
        }
      ]
      setWorkflows(sampleWorkflows)
      setFilteredWorkflows(sampleWorkflows)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim() && !complexityFilter) {
      setFilteredWorkflows(workflows)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/arsenal/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          filters: complexityFilter ? { complexity: complexityFilter } : {}
        })
      })

      if (!response.ok) {
        throw new Error('Error en la búsqueda')
      }

      const data = await response.json()
      setFilteredWorkflows(data.results || [])
    } catch (err) {
      console.error('Search error:', err)
      // Búsqueda local como fallback
      const filtered = workflows.filter(w => {
        const matchesQuery = !searchQuery || 
          w.nombre_es?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.nombre_en?.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesComplexity = !complexityFilter || w.complexity === complexityFilter
        return matchesQuery && matchesComplexity
      })
      setFilteredWorkflows(filtered)
    } finally {
      setLoading(false)
    }
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
                Filtros
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
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Complejidad
                    </label>
                    <select
                      value={complexityFilter}
                      onChange={(e) => setComplexityFilter(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Todas</option>
                      <option value="simple">Simple ($99/mes)</option>
                      <option value="medium">Media ($149/mes)</option>
                      <option value="complex">Compleja ($249/mes)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Stats */}
            {stats && (
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-blue-500" />
                  {stats.total || 0} workflows disponibles
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  Precio promedio: ${stats.avgPriceMonthly || 149}/mes
                </span>
              </div>
            )}
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
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition cursor-pointer"
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
                  
                  {workflow.plataformas && workflow.plataformas.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
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
                  <div className="mb-6">
                    {getComplexityBadge(selectedWorkflow.complexity)}
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    {selectedWorkflow.descripcion_es || 'Automatización profesional para optimizar tu negocio'}
                  </p>
                  
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
