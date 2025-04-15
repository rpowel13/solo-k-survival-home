
import React, { useState, useEffect, useRef } from "react";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

interface VCitaIframeProps {
  onError: () => void;
}

const VCitaIframe: React.FC<VCitaIframeProps> = ({ onError }) => {
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [vCitaUrl, setVCitaUrl] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Handle postMessage events from the iframe
    const handleMessage = (event: MessageEvent) => {
      console.log("Received message from iframe:", event.data);
      
      // Check for form submission events
      if (event.data && 
         (event.data.type === 'vcita_form_submit' || 
          event.data.action === 'form_submit' ||
          event.data.event === 'submit')) {
        console.log("Form submission detected via postMessage");
        setShowConsentDialog(true);
        return;
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Add a MutationObserver to detect when the iframe's content changes
    const setupFormInterception = () => {
      if (!iframeRef.current) return;
      
      try {
        // Try to access iframe document
        const iframeDocument = iframeRef.current.contentDocument || 
                              iframeRef.current.contentWindow?.document;
        
        if (iframeDocument) {
          console.log("Successfully accessed iframe document");
          
          // Find the form element in the iframe
          const formElement = iframeDocument.querySelector('form');
          if (formElement) {
            console.log("Found form element in iframe");
            
            // Add submit event listener to the form
            formElement.addEventListener('submit', (e) => {
              console.log("Form submit event captured");
              e.preventDefault();
              e.stopPropagation();
              setShowConsentDialog(true);
              return false;
            });
            
            // Find submit buttons and add click listeners
            const submitButtons = iframeDocument.querySelectorAll('button[type="submit"], input[type="submit"], button.submit-button, .vcita-submit-button');
            console.log(`Found ${submitButtons.length} submit buttons`);
            
            submitButtons.forEach(button => {
              button.addEventListener('click', (e) => {
                console.log("Submit button clicked");
                e.preventDefault();
                e.stopPropagation();
                setShowConsentDialog(true);
                return false;
              });
            });
          }
        }
      } catch (e) {
        console.log("Could not access iframe content due to cross-origin policy:", e);
      }
    };
    
    // Try to set up interception after iframe loads
    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', setupFormInterception);
    }
    
    // Fallback: Add click listener to the iframe itself
    const handleIframeClick = (e: MouseEvent) => {
      if (!iframeRef.current) return;
      
      const iframe = iframeRef.current;
      const rect = iframe.getBoundingClientRect();
      
      // Check if click is in the bottom part of the iframe (likely submit button area)
      const y = e.clientY - rect.top;
      if (y > rect.height * 0.7) {
        console.log("Click in bottom area of iframe detected - likely submit button");
        // Analyze target element
        const target = e.target as HTMLElement;
        const tagName = target.tagName;
        const classList = target.classList ? Array.from(target.classList).join(' ') : '';
        const text = target.textContent || '';
        
        // Check if it resembles a submit button
        if (tagName === 'BUTTON' || 
            tagName === 'INPUT' && (target as HTMLInputElement).type === 'submit' ||
            classList.includes('submit') ||
            classList.includes('button') && text.toLowerCase().includes('submit') ||
            text.toLowerCase().includes('submit') || 
            text.toLowerCase().includes('send')) {
          console.log("Submit button click detected");
          e.preventDefault();
          e.stopPropagation();
          setShowConsentDialog(true);
          return false;
        }
      }
    };
    
    // Add click listener to the iframe
    if (iframeRef.current) {
      iframeRef.current.addEventListener('click', handleIframeClick as EventListener);
    }
    
    // Set up an interval to periodically check for form elements
    // This is useful when iframe content loads dynamically
    const checkInterval = setInterval(() => {
      setupFormInterception();
    }, 2000);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(checkInterval);
      
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', setupFormInterception);
        iframeRef.current.removeEventListener('click', handleIframeClick as EventListener);
      }
    };
  }, []);

  const handleIframeError = () => {
    console.error("Failed to load vCita iframe");
    onError();
  };

  const handleIframeLoad = () => {
    console.log("vCita iframe loaded");
  };

  const handleConsentAccept = () => {
    console.log("Consent accepted, proceeding with form submission");
    setConsentAccepted(true);
    setShowConsentDialog(false);
    
    setVCitaUrl('https://www.vcita.com/v/izk040b42jnjcf3c/contact?frontage_iframe=true&invite=vr_cf_pb-izk040b42jnjcf3c');
  };

  useEffect(() => {
    if (consentAccepted && vCitaUrl) {
      window.open(vCitaUrl, '_blank');
      setVCitaUrl(null);
    }
  }, [consentAccepted, vCitaUrl]);

  return (
    <div className="w-full relative">
      <div className="w-full">
        <iframe 
          ref={iframeRef}
          src="https://www.vcita.com/widgets/contact_form/izk040b42jnjcf3c?frontage_iframe=true" 
          width="100%" 
          height="400" 
          scrolling="no" 
          frameBorder="0" 
          onError={handleIframeError}
          onLoad={handleIframeLoad}
          title="Contact Form"
          className="w-full min-h-[400px]"
        >
          <p>Please contact me via my contact form at vcita:</p>
          <a href='https://www.vcita.com/v/izk040b42jnjcf3c/contact?frontage_iframe=true&invite=vr_cf_pb-izk040b42jnjcf3c'>
            Contact Form for Survival 401k, LLC
          </a>
        </iframe>
      </div>
      
      <AlertDialog open={showConsentDialog} onOpenChange={setShowConsentDialog}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Consent Required</AlertDialogTitle>
            <AlertDialogDescription>
              Please review and confirm your consent before submitting the form.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="flex items-start space-x-3 space-y-0 rounded-md p-4 border mt-4">
            <Checkbox 
              id="consent-checkbox" 
              checked={consentAccepted} 
              onCheckedChange={(checked) => setConsentAccepted(checked as boolean)}
            />
            <div className="space-y-1 leading-none">
              <label htmlFor="consent-checkbox" className="text-sm font-normal cursor-pointer">
                By clicking "submit", I consent to join the email list and receive SMS from Survival 401k, with access to latest offers and services. Message and data rates may apply. Message frequency varies. More details on this are in our <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> and <Link to="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</Link>. Text "HELP" for help or contact us at (833) 224-5517. Text "STOP" to cancel.
              </label>
            </div>
          </div>
          
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel onClick={() => setShowConsentDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConsentAccept} 
              disabled={!consentAccepted}
            >
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default VCitaIframe;
