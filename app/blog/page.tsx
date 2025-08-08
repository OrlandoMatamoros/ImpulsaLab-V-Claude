'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { 
 FaArrowRight, 
 FaClock, 
 FaUser, 
 FaTag,
 FaSearch,
 FaRobot,
 FaChartLine,
 FaBrain,
 FaLightbulb,
 FaCogs,
 FaRocket
} from 'react-icons/fa';

// Tipos
interface BlogPost {
 id: string;
 slug: string;
 title: string;
 excerpt: string;
 category: string;
 author: string;
 date: string;
 readTime: string;
 image: string;
 featured?: boolean;
}

// Datos de ejemplo - Estos vendrían de tu CMS o base de datos
const blogPosts: BlogPost[] = [
 {
   id: '1',
   slug: 'ia-transformacion-pymes-2025',
   title: 'Cómo la IA está Transformando las PYMES en 2025: Guía Práctica',
   excerpt: 'Descubre las herramientas de inteligencia artificial más efectivas para pequeños negocios y cómo implementarlas sin necesidad de ser un experto en tecnología.',
   category: 'Inteligencia Artificial',
   author: 'Orlando Matamoros',
   date: '2025-08-05',
   readTime: '7 min',
   image: 'https://via.placeholder.com/800x600/4F46E5/ffffff?text=IA+para+PYMES',
   featured: true
 },
 {
   id: '2',
   slug: 'automatizacion-procesos-restaurantes',
   title: 'Automatización para Restaurantes: 5 Procesos que Debes Digitalizar Ya',
   excerpt: 'Aprende cómo los restaurantes en Brooklyn están ahorrando 20 horas semanales automatizando reservas, pedidos y gestión de inventario con herramientas accesibles.',
   category: 'Automatización',
   author: 'Nova AI',
   date: '2025-08-03',
   readTime: '5 min',
   image: 'https://via.placeholder.com/800x600/10B981/ffffff?text=Automatización'
 },
 {
   id: '3',
   slug: 'dashboard-financiero-excel-gratis',
   title: 'Crea tu Dashboard Financiero en Excel: Template Gratuito Incluido',
   excerpt: 'Te enseñamos paso a paso cómo construir un dashboard financiero profesional en Excel para tener el control total de las finanzas de tu negocio.',
   category: 'Finanzas',
   author: 'Katty Garces',
   date: '2025-08-01',
   readTime: '10 min',
   image: 'https://via.placeholder.com/800x600/F59E0B/ffffff?text=Dashboard+Financiero'
 },
 {
   id: '4',
   slug: 'marketing-digital-presupuesto-limitado',
   title: 'Marketing Digital con $500: Estrategia Completa para Emprendedores',
   excerpt: 'Una guía realista sobre cómo maximizar tu presupuesto de marketing digital y conseguir resultados medibles desde el primer mes.',
   category: 'Marketing Digital',
   author: 'Diego Flores',
   date: '2025-07-28',
   readTime: '8 min',
   image: 'https://via.placeholder.com/800x600/EC4899/ffffff?text=Marketing+Digital'
 },
 {
   id: '5',
   slug: 'caso-exito-bodega-queens',
   title: 'De Bodega Tradicional a Negocio Digital: Caso de Éxito en Queens',
   excerpt: 'Cómo una bodega familiar aumentó sus ventas 40% en 6 meses implementando un sistema de pedidos online y análisis de datos.',
   category: 'Casos de Éxito',
   author: 'Alex Cruces',
   date: '2025-07-25',
   readTime: '6 min',
   image: 'https://via.placeholder.com/800x600/8B5CF6/ffffff?text=Caso+de+Éxito'
 },
 {
   id: '6',
   slug: 'transformacion-digital-paso-a-paso',
   title: 'Transformación Digital: Tu Hoja de Ruta en 90 Días',
   excerpt: 'Un plan detallado y práctico para digitalizar tu negocio en tres meses, sin interrumpir tus operaciones diarias.',
   category: 'Transformación Digital',
   author: 'Orlando Matamoros',
   date: '2025-07-20',
   readTime: '12 min',
   image: 'https://via.placeholder.com/800x600/0EA5E9/ffffff?text=Transformación+Digital'
 }
];

const categories = [
 { name: 'Todos', icon: FaRocket, count: 6 },
 { name: 'Inteligencia Artificial', icon: FaRobot, count: 1 },
 { name: 'Transformación Digital', icon: FaChartLine, count: 1 },
 { name: 'Casos de Éxito', icon: FaLightbulb, count: 1 },
 { name: 'Finanzas', icon: FaChartLine, count: 1 },
 { name: 'Marketing Digital', icon: FaBrain, count: 1 },
 { name: 'Automatización', icon: FaCogs, count: 1 }
];

export default function BlogPage() {
 const [selectedCategory, setSelectedCategory] = useState('Todos');
 const [searchTerm, setSearchTerm] = useState('');

 // Filtrar posts basado en categoría y búsqueda
 const filteredPosts = blogPosts.filter(post => {
   const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
   const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
   return matchesCategory && matchesSearch;
 });

 // Obtener el post destacado (el más reciente marcado como featured)
 const featuredPost = blogPosts.find(post => post.featured);

 return (
   <div className="min-h-screen bg-gray-50">
     {/* Breadcrumb */}
     <div className="bg-white border-b">
       <div className="container mx-auto px-4 py-4">
         <nav className="text-sm">
           <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
             Inicio
           </Link>
           <span className="mx-2 text-gray-400">/</span>
           <span className="text-gray-900 font-medium">Blog</span>
         </nav>
       </div>
     </div>

     {/* Hero Section */}
     <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 relative overflow-hidden">
       <div className="absolute inset-0 bg-black opacity-10"></div>
       <div className="container mx-auto px-4 text-center relative z-10">
         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
           Blog de Impulsa Lab
         </h1>
         <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95">
           Insights, estrategias y casos de éxito para transformar tu negocio con inteligencia artificial
         </p>
         
         {/* Barra de búsqueda */}
         <div className="max-w-2xl mx-auto">
           <div className="relative">
             <input
               type="text"
               placeholder="Buscar artículos..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full px-6 py-4 pr-12 rounded-full text-gray-900 bg-white shadow-lg focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30"
             />
             <FaSearch className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
           </div>
         </div>
       </div>
     </section>

     {/* Post Destacado */}
     {featuredPost && !searchTerm && selectedCategory === 'Todos' && (
       <section className="py-12 bg-white">
         <div className="container mx-auto px-4">
           <h2 className="text-2xl font-bold mb-8 text-gray-900">Artículo Destacado</h2>
           <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-xl">
             <div className="grid md:grid-cols-2 gap-0">
               <div className="relative h-64 md:h-full">
                 <img
                   src={featuredPost.image}
                   alt={featuredPost.title}
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black opacity-20"></div>
               </div>
               <div className="p-8 md:p-12">
                 <span className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full mb-4">
                   {featuredPost.category}
                 </span>
                 <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                   {featuredPost.title}
                 </h3>
                 <p className="text-gray-600 mb-6 line-clamp-3">
                   {featuredPost.excerpt}
                 </p>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4 text-sm text-gray-500">
                     <span className="flex items-center gap-1">
                       <FaUser className="text-xs" />
                       {featuredPost.author}
                     </span>
                     <span className="flex items-center gap-1">
                       <FaClock className="text-xs" />
                       {featuredPost.readTime}
                     </span>
                   </div>
                   <Link
                     href={`/blog/${featuredPost.slug}`}
                     className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                   >
                     Leer más
                     <FaArrowRight className="text-sm" />
                   </Link>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>
     )}

     {/* Categorías y Posts */}
     <section className="py-16">
       <div className="container mx-auto px-4">
         <div className="grid lg:grid-cols-4 gap-8">
           {/* Sidebar de Categorías */}
           <div className="lg:col-span-1">
             <div className="sticky top-4">
               <h3 className="text-lg font-bold mb-6 text-gray-900">Categorías</h3>
               <div className="space-y-2">
                 {categories.map((category) => {
                   const Icon = category.icon;
                   return (
                     <button
                       key={category.name}
                       onClick={() => setSelectedCategory(category.name)}
                       className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                         selectedCategory === category.name
                           ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                           : 'bg-white hover:bg-gray-50 text-gray-700 hover:shadow-md'
                       }`}
                     >
                       <div className="flex items-center gap-3">
                         <Icon className={`${selectedCategory === category.name ? 'text-white' : 'text-gray-400'}`} />
                         <span className="font-medium">{category.name}</span>
                       </div>
                       <span className={`text-sm px-2 py-1 rounded-full ${
                         selectedCategory === category.name
                           ? 'bg-white bg-opacity-20 text-white'
                           : 'bg-gray-100 text-gray-600'
                       }`}>
                         {category.count}
                       </span>
                     </button>
                   );
                 })}
               </div>

               {/* Newsletter CTA */}
               <div className="mt-8 p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl text-white">
                 <h4 className="font-bold text-lg mb-2">Suscríbete al Newsletter</h4>
                 <p className="text-sm mb-4 opacity-90">
                   Recibe insights semanales sobre IA y transformación digital
                 </p>
                 <Link
                   href="/contacto"
                   className="block w-full text-center bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                 >
                   Suscribirme
                 </Link>
               </div>
             </div>
           </div>

           {/* Grid de Posts */}
           <div className="lg:col-span-3">
             {filteredPosts.length > 0 ? (
               <div className="grid md:grid-cols-2 gap-8">
                 {filteredPosts.map((post) => (
                   <article
                     key={post.id}
                     className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                   >
                     <div className="relative h-48 overflow-hidden">
                       <img
                         src={post.image}
                         alt={post.title}
                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
                       <span className="absolute top-4 left-4 px-3 py-1 bg-white text-xs font-semibold text-gray-700 rounded-full">
                         {post.category}
                       </span>
                     </div>
                     
                     <div className="p-6">
                       <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                         {post.title}
                       </h3>
                       <p className="text-gray-600 mb-4 line-clamp-3">
                         {post.excerpt}
                       </p>
                       
                       <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                         <span className="flex items-center gap-1">
                           <FaUser className="text-xs" />
                           {post.author}
                         </span>
                         <span className="flex items-center gap-1">
                           <FaClock className="text-xs" />
                           {post.readTime}
                         </span>
                       </div>
                       
                       <Link
                         href={`/blog/${post.slug}`}
                         className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                       >
                         Leer artículo
                         <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                       </Link>
                     </div>
                   </article>
                 ))}
               </div>
             ) : (
               <div className="text-center py-12">
                 <p className="text-gray-500 text-lg">
                   No se encontraron artículos que coincidan con tu búsqueda.
                 </p>
                 <button
                   onClick={() => {
                     setSearchTerm('');
                     setSelectedCategory('Todos');
                   }}
                   className="mt-4 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                 >
                   Ver todos los artículos
                 </button>
               </div>
             )}
           </div>
         </div>
       </div>
     </section>

     {/* CTA Section */}
     <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
       <div className="container mx-auto px-4 text-center">
         <h2 className="text-3xl md:text-4xl font-bold mb-4">
           ¿Listo para Transformar tu Negocio?
         </h2>
         <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
           Aplica las estrategias de nuestro blog con el apoyo de expertos en IA y transformación digital
         </p>
         <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Link
             href="/diagnostico"
             className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
           >
             Solicitar Diagnóstico Gratuito
             <FaArrowRight />
           </Link>
           <Link
             href="/contacto"
             className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
           >
             Hablar con un Experto
           </Link>
         </div>
       </div>
     </section>
   </div>
 );
}