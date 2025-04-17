
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FirstResponderWorkflow from '@/components/firstresponder/FirstResponderWorkflow';

const FirstResponderApplication = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-survival-800">First Responder Package Application</h1>
            <p className="mt-4 text-gray-600">
              Complete this application to set up both your LLC and Solo 401k with our special First Responder benefits.
            </p>
          </div>

          <FirstResponderWorkflow />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FirstResponderApplication;
