'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/index';

interface ClientInfoStepProps {
  clientInfo: any;
  onUpdate: (info: any) => void;
  onNext: () => void;
}

export function ClientInfoStep({ clientInfo, onUpdate, onNext }: ClientInfoStepProps) {
  const [formData, setFormData] = useState({
    companyName: clientInfo?.companyName || '',
    contactName: clientInfo?.contactName || '',
    industry: clientInfo?.industry || '',
    employeeCount: clientInfo?.employeeCount || '',
    annualRevenue: clientInfo?.annualRevenue || '',
    email: clientInfo?.email || '',
    phone: clientInfo?.phone || '',
  });

  const [errors, setErrors] = useState<any>({});

  const industries = [
    'Tecnología',
    'Retail',
    'Servicios',
    'Manufactura',
    'Salud',
    'Educación',
    'Alimentos',
    'Otro'
  ];

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.companyName) newErrors.companyName = 'El nombre de la empresa es requerido';
    if (!formData.contactName) newErrors.contactName = 'El nombre de contacto es requerido';
    if (!formData.industry) newErrors.industry = 'Selecciona una industria';
    if (!formData.email) newErrors.email = 'El email es requerido';
    if (!formData.employeeCount || formData.employeeCount === '0') {
      newErrors.employeeCount = 'Ingresa el número de empleados';
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onUpdate({
        ...formData,
        employeeCount: parseInt(formData.employeeCount),
        annualRevenue: formData.annualRevenue ? parseFloat(formData.annualRevenue) : undefined
      });
      onNext();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* Nombre de la Empresa */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Nombre de la Empresa *
        </label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className={`w-full px-3 py-3 sm:px-4 sm:py-2 text-base sm:text-sm border-2 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
            transition-all duration-200 ${
            errors.companyName ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
          }`}
          placeholder="Ej: Antology Restaurante"
          autoComplete="organization"
        />
        {errors.companyName && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.companyName}</p>
        )}
      </div>

      {/* Nombre del Contacto */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Nombre del Contacto *
        </label>
        <input
          type="text"
          name="contactName"
          value={formData.contactName}
          onChange={handleChange}
          className={`w-full px-3 py-3 sm:px-4 sm:py-2 text-base sm:text-sm border-2 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
            transition-all duration-200 ${
            errors.contactName ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
          }`}
          placeholder="Ej: Juan Pérez"
          autoComplete="name"
        />
        {errors.contactName && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.contactName}</p>
        )}
      </div>

      {/* Industria */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Industria *
        </label>
        <select
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className={`w-full px-3 py-3 sm:px-4 sm:py-2 text-base sm:text-sm border-2 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
            transition-all duration-200 appearance-none ${
            errors.industry ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <option value="">Selecciona una industria</option>
          {industries.map(ind => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
        {errors.industry && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.industry}</p>
        )}
      </div>

      {/* Grid responsive para empleados e ingresos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Número de Empleados */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Número de Empleados *
          </label>
          <input
            type="number"
            name="employeeCount"
            value={formData.employeeCount}
            onChange={handleChange}
            className={`w-full px-3 py-3 sm:px-4 sm:py-2 text-base sm:text-sm border-2 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
              transition-all duration-200 ${
              errors.employeeCount ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder="Ej: 10"
            min="1"
            inputMode="numeric"
          />
          {errors.employeeCount && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.employeeCount}</p>
          )}
        </div>

        {/* Ingresos Anuales */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Ingresos Anuales (USD)
          </label>
          <input
            type="number"
            name="annualRevenue"
            value={formData.annualRevenue}
            onChange={handleChange}
            className={`w-full px-3 py-3 sm:px-4 sm:py-2 text-base sm:text-sm border-2 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
              transition-all duration-200 ${
              errors.annualRevenue ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
            }`}
            placeholder="Ej: 500000"
            min="0"
            inputMode="numeric"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Email de Contacto *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-3 py-3 sm:px-4 sm:py-2 text-base sm:text-sm border-2 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
            transition-all duration-200 ${
            errors.email ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
          }`}
          placeholder="contacto@empresa.com"
          autoComplete="email"
          inputMode="email"
        />
        {errors.email && (
          <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Teléfono */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Teléfono
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-3 py-3 sm:px-4 sm:py-2 text-base sm:text-sm border-2 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900
            transition-all duration-200 ${
            errors.phone ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
          }`}
          placeholder="+1 234 567 8900"
          autoComplete="tel"
          inputMode="tel"
        />
      </div>

      {/* Botón de submit - full width en móvil */}
      <div className="pt-4">
        <Button 
          type="submit" 
          size="lg"
          className="w-full sm:w-auto min-h-[48px] text-base font-medium"
        >
          Continuar al Diagnóstico
        </Button>
      </div>
    </form>
  );
}