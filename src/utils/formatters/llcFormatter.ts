
import { FormData, LLCFormValues } from '@/types/formTypes';
import { formatBasicInfo, formatAddress } from './commonFormatters';

export const formatLLCData = (data: LLCFormValues) => {
  const basicInfo = formatBasicInfo(data);
  const addressInfo = formatAddress(data);

  return {
    formType: 'LLC_Formation',
    firstName: data.firstName,
    lastName: data.lastName,
    fullName: `${data.firstName} ${data.lastName}`,
    email: data.email,
    phone: data.phone,
    ssn: data.ssn,
    ...addressInfo,
    desiredLLCName: data.desiredLLCName,
    alternativeName1: data.alternativeName1 || 'None provided',
    alternativeName2: data.alternativeName2 || 'None provided',
    memberCount: data.memberCount,
    businessPurpose: data.businessPurpose,
    managementType: 'managementType' in data ? data.managementType : 'Not specified',
    member1Name: data.member1Name,
    member1Title: data.member1Title,
    member2Name: data.member2Name || 'None provided',
    member2Title: data.member2Title || 'None provided',
    registeredAgentName: data.registeredAgentName,
    registeredAgentAddress: {
      street: data.registeredAgentStreet,
      city: data.registeredAgentCity,
      state: data.registeredAgentState,
      zipCode: data.registeredAgentZip
    },
    additionalInfo: data.additionalInfo || 'N/A',
    agreeToTerms: data.agreeToTerms ? 'Yes' : 'No',
    ...basicInfo,
    leadType: 'LLC Formation Application',
    priority: 'High'
  };
};
