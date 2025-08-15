import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Definir rutas por nivel de acceso
const PUBLIC_ROUTES = ['/', '/login', '/signup', '/servicios', '/nosotros', '/contacto']
const REGISTERED_ROUTES = ['/diagnostico', '/herramientas']
const CLIENT_ROUTES = ['/dashboard', '/dashboard/configuracion', '/dashboard/suscripciones', '/dashboard/facturas']
const CONSULTANT_ROUTES = ['/consultant', '/consultant/diagnosticos', '/consultant/clientes']
const ADMIN_ROUTES = ['/admin', '/admin/usuarios', '/admin/analytics']

// Rutas que requieren NO estar autenticado
const AUTH_ROUTES = ['/login', '/signup']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('auth-token')
  
  // Para rutas públicas, permitir siempre
  if (PUBLIC_ROUTES.includes(path)) {
    return NextResponse.next()
  }

  // Si no hay token y la ruta no es pública
  if (!token) {
    // Permitir acceso a login/signup
    if (AUTH_ROUTES.includes(path)) {
      return NextResponse.next()
    }
    
    // Redirigir a login para cualquier ruta protegida
    if (
      REGISTERED_ROUTES.some(route => path.startsWith(route)) ||
      CLIENT_ROUTES.some(route => path.startsWith(route)) ||
      CONSULTANT_ROUTES.some(route => path.startsWith(route)) ||
      ADMIN_ROUTES.some(route => path.startsWith(route))
    ) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    return NextResponse.next()
  }

  // Si hay token, verificar el rol del usuario
  try {
    // Decodificar el token (esto es temporal, luego lo haremos con Firebase Admin)
    const tokenValue = token.value
    
    // Por ahora, parseamos el token básico que guardamos
    // En producción, esto debe verificarse con Firebase Admin SDK
    const userDataString = Buffer.from(tokenValue.split('.')[1] || '', 'base64').toString()
    const userData = JSON.parse(userDataString)
    const userRole = userData.role || 'registered'

    // Si el usuario está autenticado y trata de acceder a login/signup
    if (AUTH_ROUTES.includes(path)) {
      // Redirigir según su rol
      if (userRole === 'admin') return NextResponse.redirect(new URL('/admin', request.url))
      if (userRole === 'consultant') return NextResponse.redirect(new URL('/consultant', request.url))
      if (userRole === 'client') return NextResponse.redirect(new URL('/dashboard', request.url))
      return NextResponse.redirect(new URL('/diagnostico', request.url))
    }

    // Verificar permisos según el rol
    if (path.startsWith('/admin')) {
      if (userRole !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
    }

    if (path.startsWith('/consultant')) {
      if (userRole !== 'consultant' && userRole !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
    }

    if (path.startsWith('/dashboard')) {
      if (userRole !== 'client' && userRole !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
    }

    if (REGISTERED_ROUTES.some(route => path.startsWith(route))) {
      // Todos los usuarios autenticados pueden acceder
      return NextResponse.next()
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Error en middleware:', error)
    // En caso de error, redirigir a login
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|images|public).*)',
  ],
}