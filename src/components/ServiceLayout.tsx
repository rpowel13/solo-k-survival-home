
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

interface ServiceLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  image?: string;
  callToAction?: {
    text: string;
    link: string;
  };
  topFeatures?: string[];
}

const ServiceLayout = ({ 
  children, 
  title, 
  description, 
  image = "/images/service-default.jpg",
  callToAction = { text: "Contact Us", link: "/contact" },
  topFeatures = []
}: ServiceLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section - Mobile Optimized */}
        <div className="bg-gradient-to-r from-survival-800 to-survival-900 text-white">
          <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="text-center md:text-left">
                <p className="text-xs sm:text-sm text-white/70 mb-2">Common Sense Wealth Management</p>
                <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4">{title}</h1>
                <p className="text-sm sm:text-base lg:text-lg text-white/80 mb-6 sm:mb-8 max-w-xl mx-auto md:mx-0">{description}</p>
                <Link to={callToAction.link}>
                  <Button size="lg" className="w-full sm:w-auto bg-finance-600 hover:bg-finance-700 text-white font-medium">
                    {callToAction.text}
                  </Button>
                </Link>
              </div>
              <div className="hidden md:block">
                {topFeatures && topFeatures.length > 0 ? (
                  <div className="bg-purple-100 bg-opacity-90 rounded-xl p-6 shadow-lg border border-purple-200">
                    <h3 className="text-xl font-semibold text-survival-900 mb-4">Top Features & Benefits</h3>
                    <ul className="space-y-3">
                      {topFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-800">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  /* Placeholder for service-specific illustration */
                  null
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Service Content */}
        <div className="container mx-auto py-6 sm:py-8 lg:py-12 px-4 sm:px-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceLayout;
