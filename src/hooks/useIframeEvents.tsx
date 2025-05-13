
import { useEffect, RefObject, useState } from "react";

interface UseIframeEventsProps {
  iframeRef: RefObject<HTMLIFrameElement>;
  showConsent: () => void;
  submitAttempted: boolean;
}

export function useIframeEvents({ iframeRef, showConsent, submitAttempted }: UseIframeEventsProps) {
  const [isObserving, setIsObserving] = useState(false);
  
  // Performance tracking for iframe interactions
  const logPerformance = (interaction: string) => {
    const timestamp = performance.now();
    console.log(`Iframe ${interaction} at ${Math.round(timestamp)}ms`);
  };

  // Listen for messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      logPerformance("message received");
      console.log("Message from iframe:", event.data);
      
      // Check for form submission indicators in the message
      if (typeof event.data === "object" || typeof event.data === "string") {
        const dataString = JSON.stringify(event.data).toLowerCase();
        if (
          dataString.includes("submit") || 
          dataString.includes("form") || 
          dataString.includes("success") || 
          dataString.includes("complete")
        ) {
          logPerformance("form interaction detected");
          console.log("Form interaction detected via message");
          showConsent();
        }
      }
    };
    
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [showConsent]);

  // Monitor iframe for changes that might indicate submission
  useEffect(() => {
    if (!iframeRef.current || isObserving || submitAttempted) return;
    
    const observer = new MutationObserver(() => {
      if (submitAttempted) return; // Skip if submission was already detected
      
      try {
        // Try to check for submit buttons in iframe
        if (iframeRef.current?.contentDocument) {
          const buttons = iframeRef.current.contentDocument.querySelectorAll('button[type="submit"], input[type="submit"], .submit-button');
          buttons.forEach(button => {
            button.addEventListener("click", () => {
              logPerformance("submit button clicked");
              console.log("Submit button clicked");
              showConsent();
            });
          });
          setIsObserving(true);
        }
      } catch (e) {
        // Silent catch for CORS issues
      }
    });
    
    if (iframeRef.current) {
      observer.observe(iframeRef.current, {
        attributes: true,
        childList: true,
        subtree: true
      });
    }
    
    return () => observer.disconnect();
  }, [iframeRef, submitAttempted, showConsent, isObserving]);

  // Extra listener for iframe load event
  useEffect(() => {
    const handleLoad = () => {
      logPerformance("iframe loaded");
      console.log("Iframe loaded");
      
      if (!iframeRef.current) return;
      
      // Add failsafe click handler to the iframe itself
      try {
        iframeRef.current.contentWindow?.addEventListener("click", (e) => {
          // This may not work due to CORS, but we try
          const target = e.target as HTMLElement;
          if (
            target.tagName === "BUTTON" || 
            (target.tagName === "INPUT" && (target as HTMLInputElement).type === "submit") ||
            target.classList.contains("submit-button") ||
            target.closest("button") || 
            target.closest('input[type="submit"]')
          ) {
            logPerformance("submit element clicked inside iframe");
            console.log("Submit element clicked inside iframe");
            showConsent();
          }
        }, { passive: true }); // Using passive listener for better performance
      } catch (e) {
        // CORS will likely block this
        console.log("Could not add iframe content click handler due to CORS");
      }
    };
    
    if (iframeRef.current) {
      iframeRef.current.addEventListener("load", handleLoad);
    }
    
    return () => {
      if (iframeRef.current) {
        iframeRef.current.removeEventListener("load", handleLoad);
      }
    };
  }, [iframeRef, showConsent]);

  // Optimized periodic check for submit buttons using requestAnimationFrame for better performance
  useEffect(() => {
    let rafId: number;
    let lastCheck = 0;
    const checkInterval = 2000;
    
    const checkButtons = (timestamp: number) => {
      if (timestamp - lastCheck > checkInterval) {
        lastCheck = timestamp;
        
        if (iframeRef.current && !submitAttempted) {
          try {
            const doc = iframeRef.current.contentDocument;
            if (doc) {
              const buttons = doc.querySelectorAll('button[type="submit"], input[type="submit"], .vcita-form-submit, .button-container button');
              if (buttons.length > 0 && !isObserving) {
                buttons.forEach(button => {
                  button.addEventListener("click", () => {
                    logPerformance("submit button clicked via interval check");
                    console.log("Submit button clicked via interval check");
                    showConsent();
                  });
                });
                setIsObserving(true);
              }
            }
          } catch (e) {
            // Silent catch for CORS
          }
        }
      }
      
      rafId = requestAnimationFrame(checkButtons);
    };
    
    rafId = requestAnimationFrame(checkButtons);
    
    return () => cancelAnimationFrame(rafId);
  }, [iframeRef, submitAttempted, showConsent, isObserving]);
}
