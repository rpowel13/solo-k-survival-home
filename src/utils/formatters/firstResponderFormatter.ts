
import { FormData, FirstResponderFormValues } from '@/types/formTypes';
import { formatBasicInfo } from './commonFormatters';

export const formatFirstResponderData = (data: FirstResponderFormValues & any) => {
  const basicInfo = formatBasicInfo(data);

  return {
    formType: 'First_Responder_401k',
    // Personal Info
    fullName: `${data.firstName} ${data.lastName}`,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    ssn: data.ssn,
    
    // Address Info
    street: data.street,
    city: data.city,
    state: data.state,
    zipCode: data.zipCode,
    
    // First Responder Specific
    occupation: data.occupation,
    department: data.department,
    yearsOfService: data.yearsOfService,
    
    // Business Info
    businessName: data.businessName,
    sponsorEin: data.sponsorEin,
    businessType: data.businessType,
    annualIncome: data.annualIncome,
    
    // Plan Info
    trustee1Name: data.trustee1Name,
    trustee2Name: data.trustee2Name || '',
    participant1Name: data.participant1Name,
    participant2Name: data.participant2Name || '',
    
    // Additional Info
    additionalInfo: data.additionalInfo || 'N/A',
    
    // Flags and Verification
    verify401kInterest: data.verify401kInterest ? 'Yes' : 'No',
    agreeToTerms: data.agreeToTerms ? 'Yes' : 'No',
    
    ...basicInfo,
    
    // Add submission metadata
    submittedAt: new Date().toISOString(),
    formSource: 'First Responder 401k Application'
  };
};

