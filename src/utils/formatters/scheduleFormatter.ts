
import { FormData, ScheduleFormValues } from '@/types/formTypes';
import { formatBasicInfo } from './commonFormatters';

export const formatScheduleData = (data: ScheduleFormValues) => {
  const basicInfo = formatBasicInfo(data);
  const formattedDate = data.date instanceof Date 
    ? data.date.toLocaleDateString() 
    : typeof data.date === 'string' ? data.date : 'Invalid date';

  return {
    formType: 'Schedule_Consultation',
    name: data.name,
    email: data.email,
    phone: data.phone,
    requestedDate: formattedDate,
    requestedTime: data.time,
    message: data.message || 'N/A',
    ...basicInfo,
    leadSource: 'Consultation Scheduler',
    leadType: 'Hot Lead - Consultation Request',
    priority: 'High',
    nextAction: 'Schedule Follow-up Call',
    nextActionDue: data.date instanceof Date 
      ? data.date.toISOString() 
      : typeof data.date === 'string' ? new Date(data.date).toISOString() : new Date().toISOString()
  };
};
