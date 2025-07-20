'use client';

import { useState, useRef } from 'react';
import { getToolIcon } from './icons/ToolIcons';

interface TechItem {
  name: string;
  category: string;
  url: string;
}

const techItems: TechItem[] = [
  // Chat & Asistentes IA
  { name: 'ChatGPT', category: 'Chat IA', url: 'https://chatgpt.com' },
  { name: 'Claude', category: 'Chat IA', url: 'https://claude.ai' },
  { name: 'Gemini', category: 'Chat IA', url: 'https://gemini.google.com' },
  { name: 'Perplexity', category: 'Chat IA', url: 'https://perplexity.ai' },
  { name: 'Copilot', category: 'Chat IA', url: 'https://copilot.microsoft.com' },
  
  // Diseño & Creatividad
  { name: 'Figma', category: 'Diseño', url: 'https://figma.com' },
  { name: 'Canva', category: 'Diseño', url: 'https://canva.com' },
  { name: 'Adobe Firefly', category: 'Diseño', url: 'https://firefly.adobe.com' },
  { name: 'Framer', category: 'Diseño', url: 'https://framer.com' },
  
  // Imágenes IA
  { name: 'DALL-E 3', category: 'Imágenes IA', url: 'https://openai.com/dall-e-3' },
  { name: 'Midjourney', category: 'Imágenes IA', url: 'https://midjourney.com' },
  { name: 'Stable Diffusion', category: 'Imágenes IA', url: 'https://stability.ai' },
  { name: 'Leonardo AI', category: 'Imágenes IA', url: 'https://leonardo.ai' },
  
  // Video IA
  { name: 'Synthesia', category: 'Video IA', url: 'https://synthesia.io' },
  { name: 'RunwayML', category: 'Video IA', url: 'https://runwayml.com' },
  { name: 'Pika Labs', category: 'Video IA', url: 'https://pika.art' },
  { name: 'HeyGen', category: 'Video IA', url: 'https://heygen.com' },
  
  // Productividad
  { name: 'Notion', category: 'Productividad', url: 'https://notion.so' },
  { name: 'Obsidian', category: 'Productividad', url: 'https://obsidian.md' },
  { name: 'Monday', category: 'Productividad', url: 'https://monday.com' },
  { name: 'ClickUp', category: 'Productividad', url: 'https://clickup.com' },
  
  // Escritura & Contenido
  { name: 'Jasper', category: 'Escritura', url: 'https://jasper.ai' },
  { name: 'Copy.ai', category: 'Escritura', url: 'https://copy.ai' },
  { name: 'Writesonic', category: 'Escritura', url: 'https://writesonic.com' },
  { name: 'Grammarly', category: 'Escritura', url: 'https://grammarly.com' },
  
  // Código & Desarrollo
  { name: 'GitHub Copilot', category: 'Código', url: 'https://github.com/features/copilot' },
  { name: 'Cursor', category: 'Código', url: 'https://cursor.sh' },
  { name: 'Tabnine', category: 'Código', url: 'https://tabnine.com' },
  { name: 'Replit', category: 'Código', url: 'https://replit.com' },
  
  // Audio & Música
  { name: 'ElevenLabs', category: 'Audio', url: 'https://elevenlabs.io' },
  { name: 'Murf AI', category: 'Audio', url: 'https://murf.ai' },
  { name: 'Suno AI', category: 'Audio', url: 'https://suno.ai' },
  { name: 'Soundraw', category: 'Audio', url: 'https://soundraw.io' },
  // Marketing & SEO
  { name: 'Buffer', category: 'Marketing', url: 'https://buffer.com' },
  { name: 'Hootsuite', category: 'Marketing', url: 'https://hootsuite.com' },
  { name: 'Mailchimp', category: 'Marketing', url: 'https://mailchimp.com' },
  { name: 'HubSpot', category: 'Marketing', url: 'https://hubspot.com' },
  
  // Analytics
  { name: 'Google Analytics', category: 'Analytics', url: 'https://analytics.google.com' },
  { name: 'Mixpanel', category: 'Analytics', url: 'https://mixpanel.com' },
  { name: 'Hotjar', category: 'Analytics', url: 'https://hotjar.com' },
  { name: 'Amplitude', category: 'Analytics', url: 'https://amplitude.com' },
  
  // E-commerce
  { name: 'Shopify', category: 'E-commerce', url: 'https://shopify.com' },
  { name: 'WooCommerce', category: 'E-commerce', url: 'https://woocommerce.com' },
  { name: 'BigCommerce', category: 'E-commerce', url: 'https://bigcommerce.com' },
  { name: 'Square', category: 'E-commerce', url: 'https://squareup.com' },
  
  // Comunicación
  { name: 'Slack', category: 'Comunicación', url: 'https://slack.com' },
  { name: 'Discord', category: 'Comunicación', url: 'https://discord.com' },
  { name: 'Zoom', category: 'Comunicación', url: 'https://zoom.us' },
  { name: 'Microsoft Teams', category: 'Comunicación', url: 'https://teams.microsoft.com' },
  // Marketing & SEO
  { name: 'Buffer', category: 'Marketing', url: 'https://buffer.com' },
  { name: 'Hootsuite', category: 'Marketing', url: 'https://hootsuite.com' },
  { name: 'Mailchimp', category: 'Marketing', url: 'https://mailchimp.com' },
  { name: 'Semrush', category: 'SEO', url: 'https://semrush.com' },
  { name: 'Ahrefs', category: 'SEO', url: 'https://ahrefs.com' },
  
  // Analytics & Data
  { name: 'Tableau', category: 'Analytics', url: 'https://tableau.com' },
  { name: 'Power BI', category: 'Analytics', url: 'https://powerbi.microsoft.com' },
  { name: 'Google Analytics', category: 'Analytics', url: 'https://analytics.google.com' },
  { name: 'Mixpanel', category: 'Analytics', url: 'https://mixpanel.com' },
  
  // E-commerce
  { name: 'Shopify', category: 'E-commerce', url: 'https://shopify.com' },
  { name: 'WooCommerce', category: 'E-commerce', url: 'https://woocommerce.com' },
  { name: 'Stripe', category: 'E-commerce', url: 'https://stripe.com' },
  
  // Comunicación
  { name: 'Slack', category: 'Comunicación', url: 'https://slack.com' },
  { name: 'Discord', category: 'Comunicación', url: 'https://discord.com' },
  { name: 'Zoom', category: 'Comunicación', url: 'https://zoom.us' },
  { name: 'Microsoft Teams', category: 'Comunicación', url: 'https://teams.microsoft.com' },
  
  // Educación
  { name: 'Duolingo', category: 'Educación', url: 'https://duolingo.com' },
  { name: 'Coursera', category: 'Educación', url: 'https://coursera.org' },
  { name: 'Khan Academy', category: 'Educación', url: 'https://khanacademy.org' },
  
  // Social Media
  { name: 'Instagram', category: 'Social Media', url: 'https://instagram.com' },
  { name: 'LinkedIn', category: 'Social Media', url: 'https://linkedin.com' },
  { name: 'TikTok', category: 'Social Media', url: 'https://tiktok.com' },
  { name: 'Pinterest', category: 'Social Media', url: 'https://pinterest.com' },
  
  // Automatización
  { name: 'Zapier', category: 'Automatización', url: 'https://zapier.com' },
  { name: 'Make', category: 'Automatización', url: 'https://make.com' },
  { name: 'IFTTT', category: 'Automatización', url: 'https://ifttt.com' },
  { name: 'n8n', category: 'Automatización', url: 'https://n8n.io' },
];

export default function HorizontalTechTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    setIsPaused(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 100);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTimeout(() => setIsPaused(false), 100);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (isDragging) {
      e.preventDefault();
    }
  };

  return (
    <div 
      className="relative w-full overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 py-8 rounded-2xl"
      onMouseEnter={() => !isDragging && setIsPaused(true)}
      onMouseLeave={() => !isDragging && setIsPaused(false)}
    >
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-blue-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-purple-50 to-transparent z-10 pointer-events-none" />
      
      <div 
        ref={scrollRef}
        className="ticker-wrapper overflow-x-auto"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          ref={contentRef}
          className={`ticker-content ${isPaused ? 'paused' : ''}`}
        >
          {/* Triplicamos los items para asegurar el loop infinito */}
          {[...techItems, ...techItems, ...techItems].map((item, index) => {
            const IconComponent = getToolIcon(item.name);
            return (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ticker-item"
                draggable={false}
                onClick={(e) => handleClick(e, item.url)}
              >
                <div className="logo-wrapper">
                  <IconComponent className="w-7 h-7" />
                </div>
                <div className="pointer-events-none">
                  <p className="item-name">{item.name}</p>
                  <p className="item-category">{item.category}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .ticker-wrapper {
          overflow-x: auto;
          overflow-y: hidden;
          white-space: nowrap;
          cursor: grab;
          user-select: none;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .ticker-wrapper::-webkit-scrollbar {
          display: none;
        }

        .ticker-wrapper:active {
          cursor: grabbing;
        }

        .ticker-content {
          display: inline-flex;
          animation: scroll 90s linear infinite;
          will-change: transform;
        }

        .ticker-content.paused {
          animation-play-state: paused;
        }

        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin: 0 16px;
          padding: 12px 24px;
          background: white;
          border-radius: 9999px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          text-decoration: none;
          color: inherit;
          transform: scale(1);
          user-select: none;
          flex-shrink: 0;
        }

        .ticker-item:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transform: scale(1.05);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .ticker-item:hover svg {
          color: white;
        }

        .logo-wrapper {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ticker-item:not(:hover) svg {
          color: #4B5563;
        }

        .item-name {
          font-weight: 600;
          font-size: 14px;
          line-height: 1.2;
          transition: color 0.3s ease;
        }

        .item-category {
          font-size: 11px;
          opacity: 0.7;
          margin-top: 2px;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @media (max-width: 640px) {
          .ticker-content {
            animation: scroll 40s linear infinite;
          }

          .ticker-item {
            padding: 10px 16px;
            margin: 0 8px;
          }
          
          .logo-wrapper {
            width: 24px;
            height: 24px;
          }
          
          .logo-wrapper svg {
            width: 20px;
            height: 20px;
          }
          
          .item-name {
            font-size: 12px;
          }
          
          .item-category {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
}
