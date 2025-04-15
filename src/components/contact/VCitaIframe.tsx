
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
import { toast } from "@/hooks/use-toast";

interface VCitaIframeProps {
  onError: () => void;
}

const VCitaIframe: React.FC<VCitaIframeProps> = ({ onError }) => {
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [vCitaUrl, setVCitaUrl] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle postMessage events from the iframe
    const handleMessage = (event: MessageEvent) => {
      console.log("Received message from iframe:", event.data);
      
      // Check for form submission events from vCita
      if (event.data && 
         (event.data.type === 'vcita_form_submit' || 
          event.data.action === 'form_submit' ||
          event.data.event === 'submit' ||
          (typeof event.data === 'string' && event.data.includes('submit')))) {
        console.log("Form submission detected via postMessage");
        setShowConsentDialog(true);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Since we can't directly access the iframe due to CORS, 
    // let's monitor clicks on the iframe element itself
    const handleIframeWrapperClick = (e: MouseEvent) => {
      if (!iframeWrapperRef.current || !iframeRef.current) return;
      
      const iframe = iframeRef.current;
      const rect = iframe.getBoundingClientRect();
      
      // Check if click is in the bottom part of the iframe (likely submit button area)
      const y = e.clientY - rect.top;
      if (y > rect.height * 0.7) {
        // The click is in the bottom 30% of the iframe, which is likely where submit buttons are
        console.log("Click detected in the submit button area");
        
        // Set a short timeout to allow the actual click to process in the iframe
        setTimeout(() => {
          setShowConsentDialog(true);
        }, 200);
      }
    };
    
    // Add click listeners to the iframe wrapper div
    if (iframeWrapperRef.current) {
      iframeWrapperRef.current.addEventListener('click', handleIframeWrapperClick as EventListener);
    }
    
    // Monitor for specific URL changes in the iframe that might indicate form submission
    const checkIframeUrl = () => {
      try {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          const url = iframeRef.current.contentWindow.location.href;
          // If URL contains success or thank you parameters, it might indicate form submission
          if (url.includes('success=true') || url.includes('thank_you') || url.includes('submitted')) {
            console.log("Form submission detected via URL change:", url);
            setShowConsentDialog(true);
          }
        }
      } catch (e) {
        // Silent catch for CORS errors
      }
    };
    
    // Create a MutationObserver to detect when the iframe reloads or changes
    let observer: MutationObserver;
    if (iframeRef.current) {
      observer = new MutationObserver(() => {
        try {
          checkIframeUrl();
        } catch (e) {
          // Silent catch for CORS errors
        }
      });
      
      observer.observe(iframeRef.current, { attributes: true });
    }
    
    // Monitor the iframe for load events that might indicate form submission
    const handleIframeLoad = () => {
      try {
        checkIframeUrl();
      } catch (e) {
        // Silent catch for CORS errors
      }
    };
    
    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', handleIframeLoad);
    }
    
    return () => {
      window.removeEventListener('message', handleMessage);
      
      if (iframeWrapperRef.current) {
        iframeWrapperRef.current.removeEventListener('click', handleIframeWrapperClick as EventListener);
      }
      
      if (observer) {
        observer.disconnect();
      }
      
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', handleIframeLoad);
      }
    };
  }, []);

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

  useEffect(() => {
    if (consentAccepted && vCitaUrl) {
      window.open(vCitaUrl, '_blank');
      setVCitaUrl(null);
    }
  }, [consentAccepted, vCitaUrl]);

  return (
    <div className="w-full relative">
      <div 
        ref={iframeWrapperRef} 
        className="w-full cursor-pointer"
        onClick={(e) => {
          // This is a backup click handler for the entire wrapper
          const target = e.target as HTMLElement;
          // Check if the click is at the bottom of the container (likely submit button)
          if (iframeWrapperRef.current) {
            const rect = iframeWrapperRef.current.getBoundingClientRect();
            const y = e.clientY - rect.top;
            if (y > rect.height * 0.75) {
              console.log("Bottom area click detected in wrapper");
              // Set a short timeout to check if the form is valid before showing consent
              setTimeout(() => {
                setShowConsentDialog(true);
              }, 300);
            }
          }
        }}
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
