
import { FormData } from '@/types/formTypes';
import { getZapierWebhookUrl } from '../webhookUrlManager';
import { formatFormData } from '@/utils/formDataFormatter';

export const handleLLCSubmission = async (data: FormData) => {
  const llcWebhookUrl = getZapierWebhookUrl('llc');
  console.log(`[${new Date().toISOString()}] Using LLC webhook URL: ${llcWebhookUrl}`);
  
  const formattedData = formatFormData(data);
  console.log(`[${new Date().toISOString()}] LLC complete payload:`, JSON.stringify(formattedData, null, 2));
  
  await fetch(llcWebhookUrl, {
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
};
