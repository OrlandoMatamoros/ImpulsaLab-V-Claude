'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Info, Lock } from 'lucide-react'

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireConsultant?: boolean
  customMessage?: string
}

export default function AuthGuard({ 
  children, 
  requireAuth = true,
  requireConsultant = false,
  customMessage
}: AuthGuardProps) {
  const { user, userData, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && requireAuth && !user) {
      // Guardar la ruta actual para redirigir después del login
      sessionStorage.setItem('redirectAfterLogin', pathname)
    }
  }, [loading, user, requireAuth, pathname])

  // Mostrar loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002D62] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  // Si requiere auth y no hay usuario
  if (requireAuth && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Acceso Restringido
            </h1>
            <p className="text-gray-600">
              {customMessage || 'Necesitas una cuenta para acceder a esta sección'}
            </p>
          </div>

          <Alert className="max-w-2xl mx-auto">
            <Info className="h-4 w-4" />
            <AlertDescription className="ml-2">
              <p className="font-semibold mb-2">¿Por qué necesito una cuenta?</p>
              <ul className="list-disc list-inside mb-4 text-sm">
                <li>Acceso a herramientas premium de IA</li>
                <li>Guardar y gestionar tus proyectos</li>
                <li>Soporte personalizado</li>
                <li>Actualizaciones y nuevas funcionalidades</li>
              </ul>
              <div className="flex gap-4">
                <Button 
                  onClick={() => router.push(`/login?redirectTo=${encodeURIComponent(pathname)}`)}
                  className="bg-[#002D62] hover:bg-[#001d42]"
                >
                  Iniciar Sesión
                </Button>
                <Button 
                  onClick={() => router.push('/signup')}
                  variant="outline"
                >
                  Crear Cuenta Gratis
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  // Si requiere consultor y no lo es
  if (requireConsultant && userData?.role !== 'consultant') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Acceso Solo para Consultores
            </h1>
            <p className="text-gray-600">
              Esta sección está disponible únicamente para consultores certificados
            </p>
          </div>

          <Alert className="max-w-2xl mx-auto">
            <Info className="h-4 w-4" />
            <AlertDescription className="ml-2">
              <p className="font-semibold mb-2">¿Eres consultor?</p>
              <p className="mb-4">
                Si tienes un código de consultor, crea una cuenta especial para acceder a todas las herramientas profesionales.
              </p>
              <Button 
                onClick={() => router.push('/signup?consultor=true')}
                className="bg-[#002D62] hover:bg-[#001d42]"
              >
                Registrarse como Consultor
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  // Si todo está bien, mostrar el contenido
  return <>{children}</>
}