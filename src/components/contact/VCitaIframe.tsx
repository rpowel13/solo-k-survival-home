
import React, { useState, useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import ConsentDialog from "./ConsentDialog";

interface VCitaIframeProps {
  onError: () => void;
}

const VCitaIframe: React.FC<VCitaIframeProps> = ({ onError }) => {
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [vCitaUrl, setVCitaUrl] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeWrapperRef = useRef<HTMLDivElement>(null);
  const submitAttemptedRef = useRef(false);

  // Direct function to show consent dialog
  const showConsent = () => {
    console.log("✅ Showing consent dialog");
    setShowConsentDialog(true);
    submitAttemptedRef.current = true;
  };

  // Intercept clicks that might be submit button presses
  const handleWrapperClick = (e: React.MouseEvent) => {
    const rect = iframeWrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    // If click is in the bottom region (likely submit button)
    const y = e.clientY - rect.top;
    if (y > rect.height * 0.7) {
      console.log("Submit area click detected");
      setTimeout(showConsent, 300);
    }
  };

  const handleIframeError = () => {
    console.error("Failed to load vCita iframe");
    toast({
      title: "Connection Error",
      description: "Could not load the contact form. Please try again later.",
      variant: "destructive"
    });
    onError();
  };

  const handleConsentAccept = () => {
    console.log("Consent accepted, proceeding with form submission");
    setConsentAccepted(true);
    setShowConsentDialog(false);
    
    // Set the vCita URL to redirect the user
    setVCitaUrl('https://www.vcita.com/v/izk040b42jnjcf3c/contact?frontage_iframe=true&invite=vr_cf_pb-izk040b42jnjcf3c');
    
    // Show success message
    toast({
      title: "Message Sent",
      description: "Your message has been received. We'll be in touch shortly.",
      duration: 5000
    });
  };

  // Setup iframe message event listener
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log("Message from iframe:", event.data);
      
      // Check for form submission indicators in the message
      if (typeof event.data === 'object' || typeof event.data === 'string') {
        const dataString = JSON.stringify(event.data).toLowerCase();
        if (
          dataString.includes('submit') || 
          dataString.includes('form') || 
          dataString.includes('success') || 
          dataString.includes('complete')
        ) {
          console.log("Form interaction detected via message");
          showConsent();
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Monitor iframe for changes that might indicate submission
  useEffect(() => {
    if (!iframeRef.current) return;
    
    const observer = new MutationObserver(() => {
      if (submitAttemptedRef.current) return; // Skip if submission was already detected
      
      try {
        // Try to check for submit buttons in iframe
        if (iframeRef.current?.contentDocument) {
          const buttons = iframeRef.current.contentDocument.querySelectorAll('button[type="submit"], input[type="submit"], .submit-button');
          buttons.forEach(button => {
            button.addEventListener('click', () => {
              console.log("Submit button clicked");
              showConsent();
            });
          });
        }
      } catch (e) {
        // Silent catch for CORS issues
      }
    });
    
    observer.observe(iframeRef.current, {
      attributes: true,
      childList: true,
      subtree: true
    });
    
    return () => observer.disconnect();
  }, []);

  // Extra listener for iframe load event
  useEffect(() => {
    const handleLoad = () => {
      console.log("Iframe loaded");
      if (!iframeRef.current) return;
      
      // Add failsafe click handler to the iframe itself
      try {
        iframeRef.current.contentWindow?.addEventListener('click', (e) => {
          // This may not work due to CORS, but we try
          console.log("Click inside iframe detected");
          const target = e.target as HTMLElement;
          if (
            target.tagName === 'BUTTON' || 
            (target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'submit') ||
            target.classList.contains('submit-button') ||
            target.closest('button') || 
            target.closest('input[type="submit"]')
          ) {
            console.log("Submit element clicked inside iframe");
            showConsent();
          }
        });
      } catch (e) {
        // CORS will likely block this
        console.log("Could not add iframe content click handler due to CORS");
      }
    };
    
    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', handleLoad);
    }
    
    return () => {
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', handleLoad);
      }
    };
  }, []);

  // Redirect after consent is accepted
  useEffect(() => {
    if (consentAccepted && vCitaUrl) {
      window.open(vCitaUrl, '_blank');
      setVCitaUrl(null);
    }
  }, [consentAccepted, vCitaUrl]);

  // Add keyboard event listener for Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && document.activeElement?.tagName === 'INPUT') {
        console.log("Enter key pressed while in input field");
        setTimeout(showConsent, 300);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Add a periodic check for submit buttons
  useEffect(() => {
    // Check for submit buttons every 2 seconds
    const interval = setInterval(() => {
      if (iframeRef.current && !submitAttemptedRef.current) {
        try {
          const doc = iframeRef.current.contentDocument;
          if (doc) {
            // Look for submit buttons and add click handlers
            const buttons = doc.querySelectorAll('button[type="submit"], input[type="submit"], .vcita-form-submit, .button-container button');
            buttons.forEach(button => {
              button.addEventListener('click', () => {
                console.log("Submit button clicked via interval check");
                showConsent();
              });
            });
          }
        } catch (e) {
          // Silent catch for CORS
        }
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full relative">
      <div 
        ref={iframeWrapperRef} 
        className="w-full cursor-pointer"
        onClick={handleWrapperClick}
      >
        <iframe 
          ref={iframeRef}
          src="https://www.vcita.com/widgets/contact_form/izk040b42jnjcf3c?frontage_iframe=true" 
          width="100%" 
          height="400" 
          scrolling="no" 
          frameBorder="0" 
          onError={handleIframeError}
          title="Contact Form"
          className="w-full min-h-[400px]"
        >
          <p>Please contact me via my contact form at vcita:</p>
          <a href='https://www.vcita.com/v/izk040b42jnjcf3c/contact?frontage_iframe=true&invite=vr_cf_pb-izk040b42jnjcf3c'>
            Contact Form for Survival 401k, LLC
          </a>
        </iframe>
      </div>
      
      <ConsentDialog
        showConsentDialog={showConsentDialog}
        setShowConsentDialog={setShowConsentDialog}
        consentAccepted={consentAccepted}
        setConsentAccepted={setConsentAccepted}
        onAccept={handleConsentAccept}
      />
    </div>
  );
};

export default VCitaIframe;
