// app/legal/cookies/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Política de Cookies | Impulsa Lab',
  description: 'Información sobre cómo usamos las cookies en Impulsa Lab.',
};

export default function CookiesPolicy() {
  return (
    <>
      <nav className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Volver al inicio
        </Link>
      </nav>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-4">Política de Cookies</h1>
        
        <p className="text-gray-600 mb-8">
          Última actualización: {new Date().toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">¿Qué son las Cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo 
            cuando visitas un sitio web. Se utilizan ampliamente para hacer que los sitios 
            web funcionen de manera más eficiente y proporcionar información a los 
            propietarios del sitio.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cómo Usamos las Cookies</h2>
          <p>Utilizamos cookies para:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Recordar tus preferencias y configuraciones</li>
            <li>Mantener tu sesión activa</li>
            <li>Analizar cómo utilizas nuestro sitio web</li>
            <li>Personalizar tu experiencia</li>
            <li>Mejorar el rendimiento del sitio</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tipos de Cookies que Utilizamos</h2>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold mb-2">🔒 Cookies Esenciales</h3>
            <p>
              Estas cookies son necesarias para que el sitio web funcione correctamente. 
              Sin ellas, servicios como la navegación por páginas o el acceso a áreas 
              seguras no serían posibles.
            </p>
            <ul className="list-disc pl-6 mt-2 text-sm">
              <li>Autenticación de usuario</li>
              <li>Preferencias de cookies</li>
              <li>Seguridad del sitio</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold mb-2">📊 Cookies de Análisis</h3>
            <p>
              Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web 
              recopilando información de forma anónima.
            </p>
            <ul className="list-disc pl-6 mt-2 text-sm">
              <li>Google Analytics</li>
              <li>Hotjar (mapas de calor)</li>
              <li>Métricas de rendimiento</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold mb-2">🎯 Cookies de Marketing</h3>
            <p>
              Se utilizan para rastrear visitantes en diferentes sitios web con el fin 
              de mostrar anuncios relevantes y atractivos.
            </p>
            <ul className="list-disc pl-6 mt-2 text-sm">
              <li>Google Ads</li>
              <li>Facebook Pixel</li>
              <li>LinkedIn Insight Tag</li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">⚙️ Cookies de Funcionalidad</h3>
            <p>
              Permiten que el sitio recuerde las elecciones que haces para proporcionarte 
              características mejoradas y más personalizadas.
            </p>
            <ul className="list-disc pl-6 mt-2 text-sm">
              <li>Preferencias de idioma</li>
              <li>Configuración de región</li>
              <li>Personalización de la interfaz</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Gestión de Cookies</h2>
          <p>
            Puedes controlar y/o eliminar las cookies según desees. Tienes varias opciones:
          </p>
          
          <h3 className="text-xl font-semibold mb-2 mt-4">Configuración del Navegador</h3>
          <p>
            La mayoría de los navegadores web te permiten controlar las cookies a través 
            de sus configuraciones:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies
            </li>
            <li>
              <strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies
            </li>
            <li>
              <strong>Safari:</strong> Preferencias → Privacidad
            </li>
            <li>
              <strong>Edge:</strong> Configuración → Privacidad, búsqueda y servicios
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-2 mt-4">Opt-Out de Servicios Específicos</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Google Analytics: 
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                Descargar complemento de opt-out
              </a>
            </li>
            <li>
              Google Ads: 
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                Configuración de anuncios
              </a>
            </li>
            <li>
              Facebook: 
              <a href="https://www.facebook.com/ads/preferences" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                Preferencias de anuncios
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Consecuencias de Deshabilitar Cookies</h2>
          <p>
            Si decides deshabilitar las cookies, ten en cuenta que:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Algunas funciones del sitio pueden no funcionar correctamente</li>
            <li>Tu experiencia de usuario puede verse afectada</li>
            <li>Es posible que tengas que iniciar sesión repetidamente</li>
            <li>Tus preferencias no se guardarán entre visitas</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Actualizaciones de esta Política</h2>
          <p>
            Podemos actualizar nuestra Política de Cookies ocasionalmente. Te notificaremos 
            cualquier cambio publicando la nueva política en esta página y actualizando la 
            fecha de "Última actualización".
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Más Información</h2>
          <p>
            Para obtener más información general sobre las cookies, visita:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                AboutCookies.org
              </a>
            </li>
            <li>
              <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                AllAboutCookies.org
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contacto</h2>
          <p>Si tienes preguntas sobre nuestra Política de Cookies:</p>
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <p><strong>Impulsa Lab LLC</strong></p>
            <p>Email: <a href="mailto:cookies@tuimpulsalab.com" className="text-blue-600 hover:underline">cookies@tuimpulsalab.com</a></p>
            <p>Teléfono: +1 929 500 1850</p>
          </div>
        </section>
      </article>
    </>
  );
}