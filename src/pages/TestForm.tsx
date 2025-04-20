
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const TestForm = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Create a div for the POWR form
    const formDiv = document.createElement('div');
    formDiv.className = 'powr-form-builder';
    formDiv.id = 'b42b5c6f_1710960557';
    
    // Get the container and append the form div
    const container = document.getElementById('form-container');
    if (container) {
      container.innerHTML = '';
      container.appendChild(formDiv);
      
      // Create and add the POWR script
      const script = document.createElement('script');
      script.src = 'https://www.powr.io/powr.js?platform=html';
      script.async = true;
      
      document.body.appendChild(script);
      
      script.onload = () => {
        toast({
          title: "Form Loaded",
          description: "The test form has been loaded successfully",
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
          <div className="text-center py-4 text-gray-500">
            <p>Loading form...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestForm;
