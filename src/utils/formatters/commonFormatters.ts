
import { FormData } from '@/types/formTypes';

export const formatBasicInfo = (data: FormData) => {
  const leadSource = "Website Form";
  const submissionMetadata = {
    submissionDate: new Date().toLocaleString(),
    submissionTimestamp: new Date().toISOString(),
    source: typeof window !== 'undefined' ? window.location.href : 'unknown',
    leadSource,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    browserInfo: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
  };
  
  return {
    ...submissionMetadata,
    recipientEmails: ["ross.powell@survival401k.com", "jill.powell@survival401k.com"]
  };
};

export const formatAddress = (data: FormData) => ({
  street: data.street,
  city: data.city,
  state: data.state,
  zipCode: data.zipCode,
  address: {
    street: data.street,
    city: data.city,
    state: data.state,
    zipCode: data.zipCode
  }
});
