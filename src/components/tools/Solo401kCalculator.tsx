
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, DollarSign, PiggyBank } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

const businessTypes = [
  { value: 'sole-proprietor', label: 'Sole Proprietorship' },
  { value: 'llc', label: 'Limited Liability Company (LLC)' },
  { value: 'first-responder', label: 'First Responder' }
] as const;

const Solo401kCalculator = () => {
  const [businessType, setBusinessType] = useState<string>(businessTypes[0].value);
  const [income, setIncome] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const isMobile = useIsMobile();

  // Constants for 2025 contribution limits
  const EMPLOYEE_CONTRIBUTION_LIMIT = 23500;     // Base limit for 2025
  const CATCH_UP_CONTRIBUTION = 7500;            // Age 50+ catch-up for 2025
  const MAX_TOTAL_CONTRIBUTION = 77500;          // Updated max for age 50+ in 2025
  const MAX_TOTAL_UNDER_50 = 70000;             // Max for under 50 in 2025
  const SE_TAX_RATE = 0.153;                    // 15.3% Self-employment tax rate
  const SE_TAX_DEDUCTION = 0.5;                 // 50% of SE tax is deductible

  const calculateContributions = () => {
    const annualIncome = parseFloat(income) || 0;
    const participantAge = parseInt(age) || 0;
    const isOver50 = participantAge >= 50;
    
    // Calculate self-employment tax and deduction
    const seTax = annualIncome * SE_TAX_RATE;
    const seTaxDeduction = seTax * SE_TAX_DEDUCTION;
    
    // Adjusted net earnings (income minus half of SE tax)
    const adjustedIncome = annualIncome - seTaxDeduction;
    
    // Employee contribution (up to $23,500 in 2025)
    const baseEmployeeContribution = Math.min(adjustedIncome, EMPLOYEE_CONTRIBUTION_LIMIT);
    
    // Catch-up contribution if age 50 or older
    const catchUpAmount = isOver50 ? CATCH_UP_CONTRIBUTION : 0;
    
    // Determine maximum total contribution based on age
    const applicableMaxTotal = isOver50 ? MAX_TOTAL_CONTRIBUTION : MAX_TOTAL_UNDER_50;
    
    // Employer contribution (up to 25% of compensation after SE tax deduction)
    const maxEmployerContribution = adjustedIncome * 0.25;
    const employerContribution = Math.min(
      maxEmployerContribution,
      applicableMaxTotal - baseEmployeeContribution - catchUpAmount
    );
    
    // Calculate tax savings (assuming 24% marginal tax rate)
    const estimatedTaxSavings = (baseEmployeeContribution + catchUpAmount + employerContribution) * 0.24;
    
    return {
      employeeContribution: baseEmployeeContribution,
      catchUpContribution: catchUpAmount,
      employerContribution: employerContribution,
      totalContribution: baseEmployeeContribution + catchUpAmount + employerContribution,
      seTax: seTax,
      seTaxDeduction: seTaxDeduction,
      estimatedTaxSavings: estimatedTaxSavings
    };
  };

  const results = calculateContributions();

  return (
    <Card className="p-4 sm:p-6 max-w-full sm:max-w-2xl mx-auto">
      <div className="space-y-6 sm:space-y-8">
        <div className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-survival-800">
          <Calculator className="h-5 w-5 sm:h-6 sm:w-6" />
          <h2>Solo 401(k) Contribution Calculator</h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="businessType">Business Type</Label>
            <Select value={businessType} onValueChange={setBusinessType}>
              <SelectTrigger id="businessType">
                <SelectValue placeholder="Select your business type" />
              </SelectTrigger>
              <SelectContent>
                {businessTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="income">Annual Business Income ($)</Label>
            <Input
              id="income"
              type="number"
              inputMode="numeric"
              placeholder="Enter your annual income"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="age">Your Age</Label>
            <Input
              id="age"
              type="number"
              inputMode="numeric"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>

        {income && age && (
          <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-survival-700">
              <PiggyBank className="h-4 w-4 sm:h-5 sm:w-5" />
              Contribution Limits for 2025
            </h3>
            
            <div className={`grid gap-3 text-sm ${isMobile ? 'text-xs' : 'text-sm'}`}>
              <div className="flex justify-between items-center">
                <span>Employee Contribution:</span>
                <span className="font-semibold text-survival-700 flex items-center">
                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                  {results.employeeContribution.toLocaleString()}
                </span>
              </div>
              
              {results.catchUpContribution > 0 && (
                <div className="flex justify-between items-center">
                  <span>Catch-up Contribution (Age 50+):</span>
                  <span className="font-semibold text-survival-700 flex items-center">
                    <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                    {results.catchUpContribution.toLocaleString()}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span>Employer Contribution:</span>
                <span className="font-semibold text-survival-700 flex items-center">
                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                  {results.employerContribution.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center border-t pt-2">
                <span>Self-Employment Tax (15.3%):</span>
                <span className="font-semibold text-survival-700 flex items-center">
                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                  {Math.round(results.seTax).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>SE Tax Deduction:</span>
                <span className="font-semibold text-survival-700 flex items-center">
                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                  {Math.round(results.seTaxDeduction).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Estimated Tax Savings:</span>
                <span className="font-semibold text-green-600 flex items-center">
                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
                  {Math.round(results.estimatedTaxSavings).toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium">Total Potential Contribution:</span>
                <span className="font-bold text-base sm:text-lg text-survival-700 flex items-center">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
                  {results.totalContribution.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Solo401kCalculator;
