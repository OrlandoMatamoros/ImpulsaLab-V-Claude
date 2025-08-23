'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  User, 
  LogOut, 
  LayoutDashboard, 
  FileText, 
  Shield, 
  ChevronDown,
  TrendingUp,
  Sparkles,
  ExternalLink,
  Target,
  Brain
} from 'lucide-react'

export function Navigation() {
  const router = useRouter()
  const { user, userData, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Impulsa Lab
            </Link>
            
            <div className="hidden md:flex ml-10 items-center space-x-1">
              {/* Servicios Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    Servicios
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  <DropdownMenuLabel>Nuestros Servicios</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {/* Finanzas Section */}
                  <DropdownMenuLabel className="text-xs text-gray-500 font-normal">
                    Finanzas
                  </DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => router.push('/servicios/finanzas')}>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    <div className="flex-1">
                      <div>Consultoría Financiera</div>
                      <div className="text-xs text-gray-500">Análisis personalizado</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => window.open('https://nova.tuimpulsalab.com', '_blank')}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 my-1"
                  >
                    <Sparkles className="h-4 w-4 mr-2 text-purple-600" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        Nova Finance
                        <span className="text-xs bg-purple-600 text-white px-1.5 py-0.5 rounded">NUEVO</span>
                      </div>
                      <div className="text-xs text-gray-500">Dashboard IA en vivo</div>
                    </div>
                    <ExternalLink className="h-3 w-3 text-gray-400" />
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  {/* Marketing Section */}
                  <DropdownMenuLabel className="text-xs text-gray-500 font-normal">
                    Marketing
                  </DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => router.push('/servicios/marketing')}>
                    <Target className="h-4 w-4 mr-2" />
                    <div className="flex-1">
                      <div>Marketing Digital</div>
                      <div className="text-xs text-gray-500">Crecimiento con IA</div>
                    </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  {/* Operaciones Section */}
                  <DropdownMenuLabel className="text-xs text-gray-500 font-normal">
                    Operaciones
                  </DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => router.push('/servicios/operaciones')}>
                    <Brain className="h-4 w-4 mr-2" />
                    <div className="flex-1">
                      <div>Automatización</div>
                      <div className="text-xs text-gray-500">Agentes de IA</div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Diagnóstico 3D Link */}
              <Link 
                href="/diagnostico" 
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                Diagnóstico 3D
              </Link>

              {/* Herramientas Link */}
              <Link 
                href="/herramientas" 
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Herramientas
              </Link>

              {/* Blog Link */}
              <Link 
                href="/blog" 
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Blog
              </Link>

              {/* User specific links */}
              {user && (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Mis Diagnósticos
                  </Link>
                  {userData?.role === 'consultant' && (
                    <Link 
                      href="/consultant" 
                      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      Panel Consultor
                    </Link>
                  )}
                  {userData?.role === 'admin' && (
                    <Link 
                      href="/admin" 
                      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      Admin
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {user.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  {userData?.role === 'consultant' && (
                    <DropdownMenuItem onClick={() => router.push('/consultant')}>
                      <Shield className="h-4 w-4 mr-2" />
                      Panel Consultor
                    </DropdownMenuItem>
                  )}
                  {userData?.role === 'admin' && (
                    <DropdownMenuItem onClick={() => router.push('/admin')}>
                      <Shield className="h-4 w-4 mr-2" />
                      Panel Admin
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => router.push('/login')}
                >
                  Iniciar Sesión
                </Button>
                <Button 
                  size="sm"
                  onClick={() => router.push('/signup')}
                >
                  Registrarse
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
