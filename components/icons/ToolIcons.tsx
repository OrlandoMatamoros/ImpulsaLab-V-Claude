import React from 'react';

// Logos SVG reales de las marcas
export const logos: Record<string, React.FC<{ className?: string }>> = {
  // Ejemplo de logo real de Canva
  'Canva': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#00C4CC"/>
      <path d="M65.5 65.5C59.5 71.5 51.5 75 42.5 75C23.5 75 8 59.5 8 40.5C8 21.5 23.5 6 42.5 6C51.5 6 59.5 9.5 65.5 15.5" 
            stroke="white" strokeWidth="6" strokeLinecap="round"/>
    </svg>
  ),

  // Ejemplo de logo de Figma
  'Figma': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5Z" fill="#F24E1E"/>
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2Z" fill="#FF7262"/>
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Z" fill="#A259FF"/>
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 0 1-7 0Z" fill="#0ACF83"/>
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5Z" fill="#1ABCFE"/>
    </svg>
  ),

  // Ejemplo de logo de Notion
  'Notion': ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.32 26.742L61.76 14.66c5.473-1.54 6.918-.154 10.347 2.31l14.235 10.04c2.31 1.694 3.118 2.155 3.118 3.965v53.404c0 3.35-1.232 5.314-5.582 5.622L30.476 94.66c-3.273.153-4.874-.308-6.588-2.464L8.268 71.052c-2.002-2.773-2.773-4.874-2.773-7.338V33.66c0-2.773 1.232-5.16 4.543-5.468l7.282-1.45z" 
            fill="#000000"/>
      <path d="M61.76 14.66L17.32 26.742c-3.31.918-4.543 2.695-4.543 5.468v30.054c0 2.464.771 4.565 2.773 7.338l15.62 21.144c1.714 2.156 3.315 2.617 6.588 2.464l53.402-4.659c4.35-.308 5.582-2.272 5.582-5.622V29.925c0-1.256-.462-1.893-1.425-2.618a41.13 41.13 0 0 0-1.693-1.347L79.389 15.92c-3.43-2.464-4.874-3.85-10.347-2.31L61.76 14.66z" 
            fill="white"/>
      <path d="M60.938 24.853c.925-.154 1.387.463 1.85.926l2.31 1.694c.463.462.154.925-.462 1.08l-7.493 1.231c-.924.154-1.694-.463-1.232-1.08l1.848-2.464c.309-.463.617-.77 1.079-.925l2.1-.462zm-26.12 5.621l29.747-5.16c.617-.153 1.08.31.617.926l-1.694 2.002c-.308.463-.77.617-1.387.77L32.2 33.98c-.617.154-1.08-.308-.617-.925l2.002-2.31c.309-.308.617-.463 1.233-.617v.346z" 
            fill="#000000"/>
    </svg>
  ),

  // Ejemplo de logo de Slack
  'Slack': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
      <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.527 2.527 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.527 2.527 0 0 1 2.521 2.521 2.527 2.527 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
      <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.527 2.527 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.527 2.527 0 0 1-2.522 2.521 2.527 2.527 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.521 2.522v6.312z" fill="#2EB67D"/>
      <path d="M15.165 18.956a2.528 2.528 0 0 1 2.521 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.521-2.522v-2.522h2.521zm0-1.27a2.527 2.527 0 0 1-2.521-2.522 2.527 2.527 0 0 1 2.521-2.521h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.521h-6.313z" fill="#ECB22E"/>
    </svg>
  ),

  // Ejemplo de logo de GitHub
  'GitHub Copilot': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" 
            fill="#181717"/>
    </svg>
  ),

  // Ejemplo de logo de OpenAI/ChatGPT
  'ChatGPT': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" 
            fill="#00A67E"/>
    </svg>
  ),

  // Claude (Anthropic)
  'Claude': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#D97757"/>
      <path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8c1.85 0 3.55-.63 4.9-1.69L18 17l-1.3-1.3A5.82 5.82 0 0 0 18 12c0-3.31-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="white"/>
    </svg>
  ),

  // Gemini (Google)
  'Gemini': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="12" r="6" fill="#4285F4"/>
      <circle cx="16" cy="12" r="6" fill="#34A853"/>
      <path d="M8 6 A6 6 0 0 1 8 18 A6 6 0 0 1 16 18 A6 6 0 0 1 16 6 A6 6 0 0 1 8 6" fill="#EA4335" opacity="0.8"/>
    </svg>
  ),

  // Midjourney
  'Midjourney': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#5865F2"/>
      <path d="M6 6v12l3-6 3 6 3-6 3 6V6l-3 6-3-6-3 6-3-6z" fill="white"/>
    </svg>
  ),

  // Discord
  'Discord': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" fill="#5865F2"/>
    </svg>
  ),

  // Zoom
  'Zoom': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="#2D8CFF"/>
      <path d="M14.5 7h-9C4.67 7 4 7.67 4 8.5v7c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-2l4 2.5v-9L16 9.5v-2c0-.83-.67-1.5-1.5-1.5z" fill="white"/>
    </svg>
  ),

  // Perplexity
  'Perplexity': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#20B2AA"/>
      <path d="M12 3l-1.5 4.5L6 9l3.5 2.5L8 16l4-2.5L16 16l-1.5-4.5L18 9l-4.5-1.5L12 3z" fill="white"/>
    </svg>
  ),

  // DALL-E 3
  'DALL-E 3': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#00A67E"/>
      <rect x="4" y="4" width="7" height="7" rx="1" fill="white"/>
      <rect x="13" y="4" width="7" height="7" rx="1" fill="white"/>
      <rect x="4" y="13" width="7" height="7" rx="1" fill="white"/>
      <rect x="13" y="13" width="7" height="7" rx="1" fill="white"/>
    </svg>
  ),

  // Stable Diffusion
  'Stable Diffusion': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#9333EA"/>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="white" opacity="0.3"/>
      <circle cx="12" cy="12" r="5" fill="white"/>
    </svg>
  ),

  // Adobe Firefly
  'Adobe Firefly': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#FF0000"/>
      <path d="M16.5 7.5c0 3-1.5 5.5-3.5 6.5-2-1-3.5-3.5-3.5-6.5 0-1.5.5-3 1.5-4 .5 1 1.5 1.5 2 1.5s1.5-.5 2-1.5c1 1 1.5 2.5 1.5 4z" fill="white"/>
      <circle cx="8" cy="17" r="2" fill="white" opacity="0.8"/>
      <circle cx="16" cy="17" r="2" fill="white" opacity="0.8"/>
    </svg>
  ),

  // Framer
  'Framer': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#0055FF"/>
      <path d="M5 5h14v7H12v7H5V5z" fill="white" opacity="0.9"/>
      <path d="M12 12h7l-7 7v-7z" fill="white" opacity="0.7"/>
    </svg>
  ),

  // ElevenLabs
  'ElevenLabs': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#000000"/>
      <path d="M7 7v10M10 5v14M13 9v6M16 7v10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  // Cursor
  'Cursor': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#000000"/>
      <path d="M6 6l6 12 2.5-5.5L20 10 6 6z" fill="white"/>
    </svg>
  ),

  // Zapier
  'Zapier': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#FF4A00"/>
      <path d="M12 4L6 12l6 8 6-8-6-8z" fill="white"/>
      <path d="M12 9v6M9 12h6" stroke="#FF4A00" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  // Stripe
  'Stripe': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#635BFF"/>
      <path d="M13.5 8.5c0-.83-.67-1.5-1.5-1.5H8v10h2v-3h2c.83 0 1.5-.67 1.5-1.5v-4zm6.5 1.5c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55.45 1 1 1s1-.45 1-1v-5z" fill="white"/>
    </svg>
  ),

  // Grammarly
  'Grammarly': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#15B67A"/>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.58-.5 5.07-1.38l-1.42-1.42A7.94 7.94 0 0 1 12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8c0 .89-.15 1.75-.41 2.54l1.52 1.52c.57-1.22.89-2.58.89-4.06 0-5.52-4.48-10-10-10z" fill="white"/>
      <path d="M16 8l-6 6-2-2-1.5 1.5L10 17l7.5-7.5L16 8z" fill="white"/>
    </svg>
  ),

  // Copilot (Microsoft)
  'Copilot': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#0078D4"/>
      <path d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm4 9h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z" fill="white"/>
    </svg>
  ),

  // Leonardo AI
  'Leonardo AI': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#5C16C5"/>
      <path d="M12 4l-8 8 8 8 8-8-8-8zm0 3.5L16.5 12 12 16.5 7.5 12 12 7.5z" fill="white"/>
    </svg>
  ),

  // RunwayML
  'RunwayML': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#000000"/>
      <path d="M5 12h14M8 8l4 4-4 4M16 8l-4 4 4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Synthesia
  'Synthesia': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#4353FF"/>
      <circle cx="12" cy="9" r="3" fill="white"/>
      <path d="M12 14c-3.31 0-6 1.79-6 4v1h12v-1c0-2.21-2.69-4-6-4z" fill="white"/>
    </svg>
  ),

  // Buffer
  'Buffer': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#168EEA"/>
      <path d="M19 6l-7-3-7 3 7 3 7-3zM19 10l-7 3-7-3M19 14l-7 3-7-3M19 18l-7 3-7-3" stroke="white" strokeWidth="2" fill="none"/>
    </svg>
  ),

  // Mailchimp
  'Mailchimp': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#FFE01B"/>
      <circle cx="12" cy="10" r="5" fill="#000000"/>
      <path d="M7 15c0 2.76 2.24 5 5 5s5-2.24 5-5" stroke="#000000" strokeWidth="2" fill="none"/>
    </svg>
  ),

  // HubSpot
  'HubSpot': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#FF7A59"/>
      <circle cx="12" cy="12" r="3" fill="white"/>
      <path d="M12 4v5M12 15v5M4 12h5M15 12h5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  // Shopify
  'Shopify': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#96BF48"/>
      <path d="M15.5 6.5c-.3-1.5-1.5-2.5-3-2.5s-2.7 1-3 2.5L8 18l4-1 4-1-1.5-9.5z" fill="white"/>
      <circle cx="10" cy="19" r="1.5" fill="white"/>
      <circle cx="14" cy="19" r="1.5" fill="white"/>
    </svg>
  ),

  // Google Analytics
  'Google Analytics': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#E37400"/>
      <rect x="5" y="14" width="3" height="6" rx="1.5" fill="white"/>
      <rect x="10.5" y="8" width="3" height="12" rx="1.5" fill="white"/>
      <rect x="16" y="4" width="3" height="16" rx="1.5" fill="white"/>
    </svg>
  ),

  // Poe
  'Poe': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#7B3FF2"/>
      <path d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="white"/>
      <circle cx="12" cy="12" r="2" fill="white"/>
    </svg>
  ),

  // Vercel
  'Vercel': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#000000"/>
      <path d="M12 5l8 14H4l8-14z" fill="white"/>
    </svg>
  ),

  // Replit
  'Replit': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#F26207"/>
      <path d="M12 4v8h8c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" fill="white"/>
      <circle cx="12" cy="12" r="3" fill="#F26207"/>
    </svg>
  ),

  // Instagram
  'Instagram': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill="url(#instagram-gradient)"/>
      <rect x="5" y="5" width="14" height="14" rx="4" stroke="white" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" fill="none"/>
      <circle cx="16.5" cy="7.5" r="1" fill="white"/>
      <defs>
        <linearGradient id="instagram-gradient" x1="0" y1="24" x2="24" y2="0">
          <stop offset="0%" stopColor="#405DE6"/>
          <stop offset="50%" stopColor="#E1306C"/>
          <stop offset="100%" stopColor="#FCAF45"/>
        </linearGradient>
      </defs>
    </svg>
  ),

  // LinkedIn
  'LinkedIn': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#0A66C2"/>
      <path d="M8 11v8M8 7v.01M12 11v8M16 11v8M12 11c0-1.66 1.34-3 3-3s3 1.34 3 3v8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),

  // TikTok
  'TikTok': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#000000"/>
      <path d="M19 7c-1.5 0-2.8-.8-3.5-2H14v10.5c0 1.9-1.6 3.5-3.5 3.5S7 17.4 7 15.5 8.6 12 10.5 12c.3 0 .7.1 1 .2v-1.7c-.3-.1-.7-.2-1-.2C7.5 10.3 5 12.8 5 15.8s2.5 5.5 5.5 5.5 5.5-2.5 5.5-5.5V9.5c1 .7 2.2 1.2 3.5 1.2V8.7c-.5 0-1-.2-1.5-.7z" fill="white"/>
    </svg>
  ),

  // Pinterest
  'Pinterest': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#E60023"/>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.28 2.67 7.93 6.44 9.39-.09-.8-.17-2.03.04-2.91.19-.79 1.22-5.17 1.22-5.17s-.31-.62-.31-1.54c0-1.44.84-2.52 1.88-2.52.89 0 1.32.67 1.32 1.47 0 .89-.57 2.23-.86 3.47-.25 1.04.52 1.89 1.54 1.89 1.85 0 3.28-1.95 3.28-4.77 0-2.49-1.79-4.24-4.35-4.24-2.96 0-4.7 2.22-4.7 4.52 0 .89.34 1.85.77 2.37.08.1.1.19.07.29-.08.33-.26 1.04-.29 1.19-.04.19-.15.23-.35.14-1.3-.61-2.11-2.51-2.11-4.04 0-3.28 2.39-6.3 6.88-6.3 3.61 0 6.42 2.58 6.42 6.02 0 3.59-2.26 6.48-5.4 6.48-1.06 0-2.05-.55-2.39-1.2l-.65 2.48c-.23.91-.87 2.04-1.29 2.74.97.3 2 .46 3.08.46 5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="white"/>
    </svg>
  ),

  // Duolingo
  'Duolingo': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#58CC02"/>
      <ellipse cx="12" cy="10" rx="6" ry="5" fill="white"/>
      <circle cx="10" cy="10" r="2" fill="#58CC02"/>
      <circle cx="14" cy="10" r="2" fill="#58CC02"/>
      <path d="M8 15c0 2.21 1.79 4 4 4s4-1.79 4-4" stroke="white" strokeWidth="2" fill="none"/>
    </svg>
  ),

  // Twitter/X
  'Twitter/X': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#000000"/>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"/>
    </svg>
  ),

  // YouTube
  'YouTube': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#FF0000"/>
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z" fill="white"/>
    </svg>
  ),

  // Coursera
  'Coursera': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#0056D2"/>
      <path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8c1.06 0 2.07-.21 3-.59v-2.59c-.63.84-1.63 1.38-2.75 1.38-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5c1.12 0 2.12.54 2.75 1.38V9.59c-.93-.38-1.94-.59-3-.59z" fill="white"/>
    </svg>
  ),

  // AWS
  'AWS': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#232F3E"/>
      <path d="M6.76 14.82c1.64 1.21 4.03 1.86 6.08 1.86 1.5 0 3.15-.31 4.54-.93.3-.13.56.2.26.43-1.41 1.38-3.68 2.18-5.57 2.18-2.64 0-5.02-.98-6.82-2.6-.14-.13-.01-.32.17-.22.43.25.87.47 1.34.66v.62zm9.89-1.12c.18-.23.24-.54.13-.63-.48-.4-3.14-.18-3.58-.09-.11.02-.13-.08-.03-.16.75-.53 1.98-.38 2.13-.2.14.18-.04 1.44-.74 2.04-.17.15-.34.07-.26-.12.16-.4.52-1.29.7-1.52l-.35.68z" fill="#FF9900"/>
      <path d="M16.5 9.5c0-.83-.17-1.58-.51-2.25s-.81-1.25-1.42-1.72-1.33-.84-2.17-1.09S10.71 4 9.76 4c-.7 0-1.37.11-2.01.32s-1.21.52-1.7.93-.88.9-1.17 1.47S4.5 8.11 4.5 8.91c0 .9.23 1.66.68 2.27s1.08 1.08 1.88 1.41c.59.24 1.21.43 1.87.56s1.33.23 2.01.29c.68.07 1.33.1 1.97.1h.74v-.5c0 .65-.14 1.15-.42 1.49s-.68.51-1.2.51c-.4 0-.73-.11-1-.34s-.41-.55-.44-.97h-3.3c.03.63.18 1.19.46 1.68s.66.9 1.14 1.23 1.04.58 1.68.75 1.33.26 2.07.26c.78 0 1.49-.1 2.13-.29s1.19-.48 1.65-.87.81-.87 1.06-1.44.38-1.24.38-2.01V9.5h.14zm-3.39 2.82c-.59-.06-1.13-.15-1.63-.26s-.93-.27-1.29-.46-.64-.43-.84-.7-.3-.59-.3-.95c0-.42.15-.77.46-1.05s.71-.42 1.21-.42c.36 0 .68.07.97.21s.53.33.74.57.37.52.48.85.17.68.17 1.05v1.24c-.66 0-1.31-.03-1.97-.08z" fill="white"/>
    </svg>
  ),

  // Microsoft Teams
  'Microsoft Teams': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#6264A7"/>
      <rect x="11" y="6" width="8" height="8" rx="1" fill="white"/>
      <path d="M15 10h3v7c0 1.1-.9 2-2 2h-5c-1.1 0-2-.9-2-2v-3h6v-4z" fill="white" opacity="0.8"/>
      <circle cx="8" cy="8" r="3" fill="white"/>
    </svg>
  ),

  // Trello
  'Trello': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#0079BF"/>
      <rect x="5" y="5" width="6" height="10" rx="1" fill="white"/>
      <rect x="13" y="5" width="6" height="14" rx="1" fill="white"/>
    </svg>
  ),

  // Asana
  'Asana': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#F06A6A"/>
      <circle cx="8" cy="12" r="3" fill="white"/>
      <circle cx="16" cy="8" r="3" fill="white"/>
      <circle cx="16" cy="16" r="3" fill="white"/>
    </svg>
  ),

  // Monday
  'Monday': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#FF3D71"/>
      <rect x="5" y="8" width="4" height="8" rx="2" fill="white"/>
      <rect x="10" y="5" width="4" height="11" rx="2" fill="white"/>
      <rect x="15" y="10" width="4" height="6" rx="2" fill="white"/>
    </svg>
  ),

  // ClickUp
  'ClickUp': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#7B68EE"/>
      <path d="M8 12l3 3 5-6" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M5 8V6c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  // Obsidian
  'Obsidian': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#7C3AED"/>
      <path d="M12 5l-6 7 6 7 6-7-6-7zm0 3l3 3.5-3 3.5-3-3.5L12 8z" fill="white"/>
    </svg>
  ),

  // Suno AI
  'Suno AI': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#FA5252"/>
      <path d="M8 8v8M6 10v4M10 6v12M12 8v8M14 10v4M16 7v10M18 9v6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),

  // Jasper
  'Jasper': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#5C16C5"/>
      <path d="M12 4v16M8 6l4-2 4 2M8 18l4 2 4-2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),

  // Copy.ai
  'Copy.ai': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#7C3AED"/>
      <rect x="5" y="5" width="10" height="10" rx="1" stroke="white" strokeWidth="2" fill="none"/>
      <rect x="9" y="9" width="10" height="10" rx="1" fill="white"/>
    </svg>
  ),

  // Writesonic
  'Writesonic': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#006AFF"/>
      <path d="M5 7h14M5 12h10M5 17h14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="18" cy="12" r="2" fill="white"/>
    </svg>
  ),

  // Tabnine
  'Tabnine': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#FF6B6B"/>
      <path d="M6 8h12v2H6zM6 14h8v2H6z" fill="white"/>
      <path d="M16 13l3 3-3 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),

  // Make
  'Make': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#6D00CC"/>
      <circle cx="8" cy="12" r="2" fill="white"/>
      <circle cx="16" cy="12" r="2" fill="white"/>
      <path d="M10 12h4" stroke="white" strokeWidth="2"/>
    </svg>
  ),

  // n8n
  'n8n': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#EA4B71"/>
      <path d="M8 8v8h2v-5.5L14 16h2V8h-2v5.5L10 8H8z" fill="white"/>
    </svg>
  ),

  // Semrush
  'Semrush': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#FF642D"/>
      <path d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm3 9h-2v2c0 .55-.45 1-1 1s-1-.45-1-1v-2H9c-.55 0-1-.45-1-1s.45-1 1-1h2V9c0-.55.45-1 1-1s1 .45 1 1v2h2c.55 0 1 .45 1 1s-.45 1-1 1z" fill="white"/>
    </svg>
  ),

  // Ahrefs
  'Ahrefs': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#FF6B00"/>
      <path d="M12 4l-8 16h6l2-4h4l2 4h6L12 4zm0 6l2 4h-4l2-4z" fill="white"/>
    </svg>
  ),

  // Mixpanel
  'Mixpanel': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#7856FF"/>
      <rect x="5" y="5" width="6" height="6" rx="3" fill="white"/>
      <rect x="13" y="5" width="6" height="6" rx="3" fill="white"/>
      <rect x="5" y="13" width="6" height="6" rx="3" fill="white"/>
      <rect x="13" y="13" width="6" height="6" rx="3" fill="white"/>
    </svg>
  ),

  // PayPal
  'PayPal': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#003087"/>
      <path d="M15.5 7H9.5C8.67 7 8 7.67 8 8.5V16l2-2h5.5c.83 0 1.5-.67 1.5-1.5v-4c0-.83-.67-1.5-1.5-1.5z" fill="white"/>
      <path d="M13 10h-2.5c-.55 0-1 .45-1 1v4l1.5-1.5H13c.55 0 1-.45 1-1V11c0-.55-.45-1-1-1z" fill="#179BD7"/>
    </svg>
  ),

  // Supabase
  'Supabase': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#3ECF8E"/>
      <path d="M12 5c-3.87 0-7 3.13-7 7 0 3.17 2.11 5.85 5 6.71V16c-1.24-.42-2.13-1.59-2.13-2.97 0-1.73 1.4-3.13 3.13-3.13s3.13 1.4 3.13 3.13c0 1.38-.89 2.55-2.13 2.97v2.71c2.89-.86 5-3.54 5-6.71 0-3.87-3.13-7-7-7z" fill="white"/>
    </svg>
  ),

  // Netlify
  'Netlify': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#00C7B7"/>
      <path d="M12 3l9 9-9 9-9-9 9-9zm0 3.5L8.5 10 12 13.5 15.5 10 12 6.5z" fill="white"/>
    </svg>
  ),

  // Cloudflare
  'Cloudflare': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#F38020"/>
      <path d="M16.5 11c0-.28-.22-.5-.5-.5h-5c-.28 0-.5.22-.5.5s.22.5.5.5h5c.28 0 .5-.22.5-.5zm1.29 2.06c.04.13.06.27.06.41 0 .76-.62 1.38-1.38 1.38H7.38c-.3 0-.54-.24-.54-.54 0-.06.01-.13.03-.19.44-1.67 1.96-2.9 3.76-2.9.07 0 .14 0 .21.01-.09-.28-.14-.58-.14-.89 0-1.62 1.31-2.93 2.93-2.93 1.3 0 2.4.85 2.78 2.03.14-.04.29-.06.44-.06 1.19 0 2.16.97 2.16 2.16 0 .19-.03.38-.07.56l-.15-.04z" fill="white"/>
    </svg>
  ),

  // IFTTT
  'IFTTT': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#000000"/>
      <rect x="4" y="10" width="4" height="4" fill="white"/>
      <rect x="10" y="10" width="4" height="4" fill="white"/>
      <rect x="16" y="10" width="4" height="4" fill="white"/>
    </svg>
  ),

  // Google Cloud
  'Google Cloud': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#4285F4"/>
      <path d="M12 8h4l-2-3.46L12 8zm6.93 1c-.21-.66-.57-1.25-1.03-1.74L16 10h3.72c.14.31.23.64.28 1h-4v2h3.72c-.37 1.07-1.14 1.97-2.15 2.47L19 18l2.59-1.5c.89-1.33 1.41-2.93 1.41-4.5 0-.34-.03-.67-.07-1zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4c1.04 0 1.99.4 2.7 1.05l1.41-1.41C14.91 6.63 13.52 6 12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c1.66 0 3.16-.68 4.24-1.76L14.83 14.83C14.08 15.57 13.09 16 12 16z" fill="white"/>
    </svg>
  ),

  // Microsoft Azure
  'Microsoft Azure': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#0078D4"/>
      <path d="M13.5 5L8 19h3.5l1.5-3h6l-5.5-11zm-6 2L5 15.5 9.5 17 12 10.5 7.5 7z" fill="white"/>
    </svg>
  ),

  // Hotjar
  'Hotjar': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#FF3C00"/>
      <path d="M12 4c-2.21 0-4 1.79-4 4v4c0 2.21 1.79 4 4 4s4-1.79 4-4V8c0-2.21-1.79-4-4-4zm0 10c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2s2 .9 2 2v4c0 1.1-.9 2-2 2z" fill="white"/>
      <path d="M10 16v2c0 1.1.9 2 2 2s2-.9 2-2v-2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  // Reddit
  'Reddit': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#FF4500"/>
      <circle cx="12" cy="14" r="6" fill="white"/>
      <circle cx="9.5" cy="13.5" r="1.5" fill="#FF4500"/>
      <circle cx="14.5" cy="13.5" r="1.5" fill="#FF4500"/>
      <path d="M9 16c0 1.66 1.34 3 3 3s3-1.34 3-3" stroke="#FF4500" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="7" cy="10" r="2" fill="white"/>
      <circle cx="17" cy="10" r="2" fill="white"/>
      <circle cx="12" cy="5" r="1" fill="white"/>
      <path d="M12 6v3" stroke="white" strokeWidth="1"/>
    </svg>
  ),

  // Anthropic
  'Anthropic': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#D97757"/>
      <path d="M12 4l-6 16h3l1.2-3.2h7.6L19 20h3L16 4h-4zm0 5.5L14 15h-4l2-5.5z" fill="white"/>
    </svg>
  ),

  // OpenAI
  'OpenAI': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#00A67E"/>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" fill="white"/>
    </svg>
  ),

  // Hugging Face
  'Hugging Face': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#FFD21E"/>
      <circle cx="12" cy="12" r="8" fill="#000000"/>
      <circle cx="9" cy="10" r="1.5" fill="#FFD21E"/>
      <circle cx="15" cy="10" r="1.5" fill="#FFD21E"/>
      <path d="M8 14c0 2.21 1.79 4 4 4s4-1.79 4-4" stroke="#FFD21E" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),

  // Replicate
  'Replicate': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#000000"/>
      <path d="M8 8h8v8H8z" fill="white" opacity="0.3"/>
      <path d="M10 6h8v8h-2V8h-6V6z" fill="white" opacity="0.6"/>
      <path d="M6 10h8v8H6z" fill="white"/>
    </svg>
  ),

  // Cohere
  'Cohere': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#39594D"/>
      <circle cx="8" cy="12" r="3" fill="white"/>
      <circle cx="16" cy="12" r="3" fill="white"/>
      <path d="M11 12h2" stroke="white" strokeWidth="2"/>
    </svg>
  ),

  // Khan Academy
  'Khan Academy': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#14BF96"/>
      <path d="M12 4L4 12l8 8 8-8-8-8zm0 3l5 5-5 5-5-5 5-5z" fill="white"/>
      <circle cx="12" cy="12" r="2" fill="white"/>
    </svg>
  ),

  // WooCommerce
  'WooCommerce': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#96588A"/>
      <path d="M6 8c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1V8z" fill="white"/>
      <path d="M8 10l1.5 4 1.5-4 1.5 4 1.5-4" stroke="#96588A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // Facebook
  'Facebook': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#1877F2"/>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="white"/>
    </svg>
  ),

  // Udemy
  'Udemy': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#A435F0"/>
      <path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 12c-2.21 0-4-1.79-4-4V9c0-.55.45-1 1-1s1 .45 1 1v3c0 1.1.9 2 2 2s2-.9 2-2V9c0-.55.45-1 1-1s1 .45 1 1v3c0 2.21-1.79 4-4 4z" fill="white"/>
    </svg>
  ),

  // edX
  'edX': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#02262B"/>
      <path d="M8 7c0-.55.45-1 1-1h6c.55 0 1 .45 1 1v2c0 .55-.45 1-1 1H9c-.55 0-1-.45-1-1V7z" fill="white"/>
      <path d="M11 11h2c2.21 0 4 1.79 4 4s-1.79 4-4 4h-2c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1z" fill="white"/>
      <path d="M7 14h2v4H7c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1z" fill="white"/>
    </svg>
  ),

  // Skillshare
  'Skillshare': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#00FF84"/>
      <path d="M8 8h8c0 2.21-1.79 4-4 4s-4-1.79-4-4z" fill="#000000"/>
      <path d="M8 16c0-2.21 1.79-4 4-4s4 1.79 4 4H8z" fill="#000000"/>
    </svg>
  ),

  // DigitalOcean
  'DigitalOcean': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#0080FF"/>
      <path d="M12 19v-3h3v3h-3zm3-3h3v3h-3v-3zm0-3h3v3h-3v-3zm0-3c0-3.31-2.69-6-6-6s-6 2.69-6 6 2.69 6 6 6v-3c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3h3z" fill="white"/>
    </svg>
  ),

  // WhatsApp
  'WhatsApp': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#25D366"/>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="white"/>
    </svg>
  ),

  // Telegram
  'Telegram': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#229ED9"/>
      <path d="M18.384 5.224l-2.451 11.557c-.185.815-.668 1.019-1.353.634l-3.728-2.75-1.798 1.73c-.199.199-.366.366-.75.366l.267-3.794 6.914-6.248c.301-.267-.066-.417-.467-.15l-8.544 5.381-3.678-1.151c-.8-.25-.817-.8.167-1.184l14.373-5.54c.667-.25 1.248.15 1.032 1.15z" fill="white"/>
    </svg>
  ),

  // Etsy
  'Etsy': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#F14000"/>
      <path d="M8 7v10h8v-4h-5v-2h5V7H8zm7 8h-5v-6h5v2h-3v2h3v2z" fill="white"/>
    </svg>
  ),

  // Gumroad
  'Gumroad': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#36A9AE"/>
      <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="2" fill="none"/>
      <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  // Skype
  'Skype': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#00AFF0"/>
      <path d="M12.069 18.874c-4.023 0-5.82-1.979-5.82-3.464 0-.765.561-1.296 1.333-1.296 1.723 0 1.273 2.477 4.487 2.477 1.641 0 2.55-.895 2.55-1.811 0-.551-.269-1.16-1.354-1.429l-3.576-.895c-2.88-.724-3.403-2.286-3.403-3.751 0-3.047 2.861-4.191 5.549-4.191 2.471 0 5.393 1.373 5.393 3.199 0 .784-.688 1.24-1.453 1.24-1.469 0-1.198-2.037-4.164-2.037-1.469 0-2.292.664-2.292 1.617s1.153 1.258 2.157 1.487l2.637.587c2.891.649 3.624 2.346 3.624 3.944 0 2.476-1.902 4.324-5.722 4.324m11.084-4.882a9.466 9.466 0 01-1.625 3.774 6.477 6.477 0 01-3.699 3.708 9.448 9.448 0 01-3.778 1.625 6.604 6.604 0 01-.975.071 6.557 6.557 0 01-5.143-2.632A9.357 9.357 0 012.845 13.98a9.477 9.477 0 011.625-3.779A6.474 6.474 0 018.17 6.497a9.486 9.486 0 013.777-1.625 6.642 6.642 0 01.971-.071 6.557 6.557 0 015.143 2.632 9.35 9.35 0 015.093 6.559" fill="white"/>
    </svg>
  ),

  // Google Meet
  'Google Meet': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#00897B"/>
      <path d="M19 10v4c0 .55-.45 1-1 1h-2l-3 3V7l3 3h2c.55 0 1 .45 1 1z" fill="white"/>
      <path d="M5 9v6c0 .55.45 1 1 1h7V8H6c-.55 0-1 .45-1 1z" fill="white"/>
    </svg>
  ),

  // BigCommerce
  'BigCommerce': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#121118"/>
      <path d="M16 8H8v8h8V8zm-2 6h-4v-4h4v4z" fill="white"/>
      <path d="M6 6h12v2H6zM6 16h12v2H6z" fill="white" opacity="0.6"/>
    </svg>
  ),

  // Square
  'Square': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#3E4348"/>
      <rect x="6" y="6" width="12" height="12" rx="2" fill="white"/>
      <rect x="9" y="9" width="6" height="6" rx="1" fill="#3E4348"/>
    </svg>
  ),

  // Amplitude
  'Amplitude': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#136ACD"/>
      <path d="M12 4v16M8 8v8M16 8v8M5 10v4M19 10v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  // Tableau
  'Tableau': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#E97627"/>
      <rect x="10" y="4" width="4" height="16" fill="white"/>
      <rect x="4" y="10" width="16" height="4" fill="white"/>
      <rect x="6" y="6" width="3" height="3" fill="white"/>
      <rect x="15" y="6" width="3" height="3" fill="white"/>
      <rect x="6" y="15" width="3" height="3" fill="white"/>
      <rect x="15" y="15" width="3" height="3" fill="white"/>
    </svg>
  ),

  // Power BI
  'Power BI': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#F2C811"/>
      <rect x="5" y="12" width="3" height="7" rx="1" fill="#000000"/>
      <rect x="9" y="9" width="3" height="10" rx="1" fill="#000000"/>
      <rect x="13" y="6" width="3" height="13" rx="1" fill="#000000"/>
      <rect x="17" y="4" width="3" height="15" rx="1" fill="#000000"/>
    </svg>
  ),

  // Railway
  'Railway': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#853BCE"/>
      <path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm-2 12l-2-2 1.41-1.41L10 13.17l4.59-4.58L16 10l-6 6z" fill="white"/>
    </svg>
  ),

  // Heroku
  'Heroku': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#430098"/>
      <path d="M20 21h-16V3h16v18zM9 17l4-4-4-4v8zm7-11.5c0 .83-.67 1.5-1.5 1.5S13 6.33 13 5.5 13.67 4 14.5 4s1.5.67 1.5 1.5z" fill="white"/>
    </svg>
  ),

  // Pluralsight
  'Pluralsight': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#F15B2A"/>
      <path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm-2 11.5v-7l6 3.5-6 3.5z" fill="white"/>
      <path d="M15 12l-3 1.73V10.27L15 12z" fill="#F15B2A"/>
    </svg>
  ),

  // MasterClass
  'MasterClass': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#000000"/>
      <path d="M12 5l-1 6h2l-1-6zM10 13l-3 6h2.5l2.5-5 2.5 5H17l-3-6h-4z" fill="white"/>
    </svg>
  ),

  // Linear
  'Linear': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#5E6AD2"/>
      <path d="M5 7h14M5 12h14M5 17h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  // Coda
  'Coda': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#F46A54"/>
      <path d="M16 12c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="16" cy="8" r="2" fill="white"/>
    </svg>
  ),

  // Airtable
  'Airtable': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#FCB400"/>
      <rect x="5" y="5" width="6" height="6" rx="1" fill="white"/>
      <rect x="13" y="5" width="6" height="6" rx="1" fill="white"/>
      <rect x="5" y="13" width="6" height="6" rx="1" fill="white"/>
      <rect x="13" y="13" width="6" height="6" rx="1" fill="white"/>
    </svg>
  ),

  // Pika Labs
  'Pika Labs': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#FF4B4B"/>
      <circle cx="8" cy="10" r="2" fill="white"/>
      <circle cx="16" cy="10" r="2" fill="white"/>
      <path d="M7 15c0 2.76 2.24 5 5 5s5-2.24 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  ),

  // HeyGen
  'HeyGen': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#5C3EE8"/>
      <path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm-2 12v-8l6 4-6 4z" fill="white"/>
    </svg>
  ),

  // D-ID
  'D-ID': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#6C5CE7"/>
      <circle cx="12" cy="10" r="4" fill="white"/>
      <path d="M12 15c-3.31 0-6 1.79-6 4v1h12v-1c0-2.21-2.69-4-6-4z" fill="white"/>
      <circle cx="10" cy="10" r="1" fill="#6C5CE7"/>
      <circle cx="14" cy="10" r="1" fill="#6C5CE7"/>
    </svg>
  ),

  // Descript
  'Descript': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#5E5ADB"/>
      <path d="M6 8h12v2H6zM6 12h8v2H6zM6 16h10v2H6z" fill="white"/>
      <circle cx="17" cy="13" r="3" fill="white"/>
      <path d="M16.5 12l1 1-1 1" stroke="#5E5ADB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),

  // CodePen
  'CodePen': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#000000"/>
      <path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2z" stroke="white" strokeWidth="1.5" fill="none"/>
      <path d="M12 2v6.5m0 7v6.5M2 8.5l10 6.5 10-6.5M7 5.5v7M17 5.5v7" stroke="white" strokeWidth="1" opacity="0.6"/>
    </svg>
  ),

  // CodeSandbox
  'CodeSandbox': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#040404"/>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="white" strokeWidth="1.5" fill="none"/>
      <path d="M12 12v9M4 7.5L12 12l8-4.5M8 5L16 9.5" stroke="white" strokeWidth="1.5"/>
    </svg>
  ),

  // Moz
  'Moz': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#4285F4"/>
      <path d="M8 16V8l2.5 4L13 8l2.5 4L18 8v8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),

  // Segment
  'Segment': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#52BD94"/>
      <circle cx="6" cy="12" r="2" fill="white"/>
      <circle cx="12" cy="12" r="2" fill="white"/>
      <circle cx="18" cy="12" r="2" fill="white"/>
      <path d="M8 12h2M14 12h2" stroke="white" strokeWidth="2"/>
    </svg>
  ),

  // Looker
  'Looker': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#4285F4"/>
      <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="2" fill="white"/>
      <path d="M12 6v6M18 12h-6" stroke="white" strokeWidth="2"/>
    </svg>
  ),

  // Placeholder genérico para herramientas sin logo personalizado
  'default': ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="3" fill="currentColor"/>
    </svg>
  ),
};

// Función auxiliar para obtener el icono de una herramienta
export function getToolIcon(toolName: string): React.FC<{ className?: string }> {
  return logos[toolName] || logos['default'];
}

// Componente wrapper para iconos con fallback
export const ToolIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  const Icon = getToolIcon(name);
  return <Icon className={className} />;
};

/* 
  INSTRUCCIONES PARA AGREGAR NUEVOS LOGOS:
  
  1. Obtén el SVG oficial del logo de la herramienta
  2. Optimiza el SVG (puedes usar SVGOMG.com)
  3. Añade el logo al objeto 'logos' usando el nombre exacto de la herramienta
  4. Asegúrate de que el viewBox sea correcto para mantener las proporciones
  5. Usa los colores oficiales de la marca
  
  Ejemplo:
  
  'NombreHerramienta': ({ className }) => (
    <svg className={className} viewBox="0 0 [width] [height]" fill="none" xmlns="http://www.w3.org/2000/svg">
      // Contenido SVG aquí
    </svg>
  ),
  
  TIPS:
  - Mantén los SVGs simples y optimizados
  - Usa viewBox para hacer los SVGs responsivos
  - Si el logo tiene múltiples colores, mantenlos
  - Si el logo es monocromático, considera usar 'currentColor' para flexibilidad
*/