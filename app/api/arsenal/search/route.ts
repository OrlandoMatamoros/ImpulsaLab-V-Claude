import { NextRequest, NextResponse } from 'next/server';
import { WorkflowSearchEngine, Workflow } from '@/lib/automation-arsenal/search-engine';
import workflowsDataRaw from '@/lib/automation-arsenal/data/processed/workflows-clean.json';

// Mapear los datos del JSON a la interfaz Workflow
const workflowsData: Workflow[] = workflowsDataRaw.map((w: any) => ({
  id: w.id,
  nombre_en: w.nombre_en,
  nombre_es: w.nombre_es,
  descripcion_en: w.descripcion_en,
  descripcion_es: w.descripcion_es,
  complexity: w.complexity as 'simple' | 'medium' | 'complex',
  precio_unico: w.precio_unico,
  precio_mensual: w.precio_mensual,
  plataformas: w.tags_tools || [],
  categorias: w.category ? [w.category] : [],
  integraciones: w.keywords || [],
  filename: w.filename
}));

const searchEngine = new WorkflowSearchEngine(workflowsData);

export async function POST(request: NextRequest) {
  try {
    const { query, filters } = await request.json();
    
    let results: Workflow[];
    
    if (!query || query.trim() === '') {
      results = searchEngine.getRandomWorkflows(20);
    } else {
      results = searchEngine.search(query);
    }
    
    if (filters) {
      if (filters.complexity) {
        results = results.filter(w => w.complexity === filters.complexity);
      }
      if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
        results = results.filter(w => 
          w.precio_mensual >= filters.minPrice && 
          w.precio_mensual <= filters.maxPrice
        );
      }
      if (filters.platform) {
        results = results.filter(w => 
          w.plataformas?.includes(filters.platform)
        );
      }
    }
    
    return NextResponse.json({
      results: results.slice(0, 50),
      total: results.length,
      stats: searchEngine.getStats()
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Error en la búsqueda' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const stats = searchEngine.getStats();
  const featured = searchEngine.getRandomWorkflows(10);
  
  return NextResponse.json({
    stats,
    featured
  });
}
