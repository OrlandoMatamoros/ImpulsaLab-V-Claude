// app/legal/privacidad/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidad | Impulsa Lab',
  description: 'Conoce cómo protegemos y manejamos tu información personal en Impulsa Lab.',
};

export default function PrivacyPolicy() {
  return (
    <>
      <nav className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Volver al inicio
        </Link>
      </nav>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-4">Política de Privacidad</h1>
        
        <p className="text-gray-600 mb-8">
          Última actualización: {new Date().toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introducción</h2>
          <p>
            En Impulsa Lab, valoramos y respetamos tu privacidad. Esta Política de Privacidad 
            explica cómo recopilamos, usamos, compartimos y protegemos tu información personal 
            cuando utilizas nuestros servicios.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Información que Recopilamos</h2>
          <h3 className="text-xl font-semibold mb-2">2.1 Información que nos proporcionas</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Nombre y apellidos</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Información de la empresa</li>
            <li>Datos de facturación cuando corresponda</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">2.2 Información recopilada automáticamente</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Dirección IP</li>
            <li>Tipo de navegador y dispositivo</li>
            <li>Páginas visitadas y tiempo de permanencia</li>
            <li>Información de cookies y tecnologías similares</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Cómo Usamos tu Información</h2>
          <p>Utilizamos la información recopilada para:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Proporcionar y mejorar nuestros servicios</li>
            <li>Personalizar tu experiencia</li>
            <li>Comunicarnos contigo sobre actualizaciones y ofertas</li>
            <li>Procesar pagos y transacciones</li>
            <li>Cumplir con obligaciones legales</li>
            <li>Proteger contra fraude y abuso</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Compartir Información</h2>
          <p>
            No vendemos tu información personal. Solo compartimos tu información en las 
            siguientes circunstancias:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Con tu consentimiento explícito</li>
            <li>Con proveedores de servicios que nos ayudan a operar nuestro negocio</li>
            <li>Para cumplir con obligaciones legales</li>
            <li>Para proteger nuestros derechos, privacidad, seguridad o propiedad</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Seguridad de los Datos</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas apropiadas para 
            proteger tu información personal contra acceso no autorizado, alteración, 
            divulgación o destrucción.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Tus Derechos</h2>
          <p>Tienes derecho a:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Acceder a tu información personal</li>
            <li>Corregir datos inexactos</li>
            <li>Solicitar la eliminación de tus datos</li>
            <li>Oponerte al procesamiento de tus datos</li>
            <li>Solicitar la portabilidad de tus datos</li>
            <li>Retirar tu consentimiento en cualquier momento</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Retención de Datos</h2>
          <p>
            Conservamos tu información personal solo durante el tiempo necesario para 
            cumplir con los propósitos descritos en esta política, a menos que la ley 
            requiera o permita un período de retención más largo.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Cookies y Tecnologías Similares</h2>
          <p>
            Utilizamos cookies y tecnologías similares para mejorar tu experiencia. 
            Para más información, consulta nuestra{' '}
            <Link href="/legal/cookies" className="text-blue-600 hover:underline">
              Política de Cookies
            </Link>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Cambios a esta Política</h2>
          <p>
            Podemos actualizar esta Política de Privacidad periódicamente. Te notificaremos 
            sobre cambios significativos publicando la nueva política en esta página y 
            actualizando la fecha de "Última actualización".
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Contacto</h2>
          <p>Si tienes preguntas sobre esta Política de Privacidad, contáctanos:</p>
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <p><strong>Impulsa Lab LLC</strong></p>
            <p>Email: <a href="mailto:privacidad@tuimpulsalab.com" className="text-blue-600 hover:underline">privacidad@tuimpulsalab.com</a></p>
            <p>Teléfono: +1 929 500 1850</p>
            <p>Dirección: Brooklyn, NY, Estados Unidos</p>
          </div>
        </section>
      </article>
    </>
  );
}