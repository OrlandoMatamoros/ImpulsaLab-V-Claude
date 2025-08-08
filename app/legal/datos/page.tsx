'use client';

import Link from 'next/link';
import { 
  FaShieldAlt, 
  FaLock, 
  FaUserShield, 
  FaEnvelope,
  FaPhone,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileContract,
  FaUserCog,
  FaDatabase,
  FaGlobe,
  FaArrowRight,
  FaClock,
  FaBalanceScale
} from 'react-icons/fa';
import { useState } from 'react';

export default function ProteccionDatos() {
  const [activeSection, setActiveSection] = useState('politica');

  const sections = [
    { id: 'politica', label: 'Política de Privacidad', icon: FaFileContract },
    { id: 'derechos', label: 'Tus Derechos GDPR', icon: FaUserShield },
    { id: 'procedimientos', label: 'Procedimientos', icon: FaUserCog },
    { id: 'contacto', label: 'Contacto DPO', icon: FaEnvelope }
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
            <Link href="/legal" className="text-gray-500 hover:text-gray-700 transition-colors">
              Legal
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Protección de Datos</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
              <FaShieldAlt className="text-4xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Protección de Datos y Privacidad
            </h1>
            <p className="text-xl mb-8 text-blue-50">
              Tu privacidad es nuestra prioridad. Conoce cómo protegemos tus datos 
              y cuáles son tus derechos bajo el GDPR y las regulaciones locales.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/10 px-4 py-2 rounded-full">
                <FaClock className="inline mr-2" />
                Última actualización: Julio 2025
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-full">
                <FaBalanceScale className="inline mr-2" />
                Cumplimiento GDPR
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white border-b z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-2">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeSection === id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="text-lg" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Política de Privacidad */}
            {activeSection === 'politica' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Política de Privacidad
                  </h2>
                  
                  <div className="space-y-6 text-gray-700">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <FaDatabase className="text-blue-600" />
                        1. Información que Recopilamos
                      </h3>
                      <p className="mb-3">
                        En Impulsa Lab recopilamos únicamente la información necesaria para 
                        brindarte nuestros servicios de consultoría y transformación digital:
                      </p>
                      <ul className="space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Datos de Contacto:</strong> Nombre, email, teléfono, dirección de tu empresa</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Datos Empresariales:</strong> Información sobre tu negocio, sector, tamaño, necesidades</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Datos de Uso:</strong> Interacciones con nuestra plataforma y herramientas de IA</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span><strong>Datos Financieros:</strong> Información necesaria para procesar pagos (procesada por PayPal)</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <FaLock className="text-blue-600" />
                        2. Cómo Usamos tu Información
                      </h3>
                      <p className="mb-3">
                        Utilizamos tus datos exclusivamente para:
                      </p>
                      <ul className="space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Realizar el Diagnóstico 3D de tu negocio</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Personalizar soluciones de IA para tu empresa</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Comunicarnos contigo sobre nuestros servicios</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Mejorar nuestras herramientas y metodologías</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Cumplir con obligaciones legales y fiscales</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <FaGlobe className="text-blue-600" />
                        3. Compartir Información
                      </h3>
                      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                        <p className="font-semibold mb-2">
                          <FaExclamationTriangle className="inline text-blue-600 mr-2" />
                          Nunca vendemos tus datos
                        </p>
                        <p>
                          Tu información es confidencial. Solo la compartimos con:
                        </p>
                        <ul className="mt-2 space-y-1 ml-4">
                          <li>• Proveedores de servicios esenciales (hosting, procesamiento de pagos)</li>
                          <li>• Autoridades cuando la ley lo requiera</li>
                          <li>• Terceros con tu consentimiento explícito</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <FaShieldAlt className="text-blue-600" />
                        4. Seguridad de los Datos
                      </h3>
                      <p>
                        Implementamos medidas de seguridad técnicas y organizativas líderes en la industria:
                      </p>
                      <ul className="mt-3 space-y-2 ml-4">
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Encriptación SSL/TLS en todas las transmisiones</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Almacenamiento cifrado en servidores seguros</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Acceso restringido solo a personal autorizado</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Auditorías de seguridad periódicas</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Derechos GDPR */}
            {activeSection === 'derechos' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Tus Derechos bajo el GDPR
                  </h2>
                  
                  <p className="text-lg text-gray-700 mb-8">
                    Como titular de los datos, tienes derechos fundamentales sobre tu información personal. 
                    En Impulsa Lab respetamos y facilitamos el ejercicio de todos tus derechos:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaUserShield className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Derecho de Acceso</h3>
                          <p className="text-gray-700">
                            Puedes solicitar una copia de todos los datos personales que tenemos sobre ti.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaUserCog className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Derecho de Rectificación</h3>
                          <p className="text-gray-700">
                            Tienes derecho a corregir datos inexactos o completar datos incompletos.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaDatabase className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Derecho al Olvido</h3>
                          <p className="text-gray-700">
                            Puedes solicitar que eliminemos tus datos personales bajo ciertas circunstancias.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaLock className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Derecho de Restricción</h3>
                          <p className="text-gray-700">
                            Puedes limitar cómo procesamos tus datos en situaciones específicas.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaGlobe className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Derecho a la Portabilidad</h3>
                          <p className="text-gray-700">
                            Puedes recibir tus datos en un formato estructurado y transferirlos a otro servicio.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white p-3 rounded-lg">
                          <FaExclamationTriangle className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Derecho de Oposición</h3>
                          <p className="text-gray-700">
                            Puedes oponerte al procesamiento de tus datos para marketing directo.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <FaBalanceScale className="text-yellow-600" />
                      Tiempo de Respuesta
                    </h3>
                    <p className="text-gray-700">
                      Respondemos a todas las solicitudes de derechos GDPR dentro de <strong>30 días calendario</strong>. 
                      En casos complejos, podemos extender este plazo hasta 60 días adicionales, notificándote 
                      oportunamente sobre la extensión y sus razones.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Procedimientos */}
            {activeSection === 'procedimientos' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Procedimientos de Solicitud
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                        Cómo Ejercer tus Derechos
                      </h3>
                      <p className="text-gray-700 mb-6">
                        Hemos simplificado el proceso para que puedas ejercer tus derechos de manera fácil y segura:
                      </p>

                      <div className="space-y-4">
                        <div className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                              1
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-2">Identifica tu Solicitud</h4>
                              <p className="text-gray-700">
                                Determina qué derecho deseas ejercer: acceso, rectificación, eliminación, 
                                restricción, portabilidad u oposición.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                              2
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-2">Prepara tu Solicitud</h4>
                              <p className="text-gray-700 mb-3">
                                Incluye la siguiente información:
                              </p>
                              <ul className="space-y-1 ml-4 text-gray-600">
                                <li>• Tu nombre completo y datos de contacto</li>
                                <li>• Descripción clara del derecho que deseas ejercer</li>
                                <li>• Cualquier información adicional relevante</li>
                                <li>• Copia de tu identificación (para verificación)</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                              3
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-2">Envía tu Solicitud</h4>
                              <p className="text-gray-700 mb-3">
                                Puedes enviarnos tu solicitud por cualquiera de estos medios:
                              </p>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <FaEnvelope className="text-blue-600" />
                                  <span>Email: privacidad@tuimpulsalab.com</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FaPhone className="text-blue-600" />
                                  <span>Teléfono: +1 929 500 1850</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
                              4
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-2">Confirmación y Procesamiento</h4>
                              <p className="text-gray-700">
                                Recibirás una confirmación de recepción en 48 horas. Procesaremos tu 
                                solicitud y te responderemos dentro del plazo legal de 30 días.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <FaFileContract className="text-blue-600" />
                        Formularios y Plantillas
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Para facilitar tu solicitud, puedes descargar nuestras plantillas prediseñadas:
                      </p>
                      <div className="space-y-2">
                        <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
                          <FaArrowRight />
                          Plantilla de Solicitud de Acceso a Datos
                        </button>
                        <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
                          <FaArrowRight />
                          Plantilla de Solicitud de Eliminación
                        </button>
                        <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
                          <FaArrowRight />
                          Plantilla de Solicitud de Portabilidad
                        </button>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <FaExclamationTriangle className="text-yellow-600" />
                        Importante
                      </h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>
                          • No cobramos ninguna tarifa por procesar solicitudes de derechos GDPR
                        </li>
                        <li>
                          • Podemos solicitar información adicional para verificar tu identidad
                        </li>
                        <li>
                          • En caso de solicitudes excesivas o infundadas, nos reservamos el derecho 
                          de cobrar una tarifa administrativa o rechazar la solicitud
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contacto DPO */}
            {activeSection === 'contacto' && (
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Oficial de Protección de Datos (DPO)
                  </h2>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-200 mb-8">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-600 text-white rounded-full mb-4">
                        <FaUserShield className="text-4xl" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Orlando Matamoros</h3>
                      <p className="text-gray-600">Data Protection Officer</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <FaEnvelope className="text-blue-600 text-xl" />
                          <span className="font-semibold">Email Directo</span>
                        </div>
                        <a href="mailto:privacidad@tuimpulsalab.com" className="text-blue-600 hover:text-blue-800">
                          privacidad@tuimpulsalab.com
                        </a>
                      </div>

                      <div className="bg-white p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <FaPhone className="text-blue-600 text-xl" />
                          <span className="font-semibold">Teléfono</span>
                        </div>
                        <a href="tel:+19295001850" className="text-blue-600 hover:text-blue-800">
                          +1 929 500 1850
                        </a>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FaGlobe className="text-blue-600 text-xl" />
                        <span className="font-semibold">Dirección Postal</span>
                      </div>
                      <address className="not-italic text-gray-700">
                        Impulsa Lab LLC<br />
                        Attn: Data Protection Officer<br />
                        Brooklyn, NY<br />
                        Estados Unidos
                      </address>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">¿Cuándo Contactar al DPO?</h3>
                      <p className="text-gray-700 mb-4">
                        Puedes contactar a nuestro Oficial de Protección de Datos para:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Ejercer cualquiera de tus derechos de protección de datos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Reportar una brecha de seguridad o incidente de privacidad</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Hacer preguntas sobre nuestras prácticas de privacidad</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Solicitar aclaraciones sobre esta política</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span>Presentar una queja sobre el manejo de tus datos</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-xl font-semibold mb-3">Horario de Atención</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Lunes a Viernes</p>
                          <p className="text-gray-600">9:00 AM - 6:00 PM EST</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700 mb-2">Respuesta por Email</p>
                          <p className="text-gray-600">Dentro de 48 horas hábiles</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
                      <h3 className="font-semibold text-lg mb-2">Compromiso de Privacidad</h3>
                      <p className="text-gray-700">
                        Nuestro DPO está comprometido a proteger tu privacidad y garantizar que 
                        tus datos se manejen de acuerdo con las mejores prácticas y regulaciones 
                        aplicables. Todas las comunicaciones con el DPO son confidenciales y 
                        serán tratadas con la máxima seriedad.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Autoridades de Supervisión */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    Autoridades de Supervisión
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Si no estás satisfecho con nuestra respuesta, tienes derecho a presentar 
                    una queja ante las autoridades de protección de datos:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-3">Estados Unidos</h4>
                      <p className="text-gray-700 mb-2">Federal Trade Commission (FTC)</p>
                      <a href="https://www.ftc.gov" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                        www.ftc.gov
                        <FaArrowRight />
                      </a>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-3">Unión Europea</h4>
                      <p className="text-gray-700 mb-2">European Data Protection Board</p>
                      <a href="https://edpb.europa.eu" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                        edpb.europa.eu
                        <FaArrowRight />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Tienes Preguntas sobre tu Privacidad?
          </h2>
          <p className="text-xl mb-8 text-blue-50">
            Estamos aquí para ayudarte a entender y ejercer tus derechos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:privacidad@tuimpulsalab.com"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <FaEnvelope />
              Contactar al DPO
            </a>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
            >
              Contacto General
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}