
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Retirement Plans for Entrepreneurs & 1st Responders
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Self-directed retirement solutions designed for entrepreneurs, small business owners, and independent professionals.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/services/solo-401k">
                <Button className="bg-finance-600 hover:bg-finance-700 text-white">
                  Explore Solo 401k
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/services/alternative-investments">
                <Button variant="outline" className="border-finance-600 text-finance-600 hover:bg-finance-50">
                  Alternative Investments
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-finance-100 to-survival-100 rounded-lg p-6 shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Professionals Choose Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Specialized expertise in self-directed retirement plans</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Tailored solutions for entrepreneurs and first responders</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Personalized support throughout the entire process</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Transparent pricing with no hidden fees</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Educational resources to help you make informed decisions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
