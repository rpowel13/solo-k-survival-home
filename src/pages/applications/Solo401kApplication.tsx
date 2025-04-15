
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useIframeSubmitDetection } from '@/hooks/useIframeSubmitDetection';

const Solo401kApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Handle form submission detection
  const handleSubmitDetected = () => {
    console.log("Solo 401k application form submission detected");
    setHasSubmitted(true);

    // Save application info to sessionStorage for the payment page
    const applicationData = {
      name: "Applicant", // Ideally this would be captured from the form
      email: "applicant@example.com", // Ideally this would be captured from the form
      applicationDate: new Date().toISOString(),
    };
    
    sessionStorage.setItem('solo401k_application', JSON.stringify(applicationData));
    
    // Show toast to notify user
    toast({
      title: "Application Submitted",
      description: "Redirecting to payment page to complete your Solo 401k setup.",
      duration: 5000,
    });
    
    // Redirect to payment page after a short delay
    setTimeout(() => {
      navigate('/payment/solo-401k');
    }, 2000);
  };

  // Use the iframe submission detection hook
  const { iframeRef, iframeWrapperRef } = useIframeSubmitDetection({
    onSubmitDetected: handleSubmitDetected,
    submitButtonSelector: "input[type='submit'], button[type='submit'], button.submit-button"
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Solo 401k Application</h1>
          
          <div className="w-full flex justify-center" ref={iframeWrapperRef}>
            <iframe 
              ref={iframeRef}
              src="https://survival401k.coffeecup.com/Survival401k%20Application/" 
              style={{ border: "0px #ffffff none" }} 
              name="myiFrame" 
              scrolling="no" 
              frameBorder={1} 
              marginHeight={0} 
              marginWidth={0} 
              height="2400px" 
              width="1000px" 
              title="Solo 401k Application Form"
              className="w-full max-w-5xl"
              allowFullScreen
            />
          </div>
          
          <div className="mt-8 text-center text-gray-600">
            <p>If you experience any issues with the form, please contact us at ross.powell@survival401k.com</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Solo401kApplication;
