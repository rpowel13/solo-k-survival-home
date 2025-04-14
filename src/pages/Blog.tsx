
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BlogPost } from "@/types/blog";
import { supabase } from "@/lib/supabase";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true);
        // In production, this would fetch from Supabase
        // For now, we're using our mock data
        const { data, error } = await supabase.from('blog_posts').select('*');
        
        if (error) {
          toast({
            title: "Error fetching blog posts",
            description: error.message,
            variant: "destructive",
          });
        } else {
          // If we have no data yet, use sample data
          if (!data || data.length === 0) {
            setBlogPosts(sampleBlogPosts);
          } else {
            setBlogPosts(data as BlogPost[]);
          }
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        toast({
          title: "Error fetching blog posts",
          description: "Please try again later",
          variant: "destructive",
        });
        // Fallback to sample data on error
        setBlogPosts(sampleBlogPosts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-survival-800 to-survival-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Retirement Planning Blog</h1>
                <p className="text-gray-200">
                  Insights, tips, and strategies for entrepreneurs and first responders
                </p>
              </div>
              <Link to="/blog/new">
                <Button className="bg-white text-survival-800 hover:bg-gray-100">
                  <Plus className="mr-2 h-4 w-4" />
                  New Article
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <>
              {blogPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-600 mb-4">No blog posts yet</h3>
                  <p className="text-gray-500 mb-6">Get started by creating your first article</p>
                  <Link to="/blog/new">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Article
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Sample blog posts for development
const sampleBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Solo 401(k) Contribution Limits for 2025",
    slug: "understanding-solo-401k-contribution-limits-2025",
    excerpt: "Learn about the updated contribution limits for Solo 401(k) plans and how they can benefit your retirement strategy.",
    content: "Full detailed article content would go here...",
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
    content: "Full detailed article content would go here...",
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
    content: "Full detailed article content would go here...",
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2026",
    author: "Sarah Johnson",
    authorTitle: "Tax Planning Expert",
    publishedAt: "2025-04-01T09:15:00Z",
    tags: ["Tax Planning", "Self-Directed IRA", "Investment Strategy"]
  }
];

export default Blog;
