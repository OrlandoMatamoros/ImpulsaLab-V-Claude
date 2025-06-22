import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import DiagnosticSection from '@/components/DiagnosticSection'
import TeamSection from '@/components/TeamSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <DiagnosticSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}