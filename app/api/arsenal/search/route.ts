import { NextRequest, NextResponse } from 'next/server';
import { WorkflowSearchEngine } from '@/lib/automation-arsenal/search-engine';
import workflowsData from '@/lib/automation-arsenal/data/processed/workflows-clean.json';

const searchEngine = new WorkflowSearchEngine(workflowsData);

export async function POST(request: NextRequest) {
  try {
    const { query, filters = {}, limit = 30 } = await request.json();
    
    if (!query || query.trim().length < 2) {
      return NextResponse.json({
        error: 'Query debe tener al menos 2 caracteres'
      }, { status: 400 });
    }
    
    // Buscar
    const results = searchEngine.search(query, filters);
    
    // Preparar respuesta
    return NextResponse.json({
      results: results.slice(0, limit),
      total: results.length,
      suggestions: searchEngine.getSuggestions(query)
    });
    
  } catch (error) {
    console.error('Error en búsqueda:', error);
    return NextResponse.json({ error: 'Error en búsqueda' }, { status: 500 });
  }
}

export async function GET() {
  // Endpoint para obtener estadísticas
  return NextResponse.json(searchEngine.getStats());
}
