
import React, { useState } from 'react';
import { formatCurrency } from '@/utils/metalPriceUtils';

export const RetirementCalculator = () => {
  const [annualContribution, setAnnualContribution] = useState(35000);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Retirement Savings Calculator</h1>
      
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <label htmlFor="annualContribution" className="block text-sm font-medium text-gray-700 mb-1">
            Current Annual Contribution
          </label>
          <input
            type="number"
            id="annualContribution"
            value={annualContribution}
            onChange={(e) => setAnnualContribution(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
            min="0"
            max="150000"
          />
        </div>
        
        <div className="mt-6 p-4 bg-survival-50 rounded-lg">
          <p className="text-survival-800 font-medium">
            With a Solo 401k, you could potentially contribute up to {formatCurrency(Math.min(70000, annualContribution * 2))} per year for 2025
            (compared to {formatCurrency(annualContribution)} in your current projection).
          </p>
          <p className="mt-2 text-survival-600">
            This could significantly increase your retirement savings!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RetirementCalculator;
