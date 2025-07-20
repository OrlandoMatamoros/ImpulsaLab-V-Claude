import HeroSection from '@/components/HeroSection'
import DiagnosticSection from '@/components/DiagnosticSection'
import ToolsSection from '@/components/ToolsSection'
import TeamSection from '@/components/TeamSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <DiagnosticSection />
      <ToolsSection />
      <TeamSection />
      <ContactSection />
    </main>
  )
}