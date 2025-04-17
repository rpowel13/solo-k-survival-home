
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { formatCurrency } from '@/utils/metalPriceUtils';

interface RetirementFormProps {
  currentAge: number;
  setCurrentAge: (age: number) => void;
  retirementAge: number;
  setRetirementAge: (age: number) => void;
  initialBalance: number;
  setInitialBalance: (balance: number) => void;
  annualContribution: number;
  setAnnualContribution: (contribution: number) => void;
  growthRate: number;
  setGrowthRate: (rate: number) => void;
  onCalculate: () => void;
}

export const RetirementForm = ({
  currentAge,
  setCurrentAge,
  retirementAge,
  setRetirementAge,
  initialBalance,
  setInitialBalance,
  annualContribution,
  setAnnualContribution,
  growthRate,
  setGrowthRate,
  onCalculate,
}: RetirementFormProps) => {
  const solo401kContribution = Math.min(70000, annualContribution * 2);

  return (
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

      <div className="flex justify-center mt-6 md:col-span-2">
        <Button 
          onClick={onCalculate}
          className="bg-survival-600 hover:bg-survival-700 text-white"
          size="lg"
        >
          Calculate Projection
        </Button>
      </div>
    </div>
  );
};
