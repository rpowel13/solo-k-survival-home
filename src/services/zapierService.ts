
import { SoloFormValues } from '@/components/solo401k/FormSchema';

interface EmailResponse {
  success: boolean;
  message?: string;
}

/**
 * Sends the form data directly via email using the browser's mailto mechanism
 */
export const triggerZapierWebhook = async (data: SoloFormValues): Promise<EmailResponse> => {
  try {
    console.log('Sending email with data:', data);
    
    // Format email body with form data
    const emailBody = `
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
    
    // Encode the email body for mailto URL
    const encodedBody = encodeURIComponent(emailBody);
    const encodedSubject = encodeURIComponent("New Solo 401k Application");
    
    // Create mailto link
    const mailtoLink = `mailto:your-email@example.com?subject=${encodedSubject}&body=${encodedBody}`;
    
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
