
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

    return () => {
      // Cleanup: remove the script when component unmounts
      document.body.removeChild(script);
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

