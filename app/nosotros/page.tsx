'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaCheckCircle, FaLightbulb, FaRocket, FaHandshake, FaChartLine, FaBrain, FaUsers, FaGlobeAmericas, FaAward } from 'react-icons/fa';

export default function NosotrosPage() {
  // Timeline data
  const timeline = [
    {
      year: '2020',
      title: 'La Chispa Inicial',
      description: 'Orlando identifica la brecha entre la consultoría tradicional y las necesidades reales de las PYMEs latinas en NY.'
    },
    {
      year: '2022',
      title: 'Formación del Equipo',
      description: 'Se unen Diego, Katty y Alex, cada uno aportando expertise único en marca, operaciones y ventas.'
    },
    {
      year: '2023',
      title: 'Integración de IA',
      description: 'Nova 3.0 se integra como socia estratégica, revolucionando nuestra capacidad de análisis y automatización.'
    },
    {
      year: '2024',
      title: 'Lanzamiento Oficial',
      description: 'Impulsa Lab abre sus puertas con la metodología Diagnóstico 3D y primeros casos de éxito.'
    },
    {
      year: '2025',
      title: 'Expansión y Crecimiento',
      description: 'Consolidación como referente en transformación digital para PYMEs latinas en el área triestatal.'
    }
  ];

  // Valores de la empresa
  const valores = [
    {
      icon: <FaHandshake className="w-8 h-8" />,
      title: 'Compromiso Real',
      description: 'No somos consultores que entregan un reporte y se van. Nos ensuciamos las manos contigo hasta ver resultados.'
    },
    {
      icon: <FaBrain className="w-8 h-8" />,
      title: 'Innovación Práctica',
      description: 'Usamos IA de vanguardia pero siempre con un enfoque práctico y resultados medibles para tu negocio.'
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: 'Cercanía Cultural',
      description: 'Entendemos tu contexto, hablamos tu idioma y conocemos los desafíos únicos del emprendedor latino.'
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: 'Resultados Medibles',
      description: 'Cada estrategia viene con KPIs claros. Si no se puede medir, no lo hacemos.'
    }
  ];

  // Diferenciadores
  const diferenciadores = [
    {
      title: 'Experiencia en las Trincheras',
      description: 'Orlando ha asesorado a +200 emprendedores en NY y conoce cada obstáculo del camino.',
      stat: '200+',
      label: 'Empresas Asesoradas'
    },
    {
      title: 'Equipo Multidisciplinario',
      description: 'Estrategia, creatividad, operaciones y ventas trabajando en sincronía perfecta.',
      stat: '4+1',
      label: 'Expertos + IA'
    },
    {
      title: 'Tecnología Democratizada',
      description: 'Hacemos accesible la IA empresarial que antes solo podían pagar las grandes corporaciones.',
      stat: '80%',
      label: 'Reducción de Costos'
    },
    {
      title: 'Enfoque 360°',
      description: 'No solo vendemos tecnología, implementamos transformación integral en toda tu empresa.',
      stat: '3D',
      label: 'Diagnóstico Completo'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Inicio
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">Nosotros</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transformamos el Futuro de los Negocios con IA
            </h1>
            <p className="text-xl mb-8">
              Somos el puente entre la ambición emprendedora y la excelencia operativa, 
              combinando experiencia humana con inteligencia artificial de vanguardia.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">Fundada en 2024</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">Brooklyn, NY</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">100% Bilingüe</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historia y Propósito */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestra Historia</h2>
              <p className="text-gray-600 text-lg">
                De la frustración a la innovación: Cómo nació Impulsa Lab
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-6">
                <span className="font-semibold text-2xl text-blue-600">Impulsa Lab nació de una simple observación:</span> 
                los pequeños negocios latinos en Nueva York no necesitan más planes teóricos de consultores que cobran 
                fortunas y entregan PDFs que nadie implementa. Necesitan un socio que entienda su realidad, 
                hable su idioma y se comprometa con sus resultados.
              </p>
              
              <p className="mb-6">
                Orlando Matamoros, nuestro fundador, lo vivió en carne propia. Después de más de 20 años en 
                estrategia empresarial y habiendo asesorado a cientos de emprendedores como Consejero de Negocios 
                en Nueva York, se dio cuenta de que existía una brecha enorme entre lo que las PYMEs necesitaban 
                y lo que el mercado ofrecía.
              </p>

              <blockquote className="border-l-4 border-blue-600 pl-6 my-8 text-xl italic text-gray-600">
                "Vi demasiados emprendedores brillantes fracasar no por falta de pasión o trabajo duro, 
                sino por no tener acceso a las herramientas y el conocimiento que las grandes empresas 
                dan por sentado. Decidí que era hora de cambiar eso."
                <footer className="text-sm mt-2 not-italic">— Orlando Matamoros, Fundador</footer>
              </blockquote>

              <p className="mb-6">
                Así comenzó el viaje para crear algo diferente: una consultora que combina la experiencia 
                humana irreemplazable con el poder de la inteligencia artificial, pero siempre con los pies 
                en la tierra y las manos en la masa. No vendemos tecnología por tecnología; implementamos 
                soluciones que funcionan en el mundo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Nuestro Camino
            </h2>
            
            <div className="relative">
              {/* Línea vertical */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>
              
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-start mb-12 last:mb-0">
                  {/* Círculo */}
                  <div className="absolute left-8 w-4 h-4 bg-white border-4 border-blue-600 rounded-full -translate-x-1/2"></div>
                  
                  {/* Contenido */}
                  <div className="ml-20">
                    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <span className="text-blue-600 font-bold text-sm">{item.year}</span>
                      <h3 className="text-xl font-bold mt-1 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Misión, Visión, Valores */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Misión y Visión */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <FaRocket className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Nuestra Misión</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Democratizar la inteligencia de negocio para los pequeños y medianos empresarios de Nueva York. 
                  Lo logramos al diagnosticar su etapa de desarrollo e implementar soluciones prácticas y asequibles 
                  de Inteligencia Artificial en sus tres pilares fundamentales: Finanzas, Operaciones y Marketing.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                    <FaLightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Nuestra Visión</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Aspiramos a ser el laboratorio de innovación y el sistema de navegación estratégico de referencia 
                  para el ecosistema de las PYMEs en Nueva York. Buscamos crear un futuro donde cualquier emprendedor 
                  pueda acceder a la misma inteligencia de negocio que las grandes corporaciones.
                </p>
              </div>
            </div>

            {/* Valores */}
            <div>
              <h3 className="text-3xl font-bold text-center mb-12">Nuestros Valores</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {valores.map((valor, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform">
                      {valor.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-2">{valor.title}</h4>
                    <p className="text-gray-600 text-sm">{valor.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por Qué Elegirnos */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por Qué Impulsa Lab?</h2>
              <p className="text-gray-600 text-lg">
                Lo que nos hace diferentes no es solo lo que hacemos, sino cómo lo hacemos
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {diferenciadores.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                          {item.stat}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{item.label}</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro Compromiso */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
              <FaAward className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
              <h2 className="text-3xl font-bold mb-6">Nuestro Compromiso Contigo</h2>
              <p className="text-lg mb-8 leading-relaxed">
                No somos una consultora más. Somos tu equipo extendido, tu departamento de innovación, 
                tu socio estratégico. Nuestro éxito se mide por el tuyo. Por eso, cada proyecto que 
                tomamos es personal. Cada cliente es parte de nuestra familia empresarial. Y cada 
                resultado es una victoria compartida.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <FaCheckCircle className="w-6 h-6 mb-2 text-green-300" />
                  <h4 className="font-semibold mb-1">Transparencia Total</h4>
                  <p className="text-sm text-white/90">Sin letra pequeña, sin sorpresas en la factura</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <FaCheckCircle className="w-6 h-6 mb-2 text-green-300" />
                  <h4 className="font-semibold mb-1">Resultados Garantizados</h4>
                  <p className="text-sm text-white/90">Si no ves mejoras, trabajamos hasta que las veas</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <FaCheckCircle className="w-6 h-6 mb-2 text-green-300" />
                  <h4 className="font-semibold mb-1">Soporte Continuo</h4>
                  <p className="text-sm text-white/90">No te dejamos solo después de la implementación</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impacto Social */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FaGlobeAmericas className="w-16 h-16 mx-auto mb-6 text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Impacto en la Comunidad</h2>
            <p className="text-lg text-gray-700 mb-12 leading-relaxed">
              Creemos que fortalecer a las PYMEs latinas no es solo buen negocio, es nuestra 
              responsabilidad social. Cada empresa que crece con nosotros genera empleos, 
              fortalece familias y enriquece nuestra comunidad. Estamos construyendo el 
              futuro económico de nuestra gente, un negocio a la vez.
            </p>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-sm text-gray-600">Empleos Creados</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">$2M+</div>
                <div className="text-sm text-gray-600">Ingresos Generados</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Negocios Transformados</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-sm text-gray-600">Tasa de Satisfacción</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA para ver el equipo */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Conoce al Equipo Detrás de la Magia</h2>
            <p className="text-lg text-gray-600 mb-8">
              Somos más que consultores. Somos emprendedores, innovadores y apasionados por el éxito de tu negocio.
            </p>
            <Link
              href="/#equipo"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Conocer al Equipo
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para Transformar tu Negocio?
          </h2>
          <p className="text-xl mb-8">
            Únete a los emprendedores que están revolucionando sus empresas con IA
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Solicitar Consultoría
              <FaArrowRight />
            </Link>
            <Link
              href="/diagnostico"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
            >
              Diagnóstico Gratuito
              <FaCheckCircle />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}