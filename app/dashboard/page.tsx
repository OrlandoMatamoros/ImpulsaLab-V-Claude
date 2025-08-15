'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    lastLogin: new Date().toLocaleDateString(),
    accountStatus: 'Activo',
    memberSince: new Date().toLocaleDateString(),
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const getRoleBasedContent = () => {
    switch (user?.role) {
      case 'admin':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Usuarios Totales</CardTitle>
                <CardDescription>Gestión de usuarios</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1,234</p>
                <p className="text-sm text-gray-600">+12% este mes</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Ingresos</CardTitle>
                <CardDescription>Ingresos mensuales</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">$45,678</p>
                <p className="text-sm text-green-600">+23% este mes</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Diagnósticos</CardTitle>
                <CardDescription>Total realizados</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">567</p>
                <p className="text-sm text-gray-600">89 esta semana</p>
              </CardContent>
            </Card>
          </div>
        );
        
      case 'consultant':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Mis Clientes</CardTitle>
                <CardDescription>Clientes activos</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">28</p>
                <p className="text-sm text-gray-600">3 nuevos este mes</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Diagnósticos Realizados</CardTitle>
                <CardDescription>Este mes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">45</p>
                <p className="text-sm text-green-600">+15% vs mes anterior</p>
              </CardContent>
            </Card>
          </div>
        );
        
      case 'client':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Mi Suscripción</CardTitle>
                <CardDescription>Plan actual</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Plan Premium</p>
                <p className="text-sm text-gray-600">Renovación: 15/09/2024</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Diagnósticos Disponibles</CardTitle>
                <CardDescription>Este mes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">3/5</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      default:
        return (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Bienvenido a Impulsa Lab</CardTitle>
              <CardDescription>Cuenta básica</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Actualiza tu cuenta para acceder a todas las funcionalidades.
              </p>
              <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Ver Planes
              </button>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          ¡Bienvenido, {user?.email?.split('@')[0]}! 👋
        </h1>
        <p className="text-purple-100">
          Este es tu panel de control personalizado
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Último acceso</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{stats.lastLogin}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Estado de cuenta</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-green-600">{stats.accountStatus}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Miembro desde</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">{stats.memberSince}</p>
          </CardContent>
        </Card>
      </div>

      {/* Role-based content */}
      {getRoleBasedContent()}

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
            <span className="text-2xl mb-2">📊</span>
            <p className="text-sm font-medium">Nuevo Diagnóstico</p>
          </button>
          
          <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
            <span className="text-2xl mb-2">📈</span>
            <p className="text-sm font-medium">Ver Reportes</p>
          </button>
          
          <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
            <span className="text-2xl mb-2">⚙️</span>
            <p className="text-sm font-medium">Configuración</p>
          </button>
          
          <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center">
            <span className="text-2xl mb-2">💬</span>
            <p className="text-sm font-medium">Soporte</p>
          </button>
        </div>
      </div>
    </div>
  );
}
