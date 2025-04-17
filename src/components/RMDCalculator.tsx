import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Calculator, Printer } from "lucide-react";

interface FutureRMD {
  age: number;
  year: number;
  balance: number;
  distributionFactor: number;
  rmdAmount: number;
  remainingBalance: number;
}

const RMDCalculator = () => {
  const [birthdate, setBirthdate] = useState<string>("");
  const [accountBalance, setAccountBalance] = useState<number>(0);
  const [growthRate, setGrowthRate] = useState<number>(5);
  const [rmdAmount, setRmdAmount] = useState<number | null>(null);
  const [distributionFactor, setDistributionFactor] = useState<number | null>(null);
  const [futureRMDs, setFutureRMDs] = useState<FutureRMD[]>([]);

  const calculateAge = (birthdate: string): number => {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const getDistributionFactor = (age: number): number => {
    const factors: { [key: number]: number } = {
      72: 27.4, 73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9,
      78: 22.0, 79: 21.1, 80: 20.2, 81: 19.4, 82: 18.5, 83: 17.7,
      84: 16.8, 85: 16.0, 86: 15.2, 87: 14.4, 88: 13.7, 89: 12.9,
      90: 12.2, 91: 11.5, 92: 10.8, 93: 10.1, 94: 9.5, 95: 8.9,
      96: 8.4, 97: 7.8, 98: 7.3, 99: 6.8, 100: 6.4, 101: 6.0,
      102: 5.6, 103: 5.2, 104: 4.9, 105: 4.6, 106: 4.3,
      107: 4.1, 108: 3.9, 109: 3.7, 110: 3.5, 111: 3.4,
      112: 3.3, 113: 3.1, 114: 3.0, 115: 2.9, 116: 2.8,
      117: 2.7, 118: 2.5, 119: 2.3, 120: 2.0
    };
    return factors[age] || 0;
  };

  const calculateRMD = () => {
    if (!birthdate) return;
    
    const currentAge = calculateAge(birthdate);
    if (currentAge < 72) {
      setRmdAmount(0);
      setDistributionFactor(0);
      setFutureRMDs([]);
      return;
    }

    const factor = getDistributionFactor(currentAge);
    setDistributionFactor(factor);
    const currentRMD = accountBalance / factor;
    setRmdAmount(currentRMD);

    const futureProjections: FutureRMD[] = [];
    let projectedBalance = accountBalance;
    const currentYear = new Date().getFullYear();

    for (let age = currentAge; age <= Math.min(90, 120); age++) {
      const yearFactor = getDistributionFactor(age);
      const rmdAmount = projectedBalance / yearFactor;
      const remainingBalance = projectedBalance - rmdAmount;
      
      futureProjections.push({
        age,
        year: currentYear + (age - currentAge),
        balance: projectedBalance,
        distributionFactor: yearFactor,
        rmdAmount,
        remainingBalance
      });

      projectedBalance = remainingBalance * (1 + growthRate / 100);
    }

    setFutureRMDs(futureProjections);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-6 mb-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <Label htmlFor="birthdate">Date of Birth</Label>
            <Input
              id="birthdate"
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="balance">Account Balance (as of Dec 31 last year)</Label>
            <Input
              id="balance"
              type="number"
              min={0}
              value={accountBalance}
              onChange={(e) => setAccountBalance(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="growth">Expected Annual Growth Rate (%)</Label>
            <Input
              id="growth"
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={growthRate}
              onChange={(e) => setGrowthRate(Number(e.target.value))}
              className="mt-1"
            />
          </div>
        </div>

        <Button onClick={calculateRMD} className="w-full md:w-auto">
          <Calculator className="mr-2" />
          Calculate RMD
        </Button>

        {rmdAmount !== null && distributionFactor !== null && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Current Year Results</h2>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Distribution Factor</TableCell>
                    <TableCell>{distributionFactor.toFixed(1)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Required Minimum Distribution</TableCell>
                    <TableCell>${rmdAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {futureRMDs.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Future RMD Projections</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Starting Balance</TableHead>
                      <TableHead>Distribution Factor</TableHead>
                      <TableHead>Required Distribution</TableHead>
                      <TableHead>Remaining Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {futureRMDs.map((rmd) => (
                      <TableRow key={rmd.year}>
                        <TableCell>{rmd.year}</TableCell>
                        <TableCell>{rmd.age}</TableCell>
                        <TableCell>${rmd.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                        <TableCell>{rmd.distributionFactor.toFixed(1)}</TableCell>
                        <TableCell>${rmd.rmdAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                        <TableCell>${rmd.remainingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <Button onClick={handlePrint} variant="outline" className="print:hidden">
              <Printer className="mr-2" />
              Print Results
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RMDCalculator;
