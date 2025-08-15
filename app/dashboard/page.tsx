'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import Link from 'next/link'
import { 
  CreditCard, 
  Settings, 
  FileText, 
  Package,
  ArrowRight,
  User,
  Bell,
  Shield,
  TrendingUp
} from 'lucide-react'

interface UserData {
  email: string
  name?: string
  role: string
  subscriptionStatus?: string
  plan?: string
  nextBillingDate?: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        
        // Obtener datos adicionales del usuario
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (userDoc.exists()) {
            const data = userDoc.data() as UserData
            
            // Verificar que sea cliente o admin
            if (data.role !== 'client' && data.role !== 'admin') {
              router.push('/unauthorized')
              return
            }
            
            setUserData(data)
          }
        } catch (error) {
          console.error('Error obteniendo datos del usuario:', error)
        }
      } else {
        router.push('/login')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user || !userData) {
    return null
  }

  const quickActions = [
    {
      title: 'Mi Suscripción',
      description: 'Gestiona tu plan y métodos de pago',
      icon: CreditCard,
      href: '/dashboard/suscripciones',
      color: 'bg-blue-500'
    },
    {
      title: 'Configuración',
      description: 'Actualiza tu perfil y preferencias',
      icon: Settings,
      href: '/dashboard/configuracion',
      color: 'bg-purple-500'
    },
    {
      title: 'Facturas',
      description: 'Descarga tus facturas y recibos',
      icon: FileText,
      href: '/dashboard/facturas',
      color: 'bg-green-500'
    },
    {
      title: 'Mis Servicios',
      description: 'Accede a las herramientas de tu plan',
      icon: Package,
      href: '/dashboard/servicios',
      color: 'bg-orange-500'
    }
  ]

  const stats = [
    {
      label: 'Plan Actual',
      value: userData.plan || 'Básico',
      icon: Shield,
      trend: 'active'
    },
    {
      label: 'Estado',
      value: userData.subscriptionStatus === 'active' ? 'Activo' : 'Inactivo',
      icon: TrendingUp,
      trend: userData.subscriptionStatus === 'active' ? 'up' : 'down'
    },
    {
      label: 'Próximo Pago',
      value: userData.nextBillingDate || 'N/A',
      icon: CreditCard,
      trend: 'neutral'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header del Dashboard */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Bienvenido, {userData.name || userData.email}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Gestiona tu cuenta y servicios de Impulsa Lab
                </p>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.trend === 'up' ? 'bg-green-100' :
                  stat.trend === 'down' ? 'bg-red-100' :
                  'bg-gray-100'
                }`}>
                  <stat.icon className={`h-6 w-6 ${
                    stat.trend === 'up' ? 'text-green-600' :
                    stat.trend === 'down' ? 'text-red-600' :
                    'text-gray-600'
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 group"
            >
              <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {action.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {action.description}
              </p>
              <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                <span className="text-sm font-medium">Acceder</span>
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Actividad Reciente
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Perfil actualizado</p>
                    <p className="text-sm text-gray-500">Hace 2 días</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <CreditCard className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Pago procesado</p>
                    <p className="text-sm text-gray-500">Hace 5 días</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-lg mr-4">
                    <Package className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Nuevo servicio activado</p>
                    <p className="text-sm text-gray-500">Hace 1 semana</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}