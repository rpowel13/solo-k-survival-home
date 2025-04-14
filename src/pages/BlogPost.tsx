import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Edit, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BlogPost } from "@/types/blog";
import { supabase } from "@/lib/supabase";
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
        
        // In production, this would fetch from Supabase
        const { data, error } = await supabase
          .from('blog_posts')
          .eq('slug', slug)
          .single();
        
        if (error) {
          toast({
            title: "Post not found",
            description: "The blog post you're looking for doesn't exist",
            variant: "destructive",
          });
          navigate("/blog");
        } else {
          setPost(data as BlogPost);
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
  }, [slug, navigate, toast]);

  const handleDelete = async () => {
    try {
      // In production, this would delete from Supabase
      // const { error } = await supabase.from('blog_posts').delete().eq('slug', slug);
      
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
          <div className="w-full max-w-4xl mx-auto">
            <div className="h-64 bg-gray-200 rounded-lg animate-pulse mb-6"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-6 w-1/3"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              ))}
            </div>
          </div>
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
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
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
        <div className="bg-gradient-to-r from-survival-800 to-survival-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link to="/blog" className="inline-flex items-center text-white hover:text-gray-200 mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center text-gray-200">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{publishedDate}</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>5 min read</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-survival-600 flex items-center justify-center">
                    {post.author.charAt(0)}
                  </div>
                </div>
                <div>
                  <div className="font-medium">{post.author}</div>
                  <div className="text-sm text-gray-300">{post.authorTitle}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-auto"
              />
            </div>

            <div className="flex justify-end mb-6 space-x-2">
              <Link to={`/blog/edit/${post.slug}`}>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-50" onClick={() => setShowDeleteDialog(true)}>
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-600 mb-8 font-medium">{post.excerpt}</p>
              <div dangerouslySetInnerHTML={{ __html: post.content || "Full article content would go here..." }} />
            </div>

            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-3">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
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
    <p>These increased limits provide an excellent opportunity to accelerate your retirement savings while enjoying valuable tax benefits.</p>
    <h2>Why These Limits Matter</h2>
    <p>Higher contribution limits mean more tax-deferred growth potential for your retirement savings. This can significantly impact your long-term financial security, especially when combined with the power of compound interest over time.</p>`,
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
    content: `<p>First responders have distinct retirement planning needs due to the demanding nature of their professions, earlier retirement ages, and specialized benefit structures.</p>
    <h2>Understanding Your Benefits</h2>
    <p>Many first responders have pension plans, but these benefits may not be enough on their own to maintain your desired lifestyle in retirement. It's crucial to fully understand:</p>
    <ul>
      <li>Your pension calculation formula</li>
      <li>Vesting schedules and retirement eligibility</li>
      <li>Survivor benefit options</li>
      <li>Cost-of-living adjustments</li>
    </ul>
    <h2>Supplementing Your Pension</h2>
    <p>Diversifying your retirement income sources can provide financial security beyond your pension. Consider:</p>
    <ul>
      <li>Deferred Compensation Plans (457 plans)</li>
      <li>Individual Retirement Accounts (IRAs)</li>
      <li>Health Savings Accounts (HSAs) for qualifying medical expenses</li>
    </ul>
    <p>Early planning and consistent contributions to these supplemental accounts can make a significant difference in your long-term financial wellness.</p>`,
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
    content: `<p>Self-directed retirement plans offer entrepreneurs and independent professionals unique tax advantages that can dramatically accelerate wealth accumulation.</p>
    <h2>Tax-Deferred Growth</h2>
    <p>One of the most powerful benefits of self-directed retirement accounts is tax-deferred growth. This means:</p>
    <ul>
      <li>Investment gains within the account aren't taxed immediately</li>
      <li>Compounding occurs on the full investment amount without annual tax drags</li>
      <li>More of your money stays invested, working for your future</li>
    </ul>
    <h2>Tax Deductions for Contributions</h2>
    <p>For traditional self-directed retirement accounts:</p>
    <ul>
      <li>Contributions may be tax-deductible in the year they're made</li>
      <li>Business owners can potentially deduct both employee and employer contributions</li>
      <li>Tax savings today can be reinvested for additional growth</li>
    </ul>
    <h2>Roth Options for Tax-Free Withdrawals</h2>
    <p>Roth versions of self-directed accounts offer different but equally valuable benefits:</p>
    <ul>
      <li>Contributions are made with after-tax dollars</li>
      <li>Qualified withdrawals in retirement are completely tax-free</li>
      <li>No required minimum distributions, allowing for more flexible estate planning</li>
    </ul>`,
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2026",
    author: "Sarah Johnson",
    authorTitle: "Tax Planning Expert",
    publishedAt: "2025-04-01T09:15:00Z",
    tags: ["Tax Planning", "Self-Directed IRA", "Investment Strategy"]
  }
];

export default BlogPostPage;
