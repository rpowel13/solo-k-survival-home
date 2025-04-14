
import { createClient } from '@supabase/supabase-js';
import { BlogPost } from '@/types/blog';

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

// Sample blog posts for development - moved here to be accessible by mock client
const mockBlogPosts = [
  {
    id: "1",
    title: "Understanding Solo 401(k) Contribution Limits for 2025",
    slug: "understanding-solo-401k-contribution-limits-2025",
    excerpt: "Learn about the updated contribution limits for Solo 401(k) plans and how they can benefit your retirement strategy.",
    content: `<p>The IRS has announced new contribution limits for retirement plans in 2025, bringing significant opportunities for self-employed individuals and small business owners using Solo 401(k) plans.</p>
    <h2>Key Contribution Limits for 2025</h2>
    <p>As an entrepreneur or small business owner, you can now contribute up to:</p>
    <ul>
      <li>$22,500 as an employee contribution (with an additional $7,500 for those 50 and older)</li>
      <li>Up to 25% of your compensation as an employer contribution</li>
      <li>Total combined limit of $66,000 ($73,500 for those 50 and older)</li>
    </ul>
    <p>These increased limits provide an excellent opportunity to accelerate your retirement savings while enjoying valuable tax benefits.</p>`,
    coverImage: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070",
    author: "Jane Doe",
    authorTitle: "Financial Advisor",
    publishedAt: "2025-04-10T10:00:00Z",
    tags: ["Solo 401(k)", "Retirement Planning", "Tax Strategies"]
  },
  {
    id: "2",
    title: "Retirement Strategies for First Responders",
    slug: "retirement-strategies-first-responders",
    excerpt: "First responders face unique challenges when planning for retirement. Here's what you need to know.",
    content: `<p>First responders have distinct retirement planning needs due to the demanding nature of their professions, earlier retirement ages, and specialized benefit structures.</p>
    <h2>Understanding Your Benefits</h2>
    <p>Many first responders have pension plans, but these benefits may not be enough on their own to maintain your desired lifestyle in retirement. It's crucial to fully understand:</p>
    <ul>
      <li>Your pension calculation formula</li>
      <li>Vesting schedules and retirement eligibility</li>
      <li>Survivor benefit options</li>
      <li>Cost-of-living adjustments</li>
    </ul>`,
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070",
    author: "John Smith",
    authorTitle: "Retirement Specialist",
    publishedAt: "2025-04-05T15:30:00Z",
    tags: ["First Responders", "Pension Plans", "Early Retirement"]
  },
  {
    id: "3",
    title: "Tax Advantages of Self-Directed Retirement Plans",
    slug: "tax-advantages-self-directed-retirement-plans",
    excerpt: "Discover the powerful tax benefits of self-directed retirement accounts and how they can accelerate your wealth growth.",
    content: `<p>Self-directed retirement plans offer entrepreneurs and independent professionals unique tax advantages that can dramatically accelerate wealth accumulation.</p>
    <h2>Tax-Deferred Growth</h2>
    <p>One of the most powerful benefits of self-directed retirement accounts is tax-deferred growth. This means:</p>
    <ul>
      <li>Investment gains within the account aren't taxed immediately</li>
      <li>Compounding occurs on the full investment amount without annual tax drags</li>
      <li>More of your money stays invested, working for your future</li>
    </ul>`,
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2026",
    author: "Sarah Johnson",
    authorTitle: "Tax Planning Expert",
    publishedAt: "2025-04-01T09:15:00Z",
    tags: ["Tax Planning", "Self-Directed IRA", "Investment Strategy"]
  }
];

// Define type for our mock database
interface MockDatabase {
  blog_posts: BlogPost[];
  solo401k_applications: any[];
  [key: string]: any[];
}

// Initialize mock database
const mockDatabase: MockDatabase = {
  blog_posts: [...mockBlogPosts],
  solo401k_applications: []
};

// Create a proper typed mock client
function createMockSupabaseClient() {
  console.log('Using mock Supabase client for development');
  
  // Function to create a query builder with proper method chaining
  function from(table: string) {
    console.log(`Mock operation on table: ${table}`);
    
    // Get data from our mock database
    const tableData = mockDatabase[table] || [];
    
    // Basic result with data
    const baseResult = {
      data: [...tableData],
      error: null
    };
    
    // Create a builder that properly chains methods
    const builder = {
      ...baseResult,
      
      // Select method (chainable)
      select: function(columns?: string) {
        console.log(`Mock select ${columns || '*'}`);
        return this;
      },
      
      // Filter by equality (chainable)
      eq: function(column: string, value: any) {
        console.log(`Mock filter: ${column} = ${value}`);
        const filteredData = tableData.filter(item => item[column] === value);
        
        // Return a new builder with filtered data
        return {
          ...baseResult,
          data: filteredData,
          select: this.select,
          eq: this.eq,
          single: this.single,
          update: this.update,
          delete: this.delete,
          insert: this.insert
        };
      },
      
      // Get single result
      single: function() {
        console.log(`Mock single result`);
        const singleData = this.data.length > 0 ? this.data[0] : null;
        return {
          data: singleData,
          error: this.data.length === 0 ? { message: 'No rows found' } : null
        };
      },
      
      // Update records
      update: function(data: any) {
        console.log(`Mock update:`, data);
        
        return {
          eq: function(column: string, value: any) {
            console.log(`Mock update where ${column} = ${value}`);
            // Update matching records in our mock database
            mockDatabase[table] = mockDatabase[table].map(item => 
              item[column] === value ? { ...item, ...data } : item
            );
            return { data: null, error: null };
          }
        };
      },
      
      // Delete records
      delete: function() {
        console.log(`Mock delete`);
        
        return {
          eq: function(column: string, value: any) {
            console.log(`Mock delete where ${column} = ${value}`);
            const initialLength = mockDatabase[table].length;
            mockDatabase[table] = mockDatabase[table].filter(item => item[column] !== value);
            const deleted = initialLength > mockDatabase[table].length;
            return { 
              data: deleted ? { success: true } : null, 
              error: !deleted ? { message: 'No matching records found' } : null 
            };
          }
        };
      },
      
      // Insert records
      insert: function(data: any) {
        console.log(`Mock insert:`, data);
        const newData = Array.isArray(data) ? data : [data];
        
        // Ensure each record has an ID
        const recordsWithIds = newData.map((record) => ({
          ...record,
          id: record.id || crypto.randomUUID()
        }));
        
        // Add to mock database
        mockDatabase[table] = [...mockDatabase[table], ...recordsWithIds];
        
        return { 
          data: recordsWithIds, 
          error: null,
          select: function() {
            return { data: recordsWithIds, error: null };
          } 
        };
      }
    };
    
    return builder;
  }
  
  // Return the mock client with properly chained methods
  return {
    from: from,
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
