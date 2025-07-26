export default function PromptDesignerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Prompt Designer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Próximamente: Crea prompts profesionales con nuestra guía interactiva paso a paso
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-100 text-emerald-700 rounded-full">
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
  title: 'Prompt Designer - ImpulsaLab',
  description: 'Crea prompts profesionales con nuestra guía interactiva',
};
