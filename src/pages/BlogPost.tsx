
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { BlogPost } from "@/types/blog";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogContent from "@/components/blog/BlogContent";
import BlogActions from "@/components/blog/BlogActions";
import BlogLoadingSkeleton from "@/components/blog/BlogLoadingSkeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        console.log(`Fetching blog post with slug: ${slug}`);
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select()
          .eq('slug', slug)
          .single();
        
        if (error) {
          console.error("Error fetching post:", error);
          toast({
            title: "Post not found",
            description: "The blog post you're looking for doesn't exist",
            variant: "destructive",
          });
          navigate("/blog");
          return;
        }
        
        console.log("Post data retrieved:", data);
        
        // Transform the data to match our BlogPost type
        const postData: BlogPost = {
          id: data.id,
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt || "",
          content: data.content || "",
          coverImage: data.cover_image || "",
          author: data.author || "Admin",
          authorTitle: data.author_title || "",
          publishedAt: data.published_at,
          tags: Array.isArray(data.tags) ? data.tags : []
        };
        
        setPost(postData);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        toast({
          title: "Error fetching blog post",
          description: "Please try again later",
          variant: "destructive",
        });
        navigate("/blog");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug, navigate, toast]);

  const handleDelete = async () => {
    try {
      if (!slug) return;
      
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('slug', slug);
      
      if (error) {
        console.error("Error deleting post:", error);
        toast({
          title: "Error deleting blog post",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Blog post deleted",
        description: "The blog post has been successfully deleted",
      });
      navigate("/blog");
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast({
        title: "Error deleting blog post",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <BlogLoadingSkeleton />
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link to="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <BlogHeader
          title={post.title}
          publishedDate={publishedDate}
          author={post.author}
          authorTitle={post.authorTitle}
          coverImage={post.coverImage}
        />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <BlogActions 
              slug={post.slug} 
              onDeleteClick={() => setShowDeleteDialog(true)} 
            />
            <BlogContent
              excerpt={post.excerpt}
              content={post.content}
              tags={post.tags}
            />
          </div>
        </div>
      </main>
      <Footer />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the blog post. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogPostPage;
