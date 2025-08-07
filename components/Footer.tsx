'use client';

// components/Footer.tsx


import Link from 'next/link';
import Image from 'next/image';
import { 
  FaLinkedin, 
  FaInstagram, 
  FaFacebook, 
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight
} from 'react-icons/fa';
import { useState } from 'react';
import { COMPANY_INFO } from '@/lib/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // TODO: Implementar lógica de suscripción
    // Por ahora solo simulamos
    setTimeout(() => {
      alert('¡Gracias por suscribirte! Pronto recibirás nuestros insights.');
      setEmail('');
      setIsSubscribing(false);
    }, 1000);
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Únete a la Revolución Digital
            </h3>
            <p className="mb-6 text-lg">
              Recibe insights, casos de éxito y estrategias de IA directamente en tu inbox
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubscribing ? 'Suscribiendo...' : 'Suscribirse'}
              </button>
            </form>
            <p className="mt-4 text-sm opacity-90">
              No spam, solo contenido de valor. Puedes cancelar cuando quieras.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4">
          
          {/* Company Info - Spans 2 columns */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/logo negro.jpg"
                  alt="Impulsa Lab"
                  width={40}
                  height={40}
                  className="brightness-0 invert"
                />
                <span className="text-xl font-bold">IMPULSA LAB</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              {COMPANY_INFO.tagline}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 mb-6">
              <a 
                href="https://linkedin.com/company/impulsa-lab" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a 
                href="https://instagram.com/impulsalab" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="https://facebook.com/impulsalab" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a 
                href="https://youtube.com/@impulsalab" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={24} />
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
              <a 
                href="tel:+19295001850" 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <FaPhone /> +1 929 500 1850
              </a>
              <a 
                href="mailto:contacto@tuimpulsalab.com" 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <FaEnvelope /> contacto@tuimpulsalab.com
              </a>
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                <span>Brooklyn, NY<br />Estados Unidos</span>
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Soluciones</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  href="/servicios/finanzas"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  Dashboard Financiero
                  <FaArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link 
                  href="/servicios/operaciones"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  Automatización con IA
                  <FaArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link 
                  href="/servicios/marketing"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  Marketing Digital
                  <FaArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link 
                  href="/herramientas/agentes"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  Agentes de IA
                  <FaArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link 
                  href="/herramientas/arsenal"
                  className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  Arsenal Tecnológico
                  <FaArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Recursos</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/casos-de-exito"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Casos de Éxito
                </Link>
              </li>
              <li>
                <Link 
                  href="/herramientas"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Todas las Herramientas
                </Link>
              </li>
              <li>
                <Link 
                  href="/herramientas/noticias"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Noticias IA
                </Link>
              </li>
              <li>
                <Link 
                  href="/diagnostico"
                  className="text-blue-400 font-semibold hover:text-blue-300 transition-colors inline-flex items-center gap-1"
                >
                  Diagnóstico 3D ⭐
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Empresa</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  href="/nosotros"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link 
                  href="/nosotros#equipo"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Equipo
                </Link>
              </li>
              <li>
                <Link 
                  href="/carreras"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Carreras
                </Link>
              </li>
              <li>
                <Link 
                  href="/partners"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link 
                  href="/contacto"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Acceso</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link 
                  href="/login"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link 
                  href="/signup"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Registrarse
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Admin
                </Link>
              </li>
              <li>
                <Link 
                  href="/ayuda"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} {COMPANY_INFO.name} LLC. Todos los derechos reservados.
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link 
                href="/legal/privacidad" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link 
                href="/legal/terminos" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Términos de Servicio
              </Link>
              <Link 
                href="/legal/cookies" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Política de Cookies
              </Link>
              <Link 
                href="/legal/datos" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Protección de Datos
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges - Versión texto mientras no tengamos los SVGs */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-2">
              <span className="text-green-500">●</span> SSL Seguro
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-500">●</span> GDPR Compliant
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-500">●</span> SOC2 Type II
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-500">●</span> ISO 27001
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;