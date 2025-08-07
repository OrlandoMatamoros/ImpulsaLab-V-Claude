// app/legal/terminos/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Términos de Servicio | Impulsa Lab',
  description: 'Términos y condiciones de uso de los servicios de Impulsa Lab.',
};

export default function TermsOfService() {
  return (
    <>
      <nav className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Volver al inicio
        </Link>
      </nav>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-4">Términos de Servicio</h1>
        
        <p className="text-gray-600 mb-8">
          Última actualización: {new Date().toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Aceptación de los Términos</h2>
          <p>
            Al acceder y utilizar los servicios de Impulsa Lab ("nosotros", "nuestro"), 
            aceptas estar legalmente vinculado por estos Términos de Servicio. Si no 
            aceptas estos términos, no utilices nuestros servicios.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Descripción del Servicio</h2>
          <p>Impulsa Lab proporciona servicios de:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Consultoría en transformación digital</li>
            <li>Desarrollo de soluciones con inteligencia artificial</li>
            <li>Análisis de datos y dashboards personalizados</li>
            <li>Automatización de procesos empresariales</li>
            <li>Herramientas digitales y plataformas web</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Registro y Cuenta</h2>
          <p>
            Para acceder a ciertos servicios, debes crear una cuenta proporcionando 
            información precisa y completa. Eres responsable de:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mantener la confidencialidad de tu cuenta y contraseña</li>
            <li>Todas las actividades que ocurran bajo tu cuenta</li>
            <li>Notificarnos inmediatamente sobre cualquier uso no autorizado</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Uso Aceptable</h2>
          <p>Te comprometes a NO:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Utilizar nuestros servicios para fines ilegales o no autorizados</li>
            <li>Intentar acceder a sistemas o datos sin autorización</li>
            <li>Interferir con el funcionamiento de nuestros servicios</li>
            <li>Transmitir virus, malware o código malicioso</li>
            <li>Violar derechos de propiedad intelectual</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Propiedad Intelectual</h2>
          <p>
            Todo el contenido, diseño, código y tecnología de Impulsa Lab está protegido 
            por derechos de autor y otras leyes de propiedad intelectual. No puedes 
            copiar, modificar, distribuir o crear trabajos derivados sin nuestro 
            consentimiento por escrito.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Pagos y Facturación</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Los precios están sujetos a cambios con previo aviso</li>
            <li>Los pagos son no reembolsables salvo que se indique lo contrario</li>
            <li>Eres responsable de proporcionar información de pago válida</li>
            <li>Los impuestos aplicables se agregarán a las tarifas</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Limitación de Responsabilidad</h2>
          <p>
            En la máxima medida permitida por la ley, Impulsa Lab no será responsable por:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Daños indirectos, incidentales o consecuenciales</li>
            <li>Pérdida de datos, beneficios o ingresos</li>
            <li>Interrupciones del servicio o errores del sistema</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Indemnización</h2>
          <p>
            Aceptas indemnizar y eximir de responsabilidad a Impulsa Lab por cualquier 
            reclamo, daño o gasto derivado de tu uso de nuestros servicios o violación 
            de estos términos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Terminación</h2>
          <p>
            Podemos suspender o terminar tu acceso a nuestros servicios en cualquier 
            momento, con o sin causa, con o sin aviso previo.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Ley Aplicable</h2>
          <p>
            Estos términos se regirán e interpretarán de acuerdo con las leyes de 
            Estados Unidos y el estado de Nueva York.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Cambios a los Términos</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. 
            Los cambios entrarán en vigor cuando se publiquen en esta página.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Contacto</h2>
          <p>Para preguntas sobre estos Términos de Servicio:</p>
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <p><strong>Impulsa Lab LLC</strong></p>
            <p>Email: <a href="mailto:legal@tuimpulsalab.com" className="text-blue-600 hover:underline">legal@tuimpulsalab.com</a></p>
            <p>Teléfono: +1 929 500 1850</p>
          </div>
        </section>
      </article>
    </>
  );
}