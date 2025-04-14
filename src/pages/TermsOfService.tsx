
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
          <Separator className="mb-8" />
          
          <div className="prose max-w-none">
            <p>
              These terms and conditions govern the use of SMS services provided by Survival 401k. 
              By subscribing to the service, you agree to be bound by these terms and conditions.
            </p>
            
            <div className="my-6">
              <p className="mb-4">
                -To subscribe to the SMS service, the User must opt-in by providing their mobile number to Survival 401k.
              </p>
              
              <p className="mb-4">
                -The User acknowledges that message and data rates may apply. Survival 401k is not responsible for any charges incurred by the User.
              </p>
              
              <p className="mb-4">
                -The User acknowledges that they may receive up to 1-2 messages per week.
              </p>
              
              <p className="mb-4">
                -The User may opt-out of the SMS service at any time by replying "STOP" to any Message received.
              </p>
              
              <p className="mb-4">
                -Survival 401k will promptly stop sending Messages to the User upon receipt of the opt-out request.
              </p>
            </div>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Disclaimer of Liability</h2>
            
            <p className="mb-4">
              Survival 401k will not be liable for any loss, damage or inconvenience caused by the use of the SMS service.
            </p>
            
            <p className="mb-4">
              The User assumes all risks and responsibility for the use of the SMS service.
            </p>
            
            <p className="mt-8">
              By subscribing to the SMS service provided by Survival 401k, the User agrees to be bound by these terms and conditions. 
              If the User does not agree to these terms and conditions, they should not subscribe to the SMS service.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
