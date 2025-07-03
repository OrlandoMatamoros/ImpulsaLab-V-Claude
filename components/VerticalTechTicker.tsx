"use client";
import React from 'react';

// Definición de tipos
interface TechTool {
  name: string;
  logo: React.ComponentType<{ className?: string }>;
}

// Componentes de iconos SVG simplificados
const GoogleAIIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const OpenAIIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

const ClaudeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const ExcelIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h18v18H3V3zm3 3v12h12V6H6zm2 2h8v2H8V8zm0 3h8v2H8v-2zm0 3h8v2H8v-2z"/>
  </svg>
);

const PowerBIIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 13h4v8H3v-8zm6-6h4v14H9V7zm6-4h4v18h-4V3z"/>
  </svg>
);

const NextJSIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 22h20L12 2z"/>
  </svg>
);

const VercelIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 22h20L12 2z"/>
  </svg>
);

const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const FirebaseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.803 21.764l7.856 4.427a1.621 1.621 0 001.588 0l7.856-4.427L18.925 5.764a.542.542 0 00-.919-.295L12 15.764 6.722 5.469a.542.542 0 00-.919.295l-4.178 16z"/>
  </svg>
);

const ZapierIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l8 6-8 6v-4H4v-4h8V2z"/>
  </svg>
);

const TailwindIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.47 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.47 12 7 12z"/>
  </svg>
);

const FigmaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 7.5a3.5 3.5 0 110-7h-7a3.5 3.5 0 000 7 3.5 3.5 0 000 7 3.5 3.5 0 000 7h3.5a3.5 3.5 0 000-7 3.5 3.5 0 000-7z"/>
  </svg>
);

// Array de herramientas tecnológicas
const techTools: TechTool[] = [
  { name: 'Google AI (Gemini)', logo: GoogleAIIcon },
  { name: 'OpenAI (ChatGPT)', logo: OpenAIIcon },
  { name: 'Claude (Anthropic)', logo: ClaudeIcon },
  { name: 'Microsoft Excel', logo: ExcelIcon },
  { name: 'Microsoft Power BI', logo: PowerBIIcon },
  { name: 'Next.js', logo: NextJSIcon },
  { name: 'Vercel', logo: VercelIcon },
  { name: 'GitHub', logo: GitHubIcon },
  { name: 'Firebase', logo: FirebaseIcon },
  { name: 'Zapier', logo: ZapierIcon },
  { name: 'Tailwind CSS', logo: TailwindIcon },
  { name: 'Figma', logo: FigmaIcon },
];

// Componente principal
const VerticalTechTicker: React.FC = () => {
  // Duplicamos el array para crear un efecto de loop continuo
  const duplicatedTools = [...techTools, ...techTools];

  return (
    <div className="relative h-96 w-full overflow-hidden">
      {/* Máscaras de degradado */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Contenedor de las columnas */}
      <div className="flex h-full gap-8 justify-center">
        {/* Primera columna - Animación hacia arriba */}
        <div className="flex flex-col">
          <div className="flex flex-col gap-6 animate-[moveUp_30s_linear_infinite]">
            {duplicatedTools.map((tool, index) => {
              const LogoComponent = tool.logo;
              return (
                <div
                  key={`up-${index}`}
                  className="group relative flex items-center justify-center w-16 h-16 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                >
                  <LogoComponent className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 px-3 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                    {tool.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Segunda columna - Animación hacia abajo */}
        <div className="flex flex-col">
          <div className="flex flex-col gap-6 animate-[moveDown_30s_linear_infinite]">
            {duplicatedTools.map((tool, index) => {
              const LogoComponent = tool.logo;
              return (
                <div
                  key={`down-${index}`}
                  className="group relative flex items-center justify-center w-16 h-16 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                >
                  <LogoComponent className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                  
                  {/* Tooltip */}
                  <div className="absolute right-full mr-2 px-3 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                    {tool.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalTechTicker;