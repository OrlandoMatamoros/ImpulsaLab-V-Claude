"use client";
import * as React from 'react';

interface TechTool {
  name: string;
  logo: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  url: string;
  color: string;
}

// Actualizar TODOS los iconos para aceptar style
const GoogleAIIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const OpenAIIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

const ClaudeIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const ExcelIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h18v18H3V3zm3 3v12h12V6H6zm2 2h8v2H8V8zm0 3h8v2H8v-2zm0 3h8v2H8v-2z"/>
  </svg>
);

const PowerBIIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 13h4v8H3v-8zm6-6h4v14H9V7zm6-4h4v18h-4V3z"/>
  </svg>
);

const NextJSIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 22h20L12 2z"/>
  </svg>
);

const VercelIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 22h20L12 2z"/>
  </svg>
);

const GitHubIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const FirebaseIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.803 21.764l7.856 4.427a1.621 1.621 0 001.588 0l7.856-4.427L18.925 5.764a.542.542 0 00-.919-.295L12 15.764 6.722 5.469a.542.542 0 00-.919.295l-4.178 16z"/>
  </svg>
);

const ZapierIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l8 6-8 6v-4H4v-4h8V2z"/>
  </svg>
);

const MakeIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
  </svg>
);

const TailwindIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.47 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.47 12 7 12z"/>
  </svg>
);

const FigmaIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 7.5a3.5 3.5 0 110-7h-7a3.5 3.5 0 000 7 3.5 3.5 0 000 7 3.5 3.5 0 000 7h3.5a3.5 3.5 0 000-7 3.5 3.5 0 000-7z"/>
  </svg>
);

const StripeIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/>
  </svg>
);

// NUEVOS ICONOS con soporte para style
const ChatGPTIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
  </svg>
);

const MidjourneyIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
  </svg>
);

const NotionIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v15c0 1.38-1.119 2.5-2.5 2.5h-11C5.119 22 4 20.88 4 19.5v-15zM6.5 4c-.276 0-.5.224-.5.5v15c0 .276.224.5.5.5h11c.276 0 .5-.224.5-.5v-15c0-.276-.224-.5-.5-.5h-11zM8 7h8v2H8V7zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"/>
  </svg>
);

const SlackIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
  </svg>
);

const CanvaIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
  </svg>
);

const HubSpotIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.5 21a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-11-11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11.8 1.7V7.5a2.5 2.5 0 0 0-2.5-2.5h-4.3V2.83a2 2 0 1 0-2 0V5H7a2.5 2.5 0 0 0-2.5 2.5V12l-1.67 1.67a2 2 0 1 0 1.414 1.414L6 13.2h5.5v2.3c0 .04.01.08.01.13A3.49 3.49 0 0 0 8 19.5a3.5 3.5 0 0 0 3.5 3.5 3.49 3.49 0 0 0 3.49-3.37c.23.13.49.2.76.2h.25v1.67a2 2 0 1 0 2 0v-1.67A2.5 2.5 0 0 0 20.5 17v-4.3a2.5 2.5 0 0 0-2.2-1zM13 17H7v-7h6v7z"/>
  </svg>
);

const MailchimpIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.99 11.91c.03-.47.01-.95-.08-1.41-.43-2.13-1.88-3.71-3.66-4.44-.67-.28-1.4-.43-2.15-.44-.31 0-.63.03-.94.08-.06.01-.12.02-.17.03-.24-.41-.57-.78-.96-1.07a3.434 3.434 0 0 0-1.83-.53c-.34 0-.69.05-1.02.16-.08.03-.17.06-.25.09-.39-.65-.95-1.2-1.62-1.59a4.25 4.25 0 0 0-2.06-.53c-.42 0-.85.06-1.27.19-1.16.35-2.12 1.15-2.7 2.24-.1.19-.19.39-.27.59-.45.09-.89.25-1.29.47A4.23 4.23 0 0 0 .48 8.89c-.1.39-.14.8-.12 1.2.01.26.04.51.09.76-.39.32-.73.71-.99 1.16a3.945 3.945 0 0 0 .21 4.29c.45.68 1.09 1.21 1.85 1.51.29.12.6.2.91.25-.02.42.03.84.14 1.25.35 1.26 1.23 2.28 2.4 2.8.4.18.84.29 1.29.32h.27c.69-.04 1.35-.26 1.92-.62.16-.1.31-.21.45-.34.42.55.95 1 1.56 1.31.68.35 1.43.53 2.21.53.42 0 .84-.05 1.26-.16 1.17-.3 2.15-1.02 2.77-2.03.17-.27.3-.56.4-.86.5-.1.98-.28 1.42-.53a4.24 4.24 0 0 0 2.05-3.31c.02-.17.03-.34.03-.51 0-.19-.01-.38-.03-.57.26-.21.5-.45.7-.72a3.93 3.93 0 0 0 .8-2.36z"/>
  </svg>
);

const WordPressIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.42 12c0-4.75 3.85-8.58 8.58-8.58 4.73 0 8.58 3.83 8.58 8.58 0 4.73-3.85 8.58-8.58 8.58-4.73 0-8.58-3.85-8.58-8.58zm1.22 0c0 4.05 3.31 7.36 7.36 7.36 4.05 0 7.36-3.31 7.36-7.36 0-4.06-3.31-7.36-7.36-7.36-4.05 0-7.36 3.3-7.36 7.36zM5.68 7.61h4.98l-3.04 8.9zm11.07 0h4.11c-.18-.68-.48-1.3-.87-1.85-1.29-1.8-3.61-2.5-5.65-1.7-.68.26-1.3.68-1.82 1.21 1.48-.1 2.81.65 3.62 1.96.3.48.49 1.03.54 1.61H15.7l-2.38 6.88-2.36-6.88h1.14c-.04-.1-.06-.21-.06-.31 0-.64.52-1.16 1.16-1.16.64 0 1.16.52 1.16 1.16 0 .1-.02.21-.06.31z"/>
  </svg>
);

const ShopifyIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.33 8.06c-.02-.1-.1-.16-.19-.16-.02 0-.22.07-.53.2-.05-.14-.12-.34-.22-.54-.31-.63-.77-.96-1.32-.96h-.1c-.19-.25-.43-.36-.65-.36-.51 0-1.01.36-1.42 1-.28.44-.5 1.01-.56 1.44-.58.18-1 .31-1 .32-.31.1-.32.11-.36.4-.03.22-.84 6.46-.84 6.46l6.31 1.18 3.36-.84s-1.38-9.32-1.4-9.43zm-2.37-.73l-.8.25v-.17c0-.41-.06-.74-.15-.98.37.05.62.47.76.9zm-1.25-1.87c.1.17.16.41.16.74v.05l-1.21.37c.12-.45.31-.84.53-1.07.09-.09.19-.14.29-.14.09 0 .17.02.23.05zm-.51-.21c.03 0 .07 0 .1.01-.14.07-.29.19-.43.35-.35.39-.62 1-.69 1.59l-1.04.32c.09-.61.43-2.27 1.32-2.27h.11s.43 0 .63 0zM12.95 16l-.13-2.09s-.75.51-1.66.51c-1.33 0-1.4-.83-1.4-.83s.93-5.74.93-5.74.66-5.73.66-5.73c.01-.03-.02-.04-.03-.04h-1.3c-.02 0-.04.02-.04.04l-.84 5.88s-.12.87-1.07 1.66c-.32.26-.67.44-.95.49-.14.02-.27.02-.39.02-.85 0-1.19-.6-1.19-.6s-.25-.42-.28-1.26c-.01-.29.01-.63.05-1.02l.84-5.17c.01-.03-.02-.04-.03-.04h-1.3c-.02 0-.04.02-.04.04l-.85 5.52c-.06.42-.09.81-.08 1.16.03 1.36.73 2.13 1.92 2.13.23 0 .47-.03.73-.08.72-.15 1.38-.51 1.73-.73 0 0-.03.21-.03.31 0 .86.69 1.56 1.56 1.56 1.27 0 2.04-.64 2.04-.64l.26 4.1 2.74-.61s-1.15-7.73-1.15-7.73z"/>
  </svg>
);

const AsanaIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.78 12.653c-2.882 0-5.22 2.336-5.22 5.22s2.338 5.22 5.22 5.22 5.22-2.336 5.22-5.22-2.336-5.22-5.22-5.22zm-13.56 0c-2.882 0-5.22 2.336-5.22 5.22s2.338 5.22 5.22 5.22 5.22-2.336 5.22-5.22-2.336-5.22-5.22-5.22zM12 .907C9.118.907 6.78 3.243 6.78 6.127s2.338 5.22 5.22 5.22 5.22-2.336 5.22-5.22S14.882.907 12 .907z"/>
  </svg>
);

const techTools: TechTool[] = [
  // Herramientas existentes con colores vibrantes
  { name: 'Google AI', logo: GoogleAIIcon, url: 'https://gemini.google.com', color: '#4285F4' },
  { name: 'OpenAI', logo: OpenAIIcon, url: 'https://openai.com', color: '#00A67E' },
  { name: 'Claude', logo: ClaudeIcon, url: 'https://claude.ai', color: '#8B5CF6' },
  { name: 'Excel', logo: ExcelIcon, url: 'https://www.microsoft.com/excel', color: '#217346' },
  { name: 'Power BI', logo: PowerBIIcon, url: 'https://powerbi.microsoft.com', color: '#F2C811' },
  { name: 'Next.js', logo: NextJSIcon, url: 'https://nextjs.org', color: '#FFFFFF' },
  { name: 'Vercel', logo: VercelIcon, url: 'https://vercel.com', color: '#FFFFFF' },
  { name: 'GitHub', logo: GitHubIcon, url: 'https://github.com', color: '#FFFFFF' },
  { name: 'Firebase', logo: FirebaseIcon, url: 'https://firebase.google.com', color: '#FFCA28' },
  { name: 'Make.com', logo: MakeIcon, url: 'https://make.com', color: '#6D00CC' },
  { name: 'Zapier', logo: ZapierIcon, url: 'https://zapier.com', color: '#FF4A00' },
  { name: 'Tailwind', logo: TailwindIcon, url: 'https://tailwindcss.com', color: '#06B6D4' },
  { name: 'Figma', logo: FigmaIcon, url: 'https://figma.com', color: '#F24E1E' },
  { name: 'Stripe', logo: StripeIcon, url: 'https://stripe.com', color: '#008CDD' },
  
  // NUEVAS herramientas de IA y productividad con colores vibrantes
  { name: 'ChatGPT', logo: ChatGPTIcon, url: 'https://chat.openai.com', color: '#74AA9C' },
  { name: 'Midjourney', logo: MidjourneyIcon, url: 'https://midjourney.com', color: '#5865F2' },
  { name: 'Notion', logo: NotionIcon, url: 'https://notion.so', color: '#FFFFFF' },
  { name: 'Slack', logo: SlackIcon, url: 'https://slack.com', color: '#4A154B' },
  { name: 'Canva', logo: CanvaIcon, url: 'https://canva.com', color: '#00C4CC' },
  { name: 'HubSpot', logo: HubSpotIcon, url: 'https://hubspot.com', color: '#FF7A59' },
  { name: 'Mailchimp', logo: MailchimpIcon, url: 'https://mailchimp.com', color: '#FFE01B' },
  { name: 'WordPress', logo: WordPressIcon, url: 'https://wordpress.org', color: '#21759B' },
  { name: 'Shopify', logo: ShopifyIcon, url: 'https://shopify.com', color: '#96BF48' },
  { name: 'Asana', logo: AsanaIcon, url: 'https://asana.com', color: '#FC636B' },
];

const VerticalTechTicker: React.FC = () => {
  const duplicatedTools = [...techTools, ...techTools];
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  // Función para determinar si un elemento está en el centro
  const isInCenter = (index: number, totalItems: number) => {
    const position = index % totalItems;
    return position >= 5 && position <= 8;
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Título impactante con gradiente */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
          Arsenal Tecnológico de Élite
        </h3>
        <p className="text-blue-200 text-sm md:text-base">
          Potenciamos tu negocio con las herramientas líderes en IA y productividad
        </p>
      </div>

      <div className="relative h-96 overflow-hidden bg-transparent">
        {/* Gradientes superiores e inferiores con efecto glow */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#002D62] via-[#002D62]/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#002D62] via-[#002D62]/80 to-transparent"></div>
          
          {/* Glow effect en el centro */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-blue-500/10 blur-3xl"></div>
        </div>

        <div className="flex h-full gap-16 justify-center items-center px-4">
          {/* Columna izquierda que sube */}
          <div className="relative h-full overflow-hidden w-32">
            <div className="absolute flex flex-col gap-8 animate-slide-up">
              {duplicatedTools.map((tool, index) => {
                const LogoComponent = tool.logo;
                const inCenter = isInCenter(index, techTools.length);
                
                return (
                  
                    <a key={`up-${index}`}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative flex flex-col items-center justify-center w-28 h-28 rounded-xl transition-all duration-500 cursor-pointer border ${
                      inCenter 
                        ? 'bg-white/20 border-white/40 shadow-lg shadow-white/20 scale-110' 
                        : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40'
                    }`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <LogoComponent 
                      className={`w-10 h-10 transition-all duration-500 ${
                        hoveredIndex === index ? 'scale-125' : inCenter ? 'scale-110' : 'group-hover:scale-110'
                      }`}
                      style={{
                        color: hoveredIndex === index || inCenter ? tool.color : 'rgba(255, 255, 255, 0.7)',
                        filter: hoveredIndex === index || inCenter ? 'drop-shadow(0 0 8px currentColor)' : 'none',
                      }}
                    />
                    <div className={`mt-2 text-xs transition-all duration-500 text-center px-2 leading-tight font-medium ${
                      inCenter ? 'text-white font-semibold' : 'text-white/60 group-hover:text-white/90'
                    }`}>
                      {tool.name}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Columna derecha que baja */}
          <div className="relative h-full overflow-hidden w-32">
            <div className="absolute flex flex-col gap-8 animate-slide-down">
              {duplicatedTools.map((tool, index) => {
                const LogoComponent = tool.logo;
                const inCenter = isInCenter(index, techTools.length);
                const downIndex = index + 1000;
                
                return (
                  
                    <a key={`down-${index}`}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative flex flex-col items-center justify-center w-28 h-28 rounded-xl transition-all duration-500 cursor-pointer border ${
                      inCenter 
                        ? 'bg-white/20 border-white/40 shadow-lg shadow-white/20 scale-110' 
                        : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40'
                    }`}
                    onMouseEnter={() => setHoveredIndex(downIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <LogoComponent 
                      className={`w-10 h-10 transition-all duration-500 ${
                        hoveredIndex === downIndex ? 'scale-125' : inCenter ? 'scale-110' : 'group-hover:scale-110'
                      }`}
                      style={{
                        color: hoveredIndex === downIndex || inCenter ? tool.color : 'rgba(255, 255, 255, 0.7)',
                        filter: hoveredIndex === downIndex || inCenter ? 'drop-shadow(0 0 8px currentColor)' : 'none',
                      }}
                    />
                    <div className={`mt-2 text-xs transition-all duration-500 text-center px-2 leading-tight font-medium ${
                      inCenter ? 'text-white font-semibold' : 'text-white/60 group-hover:text-white/90'
                    }`}>
                      {tool.name}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalTechTicker;