
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Calculator, Printer } from "lucide-react";

const RMDCalculator = () => {
  const [age, setAge] = useState<number>(72);
  const [accountBalance, setAccountBalance] = useState<number>(0);
  const [rmdAmount, setRmdAmount] = useState<number | null>(null);
  const [distributionFactor, setDistributionFactor] = useState<number | null>(null);

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
    const factor = getDistributionFactor(age);
    setDistributionFactor(factor);
    if (factor && accountBalance) {
      setRmdAmount(accountBalance / factor);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid gap-6 mb-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="age">Your Age</Label>
            <Input
              id="age"
              type="number"
              min={72}
              max={120}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
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
        </div>

        <Button onClick={calculateRMD} className="w-full md:w-auto">
          <Calculator className="mr-2" />
          Calculate RMD
        </Button>

        {rmdAmount !== null && distributionFactor !== null && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Results</h2>
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
