
import * as z from 'zod';

export const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  street: z.string().min(2, { message: 'Street address is required' }),
  city: z.string().min(2, { message: 'City is required' }),
  state: z.string().min(1, { message: 'Please select a state' }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Please enter a valid ZIP code' }),
  desiredLLCName: z.string().min(2, { message: 'LLC name is required' }),
  alternativeName1: z.string().optional(),
  alternativeName2: z.string().optional(),
  memberCount: z.string().min(1, { message: 'Please select number of members' }),
  businessPurpose: z.string().min(10, { message: 'Business purpose must be at least 10 characters' }),
  additionalInfo: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

export type LLCFormValues = z.infer<typeof formSchema>;

