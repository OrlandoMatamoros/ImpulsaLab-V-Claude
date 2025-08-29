'use client'

import React, { useState } from 'react';
import { Image, Video, Mic, Zap, ChevronDown, ChevronUp, ExternalLink, Play, Code2 } from 'lucide-react';

const AIToolsShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedPrompts, setExpandedPrompts] = useState(false);

  const tools = [
    {
      id: 1,
      name: 'Freepik AI',
      category: 'imagen',
      description: 'Generación de imágenes profesionales con IA',
      features: ['Mockups instantáneos', 'Fondos removibles', 'Estilo consistente'],
      useCase: 'Perfecto para posts de Instagram y material de marketing',
      link: 'https://www.youtube.com/watch?v=demo1',
      icon: <Image className="w-6 h-6" />
    },
    {
      id: 2,
      name: 'HeyGen',
      category: 'video',
      description: 'Avatares digitales que hablan por tu marca',
      features: ['Avatares realistas', 'Multi-idioma', 'Sincronización labial perfecta'],
      useCase: 'Ideal para videos explicativos y presentaciones',
      link: 'https://www.youtube.com/watch?v=demo2',
      icon: <Video className="w-6 h-6" />
    },
    {
      id: 3,
      name: 'ElevenLabs',
      category: 'audio',
      description: 'Voces ultra-realistas para tus contenidos',
      features: ['Clonación de voz', 'Emociones ajustables', '29 idiomas'],
      useCase: 'Podcasts, audiolibros y narraciones profesionales',
      link: 'https://www.youtube.com/watch?v=demo3',
      icon: <Mic className="w-6 h-6" />
    },
    {
      id: 4,
      name: 'Midjourney',
      category: 'imagen',
      description: 'Arte y diseño creativo de siguiente nivel',
      features: ['Estilos artísticos únicos', 'Alta resolución', 'Personalización extrema'],
      useCase: 'Branding visual, ilustraciones y conceptos creativos',
      link: 'https://www.youtube.com/watch?v=demo4',
      icon: <Image className="w-6 h-6" />
    },
    {
      id: 5,
      name: 'Gumloop',
      category: 'automatizacion',
      description: 'Automatización sin código para marketing',
      features: ['Workflows visuales', 'Integraciones múltiples', 'Triggers automáticos'],
      useCase: 'Automatizar campañas de email y redes sociales',
      link: 'https://www.youtube.com/watch?v=demo5',
      icon: <Zap className="w-6 h-6" />
    }
  ];

  const categories = [
    { id: 'all', name: 'Todas', icon: '🎯' },
    { id: 'imagen', name: 'Imagen', icon: '🎨' },
    { id: 'video', name: 'Video', icon: '🎬' },
    { id: 'audio', name: 'Audio', icon: '🎙️' },
    { id: 'automatizacion', name: 'Automatización', icon: '⚡' }
  ];

  const filteredTools = activeFilter === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === activeFilter);

  const samplePrompts = {
    freepik: {
      title: "Prompt para Freepik AI",
      content: `{
  "style": "professional_photography",
  "subject": "modern_office_workspace",
  "lighting": "natural_window_light",
  "colors": ["#667eea", "#764ba2", "white"],
  "mood": "productive_inspiring",
  "composition": "rule_of_thirds",
  "details": ["minimal_desk", "laptop", "coffee", "plants"]
}`
    },
    midjourney: {
      title: "Prompt para Midjourney",
      content: `/imagine prompt: ultramodern marketing agency office, 
purple and blue gradient lighting, minimalist design, 
glass walls, creative team brainstorming, 
photorealistic, architectural photography, 
8k resolution --ar 16:9 --v 6`
    }
  };

  return (
    <div className="py-16 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tu Arsenal de IA para Marketing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No somos una agencia tradicional. Somos consultores que te enseñan a dominar 
            las herramientas de IA más poderosas del mercado.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                activeFilter === cat.id
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center text-purple-600">
                    {tool.icon}
                  </div>
                  <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                    {tool.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                
                <div className="space-y-2 mb-4">
                  {tool.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-700">
                      <span className="text-purple-600 mr-2">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="bg-purple-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-purple-700">
                    <strong>Caso de uso:</strong> {tool.useCase}
                  </p>
                </div>
                
                
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold group-hover:translate-x-1 transition-transform"
                >
                  Ver Demo <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              <Code2 className="inline-block w-7 h-7 mr-2 text-purple-600" />
              Prompts Profesionales Listos para Usar
            </h3>
            <button
              onClick={() => setExpandedPrompts(!expandedPrompts)}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
            >
              {expandedPrompts ? 'Ocultar' : 'Mostrar'} Prompts
              {expandedPrompts ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
          
          {expandedPrompts && (
            <div className="grid md:grid-cols-2 gap-6">
              {Object.values(samplePrompts).map((prompt, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">{prompt.title}</h4>
                  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{prompt.content}</code>
                  </pre>
                  <button className="mt-3 text-sm text-purple-600 hover:text-purple-700 font-semibold">
                    Copiar Prompt →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIToolsShowcase;
