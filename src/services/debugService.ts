
/**
 * Utility for debugging Supabase connections and operations
 */

import { supabase } from '@/integrations/supabase/client';

export const testSupabaseConnection = async () => {
  console.log(`[${new Date().toISOString()}] Testing Supabase connection...`);
  
  try {
    // First, test a simple connection
    console.log(`[${new Date().toISOString()}] Attempting to query contacts table...`);
    
    // Attempt a simple query to test the connection
    const { data, error } = await supabase
      .from('contacts')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error(`[${new Date().toISOString()}] Supabase connection test failed:`, error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      
      // Check if it's an RLS error
      if (error.message?.includes('new row violates row-level security policy')) {
        console.error(`[${new Date().toISOString()}] RLS POLICY ERROR DETECTED! This suggests Row Level Security is blocking the insert.`);
      }
      
      return {
        success: false,
        error,
        message: `Connection error: ${error.message}`
      };
    }
    
    console.log(`[${new Date().toISOString()}] Supabase connection test successful:`, data);
    
    // Now try inserting a test record
    console.log(`[${new Date().toISOString()}] Attempting test insert to contacts table...`);
    
    const testRecord = {
      name: 'Test Connection',
      email: 'test@connection.com',
      message: 'This is a test message to verify insert capabilities',
      subject: 'Connection Test',
      opt_in: false
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('contacts')
      .insert(testRecord)
      .select();
      
    if (insertError) {
      console.error(`[${new Date().toISOString()}] Supabase test insert failed:`, insertError);
      console.error('Insert error details:', JSON.stringify(insertError, null, 2));
      
      // Check if it's an RLS error
      if (insertError.message?.includes('new row violates row-level security policy')) {
        console.error(`[${new Date().toISOString()}] RLS POLICY ERROR DETECTED! This suggests Row Level Security is blocking the insert.`);
        
        return {
          success: false,
          error: insertError,
          message: `RLS Policy Error: The current user doesn't have permission to insert records. This is likely a Row Level Security configuration issue.`
        };
      }
      
      return {
        success: false,
        error: insertError,
        message: `Insert error: ${insertError.message}`
      };
    }
    
    console.log(`[${new Date().toISOString()}] Supabase test insert successful:`, insertData);
    
    return {
      success: true,
      message: 'Supabase connection and insert test successful',
      testInsertId: insertData?.[0]?.id || null
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Supabase connection test exception:`, error);
    return {
      success: false,
      error,
      message: `Exception: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

export const logSupabaseInfo = () => {
  console.log(`[${new Date().toISOString()}] Supabase client information:`);
  console.log(`- Client initialized: ${supabase ? 'Yes' : 'No'}`);
  
  // Test if auth is available
  console.log(`- Auth available: ${supabase.auth ? 'Yes' : 'No'}`);
  
  // Log functions availability
  console.log(`- Functions available: ${supabase.functions ? 'Yes' : 'No'}`);
  
  // Log rpc availability
  console.log(`- RPC available: ${supabase.rpc ? 'Yes' : 'No'}`);
  
  // Log storage availability
  console.log(`- Storage available: ${supabase.storage ? 'Yes' : 'No'}`);
};

// Function to directly insert a test record, bypassing other application logic
export const insertTestContact = async () => {
  console.log(`[${new Date().toISOString()}] Directly inserting test contact record...`);
  
  const testRecord = {
    name: 'Direct Test',
    email: 'direct-test@example.com',
    message: 'This is a direct test insertion to verify database access',
    subject: 'Direct Test',
    opt_in: false
  };
  
  try {
    const { data, error } = await supabase
      .from('contacts')
      .insert(testRecord)
      .select();
      
    if (error) {
      console.error(`[${new Date().toISOString()}] Direct test insert failed:`, error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return { success: false, error };
    }
    
    console.log(`[${new Date().toISOString()}] Direct test insert successful:`, data);
    return { success: true, data };
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Exception during direct test insert:`, err);
    return { success: false, error: err };
  }
};
