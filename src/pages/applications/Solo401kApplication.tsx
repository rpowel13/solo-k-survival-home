
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { useIframeSubmitDetection } from '@/hooks/useIframeSubmitDetection';

const Solo401kApplication = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Handle iframe form submission
  const handleFormSubmitted = async () => {
    try {
      console.log("Form submission detected in iframe!");
      
      // Store basic application data in sessionStorage
      // Since we don't have direct access to the form values, we'll store minimal info
      sessionStorage.setItem('solo401k_application', JSON.stringify({
        name: 'Applicant',
        email: 'applicant@example.com',
        applicationDate: new Date().toISOString()
      }));
      
      toast({
        title: "Application Submitted",
        description: "We've received your Solo 401k application. Redirecting to payment...",
      });
      
      // Redirect to payment page after a short delay
      setTimeout(() => {
        navigate('/payment/solo-401k');
      }, 1500);
      
    } catch (error) {
      console.error("Form submission handling error:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem processing your application. Please try again later.",
        variant: "destructive",
      });
    }
  };

  // Use the iframe submission detection hook
  const { iframeRef, iframeWrapperRef } = useIframeSubmitDetection({
    onSubmitDetected: handleFormSubmitted,
    submitButtonSelector: "input[type='submit'], button[type='submit'], .button, .submit"
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center text-survival-800">Solo 401k Application</h1>
          <p className="text-lg mb-8 text-center">Please complete the form below to apply for your Solo 401k plan.</p>
          
          <div ref={iframeWrapperRef} className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <iframe 
              ref={iframeRef}
              src="https://survival401k.coffeecup.com/Survival401k%20Application/" 
              name="myiFrame" 
              scrolling="no" 
              frameBorder={0}
              marginHeight={0}
              marginWidth={0}
              height={2400}
              width="100%"
              allowFullScreen
              className="w-full border-0"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Solo401kApplication;
