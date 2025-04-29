
import * as React from "react"

const MOBILE_BREAKPOINT = 1024 // Changed from 768 to 1024 to include tablets
const DEBOUNCE_DELAY = 250

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }, DEBOUNCE_DELAY)
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    mql.addEventListener("change", handleResize)
    
    // Initial check
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Add resize listener with debounce
    window.addEventListener('resize', handleResize)

    return () => {
      mql.removeEventListener("change", handleResize)
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [])

  return !!isMobile
}
