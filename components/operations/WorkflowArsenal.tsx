'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';

export default function WorkflowArsenal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  
  const handleSearch = async () => {
    if (searchQuery.length < 2) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/arsenal/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery, limit: 30 })
      });
      
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) handleSearch();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-green-600">
              Arsenal de 5,670+ Automatizaciones
            </h2>
            <p className="text-xl text-gray-600">
              Busca en español o inglés
            </p>
          </div>
          
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busca: factura, invoice, whatsapp, gmail..."
                className="w-full pl-14 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl 
                          focus:border-green-500 focus:outline-none transition-all"
              />
              {loading && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-green-500 border-t-transparent"></div>
                </div>
              )}
            </div>
          </div>
          
          {results.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {results.slice(0, 30).map((result, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedWorkflow(result.workflow)}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all cursor-pointer
                            border-2 border-transparent hover:border-green-500"
                >
                  <h3 className="font-semibold text-lg mb-2">
                    {result.workflow.nombre_es || result.workflow.nombre_en}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {result.workflow.nombre_en}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        ${result.workflow.precio_mensual}/mes
                      </p>
                      <p className="text-xs text-gray-500">
                        o ${result.workflow.precio_unico} único
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      {result.workflow.complexity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {selectedWorkflow && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
                <button
                  onClick={() => setSelectedWorkflow(null)}
                  className="float-right text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <h2 className="text-2xl font-bold mb-2">{selectedWorkflow.nombre_es}</h2>
                <p className="text-gray-500 mb-6">{selectedWorkflow.nombre_en}</p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">Implementación Única</h3>
                    <p className="text-3xl font-bold text-green-600 mb-2">
                      ${selectedWorkflow.precio_unico}
                    </p>
                    <p className="text-sm text-gray-600">Pago único con instalación</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4">Servicio Mensual</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-2">
                      ${selectedWorkflow.precio_mensual}/mes
                    </p>
                    <p className="text-sm text-gray-600">Todo incluido</p>
                  </div>
                </div>
                
                <Link 
                  href="https://calendly.com/tu-link"
                  target="_blank"
                  className="block w-full bg-green-600 text-white text-center py-4 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Agendar Diagnóstico 3D
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
