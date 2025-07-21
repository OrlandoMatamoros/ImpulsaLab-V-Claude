import HeroSection from '@/components/HeroSection'
import DiagnosticSection from '@/components/DiagnosticSection'
// import ToolsSection from '@/components/ToolsSection' // REMOVIDO PARA EL PRIMER DESPLIEGUE
import TeamSection from '@/components/TeamSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <DiagnosticSection />
      {/* <ToolsSection /> */} {/* REMOVIDO - La sección de herramientas está disponible en /herramientas */}
      <TeamSection />
      <ContactSection />
    </main>
  )
}