
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

## Integration Steps

### 1. Create a Supabase Service for Form Submissions

First, we'll need to create a service file to handle Supabase form submissions:

```typescript
// src/services/supabaseFormService.ts

import { supabase } from '@/lib/supabase';

// Generic function to submit form data to Supabase
export const submitFormToSupabase = async (tableName: string, data: any) => {
  try {
    // Submit to Supabase using the zapier_webhook function
    const { data: result, error } = await supabase.rpc('zapier_webhook', {
      table_name: tableName,
      payload: data
    });
    
    if (error) throw error;
    
    return { success: true, id: result.id };
  } catch (error) {
    console.error(`Error submitting to ${tableName}:`, error);
    return { success: false, error };
  }
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

### 3. Create Admin Dashboard Components (Future Enhancement)

Once the forms are submitting data to Supabase, you can create admin dashboard components to view and manage the submissions:

```typescript
// Example admin component for viewing contact submissions
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const ContactSubmissions = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchContacts() {
      const { data, error } = await supabase
        .from('contacts_dashboard')
        .select('*');
        
      if (error) console.error('Error fetching contacts:', error);
      else setContacts(data || []);
      
      setLoading(false);
    }
    
    fetchContacts();
  }, []);
  
  // Render the contacts table
  // ...
};
```

## Implementation Priority

1. First implement the `supabaseFormService.ts` file
2. Modify each form submission handler one at a time:
   - Contact Form
   - Consultation Scheduling Form
   - Solo 401k Application Form
   - LLC Application Form
   - First Responder Application Form
3. Test each form to ensure data is being stored correctly
4. Develop admin dashboard components as needed

## Benefits of This Approach

- **Redundancy**: If Zapier fails, you still have the data in Supabase
- **Data Access**: Easy to build admin dashboards and reporting tools
- **Cost Efficiency**: Reducing dependency on third-party tools for data storage
- **Security**: Data is stored securely with proper access controls
