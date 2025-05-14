
import * as React from "react"

const MOBILE_BREAKPOINT = 1024 // Changed from 768 to 1024 to include tablets
const DEBOUNCE_DELAY = 250

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT;
    }
    return false; // Default for SSR
  });

  React.useEffect(() => {
    // Return early if not in a browser environment
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
      
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      }, DEBOUNCE_DELAY);
    };

    // Use matchMedia for better performance
    if ('matchMedia' in window) {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
      
      // Modern browsers
      if (mql && typeof mql.addEventListener === 'function') {
        mql.addEventListener('change', handleResize);
      } 
      // Older browsers fallback
      else if (mql && typeof mql.addListener === 'function') {
        mql.addListener(handleResize);
      }
      
      // Initial check
      if (mql) {
        setIsMobile(mql.matches);
      }
      
      return () => {
        cleanupTimeout();
        if (mql && typeof mql.removeEventListener === 'function') {
          mql.removeEventListener('change', handleResize);
        } else if (mql && typeof mql.removeListener === 'function') {
          mql.removeListener(handleResize);
        }
      };
    } 
    // Fallback for browsers without matchMedia
    else {
      window.addEventListener('resize', handleResize);
      return () => {
        cleanupTimeout();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return isMobile;
}
