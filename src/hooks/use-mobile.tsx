import { useState, useEffect } from 'react';

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!window.matchMedia) {
      setIsMobile(window.innerWidth <= 1024);
      return;
    }
    const mql: MediaQueryList = window.matchMedia('(max-width: 1024px)');
    const updateIsMobile = () => setIsMobile(mql.matches);

    updateIsMobile();

    // Prefer addEventListener, fallback to addListener for older browsers
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', updateIsMobile);
      return () => mql.removeEventListener('change', updateIsMobile);
    } else if (typeof mql.addListener === 'function') {
      mql.addListener(updateIsMobile);
      return () => mql.removeListener(updateIsMobile);
    }
  }, []);

  return isMobile;
};

