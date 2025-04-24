
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BlogPost } from "@/types/blog";
import { supabase } from "@/lib/supabase";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password123";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const authStatus = sessionStorage.getItem("blogAdminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!isEditMode || !slug) return;
      
      if (!isAuthenticated) return;
      
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select()
          .eq('slug', slug)
          .single();
        
        if (error) {
          toast({
            title: "Post not found",
            description: "The blog post you're trying to edit doesn't exist",
            variant: "destructive",
          });
          navigate("/blog");
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
        navigate("/blog");
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchBlogPost();
    }
  }, [slug, isEditMode, navigate, toast, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("blogAdminAuthenticated", "true");
      toast({
        title: "Authentication successful",
        description: "You are now authorized to create and edit blog posts",
      });
    } else {
      toast({
        title: "Authentication failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("blogAdminAuthenticated");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Unauthorized action",
        description: "You must be logged in to create or edit blog posts",
        variant: "destructive",
      });
      return;
    }
    
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
        publishedAt: new Date().toISOString(),
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean)
      };
      
      if (isEditMode) {
        const { error } = await supabase
          .from('blog_posts')
          .update(newPost)
          .eq('slug', slug);
          
        if (error) {
          throw new Error(error.message);
        }
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert(newPost);
          
        if (error) {
          throw new Error(error.message);
        }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
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

  if (!isAuthenticated) {
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
                  Admin Authentication Required
                </h1>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto border rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-6 bg-amber-50 p-4 rounded border border-amber-200">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                <p className="text-amber-700 text-sm">
                  This area is restricted to administrators only. Please log in to continue.
                </p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full bg-survival-600 hover:bg-survival-700">
                  Log In
                </Button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
            <div className="max-w-3xl mx-auto flex justify-between items-center">
              <div>
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
              <Button 
                variant="outline" 
                className="text-white border-white hover:bg-white/10" 
                onClick={handleLogout}
              >
                Log Out
              </Button>
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
                  placeholder="Write your blog post content here..."
                  className="min-h-[400px] resize-y"
                />
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

export default BlogEditor;
