# Integrating Supabase Tables with Application Forms

This guide explains how to connect the application forms to the newly created Supabase tables.

## Overview

We've created four new Supabase tables:
1. `contacts` - For contact form submissions
2. `llc_applications` - For LLC formation applications
3. `first_responder_applications` - For first responder package applications
4. `scheduled_consultations` - For consultation bookings

Each form in the application should be modified to:
1. Continue using Zapier as the primary submission method (for email notifications)
2. Add a secondary submission to Supabase for data storage and retrieval
3. Send email notifications when new data is added to tables

## Integration Steps

### 1. Create a Supabase Service for Form Submissions

First, we'll need to create a service file to handle Supabase form submissions:

```typescript
// src/services/supabaseFormService.ts

import { supabase } from '@/lib/supabase';

// Email addresses to notify
const ADMIN_EMAILS = ['info@survival401k.com'];

// Generic function to submit form data to Supabase
export const submitFormToSupabase = async (tableName: string, data: any) => {
  try {
    // Submit to Supabase
    const { data: result, error } = await supabase
      .from(tableName)
      .insert(data)
      .select('id')
      .single();
    
    if (error) throw error;
    
    // Send email notification
    await sendNewSubmissionEmail(tableName, data, result.id);
    
    return { success: true, id: result.id };
  } catch (error) {
    console.error(`Error submitting to ${tableName}:`, error);
    return { success: false, error };
  }
};

// Function to send email notification
const sendNewSubmissionEmail = async (tableName: string, data: any, submissionId: string) => {
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

    // For production, use the Supabase Edge Function to send email
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
    
    if (error) throw error;
    
    return emailResult;
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
};

// Specialized functions for each form type
export const submitContactForm = async (data: any) => {
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

// Specialized functions for each form type
export const submitContactForm = async (data: any) => {
  return submitFormToSupabase('contacts', data);
};

export const submitConsultationForm = async (data: any) => {
  return submitFormToSupabase('scheduled_consultations', data);
};

export const submitSolo401kApplication = async (data: any) => {
  return submitFormToSupabase('solo401k_applications', data);
};

export const submitLLCApplication = async (data: any) => {
  return submitFormToSupabase('llc_applications', data);
};

export const submitFirstResponderApplication = async (data: any) => {
  return submitFormToSupabase('first_responder_applications', data);
};
```

### 2. Modify Form Submission Handlers

For each form submission handler, add the Supabase submission as a backup or parallel submission.

Example for the Contact Form:

```typescript
// In the contact form submission handler
import { submitContactForm } from '@/services/supabaseFormService';

const onSubmit = async (data) => {
  setIsSubmitting(true);
  
  try {
    // Primary submission via Zapier for email notifications
    const zapierResult = await triggerZapierWebhook(data);
    
    // Secondary submission to Supabase for data storage
    const supabaseResult = await submitContactForm(data);
    
    if (zapierResult.success || supabaseResult.success) {
      // Success message - at least one method worked
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you shortly.",
      });
      
      resetForm();
    } else {
      throw new Error("Failed to submit form");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    toast({
      title: "Submission Error",
      description: "There was a problem sending your message. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};
```

### 3. Setup Email Notification Edge Function

To send email notifications when new data is added, create a new Edge Function in Supabase:

1. Navigate to your Supabase project dashboard
2. Go to Edge Functions in the sidebar
3. Click "Create a new function"
4. Name it "send-email-notification"
5. Paste the following code:

```typescript
// Follow this Deno pattern for Edge Functions
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

// Get environment variables
const SMTP_HOST = Deno.env.get("SMTP_HOST") || "";
const SMTP_PORT = Number(Deno.env.get("SMTP_PORT")) || 587;
const SMTP_USERNAME = Deno.env.get("SMTP_USERNAME") || "";
const SMTP_PASSWORD = Deno.env.get("SMTP_PASSWORD") || "";
const SENDER_EMAIL = Deno.env.get("SENDER_EMAIL") || "noreply@survival401k.com";

serve(async (req) => {
  try {
    // Parse request
    const { to, subject, body } = await req.json();
    
    if (!to || !Array.isArray(to) || !subject || !body) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Configure SMTP client
    const client = new SmtpClient();
    await client.connectTLS({
      hostname: SMTP_HOST,
      port: SMTP_PORT,
      username: SMTP_USERNAME,
      password: SMTP_PASSWORD,
    });

    // Send email
    await client.send({
      from: SENDER_EMAIL,
      to: to,
      subject: subject,
      content: body,
      html: body,
    });

    await client.close();

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    
    return new Response(
      JSON.stringify({ error: "Failed to send email", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
```

6. Add the following secrets to your Supabase project in the Dashboard under Settings > API:

```
SMTP_HOST = your_smtp_host (e.g., smtp.gmail.com)
SMTP_PORT = your_smtp_port (e.g., 587)
SMTP_USERNAME = your_smtp_username
SMTP_PASSWORD = your_smtp_password
SENDER_EMAIL = noreply@survival401k.com (or your preferred sender)
```

7. Deploy the function

### 4. Implementation Priority

1. First implement the `supabaseFormService.ts` file
2. Modify each form submission handler one at a time:
   - Contact Form
   - Consultation Scheduling Form
   - Solo 401k Application Form
   - LLC Application Form
   - First Responder Application Form
3. Test each form to ensure data is being stored correctly and email notifications are sent

### 5. Benefits of This Approach

- **Redundancy**: If Zapier fails, you still have the data in Supabase
- **Data Access**: Easy to build admin dashboards and reporting tools
- **Email Notifications**: Automatic email alerts when new data is added to tables
- **Cost Efficiency**: Reducing dependency on third-party tools for data storage
- **Security**: Data is stored securely with proper access controls
