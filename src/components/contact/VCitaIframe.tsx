
import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const iframe = document.querySelector('iframe');
    if (!iframe) return;
    
    // Listen for form submission
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'vcita_form_submit') {
        setShowConsentDialog(true);
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Monitor form submit buttons instead of using an overlay
    const checkForSubmitButtons = () => {
      try {
        const iframeDocument = (iframe as HTMLIFrameElement).contentDocument || 
                              (iframe as HTMLIFrameElement).contentWindow?.document;
                              
        if (iframeDocument) {
          const submitButtons = iframeDocument.querySelectorAll('button[type="submit"], input[type="submit"]');
          
          submitButtons.forEach(button => {
            if (!button.getAttribute('data-consent-monitored')) {
              button.setAttribute('data-consent-monitored', 'true');
              button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowConsentDialog(true);
                return false;
              });
            }
          });
        }
      } catch (e) {
        // Cross-origin restrictions may prevent accessing iframe content
        console.log("Could not access iframe content due to cross-origin policy");
      }
    };
    
    // Check for submit buttons periodically
    const buttonCheckInterval = setInterval(checkForSubmitButtons, 2000);
    
    // Listen for clicks on the iframe
    const handleIframeClick = (e: MouseEvent) => {
      const iframe = document.querySelector('iframe');
      if (!iframe) return;
      
      const rect = iframe.getBoundingClientRect();
      const y = e.clientY - rect.top;
      
      // Only intercept clicks in the bottom area (likely submit button)
      if (y > rect.height * 0.8) {
        const target = e.target as HTMLElement;
        const buttonText = target.textContent?.toLowerCase() || '';
        
        // Check if the clicked element is likely a submit button
        if (buttonText.includes('submit') || 
            buttonText.includes('send') || 
            target.tagName === 'BUTTON' || 
            target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'submit') {
          e.preventDefault();
          e.stopPropagation();
          setShowConsentDialog(true);
          return false;
        }
      }
    };
    
    iframe.addEventListener('load', () => {
      try {
        // Try to add event listener to iframe content
        const iframeDocument = (iframe as HTMLIFrameElement).contentDocument || 
                              (iframe as HTMLIFrameElement).contentWindow?.document;
                               
        if (iframeDocument) {
          iframeDocument.addEventListener('click', handleIframeClick);
        }
      } catch (e) {
        // Fallback for cross-origin restrictions
        console.log("Adding click listener to iframe instead");
        iframe.addEventListener('click', handleIframeClick);
      }
    });
    
    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(buttonCheckInterval);
      iframe.removeEventListener('click', handleIframeClick);
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
