
import { FormData } from '@/types/formTypes';
import { getZapierWebhookUrl } from '../webhookUrlManager';
import { SOLO_401K_WEBHOOK_URL } from '../webhookTypes';
import { formatFormData } from '@/utils/formDataFormatter';

export const handleSolo401kSubmission = async (data: FormData) => {
  console.log(`[${new Date().toISOString()}] Using hardcoded Solo401k webhook URL: ${SOLO_401K_WEBHOOK_URL}`);
  
  const formattedData = formatFormData(data);
  console.log(`[${new Date().toISOString()}] Solo401k complete payload:`, JSON.stringify(formattedData, null, 2));
  
  await fetch(SOLO_401K_WEBHOOK_URL, {
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
};
