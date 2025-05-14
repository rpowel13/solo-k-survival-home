
import React from 'react';
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroBenefitsCard: React.FC = () => {
  return (
    <div 
      className="bg-white rounded-xl p-10 shadow-2xl border-8 border-survival-100 transform hover:scale-[1.02] transition-all duration-300" 
      style={{ 
        boxShadow: "0 25px 60px rgba(8, 28, 86, 0.6), 0 0 0 6px rgba(255, 255, 255, 0.4)"
      }}>
      <h2 className="text-2xl font-bold text-survival-800 mb-6">Top Benefits</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* LLC Benefits */}
        <div className="text-left">
          <h3 className="text-lg font-semibold text-survival-700 mb-3 border-b border-survival-100 pb-2">LLC Benefits</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-survival-600 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Personal liability protection</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-survival-600 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Pass-through taxation</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-survival-600 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Management flexibility</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-survival-600 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Credibility with customers</span>
            </li>
          </ul>
        </div>
        
        {/* Solo 401k Benefits */}
        <div className="text-left">
          <h3 className="text-lg font-semibold text-finance-700 mb-3 border-b border-finance-100 pb-2">Solo 401k Benefits</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-finance-600 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Higher contribution limits</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-finance-600 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Self-directed investing options</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-finance-600 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Loan provisions available</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-finance-600 mr-3 mt-1 flex-shrink-0" />
              <span className="text-gray-700">Traditional and Roth options</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center space-x-6">
        <Link to="/services/llc-creation">
          <Button variant="outline" size="sm" className="border-survival-600 text-survival-700 hover:bg-survival-50">
            Learn about LLCs
          </Button>
        </Link>
        <Link to="/services/solo-401k">
          <Button variant="outline" size="sm" className="border-finance-600 text-finance-700 hover:bg-finance-50">
            Explore Solo 401k
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroBenefitsCard;
