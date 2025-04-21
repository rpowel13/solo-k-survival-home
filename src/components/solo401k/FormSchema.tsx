
import * as z from 'zod';

// Main form schema (renamed to formSchema for consistency)
export const formSchema = z.object({
  firstName: z.string()
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(50, { message: 'First name must be at most 50 characters' }),
  lastName: z.string()
    .min(2, { message: 'Last name must be at least 2 characters' })
    .max(50, { message: 'Last name must be at most 50 characters' }),
  email: z.string()
    .email({ message: 'Please enter a valid email address' }),
  phone: z.string()
    .min(10, { message: 'Please enter a valid phone number' }),
  ssn: z.string()
    .min(4, { message: 'SSN is required' })
    .regex(/^(?:\d{3}-\d{2}-\d{4}|\d{9})$/, {
      message: "Please enter a valid SSN (e.g., 123-45-6789 or 123456789)"
    }),
  dateOfBirth: z.string()
    .min(1, { message: 'Date of birth is required' }),
  // Address Information
  street: z.string()
    .min(5, { message: 'Street address is required' }),
  city: z.string()
    .min(2, { message: 'City is required' }),
  state: z.string()
    .min(2, { message: 'State is required' }),
  zipCode: z.string()
    .min(5, { message: 'ZIP code is required' })
    .regex(/^\d{5}(-\d{4})?$/, {
      message: "Please enter a valid ZIP code (e.g., 12345 or 12345-6789)"
    }),
  // Business Information
  businessName: z.string()
    .min(2, { message: 'Business name is required' }),
  sponsorEin: z.string()
    .min(9, { message: 'EIN is required' })
    .regex(/^(?:\d{2}-\d{7}|\d{9})$/, {
      message: "Please enter a valid EIN (e.g., 12-3456789 or 123456789)"
    }),
  businessType: z.string()
    .min(1, { message: 'Business type is required' }),
  annualIncome: z.string()
    .min(1, { message: 'Annual income is required' }),
  // Plan Information
  trustee1Name: z.string()
    .min(2, { message: 'Primary trustee name is required' }),
  trustee2Name: z.string().optional(),
  participant1Name: z.string()
    .min(2, { message: 'Primary participant name is required' }),
  participant2Name: z.string().optional(),
  existingRetirement: z.boolean().default(false),
  additionalInfo: z.string().optional(),
  // Terms
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type SoloFormValues = z.infer<typeof formSchema>;

export const defaultValues: Partial<SoloFormValues> = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  ssn: '',
  dateOfBirth: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  businessName: '',
  sponsorEin: '',
  businessType: '', // default can be set in forms
  annualIncome: '', // default can be set in forms
  trustee1Name: '',
  trustee2Name: '',
  participant1Name: '',
  participant2Name: '',
  existingRetirement: false,
  additionalInfo: '',
  agreeToTerms: false,
};

// Enums for business types and income ranges
export const BusinessTypes = {
  SOLE_PROPRIETORSHIP: 'sole_proprietorship',
  PARTNERSHIP: 'partnership',
  LLC: 'llc',
  C_CORP: 'c_corp',
  S_CORP: 's_corp',
} as const;

export const IncomeRanges = {
  UNDER_50K: 'under_50k',
  FROM_50K_TO_100K: '50k_to_100k',
  FROM_100K_TO_250K: '100k_to_250k',
  FROM_250K_TO_500K: '250k_to_500k',
  OVER_500K: 'over_500k',
} as const;

// Options for selects rendered in UI
export const businessTypeOptions = [
  { value: BusinessTypes.SOLE_PROPRIETORSHIP, label: 'Sole Proprietorship' },
  { value: BusinessTypes.PARTNERSHIP, label: 'Partnership' },
  { value: BusinessTypes.LLC, label: 'LLC' },
  { value: BusinessTypes.C_CORP, label: 'C Corporation' },
  { value: BusinessTypes.S_CORP, label: 'S Corporation' },
];

export const incomeRangeOptions = [
  { value: IncomeRanges.UNDER_50K, label: 'Under $50K' },
  { value: IncomeRanges.FROM_50K_TO_100K, label: '$50K to $100K' },
  { value: IncomeRanges.FROM_100K_TO_250K, label: '$100K to $250K' },
  { value: IncomeRanges.FROM_250K_TO_500K, label: '$250K to $500K' },
  { value: IncomeRanges.OVER_500K, label: 'Over $500K' },
];
