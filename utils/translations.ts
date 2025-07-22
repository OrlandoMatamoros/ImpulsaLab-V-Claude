// Archivo: /utils/translations.ts

export const translations = {
  ES: {
    // Navegación
    nav: {
      diagnostico: "Diagnóstico 3D",
      herramientas: "Herramientas",
      finanzas: "Finanzas",
      operaciones: "Operaciones",
      marketing: "Marketing",
      quienesSomos: "Quiénes Somos",
      contacto: "Contacto",
      iniciarSesion: "Iniciar sesión",
      crearCuenta: "Crear cuenta"
    },
    // Herramientas submenu
    tools: {
      arsenal: "Arsenal Tecnológico",
      agentes: "Agentes IA",
      noticias: "Noticias IA"
    },
    // Hero Section
    hero: {
      titulo: "Inteligencia de Negocios en la 'Coordenada' Correcta",
      subtitulo: "Transformamos pequeños negocios en Brooklyn y Queens con soluciones de IA personalizadas",
      cta: "Obtén tu Diagnóstico 3D Gratis",
      secundario: "Ver cómo funciona"
    },
    // Diagnostic Section
    diagnostic: {
      titulo: "Diagnóstico 3D",
      subtitulo: "Evaluamos tu negocio en tres dimensiones críticas",
      finanzas: {
        titulo: "Finanzas",
        descripcion: "Control total de tus números. Dashboards inteligentes que transforman datos en decisiones rentables."
      },
      operaciones: {
        titulo: "Operaciones",
        descripcion: "Automatización que libera tu tiempo. Agentes de IA trabajando 24/7 para tu negocio."
      },
      marketing: {
        titulo: "Marketing",
        descripcion: "Tu marca, amplificada. Contenido y estrategias que conectan y convierten."
      }
    },
    // Footer
    footer: {
      derechos: "Todos los derechos reservados",
      privacidad: "Política de Privacidad",
      terminos: "Términos de Servicio"
    }
  },
  EN: {
    // Navigation
    nav: {
      diagnostico: "3D Diagnostic",
      herramientas: "Tools",
      finanzas: "Finance",
      operaciones: "Operations",
      marketing: "Marketing",
      quienesSomos: "About Us",
      contacto: "Contact",
      iniciarSesion: "Log in",
      crearCuenta: "Sign up"
    },
    // Tools submenu
    tools: {
      arsenal: "Tech Arsenal",
      agentes: "AI Agents",
      noticias: "AI News"
    },
    // Hero Section
    hero: {
      titulo: "Business Intelligence at the Right 'Coordinate'",
      subtitulo: "We transform small businesses in Brooklyn and Queens with personalized AI solutions",
      cta: "Get Your Free 3D Diagnostic",
      secundario: "See how it works"
    },
    // Diagnostic Section
    diagnostic: {
      titulo: "3D Diagnostic",
      subtitulo: "We evaluate your business in three critical dimensions",
      finanzas: {
        titulo: "Finance",
        descripcion: "Total control of your numbers. Smart dashboards that transform data into profitable decisions."
      },
      operaciones: {
        titulo: "Operations",
        descripcion: "Automation that frees your time. AI agents working 24/7 for your business."
      },
      marketing: {
        titulo: "Marketing",
        descripcion: "Your brand, amplified. Content and strategies that connect and convert."
      }
    },
    // Footer
    footer: {
      derechos: "All rights reserved",
      privacidad: "Privacy Policy",
      terminos: "Terms of Service"
    }
  }
}

// Tipo para las claves de idioma
export type Language = 'ES' | 'EN'

// Tipo para el objeto de traducciones
export type Translations = typeof translations.ES