'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

interface TechTool {
  name: string;
  category: string;
  logo: React.ComponentType<{ className?: string }>;
  url: string;
  color?: string;
}

// ICONOS DE HERRAMIENTAS
const ChatGPTIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
  </svg>
);

const ClaudeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.707 2.293a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 1 1 1.414-1.414L11 7.586l5.293-5.293a1 1 0 0 1 1.414 0zM17.707 21.707a1 1 0 0 0 0-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414L11 16.414l5.293 5.293a1 1 0 0 0 1.414 0z"/>
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
    <path d="M4.585 13.607l-.27-.012H1.886c-.432 0-.853-.173-1.16-.476A1.635 1.635 0 0 1 .25 11.968V7.641c0-.427.17-.843.476-1.146.306-.309.728-.478 1.16-.478h8.447c.438 0 .854.17 1.16.478.306.303.479.72.479 1.146v4.315c0 .427-.173.843-.48 1.147a1.648 1.648 0 0 1-1.16.476H8.63v1.74c0 .305-.059.6-.195.854-.136.254-.336.46-.59.598-.25.135-.537.196-.83.178a1.544 1.544 0 0 1-.768-.303l-1.662-1.263zm8.426-6.165l3.54-2.823c.336-.27.761-.378 1.173-.298.413.08.779.32 1.01.66.23.342.316.75.238 1.142a1.428 1.428 0 0 1-.544.918L15.23 9.095l3.198 2.055c.27.176.466.432.544.722.078.29-.006.594-.238.835-.231.34-.598.58-1.01.66a1.434 1.434 0 0 1-1.173-.297l-3.54-2.824v-2.81z"/>
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

const HubSpotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.267-1.978v-.067A2.2 2.2 0 0 0 17.238.845h-.067a2.2 2.2 0 0 0-2.193 2.193v.067c0 .87.514 1.622 1.252 1.978V7.93c-2.069.273-3.799 1.695-4.638 3.666l-4.013-4.013a2.966 2.966 0 0 0 .702-1.903A2.97 2.97 0 0 0 5.31 2.708a2.97 2.97 0 0 0-2.971 2.971 2.97 2.97 0 0 0 2.97 2.971c.74 0 1.41-.273 1.932-.717l4.027 4.027a5.852 5.852 0 0 0-.096 1.039 5.876 5.876 0 0 0 5.877 5.877 5.876 5.876 0 0 0 5.877-5.877c0-2.75-1.893-5.053-4.447-5.691l-.315.022zM17.24 16.686a3.669 3.669 0 0 1-3.669-3.668 3.669 3.669 0 0 1 3.669-3.669 3.669 3.669 0 0 1 3.668 3.669 3.669 3.669 0 0 1-3.668 3.668z"/>
  </svg>
);

const GoogleAnalyticsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.84 2.998v17.999a2.983 2.983 0 0 1-.863 2.134 2.981 2.981 0 0 1-2.134.864 2.98 2.98 0 0 1-2.134-.864 2.98 2.98 0 0 1-.864-2.134V2.998A2.98 2.98 0 0 1 17.709.864 2.983 2.983 0 0 1 19.843 0a2.981 2.981 0 0 1 2.998 2.998zM14.27 9.696v11.301a2.991 2.991 0 0 1-2.997 2.998 2.981 2.981 0 0 1-2.134-.863 2.981 2.981 0 0 1-.863-2.135V9.696a2.98 2.98 0 0 1 .863-2.134 2.981 2.981 0 0 1 2.134-.863c.8 0 1.571.322 2.134.863a2.98 2.98 0 0 1 .863 2.134zm-8.568 6.695v4.606a2.98 2.98 0 0 1-.864 2.134 2.983 2.983 0 0 1-2.133.864 2.981 2.981 0 0 1-2.134-.864A2.98 2.98 0 0 1 0 20.997v-4.606a2.981 2.981 0 0 1 .863-2.133 2.981 2.981 0 0 1 2.134-.864c.8 0 1.571.322 2.134.864a2.98 2.98 0 0 1 .864 2.133z"/>
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881 0 1.44 1.44 0 0 1-2.881 0z"/>
  </svg>
);

// Icono genérico mejorado
const DefaultIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
  </svg>
);

// ARRAY COMPLETO DE HERRAMIENTAS CON CATEGORÍAS
const techTools: TechTool[] = [
  // Chat & Asistentes IA
  { name: 'ChatGPT', category: 'Chat IA', logo: ChatGPTIcon, url: 'https://chatgpt.com', color: '#00A67E' },
  { name: 'Claude', category: 'Chat IA', logo: ClaudeIcon, url: 'https://claude.ai', color: '#D97757' },
  { name: 'Gemini', category: 'Chat IA', logo: DefaultIcon, url: 'https://gemini.google.com', color: '#4285F4' },
  { name: 'Perplexity', category: 'Chat IA', logo: DefaultIcon, url: 'https://perplexity.ai', color: '#20B2AA' },
  { name: 'Copilot', category: 'Chat IA', logo: DefaultIcon, url: 'https://copilot.microsoft.com', color: '#0078D4' },
  { name: 'Poe', category: 'Chat IA', logo: DefaultIcon, url: 'https://poe.com', color: '#7B3FF2' },
  { name: 'You.com', category: 'Chat IA', logo: DefaultIcon, url: 'https://you.com', color: '#FF6B6B' },
  { name: 'Phind', category: 'Chat IA', logo: DefaultIcon, url: 'https://phind.com', color: '#00D9B1' },
  
  // Diseño & Creatividad
  { name: 'Figma', category: 'Diseño', logo: FigmaIcon, url: 'https://figma.com', color: '#F24E1E' },
  { name: 'Canva', category: 'Diseño', logo: CanvaIcon, url: 'https://canva.com', color: '#00C4CC' },
  { name: 'Adobe Firefly', category: 'Diseño', logo: DefaultIcon, url: 'https://firefly.adobe.com', color: '#FF0000' },
  { name: 'Framer', category: 'Diseño', logo: DefaultIcon, url: 'https://framer.com', color: '#0055FF' },
  { name: 'Sketch', category: 'Diseño', logo: DefaultIcon, url: 'https://sketch.com', color: '#F7B500' },
  { name: 'Adobe XD', category: 'Diseño', logo: DefaultIcon, url: 'https://adobe.com/products/xd', color: '#FF61F6' },
  { name: 'InVision', category: 'Diseño', logo: DefaultIcon, url: 'https://invisionapp.com', color: '#FF3366' },
  { name: 'Penpot', category: 'Diseño', logo: DefaultIcon, url: 'https://penpot.app', color: '#000000' },
  { name: 'Lunacy', category: 'Diseño', logo: DefaultIcon, url: 'https://icons8.com/lunacy', color: '#179DE3' },
  
  // Imágenes IA
  { name: 'Midjourney', category: 'Imágenes IA', logo: DefaultIcon, url: 'https://midjourney.com', color: '#5865F2' },
  { name: 'DALL-E 3', category: 'Imágenes IA', logo: DefaultIcon, url: 'https://openai.com/dall-e-3', color: '#00A67E' },
  { name: 'Stable Diffusion', category: 'Imágenes IA', logo: DefaultIcon, url: 'https://stability.ai', color: '#9333EA' },
  { name: 'Leonardo AI', category: 'Imágenes IA', logo: DefaultIcon, url: 'https://leonardo.ai', color: '#5C16C5' },
  { name: 'Ideogram', category: 'Imágenes IA', logo: DefaultIcon, url: 'https://ideogram.ai', color: '#6366F1' },
  { name: 'Bing Image Creator', category: 'Imágenes IA', logo: DefaultIcon, url: 'https://bing.com/create', color: '#0078D4' },
  { name: 'NightCafe', category: 'Imágenes IA', logo: DefaultIcon, url: 'https://nightcafe.studio', color: '#FF6B6B' },
  { name: 'Artbreeder', category: 'Imágenes IA', logo: DefaultIcon, url: 'https://artbreeder.com', color: '#1A1A1A' },
  
  // Video IA
  { name: 'Synthesia', category: 'Video IA', logo: DefaultIcon, url: 'https://synthesia.io', color: '#4353FF' },
  { name: 'RunwayML', category: 'Video IA', logo: DefaultIcon, url: 'https://runwayml.com', color: '#000000' },
  { name: 'Pika Labs', category: 'Video IA', logo: DefaultIcon, url: 'https://pika.art', color: '#FF4B4B' },
  { name: 'HeyGen', category: 'Video IA', logo: DefaultIcon, url: 'https://heygen.com', color: '#5C3EE8' },
  { name: 'D-ID', category: 'Video IA', logo: DefaultIcon, url: 'https://d-id.com', color: '#6C5CE7' },
  { name: 'Fliki', category: 'Video IA', logo: DefaultIcon, url: 'https://fliki.ai', color: '#FF6B6B' },
  { name: 'Pictory', category: 'Video IA', logo: DefaultIcon, url: 'https://pictory.ai', color: '#00D4FF' },
  { name: 'Descript', category: 'Video IA', logo: DefaultIcon, url: 'https://descript.com', color: '#5E5ADB' },
  { name: 'Lumen5', category: 'Video IA', logo: DefaultIcon, url: 'https://lumen5.com', color: '#5846F6' },
  
  // Productividad
  { name: 'Notion', category: 'Productividad', logo: NotionIcon, url: 'https://notion.so', color: '#000000' },
  { name: 'Obsidian', category: 'Productividad', logo: DefaultIcon, url: 'https://obsidian.md', color: '#7C3AED' },
  { name: 'Monday', category: 'Productividad', logo: DefaultIcon, url: 'https://monday.com', color: '#FF3D71' },
  { name: 'ClickUp', category: 'Productividad', logo: DefaultIcon, url: 'https://clickup.com', color: '#7B68EE' },
  { name: 'Asana', category: 'Productividad', logo: DefaultIcon, url: 'https://asana.com', color: '#F06A6A' },
  { name: 'Trello', category: 'Productividad', logo: DefaultIcon, url: 'https://trello.com', color: '#0079BF' },
  { name: 'Todoist', category: 'Productividad', logo: DefaultIcon, url: 'https://todoist.com', color: '#E44332' },
  { name: 'Linear', category: 'Productividad', logo: DefaultIcon, url: 'https://linear.app', color: '#5E6AD2' },
  { name: 'Coda', category: 'Productividad', logo: DefaultIcon, url: 'https://coda.io', color: '#F46A54' },
  { name: 'Airtable', category: 'Productividad', logo: DefaultIcon, url: 'https://airtable.com', color: '#FCB400' },
  
  // Escritura
  { name: 'Jasper', category: 'Escritura', logo: DefaultIcon, url: 'https://jasper.ai', color: '#5C16C5' },
  { name: 'Copy.ai', category: 'Escritura', logo: DefaultIcon, url: 'https://copy.ai', color: '#7C3AED' },
  { name: 'Writesonic', category: 'Escritura', logo: DefaultIcon, url: 'https://writesonic.com', color: '#006AFF' },
  { name: 'Grammarly', category: 'Escritura', logo: DefaultIcon, url: 'https://grammarly.com', color: '#15B67A' },
  { name: 'Hemingway', category: 'Escritura', logo: DefaultIcon, url: 'https://hemingwayapp.com', color: '#F7BE16' },
  { name: 'ProWritingAid', category: 'Escritura', logo: DefaultIcon, url: 'https://prowritingaid.com', color: '#00A8E1' },
  { name: 'Rytr', category: 'Escritura', logo: DefaultIcon, url: 'https://rytr.me', color: '#FF5A5F' },
  { name: 'Wordtune', category: 'Escritura', logo: DefaultIcon, url: 'https://wordtune.com', color: '#6B46C1' },
  
  // Código
  { name: 'GitHub', category: 'Código', logo: GitHubIcon, url: 'https://github.com', color: '#24292E' },
  { name: 'GitHub Copilot', category: 'Código', logo: DefaultIcon, url: 'https://github.com/features/copilot', color: '#24292E' },
  { name: 'Cursor', category: 'Código', logo: DefaultIcon, url: 'https://cursor.sh', color: '#000000' },
  { name: 'Tabnine', category: 'Código', logo: DefaultIcon, url: 'https://tabnine.com', color: '#FF6B6B' },
  { name: 'Replit', category: 'Código', logo: DefaultIcon, url: 'https://replit.com', color: '#F26207' },
  { name: 'CodePen', category: 'Código', logo: DefaultIcon, url: 'https://codepen.io', color: '#000000' },
  { name: 'CodeSandbox', category: 'Código', logo: DefaultIcon, url: 'https://codesandbox.io', color: '#040404' },
  { name: 'Vercel', category: 'Código', logo: DefaultIcon, url: 'https://vercel.com', color: '#000000' },
  { name: 'Netlify', category: 'Código', logo: DefaultIcon, url: 'https://netlify.com', color: '#00C7B7' },
  { name: 'Railway', category: 'Código', logo: DefaultIcon, url: 'https://railway.app', color: '#853BCE' },
  { name: 'Supabase', category: 'Código', logo: DefaultIcon, url: 'https://supabase.com', color: '#3ECF8E' },
  
  // Audio
  { name: 'ElevenLabs', category: 'Audio', logo: DefaultIcon, url: 'https://elevenlabs.io', color: '#000000' },
  { name: 'Murf AI', category: 'Audio', logo: DefaultIcon, url: 'https://murf.ai', color: '#6C5CE7' },
  { name: 'Suno AI', category: 'Audio', logo: DefaultIcon, url: 'https://suno.ai', color: '#FA5252' },
  { name: 'Soundraw', category: 'Audio', logo: DefaultIcon, url: 'https://soundraw.io', color: '#6366F1' },
  { name: 'Boomy', category: 'Audio', logo: DefaultIcon, url: 'https://boomy.com', color: '#FF006E' },
  { name: 'AIVA', category: 'Audio', logo: DefaultIcon, url: 'https://aiva.ai', color: '#000000' },
  { name: 'Splash Pro', category: 'Audio', logo: DefaultIcon, url: 'https://splashpro.com', color: '#7C3AED' },
  { name: 'Voicemod', category: 'Audio', logo: DefaultIcon, url: 'https://voicemod.net', color: '#01E5C0' },
  
  // Marketing
  { name: 'Buffer', category: 'Marketing', logo: DefaultIcon, url: 'https://buffer.com', color: '#168EEA' },
  { name: 'Hootsuite', category: 'Marketing', logo: DefaultIcon, url: 'https://hootsuite.com', color: '#000000' },
  { name: 'Mailchimp', category: 'Marketing', logo: DefaultIcon, url: 'https://mailchimp.com', color: '#FFE01B' },
  { name: 'HubSpot', category: 'Marketing', logo: HubSpotIcon, url: 'https://hubspot.com', color: '#FF7A59' },
  
  // SEO
  { name: 'Semrush', category: 'SEO', logo: DefaultIcon, url: 'https://semrush.com', color: '#FF642D' },
  { name: 'Ahrefs', category: 'SEO', logo: DefaultIcon, url: 'https://ahrefs.com', color: '#FF6B00' },
  { name: 'Moz', category: 'SEO', logo: DefaultIcon, url: 'https://moz.com', color: '#4285F4' },
  { name: 'Screaming Frog', category: 'SEO', logo: DefaultIcon, url: 'https://screamingfrog.co.uk', color: '#8CC63F' },
  
  // Analytics
  { name: 'Google Analytics', category: 'Analytics', logo: GoogleAnalyticsIcon, url: 'https://analytics.google.com', color: '#E37400' },
  { name: 'Mixpanel', category: 'Analytics', logo: DefaultIcon, url: 'https://mixpanel.com', color: '#7856FF' },
  { name: 'Hotjar', category: 'Analytics', logo: DefaultIcon, url: 'https://hotjar.com', color: '#FF3C00' },
  { name: 'Amplitude', category: 'Analytics', logo: DefaultIcon, url: 'https://amplitude.com', color: '#136ACD' },
  { name: 'Tableau', category: 'Analytics', logo: DefaultIcon, url: 'https://tableau.com', color: '#E97627' },
  { name: 'Power BI', category: 'Analytics', logo: DefaultIcon, url: 'https://powerbi.microsoft.com', color: '#F2C811' },
  { name: 'Looker', category: 'Analytics', logo: DefaultIcon, url: 'https://looker.com', color: '#4285F4' },
  { name: 'Segment', category: 'Analytics', logo: DefaultIcon, url: 'https://segment.com', color: '#52BD94' },
  
  // E-commerce
  { name: 'Shopify', category: 'E-commerce', logo: ShopifyIcon, url: 'https://shopify.com', color: '#96BF48' },
  { name: 'WooCommerce', category: 'E-commerce', logo: DefaultIcon, url: 'https://woocommerce.com', color: '#96588A' },
  { name: 'BigCommerce', category: 'E-commerce', logo: DefaultIcon, url: 'https://bigcommerce.com', color: '#121118' },
  { name: 'Square', category: 'E-commerce', logo: DefaultIcon, url: 'https://squareup.com', color: '#3E4348' },
  { name: 'PayPal', category: 'E-commerce', logo: DefaultIcon, url: 'https://paypal.com', color: '#003087' },
  { name: 'Stripe', category: 'E-commerce', logo: StripeIcon, url: 'https://stripe.com', color: '#635BFF' },
  { name: 'Etsy', category: 'E-commerce', logo: DefaultIcon, url: 'https://etsy.com', color: '#F14000' },
  { name: 'Gumroad', category: 'E-commerce', logo: DefaultIcon, url: 'https://gumroad.com', color: '#36A9AE' },
  
  // Comunicación
  { name: 'Slack', category: 'Comunicación', logo: SlackIcon, url: 'https://slack.com', color: '#4A154B' },
  { name: 'Zoom', category: 'Comunicación', logo: ZoomIcon, url: 'https://zoom.us', color: '#2D8CFF' },
  { name: 'Discord', category: 'Comunicación', logo: DefaultIcon, url: 'https://discord.com', color: '#5865F2' },
  { name: 'Microsoft Teams', category: 'Comunicación', logo: DefaultIcon, url: 'https://teams.microsoft.com', color: '#6264A7' },
  { name: 'Google Meet', category: 'Comunicación', logo: DefaultIcon, url: 'https://meet.google.com', color: '#00897B' },
  { name: 'Skype', category: 'Comunicación', logo: DefaultIcon, url: 'https://skype.com', color: '#00AFF0' },
  { name: 'Telegram', category: 'Comunicación', logo: DefaultIcon, url: 'https://telegram.org', color: '#229ED9' },
  { name: 'WhatsApp', category: 'Comunicación', logo: DefaultIcon, url: 'https://whatsapp.com', color: '#25D366' },
  
  // Educación
  { name: 'Duolingo', category: 'Educación', logo: DefaultIcon, url: 'https://duolingo.com', color: '#58CC02' },
  { name: 'Coursera', category: 'Educación', logo: DefaultIcon, url: 'https://coursera.org', color: '#0056D2' },
  { name: 'Khan Academy', category: 'Educación', logo: DefaultIcon, url: 'https://khanacademy.org', color: '#14BF96' },
  { name: 'Udemy', category: 'Educación', logo: DefaultIcon, url: 'https://udemy.com', color: '#A435F0' },
  { name: 'edX', category: 'Educación', logo: DefaultIcon, url: 'https://edx.org', color: '#02262B' },
  { name: 'Skillshare', category: 'Educación', logo: DefaultIcon, url: 'https://skillshare.com', color: '#00FF84' },
  { name: 'MasterClass', category: 'Educación', logo: DefaultIcon, url: 'https://masterclass.com', color: '#000000' },
  { name: 'Pluralsight', category: 'Educación', logo: DefaultIcon, url: 'https://pluralsight.com', color: '#F15B2A' },
  
  // Social Media
  { name: 'Instagram', category: 'Social Media', logo: InstagramIcon, url: 'https://instagram.com', color: '#E4405F' },
  { name: 'LinkedIn', category: 'Social Media', logo: LinkedInIcon, url: 'https://linkedin.com', color: '#0A66C2' },
  { name: 'TikTok', category: 'Social Media', logo: DefaultIcon, url: 'https://tiktok.com', color: '#000000' },
  { name: 'Pinterest', category: 'Social Media', logo: DefaultIcon, url: 'https://pinterest.com', color: '#E60023' },
  { name: 'Twitter/X', category: 'Social Media', logo: DefaultIcon, url: 'https://twitter.com', color: '#000000' },
  { name: 'Facebook', category: 'Social Media', logo: DefaultIcon, url: 'https://facebook.com', color: '#1877F2' },
  { name: 'Reddit', category: 'Social Media', logo: DefaultIcon, url: 'https://reddit.com', color: '#FF4500' },
  { name: 'YouTube', category: 'Social Media', logo: DefaultIcon, url: 'https://youtube.com', color: '#FF0000' },
  
  // Automatización
  { name: 'Zapier', category: 'Automatización', logo: DefaultIcon, url: 'https://zapier.com', color: '#FF4A00' },
  { name: 'Make', category: 'Automatización', logo: DefaultIcon, url: 'https://make.com', color: '#6D00CC' },
  { name: 'IFTTT', category: 'Automatización', logo: DefaultIcon, url: 'https://ifttt.com', color: '#000000' },
  { name: 'n8n', category: 'Automatización', logo: DefaultIcon, url: 'https://n8n.io', color: '#EA4B71' },
  { name: 'Integromat', category: 'Automatización', logo: DefaultIcon, url: 'https://integromat.com', color: '#2F8EED' },
  { name: 'Automate.io', category: 'Automatización', logo: DefaultIcon, url: 'https://automate.io', color: '#27AE60' },
  { name: 'Pabbly', category: 'Automatización', logo: DefaultIcon, url: 'https://pabbly.com', color: '#FF6900' },
  { name: 'Workato', category: 'Automatización', logo: DefaultIcon, url: 'https://workato.com', color: '#1063E1' },
  
  // Cloud
  { name: 'AWS', category: 'Cloud', logo: DefaultIcon, url: 'https://aws.amazon.com', color: '#FF9900' },
  { name: 'Google Cloud', category: 'Cloud', logo: DefaultIcon, url: 'https://cloud.google.com', color: '#4285F4' },
  { name: 'Microsoft Azure', category: 'Cloud', logo: DefaultIcon, url: 'https://azure.microsoft.com', color: '#0078D4' },
  { name: 'DigitalOcean', category: 'Cloud', logo: DefaultIcon, url: 'https://digitalocean.com', color: '#0080FF' },
  { name: 'Linode', category: 'Cloud', logo: DefaultIcon, url: 'https://linode.com', color: '#00A95C' },
  { name: 'Cloudflare', category: 'Cloud', logo: DefaultIcon, url: 'https://cloudflare.com', color: '#F38020' },
  { name: 'Heroku', category: 'Cloud', logo: DefaultIcon, url: 'https://heroku.com', color: '#430098' },
  
  // IA Tools
  { name: 'Hugging Face', category: 'IA Tools', logo: DefaultIcon, url: 'https://huggingface.co', color: '#FFD21E' },
  { name: 'Replicate', category: 'IA Tools', logo: DefaultIcon, url: 'https://replicate.com', color: '#000000' },
  { name: 'Cohere', category: 'IA Tools', logo: DefaultIcon, url: 'https://cohere.ai', color: '#39594D' },
  { name: 'Anthropic', category: 'IA Tools', logo: DefaultIcon, url: 'https://anthropic.com', color: '#D97757' },
  { name: 'OpenAI', category: 'IA Tools', logo: DefaultIcon, url: 'https://openai.com', color: '#00A67E' },
];

export default function HorizontalTechTicker() {
  // Duplicamos los logos solo una vez para crear el efecto infinito
  const duplicatedTools = [...techTools, ...techTools];
  
  // Detectar si es móvil
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="ticker-container">
      <div className="ticker-wrapper">
        <div 
          className="ticker-content"
          style={{
            animation: `ticker-scroll ${isMobile ? '50s' : '40s'} linear infinite`,
            WebkitAnimation: `ticker-scroll ${isMobile ? '50s' : '40s'} linear infinite`,
            MozAnimation: `ticker-scroll ${isMobile ? '50s' : '40s'} linear infinite`
          }}
        >
          {duplicatedTools.map((tool, index) => (
            <a
              key={`${tool.name}-${index}`}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ticker-item"
              aria-label={`Visitar ${tool.name}`}
            >
              <div className="ticker-item-inner">
                <div className="ticker-logo">
                  <tool.logo className="w-full h-full" />
                </div>
                <div className="ticker-text">
                  <span className="ticker-name">{tool.name}</span>
                  <span className="ticker-category">{tool.category}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ticker-container {
          position: relative;
          width: 100%;
          padding: 20px 0;
          background: #1a2847;
          overflow: hidden;
        }

        .ticker-wrapper {
          display: flex;
          align-items: center;
          height: 100%;
          overflow: hidden;
          position: relative;
        }

        .ticker-content {
          display: flex !important;
          align-items: center;
          gap: 24px;
          padding: 0 24px;
          will-change: transform;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          perspective: 1000px;
        }
        
        @keyframes ticker-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        
        @-webkit-keyframes ticker-scroll {
          0% {
            -webkit-transform: translate3d(0, 0, 0);
          }
          100% {
            -webkit-transform: translate3d(-50%, 0, 0);
          }
        }
        
        @-moz-keyframes ticker-scroll {
          0% {
            -moz-transform: translate3d(0, 0, 0);
          }
          100% {
            -moz-transform: translate3d(-50%, 0, 0);
          }
        }
        
        /* Pausa al hacer hover */
        .ticker-wrapper:hover .ticker-content {
          animation-play-state: paused !important;
          -webkit-animation-play-state: paused !important;
          -moz-animation-play-state: paused !important;
        }

        .ticker-item {
          flex-shrink: 0;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          text-decoration: none;
          display: inline-block;
          color: inherit;
        }

        .ticker-item-inner {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          background: rgba(59, 130, 246, 0.08);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 12px;
          transition: all 0.3s ease;
          min-width: 180px;
          height: 64px;
          position: relative;
          overflow: visible;
        }

        .ticker-logo {
          width: 36px;
          height: 36px;
          min-width: 36px;
          min-height: 36px;
          object-fit: contain;
          color: white;
          opacity: 0.9;
          transition: all 0.3s ease;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ticker-logo svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .ticker-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex-grow: 1;
          min-width: 0;
          overflow: hidden;
        }

        .ticker-name {
          font-size: 15px;
          font-weight: 600;
          color: white;
          opacity: 0.95;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ticker-category {
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ticker-item:hover .ticker-item-inner {
          background: rgba(59, 130, 246, 0.15);
          border-color: rgba(59, 130, 246, 0.5);
          transform: translateY(-1px);
          box-shadow: 
            0 4px 12px -2px rgba(59, 130, 246, 0.2),
            0 0 0 1px rgba(59, 130, 246, 0.1);
        }

        .ticker-item:hover .ticker-logo {
          opacity: 1;
          transform: scale(1.05);
        }

        .ticker-item:hover .ticker-name {
          opacity: 1;
        }

        .ticker-item:hover .ticker-category {
          color: rgba(255, 255, 255, 0.7);
        }

        @media (max-width: 768px) {
          .ticker-container {
            padding: 16px 0;
          }

          .ticker-content {
            gap: 16px;
            padding: 0 16px;
          }

          .ticker-item-inner {
            padding: 10px 16px;
            min-width: 160px;
            height: 56px;
            gap: 10px;
          }

          .ticker-logo {
            width: 32px;
            height: 32px;
          }

          .ticker-name {
            font-size: 14px;
          }

          .ticker-category {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}