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

  // Handle explicit formType if provided
  const explicitFormType = 'formType' in data ? data.formType : null;
  console.log(`[${new Date().toISOString()}] Formatting form data, detected type: ${explicitFormType || 'Unknown'}`);
  
  if (isSolo401kForm(data)) {
    console.log(`[${new Date().toISOString()}] Formatting as Solo401k form data`);
    formattedData = {
      formType: 'Solo401k',
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      ssn: data.ssn,
      // Ensure address fields are always included at the top level
      street: data.street,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      // Also keep the address object for backwards compatibility
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode
      },
      businessName: data.businessName,
      businessType: data.businessType,
      annualIncome: data.annualIncome,
      trustee1Name: data.trustee1Name,
      trustee2Name: data.trustee2Name || '',
      participant1Name: data.participant1Name,
      participant2Name: data.participant2Name || '',
      existingRetirement: 'existingRetirement' in data ? (data.existingRetirement ? 'Yes' : 'No') : 'No',
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
    // Enhanced LLC form data formatting - ensure all fields are included
    formattedData = {
      formType: 'LLC_Formation',
      // Personal information
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      ssn: data.ssn,
      
      // Address information
      street: data.street,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode
      },
      
      // Business information
      desiredLLCName: data.desiredLLCName,
      alternativeName1: data.alternativeName1 || 'None provided',
      alternativeName2: data.alternativeName2 || 'None provided',
      memberCount: data.memberCount,
      businessPurpose: data.businessPurpose,
      
      // Management Information - using type assertion to access the properties
      managementType: 'managementType' in data ? data.managementType as string : 'Not specified',
      member1Name: 'member1Name' in data ? data.member1Name as string : 'Not specified',
      member1Title: 'member1Title' in data ? data.member1Title as string : 'Not specified',
      member2Name: 'member2Name' in data ? (data.member2Name as string || 'None provided') : 'None provided',
      member2Title: 'member2Title' in data ? (data.member2Title as string || 'None provided') : 'None provided',
      
      // Registered Agent Information
      registeredAgentName: 'registeredAgentName' in data ? data.registeredAgentName as string : 'Not specified',
      registeredAgentAddress: {
        street: 'registeredAgentStreet' in data ? data.registeredAgentStreet as string : 'Not specified',
        city: 'registeredAgentCity' in data ? data.registeredAgentCity as string : 'Not specified',
        state: 'registeredAgentState' in data ? data.registeredAgentState as string : 'Not specified',
        zipCode: 'registeredAgentZip' in data ? data.registeredAgentZip as string : 'Not specified'
      },
      
      // Additional information
      additionalInfo: data.additionalInfo || 'N/A',
      agreeToTerms: data.agreeToTerms ? 'Yes' : 'No',
      
      // Metadata
      submissionDate: new Date().toLocaleString(),
      submissionTimestamp: new Date().toISOString(),
      source: typeof window !== 'undefined' ? window.location.href : 'unknown',
      leadSource,
      leadType: 'LLC Formation Application',
      priority: 'High'
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
    // Fallback case for unknown form types with proper typing
    console.warn(`[${new Date().toISOString()}] Unknown form type, using generic format:`, data);
    
    // Create a properly typed generic object
    formattedData = {
      formType: explicitFormType || 'Unknown',
      submissionDate: new Date().toLocaleString(),
      source: typeof window !== 'undefined' ? window.location.href : 'unknown',
      leadSource: 'Website Form'
    };
    
    // Safely add properties from data
    if (typeof data === 'object' && data !== null) {
      // Add all properties that exist in data to our formattedData
      Object.entries(data).forEach(([key, value]) => {
        formattedData[key] = value;
      });
    }
  }

  // Add recipient emails
  formattedData.recipientEmails = ["ross.powell@survival401k.com", "jill.powell@survival401k.com"];
  
  // Include any additional tracking or metadata fields
  formattedData.submissionTimestamp = new Date().toISOString();
  formattedData.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  formattedData.browserInfo = typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown';
  
  // Add debug info
  console.log(`[${new Date().toISOString()}] Formatted form data:`, formattedData);

  return formattedData;
}
