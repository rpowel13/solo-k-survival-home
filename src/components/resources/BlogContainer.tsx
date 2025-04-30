
import React, { useEffect } from "react";

interface BlogContainerProps {
  isLoading: boolean;
}

const BlogContainer = ({ isLoading }: BlogContainerProps) => {
  // Set up a MutationObserver to watch for changes in the blog container
  useEffect(() => {
    // Only run if not loading
    if (!isLoading) {
      const blogContainer = document.getElementById('dib-posts');
      
      if (blogContainer) {
        // Create a new observer
        const observer = new MutationObserver((mutations) => {
          // When content changes, make sure links use our app routing
          const links = blogContainer.querySelectorAll('a');
          links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (href.includes('p=') || href.includes('/blog/'))) {
              // Mark the link so we know it's being handled by our click handler
              link.setAttribute('data-internal-link', 'true');
            }
          });
        });
        
        // Start observing
        observer.observe(blogContainer, { 
          childList: true, 
          subtree: true,
          attributes: true
        });
        
        // Cleanup
        return () => {
          observer.disconnect();
        };
      }
    }
  }, [isLoading]);

  return (
    <div 
      className={`w-full max-w-full overflow-hidden bg-white rounded-lg p-4 shadow-sm ${isLoading ? 'hidden' : 'block'}`}
      style={{ minHeight: '400px' }}
    >
      <div id="dib-posts"></div>
    </div>
  );
};

export default BlogContainer;
