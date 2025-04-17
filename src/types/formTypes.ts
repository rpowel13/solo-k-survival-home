
import { z } from 'zod';
import { SoloFormValues } from '@/components/solo401k/FormSchema';
import { ContactFormValues } from '@/components/contact/ContactFormSchema';
import { ScheduleFormValues } from '@/components/consultation/types';

// Simplified schema definitions for LLC forms
export const llcFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  desiredLLCName: z.string(),
  alternativeName1: z.string().optional(),
  alternativeName2: z.string().optional(),
  state: z.string(),
  memberCount: z.string(),
  businessPurpose: z.string(),
  additionalInfo: z.string().optional(),
  agreeToTerms: z.boolean(),
});

// Schema for First Responder forms
export const firstResponderFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  occupation: z.string(),
  department: z.string(),
  yearsOfService: z.string(),
  desiredLLCName: z.string(),
  state: z.string(),
  additionalInfo: z.string().optional(),
  verify401kInterest: z.boolean(),
  agreeToTerms: z.boolean(),
});

export type LLCFormValues = z.infer<typeof llcFormSchema>;
export type FirstResponderFormValues = z.infer<typeof firstResponderFormSchema>;

export type FormData = 
  | SoloFormValues 
  | ContactFormValues 
  | LLCFormValues 
  | FirstResponderFormValues 
  | ScheduleFormValues;

export interface EmailResponse {
  success: boolean;
  message: string;
}
