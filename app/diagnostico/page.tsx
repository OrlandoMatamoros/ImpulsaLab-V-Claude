'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import DiagnosticWizard from './components/DiagnosticWizard'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DiagnosticoPage() {
  const { user, userData, loading } = useAuth()
  const router = useRouter()

  // Si no hay usuario, mostrar mensaje para iniciar sesión
  if (!loading && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Diagnóstico 3D Empresarial
            </h1>
            <p className="text-gray-600">
              Evalúa el estado actual de tu empresa en las tres dimensiones clave
            </p>
          </div>

          <Alert className="max-w-2xl mx-auto">
            <Info className="h-4 w-4" />
            <AlertDescription className="ml-2">
              <p className="font-semibold mb-2">Inicia sesión para continuar</p>
              <p className="mb-4">
                Necesitas una cuenta para realizar el diagnóstico y guardar tus resultados.
              </p>
              <div className="flex gap-4">
                <Button 
                  onClick={() => router.push('/login?redirectTo=/diagnostico')}
                  className="bg-[#002D62] hover:bg-[#001d42]"
                >
                  Iniciar Sesión
                </Button>
                <Button 
                  onClick={() => router.push('/signup')}
                  variant="outline"
                >
                  Crear Cuenta
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  // Si está cargando, mostrar un loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002D62] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  // Determinar si es modo interno basado en el rol del usuario
  const isInternalMode = userData?.role === 'consultant'

  // Si hay usuario, mostrar el wizard con el modo correcto
  return (
    <DiagnosticWizard 
      consultantId={user?.uid || ''} 
      isInternalMode={isInternalMode}
    />
  )
}