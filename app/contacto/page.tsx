'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  FaArrowRight, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaLinkedin,
  FaCheckCircle,
  FaCalendarAlt,
  FaRobot,
  FaChartLine,
  FaBullseye,
  FaExclamationTriangle,
  FaRedo,
  FaTimes
} from 'react-icons/fa';
import { LINKS } from '@/lib/constants';

// ⚠️ WEBHOOK URL - MISMO QUE HOMEPAGE (CRÍTICO: NO CAMBIAR)
const WEBHOOK_URL = 'https://orlandom88.app.n8n.cloud/webhook/fa05d73f-28a6-4827-8353-5b3a5780ad11';

// Rate limiting storage
const rateLimitStorage = new Map<string, number>();

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
    honeypot: '' // Campo honeypot para anti-spam
  });

  const [formStatus, setFormStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error' | 'rate-limit';
    message?: string;
  }>({ type: 'idle' });

  const [progress, setProgress] = useState(100);
  const [retryCount, setRetryCount] = useState(0);
  const [utmParams, setUtmParams] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: ''
  });

  // Capturar parámetros UTM al cargar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      setUtmParams({
        utm_source: urlParams.get('utm_source') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_campaign: urlParams.get('utm_campaign') || ''
      });
    }
  }, []);

  // Progress bar para mensaje de éxito (7 segundos)
  useEffect(() => {
    if (formStatus.type === 'success') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            setFormStatus({ type: 'idle' });
            return 100;
          }
          return prev - (100 / 70); // 7 segundos
        });
      }, 100);
      return () => clearInterval(interval);
    } else {
      setProgress(100);
    }
  }, [formStatus.type]);

  const checkRateLimit = (email: string): boolean => {
    const now = Date.now();
    const lastSubmission = rateLimitStorage.get(email);
    
    if (lastSubmission) {
      const timeDiff = now - lastSubmission;
      if (timeDiff < 60000) { // 60 segundos
        const remainingTime = Math.ceil((60000 - timeDiff) / 1000);
        setFormStatus({
          type: 'rate-limit',
          message: `Por favor espera ${remainingTime} segundos antes de enviar otro mensaje.`
        });
        return false;
      }
    }
    
    rateLimitStorage.set(email, now);
    return true;
  };

  const validateForm = (): boolean => {
    // Validación de email más robusta
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        type: 'error',
        message: 'Por favor ingresa un email válido.'
      });
      return false;
    }

    // Validación de teléfono (mínimo 8 dígitos)
    const phoneDigits = formData.telefono.replace(/\D/g, '');
    if (phoneDigits.length < 8) {
      setFormStatus({
        type: 'error',
        message: 'Por favor ingresa un número de teléfono válido (mínimo 8 dígitos).'
      });
      return false;
    }

    // Validación de campos requeridos
    if (!formData.nombre || !formData.servicio || !formData.mensaje) {
      setFormStatus({
        type: 'error',
        message: 'Por favor completa todos los campos requeridos.'
      });
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Limpiar error al escribir
    if (formStatus.type === 'error') {
      setFormStatus({ type: 'idle' });
    }
  };

  const sendToWebhook = async (data: any, attemptNumber: number = 1): Promise<boolean> => {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error(`Intento ${attemptNumber} falló:`, error);
      
      if (attemptNumber < 3) {
        // Esperar antes de reintentar (backoff exponencial)
        await new Promise(resolve => setTimeout(resolve, 1000 * attemptNumber));
        return sendToWebhook(data, attemptNumber + 1);
      }
      
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar honeypot (anti-spam)
    if (formData.honeypot) {
      console.warn('Bot detectado');
      return;
    }

    // Validaciones
    if (!validateForm()) {
      return;
    }

    // Rate limiting
    if (!checkRateLimit(formData.email)) {
      return;
    }

    setFormStatus({ type: 'loading' });
    setRetryCount(0);

    // ⚠️ ESTRUCTURA CRÍTICA DEL PAYLOAD - DEBE SER EXACTAMENTE ASÍ
    const dataToSend = {
      name: formData.nombre,
      email: formData.email,
      phone: formData.telefono,
      service: formData.servicio,
      message: formData.mensaje,
      company: formData.empresa || 'No especificada', // Campo adicional
      timestamp: new Date().toISOString(),
      source: 'ContactPage-Form', // ⚠️ CRÍTICO: DIFERENCIADOR DE LA PÁGINA (NO "ImpulsaLab-Website")
      page: 'contacto', // ⚠️ IDENTIFICADOR DE PÁGINA
      utm_source: utmParams.utm_source || '',
      utm_medium: utmParams.utm_medium || '',
      utm_campaign: utmParams.utm_campaign || ''
    };

    // Enviar con reintentos automáticos
    const success = await sendToWebhook(dataToSend);

    if (success) {
      setFormStatus({
        type: 'success',
        message: '¡Mensaje enviado exitosamente!'
      });
      
      // Limpiar formulario
      setFormData({
        nombre: '',
        empresa: '',
        email: '',
        telefono: '',
        servicio: '',
        mensaje: '',
        honeypot: ''
      });

      // Rastrear conversión si GA está disponible
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          event_category: 'Contact',
          event_label: 'Contact Page Form',
          value: 1
        });
      }
    } else {
      setFormStatus({
        type: 'error',
        message: 'Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.'
      });
    }
  };

  const handleRetry = () => {
    setFormStatus({ type: 'idle' });
    setRetryCount(prev => prev + 1);
  };

  const servicios = [
    { value: '', label: 'Selecciona un servicio' },
    { value: 'consulta-general', label: 'Consulta General' },
    { value: 'diagnostico-3d', label: 'Diagnóstico 3D', icon: FaBullseye },
    { value: 'marketing-digital', label: 'Marketing Digital' },
    { value: 'desarrollo-web', label: 'Desarrollo Web' },
    { value: 'consultoria', label: 'Consultoría', icon: FaChartLine },
    { value: 'automatizacion-ia', label: 'Automatización con IA', icon: FaRobot },
    { value: 'capacitacion', label: 'Capacitación' }
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
            <span className="text-gray-900 font-medium">Contacto</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Conectemos para Transformar tu Negocio
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Estamos aquí para escucharte y diseñar juntos la estrategia de transformación 
            digital que llevará tu empresa al siguiente nivel con IA y datos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              <FaCalendarAlt />
              Agenda tu Diagnóstico 3D Gratis
            </a>
            <a
              href="tel:+19295001850"
              className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-400 transition-all duration-300"
            >
              <FaPhone />
              Llámanos Ahora
            </a>
          </div>
        </div>
      </section>

      {/* Información de Contacto Rápido */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPhone className="text-blue-600 text-xl" />
              </div>
              <h3 className="font-semibold mb-2">Teléfono</h3>
              <a href="tel:+19295001850" className="text-blue-600 hover:underline">
                +1 929 500 1850
              </a>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-blue-600 text-xl" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <a href={`mailto:${LINKS.email}`} className="text-blue-600 hover:underline">
                contacto@tuimpulsalab.com
              </a>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-blue-600 text-xl" />
              </div>
              <h3 className="font-semibold mb-2">Horario</h3>
              <p className="text-gray-600">Lun - Vie: 9:00 AM - 6:00 PM EST</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Formulario de Contacto */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-2">Cuéntanos sobre tu Proyecto</h2>
                <p className="text-gray-600 mb-6">
                  Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas hábiles
                </p>
                
                {/* Notificaciones */}
                {formStatus.type === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-green-800 font-semibold">¡Mensaje enviado con éxito!</p>
                        <p className="text-green-600 text-sm mt-1">
                          Hemos recibido tu mensaje. Nuestro equipo se pondrá en contacto contigo pronto.
                        </p>
                        <p className="text-green-600 text-sm mt-2">
                          📧 Revisa tu email para la confirmación
                        </p>
                        <div className="mt-3 h-1 bg-green-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 transition-all duration-100 ease-linear"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {formStatus.type === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <FaExclamationTriangle className="text-red-500 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-red-800 font-semibold">Error al enviar</p>
                        <p className="text-red-600 text-sm">{formStatus.message}</p>
                        {retryCount < 3 && (
                          <button
                            onClick={handleRetry}
                            className="mt-2 text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                          >
                            <FaRedo className="text-xs" />
                            Reintentar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {formStatus.type === 'rate-limit' && (
                  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <FaClock className="text-yellow-600 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-yellow-800 font-semibold">Límite de envío</p>
                        <p className="text-yellow-600 text-sm">{formStatus.message}</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field - oculto */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        disabled={formStatus.type === 'loading'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="Juan Pérez"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-2">
                        Empresa
                      </label>
                      <input
                        type="text"
                        id="empresa"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        disabled={formStatus.type === 'loading'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="Mi Empresa S.A."
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={formStatus.type === 'loading'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="juan@empresa.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        disabled={formStatus.type === 'loading'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder="+1 555 123 4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="servicio" className="block text-sm font-medium text-gray-700 mb-2">
                      ¿En qué área necesitas ayuda? *
                    </label>
                    <select
                      id="servicio"
                      name="servicio"
                      value={formData.servicio}
                      onChange={handleChange}
                      required
                      disabled={formStatus.type === 'loading'}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      {servicios.map(servicio => (
                        <option key={servicio.value} value={servicio.value}>
                          {servicio.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                      Cuéntanos más sobre tu proyecto *
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      disabled={formStatus.type === 'loading'}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Describe brevemente tu proyecto, desafíos actuales y objetivos..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={formStatus.type === 'loading' || formStatus.type === 'rate-limit'}
                      className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {formStatus.type === 'loading' ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar Mensaje
                          <FaArrowRight />
                        </>
                      )}
                    </button>
                    
                    <a
                      href={LINKS.calendly}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 text-center flex items-center justify-center gap-2"
                    >
                      <FaCalendarAlt />
                      Prefiero Agendar una Llamada
                    </a>
                  </div>
                </form>
              </div>
            </div>

            {/* Información Lateral */}
            <div className="space-y-6">
              {/* Tarjeta de Diagnóstico 3D */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <FaBullseye />
                  Diagnóstico 3D Gratuito
                </h3>
                <p className="mb-4">
                  Descubre las oportunidades ocultas en tu negocio con nuestro análisis 
                  tridimensional sin costo ni compromiso.
                </p>
                <a
                  href={LINKS.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Agenda Ahora
                </a>
              </div>

              {/* Información de Oficina */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4">Información de Oficina</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Dirección</p>
                      <p className="text-gray-600 text-sm">
                        118-35 Queens Blvd #400<br />
                        Forest Hills, NY 11375
                      </p>
                      <a
                        href="https://maps.google.com/?q=118-35+Queens+Blvd+400+Forest+Hills+NY+11375"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm mt-1 inline-block"
                      >
                        Ver en Google Maps →
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <FaClock className="text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Horario de Atención</p>
                      <p className="text-gray-600 text-sm">
                        Lunes - Viernes: 9:00 AM - 6:00 PM EST<br />
                        Sábado - Domingo: Cerrado
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaLinkedin className="text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Síguenos</p>
                      <a
                        href={LINKS.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preguntas Frecuentes */}
              <div className="bg-gray-100 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-3">¿Tienes Preguntas?</h3>
                <p className="text-gray-600 mb-4">
                  Consulta nuestras preguntas frecuentes o contáctanos directamente.
                </p>
                <Link
                  href="/faq"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Ver Preguntas Frecuentes →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para Transformar tu Negocio?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            No esperes más. El futuro de tu empresa comienza con una conversación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              <FaCalendarAlt />
              Agenda tu Diagnóstico Gratuito
            </a>
            <a
              href={`mailto:${LINKS.email}`}
              className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-400 transition-all duration-300"
            >
              <FaEnvelope />
              Escríbenos Ahora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}