
# Additional Supabase Tables Setup

Run the following SQL in your Supabase SQL editor to create the necessary tables for contacts and applications:

## Contacts Table

```sql
-- Create a table for contact form submissions
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  opt_in BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create secure policies
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to see all contacts
CREATE POLICY "Admins can view all contacts" 
  ON contacts 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Create policy for inserting new contacts
CREATE POLICY "Anyone can submit a contact form" 
  ON contacts 
  FOR INSERT 
  WITH CHECK (true);

-- Optional: Create a secure view for admin dashboard
CREATE VIEW contacts_dashboard AS
SELECT 
  id,
  name,
  email,
  phone,
  subject,
  LEFT(message, 100) as message_preview,
  status,
  created_at
FROM contacts
ORDER BY created_at DESC;
```

## LLC Applications Table

```sql
-- Create a table for LLC formation applications
CREATE TABLE llc_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  desired_llc_name TEXT NOT NULL,
  alternative_name1 TEXT,
  alternative_name2 TEXT,
  state TEXT NOT NULL,
  member_count TEXT NOT NULL,
  business_purpose TEXT NOT NULL,
  additional_info TEXT,
  agree_to_terms BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'submitted',
  payment_status TEXT DEFAULT 'pending',
  application_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create secure policies
ALTER TABLE llc_applications ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to see all applications
CREATE POLICY "Admins can view all LLC applications" 
  ON llc_applications 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Create policy for inserting new applications
CREATE POLICY "Anyone can submit an LLC application" 
  ON llc_applications 
  FOR INSERT 
  WITH CHECK (true);

-- Optional: Create a secure view for admin dashboard
CREATE VIEW llc_applications_dashboard AS
SELECT 
  id,
  first_name,
  last_name,
  email,
  phone,
  desired_llc_name,
  state,
  status,
  payment_status,
  application_date
FROM llc_applications
ORDER BY application_date DESC;
```

## First Responder Applications Table

```sql
-- Create a table for First Responder Package applications
CREATE TABLE first_responder_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  occupation TEXT NOT NULL, 
  department TEXT NOT NULL,
  years_of_service TEXT NOT NULL,
  desired_llc_name TEXT NOT NULL,
  state TEXT NOT NULL,
  additional_info TEXT,
  verify_401k_interest BOOLEAN DEFAULT FALSE,
  agree_to_terms BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'submitted',
  payment_status TEXT DEFAULT 'pending',
  application_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create secure policies
ALTER TABLE first_responder_applications ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to see all applications
CREATE POLICY "Admins can view all first responder applications" 
  ON first_responder_applications 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Create policy for inserting new applications
CREATE POLICY "Anyone can submit a first responder application" 
  ON first_responder_applications 
  FOR INSERT 
  WITH CHECK (true);

-- Optional: Create a secure view for admin dashboard
CREATE VIEW first_responder_applications_dashboard AS
SELECT 
  id,
  first_name,
  last_name,
  email,
  phone,
  occupation,
  department,
  desired_llc_name,
  state,
  status,
  payment_status,
  application_date
FROM first_responder_applications
ORDER BY application_date DESC;
```

## Scheduled Consultations Table

```sql
-- Create a table for scheduled consultations
CREATE TABLE scheduled_consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  consultation_date DATE NOT NULL,
  consultation_time TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'scheduled',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create secure policies
ALTER TABLE scheduled_consultations ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to see all consultations
CREATE POLICY "Admins can view all scheduled consultations" 
  ON scheduled_consultations 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Create policy for inserting new consultations
CREATE POLICY "Anyone can schedule a consultation" 
  ON scheduled_consultations 
  FOR INSERT 
  WITH CHECK (true);

-- Optional: Create a secure view for calendar integration
CREATE VIEW upcoming_consultations AS
SELECT 
  id,
  name,
  email,
  phone,
  consultation_date,
  consultation_time,
  message,
  status
FROM scheduled_consultations
WHERE consultation_date >= CURRENT_DATE
ORDER BY consultation_date, consultation_time;
```

## Admin Dashboard Views

```sql
-- Create a combined applications view for easier admin dashboard
CREATE VIEW all_applications_dashboard AS
SELECT
  id,
  'solo401k' as application_type,
  first_name,
  last_name,
  email,
  application_date
FROM solo401k_applications

UNION ALL

SELECT
  id,
  'llc' as application_type,
  first_name,
  last_name,
  email,
  application_date
FROM llc_applications

UNION ALL

SELECT
  id,
  'first_responder' as application_type,
  first_name,
  last_name,
  email,
  application_date
FROM first_responder_applications

ORDER BY application_date DESC;
```

## Function to Store Data from Zapier

```sql
-- Create a function that can be called from Zapier webhooks to store data
CREATE OR REPLACE FUNCTION public.store_zapier_data(
  table_name TEXT,
  payload JSONB
) RETURNS JSONB AS $$
DECLARE
  result_id UUID;
BEGIN
  -- Insert data based on the specified table
  IF table_name = 'contacts' THEN
    INSERT INTO contacts (name, email, phone, subject, message, opt_in)
    VALUES (
      payload->>'name',
      payload->>'email',
      payload->>'phone',
      payload->>'subject',
      payload->>'message',
      (payload->>'opt_in')::boolean
    )
    RETURNING id INTO result_id;
  
  ELSIF table_name = 'scheduled_consultations' THEN
    INSERT INTO scheduled_consultations (name, email, phone, consultation_date, consultation_time, message)
    VALUES (
      payload->>'name',
      payload->>'email',
      payload->>'phone',
      (payload->>'date')::date,
      payload->>'time',
      payload->>'message'
    )
    RETURNING id INTO result_id;
  
  ELSIF table_name = 'solo401k_applications' THEN
    INSERT INTO solo401k_applications (
      first_name, last_name, email, phone, ssn, 
      business_name, business_type, annual_income,
      trustee1_name, trustee2_name, participant1_name, participant2_name,
      existing_retirement, additional_info
    )
    VALUES (
      payload->>'firstName',
      payload->>'lastName',
      payload->>'email',
      payload->>'phone',
      payload->>'ssn',
      payload->>'businessName',
      payload->>'businessType',
      payload->>'annualIncome',
      payload->>'trustee1Name',
      payload->>'trustee2Name',
      payload->>'participant1Name',
      payload->>'participant2Name',
      (payload->>'existingRetirement')::boolean,
      payload->>'additionalInfo'
    )
    RETURNING id INTO result_id;
  
  ELSIF table_name = 'llc_applications' THEN
    INSERT INTO llc_applications (
      first_name, last_name, email, phone,
      desired_llc_name, alternative_name1, alternative_name2,
      state, member_count, business_purpose, additional_info
    )
    VALUES (
      payload->>'firstName',
      payload->>'lastName',
      payload->>'email',
      payload->>'phone',
      payload->>'desiredLLCName',
      payload->>'alternativeName1',
      payload->>'alternativeName2',
      payload->>'state',
      payload->>'memberCount',
      payload->>'businessPurpose',
      payload->>'additionalInfo'
    )
    RETURNING id INTO result_id;
  
  ELSIF table_name = 'first_responder_applications' THEN
    INSERT INTO first_responder_applications (
      first_name, last_name, email, phone,
      occupation, department, years_of_service,
      desired_llc_name, state, additional_info, verify_401k_interest
    )
    VALUES (
      payload->>'firstName',
      payload->>'lastName',
      payload->>'email',
      payload->>'phone',
      payload->>'occupation',
      payload->>'department',
      payload->>'yearsOfService',
      payload->>'desiredLLCName',
      payload->>'state',
      payload->>'additionalInfo',
      (payload->>'verify401kInterest')::boolean
    )
    RETURNING id INTO result_id;
  
  ELSE
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Invalid table name'
    );
  END IF;
  
  -- Return success response
  RETURN jsonb_build_object(
    'success', true,
    'id', result_id,
    'message', 'Data stored successfully'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create an API endpoint for Zapier to use
CREATE OR REPLACE FUNCTION public.zapier_webhook(
  table_name TEXT,
  payload JSONB
) RETURNS JSONB AS $$
BEGIN
  -- Call store_zapier_data function and return its result
  RETURN public.store_zapier_data(table_name, payload);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Usage Instructions

After running these SQL queries:

1. The four new tables will be created with proper security policies
2. Dashboard views will be available for admin interfaces
3. A function to store data from Zapier webhooks will be available

To connect Zapier to these tables:

1. Create a new HTTP POST action in Zapier
2. Use your Supabase REST API endpoint for the Zapier webhook function:
   `https://[YOUR-SUPABASE-PROJECT].supabase.co/rest/v1/rpc/zapier_webhook`
3. Include your Supabase anon key in the headers:
   `apikey: YOUR_SUPABASE_ANON_KEY`
4. Format the payload like this:
   ```json
   {
     "table_name": "contacts",
     "payload": {
       "name": "{{name}}",
       "email": "{{email}}",
       "phone": "{{phone}}",
       "subject": "{{subject}}",
       "message": "{{message}}",
       "opt_in": "{{opt_in}}"
     }
   }
   ```

This provides a secure way to store form submissions from Zapier directly into your Supabase database.
