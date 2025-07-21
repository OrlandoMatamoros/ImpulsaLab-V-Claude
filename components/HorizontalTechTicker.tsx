'use client';

import { useState, useRef, useEffect } from 'react';
import { getToolIcon } from './icons/ToolIcons';

interface TechItem {
  name: string;
  category: string;
  url: string;
  color?: string; // Color principal de la marca
}

const techItems: TechItem[] = [
  // Chat & Asistentes IA
  { name: 'ChatGPT', category: 'Chat IA', url: 'https://chatgpt.com', color: '#00A67E' },
  { name: 'Claude', category: 'Chat IA', url: 'https://claude.ai', color: '#D97757' },
  { name: 'Gemini', category: 'Chat IA', url: 'https://gemini.google.com', color: '#4285F4' },
  { name: 'Perplexity', category: 'Chat IA', url: 'https://perplexity.ai', color: '#20B2AA' },
  { name: 'Copilot', category: 'Chat IA', url: 'https://copilot.microsoft.com', color: '#0078D4' },
  { name: 'Poe', category: 'Chat IA', url: 'https://poe.com', color: '#7B3FF2' },
  { name: 'You.com', category: 'Chat IA', url: 'https://you.com', color: '#FF6B6B' },
  { name: 'Phind', category: 'Chat IA', url: 'https://phind.com', color: '#00D9B1' },
  
  // Diseño & Creatividad
  { name: 'Figma', category: 'Diseño', url: 'https://figma.com', color: '#F24E1E' },
  { name: 'Canva', category: 'Diseño', url: 'https://canva.com', color: '#00C4CC' },
  { name: 'Adobe Firefly', category: 'Diseño', url: 'https://firefly.adobe.com', color: '#FF0000' },
  { name: 'Framer', category: 'Diseño', url: 'https://framer.com', color: '#0055FF' },
  { name: 'Sketch', category: 'Diseño', url: 'https://sketch.com', color: '#F7B500' },
  { name: 'Adobe XD', category: 'Diseño', url: 'https://adobe.com/products/xd', color: '#FF61F6' },
  { name: 'InVision', category: 'Diseño', url: 'https://invisionapp.com', color: '#FF3366' },
  { name: 'Penpot', category: 'Diseño', url: 'https://penpot.app', color: '#000000' },
  { name: 'Lunacy', category: 'Diseño', url: 'https://icons8.com/lunacy', color: '#179DE3' },
  
  // Imágenes IA
  { name: 'DALL-E 3', category: 'Imágenes IA', url: 'https://openai.com/dall-e-3', color: '#00A67E' },
  { name: 'Midjourney', category: 'Imágenes IA', url: 'https://midjourney.com', color: '#5865F2' },
  { name: 'Stable Diffusion', category: 'Imágenes IA', url: 'https://stability.ai', color: '#9333EA' },
  { name: 'Leonardo AI', category: 'Imágenes IA', url: 'https://leonardo.ai', color: '#5C16C5' },
  { name: 'Ideogram', category: 'Imágenes IA', url: 'https://ideogram.ai', color: '#6366F1' },
  { name: 'Adobe Firefly', category: 'Imágenes IA', url: 'https://firefly.adobe.com', color: '#FF0000' },
  { name: 'Bing Image Creator', category: 'Imágenes IA', url: 'https://bing.com/create', color: '#0078D4' },
  { name: 'NightCafe', category: 'Imágenes IA', url: 'https://nightcafe.studio', color: '#FF6B6B' },
  { name: 'Artbreeder', category: 'Imágenes IA', url: 'https://artbreeder.com', color: '#1A1A1A' },
  
  // Video IA
  { name: 'Synthesia', category: 'Video IA', url: 'https://synthesia.io', color: '#4353FF' },
  { name: 'RunwayML', category: 'Video IA', url: 'https://runwayml.com', color: '#000000' },
  { name: 'Pika Labs', category: 'Video IA', url: 'https://pika.art', color: '#FF4B4B' },
  { name: 'HeyGen', category: 'Video IA', url: 'https://heygen.com', color: '#5C3EE8' },
  { name: 'D-ID', category: 'Video IA', url: 'https://d-id.com', color: '#6C5CE7' },
  { name: 'Fliki', category: 'Video IA', url: 'https://fliki.ai', color: '#FF6B6B' },
  { name: 'Pictory', category: 'Video IA', url: 'https://pictory.ai', color: '#00D4FF' },
  { name: 'Descript', category: 'Video IA', url: 'https://descript.com', color: '#5E5ADB' },
  { name: 'Lumen5', category: 'Video IA', url: 'https://lumen5.com', color: '#5846F6' },
  
  // Productividad
  { name: 'Notion', category: 'Productividad', url: 'https://notion.so', color: '#000000' },
  { name: 'Obsidian', category: 'Productividad', url: 'https://obsidian.md', color: '#7C3AED' },
  { name: 'Monday', category: 'Productividad', url: 'https://monday.com', color: '#FF3D71' },
  { name: 'ClickUp', category: 'Productividad', url: 'https://clickup.com', color: '#7B68EE' },
  { name: 'Asana', category: 'Productividad', url: 'https://asana.com', color: '#F06A6A' },
  { name: 'Trello', category: 'Productividad', url: 'https://trello.com', color: '#0079BF' },
  { name: 'Todoist', category: 'Productividad', url: 'https://todoist.com', color: '#E44332' },
  { name: 'Linear', category: 'Productividad', url: 'https://linear.app', color: '#5E6AD2' },
  { name: 'Coda', category: 'Productividad', url: 'https://coda.io', color: '#F46A54' },
  { name: 'Airtable', category: 'Productividad', url: 'https://airtable.com', color: '#FCB400' },
  
  // Escritura & Contenido
  { name: 'Jasper', category: 'Escritura', url: 'https://jasper.ai', color: '#5C16C5' },
  { name: 'Copy.ai', category: 'Escritura', url: 'https://copy.ai', color: '#7C3AED' },
  { name: 'Writesonic', category: 'Escritura', url: 'https://writesonic.com', color: '#006AFF' },
  { name: 'Grammarly', category: 'Escritura', url: 'https://grammarly.com', color: '#15B67A' },
  { name: 'Hemingway', category: 'Escritura', url: 'https://hemingwayapp.com', color: '#F7BE16' },
  { name: 'ProWritingAid', category: 'Escritura', url: 'https://prowritingaid.com', color: '#00A8E1' },
  { name: 'Rytr', category: 'Escritura', url: 'https://rytr.me', color: '#FF5A5F' },
  { name: 'Wordtune', category: 'Escritura', url: 'https://wordtune.com', color: '#6B46C1' },
  
  // Código & Desarrollo
  { name: 'GitHub Copilot', category: 'Código', url: 'https://github.com/features/copilot', color: '#24292E' },
  { name: 'Cursor', category: 'Código', url: 'https://cursor.sh', color: '#000000' },
  { name: 'Tabnine', category: 'Código', url: 'https://tabnine.com', color: '#FF6B6B' },
  { name: 'Replit', category: 'Código', url: 'https://replit.com', color: '#F26207' },
  { name: 'CodePen', category: 'Código', url: 'https://codepen.io', color: '#000000' },
  { name: 'CodeSandbox', category: 'Código', url: 'https://codesandbox.io', color: '#040404' },
  { name: 'Vercel', category: 'Código', url: 'https://vercel.com', color: '#000000' },
  { name: 'Netlify', category: 'Código', url: 'https://netlify.com', color: '#00C7B7' },
  { name: 'Railway', category: 'Código', url: 'https://railway.app', color: '#853BCE' },
  { name: 'Supabase', category: 'Código', url: 'https://supabase.com', color: '#3ECF8E' },
  
  // Audio & Música
  { name: 'ElevenLabs', category: 'Audio', url: 'https://elevenlabs.io', color: '#000000' },
  { name: 'Murf AI', category: 'Audio', url: 'https://murf.ai', color: '#6C5CE7' },
  { name: 'Suno AI', category: 'Audio', url: 'https://suno.ai', color: '#FA5252' },
  { name: 'Soundraw', category: 'Audio', url: 'https://soundraw.io', color: '#6366F1' },
  { name: 'Boomy', category: 'Audio', url: 'https://boomy.com', color: '#FF006E' },
  { name: 'AIVA', category: 'Audio', url: 'https://aiva.ai', color: '#000000' },
  { name: 'Splash Pro', category: 'Audio', url: 'https://splashpro.com', color: '#7C3AED' },
  { name: 'Voicemod', category: 'Audio', url: 'https://voicemod.net', color: '#01E5C0' },
  
  // Marketing & SEO
  { name: 'Buffer', category: 'Marketing', url: 'https://buffer.com', color: '#168EEA' },
  { name: 'Hootsuite', category: 'Marketing', url: 'https://hootsuite.com', color: '#000000' },
  { name: 'Mailchimp', category: 'Marketing', url: 'https://mailchimp.com', color: '#FFE01B' },
  { name: 'HubSpot', category: 'Marketing', url: 'https://hubspot.com', color: '#FF7A59' },
  { name: 'Semrush', category: 'SEO', url: 'https://semrush.com', color: '#FF642D' },
  { name: 'Ahrefs', category: 'SEO', url: 'https://ahrefs.com', color: '#FF6B00' },
  { name: 'Moz', category: 'SEO', url: 'https://moz.com', color: '#4285F4' },
  { name: 'Screaming Frog', category: 'SEO', url: 'https://screamingfrog.co.uk', color: '#8CC63F' },
  
  // Analytics & Data
  { name: 'Google Analytics', category: 'Analytics', url: 'https://analytics.google.com', color: '#E37400' },
  { name: 'Mixpanel', category: 'Analytics', url: 'https://mixpanel.com', color: '#7856FF' },
  { name: 'Hotjar', category: 'Analytics', url: 'https://hotjar.com', color: '#FF3C00' },
  { name: 'Amplitude', category: 'Analytics', url: 'https://amplitude.com', color: '#136ACD' },
  { name: 'Tableau', category: 'Analytics', url: 'https://tableau.com', color: '#E97627' },
  { name: 'Power BI', category: 'Analytics', url: 'https://powerbi.microsoft.com', color: '#F2C811' },
  { name: 'Looker', category: 'Analytics', url: 'https://looker.com', color: '#4285F4' },
  { name: 'Segment', category: 'Analytics', url: 'https://segment.com', color: '#52BD94' },
  
  // E-commerce
  { name: 'Shopify', category: 'E-commerce', url: 'https://shopify.com', color: '#96BF48' },
  { name: 'WooCommerce', category: 'E-commerce', url: 'https://woocommerce.com', color: '#96588A' },
  { name: 'BigCommerce', category: 'E-commerce', url: 'https://bigcommerce.com', color: '#121118' },
  { name: 'Square', category: 'E-commerce', url: 'https://squareup.com', color: '#3E4348' },
  { name: 'Stripe', category: 'E-commerce', url: 'https://stripe.com', color: '#635BFF' },
  { name: 'PayPal', category: 'E-commerce', url: 'https://paypal.com', color: '#003087' },
  { name: 'Etsy', category: 'E-commerce', url: 'https://etsy.com', color: '#F14000' },
  { name: 'Gumroad', category: 'E-commerce', url: 'https://gumroad.com', color: '#36A9AE' },
  
  // Comunicación
  { name: 'Slack', category: 'Comunicación', url: 'https://slack.com', color: '#4A154B' },
  { name: 'Discord', category: 'Comunicación', url: 'https://discord.com', color: '#5865F2' },
  { name: 'Zoom', category: 'Comunicación', url: 'https://zoom.us', color: '#2D8CFF' },
  { name: 'Microsoft Teams', category: 'Comunicación', url: 'https://teams.microsoft.com', color: '#6264A7' },
  { name: 'Google Meet', category: 'Comunicación', url: 'https://meet.google.com', color: '#00897B' },
  { name: 'Skype', category: 'Comunicación', url: 'https://skype.com', color: '#00AFF0' },
  { name: 'Telegram', category: 'Comunicación', url: 'https://telegram.org', color: '#229ED9' },
  { name: 'WhatsApp', category: 'Comunicación', url: 'https://whatsapp.com', color: '#25D366' },
  
  // Educación
  { name: 'Duolingo', category: 'Educación', url: 'https://duolingo.com', color: '#58CC02' },
  { name: 'Coursera', category: 'Educación', url: 'https://coursera.org', color: '#0056D2' },
  { name: 'Khan Academy', category: 'Educación', url: 'https://khanacademy.org', color: '#14BF96' },
  { name: 'Udemy', category: 'Educación', url: 'https://udemy.com', color: '#A435F0' },
  { name: 'edX', category: 'Educación', url: 'https://edx.org', color: '#02262B' },
  { name: 'Skillshare', category: 'Educación', url: 'https://skillshare.com', color: '#00FF84' },
  { name: 'MasterClass', category: 'Educación', url: 'https://masterclass.com', color: '#000000' },
  { name: 'Pluralsight', category: 'Educación', url: 'https://pluralsight.com', color: '#F15B2A' },
  
  // Social Media
  { name: 'Instagram', category: 'Social Media', url: 'https://instagram.com', color: '#E4405F' },
  { name: 'LinkedIn', category: 'Social Media', url: 'https://linkedin.com', color: '#0A66C2' },
  { name: 'TikTok', category: 'Social Media', url: 'https://tiktok.com', color: '#000000' },
  { name: 'Pinterest', category: 'Social Media', url: 'https://pinterest.com', color: '#E60023' },
  { name: 'Twitter/X', category: 'Social Media', url: 'https://twitter.com', color: '#000000' },
  { name: 'Facebook', category: 'Social Media', url: 'https://facebook.com', color: '#1877F2' },
  { name: 'Reddit', category: 'Social Media', url: 'https://reddit.com', color: '#FF4500' },
  { name: 'YouTube', category: 'Social Media', url: 'https://youtube.com', color: '#FF0000' },
  
  // Automatización
  { name: 'Zapier', category: 'Automatización', url: 'https://zapier.com', color: '#FF4A00' },
  { name: 'Make', category: 'Automatización', url: 'https://make.com', color: '#6D00CC' },
  { name: 'IFTTT', category: 'Automatización', url: 'https://ifttt.com', color: '#000000' },
  { name: 'n8n', category: 'Automatización', url: 'https://n8n.io', color: '#EA4B71' },
  { name: 'Integromat', category: 'Automatización', url: 'https://integromat.com', color: '#2F8EED' },
  { name: 'Automate.io', category: 'Automatización', url: 'https://automate.io', color: '#27AE60' },
  { name: 'Pabbly', category: 'Automatización', url: 'https://pabbly.com', color: '#FF6900' },
  { name: 'Workato', category: 'Automatización', url: 'https://workato.com', color: '#1063E1' },
  
  // Cloud & Hosting
  { name: 'AWS', category: 'Cloud', url: 'https://aws.amazon.com', color: '#FF9900' },
  { name: 'Google Cloud', category: 'Cloud', url: 'https://cloud.google.com', color: '#4285F4' },
  { name: 'Microsoft Azure', category: 'Cloud', url: 'https://azure.microsoft.com', color: '#0078D4' },
  { name: 'DigitalOcean', category: 'Cloud', url: 'https://digitalocean.com', color: '#0080FF' },
  { name: 'Linode', category: 'Cloud', url: 'https://linode.com', color: '#00A95C' },
  { name: 'Cloudflare', category: 'Cloud', url: 'https://cloudflare.com', color: '#F38020' },
  { name: 'Heroku', category: 'Cloud', url: 'https://heroku.com', color: '#430098' },
  
  // Herramientas de IA adicionales
  { name: 'Hugging Face', category: 'IA Tools', url: 'https://huggingface.co', color: '#FFD21E' },
  { name: 'Replicate', category: 'IA Tools', url: 'https://replicate.com', color: '#000000' },
  { name: 'Cohere', category: 'IA Tools', url: 'https://cohere.ai', color: '#39594D' },
  { name: 'Anthropic', category: 'IA Tools', url: 'https://anthropic.com', color: '#D97757' },
  { name: 'OpenAI', category: 'IA Tools', url: 'https://openai.com', color: '#00A67E' },
];

export default function HorizontalTechTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [momentum, setMomentum] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const lastMouseX = useRef(0);
  const velocityRef = useRef(0);

  // Función para aplicar momentum después de soltar
  useEffect(() => {
    if (momentum !== 0 && !isDragging) {
      const applyMomentum = () => {
        if (scrollRef.current && Math.abs(momentum) > 0.5) {
          scrollRef.current.scrollLeft += momentum;
          setMomentum(m => m * 0.95); // Fricción
          animationRef.current = requestAnimationFrame(applyMomentum);
        } else {
          setMomentum(0);
          setIsPaused(false);
        }
      };
      animationRef.current = requestAnimationFrame(applyMomentum);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [momentum, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    setIsPaused(true);
    setMomentum(0);
    lastMouseX.current = e.pageX;
    velocityRef.current = 0;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Aplicar momentum basado en la velocidad
    if (Math.abs(velocityRef.current) > 2) {
      setMomentum(velocityRef.current * 0.5);
    } else {
      setTimeout(() => setIsPaused(false), 100);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Reducido de 2 a 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk;
    
    // Calcular velocidad para momentum
    velocityRef.current = e.pageX - lastMouseX.current;
    lastMouseX.current = e.pageX;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    setIsPaused(true);
    setMomentum(0);
    lastMouseX.current = e.touches[0].pageX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    // Prevenir scroll vertical en móviles
    e.preventDefault();
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    
    // Calcular velocidad para momentum
    velocityRef.current = e.touches[0].pageX - lastMouseX.current;
    lastMouseX.current = e.touches[0].pageX;
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Aplicar momentum basado en la velocidad
    if (Math.abs(velocityRef.current) > 2) {
      setMomentum(velocityRef.current * 0.5);
    } else {
      setTimeout(() => setIsPaused(false), 100);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Prevenir navegación si estamos arrastrando
    if (Math.abs(velocityRef.current) > 5) {
      e.preventDefault();
    }
  };

  return (
    <div 
      className="relative w-full overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 py-8 rounded-2xl"
      onMouseEnter={() => !isDragging && setIsPaused(true)}
      onMouseLeave={() => !isDragging && setIsPaused(false)}
    >
      {/* Gradientes laterales */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-blue-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-purple-50 to-transparent z-10 pointer-events-none" />
      
      <div 
        ref={scrollRef}
        className="ticker-wrapper overflow-x-auto touch-pan-x"
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
                key={`${item.name}-${index}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ticker-item"
                draggable={false}
                onClick={handleClick}
                style={{
                  '--brand-color': item.color || '#6366f1'
                } as React.CSSProperties}
              >
                <div className="logo-wrapper">
                  <IconComponent className="w-8 h-8" />
                </div>
                <div className="item-details">
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
          touch-action: pan-x;
        }

        .ticker-wrapper::-webkit-scrollbar {
          display: none;
        }

        .ticker-wrapper:active {
          cursor: grabbing;
        }

        .ticker-content {
          display: inline-flex;
          animation: scroll 60s linear infinite;
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
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          color: inherit;
          transform: scale(1);
          user-select: none;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }

        .ticker-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, var(--brand-color) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .ticker-item:hover {
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
          transform: scale(1.05) translateY(-2px);
          background: white;
        }

        .ticker-item:hover::before {
          opacity: 0.1;
        }

        .ticker-item:hover .logo-wrapper {
          transform: rotate(5deg) scale(1.1);
        }

        .ticker-item:hover .item-name {
          color: var(--brand-color);
        }

        .logo-wrapper {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .item-details {
          position: relative;
          z-index: 1;
        }

        .item-name {
          font-weight: 600;
          font-size: 14px;
          line-height: 1.2;
          transition: color 0.3s ease;
        }

        .item-category {
          font-size: 11px;
          opacity: 0.6;
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
            animation-duration: 30s;
          }

          .ticker-item {
            padding: 10px 16px;
            margin: 0 8px;
          }
          
          .logo-wrapper {
            width: 28px;
            height: 28px;
          }
          
          .logo-wrapper svg {
            width: 24px;
            height: 24px;
          }
          
          .item-name {
            font-size: 13px;
          }
          
          .item-category {
            font-size: 10px;
          }
        }

        /* Indicador visual de arrastre */
        @media (hover: hover) {
          .ticker-wrapper:hover {
            box-shadow: inset 0 0 0 2px rgba(99, 102, 241, 0.1);
            border-radius: 1rem;
          }
        }
      `}</style>
    </div>
  );
}