
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Resources = () => {
  useEffect(() => {
    // Create and append the script tag
    const script = document.createElement("script");
    script.src = "https://io.dropinblog.com/embedjs/40009ff3-3eb6-4102-85d7-25e628ed8391.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove the script when component unmounts
      document.body.removeChild(script);
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
