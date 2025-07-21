'use client';

import { useState, useRef, useEffect } from 'react';
import * as React from 'react';

interface TechTool {
  name: string;
  logo: React.ComponentType<{ className?: string }>;
  url: string;
  category: string;
  color?: string;
}

// ICONOS ESPECIALES IMPULSA LAB
const HerramientasIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
  </svg>
);

const AgentesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const DiagnosticoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
  </svg>
);

const NoticiasIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
  </svg>
);

// ICONOS DE HERRAMIENTAS
const ChatGPTIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
  </svg>
);

const ClaudeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.769 2.769A1 1 0 0 1 16.415 4L12.97 7.445a1 1 0 0 1-1.414 0L8.11 4a1 1 0 0 1 1.647-1.231L12 5.011l2.243-2.242ZM8.586 6.586a1 1 0 0 1 1.414 0L12 8.586l2-2a1 1 0 1 1 1.414 1.414l-2.707 2.707a1 1 0 0 1-1.414 0L8.586 8a1 1 0 0 1 0-1.414ZM12 12l4.243 4.243a1 1 0 0 1-1.414 1.414L12 14.828l-2.829 2.829a1 1 0 0 1-1.414-1.414L12 12Z"/>
  </svg>
);

const GeminiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L13.09 5.26L16 4L14.74 7.26L18 8L14.74 8.74L16 12L13.09 10.74L12 14L10.91 10.74L8 12L9.26 8.74L6 8L9.26 7.26L8 4L10.91 5.26L12 2ZM12 18L10.91 21.26L8 20L9.26 16.74L6 16L9.26 15.26L8 12L10.91 13.26L12 10L13.09 13.26L16 12L14.74 15.26L18 16L14.74 16.74L16 20L13.09 21.26L12 18Z"/>
  </svg>
);

const PerplexityIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zM12 4.3L19.5 8 12 11.7 4.5 8 12 4.3zM4 9.5l7 3.5v7l-7-3.5v-7zm16 0v7l-7 3.5v-7l7-3.5z"/>
  </svg>
);

const MidjourneyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM8 12l2.5 2.5L8 17l-2.5-2.5L8 12zm8 0l2.5 2.5L16 17l-2.5-2.5L16 12zm-4 2.5L8.5 16 12 18.5 15.5 16 12 14.5z"/>
  </svg>
);

const FigmaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.332 8.668a3.333 3.333 0 0 0 0-6.663H8.668a3.333 3.333 0 0 0 0 6.663 3.333 3.333 0 0 0 0 6.665 3.333 3.333 0 1 0 3.332-3.332V8.668h3.332Z"/>
    <circle cx="15.332" cy="12.001" r="3.332"/>
  </svg>
);

const CanvaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const NotionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.746c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.631 7.083v-6.31l-1.215-.14c-.093-.514.28-.887.747-.933l3.255-.187z"/>
  </svg>
);

const SlackIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
  </svg>
);

const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const ZoomIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.5 7h-9C4.67 7 4 7.67 4 8.5v7c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-2l4 2.5v-9L16 9.5v-2c0-.83-.67-1.5-1.5-1.5z"/>
  </svg>
);

const DiscordIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const StripeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
  </svg>
);

const ShopifyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104zm-2.715-14.92c-.04-.015-.083-.026-.124-.038-.381-.116-1.888-.404-3.553 1.207-1.119 1.088-1.571 2.714-1.665 3.864l-2.73.809c-.867.271-1.002.283-1.126 1.06C3.324 15.733 0 24 0 24l11.673-.001 1.406-14.92s-1.905-.408-2.715-.523c-.367-.698-.752-1.746-.817-2.061-.079-.37-.305-.599-.688-.715z"/>
  </svg>
);

// COMPONENTE GENÉRICO
const DefaultIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
  </svg>
);

// Crear componentes para cada herramienta adicional
const CopilotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 11h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z"/>
  </svg>
);

// ... (añadir más iconos según necesites)

// ARRAY DE HERRAMIENTAS
const techTools: TechTool[] = [
  // ACCESOS ESPECIALES IMPULSA LAB (PRIMEROS)
  { name: 'Herramientas', logo: HerramientasIcon, url: '/herramientas', category: 'Impulsa Lab', color: '#FF6B6B' },
  { name: 'Agentes IA', logo: AgentesIcon, url: '/agentes', category: 'Impulsa Lab', color: '#4ECDC4' },
  { name: 'Diagnóstico 3D', logo: DiagnosticoIcon, url: '/diagnostico', category: 'Impulsa Lab', color: '#45B7D1' },
  { name: 'Noticias IA', logo: NoticiasIcon, url: '/noticias-ia', category: 'Impulsa Lab', color: '#96CEB4' },

  // Chat & Asistentes IA
  { name: 'ChatGPT', logo: ChatGPTIcon, url: 'https://chatgpt.com', category: 'Chat IA', color: '#00A67E' },
  { name: 'Claude', logo: ClaudeIcon, url: 'https://claude.ai', category: 'Chat IA', color: '#D97757' },
  { name: 'Gemini', logo: GeminiIcon, url: 'https://gemini.google.com', category: 'Chat IA', color: '#4285F4' },
  { name: 'Perplexity', logo: PerplexityIcon, url: 'https://perplexity.ai', category: 'Chat IA', color: '#20B2AA' },
  { name: 'Copilot', logo: CopilotIcon, url: 'https://copilot.microsoft.com', category: 'Chat IA', color: '#0078D4' },
  
  // Diseño & Creatividad
  { name: 'Figma', logo: FigmaIcon, url: 'https://figma.com', category: 'Diseño', color: '#F24E1E' },
  { name: 'Canva', logo: CanvaIcon, url: 'https://canva.com', category: 'Diseño', color: '#00C4CC' },
  { name: 'Midjourney', logo: MidjourneyIcon, url: 'https://midjourney.com', category: 'Imágenes IA', color: '#5865F2' },
  
  // Productividad
  { name: 'Notion', logo: NotionIcon, url: 'https://notion.so', category: 'Productividad', color: '#000000' },
  { name: 'Slack', logo: SlackIcon, url: 'https://slack.com', category: 'Comunicación', color: '#4A154B' },
  { name: 'Zoom', logo: ZoomIcon, url: 'https://zoom.us', category: 'Comunicación', color: '#2D8CFF' },
  { name: 'Discord', logo: DiscordIcon, url: 'https://discord.com', category: 'Comunicación', color: '#5865F2' },
  
  // Desarrollo
  { name: 'GitHub', logo: GitHubIcon, url: 'https://github.com', category: 'Código', color: '#24292E' },
  
  // E-commerce
  { name: 'Shopify', logo: ShopifyIcon, url: 'https://shopify.com', category: 'E-commerce', color: '#96BF48' },
  { name: 'Stripe', logo: StripeIcon, url: 'https://stripe.com', category: 'E-commerce', color: '#635BFF' },

  // Añadir todas las demás herramientas con DefaultIcon por ahora
  { name: 'Poe', logo: DefaultIcon, url: 'https://poe.com', category: 'Chat IA', color: '#7B3FF2' },
  { name: 'You.com', logo: DefaultIcon, url: 'https://you.com', category: 'Chat IA', color: '#FF6B6B' },
  { name: 'Phind', logo: DefaultIcon, url: 'https://phind.com', category: 'Chat IA', color: '#00D9B1' },
  { name: 'Adobe Firefly', logo: DefaultIcon, url: 'https://firefly.adobe.com', category: 'Diseño', color: '#FF0000' },
  { name: 'Framer', logo: DefaultIcon, url: 'https://framer.com', category: 'Diseño', color: '#0055FF' },
  { name: 'Sketch', logo: DefaultIcon, url: 'https://sketch.com', category: 'Diseño', color: '#F7B500' },
  { name: 'Adobe XD', logo: DefaultIcon, url: 'https://adobe.com/products/xd', category: 'Diseño', color: '#FF61F6' },
  { name: 'InVision', logo: DefaultIcon, url: 'https://invisionapp.com', category: 'Diseño', color: '#FF3366' },
  { name: 'Penpot', logo: DefaultIcon, url: 'https://penpot.app', category: 'Diseño', color: '#000000' },
  { name: 'Lunacy', logo: DefaultIcon, url: 'https://icons8.com/lunacy', category: 'Diseño', color: '#179DE3' },
  { name: 'DALL-E 3', logo: DefaultIcon, url: 'https://openai.com/dall-e-3', category: 'Imágenes IA', color: '#00A67E' },
  { name: 'Stable Diffusion', logo: DefaultIcon, url: 'https://stability.ai', category: 'Imágenes IA', color: '#9333EA' },
  { name: 'Leonardo AI', logo: DefaultIcon, url: 'https://leonardo.ai', category: 'Imágenes IA', color: '#5C16C5' },
  { name: 'Ideogram', logo: DefaultIcon, url: 'https://ideogram.ai', category: 'Imágenes IA', color: '#6366F1' },
  { name: 'Bing Image Creator', logo: DefaultIcon, url: 'https://bing.com/create', category: 'Imágenes IA', color: '#0078D4' },
  { name: 'NightCafe', logo: DefaultIcon, url: 'https://nightcafe.studio', category: 'Imágenes IA', color: '#FF6B6B' },
  { name: 'Artbreeder', logo: DefaultIcon, url: 'https://artbreeder.com', category: 'Imágenes IA', color: '#1A1A1A' },
  { name: 'Synthesia', logo: DefaultIcon, url: 'https://synthesia.io', category: 'Video IA', color: '#4353FF' },
  { name: 'RunwayML', logo: DefaultIcon, url: 'https://runwayml.com', category: 'Video IA', color: '#000000' },
  { name: 'Pika Labs', logo: DefaultIcon, url: 'https://pika.art', category: 'Video IA', color: '#FF4B4B' },
  { name: 'HeyGen', logo: DefaultIcon, url: 'https://heygen.com', category: 'Video IA', color: '#5C3EE8' },
  { name: 'D-ID', logo: DefaultIcon, url: 'https://d-id.com', category: 'Video IA', color: '#6C5CE7' },
  { name: 'Fliki', logo: DefaultIcon, url: 'https://fliki.ai', category: 'Video IA', color: '#FF6B6B' },
  { name: 'Pictory', logo: DefaultIcon, url: 'https://pictory.ai', category: 'Video IA', color: '#00D4FF' },
  { name: 'Descript', logo: DefaultIcon, url: 'https://descript.com', category: 'Video IA', color: '#5E5ADB' },
  { name: 'Lumen5', logo: DefaultIcon, url: 'https://lumen5.com', category: 'Video IA', color: '#5846F6' },
  { name: 'Obsidian', logo: DefaultIcon, url: 'https://obsidian.md', category: 'Productividad', color: '#7C3AED' },
  { name: 'Monday', logo: DefaultIcon, url: 'https://monday.com', category: 'Productividad', color: '#FF3D71' },
  { name: 'ClickUp', logo: DefaultIcon, url: 'https://clickup.com', category: 'Productividad', color: '#7B68EE' },
  { name: 'Asana', logo: DefaultIcon, url: 'https://asana.com', category: 'Productividad', color: '#F06A6A' },
  { name: 'Trello', logo: DefaultIcon, url: 'https://trello.com', category: 'Productividad', color: '#0079BF' },
  { name: 'Todoist', logo: DefaultIcon, url: 'https://todoist.com', category: 'Productividad', color: '#E44332' },
  { name: 'Linear', logo: DefaultIcon, url: 'https://linear.app', category: 'Productividad', color: '#5E6AD2' },
  { name: 'Coda', logo: DefaultIcon, url: 'https://coda.io', category: 'Productividad', color: '#F46A54' },
  { name: 'Airtable', logo: DefaultIcon, url: 'https://airtable.com', category: 'Productividad', color: '#FCB400' },
  { name: 'Jasper', logo: DefaultIcon, url: 'https://jasper.ai', category: 'Escritura', color: '#5C16C5' },
  { name: 'Copy.ai', logo: DefaultIcon, url: 'https://copy.ai', category: 'Escritura', color: '#7C3AED' },
  { name: 'Writesonic', logo: DefaultIcon, url: 'https://writesonic.com', category: 'Escritura', color: '#006AFF' },
  { name: 'Grammarly', logo: DefaultIcon, url: 'https://grammarly.com', category: 'Escritura', color: '#15B67A' },
  { name: 'Hemingway', logo: DefaultIcon, url: 'https://hemingwayapp.com', category: 'Escritura', color: '#F7BE16' },
  { name: 'ProWritingAid', logo: DefaultIcon, url: 'https://prowritingaid.com', category: 'Escritura', color: '#00A8E1' },
  { name: 'Rytr', logo: DefaultIcon, url: 'https://rytr.me', category: 'Escritura', color: '#FF5A5F' },
  { name: 'Wordtune', logo: DefaultIcon, url: 'https://wordtune.com', category: 'Escritura', color: '#6B46C1' },
  { name: 'GitHub Copilot', logo: DefaultIcon, url: 'https://github.com/features/copilot', category: 'Código', color: '#24292E' },
  { name: 'Cursor', logo: DefaultIcon, url: 'https://cursor.sh', category: 'Código', color: '#000000' },
  { name: 'Tabnine', logo: DefaultIcon, url: 'https://tabnine.com', category: 'Código', color: '#FF6B6B' },
  { name: 'Replit', logo: DefaultIcon, url: 'https://replit.com', category: 'Código', color: '#F26207' },
  { name: 'CodePen', logo: DefaultIcon, url: 'https://codepen.io', category: 'Código', color: '#000000' },
  { name: 'CodeSandbox', logo: DefaultIcon, url: 'https://codesandbox.io', category: 'Código', color: '#040404' },
  { name: 'Vercel', logo: DefaultIcon, url: 'https://vercel.com', category: 'Código', color: '#000000' },
  { name: 'Netlify', logo: DefaultIcon, url: 'https://netlify.com', category: 'Código', color: '#00C7B7' },
  { name: 'Railway', logo: DefaultIcon, url: 'https://railway.app', category: 'Código', color: '#853BCE' },
  { name: 'Supabase', logo: DefaultIcon, url: 'https://supabase.com', category: 'Código', color: '#3ECF8E' },
  { name: 'ElevenLabs', logo: DefaultIcon, url: 'https://elevenlabs.io', category: 'Audio', color: '#000000' },
  { name: 'Murf AI', logo: DefaultIcon, url: 'https://murf.ai', category: 'Audio', color: '#6C5CE7' },
  { name: 'Suno AI', logo: DefaultIcon, url: 'https://suno.ai', category: 'Audio', color: '#FA5252' },
  { name: 'Soundraw', logo: DefaultIcon, url: 'https://soundraw.io', category: 'Audio', color: '#6366F1' },
  { name: 'Boomy', logo: DefaultIcon, url: 'https://boomy.com', category: 'Audio', color: '#FF006E' },
  { name: 'AIVA', logo: DefaultIcon, url: 'https://aiva.ai', category: 'Audio', color: '#000000' },
  { name: 'Splash Pro', logo: DefaultIcon, url: 'https://splashpro.com', category: 'Audio', color: '#7C3AED' },
  { name: 'Voicemod', logo: DefaultIcon, url: 'https://voicemod.net', category: 'Audio', color: '#01E5C0' },
  { name: 'Buffer', logo: DefaultIcon, url: 'https://buffer.com', category: 'Marketing', color: '#168EEA' },
  { name: 'Hootsuite', logo: DefaultIcon, url: 'https://hootsuite.com', category: 'Marketing', color: '#000000' },
  { name: 'Mailchimp', logo: DefaultIcon, url: 'https://mailchimp.com', category: 'Marketing', color: '#FFE01B' },
  { name: 'HubSpot', logo: DefaultIcon, url: 'https://hubspot.com', category: 'Marketing', color: '#FF7A59' },
  { name: 'Semrush', logo: DefaultIcon, url: 'https://semrush.com', category: 'SEO', color: '#FF642D' },
  { name: 'Ahrefs', logo: DefaultIcon, url: 'https://ahrefs.com', category: 'SEO', color: '#FF6B00' },
  { name: 'Moz', logo: DefaultIcon, url: 'https://moz.com', category: 'SEO', color: '#4285F4' },
  { name: 'Screaming Frog', logo: DefaultIcon, url: 'https://screamingfrog.co.uk', category: 'SEO', color: '#8CC63F' },
  { name: 'Google Analytics', logo: DefaultIcon, url: 'https://analytics.google.com', category: 'Analytics', color: '#E37400' },
  { name: 'Mixpanel', logo: DefaultIcon, url: 'https://mixpanel.com', category: 'Analytics', color: '#7856FF' },
  { name: 'Hotjar', logo: DefaultIcon, url: 'https://hotjar.com', category: 'Analytics', color: '#FF3C00' },
  { name: 'Amplitude', logo: DefaultIcon, url: 'https://amplitude.com', category: 'Analytics', color: '#136ACD' },
  { name: 'Tableau', logo: DefaultIcon, url: 'https://tableau.com', category: 'Analytics', color: '#E97627' },
  { name: 'Power BI', logo: DefaultIcon, url: 'https://powerbi.microsoft.com', category: 'Analytics', color: '#F2C811' },
  { name: 'Looker', logo: DefaultIcon, url: 'https://looker.com', category: 'Analytics', color: '#4285F4' },
  { name: 'Segment', logo: DefaultIcon, url: 'https://segment.com', category: 'Analytics', color: '#52BD94' },
  { name: 'WooCommerce', logo: DefaultIcon, url: 'https://woocommerce.com', category: 'E-commerce', color: '#96588A' },
  { name: 'BigCommerce', logo: DefaultIcon, url: 'https://bigcommerce.com', category: 'E-commerce', color: '#121118' },
  { name: 'Square', logo: DefaultIcon, url: 'https://squareup.com', category: 'E-commerce', color: '#3E4348' },
  { name: 'PayPal', logo: DefaultIcon, url: 'https://paypal.com', category: 'E-commerce', color: '#003087' },
  { name: 'Etsy', logo: DefaultIcon, url: 'https://etsy.com', category: 'E-commerce', color: '#F14000' },
  { name: 'Gumroad', logo: DefaultIcon, url: 'https://gumroad.com', category: 'E-commerce', color: '#36A9AE' },
  { name: 'Microsoft Teams', logo: DefaultIcon, url: 'https://teams.microsoft.com', category: 'Comunicación', color: '#6264A7' },
  { name: 'Google Meet', logo: DefaultIcon, url: 'https://meet.google.com', category: 'Comunicación', color: '#00897B' },
  { name: 'Skype', logo: DefaultIcon, url: 'https://skype.com', category: 'Comunicación', color: '#00AFF0' },
  { name: 'Telegram', logo: DefaultIcon, url: 'https://telegram.org', category: 'Comunicación', color: '#229ED9' },
  { name: 'WhatsApp', logo: DefaultIcon, url: 'https://whatsapp.com', category: 'Comunicación', color: '#25D366' },
  { name: 'Duolingo', logo: DefaultIcon, url: 'https://duolingo.com', category: 'Educación', color: '#58CC02' },
  { name: 'Coursera', logo: DefaultIcon, url: 'https://coursera.org', category: 'Educación', color: '#0056D2' },
  { name: 'Khan Academy', logo: DefaultIcon, url: 'https://khanacademy.org', category: 'Educación', color: '#14BF96' },
  { name: 'Udemy', logo: DefaultIcon, url: 'https://udemy.com', category: 'Educación', color: '#A435F0' },
  { name: 'edX', logo: DefaultIcon, url: 'https://edx.org', category: 'Educación', color: '#02262B' },
  { name: 'Skillshare', logo: DefaultIcon, url: 'https://skillshare.com', category: 'Educación', color: '#00FF84' },
  { name: 'MasterClass', logo: DefaultIcon, url: 'https://masterclass.com', category: 'Educación', color: '#000000' },
  { name: 'Pluralsight', logo: DefaultIcon, url: 'https://pluralsight.com', category: 'Educación', color: '#F15B2A' },
  { name: 'Instagram', logo: DefaultIcon, url: 'https://instagram.com', category: 'Social Media', color: '#E4405F' },
  { name: 'LinkedIn', logo: DefaultIcon, url: 'https://linkedin.com', category: 'Social Media', color: '#0A66C2' },
  { name: 'TikTok', logo: DefaultIcon, url: 'https://tiktok.com', category: 'Social Media', color: '#000000' },
  { name: 'Pinterest', logo: DefaultIcon, url: 'https://pinterest.com', category: 'Social Media', color: '#E60023' },
  { name: 'Twitter/X', logo: DefaultIcon, url: 'https://twitter.com', category: 'Social Media', color: '#000000' },
  { name: 'Facebook', logo: DefaultIcon, url: 'https://facebook.com', category: 'Social Media', color: '#1877F2' },
  { name: 'Reddit', logo: DefaultIcon, url: 'https://reddit.com', category: 'Social Media', color: '#FF4500' },
  { name: 'YouTube', logo: DefaultIcon, url: 'https://youtube.com', category: 'Social Media', color: '#FF0000' },
  { name: 'Zapier', logo: DefaultIcon, url: 'https://zapier.com', category: 'Automatización', color: '#FF4A00' },
  { name: 'Make', logo: DefaultIcon, url: 'https://make.com', category: 'Automatización', color: '#6D00CC' },
  { name: 'IFTTT', logo: DefaultIcon, url: 'https://ifttt.com', category: 'Automatización', color: '#000000' },
  { name: 'n8n', logo: DefaultIcon, url: 'https://n8n.io', category: 'Automatización', color: '#EA4B71' },
  { name: 'Integromat', logo: DefaultIcon, url: 'https://integromat.com', category: 'Automatización', color: '#2F8EED' },
  { name: 'Automate.io', logo: DefaultIcon, url: 'https://automate.io', category: 'Automatización', color: '#27AE60' },
  { name: 'Pabbly', logo: DefaultIcon, url: 'https://pabbly.com', category: 'Automatización', color: '#FF6900' },
  { name: 'Workato', logo: DefaultIcon, url: 'https://workato.com', category: 'Automatización', color: '#1063E1' },
  { name: 'AWS', logo: DefaultIcon, url: 'https://aws.amazon.com', category: 'Cloud', color: '#FF9900' },
  { name: 'Google Cloud', logo: DefaultIcon, url: 'https://cloud.google.com', category: 'Cloud', color: '#4285F4' },
  { name: 'Microsoft Azure', logo: DefaultIcon, url: 'https://azure.microsoft.com', category: 'Cloud', color: '#0078D4' },
  { name: 'DigitalOcean', logo: DefaultIcon, url: 'https://digitalocean.com', category: 'Cloud', color: '#0080FF' },
  { name: 'Linode', logo: DefaultIcon, url: 'https://linode.com', category: 'Cloud', color: '#00A95C' },
  { name: 'Cloudflare', logo: DefaultIcon, url: 'https://cloudflare.com', category: 'Cloud', color: '#F38020' },
  { name: 'Heroku', logo: DefaultIcon, url: 'https://heroku.com', category: 'Cloud', color: '#430098' },
  { name: 'Hugging Face', logo: DefaultIcon, url: 'https://huggingface.co', category: 'IA Tools', color: '#FFD21E' },
  { name: 'Replicate', logo: DefaultIcon, url: 'https://replicate.com', category: 'IA Tools', color: '#000000' },
  { name: 'Cohere', logo: DefaultIcon, url: 'https://cohere.ai', category: 'IA Tools', color: '#39594D' },
  { name: 'Anthropic', logo: DefaultIcon, url: 'https://anthropic.com', category: 'IA Tools', color: '#D97757' },
  { name: 'OpenAI', logo: DefaultIcon, url: 'https://openai.com', category: 'IA Tools', color: '#00A67E' },
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
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
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
    e.preventDefault();
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    velocityRef.current = e.touches[0].pageX - lastMouseX.current;
    lastMouseX.current = e.touches[0].pageX;
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(velocityRef.current) > 2) {
      setMomentum(velocityRef.current * 0.5);
    } else {
      setTimeout(() => setIsPaused(false), 100);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (Math.abs(velocityRef.current) > 5) {
      e.preventDefault();
    }
  };

  return (
    <div 
      className="relative w-full overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-8 rounded-2xl"
      onMouseEnter={() => !isDragging && setIsPaused(true)}
      onMouseLeave={() => !isDragging && setIsPaused(false)}
    >
      {/* Gradientes laterales */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
      
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
          {[...techTools, ...techTools, ...techTools].map((tool, index) => (
            <a
              key={`${tool.name}-${index}`}
              href={tool.url}
              target={tool.url.startsWith('/') ? '_self' : '_blank'}
              rel={tool.url.startsWith('/') ? undefined : 'noopener noreferrer'}
              className="ticker-item group"
              draggable={false}
              onClick={handleClick}
              style={{
                '--brand-color': tool.color || '#6366f1'
              } as React.CSSProperties}
              title={tool.name}
            >
              <div className="logo-wrapper">
                <tool.logo className="w-8 h-8 text-slate-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="item-details">
                <p className="item-name">{tool.name}</p>
                <p className="item-category">{tool.category}</p>
              </div>
            </a>
          ))}
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
          margin: 0 12px;
          padding: 12px 20px;
          background: linear-gradient(to bottom right, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.8));
          border-radius: 12px;
          border: 1px solid rgba(100, 116, 139, 0.3);
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
          background: linear-gradient(135deg, var(--brand-color) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .ticker-item:hover {
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.5), 
                      0 0 20px -5px var(--brand-color);
          transform: scale(1.05) translateY(-2px);
          border-color: var(--brand-color);
        }

        .ticker-item:hover::before {
          opacity: 0.2;
        }

        .ticker-item:hover .logo-wrapper {
          transform: rotate(5deg) scale(1.1);
        }

        .ticker-item:hover .item-name {
          color: white;
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
          color: #e2e8f0;
        }

        .item-category {
          font-size: 11px;
          opacity: 0.6;
          margin-top: 2px;
          color: #94a3b8;
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