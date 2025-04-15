
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Solo401kApplication = () => {
  return (
    <div className="min-h-screen flex flex-flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Solo 401k Application</h1>
          
          <div className="w-full flex justify-center">
            <iframe 
              src="https://survival401k.coffeecup.com/Survival401k%20Application/" 
              style={{ border: "0px #ffffff none" }} 
              name="myiFrame" 
              scrolling="no" 
              frameBorder="1" 
              marginHeight="0" 
              marginWidth="0" 
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
