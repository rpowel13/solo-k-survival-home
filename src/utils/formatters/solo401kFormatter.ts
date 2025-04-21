
import { FormData, SoloFormValues } from '@/types/formTypes';
import { formatBasicInfo, formatAddress } from './commonFormatters';

export const formatSolo401kData = (data: SoloFormValues) => {
  const basicInfo = formatBasicInfo(data);
  const addressInfo = formatAddress(data);

  return {
    formType: 'Solo401k',
    firstName: data.firstName,
    lastName: data.lastName,
    fullName: `${data.firstName} ${data.lastName}`,
    email: data.email,
    phone: data.phone,
    ssn: data.ssn,
    ...addressInfo,
    businessName: data.businessName,
    businessType: data.businessType,
    annualIncome: data.annualIncome,
    trustee1Name: data.trustee1Name,
    trustee2Name: data.trustee2Name || '',
    participant1Name: data.participant1Name,
    participant2Name: data.participant2Name || '',
    existingRetirement: 'existingRetirement' in data ? (data.existingRetirement ? 'Yes' : 'No') : 'No',
    additionalInfo: data.additionalInfo || 'N/A',
    ...basicInfo
  };
};
