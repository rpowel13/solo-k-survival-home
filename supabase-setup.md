
# Supabase Setup for Solo 401k Application

## Table Setup

Run the following SQL in your Supabase SQL editor to create the necessary table:

```sql
-- Create a table for Solo 401k applications
CREATE TABLE solo401k_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  ssn TEXT NOT NULL,
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  annual_income TEXT NOT NULL,
  trustee1_name TEXT NOT NULL,
  trustee2_name TEXT,
  participant1_name TEXT NOT NULL,
  participant2_name TEXT,
  existing_retirement BOOLEAN DEFAULT FALSE,
  additional_info TEXT,
  status TEXT DEFAULT 'submitted',
  application_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create secure policies
ALTER TABLE solo401k_applications ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to see all applications (you'll need to set up auth and roles)
CREATE POLICY "Admins can view all applications" 
  ON solo401k_applications 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Create policy for inserting new applications
CREATE POLICY "Anyone can submit an application" 
  ON solo401k_applications 
  FOR INSERT 
  WITH CHECK (true);

-- Optional: Create a secure view for admins that masks sensitive information
CREATE VIEW solo401k_applications_secure AS
SELECT 
  id,
  first_name,
  last_name,
  email,
  phone,
  -- Mask SSN for added security
  '***-**-' || RIGHT(ssn, 4) as ssn_masked,
  business_name,
  business_type,
  annual_income,
  trustee1_name,
  trustee2_name,
  participant1_name,
  participant2_name,
  existing_retirement,
  additional_info,
  status,
  application_date,
  created_at
FROM solo401k_applications;
```

## Environment Variables

Add the following environment variables to your project:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Email Notification Edge Function

To set up email notifications when a Solo 401k application is submitted, create an Edge Function in Supabase:

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

This function will send email notifications to Ross Powell and Jill Powell whenever a Solo 401k application is submitted.
