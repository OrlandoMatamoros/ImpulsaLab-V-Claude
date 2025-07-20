import React from 'react';

// Importamos solo los iconos que seguro existen
import { 
  siOpenai,
  siGoogle,
  siFigma,
  siCanva,
  siNotion,
  siFramer,
  siSketch,
  siWebflow,
  siPenpot,
  siObsidian,
  siClickup,
  siAirtable,
  siAsana,
  siGrammarly,
  siGithub,
  siReplit,
  siBuffer,
  siHootsuite,
  siDuolingo,
  siCoursera,
  siDiscord,
  siSlack,
  siZoom,
  siTrello,
  siJira,
  siWordpress,
  siShopify,
  siStripe,
  siMailchimp,
  siGoogleanalytics,
  siFacebook,
  siInstagram,
  siTiktok,
  siYoutube,
  siSpotify,
  siTwitch,
  siReddit,
  siPinterest
} from 'simple-icons/icons';

// Helper component para renderizar SVGs de simple-icons
const SimpleIcon: React.FC<{ icon: any; className?: string }> = ({ icon, className }) => {
  if (!icon || !icon.svg) return <DefaultIcon className={className} />;
  
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      dangerouslySetInnerHTML={{ __html: icon.svg }}
    />
  );
};

// Default icon para cuando no encontramos el logo
export const DefaultIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
  </svg>
);

// Para herramientas sin logo en simple-icons, creamos iconos personalizados
export const CustomIcons: { [key: string]: React.FC<{ className?: string }> } = {
  'ChatGPT': ({ className }) => <SimpleIcon icon={siOpenai} className={className} />,
  'Claude': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.25 3a.75.75 0 0 0-.75.75v7.5a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75Zm-6 3a.75.75 0 0 0-.75.75v13.5a.75.75 0 0 0 1.5 0V6.75a.75.75 0 0 0-.75-.75Zm-4.5 3a.75.75 0 0 0-.75.75v7.5a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75Z"/>
    </svg>
  ),
  'Perplexity': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
    </svg>
  ),
  'Microsoft Copilot': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12L12 3v6H3v6h9v6l9-9z"/>
    </svg>
  ),
  'Copilot': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12L12 3v6H3v6h9v6l9-9z"/>
    </svg>
  ),
  'Adobe Firefly': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L3 20h5l2-5h4l2 5h5L12 2zm0 8l1.5 3.5h-3L12 10z"/>
    </svg>
  ),
  'Midjourney': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.5L18.5 12 12 18.5 5.5 12 12 5.5zm0 3L8.5 12l3.5 3.5L15.5 12 12 8.5z"/>
    </svg>
  ),
  'Leonardo AI': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L3 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 3.13L18 8v8.87c0 4.11-2.87 7.87-6 8.87-3.13-1-6-4.76-6-8.87V8l6-2.87z"/>
    </svg>
  ),
  'ElevenLabs': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4h4v16H4V4zm6 0h4v16h-4V4zm6 0h4v16h-4V4z"/>
    </svg>
  ),
  'Synthesia': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
    </svg>
  ),
  'RunwayML': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm7 15c0 4.52-3.28 8.52-7 9.47-3.72-.95-7-4.95-7-9.47V8.3l7-3.11 7 3.11V17z"/>
    </svg>
  ),
  'Stable Diffusion': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
    </svg>
  ),
  'Bing Image Creator': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 3l3.5 1.5v10L5 18V3zm3.5 11L18 19v-4l-6-3.5V14zm11-9.5L12 8v5l7.5 3.5v-12z"/>
    </svg>
  ),
  'Monday': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <ellipse cx="12" cy="12" rx="3" ry="3"/>
      <ellipse cx="12" cy="4" rx="2" ry="2"/>
      <ellipse cx="6" cy="8" rx="2" ry="2"/>
      <ellipse cx="18" cy="8" rx="2" ry="2"/>
      <ellipse cx="6" cy="16" rx="2" ry="2"/>
      <ellipse cx="18" cy="16" rx="2" ry="2"/>
      <ellipse cx="12" cy="20" rx="2" ry="2"/>
    </svg>
  ),
  'Monday.com': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <ellipse cx="12" cy="12" rx="3" ry="3"/>
      <ellipse cx="12" cy="4" rx="2" ry="2"/>
      <ellipse cx="6" cy="8" rx="2" ry="2"/>
      <ellipse cx="18" cy="8" rx="2" ry="2"/>
      <ellipse cx="6" cy="16" rx="2" ry="2"/>
      <ellipse cx="18" cy="16" rx="2" ry="2"/>
      <ellipse cx="12" cy="20" rx="2" ry="2"/>
    </svg>
  ),
  'Tableau': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.5 4.5v-3h1v3h3v1h-3v3h-1v-3h-3v-1h3zm7 5v4h4v1h-4v4h-1v-4h-4v-1h4v-4h1zm-13 0v4h4v1h-4v4h-1v-4h-4v-1h4v-4h1zm7 5v3h3v1h-3v3h-1v-3h-3v-1h3v-3h1z"/>
    </svg>
  ),
  'Power BI': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2v20l10-10L12 2zM11 22V2L2 12l9 10z"/>
    </svg>
  ),
  'LinkedIn': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  ),
  'Twitter': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  'Google Ads': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.61 11.61L11.61 3.61C12.39 2.83 13.61 2.83 14.39 3.61L20.39 9.61C21.17 10.39 21.17 11.61 20.39 12.39L12.39 20.39C11.61 21.17 10.39 21.17 9.61 20.39L3.61 14.39C2.83 13.61 2.83 12.39 3.61 11.61M5.03 13L11 18.97L18.97 11L13 5.03L5.03 13Z"/>
    </svg>
  ),
  // Más iconos personalizados según necesites...
};

// Mapeo de nombres de herramientas a iconos
const iconMapping: { [key: string]: any } = {
  // Diseño
  'Figma': siFigma,
  'Canva': siCanva,
  'Framer': siFramer,
  'Sketch': siSketch,
  'Webflow': siWebflow,
  'Penpot': siPenpot,
  
  // Productividad
  'Notion': siNotion,
  'Obsidian': siObsidian,
  'ClickUp': siClickup,
  'Airtable': siAirtable,
  'Asana': siAsana,
  'Trello': siTrello,
  'Jira': siJira,
  
  // Escritura
  'Grammarly': siGrammarly,
  
  // Código
  'GitHub Copilot': siGithub,
  'Replit': siReplit,
  
  // Marketing & SEO
  'Google Analytics': siGoogleanalytics,
  'Mailchimp': siMailchimp,
  'Buffer': siBuffer,
  'Hootsuite': siHootsuite,
  
  // E-commerce
  'Shopify': siShopify,
  'WooCommerce': siWordpress,
  'Stripe': siStripe,
  
  // Social Media
  'Instagram': siInstagram,
  'TikTok': siTiktok,
  'YouTube': siYoutube,
  'Pinterest': siPinterest,
  'Reddit': siReddit,
  'Facebook': siFacebook,
  
  // Comunicación
  'Slack': siSlack,
  'Discord': siDiscord,
  'Zoom': siZoom,
  
  // Educación
  'Duolingo': siDuolingo,
  'Coursera': siCoursera,
  
  // Streaming
  'Spotify': siSpotify,
  'Twitch': siTwitch,
};

// Helper function to get icon by name
export const getToolIcon = (toolName: string): React.FC<{ className?: string }> => {
  // Primero busca en los iconos personalizados
  if (CustomIcons[toolName]) {
    return CustomIcons[toolName];
  }
  
  // Luego busca en simple-icons
  const simpleIcon = iconMapping[toolName];
  if (simpleIcon) {
    return ({ className }) => <SimpleIcon icon={simpleIcon} className={className} />;
  }
  
  // Si no encuentra nada, devuelve el icono por defecto
  return DefaultIcon;
};
