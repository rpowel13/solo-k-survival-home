
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Resources = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Update page title and meta description
    document.title = "Resources - Survival 401k";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Resources and educational content about Solo 401k plans, retirement planning, and investment strategies from Survival 401k."
    );

    // Create and append the script tag
    const script = document.createElement("script");
    script.src = "https://io.dropinblog.com/embedjs/40009ff3-3eb6-4102-85d7-25e628ed8391.js";
    script.async = true;
    document.body.appendChild(script);

    // Run when script loads
    script.onload = () => {
      console.log("Blog script loaded");
      setIsLoading(false);
      fixBlogLinks();
    };

    // Fix links after the blog content has loaded
    const fixBlogLinks = () => {
      // Wait for the blog to load and process links
      setTimeout(() => {
        console.log("Fixing blog links");
        const blogLinks = document.querySelectorAll('#dib-posts a');
        console.log("Found " + blogLinks.length + " links to process");
        
        blogLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href && (href.includes('lovableproject.com') || href.includes('19612142-4b99-4012-9fb6-80aa52498c64'))) {
            // Extract just the path part from the URL and make it relative
            try {
              const url = new URL(href);
              const path = url.pathname;
              link.setAttribute('href', path);
              console.log("Fixed link: " + href + " -> " + path);
            } catch (e) {
              console.error('Invalid URL:', href);
            }
          }
        });
      }, 1500); // Give the blog content time to load
    };

    // Also run periodically in case of dynamic content changes
    const interval = setInterval(fixBlogLinks, 3000);

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
  }, [isMobile]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {isLoading && (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-12 h-12 rounded-full border-4 border-survival-600 border-t-transparent animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading resources...</p>
            </div>
          )}
          <div id="dib-posts" className="w-full max-w-full overflow-x-auto"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;

