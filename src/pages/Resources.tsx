
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Resources = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Update page title and meta description
    document.title = "Resources - Survival 401k";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Resources and educational content about Solo 401k plans, retirement planning, and investment strategies from Survival 401k."
    );

    // Remove any existing script to avoid duplicates
    const existingScript = document.getElementById('dib-script');
    if (existingScript) {
      existingScript.remove();
    }

    // Create and append the script tag with an id for tracking
    const script = document.createElement("script");
    script.id = 'dib-script';
    script.src = "https://io.dropinblog.com/embedjs/40009ff3-3eb6-4102-85d7-25e628ed8391.js";
    script.async = true;
    document.body.appendChild(script);

    // Setup a load timeout in case the script doesn't load
    const loadTimeout = setTimeout(() => {
      if (isLoading) {
        console.error("Blog script load timeout");
        setHasLoadError(true);
        setIsLoading(false);
      }
    }, 15000); // 15 second timeout

    // Run when script loads
    script.onload = () => {
      console.log("Blog script loaded");
      setupBlogContent();
      clearTimeout(loadTimeout);
    };

    // Add error handling for script loading
    script.onerror = () => {
      console.error("Failed to load blog script");
      setHasLoadError(true);
      setIsLoading(false);
      clearTimeout(loadTimeout);
    };

    // Function to handle all blog content setup
    const setupBlogContent = () => {
      // Add a small delay to let the blog content render
      setTimeout(() => {
        hideAdminPanel();
        fixBlogLinks();
        applyMobileStyles();
        setIsLoading(false);
      }, 1000);
      
      // Set up periodic checks for late-loading content
      const interval = setInterval(() => {
        hideAdminPanel();
        fixBlogLinks();
        
        const posts = document.getElementById('dib-posts');
        // If we found content with more than 1 child, we can stop the interval
        if (posts && posts.children.length > 1) {
          clearInterval(interval);
          console.log("Blog content fully loaded, stopping checks");
        }
      }, 2000);
      
      // Clear the interval after 30 seconds regardless
      setTimeout(() => {
        clearInterval(interval);
        console.log("Stopped periodic blog content checks");
      }, 30000);
    };
    
    // Hide the admin panel if it exists
    const hideAdminPanel = () => {
      const adminTools = document.getElementById('dib-admin');
      if (adminTools) {
        console.log("Admin panel found, hiding it");
        adminTools.style.display = 'none';
      }
    };
    
    // Fix all blog post links to use React Router
    const fixBlogLinks = () => {
      console.log("Fixing blog links");
      
      // Add a container-level click handler to capture link clicks
      const blogContainer = document.getElementById('dib-posts');
      if (blogContainer) {
        // Remove any existing listener first to avoid duplicates
        blogContainer.removeEventListener('click', handleBlogContainerClick);
        blogContainer.addEventListener('click', handleBlogContainerClick);
        console.log("Added blog container click listener");
      }
      
      // Fix direct links
      const blogLinks = document.querySelectorAll('#dib-posts a');
      if (blogLinks.length) {
        console.log(`Found ${blogLinks.length} links to process`);
        
        blogLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (!href) return;
          
          // Check for post links (those with p= parameter)
          if (href.includes('p=')) {
            try {
              // Extract the slug from the URL
              const slugMatch = href.match(/p=([^&]+)/);
              if (slugMatch && slugMatch[1]) {
                const slug = slugMatch[1];
                const newPath = `/blog/${slug}`;
                console.log(`Fixed post link: ${href} -> ${newPath}`);
                
                // Set a data attribute to store the slug for easier retrieval later
                link.setAttribute('data-blog-slug', slug);
                link.setAttribute('href', newPath);
              }
            } catch (e) {
              console.error('Invalid URL:', href, e);
            }
          }
        });
      } else {
        console.log("No blog links found yet");
      }
    };
    
    // Handler for clicks inside the blog container
    const handleBlogContainerClick = (e) => {
      const clickedElement = e.target;
      const linkElement = clickedElement.closest('a');
      
      if (linkElement) {
        const href = linkElement.getAttribute('href');
        const slug = linkElement.getAttribute('data-blog-slug');
        
        // If it's a blog post link (either from href or data attribute)
        if ((href && href.startsWith('/blog/')) || slug) {
          e.preventDefault();
          const targetSlug = slug || href.split('/blog/')[1];
          console.log(`Intercepted click, navigating to: /blog/${targetSlug}`);
          navigate(`/blog/${targetSlug}`);
        }
      }
    };
    
    // Apply mobile-specific styles
    const applyMobileStyles = () => {
      if (!isMobile) return;
      
      const adjustMobileView = () => {
        // Target the blog container and ensure it's responsive
        const blogContainer = document.getElementById('dib-posts');
        if (blogContainer) {
          blogContainer.style.width = '100%';
          blogContainer.style.maxWidth = '100%';
          blogContainer.style.overflowX = 'hidden';
          
          // Ensure images don't overflow
          const images = blogContainer.querySelectorAll('img');
          images.forEach(img => {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
          });
          
          console.log("Mobile blog view adjusted");
        }
      };
      
      // Run multiple times to catch dynamically loaded content
      setTimeout(adjustMobileView, 1000);
      setTimeout(adjustMobileView, 2500);
      setTimeout(adjustMobileView, 5000);
    };

    // Cleanup function
    return () => {
      // Remove the script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      
      // Reset page title
      document.title = "Survival 401k - Solo 401k Plans for Self-Employed Professionals";
    };
  }, [isMobile, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-survival-800">
            Resources & Educational Content
          </h1>
          
          {isLoading && (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <div className="animate-spin">
                <Loader className="h-12 w-12 text-survival-600" />
              </div>
              <p className="mt-4 text-gray-600">Loading resources...</p>
            </div>
          )}
          
          {/* The blog container with improved visibility */}
          <div 
            id="dib-posts" 
            className="w-full max-w-full overflow-x-auto bg-white rounded-lg p-4 shadow-sm"
          ></div>
          
          {/* Fallback message if blog doesn't load */}
          {hasLoadError && (
            <div className="text-center text-gray-600 mt-8 p-6 bg-gray-100 rounded-lg">
              <p className="mb-2">Unable to load resources. Please try refreshing the page.</p>
              <button 
                onClick={() => window.location.reload()} 
                className="text-survival-600 hover:text-survival-700 font-medium"
              >
                Refresh Page
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
