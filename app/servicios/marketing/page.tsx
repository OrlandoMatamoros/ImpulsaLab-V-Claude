'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LINKS } from '@/lib/constants'
import { ArrowRight, Target, Megaphone, PenTool, TrendingUp, CheckCircle2, Package, Rocket, Play, X, ChevronLeft, ChevronRight } from 'lucide-react'
import ProtectedSection from '@/components/ProtectedSection'
import ContentStrategistChat from '@/components/services/marketing/ContentStrategistChat'
import AIToolsShowcase from '@/components/services/marketing/AIToolsShowcase'

export default function MarketingPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeVideoCategory, setActiveVideoCategory] = useState('todos')

  // Imágenes del portfolio organizadas
  const portfolioImages = [
    // Imágenes principales
    { src: '/images/portfolio/diagnostico 3d.jpg', category: 'principal', title: 'Diagnóstico 3D' },
    { src: '/images/portfolio/identidad visula.jpg', category: 'principal', title: 'Identidad Visual' },
    { src: '/images/portfolio/proptotipo de logo AI.jpg', category: 'principal', title: 'Prototipo Logo AI' },
    { src: '/images/portfolio/Imagen conceptual.jpg', category: 'principal', title: 'Imagen Conceptual' },
    { src: '/images/portfolio/Producto impactante.jpg', category: 'principal', title: 'Producto Impactante' },
    // Branding
    { src: '/images/portfolio/branding/Gemini_Generated_Image_tsjx6utsjx6utsjx.png', category: 'branding', title: 'Brand Identity 1' },
    { src: '/images/portfolio/branding/Gemini_Generated_Image_tsjx6utsjx6utsjx (1).png', category: 'branding', title: 'Brand Identity 2' },
    // Social
    { src: '/images/portfolio/social/Gemini_Generated_Image_svl0s2svl0s2svl0.png', category: 'social', title: 'Social Media 1' },
    { src: '/images/portfolio/social/Gemini_Generated_Image_vuffeivuffeivuff.png', category: 'social', title: 'Social Media 2' },
    // Web
    { src: '/images/portfolio/web/Gemini_Generated_Image_yd60qqyd60qqyd60.png', category: 'web', title: 'Web Design 1' },
    { src: '/images/portfolio/web/Gemini_Generated_Image_r2rcinr2rcinr2rc.png', category: 'web', title: 'Web Design 2' },
    // Ads
    { src: '/images/portfolio/ads/Gemini_Generated_Image_gna8hygna8hygna8.png', category: 'ads', title: 'Ad Campaign 1' },
    { src: '/images/portfolio/ads/Gemini_Generated_Image_3ls8nw3ls8nw3ls8.png', category: 'ads', title: 'Ad Campaign 2' }
  ];

  // Videos organizados
  const allVideos = {
    herramientas: [
      { id: 'sZ98KeJqH1Y', title: 'Generación de Imágenes con IA', description: 'Freepik AI y Midjourney' },
      { id: 'aMAbubHFe-E', title: 'Creación de Videos con IA', description: 'HeyGen y Runway' },
      { id: '1ARH9SLlqNs', title: 'Automatización de Procesos', description: 'Make y Zapier' },
      { id: 'h8d4N1151PY', title: 'Audio y Voz con IA', description: 'ElevenLabs' },
      { id: 'gqa7BqORA74', title: 'Marketing Automation', description: 'Workflows completos' }
    ],
    casos: [
      { id: 'kRhZxI5Ja9M', title: 'Caso: +300% en Conversiones', description: 'E-commerce transformation' },
      { id: 'BsaACjN7HHc', title: 'Transformación Digital Completa', description: 'De 0 a hero digital' },
      { id: 'UoKJxjQQCns', title: 'De 0 a 10K Leads', description: 'En solo 3 meses' }
    ],
    tutoriales: [
      { id: 'Em-0AuYWrs0', title: 'Tutorial: Campañas con IA', description: 'Paso a paso completo' },
      { id: '8DofthWCpcw', title: 'Configuración Inicial', description: 'Setup de herramientas' },
      { id: 'EpBkbdtFo70', title: 'Optimización Avanzada', description: 'Técnicas pro' },
      { id: 'O23hjmxhc1o', title: 'Métricas y Análisis', description: 'ROI y KPIs' }
    ]
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % portfolioImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + portfolioImages.length) % portfolioImages.length)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section MEJORADO */}
      <section className="relative bg-gradient-to-br from-purple-900 to-purple-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/portfolio/Imagen conceptual.jpg')] bg-cover bg-center" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Marketing e Identidad de Marca con IA
            </h1>
            <p className="text-xl mb-8 text-purple-100">
              Construye una marca memorable y atrae clientes con estrategias 
              de marketing potenciadas por Inteligencia Artificial
            </p>
            <Link
              href={LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all transform hover:scale-105 shadow-2xl"
            >
              Obtén tu Diagnóstico 3D Gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Visual Section NUEVA */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
              Portafolio: Creatividad Potenciada por IA
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Ejemplos reales de lo que podemos crear para tu marca
            </p>
            
            {/* Galería Principal */}
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {portfolioImages.slice(0, 8).map((image, index) => (
                <div 
                  key={index}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedImage(image.src)
                    setCurrentImageIndex(index)
                  }}
                >
                  <div className="aspect-square relative">
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-semibold">{image.title}</p>
                        <p className="text-sm capitalize opacity-90">{image.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-center text-sm text-gray-500">
              Nuevas creaciones cada semana • {portfolioImages.length} diseños disponibles
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox Mejorado */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
            }}
          >
            <X className="w-8 h-8" />
          </button>
          
          <button
            className="absolute left-4 text-white hover:text-gray-300 z-50"
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
              setSelectedImage(portfolioImages[currentImageIndex === 0 ? portfolioImages.length - 1 : currentImageIndex - 1].src)
            }}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          
          <button
            className="absolute right-4 text-white hover:text-gray-300 z-50"
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
              setSelectedImage(portfolioImages[(currentImageIndex + 1) % portfolioImages.length].src)
            }}
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          
          <Image
            src={selectedImage}
            alt="Portfolio"
            width={1200}
            height={800}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Te Suena Familiar Section - MANTENIDA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              ¿Te Suena Familiar?
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
                <p className="text-gray-700">
                  <span className="font-semibold">"Tengo un buen producto, pero nadie me conoce"</span> 
                  - No sabes cómo hacer que tu negocio destaque en un mercado saturado.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
                <p className="text-gray-700">
                  <span className="font-semibold">"Publico en redes pero no veo resultados"</span> 
                  - Inviertes tiempo en contenido que no genera engagement ni ventas.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
                <p className="text-gray-700">
                  <span className="font-semibold">"Mi competencia parece más profesional"</span> 
                  - Tu imagen no refleja la calidad de tu servicio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Herramientas de IA Section NUEVA */}
      <AIToolsShowcase />

      {/* Video Hub Section MEJORADA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
              Centro de Aprendizaje
            </h2>
            <p className="text-center text-gray-600 mb-8 text-lg">
              Masterclasses, tutoriales y casos de éxito
            </p>

            {/* Tabs */}
            <div className="flex justify-center gap-3 mb-12 flex-wrap">
              {['todos', 'herramientas', 'casos', 'tutoriales'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveVideoCategory(cat)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                    activeVideoCategory === cat
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Grid de videos */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeVideoCategory === 'todos' 
                ? [...allVideos.herramientas, ...allVideos.casos, ...allVideos.tutoriales]
                : allVideos[activeVideoCategory as keyof typeof allVideos] || []
              ).map((video) => (
                <div key={video.id} className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <div className="aspect-video relative">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-semibold text-gray-900">{video.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chat Estratega Section NUEVA */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
              ¿Listo para tu Primera Estrategia de Contenidos?
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Nuestro Estratega IA te ayudará a crear un plan personalizado en 60 segundos
            </p>
            <ContentStrategistChat />
          </div>
        </div>
      </section>

      {/* CONTENIDO PROTEGIDO - MANTENIDO TAL CUAL */}
      <ProtectedSection
        message="Regístrate gratis para acceder a nuestra metodología completa de marketing con IA, planes detallados y casos de éxito"
        showPreview={true}
        previewBlur={false}
      >
        {/* Metodología Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
                Nuestra Metodología de Marketing con IA
              </h2>
              <p className="text-center text-gray-600 mb-12">
                Un proceso probado para construir tu presencia digital
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">1. Análisis de Marca</h3>
                      <p className="text-gray-600">
                        Definimos tu propuesta única de valor y analizamos a tu competencia 
                        con herramientas de IA para identificar oportunidades de mercado.
                      </p>
                      <div className="mt-3 space-y-1 text-sm text-gray-500">
                        <div>• Análisis competitivo automatizado</div>
                        <div>• Investigación de audiencia con IA</div>
                        <div>• Definición de buyer personas</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <PenTool className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">2. Identidad Visual</h3>
                      <p className="text-gray-600">
                        Creamos tu logo, paleta de colores y guía de estilo con 
                        asistencia de IA generativa para garantizar consistencia.
                      </p>
                      <div className="mt-3 space-y-1 text-sm text-gray-500">
                        <div>• Logo y marca gráfica</div>
                        <div>• Paleta de colores estratégica</div>
                        <div>• Guía de estilo completa</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Megaphone className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">3. Estrategia de Contenido</h3>
                      <p className="text-gray-600">
                        Desarrollamos un calendario editorial y creamos contenido 
                        optimizado con copywriting de IA que convierte.
                      </p>
                      <div className="mt-3 space-y-1 text-sm text-gray-500">
                        <div>• Calendario editorial mensual</div>
                        <div>• Copywriting optimizado para conversión</div>
                        <div>• Contenido multimedia automatizado</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">4. Implementación y Análisis</h3>
                      <p className="text-gray-600">
                        Lanzamos campañas y monitoreamos resultados con dashboards 
                        en tiempo real para optimización continua.
                      </p>
                      <div className="mt-3 space-y-1 text-sm text-gray-500">
                        <div>• Automatización de campañas</div>
                        <div>• Dashboards de métricas en vivo</div>
                        <div>• Optimización basada en datos</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Casos de Éxito Preview */}
              <div className="mt-16 bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
                  Resultados Reales de Nuestros Clientes
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">+340%</div>
                    <div className="text-gray-700">Aumento en engagement</div>
                    <div className="text-sm text-gray-500 mt-2">Restaurante Gourmet</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">+180%</div>
                    <div className="text-gray-700">Crecimiento en ventas</div>
                    <div className="text-sm text-gray-500 mt-2">E-commerce Fashion</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">+250%</div>
                    <div className="text-gray-700">Leads calificados</div>
                    <div className="text-sm text-gray-500 mt-2">Consultoría B2B</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Planes Section - MANTENIDO */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Planes de Marketing con IA
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Plan Identidad */}
                <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-purple-500 transition-all duration-300 hover:shadow-xl">
                  <div className="mb-4">
                    <Package className="w-12 h-12 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Plan Identidad</h3>
                  <p className="text-gray-600 mb-6">
                    Construye los cimientos de tu marca profesional con IA
                  </p>
                  <div className="text-3xl font-bold mb-6">
                    Desde <span className="text-purple-600">$1,200</span>
                    <div className="text-sm font-normal text-gray-500 mt-1">Pago único</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Logo profesional y guía de marca</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Kit completo de redes sociales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">50 plantillas de contenido generadas con IA</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Estrategia de messaging y tono de voz</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Análisis competitivo con IA</span>
                    </li>
                  </ul>
                  <Link
                    href={LINKS.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Empezar Ahora
                  </Link>
                </div>

                {/* Plan Crecimiento */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-500 rounded-lg p-8 relative hover:shadow-2xl transition-all duration-300">
                  <div className="absolute -top-4 right-4 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Más Popular
                  </div>
                  <div className="mb-4">
                    <Rocket className="w-12 h-12 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Plan Crecimiento</h3>
                  <p className="text-gray-600 mb-6">
                    Marketing completo con IA para escalar tu negocio exponencialmente
                  </p>
                  <div className="text-3xl font-bold mb-6">
                    Desde <span className="text-purple-600">$2,500</span>
                    <div className="text-sm font-normal text-gray-600 mt-1">+ $800/mes gestión</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Todo del Plan Identidad</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Gestión automatizada de redes con IA</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Campañas de email marketing inteligentes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Analytics avanzados y reportes mensuales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Chatbot de atención 24/7</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">Optimización continua con machine learning</span>
                    </li>
                  </ul>
                  <Link
                    href={LINKS.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Agenda tu Diagnóstico
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ProtectedSection>

      {/* CTA Final MEJORADO */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para Brillar en el Mercado?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Descubre cómo la IA puede transformar tu marketing y hacer crecer 
              tu negocio de forma exponencial
            </p>
            <Link
              href={LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-purple-900 px-10 py-5 rounded-lg font-bold text-lg hover:bg-purple-50 transition-all transform hover:scale-105 shadow-2xl"
            >
              Obtén tu Diagnóstico 3D Gratis
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
