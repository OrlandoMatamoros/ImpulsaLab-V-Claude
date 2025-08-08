'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  FaArrowRight, 
  FaCheckCircle, 
  FaRocket, 
  FaBrain, 
  FaUsers, 
  FaLightbulb,
  FaGraduationCap,
  FaHandshake,
  FaChartLine,
  FaLaptopCode,
  FaMapMarkerAlt,
  FaEnvelope,
  FaLinkedin,
  FaClock,
  FaDollarSign,
  FaUserTie
} from 'react-icons/fa';

export default function Carreras() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    linkedin: '',
    posicion: '',
    mensaje: '',
    cv: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        cv: e.target.files[0]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío
    console.log('Aplicación enviada:', formData);
    alert('¡Gracias por tu interés! Revisaremos tu aplicación y te contactaremos pronto.');
  };

  const posicionesAbiertas = [
    {
      id: 1,
      titulo: 'Gerente de Éxito del Cliente',
      departamento: 'Ventas y Servicio al Cliente',
      tipo: 'Tiempo Completo',
      ubicacion: 'Brooklyn, NY (Híbrido)',
      salario: '$50,000 - $70,000 + Comisiones',
      descripcion: 'Buscamos un profesional apasionado por ayudar a las PYMES a transformarse digitalmente. Serás la cara de Impulsa Lab ante nuestros clientes.',
      requisitos: [
        'Experiencia mínima de 2 años en ventas consultivas o customer success',
        'Dominio del español e inglés (indispensable)',
        'Conocimiento del ecosistema de PYMES en Nueva York',
        'Habilidades excepcionales de comunicación y presentación',
        'Experiencia con CRM y herramientas de gestión de clientes'
      ],
      responsabilidades: [
        'Realizar diagnósticos iniciales con clientes potenciales',
        'Presentar propuestas de valor y cerrar ventas',
        'Gestionar el proceso de onboarding de nuevos clientes',
        'Asegurar la satisfacción y retención de clientes existentes',
        'Identificar oportunidades de upselling y cross-selling'
      ]
    },
    {
      id: 2,
      titulo: 'Analista de Datos e IA Junior',
      departamento: 'Tecnología',
      tipo: 'Tiempo Completo',
      ubicacion: 'Brooklyn, NY (Remoto Flexible)',
      salario: '$45,000 - $60,000',
      descripcion: 'Únete a nuestro equipo técnico para desarrollar e implementar soluciones de IA personalizadas para nuestros clientes.',
      requisitos: [
        'Licenciatura en Ciencias de la Computación, Ingeniería o campo relacionado',
        'Conocimiento de Python, SQL y herramientas de análisis de datos',
        'Familiaridad con frameworks de IA/ML (TensorFlow, PyTorch, etc.)',
        'Capacidad para explicar conceptos técnicos a audiencias no técnicas',
        'Inglés fluido, español es un plus'
      ],
      responsabilidades: [
        'Apoyar en la implementación de dashboards financieros',
        'Desarrollar y mantener agentes de IA para automatización',
        'Analizar datos de clientes y generar insights accionables',
        'Documentar procesos y crear materiales de capacitación',
        'Colaborar con el equipo de consultoría en proyectos'
      ]
    },
    {
      id: 3,
      titulo: 'Especialista en Marketing Digital',
      departamento: 'Marketing',
      tipo: 'Medio Tiempo / Freelance',
      ubicacion: 'Remoto',
      salario: '$25 - $40 por hora',
      descripcion: 'Buscamos un creativo digital para fortalecer nuestra presencia online y generar leads cualificados.',
      requisitos: [
        'Experiencia demostrable en marketing digital para B2B',
        'Dominio de redes sociales (LinkedIn, Instagram)',
        'Conocimiento de SEO/SEM y marketing de contenidos',
        'Habilidades de diseño gráfico (Canva, Adobe Creative)',
        'Portfolio de campañas exitosas'
      ],
      responsabilidades: [
        'Crear y ejecutar campañas de marketing digital',
        'Gestionar nuestras redes sociales y comunidad online',
        'Producir contenido de valor para blog y newsletter',
        'Optimizar el funnel de conversión',
        'Medir y reportar métricas de performance'
      ]
    }
  ];

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
            <span className="text-gray-900 font-medium">Carreras</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FaRocket className="text-yellow-300" />
              <span className="text-sm font-medium">Únete al Futuro de la Consultoría</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Construye tu Carrera en el 
              <span className="text-yellow-300"> Laboratorio de Innovación</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              En Impulsa Lab, no solo transformamos negocios con IA. 
              Transformamos carreras y creamos líderes del mañana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#posiciones" 
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Ver Posiciones Abiertas
                <FaArrowRight />
              </a>
              <a 
                href="#cultura" 
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                Conoce Nuestra Cultura
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cultura Section */}
      <section id="cultura" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nuestra Cultura: <span className="text-blue-600">El Aliado Experto</span>
              </h2>
              <p className="text-xl text-gray-600">
                En Impulsa Lab, cultivamos un ambiente donde la innovación, el aprendizaje continuo 
                y el impacto social se encuentran.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl">
                <FaBrain className="text-4xl text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Mentalidad de Laboratorio</h3>
                <p className="text-gray-700 mb-4">
                  Fomentamos la experimentación y el aprendizaje rápido. Aquí, los errores son 
                  oportunidades de mejora y cada proyecto es una chance de innovar.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Innovación práctica con IA de vanguardia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Cultura de mejora continua</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Ambiente colaborativo y sin egos</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl">
                <FaUsers className="text-4xl text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Impacto en la Comunidad</h3>
                <p className="text-gray-700 mb-4">
                  Nuestro trabajo tiene un propósito más grande: democratizar la tecnología para 
                  las PYMES latinas y fortalecer el ecosistema empresarial de Nueva York.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Empoderamiento de emprendedores latinos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Transformación digital inclusiva</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Construcción de un futuro más equitativo</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Por Qué Trabajar en Impulsa Lab?
              </h2>
              <p className="text-xl text-gray-600">
                Ofrecemos más que un trabajo: una oportunidad de crecimiento profesional y personal
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <FaGraduationCap className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Desarrollo Profesional</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Capacitación continua en IA y tecnologías emergentes</li>
                  <li>• Mentoría directa del equipo fundador</li>
                  <li>• Presupuesto para cursos y certificaciones</li>
                  <li>• Oportunidades de crecimiento acelerado</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <FaHandshake className="text-2xl text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cultura y Balance</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Trabajo flexible (híbrido/remoto)</li>
                  <li>• Ambiente multicultural e inclusivo</li>
                  <li>• Eventos de team building mensuales</li>
                  <li>• Respeto por el balance vida-trabajo</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <FaChartLine className="text-2xl text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Compensación y Equity</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Salarios competitivos del mercado NYC</li>
                  <li>• Plan de equity para empleados clave</li>
                  <li>• Bonos por desempeño trimestral</li>
                  <li>• Beneficios de salud (próximamente)</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <FaLightbulb className="text-5xl mb-4 text-yellow-300 mx-auto" />
                <h3 className="text-2xl font-bold mb-3">Sé Parte de Algo Grande</h3>
                <p className="text-lg text-blue-100">
                  Estamos en una etapa de crecimiento explosivo. Los primeros miembros del equipo 
                  no solo construirán sus carreras, sino que ayudarán a dar forma al futuro de 
                  Impulsa Lab y el ecosistema de PYMES en Nueva York.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posiciones Abiertas Section */}
      <section id="posiciones" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Posiciones Abiertas
              </h2>
              <p className="text-xl text-gray-600">
                Encuentra tu lugar en nuestro equipo de innovadores
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {posicionesAbiertas.map((posicion) => (
                <div 
                  key={posicion.id}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-all cursor-pointer hover:shadow-lg"
                  onClick={() => setSelectedJob(posicion.id)}
                >
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      {posicion.tipo}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{posicion.titulo}</h3>
                    <p className="text-gray-600 text-sm mb-3">{posicion.descripcion}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaUserTie className="text-gray-400" />
                      <span>{posicion.departamento}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span>{posicion.ubicacion}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaDollarSign className="text-gray-400" />
                      <span>{posicion.salario}</span>
                    </div>
                  </div>

                  <button className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2">
                    Ver Detalles
                    <FaArrowRight />
                  </button>
                </div>
              ))}
            </div>

            {/* Modal de Detalles de Posición */}
            {selectedJob && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {posicionesAbiertas.find(p => p.id === selectedJob)?.titulo}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {posicionesAbiertas.find(p => p.id === selectedJob)?.departamento}
                        </p>
                      </div>
                      <button 
                        onClick={() => setSelectedJob(null)}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {(() => {
                      const job = posicionesAbiertas.find(p => p.id === selectedJob);
                      return job ? (
                        <>
                          <div className="mb-6">
                            <p className="text-gray-700 mb-4">{job.descripcion}</p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <FaClock className="text-gray-400" />
                                <span>{job.tipo}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-gray-400" />
                                <span>{job.ubicacion}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FaDollarSign className="text-gray-400" />
                                <span>{job.salario}</span>
                              </div>
                            </div>
                          </div>

                          <div className="mb-6">
                            <h4 className="text-lg font-bold text-gray-900 mb-3">Responsabilidades</h4>
                            <ul className="space-y-2">
                              {job.responsabilidades.map((resp, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                  <span className="text-gray-700">{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mb-6">
                            <h4 className="text-lg font-bold text-gray-900 mb-3">Requisitos</h4>
                            <ul className="space-y-2">
                              {job.requisitos.map((req, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <FaCheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                                  <span className="text-gray-700">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex gap-4">
                            <a 
                              href="#aplicar"
                              onClick={() => {
                                setSelectedJob(null);
                                setFormData({...formData, posicion: job.titulo});
                              }}
                              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all text-center"
                            >
                              Aplicar Ahora
                            </a>
                            <button 
                              onClick={() => setSelectedJob(null)}
                              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                            >
                              Cerrar
                            </button>
                          </div>
                        </>
                      ) : null;
                    })()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Formulario de Aplicación */}
      <section id="aplicar" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Listo para el Siguiente Paso?
              </h2>
              <p className="text-xl text-gray-600">
                Envíanos tu aplicación y comencemos a construir el futuro juntos
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Juan Pérez"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="juan@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="https://linkedin.com/in/tu-perfil"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Posición de Interés *
                  </label>
                  <select
                    name="posicion"
                    value={formData.posicion}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Selecciona una posición</option>
                    {posicionesAbiertas.map(pos => (
                      <option key={pos.id} value={pos.titulo}>{pos.titulo}</option>
                    ))}
                    <option value="Aplicación General">Aplicación General (No hay una posición específica)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    ¿Por qué quieres trabajar en Impulsa Lab? *
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Cuéntanos sobre tu experiencia, tus motivaciones y cómo puedes contribuir a nuestra misión..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    CV/Resume (PDF, DOC, DOCX - Max 5MB)
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {formData.cv && (
                    <p className="text-sm text-green-600 mt-2">
                      Archivo seleccionado: {formData.cv.name}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Nota:</strong> En Impulsa Lab valoramos la diversidad y la inclusión. 
                    Alentamos a candidatos de todos los orígenes a aplicar. Somos un empleador 
                    que ofrece igualdad de oportunidades.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
                >
                  Enviar Aplicación
                  <FaArrowRight />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso de Selección */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nuestro Proceso de Selección
              </h2>
              <p className="text-xl text-gray-600">
                Transparente, rápido y enfocado en encontrar el mejor match
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Revisión de Aplicación</h3>
                  <p className="text-gray-700">
                    Revisamos tu CV y carta de presentación. Te respondemos en máximo 5 días hábiles.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Entrevista Inicial (30 min)</h3>
                  <p className="text-gray-700">
                    Videollamada con nuestro equipo de People para conocerte mejor y responder tus preguntas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Evaluación Técnica/Caso Práctico</h3>
                  <p className="text-gray-700">
                    Un ejercicio práctico relacionado con el rol para evaluar tus habilidades en acción.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Entrevista con el Equipo Fundador</h3>
                  <p className="text-gray-700">
                    Conversación con Orlando y el equipo directivo sobre visión, cultura y expectativas mutuas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Oferta y Onboarding</h3>
                  <p className="text-gray-700">
                    Si hay match, recibirás nuestra oferta. El proceso completo toma máximo 2-3 semanas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿No Ves tu Posición Ideal?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Siempre estamos buscando talento excepcional. Envíanos tu CV y cuéntanos 
              cómo puedes contribuir a nuestra misión.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#aplicar"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Aplicación General
                <FaArrowRight />
              </a>
              <a
                href="mailto:talentos@tuimpulsalab.com"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                <FaEnvelope />
                talentos@tuimpulsalab.com
              </a>
              <a
                href="https://linkedin.com/company/impulsa-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                <FaLinkedin />
                Síguenos en LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}