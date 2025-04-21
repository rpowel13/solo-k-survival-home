import { supabase } from '@/integrations/supabase/client';
import { SoloFormValues } from '@/components/solo401k/FormSchema';
import { ScheduleFormValues } from '@/components/consultation/types';
import { ContactFormValues } from '@/components/contact/ContactFormSchema';

/**
 * Submit a Solo 401k application to Supabase
 */
export const submitSolo401kApplication = async (data: any): Promise<{success: boolean, data?: any, error?: any}> => {
  try {
    console.log(`[${new Date().toISOString()}] Submitting Solo 401k application to Supabase:`, data);
    
    const { 
      firstName, lastName, email, phone, ssn, dateOfBirth,
      street, city, state, zipCode, businessName, sponsorEin,
      businessType, annualIncome, trustee1Name, trustee2Name,
      participant1Name, participant2Name, existingRetirement,
      additionalInfo, agreeToTerms } = data;

    const { data: insertedData, error } = await supabase
      .from('solo401k_applications')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        ssn,
        date_of_birth: dateOfBirth,
        street,
        city,
        state,
        zip_code: zipCode,
        business_name: businessName,
        sponsor_ein: sponsorEin,
        business_type: businessType,
        annual_income: annualIncome,
        trustee1_name: trustee1Name,
        trustee2_name: trustee2Name,
        participant1_name: participant1Name,
        participant2_name: participant2Name,
        existing_retirement: existingRetirement === true,
        additional_info: additionalInfo || '',
        agree_to_terms: agreeToTerms,
        application_date: new Date().toISOString()
      })
      .select();
    
    if (error) {
      console.error(`[${new Date().toISOString()}] Error submitting Solo 401k application:`, error);
      return { success: false, error };
    }
    
    console.log(`[${new Date().toISOString()}] Solo 401k application submitted successfully:`, insertedData);
    return { success: true, data: insertedData };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Unexpected error submitting Solo 401k application:`, error);
    return { success: false, error };
  }
};

/**
 * Submit a consultation form to Supabase
 */
export const submitConsultationForm = async (data: ScheduleFormValues): Promise<{success: boolean, data?: any, error?: any}> => {
  try {
    console.log(`[${new Date().toISOString()}] Submitting consultation form to Supabase:`, data);
    
    // Convert date to proper format for the database
    const formattedDate = data.date instanceof Date ? data.date.toISOString().split('T')[0] : data.date;
    
    const { data: insertedData, error } = await supabase
      .from('scheduled_consultations')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        consultation_date: formattedDate,
        consultation_time: data.time || '',
        message: data.message || '',
        status: 'new',
        created_at: new Date().toISOString()
      })
      .select();
    
    if (error) {
      console.error(`[${new Date().toISOString()}] Error submitting consultation form:`, error);
      return {
        success: false,
        error
      };
    }
    
    console.log(`[${new Date().toISOString()}] Consultation form submitted successfully:`, insertedData);
    return {
      success: true,
      data: insertedData
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Unexpected error submitting consultation form:`, error);
    return {
      success: false,
      error
    };
  }
};

/**
 * Submit a contact form to Supabase
 */
export const submitContactForm = async (data: ContactFormValues): Promise<{success: boolean, data?: any, error?: any}> => {
  try {
    console.log(`[${new Date().toISOString()}] Submitting contact form to Supabase:`, data);
    
    const { data: insertedData, error } = await supabase
      .from('contacts')
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        subject: data.subject || '',
        message: data.message,
        opt_in: data.consent || false,
        created_at: new Date().toISOString()
      })
      .select();
    
    if (error) {
      console.error(`[${new Date().toISOString()}] Error submitting contact form:`, error);
      return {
        success: false,
        error
      };
    }
    
    console.log(`[${new Date().toISOString()}] Contact form submitted successfully:`, insertedData);
    return {
      success: true,
      data: insertedData
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Unexpected error submitting contact form:`, error);
    return {
      success: false,
      error
    };
  }
};
