
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-survival-800 py-12 md:py-20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white bg-survival-700 p-4 rounded-lg">
              Retirement Plans for Entrepreneurs & 1st Responders
            </h1>
            <p className="mt-4 text-xl text-gray-200">
              Self-directed retirement solutions designed for entrepreneurs, first responders, small business owners, independent professionals, and gig economy workers.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/services/solo-401k">
                <Button className="bg-white text-survival-800 hover:bg-gray-100">
                  Explore Solo 401k
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div 
                className="bg-white rounded-xl p-10 shadow-2xl border-8 border-survival-100 transform hover:scale-[1.02] transition-all duration-300" 
                style={{ 
                  boxShadow: "0 25px 60px rgba(8, 28, 86, 0.6), 0 0 0 6px rgba(255, 255, 255, 0.4)"
                }}>
              <h3 className="text-2xl font-bold text-survival-800 mb-6">Why Professionals Choose Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-survival-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Specialized expertise in self-directed retirement plans</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-survival-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Tailored solutions for entrepreneurs and first responders</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-survival-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Personalized support throughout the entire process</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-survival-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Transparent pricing with no hidden fees</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-survival-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Educational resources to help you make informed decisions</span>
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

