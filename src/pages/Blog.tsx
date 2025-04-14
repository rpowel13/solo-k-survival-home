
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
        const { data, error } = await supabase.from<BlogPost>('blog_posts').select();
        
        if (error) {
          toast({
            title: "Error fetching blog posts",
            description: error.message,
            variant: "destructive",
          });
        } else {
          // If we have no data yet, use sample data
          if (!data || data.length === 0) {
            setBlogPosts([]);
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
        // Fallback to empty array on error
        setBlogPosts([]);
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

export default Blog;
