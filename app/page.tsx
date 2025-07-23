import HeroSection from '@/components/HeroSection'
import DiagnosticSection from '@/components/DiagnosticSection'
import RiskShieldSection from '@/components/RiskShieldSection'
import TeamSection from '@/components/TeamSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <DiagnosticSection />
      <RiskShieldSection />  {/* 👈 Nueva sección añadida */}
      <TeamSection />
      <ContactSection />
    </main>
  )
}