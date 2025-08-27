import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'a52qys3e',  // Hardcodeado por ahora
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,  // true para producción
  // Sin token por ahora (lectura pública)
})