import { COMPANY_INFO } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2025 {COMPANY_INFO.name}. Todos los derechos reservados.</p>
        <p className="mt-2 text-gray-400">{COMPANY_INFO.tagline}</p>
      </div>
    </footer>
  )
}