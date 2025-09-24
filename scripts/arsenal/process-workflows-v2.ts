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
  tags_es: string[];
  tags_en: string[];
  complexity: 'simple' | 'medium' | 'complex';
  precio_unico: number;
  precio_mensual: number;
  keywords: string[];
  search_phrases: string[];
}

class ImprovedWorkflowProcessor {
  private pricing = {
    simple: { unico: 475, mensual: 99 },
    medium: { unico: 750, mensual: 149 },
    complex: { unico: 1250, mensual: 249 }
  };
  
  private dictionary = {
    // Palabras completas
    'automated': 'automatizado',
    'automate': 'automatizar',
    'invoice': 'factura',
    'invoices': 'facturas',
    'customer': 'cliente',
    'customers': 'clientes',
    'process': 'procesar',
    'processing': 'procesamiento',
    'send': 'enviar',
    'sending': 'enviando',
    'sync': 'sincronizar',
    'create': 'crear',
    'monitor': 'monitorear',
    'alert': 'alerta',
    'alerts': 'alertas',
    'email': 'correo',
    'emails': 'correos',
    'report': 'reporte',
    'reports': 'reportes',
    'schedule': 'programar',
    'scheduled': 'programado',
    'backup': 'respaldar',
    'notification': 'notificación',
    'notifications': 'notificaciones',
    'business': 'negocio',
    'support': 'soporte',
    'bot': 'bot',
    'orders': 'pedidos',
    'order': 'pedido',
    'with': 'con',
    'from': 'desde',
    'to': 'hacia',
    'and': 'y',
    'for': 'para',
    'marketing': 'mercadeo',
    'campaign': 'campaña',
    'content': 'contenido',
    'generator': 'generador',
    'message': 'mensaje',
    'messages': 'mensajes',
    'workflow': 'flujo de trabajo',
    'workflows': 'flujos de trabajo',
    'automatic': 'automático',
    'automatically': 'automáticamente',
    'integration': 'integración',
    'integrate': 'integrar',
    'analysis': 'análisis',
    'analyze': 'analizar',
    'database': 'base de datos',
    'update': 'actualizar',
    'upload': 'subir',
    'download': 'descargar',
    'file': 'archivo',
    'files': 'archivos'
  };
  
  processFile(filepath: string): Workflow {
    const filename = path.basename(filepath);
    const category = path.basename(path.dirname(filepath));
    
    // Limpiar nombre - quitar número inicial, hash final y extensión
    let cleanName = filename
      .replace(/^\d+_/, '')           // Quitar número inicial
      .replace(/_[a-f0-9]{8,}\.json$/, '') // Quitar hash y .json
      .replace(/\.json$/, '')         // Quitar solo .json si queda
      .replace(/_/g, ' ');             // Reemplazar _ con espacios
    
    const complexity = this.detectComplexity(cleanName);
    const tools = this.detectTools(cleanName);
    const nombre_es = this.smartTranslate(cleanName);
    
    // Generar tags bilingües
    const tags_en = this.generateEnglishTags(cleanName);
    const tags_es = this.generateSpanishTags(nombre_es);
    
    // Generar frases de búsqueda
    const search_phrases = this.generateSearchPhrases(cleanName, nombre_es);
    
    return {
      id: filename.replace('.json', ''),
      filename,
      category: this.formatCategory(category),
      nombre_en: cleanName,
      nombre_es,
      descripcion_en: `Automate ${cleanName.toLowerCase()} with intelligent workflows`,
      descripcion_es: `Automatiza ${nombre_es.toLowerCase()} con flujos de trabajo inteligentes`,
      tags_tools: tools,
      tags_en,
      tags_es,
      complexity,
      precio_unico: this.pricing[complexity].unico,
      precio_mensual: this.pricing[complexity].mensual,
      keywords: [...tags_en, ...tags_es, ...tools],
      search_phrases
    };
  }
  
  private smartTranslate(text: string): string {
    // Separar en palabras
    const words = text.split(' ');
    const translated = words.map(word => {
      const lower = word.toLowerCase();
      // Si existe traducción, usarla
      if (this.dictionary[lower]) {
        // Mantener capitalización
        if (word[0] === word[0].toUpperCase()) {
          return this.capitalize(this.dictionary[lower]);
        }
        return this.dictionary[lower];
      }
      // Si no hay traducción, mantener palabra original
      return word;
    });
    
    return translated.join(' ');
  }
  
  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  private formatCategory(category: string): string {
    return category
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => this.capitalize(word.toLowerCase()))
      .join(' ');
  }
  
  private detectComplexity(name: string): 'simple' | 'medium' | 'complex' {
    const lower = name.toLowerCase();
    
    // Palabras que indican alta complejidad
    const complexWords = ['ai', 'ml', 'machine learning', 'artificial', 'multi', 
                          'advanced', 'complete', 'full', 'enterprise', 'complex'];
    
    // Palabras que indican complejidad media
    const mediumWords = ['process', 'automate', 'workflow', 'sync', 'integrate',
                         'analyze', 'manage', 'optimize', 'track'];
    
    // Contar coincidencias
    const complexCount = complexWords.filter(w => lower.includes(w)).length;
    const mediumCount = mediumWords.filter(w => lower.includes(w)).length;
    
    if (complexCount > 0) return 'complex';
    if (mediumCount > 1) return 'medium';
    return 'simple';
  }
  
  private detectTools(name: string): string[] {
    const lower = name.toLowerCase();
    const detectedTools = [];
    
    const tools = [
      'gmail', 'whatsapp', 'sheets', 'slack', 'telegram', 'discord',
      'notion', 'airtable', 'stripe', 'shopify', 'openai', 'chatgpt',
      'hubspot', 'salesforce', 'quickbooks', 'zoom', 'twilio', 'sendgrid',
      'mailchimp', 'wordpress', 'woocommerce', 'facebook', 'instagram',
      'twitter', 'linkedin', 'youtube', 'google', 'microsoft', 'aws',
      'dropbox', 'trello', 'asana', 'jira', 'github', 'gitlab'
    ];
    
    for (const tool of tools) {
      if (lower.includes(tool)) {
        detectedTools.push(tool);
      }
    }
    
    return detectedTools;
  }
  
  private generateEnglishTags(text: string): string[] {
    return text.toLowerCase()
      .split(' ')
      .filter(word => word.length > 2)
      .filter(word => !['the', 'and', 'with', 'for', 'from'].includes(word));
  }
  
  private generateSpanishTags(text: string): string[] {
    return text.toLowerCase()
      .split(' ')
      .filter(word => word.length > 2)
      .filter(word => !['con', 'para', 'desde', 'hacia'].includes(word));
  }
  
  private generateSearchPhrases(en: string, es: string): string[] {
    const enLower = en.toLowerCase();
    const esLower = es.toLowerCase();
    
    return [
      // Español
      `quiero ${esLower}`,
      `necesito ${esLower}`,
      `como puedo ${esLower}`,
      `automatizar ${esLower}`,
      `sistema para ${esLower}`,
      
      // Inglés
      `i want ${enLower}`,
      `i need ${enLower}`,
      `how to ${enLower}`,
      `automate ${enLower}`,
      `system for ${enLower}`
    ];
  }
}

async function main() {
  console.log('🚀 Procesando workflows versión 2...\n');
  
  const processor = new ImprovedWorkflowProcessor();
  const workflows: Workflow[] = [];
  const stats = {
    total: 0,
    byCategory: {} as Record<string, number>,
    byComplexity: { simple: 0, medium: 0, complex: 0 }
  };
  
  // Intentar usar lista real si existe
  const listPath = 'lista_flujos.txt';
  
  if (fs.existsSync(listPath)) {
    console.log('📄 Procesando desde lista_flujos.txt...\n');
    
    const content = fs.readFileSync(listPath, 'utf8');
    const lines = content.split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      if (line.includes('.json')) {
        const workflow = processor.processFile(line);
        workflows.push(workflow);
        stats.total++;
        stats.byCategory[workflow.category] = (stats.byCategory[workflow.category] || 0) + 1;
        stats.byComplexity[workflow.complexity]++;
        
        if (stats.total % 100 === 0) {
          console.log(`  ✅ Procesados: ${stats.total}`);
        }
      }
    }
  } else {
    console.log('📦 Generando datos de ejemplo mejorados...\n');
    
    // Ejemplos más realistas
    const examples = [
      'Business_Operations/00001_Automated_Invoice_Processing_Gmail_OCR_a1b2c3d4.json',
      'Business_Operations/00002_Customer_Support_WhatsApp_Bot_Auto_Reply_e5f6g7h8.json',
      'E-commerce_Sales/00003_Sync_Shopify_Orders_Google_Sheets_Integration_i9j0k1l2.json',
      'Marketing_Social_Media/00004_AI_Content_Generator_OpenAI_ChatGPT_m3n4o5p6.json',
      'Communication_Notifications/00005_Automated_Email_Marketing_Campaign_Mailchimp_q7r8s9t0.json',
      'Customer_Management/00006_CRM_Lead_Scoring_HubSpot_Automation_u1v2w3x4.json',
      'Financial_Management/00007_QuickBooks_Invoice_Stripe_Payment_Sync_y5z6a7b8.json',
      'Project_Management/00008_Trello_Slack_Task_Notification_System_c9d0e1f2.json',
      'Data_Analytics/00009_Google_Analytics_Report_Automation_g3h4i5j6.json',
      'Healthcare_Wellness/00010_Patient_Appointment_Reminder_SMS_Twilio_k7l8m9n0.json'
    ];
    
    for (const example of examples) {
      const workflow = processor.processFile(example);
      workflows.push(workflow);
      stats.total++;
      stats.byCategory[workflow.category] = (stats.byCategory[workflow.category] || 0) + 1;
      stats.byComplexity[workflow.complexity]++;
    }
  }
  
  // Guardar resultados
  const outputDir = 'lib/automation-arsenal/data/processed';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, 'workflows-v2.json');
  fs.writeFileSync(outputPath, JSON.stringify(workflows, null, 2));
  
  // Guardar estadísticas
  const statsPath = path.join(outputDir, 'stats.json');
  fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));
  
  console.log('\n' + '='.repeat(50));
  console.log('✨ PROCESAMIENTO COMPLETO v2');
  console.log('='.repeat(50));
  console.log(`📊 Total workflows: ${stats.total}`);
  console.log(`📁 Categorías: ${Object.keys(stats.byCategory).length}`);
  console.log('\n🎯 Por complejidad:');
  console.log(`  • Simple ($475/$99): ${stats.byComplexity.simple}`);
  console.log(`  • Medium ($750/$149): ${stats.byComplexity.medium}`);
  console.log(`  • Complex ($1250/$249): ${stats.byComplexity.complex}`);
  console.log('\n📂 Archivos guardados:');
  console.log(`  • ${outputPath}`);
  console.log(`  • ${statsPath}`);
}

main().catch(console.error);
