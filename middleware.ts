import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas públicas que no requieren autenticación
const publicRoutes = [
  '/',
  '/login',
  '/signup',
  '/verify-email',
  '/api/auth',
  '/api/ai/chat',
  '/diagnostico',
  '/herramientas',
  '/servicios',
  '/nosotros',
  '/contacto',
  '/faq',
  '/legal',
  '/blog',
  '/recursos'
];

// Rutas y roles requeridos - CORREGIDO AQUÍ
const roleBasedRoutes = {
  '/dashboard': ['registered', 'client', 'consultant', 'admin', 'free', 'premium'],
  '/consultant': ['consultant', 'admin'],
  '/admin': ['admin', 'consultant'],  // ← AHORA PERMITE CONSULTANT
  '/api/admin': ['admin', 'consultant'],  // ← TAMBIÉN EN LAS APIs
  '/api/consultant': ['consultant', 'admin'],
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Permitir rutas públicas
  if (publicRoutes.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }

  // Verificar autenticación para rutas protegidas
  const token = request.cookies.get('auth-token');
  
  if (!token) {
    // Si no hay token, redirigir al login
    if (path.startsWith('/api/')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verificar roles para rutas específicas
  for (const [route, allowedRoles] of Object.entries(roleBasedRoutes)) {
    if (path.startsWith(route)) {
      try {
        // Aquí deberías verificar el token y obtener el rol del usuario
        // Por ahora, asumimos que el token contiene el rol
        const userRole = await getUserRoleFromToken(token.value);
        
        if (!allowedRoles.includes(userRole)) {
          if (path.startsWith('/api/')) {
            return NextResponse.json({ error: 'Sin permisos suficientes' }, { status: 403 });
          }
          return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
      } catch (error) {
        console.error('Error verificando rol:', error);
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  return NextResponse.next();
}

// Función auxiliar para obtener el rol del token
async function getUserRoleFromToken(token: string): Promise<string> {
  try {
    // Aquí deberías decodificar el JWT o verificar con Firebase
    // Por ahora retornamos un valor por defecto
    // En producción, esto debería verificar el token real
    
    // Si estás usando Firebase Auth, podrías hacer algo como:
    // const decodedToken = await admin.auth().verifyIdToken(token);
    // return decodedToken.role || 'registered';
    
    return 'registered';
  } catch (error) {
    console.error('Error decodificando token:', error);
    return 'registered';
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
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
