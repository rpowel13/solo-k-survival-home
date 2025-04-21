
import { FormData, FirstResponderFormValues } from '@/types/formTypes';
import { formatBasicInfo } from './commonFormatters';

export const formatFirstResponderData = (data: FirstResponderFormValues) => {
  const basicInfo = formatBasicInfo(data);

  return {
    formType: 'First_Responder_Package',
    fullName: `${data.firstName} ${data.lastName}`,
    email: data.email,
    phone: data.phone,
    occupation: data.occupation,
    department: data.department,
    yearsOfService: data.yearsOfService,
    desiredLLCName: data.desiredLLCName,
    state: data.state,
    verify401kInterest: data.verify401kInterest ? 'Yes' : 'No',
    additionalInfo: data.additionalInfo || 'N/A',
    ...basicInfo
  };
};
