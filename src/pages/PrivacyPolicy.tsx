
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
          <Separator className="mb-8" />
          
          <div className="prose max-w-none">
            <p>
              At Survival 401k, we take privacy seriously and are committed to protecting the personal information of our users. 
              This Privacy Policy outlines how we collect, use, and share opt-in information collected through our website.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Collection of Opt-In Information</h2>
            
            <p className="mb-4">
              We collect opt-in information from users through various forms on our website, including email subscriptions, 
              contact forms, and event registration forms. This information may include, but is not limited to, names, 
              email addresses, and phone numbers. We only collect opt-in information that is necessary for the purpose it was provided for.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Use of Opt-In Information</h2>
            
            <p className="mb-4">
              The opt-in information collected through our website is used to provide our users with the services they requested, 
              such as email newsletters, event updates, and customer support. We may also use this information to personalize the 
              user experience on our website and to improve our products and services.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Sharing of Opt-In Information</h2>
            
            <p className="mb-4">
              We do not sell, rent, or share opt-in mobile information with third parties for marketing or promotional purposes.
            </p>
            
            <p className="mb-4">
              Information may be shared with third parties only if mandated by law.
            </p>
            
            <p className="mb-4">
              Sharing of information with subcontractors for support services, such as customer service, is permissible. 
              However, text messaging originator opt-in data and consent will not be shared with any third parties under any circumstances.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Data Security</h2>
            
            <p className="mb-4">
              We take appropriate technical and organizational measures to secure the opt-in information collected through 
              our website from unauthorized access, use, disclosure, or destruction.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
            
            <p className="mb-4">
              We may modify this Privacy Policy from time to time to reflect changes in our privacy practices. 
              If we make any changes, we will update this Privacy Policy and post the revised version on our website.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Contact Information</h2>
            
            <p className="mb-4">
              If you have any questions or concerns about our privacy practices or this Privacy Policy, 
              please contact us at info@survival401k.com or call (833) 224-5517.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
