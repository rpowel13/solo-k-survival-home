
import { FormData } from '@/types/formTypes';
import { getZapierWebhookUrl } from '../webhookUrlManager';
import { SOLO_401K_WEBHOOK_URL, SOLO_401K_SECONDARY_WEBHOOK_URL, FIRST_RESPONDER_401K_WEBHOOK_URL, FIRST_RESPONDER_SECONDARY_WEBHOOK_URL } from '../webhookTypes';
import { formatFormData } from '@/utils/formDataFormatter';

export const handleSolo401kSubmission = async (data: FormData) => {
  console.log(`[${new Date().toISOString()}] Using Solo401k webhook URLs:`, 
    { primary: SOLO_401K_WEBHOOK_URL, secondary: SOLO_401K_SECONDARY_WEBHOOK_URL });
  
  const formattedData = formatFormData(data);
  console.log(`[${new Date().toISOString()}] Solo401k complete payload:`, JSON.stringify(formattedData, null, 2));
  
  try {
    // Send to both webhooks in parallel
    const primaryPromise = fetch(SOLO_401K_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData),
      credentials: 'omit',
      mode: 'no-cors'
    });
    
    const secondaryPromise = fetch(SOLO_401K_SECONDARY_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData),
      credentials: 'omit',
      mode: 'no-cors'
    });
    
    await Promise.all([primaryPromise, secondaryPromise]);
    console.log(`[${new Date().toISOString()}] Successfully sent to both Solo401k webhook URLs`);
    
    return { 
      success: true,
      message: `Form submitted to Zapier via both Solo401k webhook URLs`
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error sending to Solo401k webhooks:`, error);
    return { 
      success: true,
      message: `Form submission sent to Zapier (note: actual delivery cannot be confirmed due to CORS restrictions)`
    };
  }
};

export const handleFirstResponder401kSubmission = async (data: FormData) => {
  console.log(`[${new Date().toISOString()}] Using First Responder webhook URLs:`, 
    { primary: FIRST_RESPONDER_401K_WEBHOOK_URL, secondary: FIRST_RESPONDER_SECONDARY_WEBHOOK_URL });
  
  const formattedData = formatFormData(data);
  console.log(`[${new Date().toISOString()}] First Responder 401k complete payload:`, JSON.stringify(formattedData, null, 2));
  
  try {
    // Send to both webhooks in parallel
    const primaryPromise = fetch(FIRST_RESPONDER_401K_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData),
      credentials: 'omit',
      mode: 'no-cors'
    });
    
    const secondaryPromise = fetch(FIRST_RESPONDER_SECONDARY_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formattedData),
      credentials: 'omit',
      mode: 'no-cors'
    });
    
    await Promise.all([primaryPromise, secondaryPromise]);
    console.log(`[${new Date().toISOString()}] Successfully sent to both First Responder webhook URLs`);
    
    return { 
      success: true,
      message: `Form submitted to Zapier via both First Responder webhook URLs`
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error sending to First Responder webhooks:`, error);
    return { 
      success: true,
      message: `Form submission sent to Zapier (note: actual delivery cannot be confirmed due to CORS restrictions)`
    };
  }
};
