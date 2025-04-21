
import { FormData } from '@/types/formTypes';
import type { 
  SoloFormValues,
  ContactFormValues,
  LLCFormValues,
  FirstResponderFormValues,
  ScheduleFormValues
} from '@/types/formTypes';

export function isSolo401kForm(data: FormData): data is SoloFormValues {
  // More robust check for Solo401k forms
  return 'firstName' in data && 
         'lastName' in data && 
         ('ssn' in data || 'businessName' in data) && 
         !('desiredLLCName' in data) && 
         !('occupation' in data);
}

export function isContactForm(data: FormData): data is ContactFormValues {
  return 'name' in data && 'message' in data && 'subject' in data && !('date' in data);
}

export function isLLCForm(data: FormData): data is LLCFormValues {
  // Updated check to include new required fields for LLC forms
  return 'firstName' in data && 
         'desiredLLCName' in data && 
         'businessPurpose' in data && 
         'ssn' in data &&
         'street' in data &&
         'city' in data &&
         'zipCode' in data &&
         !('occupation' in data);
}

export function isFirstResponderForm(data: FormData): data is FirstResponderFormValues {
  return 'firstName' in data && 'occupation' in data && 'department' in data && 'yearsOfService' in data;
}

export function isScheduleForm(data: FormData): data is ScheduleFormValues {
  return 'name' in data && 'date' in data && 'time' in data;
}
