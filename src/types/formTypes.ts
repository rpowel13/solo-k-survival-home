
import { z } from 'zod';

// Define explicit schema for Solo 401k forms
export const soloFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  ssn: z.string(),
  businessName: z.string(),
  businessType: z.string(),
  annualIncome: z.string(),
  trustee1Name: z.string(),
  trustee2Name: z.string().optional(),
  participant1Name: z.string(),
  participant2Name: z.string().optional(),
  existingRetirement: z.boolean(),
  additionalInfo: z.string().optional(),
});

// Schema for Contact forms
export const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  subject: z.string(),
  message: z.string(),
  consent: z.boolean(),
});

// Schema for Schedule consultation forms
export const scheduleFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  date: z.union([z.string(), z.date()]),
  time: z.string(),
  message: z.string().optional(),
});

// Updated LLC form schema to include all fields used in the formatter
export const llcFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  ssn: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  desiredLLCName: z.string(),
  alternativeName1: z.string().optional(),
  alternativeName2: z.string().optional(),
  memberCount: z.string(),
  businessPurpose: z.string(),
  additionalInfo: z.string().optional(),
  agreeToTerms: z.boolean(),
  // Add management fields
  managementType: z.enum(['member', 'manager']),
  member1Name: z.string(),
  member1Title: z.string(),
  member2Name: z.string().optional(),
  member2Title: z.string().optional(),
  // Add registered agent fields
  registeredAgentName: z.string(),
  registeredAgentStreet: z.string(),
  registeredAgentCity: z.string(),
  registeredAgentState: z.string(),
  registeredAgentZip: z.string(),
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

// Schema for prequalification contact form
export const prequalificationFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  qualification_status: z.string().optional(),
  formType: z.string().optional(),
});

// Export all form value types
export type SoloFormValues = z.infer<typeof soloFormSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ScheduleFormValues = z.infer<typeof scheduleFormSchema>;
export type LLCFormValues = z.infer<typeof llcFormSchema>;
export type FirstResponderFormValues = z.infer<typeof firstResponderFormSchema>;
export type PrequalificationFormValues = z.infer<typeof prequalificationFormSchema>;

// Add formType to the FormData type
export type FormData = 
  | (SoloFormValues & { formType?: string }) 
  | (ContactFormValues & { formType?: string }) 
  | (LLCFormValues & { formType?: string }) 
  | (FirstResponderFormValues & { formType?: string }) 
  | (ScheduleFormValues & { formType?: string })
  | PrequalificationFormValues
  | Record<string, any>; // Allow additional properties for custom submissions

export interface EmailResponse {
  success: boolean;
  message: string;
}
