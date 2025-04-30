
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export function useDropInBlog() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    // Remove any existing script to avoid duplicates
    const existingScript = document.getElementById('dib-script');
    if (existingScript) {
      existingScript.remove();
    }

    // Clear any previous DIB content
    const existingContainer = document.getElementById('dib-posts');
    if (existingContainer) {
      existingContainer.innerHTML = '';
    }

    console.log("Creating and appending DropInBlog script");
    
    // Create and append the script tag with the exact URL
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
    }, 20000); // 20 second timeout

    // Script load handler
    script.onload = () => {
      console.log("DropInBlog script loaded successfully");
      
      // Add a longer delay to let content render completely
      setTimeout(() => {
        hideAdminPanel();
        fixBlogLinks();
        applyMobileStyles();
        
        // Check if posts are actually rendered
        const postsContainer = document.getElementById('dib-posts');
        if (postsContainer && (!postsContainer.children.length || postsContainer.innerHTML === '')) {
          console.log("No posts found in container, forcing refresh");
          // Force a refresh of the DIB content
          window.dispatchEvent(new Event('resize'));
        }
        
        setIsLoading(false);
      }, 3000);
    };

    // Error handler
    script.onerror = () => {
      console.error("Failed to load DropInBlog script");
      setHasLoadError(true);
      setIsLoading(false);
      clearTimeout(loadTimeout);
    };
    
    // Hide the admin panel if it exists
    const hideAdminPanel = () => {
      const adminTools = document.getElementById('dib-admin');
      if (adminTools) {
        console.log("Admin panel found, hiding it");
        adminTools.style.display = 'none';
      }
      
      // Also hide any other admin elements that might appear
      const adminElements = document.querySelectorAll('[id^="dib-admin"], .dib-admin');
      adminElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.display = 'none';
        }
      });
    };
    
    // Fix blog post links to use React Router
    const fixBlogLinks = () => {
      const blogContainer = document.getElementById('dib-posts');
      if (!blogContainer) {
        console.error("Blog container not found for link fixing");
        return;
      }
      
      console.log("Setting up blog link handler");
      
      // Add a container-level click handler to capture link clicks
      blogContainer.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const linkElement = target.closest('a');
        
        if (linkElement) {
          const href = linkElement.getAttribute('href');
          if (!href) return;
          
          // Check for post links (those with p= parameter)
          if (href.includes('p=')) {
            e.preventDefault();
            try {
              // Extract the slug from the URL
              const slugMatch = href.match(/p=([^&]+)/);
              if (slugMatch && slugMatch[1]) {
                const slug = slugMatch[1];
                console.log(`Intercepted click, navigating to: /blog/${slug}`);
                navigate(`/blog/${slug}`);
              }
            } catch (e) {
              console.error('Invalid URL:', href, e);
            }
          }
        }
      });
      
      console.log("Blog link handler added");
    };
    
    // Apply mobile-specific styles
    const applyMobileStyles = () => {
      if (!isMobile) return;
      
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
      }
    };
    
    // Set up an interval to periodically check and hide the admin panel
    // This helps with cases where the admin panel loads after our initial check
    const adminCheckInterval = setInterval(() => {
      hideAdminPanel();
    }, 1000);
    
    // Clear the interval after 10 seconds
    setTimeout(() => {
      clearInterval(adminCheckInterval);
    }, 10000);
    
    // Apply mobile styles with a delay to ensure content is loaded
    setTimeout(() => {
      applyMobileStyles();
    }, 1500);
    
    // And again a bit later just to be safe
    setTimeout(() => {
      applyMobileStyles();
    }, 3000);

    // Force the blog to refresh periodically if it appears empty
    const contentCheckInterval = setInterval(() => {
      const postsContainer = document.getElementById('dib-posts');
      if (postsContainer && (!postsContainer.children.length || postsContainer.innerHTML === '')) {
        console.log("Blog container still empty, triggering refresh");
        window.dispatchEvent(new Event('resize'));
      } else {
        clearInterval(contentCheckInterval);
      }
    }, 2000);

    // Stop checking after 20 seconds regardless
    setTimeout(() => {
      clearInterval(contentCheckInterval);
    }, 20000);

    // Cleanup function
    return () => {
      clearTimeout(loadTimeout);
      clearInterval(adminCheckInterval);
      clearInterval(contentCheckInterval);
    };
  }, [isMobile, navigate, isLoading]);

  // Update page metadata
  useEffect(() => {
    document.title = "Resources - Survival 401k";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Resources and educational content about Solo 401k plans, retirement planning, and investment strategies from Survival 401k."
    );
  }, []);

  return {
    isLoading,
    hasLoadError,
  };
}
