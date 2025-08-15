'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/FirebaseAuthContext'
import { Eye, EyeOff, Mail, Lock, User, Phone, Shield, AlertCircle, CheckCircle } from 'lucide-react'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    consultantCode: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isConsultant, setIsConsultant] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  
  const router = useRouter()
  const { signUp } = useAuth()

  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
    if (password.match(/[0-9]/)) strength++
    if (password.match(/[^a-zA-Z0-9]/)) strength++
    setPasswordStrength(strength)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (name === 'password') {
      checkPasswordStrength(value)
    }
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('El nombre es requerido')
      return false
    }
    
    if (!formData.email.trim()) {
      setError('El email es requerido')
      return false
    }
    
    if (!formData.phone.trim()) {
      setError('El teléfono es requerido')
      return false
    }
    
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return false
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return false
    }
    
    if (isConsultant && !formData.consultantCode.trim()) {
      setError('El código de consultor es requerido')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      await signUp(
        formData.email,
        formData.password,
        isConsultant ? formData.consultantCode : undefined,
        {
          name: formData.name,
          phone: formData.phone
        }
      )
      
      // La redirección se maneja en el contexto según el rol
    } catch (err: any) {
      setError(err.message || 'Error al crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-300'
    if (passwordStrength === 1) return 'bg-red-500'
    if (passwordStrength === 2) return 'bg-yellow-500'
    if (passwordStrength === 3) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const getStrengthText = () => {
    if (passwordStrength === 0) return ''
    if (passwordStrength === 1) return 'Débil'
    if (passwordStrength === 2) return 'Regular'
    if (passwordStrength === 3) return 'Buena'
    return 'Excelente'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Crear Cuenta
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Únete a Impulsa Lab y transforma tu negocio
            </p>
          </div>

          {/* Toggle Consultor */}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setIsConsultant(!isConsultant)}
              className={`w-full flex items-center justify-center px-4 py-3 rounded-lg transition-all ${
                isConsultant 
                  ? 'bg-purple-100 text-purple-700 border-2 border-purple-300' 
                  : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
              }`}
            >
              <Shield className="h-5 w-5 mr-2" />
              {isConsultant ? 'Registro como Consultor' : '¿Eres consultor de Impulsa?'}
            </button>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Nombre */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre completo
                </label>
                <div className="mt-1 relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Juan Pérez"
                  />
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Teléfono */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <div className="mt-1 relative">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 234 567 8900"
                  />
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Código de Consultor (condicional) */}
              {isConsultant && (
                <div>
                  <label htmlFor="consultantCode" className="block text-sm font-medium text-gray-700">
                    Código de Consultor
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="consultantCode"
                      name="consultantCode"
                      type="text"
                      value={formData.consultantCode}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="CONS-XXXX"
                    />
                    <Shield className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Ingresa el código proporcionado por Impulsa Lab
                  </p>
                </div>
              )}

              {/* Contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                {/* Indicador de fuerza */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Fuerza de la contraseña</span>
                      <span className={`text-xs font-medium ${
                        passwordStrength >= 3 ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {getStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirmar Contraseña */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirmar contraseña
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="mt-1 text-xs text-green-600 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Las contraseñas coinciden
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : isConsultant 
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isConsultant ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creando cuenta...
                  </span>
                ) : (
                  'Crear cuenta'
                )}
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                ¿Ya tienes una cuenta?{' '}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Inicia sesión
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}