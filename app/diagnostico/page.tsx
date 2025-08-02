import DiagnosticWizard from './components/DiagnosticWizard';

export default function DiagnosticoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DiagnosticWizard consultantId="web-diagnostic" />
    </div>
  );
}