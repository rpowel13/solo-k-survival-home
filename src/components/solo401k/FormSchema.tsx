
import * as z from 'zod';

// Define enums for select fields to improve type safety
export const BusinessTypes = {
  SOLE_PROPRIETORSHIP: 'sole_proprietorship',
  LLC: 'llc',
  PARTNERSHIP: 'partnership',
  S_CORPORATION: 's_corporation',
  C_CORPORATION: 'c_corporation',
} as const;

export const IncomeRanges = {
  UNDER_50K: 'under_50k',
  RANGE_50K_100K: '50k_100k',
  RANGE_100K_250K: '100k_250k',
  RANGE_250K_500K: '250k_500k',
  OVER_500K: 'over_500k',
} as const;

// Create type-safe schema with improved validations
export const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().regex(/^\d{10}$/, { message: 'Phone number must be 10 digits' }),
  ssn: z.string().regex(/^\d{9}$/, { message: 'SSN must be 9 digits without dashes' }),
  
  // Removed dateOfBirth field as it's no longer used

  // Address information
  street: z.string().min(5, { message: 'Street address must be at least 5 characters' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters' }),
  state: z.string().length(2, { message: 'Please enter a valid 2-letter state code' }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: 'Please enter a valid ZIP code' }),

  // Business information
  businessName: z.string().min(2, { message: 'Business name must be at least 2 characters' }),
  // Make sponsorEin optional and only validate regex if not blank
  sponsorEin: z
    .string()
    .optional()
    .refine(
      val => !val || val === "" || /^\d{9}$/.test(val),
      { message: 'EIN must be 9 digits (numbers only)' }
    ),
  businessType: z.nativeEnum(BusinessTypes, { 
    errorMap: () => ({ message: 'Please select a valid business type' })
  }),
  annualIncome: z.nativeEnum(IncomeRanges, {
    errorMap: () => ({ message: 'Please select a valid income range' })
  }),

  // Plan participants
  trustee1Name: z.string().min(2, { message: 'Trustee name must be at least 2 characters' }),
  trustee2Name: z.string().optional(),
  participant1Name: z.string().min(2, { message: 'Participant name must be at least 2 characters' }),
  participant2Name: z.string().optional(),

  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

// Export TypeScript type for form values
export type SoloFormValues = z.infer<typeof formSchema>;

// Export business types and income ranges for reuse
export type BusinessType = keyof typeof BusinessTypes;
export type IncomeRange = keyof typeof IncomeRanges;

// Export the values for use in select fields
export const businessTypeOptions = Object.entries(BusinessTypes).map(([key, value]) => ({
  label: key.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' '),
  value: value,
}));

export const incomeRangeOptions = Object.entries(IncomeRanges).map(([key, value]) => ({
  label: key.split('_').map(word => 
    word === 'K' ? 'K' : word.charAt(0) + word.slice(1).toLowerCase()
  ).join(' ').replace('Range ', ''),
  value: value,
}));
