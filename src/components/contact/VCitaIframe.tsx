
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
    const createOverlay = () => {
      const iframe = document.querySelector('iframe');
      if (!iframe) return;
      
      const overlay = document.createElement('div');
      overlay.id = 'vcita-overlay';
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.background = 'transparent';
      overlay.style.zIndex = '10000';
      overlay.style.cursor = 'pointer';
      
      overlay.addEventListener('click', (e) => {
        const rect = iframe.getBoundingClientRect();
        
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (y > rect.height * 0.7) {
          console.log('Potential submit button click detected at:', { x, y });
          e.preventDefault();
          e.stopPropagation();
          
          setShowConsentDialog(true);
          return false;
        }
      });
      
      const container = iframe.parentElement;
      if (container) {
        container.style.position = 'relative';
        container.appendChild(overlay);
      }
    };
    
    const overlayTimer = setTimeout(() => {
      console.log("Setting up vCita overlay");
      createOverlay();
    }, 3000);
    
    const handleGlobalClick = (e: MouseEvent) => {
      const iframe = document.querySelector('iframe');
      if (!iframe) return;
      
      const rect = iframe.getBoundingClientRect();
      
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        if (e.clientY > rect.top + (rect.height * 0.7)) {
          console.log('Global click handler detected potential form submission');
          e.preventDefault();
          e.stopPropagation();
          setShowConsentDialog(true);
          return false;
        }
      }
    };
    
    document.addEventListener('click', handleGlobalClick, true);
    
    return () => {
      clearTimeout(overlayTimer);
      document.removeEventListener('click', handleGlobalClick, true);
      const overlay = document.getElementById('vcita-overlay');
      if (overlay) overlay.remove();
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
          src="https://www.vcita.com/v/izk040b42jnjcf3c/contact?frontage_iframe=true&v=3" 
          width="100%" 
          height="700" 
          scrolling="no" 
          frameBorder="0" 
          onError={handleIframeError}
          onLoad={handleIframeLoad}
          title="Contact Form"
          className="w-full min-h-[700px]"
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
