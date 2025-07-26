'use client';

import React, { useState, useMemo } from 'react';
import { Search, Grid, List, Filter, ExternalLink, Tag, DollarSign, ChevronLeft, X } from 'lucide-react';
import Link from 'next/link';
import { tools } from '@/lib/tools-data';

export default function ArsenalPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  // Obtener categorías únicas
  const categories = ['todas', ...Array.from(new Set(tools.map(tool => tool.category)))];

  // Filtrar herramientas
  const filteredTools = useMemo(() => {
    let filtered = tools;

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por categoría
    if (selectedCategory !== 'todas') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
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
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header - Responsive */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <Link 
            href="/herramientas" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm sm:text-base"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
            Arsenal Tecnológico
          </h1>
          <p className="text-base sm:text-xl text-gray-600">
            Más de {tools.length} herramientas de IA
          </p>
        </div>
      </div>

      {/* Barra de búsqueda móvil - Siempre visible */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar herramientas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-lg"
            />
          </div>
          
          {/* Botón de filtros en móvil */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mt-3 w-full sm:hidden flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg"
          >
            <Filter className="w-4 h-4" />
            Filtros y Vista
          </button>
        </div>
      </div>

      {/* Filtros - Responsive con modal en móvil */}
      <div className={`${showFilters ? 'block' : 'hidden'} sm:block`}>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 sm:hidden" onClick={() => setShowFilters(false)}></div>
        
        <div className={`
          fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 p-6 max-h-[80vh] overflow-y-auto
          sm:relative sm:inset-auto sm:bg-transparent sm:shadow-none sm:p-0 sm:max-h-none sm:overflow-visible
          ${showFilters ? 'translate-y-0' : 'translate-y-full'}
          sm:translate-y-0 transition-transform duration-300
        `}>
          {/* Cerrar modal en móvil */}
          <button
            onClick={() => setShowFilters(false)}
            className="absolute top-4 right-4 sm:hidden"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>

          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="sm:bg-white sm:rounded-2xl sm:shadow-xl sm:p-6 space-y-4">
              <h3 className="font-semibold text-lg mb-4 sm:hidden">Filtros y Vista</h3>
              
              {/* Controles de filtro */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                      className={`flex-1 px-3 py-2 rounded-lg border transition-all ${
                        viewMode === 'grid'
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Grid className="h-5 w-5 mx-auto" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex-1 px-3 py-2 rounded-lg border transition-all ${
                        viewMode === 'list'
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <List className="h-5 w-5 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Resultados y limpiar - Siempre visible en desktop */}
              <div className="flex items-center justify-between pt-4 border-t sm:border-0 sm:pt-0">
                <p className="text-sm text-gray-600">
                  {filteredTools.length} herramientas
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('todas');
                    setShowFilters(false);
                  }}
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  Limpiar filtros
                </button>
              </div>

              {/* Aplicar en móvil */}
              <button
                onClick={() => setShowFilters(false)}
                className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium sm:hidden"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de herramientas - Responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredTools.map((tool, index) => {
              const ToolIcon = tool.logo;
              return (
                <div 
                  key={index} 
                  className="group bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 relative overflow-hidden"
                >
                  {/* Efecto gradient al hover - Solo desktop */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-2 flex items-center justify-center"
                        style={{ color: tool.color }}
                      >
                        <ToolIcon className="w-full h-full" />
                      </div>
                      
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                      </a>
                    </div>
                    
                    <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {tool.name}
                    </h3>
                    
                    <div className="mb-3 sm:mb-4">
                      <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                        {tool.category}
                      </span>
                    </div>

                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-1.5 sm:py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium text-sm sm:text-base"
                    >
                      Visitar
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Vista de lista - Con scroll horizontal en móvil */
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Herramienta
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Categoría
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enlace
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTools.map((tool, index) => {
                  const ToolIcon = tool.logo;
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div 
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 p-1.5 sm:p-2 flex items-center justify-center mr-3"
                            style={{ color: tool.color }}
                          >
                            <ToolIcon className="w-full h-full" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{tool.name}</div>
                            <div className="text-xs text-gray-500 sm:hidden">{tool.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {tool.category}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-center whitespace-nowrap">
                        <a
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
