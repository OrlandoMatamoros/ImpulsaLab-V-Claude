import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

// Rutas públicas que no requieren autenticación
const publicRoutes = ['/', '/login', '/signup', '/verification', '/api/verification'];

// Rutas y roles requeridos
const roleBasedRoutes = {
  '/dashboard': ['registered', 'client', 'consultant', 'admin'],
  '/consultant': ['consultant', 'admin'],
  '/admin': ['admin'],
  '/api/admin': ['admin'],
  '/api/consultant': ['consultant', 'admin'],
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  console.log('🔐 Middleware ejecutado para:', path);
  
  // Permitir rutas públicas
  if (publicRoutes.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Permitir assets y archivos estáticos
  if (path.startsWith('/_next') || path.startsWith('/api/webhook')) {
    return NextResponse.next();
  }
  
  // Obtener token de la cookie
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    console.log('❌ No hay token, redirigiendo a login');
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  try {
    // Verificar y decodificar el token
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userRole = payload.role as string;
    
    console.log('✅ Token válido, rol:', userRole);
    
    // Verificar permisos por ruta
    for (const [route, allowedRoles] of Object.entries(roleBasedRoutes)) {
      if (path.startsWith(route)) {
        if (!allowedRoles.includes(userRole)) {
          console.log('⛔ Acceso denegado. Rol:', userRole, 'Ruta:', route);
          return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
      }
    }
    
    // Agregar información del usuario a los headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.uid as string);
    requestHeaders.set('x-user-role', userRole);
    requestHeaders.set('x-user-email', payload.email as string);
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    
  } catch (error) {
    console.error('❌ Token inválido:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
};
