
import { SoloFormValues } from '@/components/solo401k/FormSchema';
import { ContactFormValues } from '@/components/contact/ContactFormSchema';

interface EmailResponse {
  success: boolean;
  message?: string;
}

type FormData = SoloFormValues | ContactFormValues;

// Zapier webhook URL - you should replace this with your actual Zapier webhook URL
const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/your-webhook-id/";

/**
 * Checks if the data is from Solo401k form
 */
function isSolo401kForm(data: FormData): data is SoloFormValues {
  return 'firstName' in data;
}

/**
 * Checks if the data is from Contact form
 */
function isContactForm(data: FormData): data is ContactFormValues {
  return 'name' in data;
}

/**
 * Sends the form data to a Zapier webhook in the background
 */
export const triggerZapierWebhook = async (data: FormData): Promise<EmailResponse> => {
  try {
    console.log('Sending email with data:', data);
    
    // Determine the type of form data and format accordingly
    let formattedData: Record<string, any>;
    let emailSubject: string;
    
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
        source: window.location.href
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
        source: window.location.href
      };
      emailSubject = "New Contact Form Submission";
    } else {
      throw new Error("Unknown form data type");
    }
    
    // Add recipient emails to the data (multiple recipients)
    formattedData.recipientEmails = ["ross.powell@survival401k.com", "jill.powell@survival401k.com"];
    formattedData.emailSubject = emailSubject;
    
    // Send data to Zapier webhook
    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedData),
      mode: 'no-cors' // This helps with CORS issues
    });
    
    // Since we're using no-cors, we won't get a proper response
    // Instead, we'll assume it worked if no error was thrown
    return { 
      success: true,
      message: 'Form submitted successfully'
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
