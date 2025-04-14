
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
              Take Control of Your Retirement
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Self-directed retirement solutions designed for entrepreneurs, small business owners, and independent professionals.
            </p>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-5 w-5 text-finance-600" />
                </div>
                <p className="ml-3 text-gray-600">Complete control over your investment choices</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-5 w-5 text-finance-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Higher Contribution Limits</h4>
                  <p className="text-gray-600">Contribute up to $70,000 annually (2025)</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Check className="h-5 w-5 text-finance-600" />
                </div>
                <p className="ml-3 text-gray-600">Diversify with alternative assets like real estate and precious metals</p>
              </div>
            </div>
            
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
            {/* Image or illustration would go here */}
            <div className="bg-gradient-to-br from-finance-100 to-survival-100 rounded-lg aspect-[4/3] flex items-center justify-center">
              <div className="text-center p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Financial Freedom Starts Here</h3>
                <p className="text-gray-600 mb-6">Take the first step toward a secure retirement with our personalized solutions.</p>
                <Link to="/tools/retirement-calculator">
                  <Button variant="outline" className="border-finance-600 text-finance-600 hover:bg-finance-50">
                    Try Our Calculator
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
