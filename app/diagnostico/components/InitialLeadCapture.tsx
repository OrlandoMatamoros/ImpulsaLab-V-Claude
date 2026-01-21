'use client';

import { useState } from 'react';
import { Button, Card, CardContent } from '@/components/ui/index';
import { Loader2, CheckCircle, Mail } from 'lucide-react';

interface InitialLeadCaptureProps {
  onComplete: (leadData: {
    nombre: string;
    email: string;
    telefono?: string;
    negocio: string;
    industria: string;
    empleados: number;
  }) => void;
}

export function InitialLeadCapture({ onComplete }: InitialLeadCaptureProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    negocio: '',
    industria: '',
    empleados: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Email inválido';
      }
    }

    if (!formData.negocio.trim()) {
      newErrors.negocio = 'El nombre del negocio es requerido';
    }

    if (!formData.industria) {
      newErrors.industria = 'Selecciona tu industria';
    }

    if (!formData.empleados || formData.empleados === '0') {
      newErrors.empleados = 'Ingresa el número de empleados';
    } else {
      const empleadosNum = parseInt(formData.empleados);
      if (isNaN(empleadosNum) || empleadosNum < 1) {
        newErrors.empleados = 'Debe ser un número mayor a 0';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Enviar email de bienvenida
      const response = await fetch('/api/diagnostic/send-welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          negocio: formData.negocio,
        }),
      });

      if (response.ok) {
        console.log('✅ Email de bienvenida enviado');
      } else {
        console.warn('⚠️ Error enviando email de bienvenida, pero continuamos');
      }

      // Continuar con el diagnóstico independientemente del email
      // (el email de bienvenida es opcional, no bloqueante)
      onComplete({
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono || undefined,
        negocio: formData.negocio,
        industria: formData.industria,
        empleados: parseInt(formData.empleados),
      });

    } catch (error) {
      console.error('Error en registro inicial:', error);
      // Aún así continuar - no queremos bloquear el flujo
      onComplete({
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono || undefined,
        negocio: formData.negocio,
        industria: formData.industria,
        empleados: parseInt(formData.empleados),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Limpiar error del campo
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
        <CardContent className="pt-8 pb-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              🎯 Diagnóstico 3D Empresarial
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Registra tus datos para comenzar tu evaluación personalizada
            </p>
            <div className="mt-4 inline-block bg-white rounded-lg px-4 py-2 border border-blue-300">
              <p className="text-sm text-gray-600">
                ✓ Recibirás acceso inmediato • ✓ Resultados por email
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Tu Nombre Completo *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full px-4 py-3 text-base border-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
                  transition-all duration-200 ${
                  errors.nombre ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Ej: Juan Pérez"
                disabled={isSubmitting}
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 text-base border-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
                  transition-all duration-200 ${
                  errors.email ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="tu@email.com"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
              <p className="text-xs text-gray-500">
                Te enviaremos los resultados a este correo
              </p>
            </div>

            {/* Nombre del Negocio */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Nombre de tu Negocio *
              </label>
              <input
                type="text"
                name="negocio"
                value={formData.negocio}
                onChange={handleChange}
                className={`w-full px-4 py-3 text-base border-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
                  transition-all duration-200 ${
                  errors.negocio ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Ej: Restaurante Antology"
                disabled={isSubmitting}
              />
              {errors.negocio && (
                <p className="text-red-500 text-sm mt-1">{errors.negocio}</p>
              )}
            </div>

            {/* Industria */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Industria *
              </label>
              <select
                name="industria"
                value={formData.industria}
                onChange={handleChange}
                className={`w-full px-4 py-3 text-base border-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
                  transition-all duration-200 appearance-none ${
                  errors.industria ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                }`}
                disabled={isSubmitting}
              >
                <option value="">Selecciona tu industria</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Retail">Retail / Comercio</option>
                <option value="Servicios">Servicios Profesionales</option>
                <option value="Manufactura">Manufactura</option>
                <option value="Salud">Salud y Bienestar</option>
                <option value="Educación">Educación</option>
                <option value="Alimentos">Alimentos y Restaurantes</option>
                <option value="Construcción">Construcción</option>
                <option value="Turismo">Turismo y Hospitalidad</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.industria && (
                <p className="text-red-500 text-sm mt-1">{errors.industria}</p>
              )}
            </div>

            {/* Número de Empleados */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Número de Empleados *
              </label>
              <input
                type="number"
                name="empleados"
                value={formData.empleados}
                onChange={handleChange}
                className={`w-full px-4 py-3 text-base border-2 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
                  transition-all duration-200 ${
                  errors.empleados ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Ej: 10"
                min="1"
                disabled={isSubmitting}
              />
              {errors.empleados && (
                <p className="text-red-500 text-sm mt-1">{errors.empleados}</p>
              )}
              <p className="text-xs text-gray-500">
                Esto nos ayuda a personalizar el diagnóstico para tu empresa
              </p>
            </div>

            {/* Teléfono (Opcional) */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Teléfono <span className="text-gray-400 font-normal">(Opcional)</span>
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
                  hover:border-gray-400 transition-all duration-200"
                placeholder="+1 234 567 8900"
                disabled={isSubmitting}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-[#002D62] hover:bg-[#001d42] text-white font-semibold
                  text-lg py-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02]
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Registrando acceso...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    Comenzar Diagnóstico Oficial
                  </span>
                )}
              </Button>
            </div>

            {/* Privacy Note */}
            <div className="text-center pt-2">
              <p className="text-xs text-gray-500">
                🔒 Tus datos están protegidos. No compartimos tu información.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Benefits */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <div className="text-2xl mb-2">⚡</div>
          <p className="text-sm font-semibold text-gray-700">Evaluación Rápida</p>
          <p className="text-xs text-gray-500">Solo 5-7 minutos</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <div className="text-2xl mb-2">📊</div>
          <p className="text-sm font-semibold text-gray-700">Resultados Detallados</p>
          <p className="text-xs text-gray-500">Por email al instante</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
          <div className="text-2xl mb-2">🎁</div>
          <p className="text-sm font-semibold text-gray-700">Consulta Gratuita</p>
          <p className="text-xs text-gray-500">30 min con experto</p>
        </div>
      </div>
    </div>
  );
}
