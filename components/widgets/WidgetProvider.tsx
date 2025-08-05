// components/widgets/WidgetProvider.tsx
'use client';

import dynamic from 'next/dynamic';

// Importar WhatsApp Widget (NOVA) desde la carpeta widgets
const WhatsAppWidget = dynamic(() => import('./WhatsAppWidget'), {
  ssr: false,
  loading: () => null
});

export default function WidgetProvider() {
  // Solo mostrar WhatsApp Widget (NOVA) en TODAS las páginas
  
  return (
    <>
      {/* WhatsApp Widget (NOVA) - Siempre visible en todas las páginas */}
      <WhatsAppWidget />
    </>
  );
}