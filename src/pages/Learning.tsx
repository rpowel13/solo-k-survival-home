
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Learning = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.src = 'https://io.dropinblog.com/embedjs/40009ff3-3eb6-4102-85d7-25e628ed8391.js';
    script.async = true;
    
    // Append to the document head
    document.head.appendChild(script);
    
    // Cleanup function to remove script when component unmounts
    return () => {
      // Check if script is still in the document before attempting to remove it
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">Learning Center</h1>
          <div className="max-w-4xl mx-auto">
            {/* DropInBlog will inject content here */}
            <div id="dib-posts"></div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Learning;
