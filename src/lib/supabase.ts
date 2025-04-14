
import { createClient } from '@supabase/supabase-js';

// For development purposes, provide fallback values
// In production, these would be proper environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Add mock data handling for development
const isMockMode = true; // Set to false when connecting to a real Supabase instance

export const supabase = isMockMode 
  ? createMockSupabaseClient() 
  : createClient(supabaseUrl, supabaseAnonKey);

// Helper function to handle Supabase errors consistently
export const handleSupabaseError = (error: any) => {
  if (error) {
    console.error('Supabase error:', error);
    return error.message || 'An unexpected error occurred';
  }
  return null;
};

// Mock implementation of Supabase client for development
function createMockSupabaseClient() {
  console.log('Using mock Supabase client for development');
  
  // Simulated in-memory storage
  let mockData: any[] = [];
  
  return {
    from: (table: string) => ({
      insert: (data: any) => {
        console.log(`Mock insert into ${table}:`, data);
        const newData = Array.isArray(data) ? data : [data];
        const recordsWithIds = newData.map((record) => ({
          ...record,
          id: crypto.randomUUID()
        }));
        mockData = [...mockData, ...recordsWithIds];
        
        return {
          select: () => ({
            data: recordsWithIds,
            error: null
          }),
          then: (callback: (result: {data: any[], error: null}) => void) => 
            callback({ data: recordsWithIds, error: null })
        };
      },
      select: () => {
        console.log(`Mock select from ${table}`);
        return {
          data: mockData,
          error: null
        };
      }
    }),
    functions: {
      invoke: (functionName: string, { body }: { body: any }) => {
        console.log(`Mock invoke function ${functionName} with:`, body);
        
        // Special handling for email notification function
        if (functionName === 'send-email-notification') {
          console.log('MOCK EMAIL NOTIFICATION:');
          console.log(`To: ${body.to.join(', ')}`);
          console.log(`Subject: ${body.subject}`);
          console.log(`Body: ${body.body.substring(0, 100)}...`);
          
          // In a real implementation, this would send an actual email
          console.log(`Email would be sent to: ${body.to.join(', ')}`);
        }
        
        return Promise.resolve({ data: { success: true }, error: null });
      }
    }
  };
}
