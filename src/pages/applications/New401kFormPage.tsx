
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const New401kFormPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Create a div element specifically for the form
    const formDiv = document.createElement('div');
    formDiv.id = 'sdrive-form-317490';
    
    // Get the container and append the form div
    const container = document.getElementById('form-container');
    if (container) {
      container.innerHTML = '';
      container.appendChild(formDiv);
      
      // Use requestIdleCallback to defer non-critical script loading
      const loadScript = () => {
        // Create and add the script
        const script = document.createElement('script');
        const protocol = document.location.protocol;
        const randomNum = Math.floor(Math.random() * 1000000000);
        
        script.src = `${protocol}//www.coffeecup.com/api/sdrive/forms/form.js?name=Survival401k%20Application&slug=317490&width=642&height=2435&crossdomains=true&check_safari=true&rand=${randomNum}`;
        script.async = true;
        
        // Set a maximum loading time
        const timeoutId = setTimeout(() => {
          setIsLoading(false);
          if (!script.onload) {
            toast({
              title: "Form Loading Timeout",
              description: "The form is taking longer than expected. It may still load momentarily.",
              variant: "default",
            });
          }
        }, 5000); 
        
        script.onload = () => {
          clearTimeout(timeoutId);
          setIsLoading(false);
          toast({
            title: "Form Loaded",
            description: "The 401k application form has been loaded successfully",
          });
        };
        
        script.onerror = () => {
          clearTimeout(timeoutId);
          setIsLoading(false);
          toast({
            title: "Form Loading Error",
            description: "There was an issue loading the form. Please refresh the page to try again.",
            variant: "destructive",
          });
        };
        
        document.body.appendChild(script);
        
        return () => {
          clearTimeout(timeoutId);
          if (document.body.contains(script)) {
            document.body.removeChild(script);
          }
        };
      };
      
      // Use requestIdleCallback for non-critical script loading
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(loadScript);
      } else {
        // Fallback to setTimeout
        setTimeout(loadScript, 100);
      }
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div id="form-container" className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-2/3 mx-auto" />
              <div className="space-y-6 mt-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
                <Skeleton className="h-12 w-1/3 mx-auto mt-4" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default New401kFormPage;
