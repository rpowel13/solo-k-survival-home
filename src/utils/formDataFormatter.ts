
import { FormData } from '@/types/formTypes';
import { 
  isSolo401kForm, 
  isContactForm, 
  isLLCForm, 
  isFirstResponderForm,
  isScheduleForm 
} from './formTypeUtils';
import { formatSolo401kData } from './formatters/solo401kFormatter';
import { formatLLCData } from './formatters/llcFormatter';
import { formatContactData } from './formatters/contactFormatter';
import { formatScheduleData } from './formatters/scheduleFormatter';
import { formatFirstResponderData } from './formatters/firstResponderFormatter';
import { formatBasicInfo } from './formatters/commonFormatters';

export function formatFormData(data: FormData) {
  console.log(`[${new Date().toISOString()}] Formatting form data, detected type: ${('formType' in data ? data.formType : 'Unknown')}`);
  
  if (isSolo401kForm(data)) {
    console.log(`[${new Date().toISOString()}] Formatting as Solo401k form data`);
    return formatSolo401kData(data);
  }
  
  if (isContactForm(data)) {
    console.log(`[${new Date().toISOString()}] Formatting as Contact form data`);
    return formatContactData(data);
  }
  
  if (isLLCForm(data)) {
    console.log(`[${new Date().toISOString()}] Formatting as LLC form data`);
    return formatLLCData(data);
  }
  
  if (isFirstResponderForm(data)) {
    console.log(`[${new Date().toISOString()}] Formatting as First Responder form data`);
    return formatFirstResponderData(data);
  }
  
  if (isScheduleForm(data)) {
    console.log(`[${new Date().toISOString()}] Formatting as Schedule form data`);
    return formatScheduleData(data);
  }
  
  // Fallback case for unknown form types
  console.warn(`[${new Date().toISOString()}] Unknown form type, using generic format:`, data);
  return {
    ...data,
    ...formatBasicInfo(data)
  };
}
