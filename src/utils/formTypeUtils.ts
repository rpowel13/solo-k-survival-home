
import { FormData } from '@/types/formTypes';
import type { 
  SoloFormValues,
  ContactFormValues,
  LLCFormValues,
  FirstResponderFormValues,
  ScheduleFormValues
} from '@/types/formTypes';

export function isSolo401kForm(data: FormData): data is SoloFormValues {
  return 'firstName' in data && 'ssn' in data;
}

export function isContactForm(data: FormData): data is ContactFormValues {
  return 'name' in data && 'message' in data;
}

export function isLLCForm(data: FormData): data is LLCFormValues {
  return 'firstName' in data && 'desiredLLCName' in data && 'businessPurpose' in data;
}

export function isFirstResponderForm(data: FormData): data is FirstResponderFormValues {
  return 'firstName' in data && 'occupation' in data && 'department' in data;
}

export function isScheduleForm(data: FormData): data is ScheduleFormValues {
  return 'name' in data && 'date' in data && 'time' in data;
}
