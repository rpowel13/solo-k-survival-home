
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Resources = () => {
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

    // Fix links after the blog content has loaded
    const fixBlogLinks = () => {
      // Wait for the blog to load and process links
      setTimeout(() => {
        const blogLinks = document.querySelectorAll('#dib-posts a');
        blogLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href && (href.includes('lovableproject.com') || href.includes('19612142-4b99-4012-9fb6-80aa52498c64'))) {
            // Extract just the path part from the URL and make it relative
            try {
              const url = new URL(href);
              const path = url.pathname;
              link.setAttribute('href', path);
            } catch (e) {
              console.error('Invalid URL:', href);
            }
          }
        });
      }, 1500); // Give the blog content time to load
    };

    // Run the fix when the script loads
    script.onload = fixBlogLinks;

    // Also run periodically in case of dynamic content changes
    const interval = setInterval(fixBlogLinks, 3000);

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
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div id="dib-posts"></div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
