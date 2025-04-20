
import { supabase } from '@/integrations/supabase/client';

/**
 * Test the connection to Supabase
 */
export const testSupabaseConnection = async (): Promise<{success: boolean, message: string, error?: any}> => {
  try {
    const { count, error } = await supabase
      .from('contacts')
      .select('*', { count: 'exact', head: true })
      .limit(1);
    
    if (error) {
      console.error(`[${new Date().toISOString()}] Supabase connection test failed:`, error);
      return {
        success: false,
        message: `Connection test failed: ${error.message}`,
        error
      };
    }
    
    return {
      success: true,
      message: `Connection successful. Found ${count} records.`
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Unexpected error testing Supabase connection:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      error
    };
  }
};

/**
 * Log Supabase connection info
 */
export const logSupabaseInfo = (): void => {
  try {
    // Log general connection info without accessing protected properties
    console.log(`[${new Date().toISOString()}] Supabase client initialized`);
    
    // Test the connection and log results
    testSupabaseConnection().then(result => {
      if (result.success) {
        console.log(`[${new Date().toISOString()}] Supabase connection is working`);
      } else {
        console.error(`[${new Date().toISOString()}] Supabase connection test failed:`, result.error);
      }
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error logging Supabase info:`, error);
  }
};

/**
 * Test inserting a contact
 */
export const insertTestContact = async (): Promise<{success: boolean, data?: any, error?: any}> => {
  try {
    // Create test data
    const testContact = {
      name: `Test Contact ${new Date().toISOString()}`,
      email: `test-${Date.now()}@example.com`,
      message: 'This is a test contact created to verify the database connection',
      phone: '555-555-5555',
      is_test: true
    };
    
    console.log(`[${new Date().toISOString()}] Attempting to insert test contact:`, testContact);
    
    // Insert the contact
    const { data, error } = await supabase
      .from('contacts')
      .insert(testContact)
      .select();
    
    if (error) {
      console.error(`[${new Date().toISOString()}] Test contact insertion failed:`, error);
      return {
        success: false,
        error
      };
    }
    
    console.log(`[${new Date().toISOString()}] Test contact inserted successfully:`, data);
    return {
      success: true,
      data
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Unexpected error inserting test contact:`, error);
    return {
      success: false,
      error
    };
  }
};
