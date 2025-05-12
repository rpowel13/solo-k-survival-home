
import React, { useRef, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import ConsentDialog from "./ConsentDialog";
import VCitaIframeComponent from "./VCitaIframeComponent";
import { useConsentDialogState } from "@/hooks/useConsentDialogState";
import { useVCitaRedirect } from "@/hooks/useVCitaRedirect";
import { useIframeEvents } from "@/hooks/useIframeEvents";
import { useKeyboardEvents } from "@/hooks/useKeyboardEvents";

interface VCitaIframeProps {
  onError: () => void;
}

const VCitaIframe: React.FC<VCitaIframeProps> = ({ onError }) => {
  const { 
    showConsentDialog, 
    setShowConsentDialog, 
    consentAccepted, 
    setConsentAccepted,
    submitAttempted,
    setSubmitAttempted
  } = useConsentDialogState();
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeWrapperRef = useRef<HTMLDivElement>(null);

  const { handleRedirect } = useVCitaRedirect({ consentAccepted });
  
  // Direct function to show consent dialog
  const showConsent = useCallback(() => {
    setShowConsentDialog(true);
    setSubmitAttempted(true);
  }, [setShowConsentDialog, setSubmitAttempted]);
  
  // Set wrapper ref from child component
  const setWrapperRef = useCallback((ref: React.RefObject<HTMLDivElement>) => {
    iframeWrapperRef.current = ref.current;
  }, []);

  // Intercept clicks that might be submit button presses
  const handleWrapperClick = (e: React.MouseEvent) => {
    const rect = iframeWrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    // If click is in the bottom region (likely submit button)
    const y = e.clientY - rect.top;
    if (y > rect.height * 0.7) {
      setTimeout(showConsent, 300);
    }
  };

  const handleConsentAccept = () => {
    setConsentAccepted(true);
    setShowConsentDialog(false);
    
    // Redirect user and show success toast
    handleRedirect();
    
    // Show success message
    toast({
      title: "Message Sent",
      description: "Your message has been received. We'll be in touch shortly.",
      duration: 5000
    });
  };
  
  // Use custom hooks for event handling
  useIframeEvents({ iframeRef, showConsent, submitAttempted });
  useKeyboardEvents({ showConsent });

  return (
    <div className="w-full relative" onClick={handleWrapperClick}>
      <VCitaIframeComponent
        onError={onError}
        onWrapper={setWrapperRef}
        iframeRef={iframeRef}
      />
      
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
