#!/bin/bash

echo "🚀 Configurando Arsenal de Automatización..."

# 1. Instalar dependencias
echo "📦 Instalando dependencias..."
npm install --save fuse.js

# 2. Crear estructura
echo "📁 Creando estructura de directorios..."
bash setup-arsenal.sh

# 3. Procesar workflows
echo "⚙️ Procesando 3000+ workflows..."
npx tsx scripts/arsenal/process-all-workflows.ts

# 4. Verificar resultados
echo "✅ Verificando resultados..."
ls -la lib/automation-arsenal/data/processed/

echo "🎉 Arsenal configurado exitosamente!"
