
import { supabase } from '@/integrations/supabase/client';
import { ContactFormValues } from '@/components/contact/ContactFormSchema';
import { ScheduleFormValues } from '@/components/consultation/types';

/**
 * Submit a contact form to Supabase
 */
export const submitContactForm = async (data: ContactFormValues): Promise<{success: boolean, message: string, data?: any}> => {
  try {
    console.log(`[${new Date().toISOString()}] Submitting contact form to Supabase:`, data);
    
    const formattedData = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject || null,
      message: data.message,
      opt_in: data.consent || false
    };
    
    const { data: result, error } = await supabase
      .from('contacts')
      .insert(formattedData)
      .select();
    
    if (error) {
      console.error(`[${new Date().toISOString()}] Supabase contact form submission error:`, error);
      return {
        success: false,
        message: error.message || 'Error submitting contact form'
      };
    }
    
    console.log(`[${new Date().toISOString()}] Supabase contact form submission successful:`, result);
    return {
      success: true,
      message: 'Contact form submitted successfully',
      data: result
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Exception in contact form submission:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred during submission'
    };
  }
};

/**
 * Submit a consultation form to Supabase
 */
export const submitConsultationForm = async (data: ScheduleFormValues): Promise<{success: boolean, message: string, data?: any}> => {
  try {
    console.log(`[${new Date().toISOString()}] Submitting consultation form to Supabase:`, data);
    
    const formattedData = {
      name: data.name,
      email: data.email, 
      phone: data.phone || null,
      message: data.message || null,
      preferred_date: data.date instanceof Date ? data.date.toISOString() : data.date,
      preferred_time: data.time || null,
      form_type: 'consultation'
    };
    
    const { data: result, error } = await supabase
      .from('consultation_requests')
      .insert(formattedData)
      .select();
    
    if (error) {
      console.error(`[${new Date().toISOString()}] Supabase consultation form submission error:`, error);
      return {
        success: false,
        message: error.message || 'Error submitting consultation form'
      };
    }
    
    console.log(`[${new Date().toISOString()}] Supabase consultation form submission successful:`, result);
    return {
      success: true,
      message: 'Consultation form submitted successfully',
      data: result
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Exception in consultation form submission:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred during submission'
    };
  }
};
