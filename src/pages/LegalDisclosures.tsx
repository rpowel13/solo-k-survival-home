
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

const LegalDisclosures = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Legal Disclosures</h1>
          <Separator className="my-6" />
          
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Important Information</h2>
            <p className="text-gray-600 mb-4">
              The information provided by Survival 401k on this website is for general informational purposes only. 
              All information is provided in good faith, however, we make no representation or warranty of any kind, 
              express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness 
              of any information.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Not Financial Advice</h2>
            <p className="text-gray-600 mb-4">
              The content on this website is not intended to be a substitute for professional financial advice, 
              legal advice, or tax advice. Always seek the advice of qualified professionals with any questions 
              you may have regarding financial decisions, legal matters, or tax implications. Never disregard 
              professional advice or delay in seeking it because of something you have read on this website.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Affiliate Disclosure</h2>
            <p className="text-gray-600 mb-4">
              This website may contain affiliate links. If you purchase a product or service through these links, 
              we may receive a commission. This helps support our website and allows us to continue to provide 
              valuable information. We only recommend products or services that we believe will add value to our users.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Investment Risks</h2>
            <p className="text-gray-600 mb-4">
              Investing involves risk, including the potential loss of principal. No investment strategy can guarantee 
              a profit or protect against loss in periods of declining values. Past performance does not guarantee future results.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Third-Party Links</h2>
            <p className="text-gray-600 mb-4">
              This website may contain links to external websites that are not provided or maintained by us. 
              We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on 
              these external websites.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Updates</h2>
            <p className="text-gray-600 mb-4">
              We may update our legal disclosures from time to time. We encourage visitors to frequently check 
              this page for any changes. Your continued use of this website after any changes to these disclosures 
              constitutes your acceptance of such changes.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these legal disclosures, please contact us at:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Phone: (833) 224-5517</li>
              <li>Email: info@survival401k.com</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LegalDisclosures;
