
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Article } from "@/types/article";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleHeader from "@/components/articles/ArticleHeader";
import ArticleContent from "@/components/articles/ArticleContent";
import ArticleLoadingSkeleton from "@/components/articles/ArticleLoadingSkeleton";
import { ArrowLeft } from "lucide-react";
import { useAdminAuth } from "@/components/admin/AdminAuth";

const DEFAULT_COVER_IMAGE = "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070";

// Default benefits to display if none are provided
const defaultArticleBenefits = [
  "Benefit 1: Easy to understand financial concepts",
  "Benefit 2: Step-by-step guides for implementation",
  "Benefit 3: Tax-saving strategies for small businesses",
  "Benefit 4: Retirement planning made simple",
  "Benefit 5: Investment options comparison",
  "Benefit 6: How to maximize your retirement contributions"
];

const ArticleDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAdminAuth();
  const isFromBlogPath = window.location.pathname.includes('/blog/');

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        console.log(`Fetching article with slug: ${slug}`);
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select()
          .eq('slug', slug)
          .single();
        
        if (error) {
          console.error("Error fetching article:", error);
          toast({
            title: "Article not found",
            description: "The article you're looking for doesn't exist",
            variant: "destructive",
          });
          // Navigate to the appropriate list page based on where they came from
          navigate(isFromBlogPath ? "/blog" : "/articles");
          return;
        }
        
        console.log("Article data retrieved:", data);
        
        const articleData: Article = {
          id: data.id,
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt || "",
          content: data.content || "",
          coverImage: data.cover_image || DEFAULT_COVER_IMAGE,
          author: data.author || "Admin",
          authorTitle: data.author_title || "",
          publishedAt: data.published_at,
          tags: Array.isArray(data.tags) ? data.tags : []
        };
        
        console.log("Formatted article data:", articleData);
        
        // Update the page title
        document.title = `${articleData.title} | Survival 401k`;
        
        setArticle(articleData);
      } catch (error) {
        console.error("Error fetching article:", error);
        toast({
          title: "Error fetching article",
          description: "Please try again later",
          variant: "destructive",
        });
        navigate(isFromBlogPath ? "/blog" : "/articles");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
    
    // Cleanup function to reset the title
    return () => {
      document.title = "Survival 401k - Solo 401k Plans for Self-Employed Professionals";
    };
  }, [slug, navigate, toast, isFromBlogPath]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <ArticleLoadingSkeleton />
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Link to={isFromBlogPath ? "/blog" : "/articles"}>
              <Button>Back to {isFromBlogPath ? "Blog" : "Articles"}</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const publishedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ArticleHeader
          title={article.title}
          publishedDate={publishedDate}
          author={article.author}
          authorTitle={article.authorTitle}
          coverImage={article.coverImage}
        />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between mb-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate(isFromBlogPath ? '/blog' : '/articles')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {isFromBlogPath ? 'Blog' : 'Articles'}
              </Button>
              
              {isAuthenticated && (
                <Link to="/admin">
                  <Button variant="outline" size="sm">
                    Admin Dashboard
                  </Button>
                </Link>
              )}
            </div>
            
            <ArticleContent
              excerpt={article.excerpt}
              content={article.content}
              tags={article.tags}
              showWhyChooseSection={false}
              cardBenefits={defaultArticleBenefits}
              cardTitle={article.title}
              cardSubtitle={article.excerpt}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
