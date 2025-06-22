import Image from 'next/image'
import Link from 'next/link'
import { IMAGES, LINKS } from '@/lib/constants'

export default function HeroSection() {
  return (
    <section className="bg-[#002D62] text-white pt-24 pb-20 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              El Crecimiento de tu Negocio, Impulsado por IA.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Deja de ahogarte en el día a día. Te entregamos las herramientas 
              de IA y la estrategia que necesitas para liberar tu tiempo, 
              aumentar tu rentabilidad y tomar decisiones con total confianza.
            </p>
            <Link 
              href={LINKS.calendly}
              target="_blank"
              className="inline-block bg-white text-blue-900 px-8 py-4 rounded-lg 
                       font-semibold text-lg transition-transform duration-300 
                       hover:scale-105 hover:bg-gray-100"
            >
              Obtén tu Diagnóstico 3D Gratis
            </Link>
          </div>
          <div className="flex justify-center">
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
              <Image
                src={IMAGES.orlandoPhoto}
                alt="Orlando Matamoros"
                width={400}
                height={400}
                className="rounded-lg w-full max-w-md"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}