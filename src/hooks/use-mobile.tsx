
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
      // Create the media query
      const mediaQueryString = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`;
      const mql = window.matchMedia(mediaQueryString);
      
      // Ensure mql is defined and valid
      if (mql) {
        // Handle both modern and legacy browsers
        const addHandler = () => {
          // Safe feature detection
          if (typeof mql.addEventListener === 'function') {
            mql.addEventListener('change', handleResize);
          } else if (typeof (mql as any).addListener === 'function') {
            (mql as any).addListener(handleResize);
          }
        };
        
        // Add the appropriate event listener
        addHandler();
        
        // Initial check
        setIsMobile(mql.matches);
        
        // Cleanup function
        return () => {
          cleanupTimeout();
          
          // Safe removal of event listeners
          if (typeof mql.removeEventListener === 'function') {
            mql.removeEventListener('change', handleResize);
          } else if (typeof (mql as any).removeListener === 'function') {
            (mql as any).removeListener(handleResize);
          }
        };
      }
    }
    
    // Fallback for browsers without matchMedia
    window.addEventListener('resize', handleResize);
    return () => {
      cleanupTimeout();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
}
