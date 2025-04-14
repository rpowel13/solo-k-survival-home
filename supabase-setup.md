
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

## Edge Function for Email Notifications (Optional)

To send email notifications, you can create an Edge Function in Supabase:

1. Create a new Edge Function called `send-application-notification`
2. Use a service like SendGrid, AWS SES, or another email provider
3. Implement the email sending logic within the edge function
