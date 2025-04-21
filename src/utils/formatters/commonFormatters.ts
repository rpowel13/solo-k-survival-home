
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

export const formatAddress = (data: FormData) => {
  // Check if the data contains address properties before accessing them
  if (!('street' in data) || !('city' in data) || !('state' in data) || !('zipCode' in data)) {
    return {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      }
    };
  }
  
  return {
    street: data.street as string,
    city: data.city as string,
    state: data.state as string,
    zipCode: data.zipCode as string,
    address: {
      street: data.street as string,
      city: data.city as string,
      state: data.state as string,
      zipCode: data.zipCode as string
    }
  };
};
