
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Resources = () => {
  const [isLoading, setIsLoading] = useState(true);
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

    // Run when script loads
    script.onload = () => {
      console.log("Blog script loaded");
      setIsLoading(false);
      // Give it a moment to render content before fixing links
      setTimeout(() => {
        fixBlogLinks();
      }, 1000);
    };

    // Add error handling for script loading
    script.onerror = () => {
      console.error("Failed to load blog script");
      setIsLoading(false);
    };

    // Fix links after the blog content has loaded
    const fixBlogLinks = () => {
      console.log("Fixing blog links");
      
      // Add click event listener to the blog container to handle link clicks
      const blogContainer = document.getElementById('dib-posts');
      if (blogContainer) {
        blogContainer.addEventListener('click', (e) => {
          // Check if the clicked element is a link
          const clickedElement = e.target as HTMLElement;
          const linkElement = clickedElement.closest('a');
          
          if (linkElement) {
            const href = linkElement.getAttribute('href');
            if (href) {
              // Handle post links (those with p= parameter)
              if (href.includes('p=')) {
                e.preventDefault(); // Prevent default navigation
                
                // Extract the slug from the URL
                const slugMatch = href.match(/p=([^&]+)/);
                if (slugMatch && slugMatch[1]) {
                  const slug = slugMatch[1];
                  console.log("Navigating to blog post:", slug);
                  
                  // Use React Router's navigate function
                  navigate(`/blog/${slug}`);
                }
              }
            }
          }
        });
      }
      
      // Also fix all links for direct URL changes
      const blogLinks = document.querySelectorAll('#dib-posts a');
      console.log("Found " + blogLinks.length + " links to process");
      
      blogLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href) {
          // Check for URLs that need fixing
          if (href.includes('lovableproject.com') || 
              href.includes('19612142-4b99-4012-9fb6-80aa52498c64') ||
              href.includes('dropinblog.com/embed/') ||
              href.includes('/resources?p=')) {
            try {
              // Get the current URL base (protocol + host)
              const currentBase = window.location.origin;
              
              // For post links (those with p= parameter)
              if (href.includes('p=')) {
                // Extract the slug from the URL
                const slugMatch = href.match(/p=([^&]+)/);
                if (slugMatch && slugMatch[1]) {
                  const slug = slugMatch[1];
                  // Create a path with the current origin + blog path + slug
                  const newPath = `${currentBase}/blog/${slug}`;
                  link.setAttribute('href', newPath);
                  console.log("Fixed post link: " + href + " -> " + newPath);
                  
                  // Also add a click handler to use React Router
                  link.addEventListener('click', (e) => {
                    e.preventDefault();
                    navigate(`/blog/${slug}`);
                  });
                }
              } 
              // For category links or other internal links
              else if (href.includes('lovableproject.com') || href.includes('19612142-4b99-4012-9fb6-80aa52498c64')) {
                const url = new URL(href);
                const path = url.pathname + url.search;
                const newPath = `${currentBase}${path}`;
                link.setAttribute('href', newPath);
                console.log("Fixed internal link: " + href + " -> " + newPath);
              }
            } catch (e) {
              console.error('Invalid URL:', href, e);
            }
          }
        }
      });
    };

    // Set up a periodic check for blog content
    const interval = setInterval(() => {
      const posts = document.getElementById('dib-posts');
      const adminTools = document.getElementById('dib-admin');
      
      // If admin tools are showing, hide them
      if (adminTools) {
        adminTools.style.display = 'none';
        console.log("Hidden admin tools");
      }
      
      // Check for blog content
      if (posts && posts.children.length > 0) {
        console.log("Found blog content, fixing links");
        fixBlogLinks();
        // If we found content, we can stop the interval
        if (posts.children.length > 1) {
          clearInterval(interval);
        }
      } else {
        console.log("No blog content found yet, waiting...");
      }
    }, 2000);

    // Check for mobile-specific adjustments
    if (isMobile) {
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
    }

    return () => {
      // Cleanup: remove the script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      // Clear the interval
      clearInterval(interval);
      // Reset title to default
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
          <div id="blog-fallback" className="hidden">
            <p className="text-center text-gray-600 mt-8">
              Unable to load resources. Please try refreshing the page.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
