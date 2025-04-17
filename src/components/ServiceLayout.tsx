
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface ServiceLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  image?: string;
  callToAction?: {
    text: string;
    link: string;
  };
}

const ServiceLayout = ({ 
  children, 
  title, 
  description, 
  image = "/images/service-default.jpg",
  callToAction = { text: "Contact Us", link: "/contact" }
}: ServiceLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-survival-800 to-survival-900 text-white">
          <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 sm:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-sm text-white/70 mb-2">Common Sense Wealth Management</p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
                <p className="text-lg text-white/80 mb-8">{description}</p>
                <Link to={callToAction.link}>
                  <Button size="lg" className="bg-finance-600 hover:bg-finance-700 text-white font-medium">
                    {callToAction.text}
                  </Button>
                </Link>
              </div>
              <div className="hidden md:block">
                {/* Placeholder for service-specific illustration */}
              </div>
            </div>
          </div>
        </div>
        
        {/* Service Content */}
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceLayout;

