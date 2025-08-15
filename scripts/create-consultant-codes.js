// Script para crear códigos de consultor en Firebase
// Por ahora, usar Firebase Console directamente

const codes = [
  'CONS-2024-001',
  'CONS-2024-002', 
  'CONS-2024-003',
  'IMP-STAFF-001',
  'IMP-STAFF-002'
];

console.log('Crear estos códigos en Firebase Console > Firestore:');
console.log('Colección: consultantCodes');
console.log('');
codes.forEach(code => {
  console.log(`Documento ID: ${code}`);
  console.log('Campos:');
  console.log(`  code: "${code}"`);
  console.log('  isActive: true');
  console.log('  createdAt: [timestamp]');
  console.log('  usedBy: null');
  console.log('  usedAt: null');
  console.log('---');
});
