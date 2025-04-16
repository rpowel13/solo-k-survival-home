
/**
 * Utility for debugging Supabase connections and operations
 */

import { supabase } from '@/integrations/supabase/client';

export const testSupabaseConnection = async () => {
  console.log(`[${new Date().toISOString()}] Testing Supabase connection...`);
  
  try {
    // Attempt a simple query to test the connection
    const { data, error } = await supabase
      .from('contacts')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error(`[${new Date().toISOString()}] Supabase connection test failed:`, error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return {
        success: false,
        error,
        message: `Connection error: ${error.message}`
      };
    }
    
    console.log(`[${new Date().toISOString()}] Supabase connection test successful:`, data);
    return {
      success: true,
      message: 'Supabase connection successful'
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
