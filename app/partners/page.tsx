'use client';

import Link from 'next/link';
import { 
  FaArrowRight, 
  FaCheckCircle, 
  FaHandshake, 
  FaRocket, 
  FaLightbulb,
  FaChartLine,
  FaUsers,
  FaGlobe,
  FaAward,
  FaBriefcase,
  FaCogs,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaStar
} from 'react-icons/fa';

export default function Partners() {
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
                      <span className="text-gray-900">Partners</span>
                  </nav>
              </div>

              {/* Hero Section */}
              <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
                  <div className="container mx-auto px-4 text-center">
                      <div className="flex justify-center mb-6">
                          <FaHandshake className="text-6xl animate-pulse" />
                      </div>
                      <h1 className="text-4xl md:text-5xl font-bold mb-6">
                          Crecemos Juntos, Transformamos el Futuro
                      </h1>
                      <p className="text-xl mb-8 max-w-3xl mx-auto">
                          Únete a nuestro ecosistema de partners y juntos llevemos la transformación
                          digital con IA a miles de empresas en Nueva York y más allá
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                          <Link
                              href="/contacto"
                              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
                          >
                              Conviértete en Partner
                              <FaArrowRight />
                          </Link>
                          <a
                              href="#beneficios"
                              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
                          >
                              Ver Beneficios
                          </a>
                      </div>
                  </div>
              </section>

              {/* Por qué ser Partner */}
              <section className="py-16 bg-white">
                  <div className="container mx-auto px-4">
                      <div className="text-center mb-12">
                          <h2 className="text-3xl md:text-4xl font-bold mb-4">
                              ¿Por qué ser Partner de Impulsa Lab?
                          </h2>
                          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                              Somos más que una consultora: somos el puente entre la tecnología de vanguardia
                              y el éxito empresarial tangible
                          </p>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                          <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                              <FaRocket className="text-4xl text-blue-600 mb-4" />
                              <h3 className="text-xl font-bold mb-3">Crecimiento Acelerado</h3>
                              <p className="text-gray-600">
                                  Accede a un mercado de más de 120,000 PYMES en Brooklyn y Queens
                                  que buscan activamente soluciones de transformación digital
                              </p>
                          </div>

                          <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                              <FaLightbulb className="text-4xl text-purple-600 mb-4" />
                              <h3 className="text-xl font-bold mb-3">Tecnología de Vanguardia</h3>
                              <p className="text-gray-600">
                                  Integra las últimas soluciones de IA y automatización en tu
                                  portafolio de servicios sin inversión en desarrollo
                              </p>
                          </div>

                          <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                              <FaChartLine className="text-4xl text-green-600 mb-4" />
                              <h3 className="text-xl font-bold mb-3">Modelo Win-Win</h3>
                              <p className="text-gray-600">
                                  Esquemas de comisiones competitivas y oportunidades de
                                  co-creación de servicios exclusivos para tu mercado
                              </p>
                          </div>

                          <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                              <FaUsers className="text-4xl text-orange-600 mb-4" />
                              <h3 className="text-xl font-bold mb-3">Red de Colaboración</h3>
                              <p className="text-gray-600">
                                  Conecta con otros partners, comparte mejores prácticas y
                                  participa en eventos exclusivos de networking
                              </p>
                          </div>

                          <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                              <FaGlobe className="text-4xl text-indigo-600 mb-4" />
                              <h3 className="text-xl font-bold mb-3">Alcance Expandido</h3>
                              <p className="text-gray-600">
                                  Amplía tu presencia en el mercado hispano de Nueva York,
                                  el segmento de mayor crecimiento empresarial
                              </p>
                          </div>

                          <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                              <FaAward className="text-4xl text-red-600 mb-4" />
                              <h3 className="text-xl font-bold mb-3">Certificación y Formación</h3>
                              <p className="text-gray-600">
                                  Capacitación continua en IA empresarial y certificación
                                  oficial como Partner Estratégico de Impulsa Lab
                              </p>
                          </div>
                      </div>
                  </div>
              </section>

              {/* Tipos de Alianzas */}
              <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="container mx-auto px-4">
                      <div className="text-center mb-12">
                          <h2 className="text-3xl md:text-4xl font-bold mb-4">
                              Tipos de Alianzas Estratégicas
                          </h2>
                          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                              Diseñamos programas de partnership adaptados a tu modelo de negocio
                          </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                              <div className="flex items-center mb-4">
                                  <FaBriefcase className="text-3xl text-blue-600 mr-4" />
                                  <h3 className="text-2xl font-bold">Partner de Referidos</h3>
                              </div>
                              <p className="text-gray-600 mb-4">
                                  Ideal para profesionales y empresas que tienen contacto directo con PYMES
                              </p>
                              <ul className="space-y-3 mb-6">
                                  <li className="flex items-start gap-2">
                                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                      <span>Comisiones del 15-25% por cliente referido exitoso</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                      <span>Material de marketing y ventas personalizado</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                      <span>Dashboard para seguimiento de referidos y comisiones</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                      <span>Formación básica en productos y servicios</span>
                                  </li>
                              </ul>
                              <div className="text-sm text-gray-500">
                                  <strong>Perfil ideal:</strong> Contadores, abogados corporativos,
                                  consultores independientes, cámaras de comercio
                              </div>
                          </div>

                          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                              <div className="flex items-center mb-4">
                                  <FaCogs className="text-3xl text-purple-600 mr-4" />
                                  <h3 className="text-2xl font-bold">Partner Tecnológico</h3>
                              </div>
                              <p className="text-gray-600 mb-4">
                                  Para empresas de tecnología que buscan expandir su oferta con IA
                              </p>
                              <ul className="space-y-3 mb-6">
                                  <li className="flex items-start gap-2">
                                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                      <span>Integración de nuestras soluciones en tu stack</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                      <span>Co-desarrollo de productos especializados</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                      <span>Acceso a nuestra API y plataforma de IA</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                      <span>Oportunidades de white-label y revenue sharing</span>
                                  </li>
                              </ul>
                              <div className="text-sm text-gray-500">
                                  <strong>Perfil ideal:</strong> Agencias digitales, desarrolladores de software,
                                  integradores de sistemas, proveedores de SaaS
                              </div>
                          </div>

                          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                              <div className="flex items-center mb-4">
                                  <FaUsers className="text-3xl text-green-600 mr-4" />
                                  <h3 className="text-2xl font-bold">Partner Estratégico</h3>
                              </div>
                              <p className="text-gray-600 mb-4">
                                  Alianzas profundas con organizaciones que comparten nuestra visión
                              </p>
                              <ul className="space-y-3 mb-6">
                                  <li className="flex items-start gap-2">
                                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                      <span>Colaboración en programas y eventos conjuntos</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                      <span>Co-marketing y presencia de marca compartida</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                      <span>Acceso prioritario a nuevos servicios y tecnologías</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                      <span>Participación en la planificación estratégica</span>
                                  </li>
                              </ul>
                              <div className="text-sm text-gray-500">
                                  <strong>Perfil ideal:</strong> Instituciones educativas, organizaciones sin
                                  fines de lucro, incubadoras, fondos de inversión
                              </div>
                          </div>

                          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                              <div className="flex items-center mb-4">
                                  <FaGlobe className="text-3xl text-orange-600 mr-4" />
                                  <h3 className="text-2xl font-bold">Partner de Canal</h3>
                              </div>
                              <p className="text-gray-600 mb-4">
                                  Distribuidores y revendedores de nuestras soluciones
                              </p>
                              <ul className="space-y-3 mb-6">
                                  <li className="flex items-start gap-2">
                                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                      <span>Licencias de distribución con márgenes competitivos</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                      <span>Soporte técnico y comercial dedicado</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                      <span>Territorios exclusivos o semi-exclusivos</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                      <span>Programa de certificación y entrenamiento intensivo</span>
                                  </li>
                              </ul>
                              <div className="text-sm text-gray-500">
                                  <strong>Perfil ideal:</strong> Consultoras establecidas, empresas de servicios
                                  profesionales, distribuidores de tecnología
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* Beneficios */}
              <section id="beneficios" className="py-16 bg-white">
                  <div className="container mx-auto px-4">
                      <div className="text-center mb-12">
                          <h2 className="text-3xl md:text-4xl font-bold mb-4">
                              Beneficios Exclusivos para Partners
                          </h2>
                          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                              Más que una alianza comercial, una relación de crecimiento mutuo
                          </p>
                      </div>

                      <div className="max-w-5xl mx-auto">
                          <div className="grid md:grid-cols-2 gap-6">
                              <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-lg hover:shadow-md transition-shadow">
                                  <FaCheckCircle className="text-2xl text-blue-600 flex-shrink-0 mt-1" />
                                  <div>
                                      <h3 className="font-bold mb-2">Formación Continua</h3>
                                      <p className="text-gray-600">
                                          Acceso ilimitado a nuestros talleres de IA empresarial y certificaciones
                                          exclusivas valoradas en más de $5,000 anuales
                                      </p>
                                  </div>
                              </div>

                              <div className="flex items-start gap-4 p-6 bg-purple-50 rounded-lg hover:shadow-md transition-shadow">
                                  <FaCheckCircle className="text-2xl text-purple-600 flex-shrink-0 mt-1" />
                                  <div>
                                      <h3 className="font-bold mb-2">Portal de Partners</h3>
                                      <p className="text-gray-600">
                                          Plataforma exclusiva con recursos de ventas, materiales de marketing,
                                          casos de éxito y herramientas de gestión de clientes
                                      </p>
                                  </div>
                              </div>

                              <div className="flex items-start gap-4 p-6 bg-green-50 rounded-lg hover:shadow-md transition-shadow">
                                  <FaCheckCircle className="text-2xl text-green-600 flex-shrink-0 mt-1" />
                                  <div>
                                      <h3 className="font-bold mb-2">Soporte Prioritario</h3>
                                      <p className="text-gray-600">
                                          Línea directa con nuestro equipo técnico y comercial, con tiempos de
                                          respuesta garantizados en menos de 24 horas
                                      </p>
                                  </div>
                              </div>

                              <div className="flex items-start gap-4 p-6 bg-orange-50 rounded-lg hover:shadow-md transition-shadow">
                                  <FaCheckCircle className="text-2xl text-orange-600 flex-shrink-0 mt-1" />
                                  <div>
                                      <h3 className="font-bold mb-2">Eventos VIP</h3>
                                      <p className="text-gray-600">
                                          Invitaciones a eventos exclusivos de networking, conferencias de
                                          industria y sesiones estratégicas con líderes del sector
                                      </p>
                                  </div>
                              </div>

                              <div className="flex items-start gap-4 p-6 bg-indigo-50 rounded-lg hover:shadow-md transition-shadow">
                                  <FaCheckCircle className="text-2xl text-indigo-600 flex-shrink-0 mt-1" />
                                  <div>
                                      <h3 className="font-bold mb-2">Co-innovación</h3>
                                      <p className="text-gray-600">
                                          Participación en nuestro laboratorio de innovación para co-crear
                                          nuevas soluciones adaptadas a mercados específicos
                                      </p>
                                  </div>
                              </div>

                              <div className="flex items-start gap-4 p-6 bg-red-50 rounded-lg hover:shadow-md transition-shadow">
                                  <FaCheckCircle className="text-2xl text-red-600 flex-shrink-0 mt-1" />
                                  <div>
                                      <h3 className="font-bold mb-2">Reconocimiento</h3>
                                      <p className="text-gray-600">
                                          Programa de premios anuales para partners destacados, con visibilidad
                                          en medios y casos de éxito compartidos
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* Partners Actuales */}
              <section className="py-16 bg-gray-100">
                  <div className="container mx-auto px-4">
                      <div className="text-center mb-12">
                          <h2 className="text-3xl md:text-4xl font-bold mb-4">
                              Nuestro Ecosistema de Partners
                          </h2>
                          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                              Empresas y organizaciones que ya confían en nosotros
                          </p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                          {/* Logos placeholder - En producción serían imágenes reales */}
                          {[
                              { name: "TechSolutions NYC", icon: FaCogs },
                              { name: "Brooklyn Chamber", icon: FaBuilding },
                              { name: "Latino Business Hub", icon: FaUsers },
                              { name: "Digital Innovators", icon: FaLightbulb },
                              { name: "Queens Enterprise", icon: FaBriefcase },
                              { name: "AI Partners Group", icon: FaRocket },
                              { name: "NYC Growth Lab", icon: FaChartLine },
                              { name: "Global Tech Alliance", icon: FaGlobe }
                          ].map((partner, i) => (
                              <div
                                  key={i}
                                  className="bg-white rounded-lg p-8 flex flex-col items-center justify-center h-32 hover:shadow-lg transition-shadow cursor-pointer group"
                              >
                                  <partner.icon className="text-3xl text-gray-400 mb-2 group-hover:text-blue-600 transition-colors" />
                                  <p className="text-sm text-center text-gray-600 group-hover:text-gray-900 transition-colors">
                                      {partner.name}
                                  </p>
                              </div>
                          ))}
                      </div>

                      <div className="mt-12 text-center">
                          <div className="flex justify-center items-center gap-4 mb-4">
                              <FaStar className="text-yellow-500 text-2xl" />
                              <FaStar className="text-yellow-500 text-2xl" />
                              <FaStar className="text-yellow-500 text-2xl" />
                              <FaStar className="text-yellow-500 text-2xl" />
                              <FaStar className="text-yellow-500 text-2xl" />
                          </div>
                          <p className="text-gray-600 mb-2">
                              Más de <span className="font-bold text-2xl text-blue-600">25 partners</span> activos
                          </p>
                          <p className="text-gray-500">
                              Transformando el ecosistema empresarial de Nueva York con tecnología e innovación
                          </p>
                      </div>
                  </div>
              </section>

              {/* Proceso para ser Partner */}
              <section className="py-16 bg-white">
                  <div className="container mx-auto px-4">
                      <div className="text-center mb-12">
                          <h2 className="text-3xl md:text-4xl font-bold mb-4">
                              Proceso Simple para Convertirte en Partner
                          </h2>
                          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                              En solo 4 pasos puedes comenzar a transformar negocios con nosotros
                          </p>
                      </div>

                      <div className="max-w-5xl mx-auto">
                          <div className="grid md:grid-cols-4 gap-8">
                              <div className="text-center group">
                                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto group-hover:scale-110 transition-transform">
                                      1
                                  </div>
                                  <h3 className="font-bold mb-2">Contacto Inicial</h3>
                                  <p className="text-sm text-gray-600">
                                      Completa el formulario o llámanos para iniciar la conversación
                                  </p>
                              </div>

                              <div className="text-center group">
                                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto group-hover:scale-110 transition-transform">
                                      2
                                  </div>
                                  <h3 className="font-bold mb-2">Evaluación Mutua</h3>
                                  <p className="text-sm text-gray-600">
                                      Analizamos sinergias y definimos el tipo de partnership ideal
                                  </p>
                              </div>

                              <div className="text-center group">
                                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto group-hover:scale-110 transition-transform">
                                      3
                                  </div>
                                  <h3 className="font-bold mb-2">Acuerdo y Formación</h3>
                                  <p className="text-sm text-gray-600">
                                      Formalizamos la alianza y te capacitamos en nuestras soluciones
                                  </p>
                              </div>

                              <div className="text-center group">
                                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto group-hover:scale-110 transition-transform">
                                      4
                                  </div>
                                  <h3 className="font-bold mb-2">Lanzamiento</h3>
                                  <p className="text-sm text-gray-600">
                                      Comenzamos a trabajar juntos y a generar resultados
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* Contacto Directo */}
              <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="container mx-auto px-4">
                      <div className="max-w-4xl mx-auto">
                          <div className="text-center mb-12">
                              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                  ¿Listo para Formar Parte de Nuestro Ecosistema?
                              </h2>
                              <p className="text-xl text-gray-600">
                                  Contáctanos hoy y descubre cómo podemos crecer juntos
                              </p>
                          </div>

                          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                              <div className="grid md:grid-cols-2 gap-8">
                                  <div className="space-y-6">
                                      <h3 className="text-2xl font-bold mb-4">Información de Contacto</h3>

                                      <div className="flex items-start gap-4">
                                          <FaEnvelope className="text-blue-600 text-xl mt-1" />
                                          <div>
                                              <p className="font-semibold">Email para Partners</p>
                                              <a href="mailto:partners@tuimpulsalab.com" className="text-blue-600 hover:underline">
                                                  partners@tuimpulsalab.com
                                              </a>
                                          </div>
                                      </div>

                                      <div className="flex items-start gap-4">
                                          <FaPhone className="text-blue-600 text-xl mt-1" />
                                          <div>
                                              <p className="font-semibold">Teléfono Directo</p>
                                              <a href="tel:+19295001850" className="text-blue-600 hover:underline">
                                                  +1 929 500 1850
                                              </a>
                                          </div>
                                      </div>

                                      <div className="flex items-start gap-4">
                                          <FaBuilding className="text-blue-600 text-xl mt-1" />
                                          <div>
                                              <p className="font-semibold">Oficina Principal</p>
                                              <p className="text-gray-600">Brooklyn, NY</p>
                                              <p className="text-gray-600">Estados Unidos</p>
                                          </div>
                                      </div>

                                      <div className="flex items-start gap-4">
                                          <FaGlobe className="text-blue-600 text-xl mt-1" />
                                          <div>
                                              <p className="font-semibold">Horario de Atención</p>
                                              <p className="text-gray-600">Lunes a Viernes</p>
                                              <p className="text-gray-600">9:00 AM - 6:00 PM EST</p>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="space-y-6">
                                      <h3 className="text-2xl font-bold mb-4">Próximos Pasos</h3>

                                      <div className="bg-blue-50 rounded-lg p-6">
                                          <h4 className="font-semibold mb-3">Para Empresas Tecnológicas</h4>
                                          <p className="text-gray-600 mb-4">
                                              Si tienes una solución tecnológica complementaria o buscas integrar IA
                                              en tu portafolio, agenda una demostración técnica.
                                          </p>
                                          <Link
                                              href="/contacto"
                                              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
                                          >
                                              Solicitar Demo Técnica
                                              <FaArrowRight />
                                          </Link>
                                      </div>

                                      <div className="bg-purple-50 rounded-lg p-6">
                                          <h4 className="font-semibold mb-3">Para Consultores y Asesores</h4>
                                          <p className="text-gray-600 mb-4">
                                              Si trabajas con PYMES y quieres agregar valor con soluciones de IA,
                                              conoce nuestro programa de referidos.
                                          </p>
                                          <Link
                                              href="/contacto"
                                              className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:underline"
                                          >
                                              Conocer Programa
                                              <FaArrowRight />
                                          </Link>
                                      </div>
                                  </div>
                              </div>

                              <div className="mt-8 pt-8 border-t text-center">
                                  <p className="text-gray-600 mb-4">
                                      ¿Prefieres una conversación directa?
                                  </p>
                                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                      <a
                                          href="tel:+19295001850"
                                          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                                      >
                                          <FaPhone />
                                          Llamar Ahora
                                      </a>

                                      <Link
                                          href="/contacto"
                                          className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all"
                                      >
                                          <FaEnvelope />
                                          Enviar Email
                                      </Link>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* CTA Final */}
              <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
                  <div className="container mx-auto px-4 text-center">
                      <h2 className="text-3xl font-bold mb-4">
                          El Futuro de los Negocios se Construye en Alianza
                      </h2>
                      <p className="text-xl mb-8 max-w-3xl mx-auto">
                          Juntos podemos democratizar el acceso a la inteligencia artificial y
                          transformar miles de empresas en Nueva York
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                          <Link
                              href="/contacto"
                              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
                          >
                              Agenda una Reunión
                              <FaArrowRight />
                          </Link>
                          <a
                              href="tel:+19295001850"
                              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
                          >
                              <FaPhone />
                              Hablar con un Asesor
                          </a>
                      </div>
                  </div>
                  </section>
              </div>
          </div>
      );
    }