
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
              Self-directed retirement solutions designed for entrepreneurs, small business owners, and independent professionals.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/services/solo-401k">
                <Button className="bg-white text-survival-800 hover:bg-gray-100">
                  Explore Solo 401k
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-md shadow-[0_20px_50px_rgba(8,28,86,0.5)] border border-white/20 transform hover:scale-[1.01] transition-all duration-300" 
                style={{ 
                  background: "linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
                  boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.3), 0 20px 50px rgba(8, 28, 86, 0.5)"
                }}>
              <h3 className="text-2xl font-bold text-white mb-4">Why Professionals Choose Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-200">Specialized expertise in self-directed retirement plans</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-200">Tailored solutions for entrepreneurs and first responders</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-200">Personalized support throughout the entire process</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-200">Transparent pricing with no hidden fees</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-white mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-200">Educational resources to help you make informed decisions</span>
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
