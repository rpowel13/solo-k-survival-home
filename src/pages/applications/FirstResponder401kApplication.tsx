
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import FirstResponder401kWorkflow from '@/components/firstresponder/FirstResponder401kWorkflow';
import { initWebhook } from '@/services/zapier';

const FirstResponder401kApplication = () => {
  const navigate = useNavigate();

  useEffect(() => {
    initWebhook('first_responder');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-survival-800">First Responder Solo 401k Application</h1>
            <p className="mt-4 text-gray-600">
              Complete this application to set up your Solo 401k with our special First Responder benefits.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <FirstResponder401kWorkflow onComplete={() => navigate('/payment/first-responder-401k')} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FirstResponder401kApplication;
