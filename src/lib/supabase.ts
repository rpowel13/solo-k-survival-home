
import { createClient } from '@supabase/supabase-js';
import { BlogPost } from '@/types/blog';

// For development purposes, provide fallback values
// In production, these would be proper environment variables
const supabaseUrl = 'https://daorpdnaganfugudqkmk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhb3JwZG5hZ2FuZnVndWRxa21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MzcxODgsImV4cCI6MjA2MDQxMzE4OH0.op3xLPd8TLjqozzI21xZxNFrDqXO9uVyKZzY6-8cpSc';

// Add mock data handling for development
const isMockMode = true; // Set to false when connecting to a real Supabase instance

export const supabase = isMockMode 
  ? createMockSupabaseClient() 
  : createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      global: {
        headers: {
          'apikey': supabaseAnonKey,
        },
      }
    });

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
    cover_image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070",
    author: "Jane Doe",
    author_title: "Financial Advisor",
    published_at: "2025-04-10T10:00:00Z",
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
    cover_image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070",
    author: "John Smith",
    author_title: "Retirement Specialist",
    published_at: "2025-04-05T15:30:00Z",
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
    cover_image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2026",
    author: "Sarah Johnson",
    author_title: "Tax Planning Expert",
    published_at: "2025-04-01T09:15:00Z",
    tags: ["Tax Planning", "Self-Directed IRA", "Investment Strategy"]
  }
];

// Define type for our mock database
interface MockDatabase {
  blog_posts: any[];
  solo401k_applications: any[];
  contacts: any[];
  scheduled_consultations: any[];
  llc_applications: any[];
  first_responder_applications: any[];
  [key: string]: any[];
}

// Initialize mock database with empty collections
const mockDatabase: MockDatabase = {
  blog_posts: [...mockBlogPosts],
  solo401k_applications: [],
  contacts: [],
  scheduled_consultations: [],
  llc_applications: [],
  first_responder_applications: []
};

// Mock storage data for the mock client
const mockStorageData: Record<string, Record<string, string>> = {
  'blog-images': {}
};

// Create a proper typed mock client
function createMockSupabaseClient() {
  console.log('Using mock Supabase client for development');
  
  // Function to create a query builder with proper method chaining
  function from(table: string) {
    console.log(`Mock operation on table: ${table}`);
    
    // Get data from our mock database
    const tableData = mockDatabase[table] || [];
    
    // Create a builder that properly chains methods
    const builder: any = {
      data: [...tableData],
      error: null,
      
      // Select method (chainable)
      select: function(columns?: string) {
        console.log(`Mock select ${columns || '*'}`);
        return this;
      },
      
      // Order method (chainable)
      order: function(column: string, { ascending = true } = {}) {
        console.log(`Mock order by ${column} ${ascending ? 'ASC' : 'DESC'}`);
        
        const sortedData = [...this.data].sort((a: any, b: any) => {
          if (ascending) {
            return a[column] < b[column] ? -1 : a[column] > b[column] ? 1 : 0;
          } else {
            return a[column] > b[column] ? -1 : a[column] < b[column] ? 1 : 0;
          }
        });
        
        return {
          ...this,
          data: sortedData
        };
      },
      
      // Filter by equality (chainable)
      eq: function(column: string, value: any) {
        console.log(`Mock filter: ${column} = ${value}`);
        const filteredData = tableData.filter(item => item[column] === value);
        
        return {
          ...this,
          data: filteredData
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
        
        // Handle both arrays and single objects
        const newData = Array.isArray(data) ? data : [data];
        
        // Map Supabase field names to our mock database field names if needed
        const formattedData = newData.map(record => {
          const formattedRecord = { ...record };
          
          // Field name mapping for blog posts
          if (table === 'blog_posts') {
            if (record.coverImage) formattedRecord.cover_image = record.coverImage;
            if (record.authorTitle) formattedRecord.author_title = record.authorTitle;
            if (record.publishedAt) formattedRecord.published_at = record.publishedAt;
          }
          
          // Ensure each record has an ID
          if (!formattedRecord.id) {
            formattedRecord.id = crypto.randomUUID();
          }
          
          return formattedRecord;
        });
        
        // Add to mock database
        mockDatabase[table] = [...mockDatabase[table], ...formattedData];
        
        return { 
          data: formattedData, 
          error: null,
          select: function() {
            return { 
              data: formattedData, 
              error: null 
            };
          } 
        };
      }
    };
    
    return builder;
  }
  
  // Mock storage implementation
  const mockStorage = {
    from: (bucketName: string) => {
      console.log(`Mock storage operation on bucket: ${bucketName}`);
      
      if (!mockStorageData[bucketName]) {
        mockStorageData[bucketName] = {};
      }
      
      return {
        upload: (filePath: string, file: any) => {
          console.log(`Mock file upload to ${bucketName}/${filePath}`);
          // Simulate successful upload by storing path
          mockStorageData[bucketName][filePath] = `https://mock-storage/${bucketName}/${filePath}`;
          return { 
            data: { path: filePath }, 
            error: null 
          };
        },
        getPublicUrl: (filePath: string) => {
          console.log(`Mock getting public URL for ${bucketName}/${filePath}`);
          const publicUrl = mockStorageData[bucketName][filePath] || 
            `https://mock-storage/${bucketName}/${filePath}`;
          return { 
            data: { publicUrl },
            error: null
          };
        },
        remove: (filePaths: string[]) => {
          console.log(`Mock removing files: ${filePaths.join(', ')}`);
          filePaths.forEach(path => {
            delete mockStorageData[bucketName][path];
          });
          return {
            data: { success: true },
            error: null
          };
        },
        list: (folderPath?: string) => {
          console.log(`Mock listing files in ${bucketName}/${folderPath || ''}`);
          const files = Object.keys(mockStorageData[bucketName])
            .filter(path => !folderPath || path.startsWith(folderPath))
            .map(path => ({ name: path }));
          return {
            data: files,
            error: null
          };
        }
      };
    }
  };
  
  // Return the mock client with properly chained methods
  return {
    from: from,
    storage: mockStorage,
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
