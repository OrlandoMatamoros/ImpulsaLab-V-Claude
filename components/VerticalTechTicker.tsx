"use client";
import * as React from 'react';

interface TechTool {
  name: string;
  logo: React.ComponentType<{ className?: string }>;
  url: string;
}

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

const MakeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
  </svg>
);

const StripeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/>
  </svg>
);

const techTools: TechTool[] = [
  { name: 'Google AI', logo: GoogleAIIcon, url: 'https://gemini.google.com' },
  { name: 'OpenAI', logo: OpenAIIcon, url: 'https://openai.com' },
  { name: 'Claude', logo: ClaudeIcon, url: 'https://claude.ai' },
  { name: 'Excel', logo: ExcelIcon, url: 'https://www.microsoft.com/excel' },
  { name: 'Power BI', logo: PowerBIIcon, url: 'https://powerbi.microsoft.com' },
  { name: 'Next.js', logo: NextJSIcon, url: 'https://nextjs.org' },
  { name: 'Vercel', logo: VercelIcon, url: 'https://vercel.com' },
  { name: 'GitHub', logo: GitHubIcon, url: 'https://github.com' },
  { name: 'Firebase', logo: FirebaseIcon, url: 'https://firebase.google.com' },
  { name: 'Make.com', logo: MakeIcon, url: 'https://make.com' },
  { name: 'Zapier', logo: ZapierIcon, url: 'https://zapier.com' },
  { name: 'Tailwind', logo: TailwindIcon, url: 'https://tailwindcss.com' },
  { name: 'Figma', logo: FigmaIcon, url: 'https://figma.com' },
  { name: 'Stripe', logo: StripeIcon, url: 'https://stripe.com' },
];

const VerticalTechTicker: React.FC = () => {
  const duplicatedTools = [...techTools, ...techTools];

  return (
    <div className="relative h-96 w-full overflow-hidden">
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-blue-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-900 to-transparent"></div>
      </div>

      <div className="flex h-full gap-12 justify-center items-center">
        <div className="flex flex-col">
          <div className="flex flex-col gap-8 animate-[slideUp_25s_linear_infinite]">
            {duplicatedTools.map((tool, index) => {
              const LogoComponent = tool.logo;
              return (<a>
  
                key={"up-" + index.toString()}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-center w-24 h-24 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-500 cursor-pointer border border-white/20 hover:border-white/40"
            
                  <LogoComponent className="w-10 h-10 text-white/70 group-hover:text-white transition-all duration-500 group-hover:scale-110" />
                  <div className="mt-2 text-xs text-white/60 group-hover:text-white/90 transition-all duration-500 text-center px-2 leading-tight">
                    {tool.name}
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col gap-8 animate-[slideDown_25s_linear_infinite]">
            {duplicatedTools.map((tool, index) => {
              const LogoComponent = tool.logo;
              return (<a>
                
                  key={`down-${index}`}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-center w-24 h-24 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-500 cursor-pointer border border-white/20 hover:border-white/40"
                
                  <LogoComponent className="w-10 h-10 text-white/70 group-hover:text-white transition-all duration-500 group-hover:scale-110" />
                  <div className="mt-2 text-xs text-white/60 group-hover:text-white/90 transition-all duration-500 text-center px-2 leading-tight">
                    {tool.name}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalTechTicker;