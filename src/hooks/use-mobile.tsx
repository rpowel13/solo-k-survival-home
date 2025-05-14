
import * as React from "react"

const MOBILE_BREAKPOINT = 1024 // Changed from 768 to 1024 to include tablets
const DEBOUNCE_DELAY = 250

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT;
    }
    return false;
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout | null = null;

    const cleanupTimeout = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const handleResize = () => {
      cleanupTimeout();
      setTimeout(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      }, DEBOUNCE_DELAY);
    };

    if ('matchMedia' in window) {
      let mql: MediaQueryList = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
      // Modern browsers: only call addEventListener if mql has addEventListener
      if (typeof mql.addEventListener === 'function') {
        mql.addEventListener('change', handleResize as EventListener);
      }
      // Older browsers fallback
      else if (typeof (mql as any).addListener === 'function') {
        (mql as any).addListener(handleResize);
      }
      setIsMobile(mql.matches);

      return () => {
        cleanupTimeout();
        if (typeof mql.removeEventListener === 'function') {
          mql.removeEventListener('change', handleResize as EventListener);
        } else if (typeof (mql as any).removeListener === 'function') {
          (mql as any).removeListener(handleResize);
        }
      };
    } else {
      window.addEventListener('resize', handleResize);
      return () => {
        cleanupTimeout();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return isMobile;
}
