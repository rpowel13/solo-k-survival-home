
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/blog/BlogCard";
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
        const { data, error } = await supabase.from('blog_posts').select();
        
        if (error) {
          toast({
            title: "Error fetching blog posts",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setBlogPosts(data as BlogPost[]);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        toast({
          title: "Error fetching blog posts",
          description: "Please try again later",
          variant: "destructive",
        });
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
            <div>
              <h1 className="text-3xl font-bold mb-2">Retirement Planning Blog</h1>
              <p className="text-gray-200">
                Insights, tips, and strategies for entrepreneurs and first responders
              </p>
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
                  <p className="text-gray-500">Stay tuned for upcoming articles</p>
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
