
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BlogPost } from "@/types/blog";
import { supabase } from "@/lib/supabase";

const BlogEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!slug;
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    author: "",
    authorTitle: "",
    tags: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!isEditMode) return;
      
      try {
        setIsLoading(true);
        
        // In production, this would fetch from Supabase
        // For now, we use our sample data
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .single();
        
        if (error) {
          // Fallback to sample data
          const samplePost = sampleBlogPosts.find(post => post.slug === slug);
          if (samplePost) {
            setFormData({
              title: samplePost.title,
              slug: samplePost.slug,
              excerpt: samplePost.excerpt,
              content: samplePost.content,
              coverImage: samplePost.coverImage,
              author: samplePost.author,
              authorTitle: samplePost.authorTitle,
              tags: samplePost.tags.join(", ")
            });
          } else {
            toast({
              title: "Post not found",
              description: "The blog post you're trying to edit doesn't exist",
              variant: "destructive",
            });
            navigate("/blog");
          }
        } else {
          const post = data as BlogPost;
          setFormData({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            coverImage: post.coverImage,
            author: post.author,
            authorTitle: post.authorTitle,
            tags: post.tags.join(", ")
          });
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        toast({
          title: "Error fetching blog post",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug, isEditMode, navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from title if in create mode and slug hasn't been manually edited
    if (name === "title" && !isEditMode && formData.slug === "") {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        slug: generatedSlug
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content) {
      toast({
        title: "Missing required fields",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSaving(true);
      
      const newPost: BlogPost = {
        id: isEditMode ? slug! : crypto.randomUUID(),
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        coverImage: formData.coverImage || "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070",
        author: formData.author || "Admin",
        authorTitle: formData.authorTitle || "Site Administrator",
        publishedAt: isEditMode ? new Date().toISOString() : new Date().toISOString(),
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean)
      };
      
      // In production, this would save to Supabase
      // For now, we'll just simulate a success
      if (isEditMode) {
        // const { error } = await supabase.from('blog_posts').update(newPost).eq('slug', slug);
      } else {
        // const { error } = await supabase.from('blog_posts').insert(newPost);
      }
      
      toast({
        title: isEditMode ? "Blog post updated" : "Blog post created",
        description: isEditMode 
          ? "Your changes have been saved successfully" 
          : "Your new blog post has been published",
      });
      
      navigate(`/blog/${newPost.slug}`);
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast({
        title: "Error saving blog post",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="w-full max-w-3xl mx-auto">
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-6 w-1/3"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 bg-gray-200 rounded animate-pulse w-full"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-survival-800 to-survival-900 text-white py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Button 
                variant="link" 
                className="text-white p-0 mb-4" 
                onClick={() => navigate("/blog")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
              <h1 className="text-3xl font-bold">
                {isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
              </h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base">Title *</Label>
                <Input 
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter blog post title"
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug" className="text-base">URL Slug *</Label>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">/blog/</span>
                  <Input 
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    placeholder="url-friendly-slug"
                    className="flex-1"
                  />
                </div>
                <p className="text-sm text-gray-500">This will be used in the URL. Use lowercase letters, numbers, and hyphens only.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-base">Excerpt/Summary *</Label>
                <Textarea 
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  required
                  placeholder="Brief summary of the article (1-2 sentences)"
                  className="resize-none h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-base">Content *</Label>
                <Textarea 
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  placeholder="Full article content (supports HTML)"
                  className="min-h-[300px]"
                />
                <p className="text-sm text-gray-500">You can use HTML tags for formatting (e.g., &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, etc.)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage" className="text-base">Cover Image URL</Label>
                <Input 
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-sm text-gray-500">Enter a URL for the blog post featured image</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author" className="text-base">Author Name</Label>
                  <Input 
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Author name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="authorTitle" className="text-base">Author Title</Label>
                  <Input 
                    id="authorTitle"
                    name="authorTitle"
                    value={formData.authorTitle}
                    onChange={handleChange}
                    placeholder="e.g., Financial Advisor"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags" className="text-base">Tags</Label>
                <Input 
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Tag1, Tag2, Tag3"
                />
                <p className="text-sm text-gray-500">Separate tags with commas</p>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  className="bg-survival-600 hover:bg-survival-700"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      <span>{isEditMode ? "Updating..." : "Publishing..."}</span>
                    </div>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {isEditMode ? "Update Post" : "Publish Post"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
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
  }
];

export default BlogEditor;
