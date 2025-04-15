
import React, { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import ConsentDialog from "./ConsentDialog";
import { useIframeSubmitDetection } from "@/hooks/useIframeSubmitDetection";

interface VCitaIframeProps {
  onError: () => void;
}

const VCitaIframe: React.FC<VCitaIframeProps> = ({ onError }) => {
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [vCitaUrl, setVCitaUrl] = useState<string | null>(null);

  // Function to show the consent dialog
  const showConsent = () => {
    console.log("✅ Showing consent dialog");
    setShowConsentDialog(true);
  };

  // Use the custom hook for iframe submission detection
  const { iframeRef, iframeWrapperRef } = useIframeSubmitDetection({
    onSubmitDetected: showConsent
  });

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
