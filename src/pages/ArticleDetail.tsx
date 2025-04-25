
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

const DEFAULT_COVER_IMAGE = "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070";

const ArticleDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        console.log(`Fetching article with slug: ${slug}`);
        
        // Use the existing blog_posts table
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
          navigate("/articles");
          return;
        }
        
        console.log("Article data retrieved:", data);
        
        // Transform the data to match our Article type
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
        setArticle(articleData);
      } catch (error) {
        console.error("Error fetching article:", error);
        toast({
          title: "Error fetching article",
          description: "Please try again later",
          variant: "destructive",
        });
        navigate("/articles");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug, navigate, toast]);

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
            <Link to="/articles">
              <Button>Back to Articles</Button>
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
            <Button 
              variant="ghost" 
              className="mb-6" 
              onClick={() => navigate('/articles')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Button>
            
            <ArticleContent
              excerpt={article.excerpt}
              content={article.content}
              tags={article.tags}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleDetail;
