import React, { useState } from 'react';
import { formatCurrency } from '@/utils/metalPriceUtils';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    const yearsToProject = 20; // Always project 20 years for consistency
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
  
  // Projected Solo 401k contribution amount (up to 2x, max 70k)
  const solo401kContribution = Math.min(70000, annualContribution * 2);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Retirement Savings Calculator</h1>
      
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="currentAge" className="block text-sm font-medium text-gray-700 mb-1">
              Current Age
            </Label>
            <Input
              type="number"
              id="currentAge"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              className="w-full"
              min="18"
              max="80"
            />
          </div>
          
          <div>
            <Label htmlFor="retirementAge" className="block text-sm font-medium text-gray-700 mb-1">
              Retirement Age
            </Label>
            <Input
              type="number"
              id="retirementAge"
              value={retirementAge}
              onChange={(e) => setRetirementAge(Number(e.target.value))}
              className="w-full"
              min={currentAge + 1}
              max="90"
            />
          </div>
          
          <div>
            <Label htmlFor="initialBalance" className="block text-sm font-medium text-gray-700 mb-1">
              Current Retirement Savings
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                type="number"
                id="initialBalance"
                value={initialBalance}
                onChange={(e) => setInitialBalance(Number(e.target.value))}
                className="pl-7 w-full bg-soft-gray border-neutral-300 focus:ring-survival-500 focus:border-survival-500"
                min="0"
                placeholder="Enter current savings"
                step="1000"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Include 401(k), IRAs, and other retirement accounts
            </p>
          </div>
          
          <div>
            <Label htmlFor="annualContribution" className="block text-sm font-medium text-gray-700 mb-1">
              Current Annual Contribution
            </Label>
            <Input
              type="number"
              id="annualContribution"
              value={annualContribution}
              onChange={(e) => setAnnualContribution(Number(e.target.value))}
              className="w-full"
              min="0"
              max="150000"
            />
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="growthRate" className="block text-sm font-medium text-gray-700 mb-1">
              Expected Annual Return Rate: {growthRate}%
            </Label>
            <Slider
              id="growthRate"
              value={[growthRate]}
              onValueChange={(value) => setGrowthRate(value[0])}
              min={1}
              max={12}
              step={0.5}
              className="w-full mt-2"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1%</span>
              <span>Conservative</span>
              <span>Moderate</span>
              <span>Aggressive</span>
              <span>12%</span>
            </div>
          </div>
          
          <div className="mt-4 md:col-span-2">
            <div className="p-4 bg-survival-50 rounded-lg">
              <p className="text-survival-800 font-medium">
                With a Solo 401k, you could potentially contribute up to {formatCurrency(solo401kContribution)} per year
                (compared to {formatCurrency(annualContribution)} in your current projection).
              </p>
              <p className="mt-2 text-survival-600">
                This could significantly increase your retirement savings!
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <Button 
            onClick={calculateProjection}
            className="bg-survival-600 hover:bg-survival-700 text-white"
            size="lg"
          >
            Calculate Projection
          </Button>
        </div>
        
        {showResults && (
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
            
            <div className="h-96 bg-white p-4 rounded-lg shadow-inner mb-12">
              <h3 className="text-lg font-semibold mb-4">Growth Projection Chart</h3>
              <div className="h-80">
                <ChartContainer config={{
                  balance: { label: "Balance", color: "#6E59A5" },
                  contribution: { label: "Contribution", color: "#33C3F0" },
                  growth: { label: "Growth", color: "#F97316" }
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart 
                      data={projectionData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="year" 
                        label={{ value: 'Years', position: 'insideBottom', offset: -5 }} 
                      />
                      <YAxis 
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} 
                        label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="balance" 
                        name="Balance" 
                        stackId="1" 
                        stroke="#6E59A5" 
                        fill="#6E59A5" 
                        fillOpacity={0.6} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
            
            {/* Move the Solo 401k plan information outside and below the chart */}
            <div className="p-6 bg-gradient-to-r from-soft-orange/30 to-soft-yellow/30 rounded-lg">
              <h3 className="font-semibold text-xl mb-3">With a Solo 401(k) Plan:</h3>
              <p className="mb-3 text-lg">
                If you increased your annual contribution to {formatCurrency(solo401kContribution)} using a 
                Solo 401(k), your projected balance after 20 years could be approximately 
                {' '}{formatCurrency(projectedBalance * (solo401kContribution / annualContribution))}!
              </p>
              <p className="text-lg font-medium">
                That's potentially {formatCurrency(projectedBalance * (solo401kContribution / annualContribution) - projectedBalance)} more
                for your retirement!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-3 border border-gray-200 shadow-lg rounded-md">
        <p className="font-bold">Year {label}</p>
        <p className="text-[#6E59A5]">
          Balance: {formatCurrency(payload[0].value)}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Annual Growth: {formatCurrency(payload[0].payload.growth)}
        </p>
      </div>
    );
  }

  return null;
};

export default RetirementCalculator;
