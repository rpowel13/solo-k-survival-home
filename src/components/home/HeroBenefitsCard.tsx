import React from 'react';
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from '@/hooks/use-mobile';
import HeroPrequalificationQuiz from "./HeroPrequalificationQuiz";

const HeroBenefitsCard: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div 
      className={`bg-white rounded-xl ${isMobile ? 'p-6' : 'p-10'} shadow-2xl border-8 border-survival-100 transform hover:scale-[1.01] transition-all duration-300`} 
      style={{ 
        boxShadow: isMobile ? "0 15px 30px rgba(8, 28, 86, 0.5), 0 0 0 4px rgba(255, 255, 255, 0.4)" : 
                  "0 25px 60px rgba(8, 28, 86, 0.6), 0 0 0 6px rgba(255, 255, 255, 0.4)"
      }}>
      <h2 className="text-xl md:text-2xl font-bold text-survival-800 mb-5">Top Benefits</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* LLC Benefits */}
        <div className="text-left">
          <h3 className="text-lg font-semibold text-survival-700 mb-2 border-b border-survival-100 pb-1">LLC Benefits</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-survival-600 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700 text-sm">Personal liability protection</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-survival-600 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700 text-sm">Pass-through taxation</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-survival-600 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700 text-sm">Management flexibility</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-survival-600 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700 text-sm">Credibility with customers</span>
            </li>
          </ul>
        </div>
        
        {/* Solo 401k Benefits */}
        <div className="text-left">
          <h3 className="text-lg font-semibold text-finance-700 mb-2 border-b border-finance-100 pb-1">Solo 401k Benefits</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Check className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700 text-sm">Higher contribution limits</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700 text-sm">Self-directed investing options</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700 text-sm">Loan provisions available</span>
            </li>
            <li className="flex items-start">
              <Check className="h-5 w-5 text-finance-600 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700 text-sm">Traditional and Roth options</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-5 flex flex-wrap gap-2 justify-center">
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

      {/* Insert prequalification quiz under the benefits section */}
      <HeroPrequalificationQuiz />
    </div>
  );
};

export default HeroBenefitsCard;
