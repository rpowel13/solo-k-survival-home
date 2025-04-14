
const VCITA_API_TOKEN = 'a164a3828452ec6a557cb1dc9be8d66743b9b9223cfe0ed02f4cc62a810594b6';
const VCITA_BASE_URL = 'https://www.vcita.com/api/v1';

export const submitContactForm = async (formData: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await fetch(`${VCITA_BASE_URL}/contact_requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VCITA_API_TOKEN}`
      },
      body: JSON.stringify({
        contact: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || ''
        },
        subject: formData.subject,
        message: formData.message,
        source: window.location.href
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('VCita Error Response:', errorData);
      throw new Error('Failed to submit contact form');
    }

    const result = await response.json();
    return result;
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
}) => {
  try {
    const response = await fetch(`${VCITA_BASE_URL}/scheduling/izk040b42jnjcf3c/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VCITA_API_TOKEN}`
      },
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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('VCita Error Response:', errorData);
      throw new Error('Failed to schedule consultation');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('VCita Scheduling Submission Error:', error);
    throw error;
  }
};
