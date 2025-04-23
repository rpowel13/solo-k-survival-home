
import { FormData, EmailResponse } from '@/types/formTypes';
import { WebhookType } from './zapier/webhookTypes';
import { validateZapierPayload } from './zapier/submissionValidator';
import { handleSolo401kSubmission, handleFirstResponder401kSubmission } from './zapier/handlers/solo401kHandler';
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
    
    // Log the form type for debugging
    console.log(`[${new Date().toISOString()}] Form type detected: ${explicitFormType}`);
    
    if (explicitFormType?.toLowerCase().includes('solo401k')) {
      console.log(`[${new Date().toISOString()}] Handling as Solo401k submission`);
      return await handleSolo401kSubmission(data);
    } else if (explicitFormType?.toLowerCase().includes('first_responder_401k')) {
      console.log(`[${new Date().toISOString()}] Handling as First Responder 401k submission`);
      return await handleFirstResponder401kSubmission(data);
    } else if (explicitFormType?.toLowerCase().includes('llc')) {
      console.log(`[${new Date().toISOString()}] Handling as LLC submission`);
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
    
    console.log(`[${new Date().toISOString()}] Using webhook type: ${webhookType}`);
    return await handleGenericSubmission(data, webhookType);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error sending data to Zapier:`, error);
    return { 
      success: false, 
      message: 'Failed to submit to Zapier: ' + (error instanceof Error ? error.message : 'Unknown error')
    };
  }
};

// Re-export test function with simplified implementation and more logging
export const testZapierWebhook = async (webhookType: string): Promise<EmailResponse> => {
  try {
    console.log(`[${new Date().toISOString()}] Testing Zapier webhook for type: ${webhookType}`);
    
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
    
    console.log(`[${new Date().toISOString()}] Sending test data to ${webhookType} webhook:`, testData);
    return await handleGenericSubmission(testData, webhookType as WebhookType);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error testing Zapier webhook:`, error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
