
import { SoloFormValues } from '@/components/solo401k/FormSchema';
import { ContactFormValues } from '@/components/contact/ContactFormSchema';

interface EmailResponse {
  success: boolean;
  message?: string;
}

type FormData = SoloFormValues | ContactFormValues;

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
 * Sends the form data directly via email using the browser's mailto mechanism
 */
export const triggerZapierWebhook = async (data: FormData): Promise<EmailResponse> => {
  try {
    console.log('Sending email with data:', data);
    
    // Determine the type of form data and format accordingly
    let emailBody: string;
    let emailSubject: string;
    
    if (isSolo401kForm(data)) {
      // This is Solo401k form data
      emailBody = `
Solo 401k Application Details:
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
SSN: ${data.ssn}

Business Information:
Business Name: ${data.businessName}
Business Type: ${data.businessType}
Annual Income: ${data.annualIncome}

Plan Details:
Trustee 1: ${data.trustee1Name}
${data.trustee2Name ? `Trustee 2: ${data.trustee2Name}` : ''}
Participant 1: ${data.participant1Name}
${data.participant2Name ? `Participant 2: ${data.participant2Name}` : ''}
${data.existingRetirement ? 'Has existing retirement accounts' : 'No existing retirement accounts'}

Additional Information:
${data.additionalInfo || 'N/A'}

Submission Date: ${new Date().toLocaleString()}
Source: ${window.location.href}
`;
      emailSubject = "New Solo 401k Application";
      
    } else if (isContactForm(data)) {
      // This is Contact form data
      emailBody = `
Contact Form Submission:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Subject: ${data.subject}

Message:
${data.message}

Consent: ${data.consent ? 'Yes' : 'No'}
Submission Date: ${new Date().toLocaleString()}
Source: ${window.location.href}
`;
      emailSubject = "New Contact Form Submission";
    } else {
      throw new Error("Unknown form data type");
    }
    
    // Encode the email body for mailto URL
    const encodedBody = encodeURIComponent(emailBody);
    const encodedSubject = encodeURIComponent(emailSubject);
    
    // Create mailto link
    const mailtoLink = `mailto:ross.powell@survival401k.com?subject=${encodedSubject}&body=${encodedBody}`;
    
    // Open the default email client
    window.open(mailtoLink, '_blank');
    
    return { 
      success: true,
      message: 'Email client opened successfully'
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
