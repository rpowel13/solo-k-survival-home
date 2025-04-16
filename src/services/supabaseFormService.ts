
import { supabase } from '@/integrations/supabase/client';

// Email addresses to notify (could be moved to environment variables)
const ADMIN_EMAILS = ['info@survival401k.com'];

// Type for table names to ensure type safety when accessing tables
type TableName = 'contacts' | 'scheduled_consultations' | 'llc_applications' | 
                'first_responder_applications' | 'solo401k_applications' | 'bank_payments';

// Generic function to submit form data to Supabase
export const submitFormToSupabase = async (tableName: TableName, data: any) => {
  try {
    console.log(`Submitting to ${tableName}:`, data);
    console.log("Supabase URL:", supabase.supabaseUrl);
    
    // 1. Submit to Supabase table
    const response = await supabase
      .from(tableName)
      .insert(data)
      .select('id');
    
    if (response.error) {
      console.error(`Error inserting into ${tableName}:`, response.error);
      throw response.error;
    }
    
    const result = response.data && response.data.length > 0 ? { id: response.data[0].id } : null;
    if (!result) throw new Error('No ID returned from insert operation');
    
    console.log(`Successfully inserted into ${tableName} with ID:`, result.id);
    
    // 2. Send email notification
    await sendNewSubmissionEmail(tableName, data, result.id);
    
    return { success: true, id: result.id };
  } catch (error) {
    console.error(`Error submitting to ${tableName}:`, error);
    return { success: false, error };
  }
};

// Function to send email notification
const sendNewSubmissionEmail = async (tableName: TableName, data: any, submissionId: string) => {
  try {
    // Prepare email content based on table type
    let subject = `New ${tableName} submission`;
    let details = '';
    
    // Format email content based on form type
    if (tableName === 'contacts') {
      subject = `New Contact Form Submission from ${data.name}`;
      details = `
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone || 'Not provided'}
        Subject: ${data.subject || 'Not provided'}
        Message: ${data.message}
      `;
    } else if (tableName === 'scheduled_consultations') {
      subject = `New Consultation Scheduled with ${data.name}`;
      details = `
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone}
        Date: ${data.consultation_date}
        Time: ${data.consultation_time}
        Message: ${data.message || 'No additional message'}
      `;
    } else if (tableName === 'llc_applications') {
      subject = `New LLC Application from ${data.first_name} ${data.last_name}`;
      details = `
        Name: ${data.first_name} ${data.last_name}
        Email: ${data.email}
        Phone: ${data.phone}
        Desired LLC Name: ${data.desired_llc_name}
        State: ${data.state}
      `;
    } else if (tableName === 'first_responder_applications') {
      subject = `New First Responder Application from ${data.first_name} ${data.last_name}`;
      details = `
        Name: ${data.first_name} ${data.last_name}
        Email: ${data.email}
        Phone: ${data.phone}
        Occupation: ${data.occupation}
        Department: ${data.department}
        Desired LLC Name: ${data.desired_llc_name}
      `;
    } else if (tableName === 'solo401k_applications') {
      subject = `New Solo 401k Application from ${data.first_name} ${data.last_name}`;
      details = `
        Name: ${data.first_name} ${data.last_name}
        Email: ${data.email}
        Phone: ${data.phone}
        Business Name: ${data.business_name}
        Business Type: ${data.business_type}
      `;
    }
    
    // For development, use the mock function that logs to console
    if (import.meta.env.DEV) {
      console.log('MOCK EMAIL NOTIFICATION:');
      console.log(`Subject: ${subject}`);
      console.log(`To: ${ADMIN_EMAILS.join(', ')}`);
      console.log(`Details: ${details}`);
      return;
    }
    
    // For production, use the Supabase Edge Function to send email
    try {
      console.log('Sending email notification via Supabase Edge Function');
      const { data: emailResult, error } = await supabase.functions.invoke('send-email-notification', {
        body: {
          to: ADMIN_EMAILS,
          subject: subject,
          body: `
            <h2>${subject}</h2>
            <p>Submission ID: ${submissionId}</p>
            <pre>${details}</pre>
            <p>View full details in your Supabase dashboard.</p>
          `,
        },
      });
      
      if (error) {
        console.error('Error invoking send-email-notification function:', error);
        console.log('Email notification error details:', JSON.stringify(error));
        // Don't throw here - we don't want to break form submission if email fails
      } else {
        console.log('Email notification sent successfully:', emailResult);
      }
      
      return emailResult;
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      console.log('Email exception details:', JSON.stringify(emailError));
      // Don't throw here - we don't want to break form submission if email fails
    }
  } catch (error) {
    console.error('Error preparing notification email:', error);
    // Don't throw here - we don't want to break form submission if email fails
  }
};

// Specialized functions for each form type
export const submitContactForm = async (data: any) => {
  console.log("Contact form submission starting with data:", {
    name: data.name,
    email: data.email,
    subject: data.subject || null
  });
  
  // Format data for contacts table
  const formattedData = {
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    subject: data.subject || null,
    message: data.message,
    opt_in: data.consent || false
  };
  
  return submitFormToSupabase('contacts', formattedData);
};

export const submitConsultationForm = async (data: any) => {
  // Format data for scheduled_consultations table
  const formattedData = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    consultation_date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : data.date,
    consultation_time: data.time,
    message: data.message || null
  };
  
  return submitFormToSupabase('scheduled_consultations', formattedData);
};

export const submitLLCApplication = async (data: any) => {
  // Format data for llc_applications table
  const formattedData = {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone: data.phone,
    desired_llc_name: data.desiredLLCName,
    alternative_name1: data.alternativeName1 || null,
    alternative_name2: data.alternativeName2 || null,
    state: data.state,
    member_count: data.memberCount,
    business_purpose: data.businessPurpose,
    additional_info: data.additionalInfo || null,
    agree_to_terms: data.agreeToTerms || false
  };
  
  return submitFormToSupabase('llc_applications', formattedData);
};

export const submitFirstResponderApplication = async (data: any) => {
  // Format data for first_responder_applications table
  const formattedData = {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone: data.phone,
    occupation: data.occupation,
    department: data.department,
    years_of_service: data.yearsOfService,
    desired_llc_name: data.desiredLLCName,
    state: data.state,
    additional_info: data.additionalInfo || null,
    verify_401k_interest: data.verify401kInterest || false,
    agree_to_terms: data.agreeToTerms || false
  };
  
  return submitFormToSupabase('first_responder_applications', formattedData);
};

export const submitSolo401kApplication = async (data: any) => {
  // Format data for solo401k_applications table
  const formattedData = {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone: data.phone,
    ssn: data.ssn,
    business_name: data.businessName,
    business_type: data.businessType,
    annual_income: data.annualIncome,
    trustee1_name: data.trustee1Name,
    trustee2_name: data.trustee2Name || null,
    participant1_name: data.participant1Name,
    participant2_name: data.participant2Name || null,
    existing_retirement: data.existingRetirement || false,
    additional_info: data.additionalInfo || null
  };
  
  return submitFormToSupabase('solo401k_applications', formattedData);
};
