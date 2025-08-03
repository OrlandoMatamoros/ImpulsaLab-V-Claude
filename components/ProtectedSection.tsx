'use client'

import { useAuth } from '@/contexts/FirebaseAuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'
import { useState } from 'react'

interface ProtectedSectionProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireConsultant?: boolean
  message?: string
  showPreview?: boolean
  previewBlur?: boolean
}

export default function ProtectedSection({ 
  children, 
  requireAuth = true,
  requireConsultant = false,
  message = "Crea una cuenta para acceder a esta funcionalidad",
  showPreview = true,
  previewBlur = false // Cambiado a false por defecto
}: ProtectedSectionProps) {
  const { user, userData } = useAuth()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  const hasAccess = user && (!requireConsultant || userData?.role === 'consultant')

  if (hasAccess) {
    return <div>{children}</div>
  }

  // Función para interceptar clicks
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowModal(true)
  }

  return (
    <div className="relative">
      {/* Contenido NORMAL - Sin blur */}
      <div onClick={handleClick} className="cursor-pointer">
        {children}
      </div>

      {/* Modal cuando hace click */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-center">¡Regístrate para continuar!</h3>
            <p className="text-gray-600 mb-6 text-center">{message}</p>
            
            <div className="space-y-3">
              <Button 
                onClick={() => router.push('/signup')}
                className="w-full bg-[#002D62] hover:bg-[#001d42]"
              >
                Crear Cuenta Gratis
              </Button>
              <Button 
                onClick={() => router.push('/login')}
                variant="outline"
                className="w-full"
              >
                Ya tengo cuenta
              </Button>
              <Button 
                onClick={() => setShowModal(false)}
                variant="ghost"
                className="w-full text-gray-500"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}