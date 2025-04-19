
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const New401kFormPage = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Create a div element specifically for the form
    const formDiv = document.createElement('div');
    formDiv.id = 'sdrive-form-317490';
    
    // Get the container and append the form div
    const container = document.getElementById('form-container');
    if (container) {
      container.innerHTML = '';
      container.appendChild(formDiv);
      
      // Create and add the script
      const script = document.createElement('script');
      const protocol = document.location.protocol;
      const randomNum = Math.floor(Math.random() * 1000000000);
      
      script.src = `${protocol}//www.coffeecup.com/api/sdrive/forms/form.js?name=Survival401k%20Application&slug=317490&width=642&height=2435&crossdomains=true&check_safari=true&rand=${randomNum}`;
      script.async = true;
      
      document.body.appendChild(script);
      
      script.onload = () => {
        toast({
          title: "Form Loaded",
          description: "The 401k application form has been loaded successfully",
        });
      };
      
      script.onerror = () => {
        toast({
          title: "Form Loading Error",
          description: "There was an issue loading the form. Please refresh the page to try again.",
          variant: "destructive",
        });
      };
      
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div id="form-container" className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          {/* The form will be injected here */}
          <div className="text-center py-4 text-gray-500">
            <p>Loading form...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New401kFormPage;
