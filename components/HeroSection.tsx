'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { Canvas, useFrame, RootState } from '@react-three/fiber'
import { OrbitControls, Text, Line, Sphere, Trail } from '@react-three/drei'
import * as THREE from 'three'
import { LINKS } from '@/lib/constants'

// Componente para el punto animado
function AnimatedPoint() {
  const meshRef = useRef<THREE.Mesh>(null)
  const trailRef = useRef<THREE.Mesh>(null)
  
  useFrame((state: RootState) => {
    if (!meshRef.current) return
    
    const t = (state.clock.getElapsedTime() % 5) / 5 // Loop cada 5 segundos
    
    // Movimiento más suave con curva bezier
    const progress = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    
    // Movimiento desde origen a coordenada óptima
    const x = progress * 2
    const y = progress * 2
    const z = progress * 2
    
    meshRef.current.position.set(x, y, z)
    
    // Pulso y brillo al llegar al destino
    const scale = t > 0.8 ? 1 + Math.sin(t * Math.PI * 20) * 0.2 : 1
    meshRef.current.scale.setScalar(scale * 0.6)
    
    // Rotación del punto
    meshRef.current.rotation.y += 0.02
  })
  
  return (
    <Trail
      width={4}
      length={20}
      color={new THREE.Color('#8B5CF6')}
      attenuation={(width) => width}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#8B5CF6"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
    </Trail>
  )
}

// Componente para los ejes
function CoordinateAxes() {
  const axisLength = 2.5
  
  return (
    <>
      {/* Base del sistema de coordenadas */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Eje X - Finanzas */}
      <group>
        <Line
          points={[[0, 0, 0], [axisLength, 0, 0]]}
          color="#0066CC"
          lineWidth={4}
        />
        <mesh position={[axisLength, 0, 0]}>
          <coneGeometry args={[0.08, 0.2, 8]} />
          <meshStandardMaterial color="#0066CC" />
        </mesh>
        <Text
          position={[axisLength + 0.5, -0.2, 0]}
          fontSize={0.35}
          color="#0066CC"
          anchorX="center"
        >
          Finanzas
        </Text>
        <Text
          position={[axisLength + 0.5, -0.5, 0]}
          fontSize={0.2}
          color="#0066CC"
          anchorX="center"
          fillOpacity={0.8}
        >
          Control Total
        </Text>
      </group>
      
      {/* Eje Y - Operaciones */}
      <group>
        <Line
          points={[[0, 0, 0], [0, axisLength, 0]]}
          color="#6B46C1"
          lineWidth={4}
        />
        <mesh position={[0, axisLength, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.08, 0.2, 8]} />
          <meshStandardMaterial color="#6B46C1" />
        </mesh>
        <Text
          position={[-0.7, axisLength - 0.3, 0]}
          fontSize={0.35}
          color="#6B46C1"
          anchorX="center"
          rotation={[0, 0, 0]}
        >
          Operaciones
        </Text>
        <Text
          position={[-0.7, axisLength - 0.6, 0]}
          fontSize={0.2}
          color="#6B46C1"
          anchorX="center"
          fillOpacity={0.8}
        >
          Automatización
        </Text>
      </group>
      
      {/* Eje Z - Marketing */}
      <group>
        <Line
          points={[[0, 0, 0], [0, 0, axisLength]]}
          color="#10B981"
          lineWidth={4}
        />
        <mesh position={[0, 0, axisLength]} rotation={[Math.PI/2, 0, 0]}>
          <coneGeometry args={[0.08, 0.2, 8]} />
          <meshStandardMaterial color="#10B981" />
        </mesh>
        <Text
          position={[0, -0.2, axisLength + 0.5]}
          fontSize={0.35}
          color="#10B981"
          anchorX="center"
        >
          Marketing
        </Text>
        <Text
          position={[0, -0.5, axisLength + 0.5]}
          fontSize={0.2}
          color="#10B981"
          anchorX="center"
          fillOpacity={0.8}
        >
          Conexión Real
        </Text>
      </group>
      
      {/* Planos de referencia con gradientes */}
      <mesh position={[1.25, 0, 1.25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 2.5]} />
        <meshStandardMaterial 
          color="#0066CC" 
          transparent 
          opacity={0.05} 
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[1.25, 1.25, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[2.5, 2.5]} />
        <meshStandardMaterial 
          color="#6B46C1" 
          transparent 
          opacity={0.05} 
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 1.25, 1.25]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2.5, 2.5]} />
        <meshStandardMaterial 
          color="#10B981" 
          transparent 
          opacity={0.05} 
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  )
}

// Componente para el grid
function GridPlanes() {
  const gridSize = 2.5
  const divisions = 10
  
  return (
    <>
      {/* Grid más sutil y elegante */}
      <gridHelper
        args={[gridSize, divisions, '#334155', '#1e293b']}
        position={[gridSize / 2, 0.01, gridSize / 2]}
      />
    </>
  )
}

// Componente del gráfico 3D
function CoordinateGraph3D() {
  return (
    <div className="w-full h-[200px] md:h-[250px] lg:h-[300px]">
      <Canvas
        camera={{ position: [5, 3.5, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={0.3} color="#6B46C1" />
        
        {/* Luz focal en el punto de destino */}
        <spotLight
          position={[3, 5, 3]}
          target-position={[2, 2, 2]}
          intensity={2}
          color="#FFD700"
          angle={0.3}
          penumbra={0.5}
        />
        
        <Suspense fallback={null}>
          <group rotation={[0, -Math.PI / 6, 0]}>
            <CoordinateAxes />
            <GridPlanes />
            <AnimatedPoint />
            
            {/* Punto de destino óptimo con efecto de brillo */}
            <group position={[2, 2, 2]}>
              <Sphere args={[0.1, 32, 32]}>
                <meshStandardMaterial
                  color="#FFD700"
                  emissive="#FFD700"
                  emissiveIntensity={1}
                  metalness={0.8}
                  roughness={0.2}
                />
              </Sphere>
              {/* Anillo de energía alrededor del punto óptimo */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.2, 0.02, 16, 100]} />
                <meshStandardMaterial
                  color="#FFD700"
                  emissive="#FFD700"
                  emissiveIntensity={0.5}
                  transparent
                  opacity={0.6}
                />
              </mesh>
            </group>
            
            {/* Partículas flotantes para ambiente */}
            {[...Array(20)].map((_, i) => (
              <mesh
                key={i}
                position={[
                  Math.random() * 4 - 2,
                  Math.random() * 4 - 2,
                  Math.random() * 4 - 2
                ]}
              >
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshStandardMaterial
                  color="#8B5CF6"
                  emissive="#8B5CF6"
                  emissiveIntensity={0.5}
                />
              </mesh>
            ))}
          </group>
        </Suspense>
        
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  )
}

// Iconos existentes
const HubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    {/* Nodo central */}
    <circle cx="12" cy="12" r="3" fill="currentColor" />
    
    {/* Conexiones lado izquierdo - azul oscuro */}
    <g className="text-[#002D62]">
      <circle cx="4" cy="12" r="2" fill="currentColor" />
      <path d="M7 12h2" stroke="currentColor" strokeWidth="2" />
      
      <circle cx="6" cy="6" r="2" fill="currentColor" />
      <path d="M9 9l-1.5-1.5" stroke="currentColor" strokeWidth="2" />
      
      <circle cx="6" cy="18" r="2" fill="currentColor" />
      <path d="M9 15l-1.5 1.5" stroke="currentColor" strokeWidth="2" />
      
      <circle cx="12" cy="4" r="2" fill="currentColor" />
      <path d="M12 7v2" stroke="currentColor" strokeWidth="2" />
      
      <circle cx="12" cy="20" r="2" fill="currentColor" />
      <path d="M12 17v-2" stroke="currentColor" strokeWidth="2" />
    </g>
    
    {/* Conexiones lado derecho - azul eléctrico */}
    <g className="text-blue-500">
      <path d="M15 12h3l1 1v2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="19" cy="15" r="1" fill="currentColor" />
      
      <path d="M15 10h2l1-1v-2l1-1" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="19" cy="6" r="1" fill="currentColor" />
      
      <path d="M15 14h2v3l1 1" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="18" cy="18" r="1" fill="currentColor" />
      
      <path d="M14 9l2-2h2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="18" cy="7" r="0.5" fill="currentColor" />
      
      <path d="M14 15l1 2h2l1 1" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="18" cy="16" r="0.5" fill="currentColor" />
    </g>
  </svg>
);

const ToolsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);

const AIIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const NewsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
    <path d="M11 6h6M11 10h6M11 14h6M11 18h6"/>
  </svg>
);

const PromptIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="4 7 4 4 20 4 20 7"/>
    <line x1="9" y1="20" x2="15" y2="20"/>
    <line x1="12" y1="4" x2="12" y2="20"/>
    <path d="M5 12l7-7 7 7"/>
  </svg>
);

export default function HeroSection() {
  const [webGLAvailable, setWebGLAvailable] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Detectar WebGL solo en el cliente
    try {
      const canvas = document.createElement('canvas')
      const hasWebGL = !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
      setWebGLAvailable(hasWebGL)
    } catch (e) {
      setWebGLAvailable(false)
    }
  }, [])

  return (
    <section className="bg-[#002D62] text-white pt-24 pb-20 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* COLUMNA IZQUIERDA - CON GRÁFICO 3D */}
          <div>
            {/* Gráfico 3D en la parte superior */}
            <div className="mb-6 lg:mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                {!isClient ? (
                  // Fallback mientras se carga el cliente
                  <div className="w-full h-[200px] md:h-[250px] lg:h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl mb-3 animate-pulse">📊</div>
                      <p className="text-lg font-semibold">Diagnóstico 3D</p>
                      <p className="text-white/60 text-sm mt-2">Finanzas • Operaciones • Marketing</p>
                    </div>
                  </div>
                ) : webGLAvailable ? (
                  <Suspense fallback={
                    <div className="w-full h-[200px] md:h-[250px] lg:h-[300px] flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2 animate-pulse">📊</div>
                        <p className="text-white/60">Cargando gráfico 3D...</p>
                      </div>
                    </div>
                  }>
                    <CoordinateGraph3D />
                  </Suspense>
                ) : (
                  <div className="w-full h-[200px] md:h-[250px] lg:h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl mb-3">📊</div>
                      <p className="text-lg font-semibold">Diagnóstico 3D</p>
                      <p className="text-white/60 text-sm mt-2">Finanzas • Operaciones • Marketing</p>
                    </div>
                  </div>
                )}
                
                {/* Indicador de coordenadas */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-white/80">
                    <span className="font-semibold">Tu Coordenada Óptima:</span> Donde convergen Finanzas, Operaciones y Marketing
                  </p>
                </div>
              </div>
            </div>

            {/* Contenido de texto - tamaños ajustados */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
              El Crecimiento de tu Negocio, Impulsado por IA.
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-6 lg:mb-8 text-gray-200">
              Deja de ahogarte en el día a día. Te entregamos las herramientas 
              de IA y la estrategia que necesitas para liberar tu tiempo, 
              aumentar tu rentabilidad y tomar decisiones con total confianza.
            </p>
            <Link 
              href={LINKS.calendly}
              target="_blank"
              className="inline-block bg-white text-blue-900 px-6 lg:px-8 py-3 lg:py-4 rounded-lg 
                       font-semibold text-base lg:text-lg transition-all duration-300 
                       hover:scale-105 hover:bg-gray-100 hover:shadow-xl"
            >
              Obtén tu Diagnóstico 3D Gratis
            </Link>
          </div>

          {/* COLUMNA DERECHA - HUB DE HERRAMIENTAS */}
          <div className="flex justify-center mt-8 md:mt-0">
            <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl space-y-6">
              
              {/* HUB DE HERRAMIENTAS IA */}
              <div className="relative bg-white p-6 md:p-8 lg:p-10 rounded-2xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-2xl"></div>
                
                <div className="relative">
                  {/* HEADER */}
                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                      <HubIcon className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-[#002D62]">
                      Hub de Herramientas IA
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base lg:text-lg">
                      Tu arsenal completo para dominar la IA en tu negocio
                    </p>
                  </div>

                  {/* GRID DE AGENTES */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-5">
                    
                    {/* ARSENAL TECNOLÓGICO */}
                    <Link 
                      href="/herramientas"
                      className="group relative bg-gradient-to-br from-blue-600 to-blue-700 p-4 md:p-5 lg:p-6 rounded-xl border-2 border-blue-500 hover:border-blue-300 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 overflow-hidden"
                    >
                      <div className="absolute top-2 right-2 bg-white text-blue-700 text-xs px-2 py-1 rounded-full animate-pulse font-bold">
                        Gratis
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform"></div>
                      
                      <div className="relative">
                        <div className="flex items-center space-x-2 md:space-x-3 mb-3">
                          <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                            <ToolsIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                          </div>
                          <span className="font-bold text-sm md:text-base lg:text-lg text-white">Arsenal</span>
                        </div>
                        <p className="text-xs md:text-sm lg:text-base text-white/90 font-medium mb-2">
                          <span className="font-bold text-white">100+ herramientas</span> con buscador inteligente
                        </p>
                        <p className="text-xs md:text-sm text-white/80">
                          Ahorra 20+ horas semanales
                        </p>
                      </div>
                    </Link>

                    {/* AGENTE UNIFICADOR */}
                    <Link 
                      href="/agente-unificador"
                      className="group relative bg-gradient-to-br from-purple-600 to-purple-700 p-4 md:p-5 lg:p-6 rounded-xl border-2 border-purple-500 hover:border-purple-300 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 overflow-hidden"
                    >
                      <div className="absolute top-2 right-2 bg-white text-purple-700 text-xs px-2 py-1 rounded-full animate-pulse font-bold">
                        Popular
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform"></div>
                      
                      <div className="relative">
                        <div className="flex items-center space-x-2 md:space-x-3 mb-3">
                          <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                            <AIIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                          </div>
                          <span className="font-bold text-sm md:text-base lg:text-lg text-white">4 IAs</span>
                        </div>
                        <p className="text-xs md:text-sm lg:text-base text-white/90 font-medium mb-2">
                          ChatGPT + Claude + Gemini + Grok
                        </p>
                        <p className="text-xs md:text-sm text-white/80">
                          Una respuesta, 4 perspectivas
                        </p>
                      </div>
                    </Link>

                    {/* NOTICIAS IA */}
                    <Link 
                      href="/noticias-ia"
                      className="group relative bg-gradient-to-br from-emerald-600 to-emerald-700 p-4 md:p-5 lg:p-6 rounded-xl border-2 border-emerald-500 hover:border-emerald-300 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50 overflow-hidden"
                    >
                      <div className="absolute top-2 right-2 bg-white text-emerald-700 text-xs px-2 py-1 rounded-full animate-pulse font-bold">
                        Actualizado
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform"></div>
                      
                      <div className="relative">
                        <div className="flex items-center space-x-2 md:space-x-3 mb-3">
                          <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                            <NewsIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                          </div>
                          <span className="font-bold text-sm md:text-base lg:text-lg text-white">Noticias</span>
                        </div>
                        <p className="text-xs md:text-sm lg:text-base text-white/90 font-medium mb-2">
                          IA aplicada a negocios reales
                        </p>
                        <p className="text-xs md:text-sm text-white/80">
                          Mantente a la vanguardia
                        </p>
                      </div>
                    </Link>

                    {/* ESTRUCTURADOR PROMPTS */}
                    <Link 
                      href="/estructurador-prompts"
                      className="group relative bg-gradient-to-br from-orange-600 to-red-600 p-4 md:p-5 lg:p-6 rounded-xl border-2 border-orange-500 hover:border-orange-300 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/50 overflow-hidden"
                    >
                      <div className="absolute top-2 right-2 bg-white text-orange-700 text-xs px-2 py-1 rounded-full animate-pulse font-bold">
                        Pro
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform"></div>
                      
                      <div className="relative">
                        <div className="flex items-center space-x-2 md:space-x-3 mb-3">
                          <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                            <PromptIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
                          </div>
                          <span className="font-bold text-sm md:text-base lg:text-lg text-white">Prompts</span>
                        </div>
                        <p className="text-xs md:text-sm lg:text-base text-white/90 font-medium mb-2">
                          Resultados 10x mejores
                        </p>
                        <p className="text-xs md:text-sm text-white/80">
                          Domina el arte del prompting
                        </p>
                      </div>
                    </Link>

                  </div>

                  {/* CTA PRINCIPAL */}
                  <div className="mt-8 text-center">
                    <Link 
                      href="/herramientas"
                      className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 rounded-xl font-bold text-sm md:text-base lg:text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 animate-gradient bg-[length:200%_auto] group"
                    >
                      <ToolsIcon className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:rotate-12 transition-transform" />
                      Explorar Todas las Herramientas
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>

                  {/* TEXTO DE CIERRE */}
                  <p className="text-center text-xs md:text-sm text-gray-500 mt-4">
                    Sin tarjeta de crédito • Acceso inmediato • Soporte en español
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ESTILOS PARA ANIMACIONES */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  )
}