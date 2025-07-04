import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { COMPANY_INFO } from '@/lib/constants'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${COMPANY_INFO.name} | ${COMPANY_INFO.mainSlogan}`,
  description: "Transformamos pequeños negocios en NYC con soluciones de IA en Finanzas, Operaciones y Marketing. Obtén tu diagnóstico 3D y acelera tu crecimiento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
import WhatsAppWidget from '@/components/WhatsAppWidget'

// En el return del layout, antes del cierre del body:
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  )
}