
import { FormData } from '@/types/formTypes';
import { getZapierWebhookUrl } from '../webhookUrlManager';
import { formatFormData } from '@/utils/formDataFormatter';

export const handleLLCSubmission = async (data: FormData) => {
  try {
    const llcWebhookUrl = getZapierWebhookUrl('llc');
    console.log(`[${new Date().toISOString()}] Using LLC webhook URL: ${llcWebhookUrl}`);
    
    const formattedData = formatFormData(data);
    
    // Check if bank payment data exists and add it to the payload
    if ('bankPayment' in data && data.bankPayment) {
      console.log(`[${new Date().toISOString()}] Including bank payment information in LLC submission`);
      // Use type assertion to inform TypeScript that we're adding a new property
      (formattedData as any).bankPayment = {
        accountName: data.bankPayment.accountName,
        accountType: data.bankPayment.accountType,
        routingNumber: data.bankPayment.routingNumber,
        accountNumber: data.bankPayment.accountNumber,
        amount: 795, // LLC formation fee
        status: 'pending'
      };
    }
    
    console.log(`[${new Date().toISOString()}] LLC complete payload:`, JSON.stringify(formattedData, null, 2));
    
    const response = await fetch(llcWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData),
      credentials: 'omit',
      mode: 'no-cors'
    });
    
    console.log(`[${new Date().toISOString()}] Successfully sent to LLC webhook URL`);
    
    return { 
      success: true,
      message: `Form submitted to Zapier via LLC webhook URL`
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error in LLC submission:`, error);
    return {
      success: false,
      message: `Error submitting form: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};
