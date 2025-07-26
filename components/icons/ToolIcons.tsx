import React from 'react';

// ========== ICONOS SVG COMPLETOS (1-139) ==========

// 1. ChatGPT - #00A67E
const ChatGPTIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
  </svg>
);

// 2. Claude - #D97757
const ClaudeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.707 2.293a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 1 1 1.414-1.414L11 7.586l5.293-5.293a1 1 0 0 1 1.414 0zM17.707 21.707a1 1 0 0 0 0-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 0 0 1.414 1.414L11 16.414l5.293 5.293a1 1 0 0 0 1.414 0z"/>
  </svg>
);

// 3. Gemini - #4285F4
const GeminiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2zm0 4.83L10.42 11.17 6.08 12l4.34.83L12 17.17l1.58-4.34L17.92 12l-4.34-.83L12 6.83z"/>
  </svg>
);

// 4. Perplexity - #20B2AA
const PerplexityIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
  </svg>
);

// 5. Copilot - #0078D4
const CopilotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4v8.82c0 4.34-2.88 8.36-7 9.68V4.18z"/>
  </svg>
);

// 6. Poe - #7B3FF2
const PoeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
  </svg>
);

// 7. You.com - #7B5BF2
const YouComIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.5L17.5 8v8L12 19.5 6.5 16V8L12 4.5zm0 3L8.5 10v4L12 16.5l3.5-2.5V10L12 7.5z"/>
  </svg>
);

// 8. Phind - #00D9B1
const PhindIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l-1 3.5L7.5 4 9 7.5 5.5 9l3.5 1L8 13.5l3.5-1.5L12 16l.5-3.5 3.5 1.5-1-3.5 3.5-1L15 7.5 16.5 4 13 5.5 12 2zm0 6a4 4 0 100 8 4 4 0 000-8z"/>
  </svg>
);

// 9. Figma - #F24E1E
const FigmaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.332 8.668a3.333 3.333 0 0 0 0-6.663H8.668a3.333 3.333 0 0 0 0 6.663 3.333 3.333 0 0 0 0 6.665 3.333 3.333 0 1 0 3.332-3.332V8.668h3.332Z"/>
    <circle cx="15.332" cy="12.001" r="3.332"/>
  </svg>
);

// 10. Canva - #00C4CC
const CanvaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

// 11. Adobe Firefly - #FF0000
const AdobeFireflyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.1 2H22v20h-6.9L12 13.7 8.9 22H2V2h6.9L12 10.3 15.1 2zm-3.7 12.3L8.5 7.5 6 15h4.5l1.5-3.5 1.5 3.5H18l-2.5-7.5-3.1 6.8z"/>
  </svg>
);

// 12. Framer - #0055FF
const FramerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h16v8h-8l8 8H4v-8h8L4 4z"/>
  </svg>
);

// 13. Sketch - #F7B500
const SketchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L5 4l-3 6 10 12L22 10l-3-6-7-2zm0 2.5L16.5 6 18 9l-6 9-6-9 1.5-3L12 4.5z"/>
  </svg>
);

// 14. Adobe XD - #FF61F6
const AdobeXDIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.5 2H22v20h-3.5l-3.2-5.5L12 22H8.5L5 16.5 1.5 22H2V2h3.5l3.5 6 3-6h3.5l-3.5 6 3.5 6 3.5-6-3.5-6h3z"/>
  </svg>
);

// 15. InVision - #FF3366
const InVisionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7V7h2v10zm4-6c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3V7h2v4.2c.3-.1.6-.2 1-.2z"/>
  </svg>
);

// 16. Penpot - #000000
const PenpotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14l-4 8h8l-4-8z"/>
  </svg>
);

// 17. Lunacy - #179DE3
const LunacyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18V4c4.41 0 8 3.59 8 8s-3.59 8-8 8z"/>
  </svg>
);

// 18. Midjourney - #5865F2
const MidjourneyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5L18 8v8l-6 3-6-3V8l6-3.5zm0 4L9 10v4l3 1.5 3-1.5v-4L12 8.5z"/>
  </svg>
);

// 19. DALL-E 3 - #00A67E
const DallE3Icon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-3-3 3-3v2h4v-2l3 3-3 3v-2h-4v2z"/>
  </svg>
);

// 20. Stable Diffusion - #9333EA
const StableDiffusionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2l7 3.9v7.8l-7 3.9-7-3.9V8.1l7-3.9z"/>
  </svg>
);

// 21. Leonardo AI - #5C16C5
const LeonardoAIIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l-8 4v8l8 8 8-8V6l-8-4zm0 2.5L17.5 7v7L12 19.5 6.5 14V7L12 4.5z"/>
  </svg>
);

// 22. Ideogram - #6366F1
const IdeogramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm3 3h6v6H9V9z"/>
  </svg>
);

// 23. Bing Image Creator - #0078D4
const BingImageIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 2L3 5v14l6 3 9-5V7L9 2zm0 2.7l6 3.3v6l-6 3.3V4.7zm-4 3l3 1.7v7.9l-3-1.5V7.7z"/>
  </svg>
);

// 24. NightCafe - #FF6B6B
const NightCafeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 21h18v-2H2v2zm2-3h14l-1.5-5h-11L4 18zm3.5-7C6.67 11 6 10.33 6 9.5S6.67 8 7.5 8 9 8.67 9 9.5 8.33 11 7.5 11zm9 0c-.83 0-1.5-.67-1.5-1.5S15.67 8 16.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM12 6c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z"/>
  </svg>
);

// 25. Artbreeder - #1A1A1A
const ArtbreederIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l7 4.5-7 4.5z"/>
  </svg>
);

// 26. Synthesia - #4353FF
const SynthesiaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15V7l7 5-7 5z"/>
  </svg>
);

// 27. RunwayML - #000000
const RunwayMLIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4v20h16V2zm-2 18H6V4h12v16zm-8-3l5-5-5-5v10z"/>
  </svg>
);

// 28. Pika Labs - #FF4B4B
const PikaLabsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l-5.5 9h11L12 2zm0 3.84L14.91 10h-5.82L12 5.84zM17.5 13l-5.5 9-5.5-9h11zm-5.5 5.16L9.09 14h5.82L12 18.16z"/>
  </svg>
);

// 29. HeyGen - #5C3EE8
const HeyGenIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-6h2v6zm4 0h-2v-6h2v6z"/>
  </svg>
);

// 30. D-ID - #6C5CE7
const DIDIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z"/>
  </svg>
);
// 31. Fliki - #FF6B6B
const FlikiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
  </svg>
);

// 32. Pictory - #00D4FF
const PictoryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 10l4 5 3-4 4 5H5l3-5z"/>
  </svg>
);

// 33. Descript - #5E5ADB
const DescriptIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 18H6V6h2v12zm4 0h-2V6h2v12zm4 0h-2V6h2v12zm4 0h-2V6h2v12z"/>
  </svg>
);

// 34. Lumen5 - #5846F6
const Lumen5Icon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l-8 8 8 8 8-8-8-8zm0 2.83L17.17 10 12 15.17 6.83 10 12 4.83z"/>
  </svg>
);

// 35. Notion - #000000
const NotionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.746c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.631 7.083v-6.31l-1.215-.14c-.093-.514.28-.887.747-.933l3.255-.187z"/>
  </svg>
);

// 36. Obsidian - #7C3AED
const ObsidianIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.5L17.5 8v8L12 19.5 6.5 16V8L12 4.5z"/>
  </svg>
);

// 37. Monday - #FF3D71
const MondayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm6-2c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm8 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z"/>
  </svg>
);

// 38. ClickUp - #7B68EE
const ClickUpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 17l10-7-10-7v14zm10-14v14l10-7-10-7z"/>
  </svg>
);

// 39. Asana - #F06A6A
const AsanaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.78 12.65c-2.59 0-4.7 2.11-4.7 4.7s2.11 4.7 4.7 4.7 4.7-2.11 4.7-4.7-2.11-4.7-4.7-4.7zm-13.56 0c-2.59 0-4.7 2.11-4.7 4.7s2.11 4.7 4.7 4.7 4.7-2.11 4.7-4.7-2.11-4.7-4.7-4.7zM12 1.95c-2.59 0-4.7 2.11-4.7 4.7s2.11 4.7 4.7 4.7 4.7-2.11 4.7-4.7-2.11-4.7-4.7-4.7z"/>
  </svg>
);

// 40. Trello - #0079BF
const TrelloIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7V7h2v10zm6-4h-2V7h2v6z"/>
  </svg>
);

// 41. Todoist - #E44332
const TodoistIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 3L3 10.53v1.98l6.84 2.65L12.48 21h1.96l8.56-18z"/>
  </svg>
);

// 42. Linear - #5E6AD2
const LinearIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.5 3.5h17v17h-17v-17zm2 2v13h13v-13h-13z"/>
  </svg>
);

// 43. Coda - #F46A54
const CodaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c2.19 0 4.22-.71 5.86-1.9l-1.42-1.42A7.927 7.927 0 0112 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8c0 .89-.15 1.74-.42 2.54l1.58 1.58c.56-1.24.86-2.62.86-4.08 0-5.52-4.48-10-10-10z"/>
  </svg>
);

// 44. Airtable - #FCB400
const AirtableIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 4v16h-4v-4h-4v4h-4v-4H6v4H2V4h4v4h4V4h4v4h4V4h4zM10 12V8H6v4h4zm0 4v-4H6v4h4zm4 0v-4h-4v4h4zm0-4V8h-4v4h4zm4 4v-4h-4v4h4zm0-4V8h-4v4h4z"/>
  </svg>
);

// 45. AIVA - #000000
const AIVAIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.3l7.5 3.75v7.5L12 19.3l-7.5-3.75v-7.5L12 4.3z"/>
  </svg>
);

// 46. Jasper - #5C16C5
const JasperIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  </svg>
);

// 47. Copy.ai - #7C3AED
const CopyAIIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
  </svg>
);

// 48. Grammarly - #15B67A
const GrammarlyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

// 49. Hemingway - #F7BE16
const HemingwayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
  </svg>
);

// 50. ProWritingAid - #00A8E1
const ProWritingAidIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
  </svg>
);

// 51. Rytr - #FF5A5F
const RytrIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15v-2h4v2h-4zm4-4h-4V7h4v6z"/>
  </svg>
);

// 52. Wordtune - #6B46C1
const WordtuneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-9 14H6v-2h5v2zm7-4H6v-2h12v2zm0-4H6V6h12v2z"/>
  </svg>
);

// 53. GitHub - #24292E
const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

// 54. GitHub Copilot - #24292E
const GitHubCopilotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5l1.876-1.876A7.5 7.5 0 114.5 12a7.47 7.47 0 011.124 3.938L3.686 17.876A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm3.707 7.293l-5 5a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L10 12.172l4.293-4.293a1 1 0 011.414 1.414z"/>
  </svg>
);

// 55. Cursor - #000000
const CursorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4l16 6.5L12.5 13l-2.5 7.5L4 4zm3.5 3.5l3.5 9.5 1.5-4.5 4.5-1.5-9.5-3.5z"/>
  </svg>
);

// 56. Tabnine - #FF6B6B
const TabnineIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.5L18.5 8v8L12 19.5 5.5 16V8L12 4.5zm0 3L8 9.5v5l4 2 4-2v-5L12 7.5z"/>
  </svg>
);

// 57. Replit - #F26207
const ReplitIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c1.105 0 2 .895 2 2v4h4c0 1.105-.895 2-2 2h-4v4c0 1.105-.895 2-2 2s-2-.895-2-2v-4H4c0-1.105.895-2 2-2h4V6c0-1.105.895-2 2-2z"/>
  </svg>
);

// 58. CodePen - #000000
const CodePenIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l10 6.5v7L12 22l-10-6.5v-7L12 2zm0 2.1L5.5 8v2.8l2.2-1.5 1.5 1v-3.2L12 5.5v-1.4zm0 0v1.4l2.8 1.6v3.2l1.5-1 2.2 1.5V8L12 4.1zM4 10.7v2.6l1.8-1.3L4 10.7zm16 0l-1.8 1.3 1.8 1.3v-2.6zm-10.8.8l-2.7 1.9 2.7 1.9v-3.8zm5.6 0v3.8l2.7-1.9-2.7-1.9zM12 13l-2.2 1.5L12 16l2.2-1.5L12 13z"/>
  </svg>
);

// 59. CodeSandbox - #040404
const CodeSandboxIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 6l10-4 10 4v12l-10 4-10-4V6zm18 0l-8-3.2v7.4l8 3.2V6zm-10 11.8l8-3.2v-7.4l-8 3.2v7.4zm-6-7.4l6-2.4v7.4l-6 2.4V10.4z"/>
  </svg>
);

// 60. Vercel - #000000
const VercelIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 22h20L12 2z"/>
  </svg>
);
// 61. Netlify - #00C7B7
const NetlifyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 12l3 3 1-1v7h12v-7l1 1 3-3L12 2zm0 3.83L17.17 11H15v8H9v-8H6.83L12 5.83z"/>
  </svg>
);

// 62. Railway - #853BCE
const RailwayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
  </svg>
);

// 63. Supabase - #3ECF8E
const SupabaseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.9 1.4c.3-.5 1-.5 1.3 0l9.5 17.1c.3.6-.1 1.3-.7 1.3H2.5c-.6 0-1-.7-.7-1.3L11.2 1.4h.7zm.1 5.6c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1s1-.4 1-1V8c0-.6-.4-1-1-1zm0 10c-.6 0-1 .4-1 1s.4 1 1 1 1-.4 1-1-.4-1-1-1z"/>
  </svg>
);

// 64. ElevenLabs - #000000
const ElevenLabsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 3v18h2V3H5zm4 0v18h2V3H9zm4 2v14h2V5h-2zm4 2v10h2V7h-2z"/>
  </svg>
);

// 65. Murf AI - #6C5CE7
const MurfAIIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2s-2-.9-2-2V8c0-1.1.9-2 2-2zm-4 3c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1v-4c0-.55.45-1 1-1zm8 0c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1v-4c0-.55.45-1 1-1z"/>
  </svg>
);

// 66. Suno AI - #FA5252
const SunoAIIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l-2 6H4l5 4-2 6 5-4 5 4-2-6 5-4h-6l-2-6zm0 4.5l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3l1-3z"/>
  </svg>
);

// 67. Soundraw - #6366F1
const SoundrawIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3v18l-8-4V7l8-4zm0 3.5L7 8.5v7l5 2.5v-11.5zm2 .5v10c3 0 5-2.2 5-5s-2-5-5-5z"/>
  </svg>
);

// 68. Boomy - #FF006E
const BoomyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l7 4.5-7 4.5z"/>
  </svg>
);

// 69. Splash Pro - #7C3AED
const SplashProIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.31 0-6-2.69-6-6 0-2.27 1.66-4.96 6-9.07 4.34 4.11 6 6.8 6 9.07 0 3.31-2.69 6-6 6z"/>
  </svg>
);

// 70. Voicemod - #01E5C0
const VoicemodIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L17 9.5l-1.5 1.5L14 9.5 15.5 8zm-9 0L8 9.5 6.5 11 5 9.5 6.5 8zm5.5 9.5c-3.33 0-6-2.67-6-6h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 3.33-2.67 6-6 6z"/>
  </svg>
);

// 71. Writesonic - #006AFF
const WritesonicIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

// 72. Buffer - #168EEA
const BufferIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 12l10 5 10-5-2-1-8 4-8-4-2 1zm0 5l10 5 10-5-2-1-8 4-8-4-2 1z"/>
  </svg>
);

// 73. Hootsuite - #000000
const HootsuiteIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.7 2C15.9 2 14.5 3.4 14.5 5.2c0 .4.1.8.2 1.2L9.1 9.1c-.7-.6-1.6-.9-2.6-.9-2.2 0-4 1.8-4 4s1.8 4 4 4c1 0 1.9-.4 2.6-.9l5.6 2.7c-.1.4-.2.8-.2 1.2 0 1.8 1.4 3.2 3.2 3.2s3.2-1.4 3.2-3.2-1.4-3.2-3.2-3.2c-.7 0-1.3.2-1.8.6l-5.6-2.7c.1-.3.1-.6.1-.9s0-.6-.1-.9l5.6-2.7c.5.4 1.1.6 1.8.6 1.8 0 3.2-1.4 3.2-3.2S19.5 2 17.7 2z"/>
  </svg>
);

// 74. Mailchimp - #FFE01B
const MailchimpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6 8c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm-11 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm5 8c-3.31 0-6-2.69-6-6h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 3.31-2.69 6-6 6z"/>
  </svg>
);

// 75. HubSpot - #FF7A59
const HubSpotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8.5V7c0-1.1-.9-2-2-2h-1.5c-.3-.9-1.1-1.5-2-1.5S10.8 4.1 10.5 5H9c-1.1 0-2 .9-2 2v1.5c-.9.3-1.5 1.1-1.5 2s.6 1.7 1.5 2V14c0 1.1.9 2 2 2h1.5c.3.9 1.1 1.5 2 1.5s1.7-.6 2-1.5H16c1.1 0 2-.9 2-2v-1.5c.9-.3 1.5-1.1 1.5-2s-.6-1.7-1.5-2zM12 14.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/>
  </svg>
);

// 76. Semrush - #FF642D
const SemrushIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 12h4v8h12v-8h4L12 2zm0 3.5L17.5 11H15v7H9v-7H6.5L12 5.5z"/>
  </svg>
);

// 77. Ahrefs - #FF6B00
const AhrefsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm6 13l-6 3.75L6 15v-2.5l6-3.75 6 3.75V15z"/>
  </svg>
);

// 78. Moz - #4285F4
const MozIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3v18h18V3H3zm3 3h12v12H6V6zm3 3v6h2v-4h2v4h2V9H9z"/>
  </svg>
);

// 79. Screaming Frog - #8CC63F
const ScreamingFrogIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8 2 5 5 5 9c0 2 1 4 2 5l-2 6h14l-2-6c1-1 2-3 2-5 0-4-3-7-7-7zm-2 6c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm4 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-2 4c1.1 0 2 .9 2 2H10c0-1.1.9-2 2-2z"/>
  </svg>
);

// 80. Google Analytics - #E37400
const GoogleAnalyticsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 19c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2s2 .9 2 2v10c0 1.1-.9 2-2 2zm5 0c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2s2 .9 2 2v6c0 1.1-.9 2-2 2zm5 0c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2s2 .9 2 2v2c0 1.1-.9 2-2 2z"/>
  </svg>
);

// 81. Mixpanel - #7856FF
const MixpanelIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3l7 7-7 7-7-7 7-7zm0 2.8L7.8 12l4.2 4.2 4.2-4.2L12 7.8z"/>
  </svg>
);

// 82. Hotjar - #FF3C00
const HotjarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V14h3v8c3.31-.95 6-3.9 6-7.5 0-4.42-3.58-8-8-8-1.95 0-3.73.7-5.12 1.86L7.3 9.78C8.24 8.95 9.49 8.5 10.87 8.5c2.49 0 4.5 2.01 4.5 4.5 0 1.89-1.17 3.5-2.82 4.16l-.55-1.91c.8-.36 1.37-1.16 1.37-2.09 0-1.28-1.04-2.31-2.31-2.31-.87 0-1.63.48-2.02 1.2L7.5 10.5C6.55 11.87 6 13.38 6 15c0 3.31 2.69 6 6 6z"/>
  </svg>
);

// 83. Amplitude - #136ACD
const AmplitudeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 17l4-7 4 7 4-14 4 14 4-10v2l-4 10-4-14-4 14-4-7-4 7v-2z"/>
  </svg>
);

// 84. Tableau - #E97627
const TableauIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 2v4H7v2h4v4H5v3h6v4h-4v2h4v4h2v-4h4v-2h-4v-4h6v-3h-6V8h4V6h-4V2h-2zm2 8v4h-2v-4h2z"/>
  </svg>
);

// 85. Power BI - #F2C811
const PowerBIIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4 8v8l8 6 8-6V8l-8-6zm0 2.5L17.5 8v8L12 19.5 6.5 16V8L12 4.5zM8 10v6h2v-6H8zm3 2v4h2v-4h-2zm3 1v3h2v-3h-2z"/>
  </svg>
);

// 86. Looker - #4285F4
const LookerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6zm0 2c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
  </svg>
);

// 87. Segment - #52BD94
const SegmentIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 12l10 10 10-10L12 2zm0 3l7 7-7 7-7-7 7-7zm0 3L8 12l4 4 4-4-4-4z"/>
  </svg>
);

// 88. Shopify - #96BF48
const ShopifyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.3 2l.7 2.2s-.7-.3-1.5-.3c-.8 0-1.6.2-2.4.7-1.2.7-2.1 2-2.1 3.8 0 2.6 2.3 3.1 2.3 4.7 0 .7-.4 1.2-1.1 1.2-1.1 0-2.6-1.1-2.6-1.1L8 15.5s1.7 1.5 3.7 1.5c1.5 0 2.9-.7 3.7-2 .5-.8.8-1.8.8-2.9 0-3-2.3-3.5-2.3-5 0-.5.3-.9.8-.9.6 0 1.3.4 1.3.4l.7-2.1c-.1 0-.9-.5-2.4-.5zm-.5 0L13 8.9 17.1 22l5-1.1L15.3 2h-.5z"/>
  </svg>
);

// 89. WooCommerce - #96588A
const WooCommerceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6zm3.5 2c-.3 0-.5.2-.5.5s.2.5.5.5c1.4 0 2.5 1.1 2.5 2.5v3c0 .3.2.5.5.5s.5-.2.5-.5v-3c0-1.4 1.1-2.5 2.5-2.5.3 0 .5-.2.5-.5s-.2-.5-.5-.5c-1.4 0-2.6.7-3.5 1.7C7.1 8.7 5.9 8 4.5 8zm10 0c-.3 0-.5.2-.5.5v6c0 .3.2.5.5.5s.5-.2.5-.5v-2h2v2c0 .3.2.5.5.5s.5-.2.5-.5v-6c0-.3-.2-.5-.5-.5s-.5.2-.5.5v2h-2v-2c0-.3-.2-.5-.5-.5z"/>
  </svg>
);

// 90. BigCommerce - #121118
const BigCommerceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5L18.5 8v8L12 19.5 5.5 16V8L12 4.5zm-1 5.5v6h2v-6h3l-4-4-4 4h3z"/>
  </svg>
);
// 91. Square - #3E4348
const SquareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm3 3h6v6H9V9z"/>
  </svg>
);

// 92. PayPal - #003087
const PayPalIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.1 21L9.4 8.5C9.5 8 10 7.5 10.5 7.5H16c3 0 5.5-2.5 5.5-5.5 0-.8-.2-1.5-.5-2.2C20.3.3 19.2 0 18 0H7.5C7 0 6.5.5 6.4 1L3.1 20c-.1.6.4 1 .9 1h3.1zm5.4-11.5c-.1.5-.5 1-1 1H8.4l1.3-7h7.8c1.4 0 2.5 1.1 2.5 2.5S18.9 8 17.5 8h-5v1.5z"/>
  </svg>
);

// 93. Stripe - #635BFF
const StripeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 6h18v3h-6v9h-3v-9H9v9H6V9H3V6zm18 6v6h-3v-6h3z"/>
  </svg>
);

// 94. Etsy - #F14000
const EtsyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 6v12h14v-4h-2v2H7v-3h8v-2H7V8h10v2h2V6H5zm7 5c0-.6.4-1 1-1h4v2h-4c-.6 0-1-.4-1-1z"/>
  </svg>
);

// 95. Gumroad - #36A9AE
const GumroadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.8 0 3.5-.5 5-1.3v-3.1c-1.3 1-2.9 1.5-4.6 1.5-4.1 0-7.5-3.4-7.5-7.5S7.9 4.1 12 4.1s7.5 3.4 7.5 7.5c0 .8-.1 1.6-.4 2.3h3c.2-.7.3-1.5.3-2.3C22 6.5 17.5 2 12 2zm0 6c-2.2 0-4 1.8-4 4h8c0-2.2-1.8-4-4-4z"/>
  </svg>
);

// 96. Slack - #4A154B
const SlackIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.04 7.31c0-1.26 1.02-2.27 2.27-2.27 1.26 0 2.27 1.01 2.27 2.27v5.69c0 1.26-1.01 2.27-2.27 2.27-1.25 0-2.27-1.01-2.27-2.27V7.31zm9.38 0c0-1.26 1.02-2.27 2.27-2.27 1.26 0 2.27 1.01 2.27 2.27v5.69c0 1.26-1.01 2.27-2.27 2.27-1.25 0-2.27-1.01-2.27-2.27V7.31zM7.31 18.96c-1.26 0-2.27-1.02-2.27-2.27 0-1.26 1.01-2.27 2.27-2.27h5.69c1.26 0 2.27 1.01 2.27 2.27 0 1.25-1.01 2.27-2.27 2.27H7.31zm0-9.38c-1.26 0-2.27-1.02-2.27-2.27 0-1.26 1.01-2.27 2.27-2.27h5.69c1.26 0 2.27 1.01 2.27 2.27 0 1.25-1.01 2.27-2.27 2.27H7.31z"/>
  </svg>
);

// 97. Zoom - #2D8CFF
const ZoomIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6zm12 1v2l4-2v6l-4-2v2c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2h-2z"/>
  </svg>
);

// 98. Discord - #5865F2
const DiscordIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.3 4.4c-1.5-.7-3.1-1.2-4.8-1.5-.2.4-.5.9-.7 1.3-1.8-.3-3.6-.3-5.4 0-.2-.4-.5-.9-.7-1.3-1.7.3-3.3.8-4.8 1.5C.7 9.6-.4 14.7.1 19.7c2 1.5 4 2.4 5.9 3 .5-.6.9-1.3 1.2-2-.7-.3-1.3-.6-1.9-1 .2-.1.3-.2.5-.3 3.8 1.8 8 1.8 11.8 0 .2.1.3.2.5.3-.6.4-1.2.7-1.9 1 .3.7.7 1.4 1.2 2 1.9-.6 3.9-1.5 5.9-3 .6-5.7-.9-10.7-4-15.3zM8 15.3c-1.1 0-2.1-1-2.1-2.3s.9-2.3 2.1-2.3 2.1 1 2.1 2.3c0 1.3-.9 2.3-2.1 2.3zm8 0c-1.1 0-2.1-1-2.1-2.3s.9-2.3 2.1-2.3 2.1 1 2.1 2.3c0 1.3-.9 2.3-2.1 2.3z"/>
  </svg>
);

// 99. Microsoft Teams - #6264A7
const MicrosoftTeamsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.5 9h-4V7.5C15.5 6.7 14.8 6 14 6s-1.5.7-1.5 1.5V9h-9C2.7 9 2 9.7 2 10.5v9c0 .8.7 1.5 1.5 1.5h16c.8 0 1.5-.7 1.5-1.5v-9c0-.8-.7-1.5-1.5-1.5zM10 11v6H5v-6h5zm9 6h-7v-6h7v6zm2.5-12c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5z"/>
  </svg>
);

// 100. Google Meet - #00897B
const GoogleMeetIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 9v6l5-3-5-3zM7.5 6C5.6 6 4 7.6 4 9.5V18h12c1.9 0 3.5-1.6 3.5-3.5v-5C19.5 7.6 17.9 6 16 6H7.5zm0 2H16c.8 0 1.5.7 1.5 1.5v5c0 .8-.7 1.5-1.5 1.5H6V9.5C6 8.7 6.7 8 7.5 8z"/>
  </svg>
);

// 101. Skype - #00AFF0
const SkypeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.5 2 2 6.5 2 12c0 1.7.4 3.3 1.2 4.7-.1.5-.2 1-.2 1.5 0 2.2 1.8 4 4 4 .5 0 1-.1 1.5-.2 1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 16c-3.3 0-6-2.7-6-6 0-1.3.4-2.5 1.1-3.4.3.1.6.1.9.1 1.9 0 3.5-1.6 3.5-3.5 0-.3 0-.6-.1-.9.9-.7 2.1-1.1 3.4-1.1 3.3 0 6 2.7 6 6s-2.7 6-6 6z"/>
  </svg>
);

// 102. Telegram - #229ED9
const TelegramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.56l-1.68 7.93c-.12.57-.45.71-.91.44l-2.56-1.89-1.24 1.19c-.14.14-.25.25-.51.25l.18-2.61 4.76-4.3c.21-.18-.05-.28-.32-.1l-5.89 3.71-2.54-.79c-.55-.17-.56-.55.11-.82l9.95-3.84c.46-.17.86.11.71.79z"/>
  </svg>
);

// 103. WhatsApp - #25D366
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.74.44 3.37 1.22 4.79L2 22l5.29-1.21C8.7 21.56 10.29 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.61 14.22c-.24.67-1.38 1.27-1.91 1.34-.48.06-1.08.09-1.74-.11-.4-.12-1.02-.37-1.77-.73-3.12-1.49-5.14-4.47-5.3-4.68-.15-.21-1.27-1.69-1.27-3.22s.81-2.29.96-2.47c.15-.18.33-.22.44-.22s.22 0 .32.01c.1.01.24-.04.37.28.14.33.47 1.15.51 1.23.04.09.07.19.01.3-.05.11-.08.18-.16.27s-.17.2-.24.27c-.08.08-.17.17-.07.33.09.16.41.68.88 1.1.61.54 1.12.71 1.28.79.16.08.25.07.34-.04.1-.11.41-.48.52-.65.11-.17.22-.14.37-.08.15.05 1 .44 1.17.52.17.08.28.12.32.19.04.06.04.36-.09.71z"/>
  </svg>
);

// 104. Duolingo - #58CC02
const DuolingoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C7 2 3 6 3 11c0 1.5.4 3 1 4.2L3 22l6.8-1c1.2.6 2.7 1 4.2 1 5 0 9-4 9-9s-4-9-9-9zm-2 7c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm4 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-2 5c1.7 0 3 1.3 3 3h-6c0-1.7 1.3-3 3-3z"/>
  </svg>
);

// 105. Coursera - #0056D2
const CourseraIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c2.19 0 4.21-.71 5.86-1.91l-1.43-1.43A7.94 7.94 0 0112 20c-4.41 0-8-3.59-8-8s3.59-8 8-8c3.73 0 6.86 2.56 7.75 6h2.08C20.93 5.37 16.88 2 12 2zm6 10c0 1.65-.67 3.15-1.76 4.24l1.42 1.42A7.96 7.96 0 0020 12h-2z"/>
  </svg>
);

// 106. Khan Academy - #14BF96
const KhanAcademyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l-2 4H6l3 3-1 4 4-2 4 2-1-4 3-3h-4l-2-4zm0 4l.7 1.4h1.6l-1.2 1.2.4 1.7-1.5-.8-1.5.8.4-1.7-1.2-1.2h1.6L12 6z"/>
  </svg>
);

// 107. Udemy - #A435F0
const UdemyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v4c0 6.6 4.3 12.8 10 14 5.7-1.2 10-7.4 10-14V7l-10-5zm0 2.2l8 4v2.8c0 5.5-3.5 10.6-8 11.8-4.5-1.2-8-6.3-8-11.8V8.2l8-4z"/>
  </svg>
);

// 108. edX - #02262B
const EdXIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 3v8c0 4.4 3.6 8 8 8h6v-2h-6c-3.3 0-6-2.7-6-6V3H7zm10 0v8c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V3h2v8h2V3h2z"/>
  </svg>
);

// 109. Skillshare - #00FF84
const SkillshareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
  </svg>
);

// 110. MasterClass - #000000
const MasterClassIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

// 111. Pluralsight - #F15B2A
const PluralsightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3 14V8l7 4-7 4z"/>
  </svg>
);

// 112. Instagram - #E4405F
const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
  </svg>
);

// 113. LinkedIn - #0A66C2
const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// 114. TikTok - #000000
const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.61 5.57c-.81.32-1.69.5-2.61.5-.29 0-.58-.02-.86-.06v7.69c0 2.19-1.78 3.97-3.97 3.97-2.19 0-3.97-1.78-3.97-3.97s1.78-3.97 3.97-3.97c.15 0 .3.01.44.03v2.03c-.14-.02-.29-.03-.44-.03-1.07 0-1.94.87-1.94 1.94s.87 1.94 1.94 1.94 1.94-.87 1.94-1.94V5h2.03c0 1.45 1.18 2.63 2.63 2.63.28 0 .55-.04.81-.13v-.07z"/>
  </svg>
);

// 115. Pinterest - #E60023
const PinterestIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.63 7.85 6.35 9.31-.09-.79-.17-2 .04-2.85.19-.74 1.21-5.13 1.21-5.13s-.31-.62-.31-1.53c0-1.43.83-2.5 1.86-2.5.88 0 1.3.66 1.3 1.45 0 .88-.56 2.2-.85 3.42-.24 1.02.51 1.86 1.52 1.86 1.82 0 3.22-1.92 3.22-4.69 0-2.45-1.76-4.17-4.28-4.17-2.92 0-4.63 2.19-4.63 4.45 0 .88.34 1.83.76 2.34.08.1.09.19.07.29-.08.33-.25 1.02-.28 1.16-.04.19-.15.23-.34.14-1.28-.6-2.08-2.46-2.08-3.96 0-3.23 2.35-6.19 6.76-6.19 3.55 0 6.31 2.53 6.31 5.91 0 3.53-2.22 6.37-5.31 6.37-1.04 0-2.01-.54-2.34-1.17l-.64 2.42c-.23.88-.85 1.99-1.27 2.66.96.3 1.97.46 3.03.46 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
  </svg>
);

// 116. Twitter/X - #000000
const TwitterXIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// 117. Facebook - #1877F2
const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// 118. Reddit - #FF4500
const RedditIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
);

// 119. YouTube - #FF0000
const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// 120. Zapier - #FF4A00
const ZapierIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15 3h-2v7H6v2h7v7h2v-7h7v-2h-7V3z"/>
  </svg>
);

// 121. Make - #6D00CC
const MakeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 9l-8 8z"/>
  </svg>
);

// 122. IFTTT - #000000
const IFTTTIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9h2v6H3V9zm4 0h2v6H7V9zm4 0h6v2h-4v4h-2V9zm8 0h2v2h-2V9zm0 4h2v2h-2v-2z"/>
  </svg>
);

// 123. n8n - #EA4B71
const N8nIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 8c1.66 0 3 1.34 3 3h-6c0-1.66 1.34-3 3-3z"/>
  </svg>
);

// 124. Integromat - #2F8EED
const IntegromatIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.5L17.5 7v10L12 19.5 6.5 17V7L12 4.5zm0 3L9 9v6l3 1.5L15 15V9l-3-1.5z"/>
  </svg>
);

// 125. Automate.io - #27AE60
const AutomateIOIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
  </svg>
);

// 126. Pabbly - #FF6900
const PabblyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 16l-6-3.75V9.75L12 6l6 3.75v4.5L12 18z"/>
  </svg>
);

// 127. Workato - #1063E1
const WorkatoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 0h7v7h-7v-7z"/>
  </svg>
);

// 128. AWS - #FF9900
const AWSIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.76 19.27c-3.73-1.45-6.37-5.17-6.37-9.48 0-5.63 4.53-10.2 10.11-10.2 2.29 0 4.41.77 6.11 2.06l-1.67 2.41c-1.23-.94-2.77-1.5-4.44-1.5-3.93 0-7.12 3.23-7.12 7.23 0 2.94 1.73 5.47 4.22 6.61l-.84 2.87zm11.31-.87c3.01-1.79 5.03-5.09 5.03-8.85 0-5.73-4.62-10.38-10.31-10.38-1.15 0-2.26.19-3.29.54l.87 2.96c.74-.23 1.54-.36 2.37-.36 3.98 0 7.21 3.27 7.21 7.29 0 2.48-1.23 4.67-3.11 5.98l1.23 2.82z"/>
  </svg>
);

// 129. Google Cloud - #4285F4
const GoogleCloudIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4zm0 2.18l6 3v4.82c0 4.54-2.88 8.64-6 9.82-3.12-1.18-6-5.28-6-9.82V7.18l6-3z"/>
  </svg>
);

// 130. Microsoft Azure - #0078D4
const MicrosoftAzureIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.5 6L12 2l6.5 4v12l-6.5 4-6.5-4V6zm2 2.5v7l4.5 2.8 4.5-2.8v-7L12 5.7 7.5 8.5z"/>
  </svg>
);

// 131. DigitalOcean - #0080FF
const DigitalOceanIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.5 2 2 6.5 2 12h5v-2c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5v5c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 13v3H9v-3h3zm-3 0H6v-3h3v3zm0-3H4v-3h5v3z"/>
  </svg>
);

// 132. Linode - #00A95C
const LinodeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.5L17.5 7.5v7L12 17.5l-5.5-3v-7L12 4.5z"/>
  </svg>
);

// 133. Cloudflare - #F38020
const CloudflareIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 5c-2.1 0-3.8 1.6-4 3.6-.1.3-.3.4-.5.4H4.5C4.2 9 4 9.2 4 9.5c0 2.8 2.2 5 5 5h9c1.4 0 2.5-1.1 2.5-2.5S17.9 9.5 16.5 9.5c-.3 0-.5.2-.5.5s.2.5.5.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5h-9c-2.2 0-4-1.8-4-4h8.5c.8 0 1.6-.5 1.9-1.3.1-1.4 1.3-2.7 2.6-2.7 1.4 0 2.5 1.1 2.5 2.5V12c0 3.3-2.7 6-6 6H3v1h11c3.9 0 7-3.1 7-7V7.5c0-1.4-1.1-2.5-2.5-2.5z"/>
  </svg>
);

// 134. Heroku - #430098
const HerokuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 19l-2-2 2-2v4zm8-11h-2c0-1.7-1.3-3-3-3-1.3 0-2.4.8-2.8 2H7c.5-2.3 2.5-4 4.8-4 2.8 0 5.2 2.2 5.2 5zm0 3h-2v6h2v-6z"/>
  </svg>
);

// 135. Hugging Face - #FFD21E
const HuggingFaceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4 8c.83 0 1.5.67 1.5 1.5S8.83 13 8 13s-1.5-.67-1.5-1.5S7.17 10 8 10zm8 0c.83 0 1.5.67 1.5 1.5S16.83 13 16 13s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm0 6c0 2.21-1.79 4-4 4s-4-1.79-4-4h8z"/>
  </svg>
);

// 136. Replicate - #000000
const ReplicateIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h8v12zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16 0h2v14c0 1.1-.9 2-2 2H6v-2h14V6z"/>
  </svg>
);

// 137. Cohere - #39594D
const CohereIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6 10c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2s.9-2 2-2h2c1.1 0 2 .9 2 2zm-6 0c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2s.9-2 2-2h2c1.1 0 2 .9 2 2z"/>
  </svg>
);

// 138. Anthropic - #D97757
const AnthropicIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 12h4l6-6 6 6h4L12 2zm0 8l-6 6v4h12v-4l-6-6z"/>
  </svg>
);
// 139. OpenAI - #00A67E
const OpenAIIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.28 9.62a5.52 5.52 0 0 0-.65-6.19A5.52 5.52 0 0 0 15.86 1a5.52 5.52 0 0 0-5.72 1.85A5.52 5.52 0 0 0 3.57 5.3a5.52 5.52 0 0 0-1.85 5.72 5.52 5.52 0 0 0 .65 6.19A5.52 5.52 0 0 0 8.14 23a5.52 5.52 0 0 0 5.72-1.85 5.52 5.52 0 0 0 6.57-2.45 5.52 5.52 0 0 0 1.85-5.72v-.36zm-3.35-2.9a3.65 3.65 0 0 1 1.65 3.35l-3.22-1.86V4.56a3.65 3.65 0 0 1 2.93.65 3.65 3.65 0 0 1 1.22 1.51zM12 2.11a3.65 3.65 0 0 1 3.22 1.86l-3.22 1.86-3.22-1.86A3.65 3.65 0 0 1 12 2.11zm-6.93 3.11a3.65 3.65 0 0 1 2.93-.65v3.65L4.78 10.08a3.65 3.65 0 0 1-.65-2.93 3.65 3.65 0 0 1 1.51-1.22zM3.35 13.9a3.65 3.65 0 0 1-.43-3.64L6.14 12v3.65a3.65 3.65 0 0 1-2.93.65A3.65 3.65 0 0 1 3.35 13.9zm2.08 3.35a3.65 3.65 0 0 1-1.65-3.35l3.22 1.86v3.65a3.65 3.65 0 0 1-2.93-.65 3.65 3.65 0 0 1-1.22-1.51zm10.72.65a3.65 3.65 0 0 1-3.22-1.86l3.22-1.86 3.22 1.86a3.65 3.65 0 0 1-3.22 1.86zm0-3.65l-2.79-1.61 2.79-1.61 2.79 1.61-2.79 1.61zm4.78-1.17a3.65 3.65 0 0 1-.65 2.93 3.65 3.65 0 0 1-1.51 1.22 3.65 3.65 0 0 1-2.93.65v-3.65l3.22-1.86a3.65 3.65 0 0 1 1.86.71z"/>
  </svg>
);

  // IFTTT
  const logos: Record<string, React.FC<{ className?: string }>> = {
    'IFTTT': ({ className }: { className?: string }) => (
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