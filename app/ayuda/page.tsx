'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  FaArrowRight, 
  FaSearch, 
  FaBookOpen, 
  FaVideo, 
  FaQuestionCircle,
  FaRobot,
  FaChartLine,
  FaBullhorn,
  FaFileAlt,
  FaHeadset,
  FaLightbulb,
  FaPlayCircle,
  FaDownload,
  FaClock,
  FaCheckCircle,
  FaExternalLinkAlt
} from 'react-icons/fa';


export default function Ayuda() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  // Categorías de ayuda
  const categorias = [
    {
      id: 'inicio',
      nombre: 'Primeros Pasos',
      icono: <FaLightbulb />,
      descripcion: 'Todo lo que necesitas para comenzar',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'ia',
      nombre: 'Herramientas de IA',
      icono: <FaRobot />,
      descripcion: 'Aprende a usar nuestros agentes inteligentes',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'finanzas',
      nombre: 'Dashboards Financieros',
      icono: <FaChartLine />,
      descripcion: 'Gestiona tus finanzas con inteligencia',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'marketing',
      nombre: 'Marketing Digital',
      icono: <FaBullhorn />,
      descripcion: 'Potencia tu presencia online',
      color: 'bg-pink-100 text-pink-600'
    }
  ];

  // Guías rápidas
  const guias = [
    {
      categoria: 'inicio',
      titulo: 'Cómo realizar tu Diagnóstico 3D',
      descripcion: 'Aprende paso a paso cómo completar tu diagnóstico inicial',
      tiempo: '10 min',
      tipo: 'guia',
      enlace: '#'
    },
    {
      categoria: 'inicio',
      titulo: 'Configuración inicial de tu cuenta',
      descripcion: 'Todo lo que necesitas para configurar tu espacio de trabajo',
      tiempo: '5 min',
      tipo: 'guia',
      enlace: '#'
    },
    {
      categoria: 'ia',
      titulo: 'Activar tu primer agente de IA',
      descripcion: 'Guía completa para poner en marcha tu asistente virtual',
      tiempo: '15 min',
      tipo: 'guia',
      enlace: '#'
    },
    {
      categoria: 'ia',
      titulo: 'Personalizar respuestas automatizadas',
      descripcion: 'Configura las respuestas de tu agente según tu negocio',
      tiempo: '20 min',
      tipo: 'guia',
      enlace: '#'
    },
    {
      categoria: 'finanzas',
      titulo: 'Leer tu dashboard financiero',
      descripcion: 'Entiende cada métrica y KPI de tu panel de control',
      tiempo: '12 min',
      tipo: 'guia',
      enlace: '#'
    },
    {
      categoria: 'finanzas',
      titulo: 'Cargar datos de ventas',
      descripcion: 'Cómo importar y sincronizar tus datos de facturación',
      tiempo: '8 min',
      tipo: 'guia',
      enlace: '#'
    },
    {
      categoria: 'marketing',
      titulo: 'Crear tu primera campaña con IA',
      descripcion: 'Usa la inteligencia artificial para diseñar campañas efectivas',
      tiempo: '25 min',
      tipo: 'guia',
      enlace: '#'
    },
    {
      categoria: 'marketing',
      titulo: 'Generar contenido para redes sociales',
      descripcion: 'Crea posts atractivos con nuestro generador de contenido',
      tiempo: '10 min',
      tipo: 'guia',
      enlace: '#'
    }
  ];

  // Videos tutoriales
  const videos = [
  {
  titulo: 'Introducción a ChatGPT 5 para Negocios',
  duracion: '15:30',
  descripcion: 'Aprende cómo usar ChatGPT para tu empresa',
  thumbnail: 'https://img.youtube.com/vi/JlRlIaEy2IM/maxresdefault.jpg',
  url: 'https://www.youtube.com/watch?v=0Uu_VJeVVfo'
},
  {
    titulo: 'Google Gemini: IA para Emprendedores',
    duracion: '12:45',
    descripcion: 'Descubre el poder de Gemini para análisis de datos',
    thumbnail: 'https://img.youtube.com/vi/UIZAiXYceBI/maxresdefault.jpg',
    url: 'https://youtube.com/watch?v=UIZAiXYceBI'
  },
  {
    titulo: 'Claude: Tu Asistente de IA Empresarial',
    duracion: '8:20',
    descripcion: 'Casos de uso de Claude para automatización',
    thumbnail: 'https://img.youtube.com/vi/ocaR_j6LZRs/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=gv0WHhKelSE'
  }
];

  // Recursos descargables
  const recursos = [
    {
      titulo: 'Guía de Mejores Prácticas de IA',
      tipo: 'PDF',
      tamano: '2.3 MB',
      icono: <FaFileAlt />
    },
    {
      titulo: 'Plantilla de Control Financiero',
      tipo: 'Excel',
      tamano: '1.5 MB',
      icono: <FaChartLine />
    },
    {
      titulo: 'Manual de Marketing Digital',
      tipo: 'PDF',
      tamano: '3.8 MB',
      icono: <FaBullhorn />
    },
    {
      titulo: 'Checklist de Automatización',
      tipo: 'PDF',
      tamano: '800 KB',
      icono: <FaRobot />
    }
  ];

  // Filtrar guías basado en búsqueda y categoría
  const guiasFiltradas = guias.filter(guia => {
    const matchCategoria = selectedCategory === 'todos' || guia.categoria === selectedCategory;
    const matchBusqueda = guia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          guia.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategoria && matchBusqueda;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
              Inicio
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Centro de Ayuda</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ¿En qué podemos ayudarte?
            </h1>
            <p className="text-xl mb-8 opacity-95">
              Encuentra respuestas rápidas, guías detalladas y recursos para 
              aprovechar al máximo nuestras soluciones de IA
            </p>
            
            {/* Barra de búsqueda */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Buscar en el centro de ayuda..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pr-12 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Categorías de Ayuda */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explora por Categoría
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => setSelectedCategory(categoria.id)}
                className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                  selectedCategory === categoria.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className={`inline-flex p-3 rounded-lg ${categoria.color} mb-4`}>
                  <span className="text-2xl">{categoria.icono}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{categoria.nombre}</h3>
                <p className="text-gray-600 text-sm">{categoria.descripcion}</p>
              </button>
            ))}
          </div>

          {/* Botón para mostrar todas las guías */}
          {selectedCategory !== 'todos' && (
            <div className="text-center mb-8">
              <button
                onClick={() => setSelectedCategory('todos')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Ver todas las guías →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Guías Rápidas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Guías Rápidas</h2>
            <span className="text-gray-500">
              {guiasFiltradas.length} guías disponibles
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guiasFiltradas.map((guia, index) => (
              <Link
                key={index}
                href={guia.enlace}
                className="group bg-gray-50 rounded-lg p-6 hover:shadow-md transition-all hover:bg-white"
              >
                <div className="flex items-start justify-between mb-4">
                  <FaBookOpen className="text-blue-600 text-xl" />
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <FaClock className="text-xs" />
                    {guia.tiempo}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  {guia.titulo}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{guia.descripcion}</p>
                <span className="text-blue-600 text-sm font-medium group-hover:gap-2 flex items-center gap-1 transition-all">
                  Leer guía <FaArrowRight className="text-xs" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Tutoriales */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Videos Tutoriales</h2>
            <p className="text-gray-600 text-lg">
              Aprende de forma visual con nuestros tutoriales paso a paso
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <a
                key={index}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-video bg-gray-200">
                  <img 
                    src={video.thumbnail} 
                    alt={video.titulo}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaPlayCircle className="text-white text-5xl" />
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duracion}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {video.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm">{video.descripcion}</p>
                </div>
              </a>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a
              href="https://youtube.com/@impulsa-lab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              Ver todos los videos en YouTube
              <FaExternalLinkAlt className="text-sm" />
            </a>
          </div>
        </div>
      </section>

      {/* Recursos Descargables */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Recursos Descargables
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {recursos.map((recurso, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-blue-600 text-2xl">
                      {recurso.icono}
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
                        {recurso.titulo}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {recurso.tipo} • {recurso.tamano}
                      </p>
                    </div>
                  </div>
                  <FaDownload className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enlaces a Documentación */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Documentación Técnica
            </h2>
            
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Link 
                  href="/docs/api"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <div>
                    <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
                      Documentación API
                    </h3>
                    <p className="text-sm text-gray-600">
                      Integra nuestros servicios con tu sistema
                    </p>
                  </div>
                </Link>
                
                <Link 
                  href="/docs/webhooks"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <div>
                    <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
                      Webhooks y Eventos
                    </h3>
                    <p className="text-sm text-gray-600">
                      Recibe notificaciones en tiempo real
                    </p>
                  </div>
                </Link>
                
                <Link 
                  href="/docs/integraciones"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <div>
                    <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
                      Integraciones
                    </h3>
                    <p className="text-sm text-gray-600">
                      Conecta con QuickBooks, Shopify y más
                    </p>
                  </div>
                </Link>
                
                <Link 
                  href="/docs/seguridad"
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <div>
                    <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
                      Seguridad y Privacidad
                    </h3>
                    <p className="text-sm text-gray-600">
                      Conoce cómo protegemos tus datos
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Soporte Adicional */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FaHeadset className="text-5xl text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Nuestro equipo de soporte está listo para ayudarte con cualquier 
              pregunta o problema que tengas
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-gray-50 rounded-lg">
                <FaQuestionCircle className="text-3xl text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">FAQ</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Respuestas a las preguntas más frecuentes
                </p>
                <Link 
                  href="/faq"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Ver FAQ →
                </Link>
              </div>
              
              <div className="p-6 bg-gray-50 rounded-lg">
                <FaRobot className="text-3xl text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Chat en Vivo</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Habla con nuestro asistente de IA 24/7
                </p>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Iniciar Chat →
                </button>
              </div>
              
              <div className="p-6 bg-gray-50 rounded-lg">
                <FaHeadset className="text-3xl text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Soporte Premium</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Atención personalizada para clientes
                </p>
                <Link 
                  href="/contacto"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Contactar →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para transformar tu negocio con IA?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            Agenda una consultoría gratuita y descubre cómo podemos ayudarte
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Iniciar Diagnóstico 3D
              <FaArrowRight />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Hablar con un Experto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}