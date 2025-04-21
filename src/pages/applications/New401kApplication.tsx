
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import ZapierConfig from '@/components/solo401k/ZapierConfig';

const New401kApplication = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

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

      // Setup message listener for form submission
      const handleMessage = (event: MessageEvent) => {
        if (typeof event.data === 'object' && event.data.formSubmitted === true) {
          console.log('Form submitted:', event.data);
          
          // Store minimal application data for payment process
          const applicationData = {
            name: event.data.name || 'Applicant',
            email: event.data.email || '',
            applicationDate: new Date().toISOString(),
            submissionId: Math.random().toString(36).substring(2, 15)
          };
          
          sessionStorage.setItem('solo401k_application', JSON.stringify(applicationData));
          
          toast({
            title: "Application Submitted",
            description: "Your Solo 401k application has been submitted successfully. Redirecting to payment...",
          });
          
          // Redirect to payment page after a short delay
          setTimeout(() => {
            navigate('/payment/solo-401k');
          }, 1500);
        }
      };

      window.addEventListener('message', handleMessage);
      
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
        window.removeEventListener('message', handleMessage);
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [toast, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <ZapierConfig validateWebhook={true} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div id="form-container" className="bg-white p-8 rounded-lg shadow-lg">
            <div className="text-center py-4 text-gray-500">
              <p>Loading form...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New401kApplication;
