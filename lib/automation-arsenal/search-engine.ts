import Fuse from 'fuse.js';

export interface SearchResult {
  workflow: any;
  score: number;
  highlights: string[];
}

export class WorkflowSearchEngine {
  private fuse: Fuse<any>;
  private workflows: any[];
  
  constructor(workflows: any[]) {
    this.workflows = workflows;
    
    // Configuración de Fuse.js para búsqueda bilingüe
    this.fuse = new Fuse(workflows, {
      keys: [
        { name: 'nombre_es', weight: 0.3 },
        { name: 'nombre_en', weight: 0.3 },
        { name: 'tags_tools', weight: 0.2 },
        { name: 'keywords', weight: 0.2 }
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2,
      shouldSort: true,
      findAllMatches: true,
      ignoreLocation: true
    });
  }
  
  search(query: string, filters?: any): SearchResult[] {
    // Normalizar query
    const normalizedQuery = query.toLowerCase().trim();
    
    // Buscar con Fuse
    let results = this.fuse.search(normalizedQuery);
    
    // Aplicar filtros
    if (filters) {
      if (filters.maxPrice) {
        results = results.filter(r => r.item.precio_mensual <= filters.maxPrice);
      }
      if (filters.complexity) {
        results = results.filter(r => r.item.complexity === filters.complexity);
      }
      if (filters.category) {
        results = results.filter(r => r.item.category === filters.category);
      }
      if (filters.tools && filters.tools.length > 0) {
        results = results.filter(r => 
          filters.tools.some((tool: string) => r.item.tags_tools.includes(tool))
        );
      }
    }
    
    // Formatear resultados
    return results.map(result => ({
      workflow: result.item,
      score: result.score || 0,
      highlights: this.getHighlights(result.item, normalizedQuery)
    }));
  }
  
  private getHighlights(workflow: any, query: string): string[] {
    const highlights = [];
    const terms = query.split(' ');
    
    for (const term of terms) {
      if (workflow.nombre_es.toLowerCase().includes(term)) {
        highlights.push(`ES: ${term}`);
      }
      if (workflow.nombre_en.toLowerCase().includes(term)) {
        highlights.push(`EN: ${term}`);
      }
    }
    
    return highlights;
  }
  
  // Obtener sugerencias
  getSuggestions(query: string): string[] {
    const suggestions = new Set<string>();
    const lower = query.toLowerCase();
    
    // Sugerencias basadas en herramientas detectadas
    if (lower.includes('whatsapp')) {
      suggestions.add('whatsapp business bot');
      suggestions.add('whatsapp automatico');
    }
    if (lower.includes('factura') || lower.includes('invoice')) {
      suggestions.add('procesar facturas');
      suggestions.add('invoice automation');
    }
    if (lower.includes('email') || lower.includes('correo')) {
      suggestions.add('email marketing');
      suggestions.add('correo automatico');
    }
    
    return Array.from(suggestions);
  }
  
  // Obtener estadísticas
  getStats() {
    const stats = {
      total: this.workflows.length,
      byComplexity: { simple: 0, medium: 0, complex: 0 },
      byPriceRange: { under100: 0, under200: 0, over200: 0 },
      popularTools: {} as Record<string, number>
    };
    
    for (const w of this.workflows) {
      stats.byComplexity[w.complexity]++;
      
      if (w.precio_mensual < 100) stats.byPriceRange.under100++;
      else if (w.precio_mensual < 200) stats.byPriceRange.under200++;
      else stats.byPriceRange.over200++;
      
      for (const tool of (w.tags_tools || [])) {
        stats.popularTools[tool] = (stats.popularTools[tool] || 0) + 1;
      }
    }
    
    return stats;
  }
}
