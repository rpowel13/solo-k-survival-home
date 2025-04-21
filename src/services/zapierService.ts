
import { FormData, EmailResponse } from '@/types/formTypes';
import { WebhookType } from './zapier/webhookTypes';
import { validateZapierPayload } from './zapier/submissionValidator';
import { handleSolo401kSubmission } from './zapier/handlers/solo401kHandler';
import { handleLLCSubmission } from './zapier/handlers/llcHandler';
import { handleGenericSubmission } from './zapier/handlers/genericHandler';

export const triggerZapierWebhook = async (data: FormData): Promise<EmailResponse> => {
  try {
    console.log(`[${new Date().toISOString()}] Preparing to send form data to Zapier:`, data);
    
    if (!validateZapierPayload(data)) {
      return {
        success: false,
        message: 'Invalid data format. Data must be an object.'
      };
    }
    
    // Determine webhook type from formType property
    const explicitFormType = 'formType' in data ? data.formType : null;
    let webhookType = 'crm' as WebhookType;
    
    if (explicitFormType?.toLowerCase().includes('solo401k')) {
      return await handleSolo401kSubmission(data);
    } else if (explicitFormType?.toLowerCase().includes('llc')) {
      return await handleLLCSubmission(data);
    }
    
    // Handle other form types
    if (explicitFormType) {
      if (explicitFormType.toLowerCase().includes('first_responder')) {
        webhookType = 'first_responder';
      } else if (explicitFormType.toLowerCase().includes('schedule')) {
        webhookType = 'consultation';
      } else if (explicitFormType.toLowerCase().includes('contact')) {
        webhookType = 'crm';
      }
    }
    
    return await handleGenericSubmission(data, webhookType);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error sending data to Zapier:`, error);
    return { 
      success: false, 
      message: 'Failed to submit to Zapier: ' + (error instanceof Error ? error.message : 'Unknown error')
    };
  }
};

// Re-export test function with simplified implementation
export const testZapierWebhook = async (webhookType: string): Promise<EmailResponse> => {
  try {
    const testData = {
      formType: webhookType,
      name: "Test Contact",
      email: "test@example.com",
      phone: "555-123-4567",
      subject: "Zapier Test",
      message: "This is a manual test ping from the application.",
      timestamp: new Date().toISOString(),
      sourceUrl: typeof window !== 'undefined' ? window.location.href : 'Unknown'
    };
    
    return await handleGenericSubmission(testData, webhookType as WebhookType);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error testing Zapier webhook:`, error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
