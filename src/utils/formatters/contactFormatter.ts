
import { FormData, ContactFormValues } from '@/types/formTypes';
import { formatBasicInfo } from './commonFormatters';

export const formatContactData = (data: ContactFormValues) => {
  const basicInfo = formatBasicInfo(data);

  return {
    formType: 'Contact',
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    subject: data.subject || '',
    message: data.message || '',
    consent: data.consent ? 'Yes' : 'No',
    ...basicInfo,
    leadType: 'Website Contact Form',
    priority: 'Medium',
    nextAction: 'Follow-up Call'
  };
};
