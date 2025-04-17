
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
  let emailSubject: string;

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
      source: window.location.href,
      leadSource
    };
    emailSubject = "New Solo 401k Application";
  } else if (isContactForm(data)) {
    formattedData = {
      formType: 'Contact',
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      consent: data.consent ? 'Yes' : 'No',
      submissionDate: new Date().toLocaleString(),
      source: window.location.href,
      leadSource
    };
    emailSubject = "New Contact Form Submission";
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
      source: window.location.href,
      leadSource
    };
    emailSubject = "New LLC Formation Application";
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
      source: window.location.href,
      leadSource
    };
    emailSubject = "New First Responder Package Application";
  } else if (isScheduleForm(data)) {
    formattedData = {
      formType: 'Schedule_Consultation',
      name: data.name,
      email: data.email,
      phone: data.phone,
      requestedDate: data.date instanceof Date ? data.date.toLocaleDateString() : data.date,
      requestedTime: data.time,
      message: data.message || 'N/A',
      submissionDate: new Date().toLocaleString(),
      source: window.location.href,
      leadSource: 'Consultation Scheduler',
      leadType: 'Hot Lead - Consultation Request',
      priority: 'High',
      nextAction: 'Schedule Follow-up Call',
      nextActionDue: data.date instanceof Date ? data.date.toISOString() : new Date(data.date).toISOString()
    };
    emailSubject = "New Consultation Request - Priority Lead";
  } else {
    throw new Error("Unknown form data type");
  }

  // Add recipient emails
  formattedData.recipientEmails = ["ross.powell@survival401k.com", "jill.powell@survival401k.com"];
  formattedData.emailSubject = emailSubject;
  formattedData.targetService = "CRM";

  return formattedData;
}
