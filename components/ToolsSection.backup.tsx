'use client';

import * as React from 'react';
import Link from 'next/link';
import { ExternalLink, Grid3X3, Bot, Newspaper, Sparkles, ChevronRight } from 'lucide-react';
import { tools } from '@/lib/tools-data';
import HorizontalTechTicker from './HorizontalTechTicker';

export default function ToolsSection() {
  return (
    <section className="relative overflow-hidden">
      {/* HorizontalTechTicker - Banner superior */}
      <HorizontalTechTicker />
      
      {/* Contenedor principal con las 5 secciones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestras Herramientas y Servicios
          </h2>
          <p className="text-xl text-gray-600">
            Explora todo lo que Impulsa Lab tiene para ofrecerte
          </p>
        </div>
        
        {/* Grid responsive para las secciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Arsenal Tecnológico */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Grid3X3 className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">
                  Arsenal Tecnológico
                </h3>
              </div>
              <Link 
                href="/herramientas/arsenal" 
                className="text-blue-600 hover:text-blue-700 transition"
              >
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
            
            <p className="text-gray-600 mb-4">
              Accede a las {tools.length} herramientas de IA más poderosas del mercado
            </p>
            
            {/* Preview de algunas herramientas */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {tools.slice(0, 8).map((tool, index) => {
                const ToolIcon = tool.logo;
                return (
                  <div 
                    key={index}
                    className="w-12 h-12 rounded-lg bg-white p-2 flex items-center justify-center shadow-sm"
                    style={{ color: tool.color }}
                  >
                    <ToolIcon className="w-full h-full" />
                  </div>
                );
              })}
            </div>
            
            <Link 
              href="/herramientas/arsenal"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full justify-center"
            >
              Ver todas las herramientas
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* 2. Agentes de Impulsa Lab + 3. Prompt Designer (columna central) */}
          <div className="space-y-6">
            {/* Agentes de Impulsa Lab */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Bot className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Agentes de Impulsa Lab
                  </h3>
                </div>
                <Link 
                  href="/herramientas/agentes" 
                  className="text-purple-600 hover:text-purple-700 transition"
                >
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </div>
              
              <p className="text-gray-600 mb-4">
                Asistentes especializados para cada necesidad
              </p>
              
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  Agente de Marketing
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  Agente de Desarrollo
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  Agente de Diseño
                </li>
              </ul>
              
              <Link 
                href="/herramientas/agentes"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition w-full justify-center"
              >
                Conocer agentes
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Prompt Designer */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Prompt Designer
                  </h3>
                </div>
                <Link 
                  href="/herramientas/prompt-designer" 
                  className="text-emerald-600 hover:text-emerald-700 transition"
                >
                  <ExternalLink className="w-5 h-5" />
                </Link>
              </div>
              
              <p className="text-gray-600 mb-4">
                Crea prompts profesionales con nuestra guía interactiva
              </p>
              
              {/* Mini formulario preview */}
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <label className="text-sm font-medium text-gray-700">
                    ¿Qué quieres lograr?
                  </label>
                  <input 
                    type="text" 
                    placeholder="Ej: Crear contenido para redes sociales"
                    className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    disabled
                  />
                </div>
                
                <Link 
                  href="/herramientas/prompt-designer"
                  className="block w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center py-2 rounded-lg hover:opacity-90 transition"
                >
                  Diseñar Mi Prompt
                </Link>
              </div>
            </div>
          </div>
          
          {/* 4. Agente de Noticias */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Newspaper className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-bold text-gray-900">
                  Agente de Noticias
                </h3>
              </div>
              <Link 
                href="/herramientas/noticias" 
                className="text-orange-600 hover:text-orange-700 transition"
              >
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
            
            <p className="text-gray-600 mb-4">
              Mantente actualizado con las últimas noticias en IA
            </p>
            
            {/* Preview de noticias */}
            <div className="space-y-3 mb-4">
              <div className="bg-white rounded-lg p-3 border-l-4 border-orange-500">
                <h4 className="font-semibold text-sm text-gray-800">
                  OpenAI lanza GPT-5
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  Hace 2 horas • Tecnología
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border-l-4 border-orange-500">
                <h4 className="font-semibold text-sm text-gray-800">
                  Nuevas regulaciones de IA en Europa
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  Hace 5 horas • Regulación
                </p>
              </div>
            </div>
            
            <Link 
              href="/herramientas/noticias"
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition w-full justify-center"
            >
              Ver todas las noticias
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
        </div>
        
        {/* Mensaje adicional */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            ¿Necesitas ayuda para elegir la herramienta adecuada?
          </p>
          <Link 
            href="/contacto" 
            className="inline-flex items-center gap-2 mt-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Contáctanos para una asesoría gratuita
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
