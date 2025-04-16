
import React from 'react';
import { Card } from '@/components/ui/card';
import { DollarSign, Shield, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-survival-800">Pricing</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-survival-50 rounded-lg p-8 shadow-sm text-center border-2 border-survival-200">
          <div className="flex items-center justify-center mb-4">
            <DollarSign className="h-8 w-8 text-finance-600 mr-2" />
            <h3 className="text-3xl font-bold text-survival-800">$1,200</h3>
          </div>
          <p className="text-lg mb-4 text-gray-600">
            Comprehensive Solo 401k Plan Documentation and Setup
          </p>
          <div className="flex items-center justify-center text-finance-600 text-sm mb-4">
            <CalendarCheck className="h-4 w-4 mr-1" />
            <span>2025 Contribution Year Ready</span>
          </div>
          <Link to="/apply/solo-401k">
            <Button size="lg" className="bg-survival-600 hover:bg-survival-700 text-white font-medium">
              Get Started
            </Button>
          </Link>
        </div>
        
        <div className="bg-survival-50 rounded-lg p-8 shadow-sm text-center border-2 border-survival-200">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-finance-600 mr-2" />
            <h3 className="text-3xl font-bold text-survival-800">$200</h3>
          </div>
          <p className="text-lg mb-2 text-gray-600">
            Annual Maintenance Fee
          </p>
          <p className="text-sm text-gray-500 mb-4">
            For IRS compliance and unlimited support
          </p>
          <Link to="/payment/annual-fee">
            <Button size="lg" className="bg-survival-600 hover:bg-survival-700 text-white font-medium">
              Pay Annual Fee
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
