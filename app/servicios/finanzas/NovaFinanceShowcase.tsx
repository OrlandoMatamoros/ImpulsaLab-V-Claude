// app/servicios/finanzas/NovaFinanceShowcase.tsx
import { ExternalLink, TrendingUp, Brain, Bell, Play } from 'lucide-react';

export function NovaFinanceShowcase() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Badge de NUEVO */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            <span className="animate-pulse mr-2">✨</span>
            NUEVO: Ya Disponible en Beta
          </span>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Nova Finance: Tu CFO Virtual con IA
          </h2>
          <p className="text-xl text-gray-600">
            Dashboard financiero en tiempo real que analiza, predice y optimiza
            las finanzas de tu negocio automáticamente
          </p>
        </div>

        {/* Live Demo Preview */}
        <div className="bg-white rounded-2xl shadow-xl p-2 mb-12 max-w-6xl mx-auto">
          <div className="bg-gray-900 rounded-t-lg p-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-gray-400 text-sm">nova.tuimpulsalab.com</span>
            </div>
          </div>

          <div className="aspect-video bg-gray-100 rounded-b-lg relative overflow-hidden">
            <iframe
              src="https://nova.tuimpulsalab.com"
              className="w-full h-full"
              title="Nova Finance Live Demo"
              loading="lazy"
            />
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
              🔴 Demo en Vivo
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Análisis Predictivo</h3>
            <p className="text-gray-600 text-sm">
              IA que anticipa tendencias y te alerta antes de problemas
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Decisiones Inteligentes</h3>
            <p className="text-gray-600 text-sm">Simulador What-If y optimización automática</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Alertas Proactivas</h3>
            <p className="text-gray-600 text-sm">WhatsApp y email cuando algo requiere tu atención</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-4">
          <a
            href="https://nova.tuimpulsalab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg"
            aria-label="Explorar Nova Finance (se abre en una nueva pestaña)"
          >
            <Play className="mr-2" />
            Explorar Nova Finance
            <ExternalLink className="ml-2 w-4 h-4" />
          </a>

          <p className="text-sm text-gray-600">
            ✅ Demo funcional • 14 días gratis • Sin tarjeta de crédito
          </p>
        </div>
      </div>
    </section>
  );
}
