
import { useState } from "react";

interface UseConsentDialogStateReturn {
  showConsentDialog: boolean;
  setShowConsentDialog: (show: boolean) => void;
  consentAccepted: boolean;
  setConsentAccepted: (accepted: boolean) => void;
  submitAttempted: boolean;
  setSubmitAttempted: (attempted: boolean) => void;
}

export function useConsentDialogState(): UseConsentDialogStateReturn {
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  return {
    showConsentDialog,
    setShowConsentDialog,
    consentAccepted,
    setConsentAccepted,
    submitAttempted,
    setSubmitAttempted,
  };
}
