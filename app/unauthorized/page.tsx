'use client';

import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-4">🚫</div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Acceso No Autorizado
        </h1>
        
        <p className="text-gray-600 mb-8">
          No tienes permisos para acceder a esta sección.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Ir al Dashboard
          </button>
          
          <button
            onClick={() => router.back()}
            className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
