
import * as z from 'zod';

export const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  ssn: z.string().min(9, { message: 'Please enter a valid Social Security Number' }),
  dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
  street: z.string().min(1, { message: 'Street address is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  zipCode: z.string().min(5, { message: 'Please enter a valid ZIP code' }),
  businessName: z.string().min(2, { message: 'Business name is required' }),
  businessType: z.string().min(1, { message: 'Please select a business type' }),
  annualIncome: z.string().min(1, { message: 'Annual income information is required' }),
  trustee1Name: z.string().min(2, { message: 'Trustee name is required' }),
  trustee2Name: z.string().optional(),
  participant1Name: z.string().min(2, { message: 'Participant name is required' }),
  participant2Name: z.string().optional(),
  existingRetirement: z.boolean().optional(),
  additionalInfo: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

export type SoloFormValues = z.infer<typeof formSchema>;
