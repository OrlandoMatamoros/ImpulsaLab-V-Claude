import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { FirebaseAuthProvider } from '@/contexts/FirebaseAuthContext'
import { AuthTokenProvider } from '@/components/AuthTokenProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WidgetProvider from '@/components/widgets/WidgetProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ImpulsaLab - Transformación Digital Empresarial',
  description: 'Diagnóstico 3D, herramientas de IA, y servicios de consultoría en Finanzas, Operaciones y Marketing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <FirebaseAuthProvider>
          <AuthTokenProvider>
            <Header />
            <main className="min-h-screen pt-16">
              {children}
            </main>
            <Footer />
            {/* WidgetProvider - Incluye WhatsApp y Chatbot en TODAS las páginas */}
            <WidgetProvider />
          </AuthTokenProvider>
        </FirebaseAuthProvider>
      </body>
    </html>
  )
}