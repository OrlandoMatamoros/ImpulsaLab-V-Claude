'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FaChevronDown, 
  FaChevronUp, 
  FaSearch, 
  FaArrowRight, 
  FaQuestionCircle,
  FaRobot,
  FaChartLine,
  FaCogs,
  FaBullhorn,
  FaDollarSign,
  FaGraduationCap,
  FaHandshake,
  FaShieldAlt
} from 'react-icons/fa';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  // Categoría: General
  {
    id: 1,
    category: 'General',
    question: '¿Qué es Impulsa Lab?',
    answer: 'Impulsa Lab es una firma de consultoría de nueva generación con sede en Brooklyn, NY, especializada en democratizar la inteligencia de negocio para pequeñas y medianas empresas (PYMES). Utilizamos inteligencia artificial y análisis de datos para transformar los tres pilares fundamentales de tu negocio: Finanzas, Operaciones y Marketing.'
  },
  {
    id: 2,
    category: 'General',
    question: '¿Qué es el Diagnóstico 3D?',
    answer: 'El Diagnóstico 3D es nuestra metodología propietaria que evalúa la madurez de tu negocio en tres ejes fundamentales: Finanzas (control y claridad), Operaciones (eficiencia y automatización) y Marketing (identidad y atracción). Este análisis nos permite identificar tu "coordenada" exacta y aplicar soluciones de IA personalizadas que atacan los puntos críticos de tu empresa.'
  },
  {
    id: 3,
    category: 'General',
    question: '¿En qué se diferencia Impulsa Lab de otras consultoras?',
    answer: 'A diferencia de las consultoras tradicionales que entregan planes estáticos, nosotros implementamos sistemas vivos: dashboards financieros interactivos, agentes de IA que automatizan operaciones y sistemas de marketing que funcionan 24/7. No vendemos el mapa; vendemos el GPS y el combustible para el viaje. Además, nuestros precios son accesibles para PYMES, no solo para grandes corporaciones.'
  },
  {
    id: 4,
    category: 'General',
    question: '¿Dónde están ubicados?',
    answer: 'Nuestra oficina principal está ubicada en Brooklyn, NY. Atendemos presencialmente a clientes en Brooklyn, Queens y todo Nueva York, pero también ofrecemos servicios virtuales para clientes en otras ubicaciones. Puedes contactarnos al +1 929 500 1850 o visitarnos en nuestra dirección registrada.'
  },

  // Categoría: Inteligencia Artificial
  {
    id: 5,
    category: 'Inteligencia Artificial',
    question: '¿Necesito conocimientos técnicos para usar las soluciones de IA?',
    answer: 'No, absolutamente no. Nuestro enfoque es hacer la IA accesible y fácil de usar. Todas nuestras soluciones vienen con capacitación completa y están diseñadas para ser intuitivas. Te enseñamos paso a paso cómo usar cada herramienta, y nuestro soporte continuo asegura que nunca te quedes atascado.'
  },
  {
    id: 6,
    category: 'Inteligencia Artificial',
    question: '¿Qué tipo de agentes de IA pueden crear para mi negocio?',
    answer: 'Podemos crear diversos tipos de agentes según tus necesidades: chatbots de atención al cliente 24/7, asistentes para agendar citas automáticamente, sistemas de seguimiento de prospectos, generadores de reportes diarios, gestores de inventario inteligentes, y mucho más. Cada agente se personaliza completamente para tu flujo de trabajo específico.'
  },
  {
    id: 7,
    category: 'Inteligencia Artificial',
    question: '¿La IA reemplazará a mis empleados?',
    answer: 'No, la IA está diseñada para potenciar a tu equipo, no para reemplazarlo. Nuestras soluciones automatizan tareas repetitivas y manuales, liberando tiempo valioso para que tú y tu equipo se enfoquen en actividades estratégicas, creatividad y atención personalizada al cliente. Es como darle superpoderes a tu equipo actual.'
  },

  // Categoría: Servicios de Finanzas
  {
    id: 8,
    category: 'Servicios de Finanzas',
    question: '¿Qué incluye el dashboard financiero?',
    answer: 'El dashboard financiero incluye visualización en tiempo real de ingresos y gastos, análisis de rentabilidad por producto/servicio, proyecciones de flujo de caja, indicadores clave de rendimiento (KPIs), alertas automáticas para métricas críticas, y reportes personalizados. Todo esto en una interfaz clara y fácil de entender que puedes acceder desde cualquier dispositivo.'
  },
  {
    id: 9,
    category: 'Servicios de Finanzas',
    question: '¿Pueden integrarse con mi software contable actual?',
    answer: 'Sí, nuestros dashboards se pueden integrar con la mayoría de los sistemas contables populares como QuickBooks, Xero, Wave, y otros. También podemos trabajar con exportaciones de datos si prefieres no hacer una integración directa. Evaluamos tu situación específica durante el diagnóstico inicial.'
  },
  {
    id: 10,
    category: 'Servicios de Finanzas',
    question: '¿Qué es el Plan Piloto Automático vs Plan Cohete?',
    answer: 'El Plan Piloto Automático ($1,500) es ideal para negocios que necesitan control inmediato: incluye un dashboard personalizado con automatización de cálculos y capacitación. El Plan Cohete ($2,500 + suscripción) incluye todo lo anterior más análisis predictivo, modelado de escenarios, reuniones mensuales de estrategia y soporte prioritario continuo.'
  },

  // Categoría: Servicios de Operaciones
  {
    id: 11,
    category: 'Servicios de Operaciones',
    question: '¿Cuánto tiempo toma implementar un agente de IA?',
    answer: 'La implementación básica de un agente de IA (Plan Asistente Digital) toma aproximadamente 1-2 semanas. Para soluciones más complejas con múltiples agentes (Plan Equipo Completo), el proceso puede tomar 3-4 semanas. Comenzarás a ver resultados desde la primera semana con implementaciones graduales.'
  },
  {
    id: 12,
    category: 'Servicios de Operaciones',
    question: '¿Qué tareas específicas pueden automatizar?',
    answer: 'Podemos automatizar respuestas a preguntas frecuentes, agendamiento de citas, seguimiento de leads, generación de cotizaciones, procesamiento de pedidos, actualización de inventarios, envío de recordatorios, generación de reportes, clasificación de correos, y muchas otras tareas repetitivas que consumen tiempo valioso.'
  },
  {
    id: 13,
    category: 'Servicios de Operaciones',
    question: '¿Los agentes de IA funcionan en español e inglés?',
    answer: 'Sí, nuestros agentes de IA son completamente bilingües y pueden operar en español, inglés o ambos idiomas simultáneamente. Esto es especialmente valioso para negocios en Nueva York que atienden a una clientela diversa. El agente detecta automáticamente el idioma del cliente y responde en consecuencia.'
  },

  // Categoría: Servicios de Marketing
  {
    id: 14,
    category: 'Servicios de Marketing',
    question: '¿Qué incluye el Plan Identidad de marketing?',
    answer: 'El Plan Identidad ($1,200) incluye diseño de logo profesional, guía completa de marca (colores, tipografías, estilo), kit para redes sociales, 20 plantillas de contenido editables, y estrategia de messaging. Es todo lo que necesitas para establecer una presencia de marca profesional y coherente.'
  },
  {
    id: 15,
    category: 'Servicios de Marketing',
    question: '¿Pueden manejar mis redes sociales?',
    answer: 'Sí, con el Plan Crecimiento ($2,500 + $299/mes) gestionamos tus redes sociales usando IA para crear contenido relevante y atractivo. Incluye publicaciones regulares, gestión de comunidad, campañas de email marketing mensuales, y reportes detallados de rendimiento. Tú mantienes el control total mientras nosotros hacemos el trabajo pesado.'
  },
  {
  id: 16,
    category: 'Servicios de Marketing',
    question: '¿Cómo usa la IA para crear contenido?',
    answer: 'Utilizamos IA para analizar tu industria, competencia y audiencia, luego generamos ideas de contenido relevantes. La IA crea borradores iniciales que nuestro equipo humano revisa, edita y perfecciona para asegurar calidad y autenticidad. Es la combinación perfecta entre eficiencia tecnológica y toque humano.'
  },

  // Categoría: Precios y Pagos
  {
    id: 17,
    category: 'Precios y Pagos',
    question: '¿Cuáles son sus precios?',
    answer: 'Nuestros precios varían según el servicio: Finanzas desde $1,500, Operaciones desde $500, Marketing desde $1,200. Todos tienen opciones de pago único o planes con suscripción mensual para soporte continuo. Ofrecemos diagnóstico inicial gratuito y precios especiales de lanzamiento. Contáctanos para una cotización personalizada.'
  },
  {
    id: 18,
    category: 'Precios y Pagos',
    question: '¿Ofrecen planes de pago o financiamiento?',
    answer: 'Sí, entendemos que la inversión en tecnología es importante. Ofrecemos planes de pago flexibles, típicamente 50% inicial y 50% a la entrega. Para proyectos más grandes, podemos estructurar pagos en 3-4 cuotas. También aceptamos todas las tarjetas de crédito principales a través de nuestra plataforma segura.'
  },
  {
    id: 19,
    category: 'Precios y Pagos',
    question: '¿Hay costos ocultos o adicionales?',
    answer: 'No, somos completamente transparentes con nuestros precios. El costo que cotizamos incluye todo lo prometido en el plan. Los únicos costos adicionales podrían ser suscripciones a herramientas de terceros (si las necesitas) o servicios adicionales que solicites fuera del alcance original, pero siempre te informaremos antes.'
  },
  {
    id: 20,
    category: 'Precios y Pagos',
    question: '¿Cuál es su política de reembolso?',
    answer: 'Ofrecemos garantía de satisfacción de 30 días en nuestros servicios de implementación. Si no estás satisfecho con los resultados en los primeros 30 días, trabajaremos contigo para resolver cualquier problema o te devolveremos tu inversión. Para suscripciones mensuales, puedes cancelar en cualquier momento con 15 días de aviso.'
  },

  // Categoría: Proceso y Tiempos
  {
    id: 21,
    category: 'Proceso y Tiempos',
    question: '¿Cómo es el proceso de trabajo con Impulsa Lab?',
    answer: 'Nuestro proceso es simple: 1) Diagnóstico 3D gratuito (30 min), 2) Propuesta personalizada basada en tus necesidades, 3) Kick-off del proyecto con recopilación de información, 4) Desarrollo e implementación (2-4 semanas), 5) Entrega, capacitación y lanzamiento, 6) Soporte continuo y optimización. Te acompañamos en cada paso.'
  },
  {
    id: 22,
    category: 'Proceso y Tiempos',
    question: '¿Cuánto tiempo toma ver resultados?',
    answer: 'Los primeros resultados son visibles casi inmediatamente. Con dashboards financieros, tendrás claridad desde el día 1 de implementación. Los agentes de IA comienzan a trabajar en 1-2 semanas. El ROI completo típicamente se ve en 60-90 días, pero muchos clientes reportan mejoras significativas en eficiencia desde la primera semana.'
  },
  {
    id: 23,
    category: 'Proceso y Tiempos',
    question: '¿Necesito dedicar mucho tiempo al proyecto?',
    answer: 'No, diseñamos nuestro proceso para minimizar tu tiempo. Necesitarás aproximadamente 2-3 horas totales para reuniones iniciales y revisiones. El resto lo manejamos nosotros. Una vez implementado, las herramientas están diseñadas para ahorrarte tiempo, no para consumirlo.'
  },

  // Categoría: Soporte y Capacitación
  {
    id: 24,
    category: 'Soporte y Capacitación',
    question: '¿Qué tipo de soporte ofrecen después de la implementación?',
    answer: 'Todos nuestros planes incluyen soporte inicial de 30 días. Los planes con suscripción incluyen soporte prioritario continuo, actualizaciones mensuales, y reuniones estratégicas regulares. Además, tienes acceso a nuestra base de conocimientos, tutoriales en video, y respuesta a consultas por email/WhatsApp.'
  },
  {
    id: 25,
    category: 'Soporte y Capacitación',
    question: '¿Ofrecen capacitación para mi equipo?',
    answer: 'Sí, la capacitación está incluida en todos nuestros servicios. Realizamos sesiones personalizadas para asegurar que tú y tu equipo dominen las herramientas. También creamos manuales de usuario específicos y videos tutoriales. Para necesidades especiales, ofrecemos talleres privados de capacitación adicional.'
  },
  {
    id: 26,
    category: 'Soporte y Capacitación',
    question: '¿Qué pasa si necesito cambios después de la entrega?',
    answer: 'Los ajustes menores están incluidos en el período de soporte inicial. Para cambios mayores, podemos cotizarlos por separado o puedes optar por un plan de suscripción que incluye actualizaciones y modificaciones continuas. Siempre estamos disponibles para hacer crecer tu solución conforme crece tu negocio.'
  },

  // Categoría: Seguridad y Privacidad
  {
    id: 27,
    category: 'Seguridad y Privacidad',
    question: '¿Qué tan segura es mi información?',
    answer: 'La seguridad es nuestra prioridad. Utilizamos encriptación de nivel bancario para todos los datos, cumplimos con GDPR y estándares de la industria, firmamos acuerdos de confidencialidad (NDA), y solo accedemos a la información mínima necesaria. Tus datos nunca se comparten con terceros sin tu consentimiento explícito.'
  },
  {
    id: 28,
    category: 'Seguridad y Privacidad',
    question: '¿Quién tiene acceso a mis dashboards y sistemas?',
    answer: 'Solo tú y las personas que autorices tienen acceso a tus sistemas. Nosotros mantenemos acceso temporal durante la implementación y soporte (si está contratado), pero siempre con tu permiso. Puedes revocar accesos en cualquier momento y te enseñamos cómo gestionar permisos de usuarios.'
  },
  {
    id: 29,
    category: 'Seguridad y Privacidad',
    question: '¿Dónde se almacenan mis datos?',
    answer: 'Utilizamos servicios en la nube de proveedores líderes como Google Cloud y Microsoft Azure, con servidores en Estados Unidos. Tus datos están respaldados automáticamente y puedes solicitar una copia completa en cualquier momento. También puedes optar por almacenamiento local si lo prefieres.'
  }
];

const categories = [
  { name: 'Todos', icon: FaQuestionCircle, count: faqs.length },
  { name: 'General', icon: FaQuestionCircle, count: faqs.filter(f => f.category === 'General').length },
  { name: 'Inteligencia Artificial', icon: FaRobot, count: faqs.filter(f => f.category === 'Inteligencia Artificial').length },
  { name: 'Servicios de Finanzas', icon: FaChartLine, count: faqs.filter(f => f.category === 'Servicios de Finanzas').length },
  { name: 'Servicios de Operaciones', icon: FaCogs, count: faqs.filter(f => f.category === 'Servicios de Operaciones').length },
  { name: 'Servicios de Marketing', icon: FaBullhorn, count: faqs.filter(f => f.category === 'Servicios de Marketing').length },
  { name: 'Precios y Pagos', icon: FaDollarSign, count: faqs.filter(f => f.category === 'Precios y Pagos').length },
  { name: 'Proceso y Tiempos', icon: FaHandshake, count: faqs.filter(f => f.category === 'Proceso y Tiempos').length },
  { name: 'Soporte y Capacitación', icon: FaGraduationCap, count: faqs.filter(f => f.category === 'Soporte y Capacitación').length },
  { name: 'Seguridad y Privacidad', icon: FaShieldAlt, count: faqs.filter(f => f.category === 'Seguridad y Privacidad').length }
];

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'Todos' || faq.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.icon : FaQuestionCircle;
  };

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
            <span className="text-gray-900 font-medium">Preguntas Frecuentes</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
            <FaQuestionCircle className="text-4xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Preguntas Frecuentes
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-50">
            Encuentra respuestas a las preguntas más comunes sobre nuestros servicios, 
            procesos y cómo podemos ayudar a transformar tu negocio con IA
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar preguntas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Categories Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Categorías</h3>
                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                          selectedCategory === category.name
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="text-lg" />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          selectedCategory === category.name
                            ? 'bg-white/20'
                            : 'bg-gray-200'
                        }`}>
                          {category.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="lg:w-3/4">
              {filteredFaqs.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No encontramos resultados
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Intenta buscar con otros términos o explora las categorías
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('Todos');
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Limpiar búsqueda
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => {
                    const Icon = getCategoryIcon(faq.category);
                    const isOpen = openItems.includes(faq.id);
                    
                    return (
                      <div
                        key={faq.id}
                        className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md"
                      >
                        <button
                          onClick={() => toggleItem(faq.id)}
                          className="w-full px-6 py-5 flex items-start gap-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-shrink-0 mt-1">
                            <Icon className="text-blue-600 text-lg" />
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {faq.question}
                            </h3>
                            <span className="text-sm text-gray-500">
                              {faq.category}
                            </span>
                          </div>
                          <div className="flex-shrink-0 mt-1">
                            {isOpen ? (
                              <FaChevronUp className="text-gray-400" />
                            ) : (
                              <FaChevronDown className="text-gray-400" />
                            )}
                          </div>
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-6 pl-14 animate-fadeIn">
                            <p className="text-gray-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Results count */}
              {searchTerm && filteredFaqs.length > 0 && (
                <div className="mt-6 text-center text-gray-600">
                  Mostrando {filteredFaqs.length} resultado{filteredFaqs.length !== 1 ? 's' : ''} 
                  {searchTerm && ` para "${searchTerm}"`}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿No encontraste lo que buscabas?
          </h2>
          <p className="text-xl mb-8 text-blue-50">
            Nuestro equipo está listo para responder todas tus preguntas y 
            ayudarte a transformar tu negocio con inteligencia artificial
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Contactar con un Experto
              <FaArrowRight />
            </Link>
            <Link
              href="/diagnostico"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-all transform hover:scale-105 shadow-lg"
            >
              Solicitar Diagnóstico Gratuito
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}