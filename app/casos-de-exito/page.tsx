'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { 
  FaArrowRight, 
  FaChartLine, 
  FaRobot, 
  FaClock, 
  FaDollarSign,
  FaUsers,
  FaPercentage,
  FaQuoteLeft,
  FaCheckCircle,
  FaIndustry,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLightbulb
} from 'react-icons/fa';

export default function CasosDeExito() {
  const [selectedCase, setSelectedCase] = useState(0);

  const casosDeEstudio = [
    {
      id: 1,
      empresa: "Sabor Caribeño Restaurant",
      industria: "Gastronomía",
      ubicacion: "Brooklyn, NY",
      duracion: "3 meses",
      logo: "🍽️",
      resumen: "Restaurante familiar dominicano que triplicó su rentabilidad mediante automatización y análisis de datos",
      problema: {
        titulo: "El Desafío",
        descripcion: "María Rodríguez, propietaria de Sabor Caribeño, trabajaba 14 horas diarias pero no entendía por qué su restaurante apenas generaba ganancias. Sin control de inventario, pérdidas por desperdicios y sin presencia digital efectiva.",
        puntosDolor: [
          "Sin visibilidad de costos reales por plato",
          "40% de desperdicio en inventario perecedero",
          "Pérdida de clientes por falta de sistema de reservas",
          "0% de presencia en redes sociales"
        ]
      },
      solucion: {
        titulo: "La Transformación con IA",
        descripcion: "Implementamos nuestro Plan Cohete con un enfoque integral en los tres pilares del negocio.",
        implementaciones: [
          {
            area: "Finanzas",
            accion: "Dashboard interactivo con análisis de rentabilidad por plato y predicción de demanda"
          },
          {
            area: "Operaciones",
            accion: "Agente IA para gestión de inventario y sistema automatizado de reservas"
          },
          {
            area: "Marketing",
            accion: "Estrategia de contenido con IA y campañas segmentadas en redes sociales"
          }
        ]
      },
      resultados: {
        titulo: "Resultados Medibles",
        metricas: [
          { label: "Aumento en rentabilidad", valor: "285%", icono: FaChartLine },
          { label: "Reducción de desperdicio", valor: "75%", icono: FaPercentage },
          { label: "Nuevos clientes mensuales", valor: "+150", icono: FaUsers },
          { label: "Horas liberadas semanalmente", valor: "35h", icono: FaClock }
        ],
        roi: "ROI de 520% en 3 meses"
      },
      testimonio: {
        texto: "Impulsa Lab no solo salvó mi negocio, me devolvió mi vida. Ahora trabajo 8 horas en lugar de 14, y mi restaurante genera 3 veces más ganancias. El dashboard financiero es como tener un CFO trabajando 24/7.",
        autor: "María Rodríguez",
        cargo: "Propietaria, Sabor Caribeño"
      }
    },
    {
      id: 2,
      empresa: "TechFix Solutions",
      industria: "Servicios Técnicos",
      ubicacion: "Queens, NY",
      duracion: "2 meses",
      logo: "💻",
      resumen: "Empresa de reparación de computadoras que automatizó su servicio al cliente y duplicó su capacidad operativa",
      problema: {
        titulo: "El Desafío",
        descripcion: "Carlos Méndez, fundador de TechFix, perdía el 60% de llamadas de clientes potenciales por estar ocupado reparando equipos. Sin sistema de seguimiento, cotizaciones manuales lentas y cero automatización.",
        puntosDolor: [
          "60% de llamadas perdidas = ventas perdidas",
          "3 horas diarias en cotizaciones manuales",
          "Sin seguimiento a clientes post-servicio",
          "Agenda desorganizada con dobles reservas frecuentes"
        ]
      },
      solucion: {
        titulo: "La Transformación con IA",
        descripcion: "Diseñamos un ecosistema de agentes IA que actúan como su equipo virtual 24/7.",
        implementaciones: [
          {
            area: "Operaciones",
            accion: "Agente IA de atención al cliente y sistema de cotización automática"
          },
          {
            area: "Finanzas",
            accion: "Sistema de facturación integrado con análisis predictivo de flujo de caja"
          },
          {
            area: "Marketing",
            accion: "Campañas de email automatizadas y programa de referidos con IA"
          }
        ]
      },
      resultados: {
        titulo: "Resultados Medibles",
        metricas: [
          { label: "Aumento en ventas", valor: "120%", icono: FaDollarSign },
          { label: "Tasa de conversión", valor: "45%", icono: FaChartLine },
          { label: "Clientes atendidos/día", valor: "2.5x", icono: FaUsers },
          { label: "Tiempo en cotizaciones", valor: "-90%", icono: FaClock }
        ],
        roi: "ROI de 380% en 2 meses"
      },
      testimonio: {
        texto: "El agente IA atiende a mis clientes mientras yo reparo. Es como tener 3 empleados trabajando 24/7 pero sin el costo. Mi negocio se transformó de supervivencia a expansión en solo 2 meses.",
        autor: "Carlos Méndez",
        cargo: "CEO, TechFix Solutions"
      }
    },
    {
      id: 3,
      empresa: "Belleza Latina Spa",
      industria: "Salud y Bienestar",
      ubicacion: "Brooklyn, NY",
      duracion: "4 meses",
      logo: "💆‍♀️",
      resumen: "Spa boutique que creció de 1 a 3 locaciones mediante optimización de operaciones y marketing digital",
      problema: {
        titulo: "El Desafío",
        descripcion: "Andrea Jiménez tenía un spa exitoso pero no podía escalar. Sin datos para tomar decisiones de expansión, marketing inconsistente y operaciones manuales que consumían todo su tiempo.",
        puntosDolor: [
          "Sin análisis de servicios más rentables",
          "30% de no-shows sin sistema de confirmación",
          "Marketing esporádico sin estrategia",
          "Imposible delegar por falta de sistemas"
        ]
      },
      solucion: {
        titulo: "La Transformación con IA",
        descripcion: "Creamos una infraestructura digital que permitió la expansión controlada del negocio.",
        implementaciones: [
          {
            area: "Finanzas",
            accion: "Análisis de rentabilidad por servicio y ubicación con proyecciones de expansión"
          },
          {
            area: "Operaciones",
            accion: "Sistema de booking con IA, recordatorios automáticos y gestión multi-local"
          },
          {
            area: "Marketing",
            accion: "Marca profesional, contenido viral en redes y programa de membresías"
          }
        ]
      },
      resultados: {
        titulo: "Resultados Medibles",
        metricas: [
          { label: "Nuevas ubicaciones", valor: "+2", icono: FaMapMarkerAlt },
          { label: "Incremento ingresos", valor: "340%", icono: FaDollarSign },
          { label: "Reducción no-shows", valor: "85%", icono: FaPercentage },
          { label: "Seguidores en redes", valor: "+5K", icono: FaUsers }
        ],
        roi: "ROI de 680% en 4 meses"
      },
      testimonio: {
        texto: "Pasé de ser una técnica exhausta a ser una verdadera empresaria. Los sistemas de Impulsa Lab me permitieron abrir 2 nuevas ubicaciones con confianza total en los números. ¡Es increíble!",
        autor: "Andrea Jiménez",
        cargo: "Fundadora, Belleza Latina Spa"
      }
    },
    {
      id: 4,
      empresa: "Brooklyn Legal Associates",
      industria: "Servicios Profesionales",
      ubicacion: "Brooklyn, NY",
      duracion: "2 meses",
      logo: "⚖️",
      resumen: "Firma legal que automatizó procesos administrativos y aumentó su capacidad de casos en 200%",
      problema: {
        titulo: "El Desafío",
        descripcion: "El abogado Miguel Torres pasaba 50% de su tiempo en tareas administrativas. Sin sistema de gestión de casos, documentación manual y pérdida de clientes potenciales por respuesta lenta.",
        puntosDolor: [
          "5 horas diarias en tareas administrativas",
          "48 horas de respuesta promedio a clientes",
          "Sin seguimiento sistemático de casos",
          "Documentación desorganizada y pérdida de tiempo"
        ]
      },
      solucion: {
        titulo: "La Transformación con IA",
        descripcion: "Implementamos automatización inteligente para liberar tiempo valioso del profesional.",
        implementaciones: [
          {
            area: "Operaciones",
            accion: "IA para gestión documental, respuestas automáticas y seguimiento de casos"
          },
          {
            area: "Finanzas",
            accion: "Sistema de facturación automática y análisis de rentabilidad por tipo de caso"
          },
          {
            area: "Marketing",
            accion: "Presencia digital profesional y generación automática de contenido legal"
          }
        ]
      },
      resultados: {
        titulo: "Resultados Medibles",
        metricas: [
          { label: "Casos mensuales", valor: "+200%", icono: FaIndustry },
          { label: "Tiempo de respuesta", valor: "2h", icono: FaClock },
          { label: "Eficiencia operativa", valor: "+150%", icono: FaChartLine },
          { label: "Satisfacción cliente", valor: "98%", icono: FaUsers }
        ],
        roi: "ROI de 450% en 2 meses"
      },
      testimonio: {
        texto: "La IA de Impulsa Lab me devolvió mi práctica legal. Ahora me enfoco en lo que amo: defender a mis clientes. Los sistemas automáticos manejan todo lo demás. Es revolucionario.",
        autor: "Miguel Torres",
        cargo: "Socio Principal, Brooklyn Legal Associates"
      }
    }
  ];

  const selectedCaseData = casosDeEstudio[selectedCase];

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
            <span className="text-gray-900 font-medium">Casos de Éxito</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <FaLightbulb className="text-yellow-300" />
            <span className="text-sm font-medium">Transformaciones Reales con IA</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Historias de <span className="text-yellow-300">Éxito</span> que Inspiran
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
            Descubre cómo empresarios como tú transformaron sus negocios con inteligencia artificial
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="font-bold text-2xl">420%</span>
              <p>ROI Promedio</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="font-bold text-2xl">2.5x</span>
              <p>Aumento en Ventas</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="font-bold text-2xl">30h</span>
              <p>Liberadas/Semana</p>
            </div>
          </div>
        </div>
      </section>

      {/* Selector de Casos */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Selecciona un Caso de Estudio</h2>
          <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {casosDeEstudio.map((caso, index) => (
              <button
                key={caso.id}
                onClick={() => setSelectedCase(index)}
                className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                  selectedCase === index
                    ? 'border-blue-600 bg-blue-50 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="text-3xl mb-2">{caso.logo}</div>
                <h3 className="font-bold text-sm mb-1">{caso.empresa}</h3>
                <p className="text-xs text-gray-600">{caso.industria}</p>
                <div className="mt-2 flex items-center justify-center gap-2 text-xs">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span className="text-gray-500">{caso.ubicacion}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Caso de Estudio Detallado */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header del Caso */}
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <div className="text-5xl mb-3">{selectedCaseData.logo}</div>
                  <h2 className="text-3xl font-bold text-gray-900">{selectedCaseData.empresa}</h2>
                  <p className="text-gray-600 mt-2">{selectedCaseData.resumen}</p>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <FaIndustry className="text-blue-600" />
                    <span>{selectedCaseData.industria}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-600" />
                    <span>{selectedCaseData.ubicacion}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-600" />
                    <span>{selectedCaseData.duracion}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* El Problema */}
            <div className="bg-red-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
                <span className="bg-red-200 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                {selectedCaseData.problema.titulo}
              </h3>
              <p className="text-gray-700 mb-6">{selectedCaseData.problema.descripcion}</p>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedCaseData.problema.puntosDolor.map((dolor, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-red-500 mt-1">✗</div>
                    <p className="text-gray-700">{dolor}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* La Solución */}
            <div className="bg-blue-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <span className="bg-blue-200 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                {selectedCaseData.solucion.titulo}
              </h3>
              <p className="text-gray-700 mb-6">{selectedCaseData.solucion.descripcion}</p>
              <div className="grid md:grid-cols-3 gap-4">
                {selectedCaseData.solucion.implementaciones.map((impl, index) => (
                  <div key={index} className="bg-white rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FaRobot className="text-blue-600" />
                      <h4 className="font-bold text-blue-900">{impl.area}</h4>
                    </div>
                    <p className="text-sm text-gray-700">{impl.accion}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Los Resultados */}
            <div className="bg-green-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
                <span className="bg-green-200 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                {selectedCaseData.resultados.titulo}
              </h3>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                {selectedCaseData.resultados.metricas.map((metrica, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 text-center">
                    <metrica.icono className="text-3xl text-green-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-gray-900">{metrica.valor}</div>
                    <p className="text-sm text-gray-600 mt-1">{metrica.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-6 text-center">
                <p className="text-3xl font-bold">{selectedCaseData.resultados.roi}</p>
              </div>
            </div>

            {/* Testimonio */}
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8">
              <FaQuoteLeft className="text-4xl text-purple-300 mb-4" />
              <blockquote className="text-lg text-gray-800 italic mb-4">
                "{selectedCaseData.testimonio.texto}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full"></div>
                <div>
                  <p className="font-bold text-gray-900">{selectedCaseData.testimonio.autor}</p>
                  <p className="text-sm text-gray-600">{selectedCaseData.testimonio.cargo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Métricas Agregadas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">El Impacto de Impulsa Lab en Números</h2>
            <p className="text-xl text-gray-600 mb-12">
              Resultados promedio de nuestros clientes en los primeros 3 meses
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <FaDollarSign className="text-4xl text-blue-600 mx-auto mb-3" />
                <div className="text-4xl font-bold text-gray-900 mb-2">185%</div>
                <p className="text-gray-600">Aumento Promedio en Rentabilidad</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
                <FaClock className="text-4xl text-green-600 mx-auto mb-3" />
                <div className="text-4xl font-bold text-gray-900 mb-2">32h</div>
                <p className="text-gray-600">Horas Liberadas por Semana</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                <FaUsers className="text-4xl text-purple-600 mx-auto mb-3" />
                <div className="text-4xl font-bold text-gray-900 mb-2">2.3x</div>
                <p className="text-gray-600">Crecimiento en Base de Clientes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso de Transformación */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Nuestro Proceso de Transformación
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              De la supervivencia al crecimiento exponencial en 4 pasos
            </p>
            <div className="space-y-4">
              {[
                {
                  paso: "1",
                  titulo: "Diagnóstico 3D",
                  descripcion: "Analizamos tu negocio en Finanzas, Operaciones y Marketing para identificar oportunidades",
                  duracion: "1 semana"
                },
                {
                  paso: "2",
                  titulo: "Diseño de Solución",
                  descripcion: "Creamos un plan personalizado con herramientas de IA específicas para tus necesidades",
                  duracion: "1 semana"
                },
                {
                  paso: "3",
                  titulo: "Implementación",
                  descripcion: "Desplegamos las soluciones, configuramos sistemas y entrenamos a tu equipo",
                  duracion: "2-4 semanas"
                },
                {
                  paso: "4",
                  titulo: "Optimización",
                  descripcion: "Monitoreamos resultados y ajustamos para maximizar el ROI",
                  duracion: "Continuo"
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {item.paso}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg mb-1">{item.titulo}</h3>
                    <p className="text-gray-600 mb-2">{item.descripcion}</p>
                    <span className="text-sm text-blue-600 font-medium">{item.duracion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Industrias que Transformamos
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              Experiencia probada en diversos sectores
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icono: "🍽️", nombre: "Restaurantes y Gastronomía", casos: "15+ casos" },
                { icono: "💻", nombre: "Servicios Técnicos", casos: "20+ casos" },
                { icono: "💆‍♀️", nombre: "Salud y Bienestar", casos: "12+ casos" },
                { icono: "🛍️", nombre: "Retail y Comercio", casos: "18+ casos" },
                { icono: "⚖️", nombre: "Servicios Profesionales", casos: "10+ casos" },
                { icono: "🏗️", nombre: "Construcción", casos: "8+ casos" }
              ].map((industria, index) => (
                <div key={index} className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="text-4xl mb-3">{industria.icono}</div>
                  <h3 className="font-bold mb-1">{industria.nombre}</h3>
                  <p className="text-sm text-gray-600">{industria.casos}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para Escribir tu Historia de Éxito?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Únete a los cientos de empresarios que ya transformaron sus negocios con IA
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diagnostico"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Solicitar Diagnóstico Gratuito
              <FaArrowRight />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Hablar con un Asesor
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              <span>Sin compromisos</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              <span>Resultados garantizados</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              <span>ROI medible</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}