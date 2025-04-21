
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import ZapierConfig from '@/components/solo401k/ZapierConfig';

const New401kApplication = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any existing content
    const container = document.getElementById('form-container');
    if (container) {
      container.innerHTML = '<div class="text-center py-6"><p>Loading 401k application form...</p></div>';
    }

    // Insert the script directly as HTML
    const formScript = document.createElement('div');
    formScript.innerHTML = `<script type="text/javascript">
      document.write(unescape("%3Cscript src='http" + 
      (document.location.protocol == 'https:' ? 's' : '') + 
      "://www.coffeecup.com/api/sdrive/forms/form.js?name=Survival401k%2520Application%26slug=317490%26width=642%26height=2435%26crossdomains=true%26check_safari=true%26rand=" + 
      Math.floor(Math.random() * 1000000000) + 
      "' type='text/javascript'%3E%3C/script%3E"));
    </script>`;
    
    if (container) {
      container.appendChild(formScript);
    }

    // Create a div for the form
    const formDiv = document.createElement('div');
    formDiv.id = 'sdrive-form-317490';
    if (container) {
      container.appendChild(formDiv);
    }

    // Create and add the script directly
    const script = document.createElement('script');
    script.type = 'text/javascript';
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
  }, [toast, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <ZapierConfig validateWebhook={true} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6 text-survival-800">Solo 401k Application</h1>
            <div id="form-container" className="min-h-[600px]">
              {/* The form will be injected here by the script */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New401kApplication;
