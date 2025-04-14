
const VCITA_API_TOKEN = 'a164a3828452ec6a557cb1dc9be8d66743b9b9223cfe0ed02f4cc62a810594b6';
const VCITA_BASE_URL = 'https://www.vcita.com/api/v1';

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
}

export const submitContactForm = async (data: ContactFormData): Promise<VCitaResponse> => {
  try {
    const response = await fetch(`${VCITA_BASE_URL}/contact_requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VCITA_API_TOKEN}`
      },
      mode: 'no-cors',
      body: JSON.stringify({
        contact: {
          name: data.name,
          email: data.email,
          phone: data.phone
        },
        subject: data.subject,
        message: data.message,
        consent: data.consent,
        source: window.location.href
      })
    });

    return { success: true };
  } catch (error) {
    console.error('VCita Contact Form Submission Error:', error);
    throw error;
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
    const response = await fetch(`${VCITA_BASE_URL}/scheduling/izk040b42jnjcf3c/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VCITA_API_TOKEN}`
      },
      mode: 'no-cors',
      body: JSON.stringify({
        contact: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        appointment: {
          requested_datetime: `${formData.date} ${formData.time}`,
          notes: formData.message || 'No additional notes'
        },
        source: window.location.href
      })
    });

    return { success: true };
  } catch (error) {
    console.error('VCita Scheduling Submission Error:', error);
    throw error;
  }
};
