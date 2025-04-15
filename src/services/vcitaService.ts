
const VCITA_API_TOKEN = 'a164a3828452ec6a557cb1dc9be8d66743b9b9223cfe0ed02f4cc62a810594b6';
const VCITA_BASE_URL = 'https://www.vcita.com/api/v1';
const VCITA_BUSINESS_ID = 'izk040b42jnjcf3c';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
}

interface VCitaResponse {
  success: boolean;
  message?: string;
}

export const submitContactForm = async (data: ContactFormData): Promise<VCitaResponse> => {
  try {
    console.log('Submitting contact form to vCita:', data);
    
    const response = await fetch(`${VCITA_BASE_URL}/contact_requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VCITA_API_TOKEN}`
      },
      body: JSON.stringify({
        contact_request: {
          business_id: VCITA_BUSINESS_ID,
          client: {
            name: data.name,
            email: data.email,
            phone: data.phone
          },
          subject: data.subject,
          message: data.message,
          consent: data.consent,
          source: window.location.href
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('vCita API Error:', response.status, errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const responseData = await response.json().catch(() => null);
    console.log('vCita API Response:', responseData);
    
    return { success: true };
  } catch (error) {
    console.error('vCita Contact Form Submission Error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

export const scheduleConsultation = async (formData: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message?: string;
}): Promise<VCitaResponse> => {
  try {
    console.log('Scheduling consultation with vCita:', formData);
    
    const response = await fetch(`${VCITA_BASE_URL}/scheduling/izk040b42jnjcf3c/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VCITA_API_TOKEN}`
      },
      body: JSON.stringify({
        scheduling_request: {
          client: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone
          },
          appointment: {
            requested_datetime: `${formData.date} ${formData.time}`,
            notes: formData.message || 'No additional notes'
          },
          source: window.location.href
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('vCita Scheduling API Error:', response.status, errorData);
      throw new Error(`API error: ${response.status}`);
    }
    
    const responseData = await response.json().catch(() => null);
    console.log('vCita Scheduling API Response:', responseData);
    
    return { success: true };
  } catch (error) {
    console.error('vCita Scheduling Submission Error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};
