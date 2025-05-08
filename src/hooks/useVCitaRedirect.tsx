
import { useState, useEffect } from "react";

interface UseVCitaRedirectProps {
  consentAccepted: boolean;
}

export function useVCitaRedirect({ consentAccepted }: UseVCitaRedirectProps) {
  const [vCitaUrl, setVCitaUrl] = useState<string | null>(null);
  
  // Redirect after consent is accepted
  useEffect(() => {
    if (consentAccepted && vCitaUrl) {
      window.open(vCitaUrl, "_blank");
      setVCitaUrl(null);
    }
  }, [consentAccepted, vCitaUrl]);

  const handleRedirect = () => {
    setVCitaUrl("https://www.vcita.com/v/izk040b42jnjcf3c/contact?frontage_iframe=true&invite=vr_cf_pb-izk040b42jnjcf3c");
  };

  return { handleRedirect };
}
