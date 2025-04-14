import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [currentSavings, setCurrentSavings] = useState<number>(50000);
  const [annualContribution, setAnnualContribution] = useState<number>(6000);
  const [expectedReturn, setExpectedReturn] = useState<number>(7);
  const [inflationRate, setInflationRate] = useState<number>(2.5);
  const [result, setResult] = useState<number | null>(null);

  const calculateRetirementSavings = () => {
    const yearsToRetirement = retirementAge - currentAge;
    let totalSavings = currentSavings;
    
    for (let i = 0; i < yearsToRetirement; i++) {
      totalSavings += annualContribution;
      totalSavings *= (1 + expectedReturn / 100);
      totalSavings /= (1 + inflationRate / 100);
    }
    
    setResult(Math.round(totalSavings));
  };

  useEffect(() => {
    calculateRetirementSavings();
  }, [currentAge, retirementAge, currentSavings, annualContribution, expectedReturn, inflationRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-survival-800">
            Retirement Savings Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Plan your future with our retirement calculator and see how a Solo 401k can help maximize your savings.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5 text-survival-600" />
                Your Information
              </CardTitle>
              <CardDescription>
                Adjust the sliders to see how different factors affect your retirement savings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="currentAge">Current Age: {currentAge}</Label>
                  <span className="text-sm text-gray-500">{currentAge} years</span>
                </div>
                <Slider
                  id="currentAge"
                  min={18}
                  max={80}
                  step={1}
                  value={[currentAge]}
                  onValueChange={(value) => setCurrentAge(value[0])}
                  className="[&>span]:bg-survival-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="retirementAge">Retirement Age: {retirementAge}</Label>
                  <span className="text-sm text-gray-500">{retirementAge} years</span>
                </div>
                <Slider
                  id="retirementAge"
                  min={Math.max(currentAge + 1, 50)}
                  max={85}
                  step={1}
                  value={[retirementAge]}
                  onValueChange={(value) => setRetirementAge(value[0])}
                  className="[&>span]:bg-survival-600"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentSavings">Current Savings</Label>
                <Input
                  id="currentSavings"
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="annualContribution">Annual Contribution</Label>
                <Input
                  id="annualContribution"
                  type="number"
                  value={annualContribution}
                  onChange={(e) => setAnnualContribution(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="expectedReturn">Expected Return: {expectedReturn}%</Label>
                  <span className="text-sm text-gray-500">{expectedReturn}%</span>
                </div>
                <Slider
                  id="expectedReturn"
                  min={1}
                  max={15}
                  step={0.5}
                  value={[expectedReturn]}
                  onValueChange={(value) => setExpectedReturn(value[0])}
                  className="[&>span]:bg-survival-600"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="inflationRate">Inflation Rate: {inflationRate}%</Label>
                  <span className="text-sm text-gray-500">{inflationRate}%</span>
                </div>
                <Slider
                  id="inflationRate"
                  min={0}
                  max={10}
                  step={0.5}
                  value={[inflationRate]}
                  onValueChange={(value) => setInflationRate(value[0])}
                  className="[&>span]:bg-survival-600"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-survival-600 hover:bg-survival-700" 
                onClick={calculateRetirementSavings}
              >
                Calculate
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Results</CardTitle>
              <CardDescription>
                Projected retirement savings adjusted for inflation
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full flex flex-col justify-center">
              {result !== null && (
                <div className="text-center py-8">
                  <div className="text-4xl font-bold text-survival-700 mb-3">
                    {formatCurrency(result)}
                  </div>
                  <p className="text-gray-600">
                    Estimated savings at age {retirementAge}
                  </p>
                  <div className="mt-6 p-4 bg-survival-50 rounded-lg">
                    <p className="text-survival-800 font-medium">
                      With a Solo 401k, you could potentially contribute up to {formatCurrency(Math.min(69000, annualContribution * 2))} per year for 2025
                      (compared to {formatCurrency(annualContribution)} in your current projection).
                    </p>
                    <p className="mt-2 text-survival-600">
                      This could significantly increase your retirement savings!
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                variant="outline" 
                className="border-survival-600 text-survival-600 hover:bg-survival-50"
                onClick={() => window.location.href = "/services/solo-401k"}
              >
                Learn More About Solo 401k
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RetirementCalculator;
