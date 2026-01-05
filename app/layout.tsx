import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { FirebaseAuthProvider } from '@/contexts/FirebaseAuthContext'
import { AuthTokenProvider } from '@/components/AuthTokenProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WidgetProvider from '@/components/widgets/WidgetProvider'
import CookieBanner from '@/components/CookieBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ImpulsaLab - Transformación Digital Empresarial',
  description: 'Diagnóstico 3D, herramientas de IA, y servicios de consultoría en Finanzas, Operaciones y Marketing',
  verification: {
    google: 'SiCheXqFkVDrLLuNSd9wx8zKZ3Pq8LYwTjz1uGeNitg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* Google Ads (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17854811161"
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17854811161');
          `}
        </Script>

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
        <CookieBanner />
      </body>
    </html>
  )
}