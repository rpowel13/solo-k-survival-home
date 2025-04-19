
import React, { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

const New401kFormPage = () => {
  const { toast } = useToast();

  useEffect(() => {
    try {
      const script = document.createElement('script');
      // Get the current protocol (http or https)
      const protocol = document.location.protocol;
      // Generate a random number for cache busting
      const randomNum = Math.floor(Math.random() * 1000000000);
      
      script.src = `${protocol}//www.coffeecup.com/api/sdrive/forms/form.js?name=Survival401k%20Application&slug=317490&width=642&height=2435&crossdomains=true&check_safari=true&rand=${randomNum}`;
      script.async = true;
      
      document.body.appendChild(script);
      
      return () => {
        // Cleanup: remove the script when component unmounts
        document.body.removeChild(script);
      };
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load the application form. Please try refreshing the page.",
        variant: "destructive",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div id="sdrive-form-317490" className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          {/* The CoffeeCup form will be injected here */}
        </div>
      </div>
    </div>
  );
};

export default New401kFormPage;
