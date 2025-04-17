
import React from 'react';
import { formatCurrency } from '@/utils/metalPriceUtils';
import { RetirementChart } from './RetirementChart';

interface YearlyGrowth {
  year: number;
  balance: number;
  contribution: number;
  growth: number;
}

interface RetirementResultsProps {
  projectionData: YearlyGrowth[];
  projectedBalance: number;
  totalContributions: number;
  totalGrowth: number;
  annualContribution: number;
  solo401kContribution: number;
}

export const RetirementResults = ({
  projectionData,
  projectedBalance,
  totalContributions,
  totalGrowth,
  annualContribution,
  solo401kContribution,
}: RetirementResultsProps) => {
  return (
    <div className="mt-10 space-y-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-center">Your 20-Year Retirement Projection</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-survival-50 to-survival-100 p-4 rounded-lg text-center">
          <h3 className="text-sm text-survival-600 mb-1">Projected Balance</h3>
          <p className="text-2xl font-bold text-survival-800">{formatCurrency(projectedBalance)}</p>
        </div>
        <div className="bg-gradient-to-br from-soft-blue/20 to-soft-blue/10 p-4 rounded-lg text-center">
          <h3 className="text-sm text-survival-600 mb-1">Total Contributions</h3>
          <p className="text-2xl font-bold text-survival-800">{formatCurrency(totalContributions)}</p>
        </div>
        <div className="bg-gradient-to-br from-soft-purple/20 to-soft-purple/10 p-4 rounded-lg text-center">
          <h3 className="text-sm text-survival-600 mb-1">Total Growth</h3>
          <p className="text-2xl font-bold text-survival-800">{formatCurrency(totalGrowth)}</p>
        </div>
      </div>
      
      <RetirementChart projectionData={projectionData} />
      
      <div className="p-6 bg-gradient-to-r from-survival-50 to-survival-100 rounded-lg border border-survival-200 shadow-sm">
        <h3 className="font-semibold text-xl mb-3 text-survival-800">With a Solo 401(k) Plan:</h3>
        <p className="mb-3 text-survival-700">
          If you increased your annual contribution to {formatCurrency(solo401kContribution)} using a 
          Solo 401(k), your projected balance after 20 years could be approximately 
          {' '}{formatCurrency(projectedBalance * (solo401kContribution / annualContribution))}!
        </p>
        <p className="text-lg font-medium text-survival-800">
          That's potentially {formatCurrency(projectedBalance * (solo401kContribution / annualContribution) - projectedBalance)} more
          for your retirement!
        </p>
      </div>
    </div>
  );
};
