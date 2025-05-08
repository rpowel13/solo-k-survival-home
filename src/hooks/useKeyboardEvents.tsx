
import { useEffect } from "react";

interface UseKeyboardEventsProps {
  showConsent: () => void;
}

export function useKeyboardEvents({ showConsent }: UseKeyboardEventsProps) {
  // Add keyboard event listener for Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && document.activeElement?.tagName === "INPUT") {
        console.log("Enter key pressed while in input field");
        setTimeout(showConsent, 300);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showConsent]);
}
