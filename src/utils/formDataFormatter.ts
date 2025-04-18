
import { FormData } from '@/types/formTypes';
import { 
  isSolo401kForm, 
  isContactForm, 
  isLLCForm, 
  isFirstResponderForm,
  isScheduleForm 
} from './formTypeUtils';

export function formatFormData(data: FormData) {
  const leadSource = "Website Form";
  let formattedData: Record<string, any>;

  if (isSolo401kForm(data)) {
    formattedData = {
      formType: 'Solo401k',
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      ssn: data.ssn,
      businessName: data.businessName,
      businessType: data.businessType,
      annualIncome: data.annualIncome,
      trustee1Name: data.trustee1Name,
      trustee2Name: data.trustee2Name || '',
      participant1Name: data.participant1Name,
      participant2Name: data.participant2Name || '',
      existingRetirement: data.existingRetirement ? 'Yes' : 'No',
      additionalInfo: data.additionalInfo || 'N/A',
      submissionDate: new Date().toLocaleString(),
      source: typeof window !== 'undefined' ? window.location.href : 'unknown',
      leadSource
    };
  } else if (isContactForm(data)) {
    // Ensure all contact form fields are at the top level
    formattedData = {
      formType: 'Contact',
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      subject: data.subject || '',
      message: data.message || '',
      consent: data.consent ? 'Yes' : 'No',
      submissionDate: new Date().toLocaleString(),
      source: typeof window !== 'undefined' ? window.location.href : 'unknown',
      leadSource,
      // Add any additional fields that might be useful
      leadType: 'Website Contact Form',
      priority: 'Medium',
      nextAction: 'Follow-up Call'
    };
  } else if (isLLCForm(data)) {
    formattedData = {
      formType: 'LLC_Formation',
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      desiredLLCName: data.desiredLLCName,
      alternativeName1: data.alternativeName1 || 'None provided',
      alternativeName2: data.alternativeName2 || 'None provided',
      state: data.state,
      memberCount: data.memberCount,
      businessPurpose: data.businessPurpose,
      additionalInfo: data.additionalInfo || 'N/A',
      submissionDate: new Date().toLocaleString(),
      source: typeof window !== 'undefined' ? window.location.href : 'unknown',
      leadSource
    };
  } else if (isFirstResponderForm(data)) {
    formattedData = {
      formType: 'First_Responder_Package',
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      occupation: data.occupation,
      department: data.department,
      yearsOfService: data.yearsOfService,
      desiredLLCName: data.desiredLLCName,
      state: data.state,
      verify401kInterest: data.verify401kInterest ? 'Yes' : 'No',
      additionalInfo: data.additionalInfo || 'N/A',
      submissionDate: new Date().toLocaleString(),
      source: typeof window !== 'undefined' ? window.location.href : 'unknown',
      leadSource
    };
  } else if (isScheduleForm(data)) {
    const formattedDate = data.date instanceof Date 
      ? data.date.toLocaleDateString() 
      : typeof data.date === 'string' ? data.date : 'Invalid date';
    
    formattedData = {
      formType: 'Schedule_Consultation',
      name: data.name,
      email: data.email,
      phone: data.phone,
      requestedDate: formattedDate,
      requestedTime: data.time,
      message: data.message || 'N/A',
      submissionDate: new Date().toLocaleString(),
      source: typeof window !== 'undefined' ? window.location.href : 'unknown',
      leadSource: 'Consultation Scheduler',
      leadType: 'Hot Lead - Consultation Request',
      priority: 'High',
      nextAction: 'Schedule Follow-up Call',
      nextActionDue: data.date instanceof Date 
        ? data.date.toISOString() 
        : typeof data.date === 'string' ? new Date(data.date).toISOString() : new Date().toISOString()
    };
  } else {
    // Fallback case for unknown form types - Fixed to avoid TypeScript errors
    console.warn(`[${new Date().toISOString()}] Unknown form type, using generic format:`, data);
    
    // Create a properly typed generic object instead of spreading data
    formattedData = {
      formType: 'Unknown',
      submissionDate: new Date().toLocaleString(),
      source: typeof window !== 'undefined' ? window.location.href : 'unknown',
      leadSource: 'Website Form'
    };
    
    // Safely add properties from data as they exist
    if (typeof data === 'object' && data !== null) {
      // Add all properties that exist in data to our formattedData
      Object.entries(data).forEach(([key, value]) => {
        formattedData[key] = value;
      });
      
      // If formType is explicitly provided in data, use that instead of 'Unknown'
      if ('formType' in data && data.formType) {
        formattedData.formType = data.formType;
      }
    }
  }

  // Add recipient emails
  formattedData.recipientEmails = ["ross.powell@survival401k.com", "jill.powell@survival401k.com"];
  
  // Include any additional tracking or metadata fields
  formattedData.submissionTimestamp = new Date().toISOString();
  formattedData.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  formattedData.browserInfo = typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown';

  return formattedData;
}
