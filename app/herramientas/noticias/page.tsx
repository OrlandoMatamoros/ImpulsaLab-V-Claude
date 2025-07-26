export default function NoticiasPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Agente de Noticias IA
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Próximamente: Las últimas novedades en inteligencia artificial actualizadas diariamente
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-100 text-orange-700 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">En desarrollo</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export const metadata = {
  title: 'Agente de Noticias - ImpulsaLab',
  description: 'Las últimas novedades en IA actualizadas diariamente',
};
