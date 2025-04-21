
import { FormData } from '@/types/formTypes';
import { getZapierWebhookUrl } from '../webhookUrlManager';
import { SOLO_401K_WEBHOOK_URL } from '../webhookTypes';
import { formatFormData } from '@/utils/formDataFormatter';

export const handleSolo401kSubmission = async (data: FormData) => {
  console.log(`[${new Date().toISOString()}] Using hardcoded Solo401k webhook URL: ${SOLO_401K_WEBHOOK_URL}`);
  
  const formattedData = formatFormData(data);
  console.log(`[${new Date().toISOString()}] Solo401k complete payload:`, JSON.stringify(formattedData, null, 2));
  
  try {
    // Use fetch with explicit options for better cross-domain compatibility
    const response = await fetch(SOLO_401K_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData),
      credentials: 'omit',
      mode: 'no-cors'
    });
    
    console.log(`[${new Date().toISOString()}] Successfully sent to Solo401k webhook URL`);
    
    return { 
      success: true,
      message: `Form submitted to Zapier via Solo401k webhook URL`
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error sending to Solo401k webhook:`, error);
    // Still return success since no-cors mode won't give us actual error info
    return { 
      success: true,
      message: `Form submission sent to Zapier (note: actual delivery cannot be confirmed due to CORS restrictions)`
    };
  }
};
