
import { supabase } from '@/integrations/supabase/client';

/**
 * Test the connection to Supabase
 */
export const testSupabaseConnection = async (): Promise<{success: boolean, message: string, error?: any}> => {
  try {
    console.log(`[${new Date().toISOString()}] Testing Supabase connection...`);
    
    const { data, error } = await supabase.from('contacts').select('id').limit(1);
    
    if (error) {
      console.error(`[${new Date().toISOString()}] Supabase connection test failed:`, error);
      return {
        success: false,
        message: `Database connection failed: ${error.message}`,
        error
      };
    }
    
    console.log(`[${new Date().toISOString()}] Supabase connection test successful:`, data);
    return {
      success: true,
      message: 'Database connection successful'
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Exception in Supabase connection test:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred during connection test',
      error
    };
  }
};

/**
 * Log information about the Supabase client
 */
export const logSupabaseInfo = (): void => {
  console.log(`[${new Date().toISOString()}] Supabase client information:`);
  console.log(`  URL: ${supabase.supabaseUrl}`);
  console.log(`  Auth JWT: ${supabase.auth.getSession() ? 'Present' : 'Not present'}`);
};

/**
 * Insert a test contact to verify database access
 */
export const insertTestContact = async (): Promise<{success: boolean, message: string, error?: any}> => {
  try {
    console.log(`[${new Date().toISOString()}] Inserting test contact...`);
    
    const testContact = {
      name: 'Test Contact',
      email: `test-${new Date().getTime()}@example.com`,
      message: 'This is a test submission from the diagnostic service',
      opt_in: false
    };
    
    const { data, error } = await supabase
      .from('contacts')
      .insert(testContact)
      .select();
    
    if (error) {
      console.error(`[${new Date().toISOString()}] Test contact insertion failed:`, error);
      return {
        success: false,
        message: `Database insert test failed: ${error.message}`,
        error
      };
    }
    
    console.log(`[${new Date().toISOString()}] Test contact insertion successful:`, data);
    return {
      success: true,
      message: 'Database insert test successful'
    };
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Exception in test contact insertion:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred during test insertion',
      error
    };
  }
};
