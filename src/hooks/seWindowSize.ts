// hooks/useWindowSize.ts
import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

interface UseWindowSizeReturn extends WindowSize {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLandscape: boolean;
}

export function useWindowSize(): UseWindowSizeReturn {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      // Debounce para mejorar performance
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    };

    // Listener para resize
    window.addEventListener('resize', handleResize);
    
    // Listener para cambios de orientación en móviles
    window.addEventListener('orientationchange', handleResize);
    
    // Llamar inmediatamente
    handleResize();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Breakpoints responsive
  const isMobile = windowSize.width < 640;      // < 640px (sm breakpoint)
  const isTablet = windowSize.width >= 640 && windowSize.width < 1024; // 640px - 1023px
  const isDesktop = windowSize.width >= 1024;   // >= 1024px (lg breakpoint)
  const isLandscape = windowSize.width > windowSize.height;

  return {
    width: windowSize.width,
    height: windowSize.height,
    isMobile,
    isTablet,
    isDesktop,
    isLandscape
  };
}
