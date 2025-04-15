
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
  const [submitButtonSelector] = useState(".button-container button, .vcita-form-submit, [type='submit'], button.submit-button");

  // Function to show the consent dialog
  const showConsent = () => {
    console.log("✅ Showing consent dialog");
    setShowConsentDialog(true);
  };

  useEffect(() => {
    // Force check for buttons after iframe loads
    const checkForSubmitButtons = () => {
      try {
        if (!iframeRef.current || !iframeRef.current.contentDocument) return;
        
        const buttons = iframeRef.current.contentDocument.querySelectorAll(submitButtonSelector);
        console.log(`Found ${buttons.length} potential submit buttons in iframe`);
        
        buttons.forEach(button => {
          button.addEventListener('click', (e) => {
            console.log("Submit button clicked inside iframe");
            setTimeout(showConsent, 100);
          });
        });
      } catch (e) {
        console.log("CORS prevented direct submit button access", e);
      }
    };

    // Enhanced message event handling
    const handleMessage = (event: MessageEvent) => {
      console.log("Received message from iframe:", event.data);
      
      // Check for ANY form-related events from vCita
      if (typeof event.data === 'object') {
        const eventStr = JSON.stringify(event.data).toLowerCase();
        if (eventStr.includes('submit') || 
            eventStr.includes('form') || 
            eventStr.includes('success') || 
            eventStr.includes('complete')) {
          console.log("Form-related message detected:", eventStr);
          showConsent();
          return;
        }
      }
      
      // Check for string messages
      if (typeof event.data === 'string') {
        const dataStr = event.data.toLowerCase();
        if (dataStr.includes('submit') || 
            dataStr.includes('form') || 
            dataStr.includes('success') || 
            dataStr.includes('complete')) {
          console.log("Form-related string message detected:", dataStr);
          showConsent();
          return;
        }
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Monitor for clicks in the iframe container
    const handleIframeWrapperClick = (e: MouseEvent) => {
      if (!iframeWrapperRef.current || !iframeRef.current) return;
      
      const iframe = iframeRef.current;
      const rect = iframe.getBoundingClientRect();
      
      // Check if click is in the bottom 40% of the iframe (likely submit button area)
      const y = e.clientY - rect.top;
      const threshold = rect.height * 0.6; // Bottom 40% of iframe
      
      if (y > threshold) {
        console.log("Click detected in the likely submit button area");
        // Use a debounced approach to allow the real click to process
        setTimeout(() => {
          try {
            // Try to directly check for submission indicators in the iframe
            if (iframeRef.current && iframeRef.current.contentWindow) {
              const iframeDoc = iframeRef.current.contentWindow.document;
              const formElements = iframeDoc.querySelectorAll('form');
              
              // If only one form exists, this is likely a submission
              if (formElements.length === 1) {
                console.log("Single form detected, likely submission");
                showConsent();
              }
            }
          } catch (e) {
            // Silent catch for CORS
            console.log("Click in submit area - showing consent dialog");
            showConsent();
          }
        }, 300);
      }
    };
    
    if (iframeWrapperRef.current) {
      iframeWrapperRef.current.addEventListener('click', handleIframeWrapperClick as EventListener);
    }
    
    // Monitor window URL changes that might indicate a form submission
    const handleLocationChange = () => {
      if (window.location.href.includes("success") || 
          window.location.href.includes("thank-you") || 
          window.location.href.includes("submitted")) {
        console.log("URL change indicating submission:", window.location.href);
        showConsent();
      }
    };
    
    window.addEventListener('popstate', handleLocationChange);
    
    // Set up a periodic checker to detect form submission
    const intervalCheck = setInterval(() => {
      try {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          // Try to access the iframe content - if it's a new URL this could indicate submission
          const currentUrl = iframeRef.current.contentWindow.location.href;
          if (currentUrl.includes("success") || 
              currentUrl.includes("thank-you") || 
              currentUrl.includes("submitted")) {
            console.log("Iframe URL change indicating submission:", currentUrl);
            showConsent();
          }
          
          // Look for success messages in the iframe content
          try {
            const iframeDoc = iframeRef.current.contentWindow.document;
            const successElements = iframeDoc.querySelectorAll('.success-message, .thank-you-message, .form-submitted');
            if (successElements.length > 0) {
              console.log("Success elements found in iframe");
              showConsent();
            }
            
            // Force check for submit buttons periodically
            checkForSubmitButtons();
          } catch (e) {
            // Silent catch for CORS errors
          }
        }
      } catch (e) {
        // Silent catch for CORS errors
      }
    }, 1000);
    
    // Handle iframe load event to attach button listeners and check content
    const handleIframeLoad = () => {
      console.log("Iframe loaded");
      setTimeout(checkForSubmitButtons, 1000);
      setTimeout(checkForSubmitButtons, 2000);
      setTimeout(checkForSubmitButtons, 3000);
    };
    
    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', handleIframeLoad);
    }
    
    // Create a Mutation Observer to monitor for changes in the iframe's attributes
    // This can help detect when iframe content changes after submission
    let observer: MutationObserver;
    if (iframeRef.current) {
      observer = new MutationObserver(() => {
        console.log("Iframe mutation detected");
        setTimeout(checkForSubmitButtons, 500);
      });
      
      observer.observe(iframeRef.current, { 
        attributes: true,
        childList: false,
        subtree: false
      });
    }
    
    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('popstate', handleLocationChange);
      
      if (iframeWrapperRef.current) {
        iframeWrapperRef.current.removeEventListener('click', handleIframeWrapperClick as EventListener);
      }
      
      if (observer) {
        observer.disconnect();
      }
      
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', handleIframeLoad);
      }
      
      clearInterval(intervalCheck);
    };
  }, [submitButtonSelector]);

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
            if (y > rect.height * 0.7) {
              console.log("Bottom area click detected in wrapper");
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
