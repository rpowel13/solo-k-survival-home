import { SoloFormValues } from '@/components/solo401k/FormSchema';
import { ContactFormValues } from '@/components/contact/ContactFormSchema';
import { ScheduleFormValues } from '@/components/consultation/types';
import { z } from 'zod';
import { getZapierWebhookUrl } from './zapierConfigService';

// Define types for the LLC and First Responder forms based on their structure
export type LLCFormValues = z.infer<typeof llcFormSchema>;
export type FirstResponderFormValues = z.infer<typeof firstResponderFormSchema>;

// Simplified schema definitions to help with TypeScript type checking
const llcFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  desiredLLCName: z.string(),
  alternativeName1: z.string().optional(),
  alternativeName2: z.string().optional(),
  state: z.string(),
  memberCount: z.string(),
  businessPurpose: z.string(),
  additionalInfo: z.string().optional(),
  agreeToTerms: z.boolean(),
});

const firstResponderFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  occupation: z.string(),
  department: z.string(),
  yearsOfService: z.string(),
  desiredLLCName: z.string(),
  state: z.string(),
  additionalInfo: z.string().optional(),
  verify401kInterest: z.boolean(),
  agreeToTerms: z.boolean(),
});

export interface EmailResponse {
  success: boolean;
  message: string;
}

type FormData = SoloFormValues | ContactFormValues | LLCFormValues | FirstResponderFormValues | ScheduleFormValues;

/**
 * Helper functions to check form types
 */
function isSolo401kForm(data: FormData): data is SoloFormValues {
  return 'firstName' in data && 'ssn' in data;
}

function isContactForm(data: FormData): data is ContactFormValues {
  return 'name' in data && 'message' in data;
}

function isLLCForm(data: FormData): data is LLCFormValues {
  return 'firstName' in data && 'desiredLLCName' in data && 'businessPurpose' in data;
}

function isFirstResponderForm(data: FormData): data is FirstResponderFormValues {
  return 'firstName' in data && 'occupation' in data && 'department' in data;
}

function isScheduleForm(data: FormData): data is ScheduleFormValues {
  return 'name' in data && 'date' in data && 'time' in data;
}

/**
 * Sends the form data to a Zapier webhook for CRM integration
 * @param data The form data to send
 * @returns A promise resolving to the email response
 */
export const triggerZapierWebhook = async (data: FormData): Promise<EmailResponse> => {
  try {
    console.log(`[${new Date().toISOString()}] Sending form data to Zapier:`, data);
    
    // Get the configured Zapier webhook URL
    const webhookUrl = getZapierWebhookUrl();
    
    // Determine the type of form data and format accordingly
    let formattedData: Record<string, any>;
    let emailSubject: string;
    let leadSource: string = "Website Form";
    
    if (isSolo401kForm(data)) {
      // This is Solo401k form data
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
        leadSource: leadSource
      };
      emailSubject = "New Solo 401k Application";
      
    } else if (isContactForm(data)) {
      // This is Contact form data
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
        leadSource: leadSource
      };
      emailSubject = "New Contact Form Submission";
      
    } else if (isLLCForm(data)) {
      // This is LLC form data
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
        leadSource: leadSource
      };
      emailSubject = "New LLC Formation Application";
      
    } else if (isFirstResponderForm(data)) {
      // This is First Responder form data
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
        leadSource: leadSource
      };
      emailSubject = "New First Responder Package Application";
    } else if (isScheduleForm(data)) {
      // Enhanced Schedule Consultation form data
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
    
    // Add recipient emails to the data (multiple recipients)
    formattedData.recipientEmails = ["ross.powell@survival401k.com", "jill.powell@survival401k.com"];
    formattedData.emailSubject = emailSubject;
    formattedData.targetService = "CRM"; // This identifies that data should be sent to external CRM
    
    // Log the webhook URL being used (for debugging only)
    console.log(`[${new Date().toISOString()}] Using Zapier webhook URL: ${webhookUrl}`);
    
    // Send data to Zapier webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedData),
      mode: 'no-cors' // This helps with CORS issues
    });
    
    // Since we're using no-cors, we won't get a proper response
    // Instead, we'll assume it worked if no error was thrown
    console.log(`[${new Date().toISOString()}] Zapier webhook triggered successfully`);
    return { 
      success: true,
      message: 'Form submitted successfully to Zapier and CRM'
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error sending data to Zapier:`, error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
