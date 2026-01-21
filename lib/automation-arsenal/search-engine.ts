export interface Workflow {
  id: string;
  nombre_en: string;
  nombre_es: string;
  descripcion_en?: string;
  descripcion_es?: string;
  complexity: 'simple' | 'medium' | 'complex';
  precio_unico: number;
  precio_mensual: number;
  plataformas: string[];
  categorias: string[];
  integraciones?: string[];
  filename?: string;
}

export class WorkflowSearchEngine {
  private workflows: Workflow[];
  
  constructor(workflows: Workflow[]) {
    this.workflows = workflows;
  }

  search(query: string): Workflow[] {
    if (!query || query.trim() === '') {
      return this.workflows.slice(0, 20);
    }

    const searchTerms = query.toLowerCase().split(' ').filter(t => t.length > 0);
    
    const results = this.workflows.map(workflow => {
      let score = 0;
      
      const nombreEn = workflow.nombre_en?.toLowerCase() || '';
      const nombreEs = workflow.nombre_es?.toLowerCase() || '';
      const descripcionEn = workflow.descripcion_en?.toLowerCase() || '';
      const descripcionEs = workflow.descripcion_es?.toLowerCase() || '';
      
      for (const term of searchTerms) {
        if (nombreEn.includes(term)) score += 10;
        if (nombreEs.includes(term)) score += 10;
        if (descripcionEn.includes(term)) score += 5;
        if (descripcionEs.includes(term)) score += 5;
        
        if (workflow.plataformas?.some(p => p.toLowerCase().includes(term))) score += 3;
        if (workflow.categorias?.some(c => c.toLowerCase().includes(term))) score += 3;
        if (workflow.integraciones?.some(i => i.toLowerCase().includes(term))) score += 2;
        
        if (nombreEn.startsWith(term) || nombreEs.startsWith(term)) score += 5;
      }
      
      return { workflow, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.workflow);

    return results.slice(0, 20);
  }

  filterByComplexity(complexity: 'simple' | 'medium' | 'complex'): Workflow[] {
    return this.workflows.filter(w => w.complexity === complexity);
  }

  filterByPriceRange(min: number, max: number): Workflow[] {
    return this.workflows.filter(w => 
      w.precio_mensual >= min && w.precio_mensual <= max
    );
  }

  filterByPlatform(platform: string): Workflow[] {
    return this.workflows.filter(w => 
      w.plataformas?.includes(platform)
    );
  }

  getRandomWorkflows(count: number = 10): Workflow[] {
    const shuffled = [...this.workflows].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  getStats() {
    const stats = {
      total: this.workflows.length,
      byComplexity: {
        simple: 0,
        medium: 0,
        complex: 0
      } as Record<string, number>,
      byPriceRange: {
        under100: 0,
        under200: 0,
        over200: 0
      },
      uniquePlatforms: new Set<string>(),
      avgPriceMonthly: 0,
      avgPriceOnetime: 0
    };
    
    for (const w of this.workflows) {
      const complexity = w.complexity as string;
      if (complexity in stats.byComplexity) {
        stats.byComplexity[complexity]++;
      }
      
      if (w.precio_mensual < 100) stats.byPriceRange.under100++;
      else if (w.precio_mensual < 200) stats.byPriceRange.under200++;
      else stats.byPriceRange.over200++;
      
      w.plataformas?.forEach(p => stats.uniquePlatforms.add(p));
      
      stats.avgPriceMonthly += w.precio_mensual;
      stats.avgPriceOnetime += w.precio_unico;
    }
    
    stats.avgPriceMonthly = Math.round(stats.avgPriceMonthly / this.workflows.length);
    stats.avgPriceOnetime = Math.round(stats.avgPriceOnetime / this.workflows.length);
    
    return {
      ...stats,
      uniquePlatforms: Array.from(stats.uniquePlatforms)
    };
  }
}
