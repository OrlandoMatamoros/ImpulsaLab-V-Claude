'use client';

import DiagnosticWizard from '@/app/diagnostico/components/DiagnosticWizard';

export default function DiagnosticoInternoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DiagnosticWizard 
        consultantId="internal" 
        isInternalMode={true} 
      />
    </div>
  );
}