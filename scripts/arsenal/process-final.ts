import * as fs from 'fs';
import * as path from 'path';

interface Workflow {
  id: string;
  filename: string;
  category: string;
  nombre_es: string;
  nombre_en: string;
  descripcion_es: string;
  descripcion_en: string;
  tags_tools: string[];
  complexity: 'simple' | 'medium' | 'complex';
  precio_unico: number;
  precio_mensual: number;
  keywords: string[];
}

class FinalProcessor {
  private pricing = {
    simple: { unico: 475, mensual: 99 },
    medium: { unico: 750, mensual: 149 },
    complex: { unico: 1250, mensual: 249 }
  };
  
  private translations: Record<string, string> = {
    'automated': 'automatizado',
    'invoice': 'factura',
    'customer': 'cliente',
    'process': 'procesar',
    'send': 'enviar',
    'sync': 'sincronizar',
    'email': 'correo',
    'workflow': 'flujo'
  };
  
  processLine(line: string): Workflow | null {
    if (!line.includes('.json')) return null;
    
    const parts = line.split('\\');
    const filename = parts[parts.length - 1];
    const category = parts[parts.length - 2] || 'General';
    
    const cleanName = filename
      .replace(/^\d+_/, '')
      .replace(/_[a-f0-9]{8}\.json$/, '')
      .replace(/\.json$/, '')
      .replace(/_/g, ' ');
    
    const complexity = cleanName.toLowerCase().includes('ai') || cleanName.toLowerCase().includes('multi') ? 'complex' :
                      cleanName.toLowerCase().includes('process') || cleanName.toLowerCase().includes('sync') ? 'medium' : 'simple';
    
    const tools = this.detectTools(cleanName);
    const nombre_es = this.translate(cleanName);
    
    return {
      id: filename.replace('.json', ''),
      filename,
      category: category.replace(/_/g, ' '),
      nombre_en: cleanName,
      nombre_es,
      descripcion_en: `Automate ${cleanName.toLowerCase()}`,
      descripcion_es: `Automatiza ${nombre_es.toLowerCase()}`,
      tags_tools: tools,
      complexity,
      precio_unico: this.pricing[complexity].unico,
      precio_mensual: this.pricing[complexity].mensual,
      keywords: cleanName.toLowerCase().split(' ').concat(nombre_es.toLowerCase().split(' '))
    };
  }
  
  private detectTools(name: string): string[] {
    const lower = name.toLowerCase();
    const found = [];
    ['gmail', 'whatsapp', 'sheets', 'slack', 'telegram', 'stripe', 'shopify', 'openai'].forEach(tool => {
      if (lower.includes(tool)) found.push(tool);
    });
    return found;
  }
  
  private translate(text: string): string {
    let result = text;
    Object.entries(this.translations).forEach(([en, es]) => {
      result = result.replace(new RegExp(`\\b${en}\\b`, 'gi'), es);
    });
    return result;
  }
}

async function main() {
  console.log('🚀 Procesando workflows...\n');
  
  const processor = new FinalProcessor();
  const workflows: Workflow[] = [];
  const stats = { total: 0, simple: 0, medium: 0, complex: 0 };
  
  const content = fs.readFileSync('./lista_flujos.txt', 'utf8');
  const lines = content.split('\n').filter(line => line.trim());
  
  console.log(`📄 Total líneas: ${lines.length}\n`);
  
  for (const line of lines) {
    const workflow = processor.processLine(line);
    if (workflow) {
      workflows.push(workflow);
      stats.total++;
      stats[workflow.complexity]++;
      
      if (stats.total % 500 === 0) {
        console.log(`✅ Procesados: ${stats.total}`);
      }
    }
  }
  
  const outputDir = 'lib/automation-arsenal/data/processed';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(outputDir, 'workflows-complete.json'),
    JSON.stringify(workflows, null, 2)
  );
  
  console.log('\n✨ COMPLETO');
  console.log(`📊 Total: ${stats.total} workflows`);
  console.log(`💰 Simple ($99/mes): ${stats.simple}`);
  console.log(`💰 Medium ($149/mes): ${stats.medium}`);
  console.log(`💰 Complex ($249/mes): ${stats.complex}`);
  console.log(`\n💵 Valor total: $${(stats.simple*475 + stats.medium*750 + stats.complex*1250).toLocaleString()}`);
}

main().catch(console.error);
