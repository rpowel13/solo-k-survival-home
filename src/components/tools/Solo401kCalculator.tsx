
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign, PiggyBank } from 'lucide-react';

const businessTypes = [
  { value: 'sole-proprietor', label: 'Sole Proprietorship' },
  { value: 'llc', label: 'Limited Liability Company (LLC)' },
  { value: 'first-responder', label: 'First Responder' }
] as const;

const Solo401kCalculator = () => {
  const [businessType, setBusinessType] = useState<string>(businessTypes[0].value);
  const [income, setIncome] = useState<string>('');
  const [age, setAge] = useState<string>('');

  // Constants for 2025 contribution limits
  const EMPLOYEE_CONTRIBUTION_LIMIT = 23500;  // Increased from $23,000 in 2024
  const CATCH_UP_CONTRIBUTION = 7500;         // Remains the same for 2025
  const MAX_TOTAL_CONTRIBUTION = 70000;       // Updated from $69,000 to $70,000 for 2025

  const calculateContributions = () => {
    const annualIncome = parseFloat(income) || 0;
    const participantAge = parseInt(age) || 0;
    
    // Employee contribution (up to $23,500 in 2025)
    const baseEmployeeContribution = Math.min(annualIncome, EMPLOYEE_CONTRIBUTION_LIMIT);
    
    // Catch-up contribution if age 50 or older
    const catchUpAmount = participantAge >= 50 ? CATCH_UP_CONTRIBUTION : 0;
    
    // Employer contribution (up to 25% of compensation)
    const employerContribution = Math.min(annualIncome * 0.25, MAX_TOTAL_CONTRIBUTION - baseEmployeeContribution - catchUpAmount);
    
    return {
      employeeContribution: baseEmployeeContribution,
      catchUpContribution: catchUpAmount,
      employerContribution: employerContribution,
      totalContribution: baseEmployeeContribution + catchUpAmount + employerContribution
    };
  };

  const results = calculateContributions();

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="space-y-8">
        <div className="flex items-center gap-2 text-2xl font-semibold text-survival-800">
          <Calculator className="h-6 w-6" />
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
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>

        {income && age && (
          <div className="mt-6 space-y-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-survival-700">
              <PiggyBank className="h-5 w-5" />
              Contribution Limits for 2025
            </h3>
            
            <div className="grid gap-4 text-sm">
              <div className="flex justify-between items-center">
                <span>Employee Contribution:</span>
                <span className="font-semibold text-survival-700 flex items-center">
                  <DollarSign className="h-4 w-4" />
                  {results.employeeContribution.toLocaleString()}
                </span>
              </div>
              
              {results.catchUpContribution > 0 && (
                <div className="flex justify-between items-center">
                  <span>Catch-up Contribution (Age 50+):</span>
                  <span className="font-semibold text-survival-700 flex items-center">
                    <DollarSign className="h-4 w-4" />
                    {results.catchUpContribution.toLocaleString()}
                  </span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span>Employer Contribution:</span>
                <span className="font-semibold text-survival-700 flex items-center">
                  <DollarSign className="h-4 w-4" />
                  {results.employerContribution.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium">Total Potential Contribution:</span>
                <span className="font-bold text-lg text-survival-700 flex items-center">
                  <DollarSign className="h-5 w-5" />
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
