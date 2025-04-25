
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { BlogPost } from "@/types/blog";
import { supabase } from "@/lib/supabase";
import { ImageUpload } from "./ImageUpload";
import { RichTextEditor } from "./RichTextEditor";
import { ArrowLeft, Save } from "lucide-react";

interface BlogFormProps {
  onLogout: () => void;
}

const BlogForm = ({ onLogout }: BlogFormProps) => {
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
  const [showImageUpload, setShowImageUpload] = useState(false);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!isEditMode || !slug) return;
      
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
            title: post.title || "",
            slug: post.slug || "",
            excerpt: post.excerpt || "",
            content: post.content || "",
            coverImage: post.coverImage || "",
            author: post.author || "",
            authorTitle: post.authorTitle || "",
            tags: post.tags ? post.tags.join(", ") : ""
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

    fetchBlogPost();
  }, [slug, isEditMode, navigate, toast]);

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
        publishedAt: new Date().toISOString(),
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean)
      };
      
      if (isEditMode) {
        const { error } = await supabase
          .from('blog_posts')
          .update(newPost)
          .eq('slug', slug);
          
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert(newPost);
          
        if (error) throw error;
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

  const handleImageUploadComplete = (url: string) => {
    if (showImageUpload) {
      setFormData(prev => ({ ...prev, coverImage: url }));
      setShowImageUpload(false);
      toast({
        title: "Cover image uploaded",
        description: "The cover image has been uploaded successfully",
      });
    } else {
      const imageTag = `<img src="${url}" alt="Blog content image" class="my-4 rounded-lg w-full max-w-full" />`;
      setFormData(prev => ({
        ...prev,
        content: prev.content + imageTag
      }));
      toast({
        title: "Image inserted",
        description: "The image has been inserted into the content",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="h-8 bg-gray-200 rounded animate-pulse mb-6 w-1/3"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded animate-pulse w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
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
                onClick={onLogout}
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
                <label htmlFor="title" className="block text-base font-medium">Title *</label>
                <Input 
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      title: value,
                      slug: !isEditMode && prev.slug === "" 
                        ? value.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, "-")
                        : prev.slug
                    }));
                  }}
                  required
                  placeholder="Enter blog post title"
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="slug" className="block text-base font-medium">URL Slug *</label>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">/blog/</span>
                  <Input 
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    required
                    placeholder="url-friendly-slug"
                    className="flex-1"
                  />
                </div>
                <p className="text-sm text-gray-500">This will be used in the URL. Use lowercase letters, numbers, and hyphens only.</p>
              </div>

              <div className="space-y-2">
                <label className="block text-base font-medium">Cover Image</label>
                {formData.coverImage && (
                  <div className="relative mb-4 border rounded-lg overflow-hidden">
                    <img 
                      src={formData.coverImage} 
                      alt="Cover preview" 
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setFormData(prev => ({ ...prev, coverImage: "" }))}
                    >
                      Remove
                    </Button>
                  </div>
                )}
                <Button
                  type="button" 
                  variant="outline"
                  onClick={() => setShowImageUpload(true)}
                >
                  {formData.coverImage ? "Change Cover Image" : "Set Cover Image"}
                </Button>
                {showImageUpload && (
                  <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                    <h4 className="text-sm font-medium mb-2">Upload Cover Image</h4>
                    <ImageUpload onUploadComplete={handleImageUploadComplete} />
                    <Button 
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                      onClick={() => setShowImageUpload(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="excerpt" className="block text-base font-medium">Excerpt/Summary *</label>
                <Input
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  required
                  placeholder="Brief summary of the article (1-2 sentences)"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-base font-medium">Content *</label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                  onImageClick={() => {
                    const input = document.getElementById('image-upload') as HTMLInputElement;
                    if (input) input.click();
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="author" className="block text-base font-medium">Author Name</label>
                  <Input 
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="Author name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="authorTitle" className="block text-base font-medium">Author Title</label>
                  <Input 
                    id="authorTitle"
                    name="authorTitle"
                    value={formData.authorTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, authorTitle: e.target.value }))}
                    placeholder="e.g., Financial Advisor"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="tags" className="block text-base font-medium">Tags</label>
                <Input 
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
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
    </div>
  );
};

export default BlogForm;
