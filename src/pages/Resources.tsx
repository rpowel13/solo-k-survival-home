
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useDropInBlog } from "@/hooks/use-dropinblog";
import LoadingSpinner from "@/components/resources/LoadingSpinner";
import ErrorMessage from "@/components/resources/ErrorMessage";
import BlogContainer from "@/components/resources/BlogContainer";

const Resources = () => {
  const { isLoading, hasLoadError } = useDropInBlog();
  
  useEffect(() => {
    // Force refresh the blog content when the component mounts
    if (!isLoading && !hasLoadError) {
      window.dispatchEvent(new Event('resize'));
    }
  }, [isLoading, hasLoadError]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-survival-800">
            Resources & Educational Content
          </h1>
          
          {isLoading && <LoadingSpinner />}
          
          <BlogContainer isLoading={isLoading} />
          
          {hasLoadError && <ErrorMessage />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
