
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import FirstResponderLLCWorkflow from '@/components/firstresponder/FirstResponderLLCWorkflow';
import { initZapierConfig } from '@/services/zapierConfigService';

const FirstResponderLLCApplication = () => {
  const navigate = useNavigate();

  useEffect(() => {
    initZapierConfig('first_responder');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-survival-800">First Responder LLC Application</h1>
            <p className="mt-4 text-gray-600">
              Complete this application to set up your LLC with our special First Responder benefits.
            </p>
          </div>

          <FirstResponderLLCWorkflow onComplete={() => navigate('/payment/first-responder-llc')} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FirstResponderLLCApplication;
