
import React, { useState } from 'react';
import { RetirementForm } from './retirement/RetirementForm';
import { RetirementResults } from './retirement/RetirementResults';

interface YearlyGrowth {
  year: number;
  balance: number;
  contribution: number;
  growth: number;
}

export const RetirementCalculator = () => {
  // Form inputs
  const [annualContribution, setAnnualContribution] = useState(35000);
  const [initialBalance, setInitialBalance] = useState(0);
  const [growthRate, setGrowthRate] = useState(7);
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(65);
  
  // Results
  const [showResults, setShowResults] = useState(false);
  const [projectionData, setProjectionData] = useState<YearlyGrowth[]>([]);
  const [projectedBalance, setProjectedBalance] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalGrowth, setTotalGrowth] = useState(0);
  
  const calculateProjection = () => {
    const yearsToProject = 20;
    let balance = initialBalance;
    let yearlyData: YearlyGrowth[] = [];
    let totalContrib = 0;
    
    for (let year = 1; year <= yearsToProject; year++) {
      const yearlyGrowth = balance * (growthRate / 100);
      balance += yearlyGrowth + annualContribution;
      totalContrib += annualContribution;
      
      yearlyData.push({
        year,
        balance: Math.round(balance),
        contribution: annualContribution,
        growth: Math.round(yearlyGrowth)
      });
    }
    
    setProjectionData(yearlyData);
    setProjectedBalance(balance);
    setTotalContributions(totalContrib);
    setTotalGrowth(balance - initialBalance - totalContrib);
    setShowResults(true);
  };
  
  const solo401kContribution = Math.min(70000, annualContribution * 2);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Retirement Savings Calculator</h1>
      
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <RetirementForm
          currentAge={currentAge}
          setCurrentAge={setCurrentAge}
          retirementAge={retirementAge}
          setRetirementAge={setRetirementAge}
          initialBalance={initialBalance}
          setInitialBalance={setInitialBalance}
          annualContribution={annualContribution}
          setAnnualContribution={setAnnualContribution}
          growthRate={growthRate}
          setGrowthRate={setGrowthRate}
          onCalculate={calculateProjection}
        />
        
        {showResults && (
          <RetirementResults
            projectionData={projectionData}
            projectedBalance={projectedBalance}
            totalContributions={totalContributions}
            totalGrowth={totalGrowth}
            annualContribution={annualContribution}
            solo401kContribution={solo401kContribution}
          />
        )}
      </div>
    </div>
  );
};

export default RetirementCalculator;
