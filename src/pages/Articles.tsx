
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/articles/ArticleCard";
import { useToast } from "@/hooks/use-toast";
import { Article } from "@/types/article";
import { supabase } from "@/lib/supabase";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const DEFAULT_COVER_IMAGE = "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070";

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching articles...");
        
        // Use the existing blog_posts table but present it as articles
        const { data, error } = await supabase
          .from('blog_posts')
          .select()
          .order('published_at', { ascending: false });
        
        if (error) {
          console.error("Supabase error:", error);
          toast({
            title: "Error fetching articles",
            description: error.message,
            variant: "destructive",
          });
          return;
        }
        
        if (!data || data.length === 0) {
          console.log("No articles found");
          setArticles([]);
          return;
        }
        
        console.log("Raw articles data:", data);
        
        // Process the data into our Article type
        const formattedArticles = data.map((post) => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt || "",
          content: post.content || "",
          coverImage: post.cover_image || DEFAULT_COVER_IMAGE, 
          author: post.author || "Admin",
          authorTitle: post.author_title || "",
          publishedAt: post.published_at,
          tags: Array.isArray(post.tags) ? post.tags : []
        }));
        
        console.log("Formatted articles:", formattedArticles);
        setArticles(formattedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
        toast({
          title: "Error fetching articles",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-survival-800 to-survival-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Resource Library</h1>
              <p className="text-gray-200">
                Insights, guides, and strategies for entrepreneurs and first responders
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
              {articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex justify-center items-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <BookOpen className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-600 mb-4">No articles yet</h3>
                  <p className="text-gray-500">Stay tuned for upcoming resources</p>
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

export default Articles;
