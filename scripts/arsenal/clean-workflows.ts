import * as fs from 'fs';
import * as path from 'path';

// Leer el archivo procesado
const workflowsPath = './lib/automation-arsenal/data/processed/workflows-complete.json';
const workflows = JSON.parse(fs.readFileSync(workflowsPath, 'utf8'));

// Función para limpiar nombres
function cleanName(name: string): string {
  return name
    .replace(/\.json$/i, '') // Quitar .json
    .replace(/_/g, ' ') // Reemplazar guiones bajos con espacios
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Separar camelCase
    .replace(/\b\w/g, l => l.toUpperCase()) // Capitalizar primera letra
    .replace(/\s+/g, ' ') // Limpiar espacios múltiples
    .trim();
}

// Limpiar cada workflow
const cleanedWorkflows = workflows.map((w: any) => ({
  ...w,
  nombre_en: cleanName(w.nombre_en),
  nombre_es: cleanName(w.nombre_es),
  filename: w.filename.replace(/\.json\.json$/i, '.json'), // Evitar doble .json
  descripcion_en: `Automate ${cleanName(w.nombre_en).toLowerCase()} workflow`,
  descripcion_es: `Automatiza el flujo de ${cleanName(w.nombre_es).toLowerCase()}`
}));

// Guardar versión limpia
fs.writeFileSync(
  './lib/automation-arsenal/data/processed/workflows-clean.json',
  JSON.stringify(cleanedWorkflows, null, 2)
);

console.log('✅ Workflows limpiados exitosamente');
console.log(`📊 Total: ${cleanedWorkflows.length} workflows procesados`);
