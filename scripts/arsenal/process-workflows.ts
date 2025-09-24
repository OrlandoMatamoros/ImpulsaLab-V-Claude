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

class WorkflowProcessor {
  private pricing = {
    simple: { unico: 475, mensual: 99 },
    medium: { unico: 750, mensual: 149 },
    complex: { unico: 1250, mensual: 249 }
  };
  
  private translations: Record<string, string> = {
    'invoice': 'factura',
    'customer': 'cliente',
    'automate': 'automatizar',
    'automated': 'automatizado',
    'process': 'procesar',
    'send': 'enviar',
    'sync': 'sincronizar',
    'create': 'crear',
    'monitor': 'monitorear',
    'alert': 'alerta',
    'email': 'correo',
    'report': 'reporte',
    'schedule': 'programar',
    'backup': 'respaldar',
    'notification': 'notificación'
  };
  
  processFile(filepath: string): Workflow {
    const filename = path.basename(filepath);
    const category = path.basename(path.dirname(filepath));
    
    // Limpiar nombre
    const cleanName = filename
      .replace(/^\d+_/, '')
      .replace(/_[a-f0-9]{8}\.json$/, '')
      .replace(/_/g, ' ');
    
    const complexity = this.detectComplexity(cleanName);
    const tools = this.detectTools(cleanName);
    const nombre_es = this.translateToSpanish(cleanName);
    
    return {
      id: filename.replace('.json', ''),
      filename,
      category,
      nombre_en: cleanName,
      nombre_es,
      descripcion_en: `Automate ${cleanName.toLowerCase()} with our intelligent system`,
      descripcion_es: `Automatiza ${nombre_es.toLowerCase()} con nuestro sistema inteligente`,
      tags_tools: tools,
      complexity,
      precio_unico: this.pricing[complexity].unico,
      precio_mensual: this.pricing[complexity].mensual,
      keywords: this.generateKeywords(cleanName, nombre_es)
    };
  }
  
  private detectComplexity(name: string): 'simple' | 'medium' | 'complex' {
    const lower = name.toLowerCase();
    if (lower.includes('ai') || lower.includes('ml') || lower.includes('multi') || lower.includes('advanced')) {
      return 'complex';
    }
    if (lower.includes('process') || lower.includes('automate') || lower.includes('workflow') || lower.includes('sync')) {
      return 'medium';
    }
    return 'simple';
  }
  
  private detectTools(name: string): string[] {
    const lower = name.toLowerCase();
    const tools = [];
    const knownTools = [
      'gmail', 'whatsapp', 'sheets', 'slack', 'telegram', 'discord',
      'notion', 'airtable', 'stripe', 'shopify', 'openai', 'chatgpt',
      'hubspot', 'salesforce', 'quickbooks', 'zoom', 'twilio'
    ];
    
    for (const tool of knownTools) {
      if (lower.includes(tool)) tools.push(tool);
    }
    return tools;
  }
  
  private translateToSpanish(text: string): string {
    let result = text;
    for (const [en, es] of Object.entries(this.translations)) {
      const regex = new RegExp(`\\b${en}\\b`, 'gi');
      result = result.replace(regex, es);
    }
    return result;
  }
  
  private generateKeywords(en: string, es: string): string[] {
    const keywords = [
      ...en.toLowerCase().split(' '),
      ...es.toLowerCase().split(' ')
    ].filter(word => word.length > 2);
    return [...new Set(keywords)];
  }
}

async function main() {
  console.log('🚀 Procesando workflows...\n');
  
  const processor = new WorkflowProcessor();
  const workflows: Workflow[] = [];
  
  // Usar la ruta de ejemplo - ajustar según tu estructura
  const baseDir = process.env.WORKFLOWS_DIR || './sample-workflows';
  
  if (!fs.existsSync(baseDir)) {
    console.error(`❌ No se encuentra el directorio: ${baseDir}`);
    console.log('Creando datos de ejemplo...');
    
    // Crear algunos workflows de ejemplo
    const sampleWorkflows = [
      '00001_Automated_Invoice_Processing_with_Gmail_OCR',
      '00002_WhatsApp_Business_Customer_Support_Bot',
      '00003_Sync_Shopify_Orders_with_Google_Sheets',
      '00004_AI_Content_Generator_with_OpenAI',
      '00005_Automated_Email_Marketing_Campaign'
    ];
    
    for (const name of sampleWorkflows) {
      const workflow = processor.processFile(`Business_Operations/${name}.json`);
      workflows.push(workflow);
    }
  } else {
    const categories = fs.readdirSync(baseDir)
      .filter(item => {
        const itemPath = path.join(baseDir, item);
        return fs.statSync(itemPath).isDirectory();
      });
    
    for (const category of categories) {
      const categoryPath = path.join(baseDir, category);
      const files = fs.readdirSync(categoryPath)
        .filter(file => file.endsWith('.json'))
        .slice(0, 100); // Limitar para pruebas
      
      console.log(`📁 ${category}: ${files.length} archivos`);
      
      for (const file of files) {
        const filepath = path.join(categoryPath, file);
        try {
          const workflow = processor.processFile(filepath);
          workflows.push(workflow);
        } catch (error) {
          console.error(`Error: ${file}`);
        }
      }
    }
  }
  
  // Guardar resultado
  const outputDir = 'lib/automation-arsenal/data/processed';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, 'workflows.json');
  fs.writeFileSync(outputPath, JSON.stringify(workflows, null, 2));
  
  console.log(`\n✅ Procesados ${workflows.length} workflows`);
  console.log(`📁 Guardado en: ${outputPath}`);
  console.log(`\n💰 Rango de precios:`);
  console.log(`   Simple: $${475}/único, $${99}/mes`);
  console.log(`   Medium: $${750}/único, $${149}/mes`);
  console.log(`   Complex: $${1250}/único, $${249}/mes`);
}

main().catch(console.error);
